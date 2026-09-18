import fs from "node:fs/promises";
import path from "node:path";
import sharp, { type Metadata, type Sharp } from "sharp";

const sourceDir = path.resolve("assets/source");
const outputDir = path.resolve("public/media/generated");
const widths = [320, 640, 1280];

type RGBA = { r: number; g: number; b: number; a: number };

const T_NEAR = 0.055;
const T_FAR = 0.15;

function colorDistance(a: RGBA, b: RGBA) {
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return Math.sqrt((dr * dr + dg * dg + db * db) / 3) / 255;
}

/**
 * Removes an opaque background from a raster logo by chroma-keying the corner
 * color with a soft edge, so the resulting mark keeps transparent padding and
 * antialiased edges. Skips images that already carry real transparency.
 */
async function removeBackground(
  file: string,
  info: Metadata,
  data: Buffer,
  ch: number
): Promise<{ buffer: Buffer; width: number; height: number }> {
  const w = info.width!;
  const h = info.height!;
  const hasTransparency = ch === 4;

  if (hasTransparency) {
    const idx = (x: number, y: number) => (y * w + x) * ch;
    const corners = [
      data[idx(1, 1) + 3],
      data[idx(Math.max(0, w - 2), 1) + 3],
      data[idx(1, Math.max(0, h - 2)) + 3],
      data[idx(Math.max(0, w - 2), Math.max(0, h - 2)) + 3],
    ];
    if (corners.every((a) => a < 40)) {
      return { buffer: data, width: w, height: h };
    }
  }

  const at = (x: number, y: number): RGBA => {
    const i = (y * w + x) * ch;
    return {
      r: data[i],
      g: data[i + 1],
      b: data[i + 2],
      a: ch === 4 ? data[i + 3] : 255,
    };
  };

  const bgCorners = [at(1, 1), at(Math.max(0, w - 2), 1), at(1, Math.max(0, h - 2)), at(Math.max(0, w - 2), Math.max(0, h - 2))];
  const bg: RGBA = {
    r: Math.round(bgCorners.reduce((s, c) => s + c.r, 0) / bgCorners.length),
    g: Math.round(bgCorners.reduce((s, c) => s + c.g, 0) / bgCorners.length),
    b: Math.round(bgCorners.reduce((s, c) => s + c.b, 0) / bgCorners.length),
    a: 0,
  };

  const out = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const src = i * ch;
    const dst = i * 4;
    const p: RGBA = {
      r: data[src],
      g: data[src + 1],
      b: data[src + 2],
      a: ch === 4 ? data[src + 3] : 255,
    };

    const dist = colorDistance(p, bg);
    let alpha = p.a;
    if (dist < T_NEAR) {
      alpha = hasTransparency && p.a === 0 ? 0 : 0;
    } else if (dist < T_FAR) {
      const mix = (dist - T_NEAR) / (T_FAR - T_NEAR);
      alpha = Math.min(p.a, Math.round(255 * mix * mix));
    }

    out[dst] = p.r;
    out[dst + 1] = p.g;
    out[dst + 2] = p.b;
    out[dst + 3] = alpha;
  }

  return { buffer: out, width: w, height: h };
}

async function getRasterFiles(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);
      return entry.isDirectory() ? getRasterFiles(fullPath) : fullPath;
    }),
  );

  return files.flat().filter((file) => /\.(png|jpe?g|webp)$/i.test(file));
}

function safeName(file: string) {
  return path
    .relative(sourceDir, file)
    .replace(path.extname(file), "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });
  const rasterFiles = await getRasterFiles(sourceDir);

  for (const file of rasterFiles) {
    const base = safeName(file);
    const image = sharp(file).rotate();
    const meta = await image.metadata();
    const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

    const cleared = await removeBackground(file, meta, data, info.channels);
    const transparent = sharp(cleared.buffer, {
      raw: { width: cleared.width, height: cleared.height, channels: 4 },
    })
      .ensureAlpha()
      .trim();

    const resized = transparent.clone().resize({ width: 1280, withoutEnlargement: true });

    for (const width of widths) {
      const sized = resized.clone().resize({ width, withoutEnlargement: true });
      await sized.clone().webp({ quality: 82 }).toFile(path.join(outputDir, `${base}-${width}.webp`));
      await (await monoInk(sized)).webp({ quality: 82 }).toFile(path.join(outputDir, `${base}-${width}-mono.webp`));
    }

    await transparent.clone().png({ compressionLevel: 9 }).toFile(path.join(outputDir, `${base}.png`));
    await (await monoInk(transparent)).png({ compressionLevel: 9 }).toFile(path.join(outputDir, `${base}-mono.png`));
  }
}

const INK = { r: 0x10, g: 0x1b, b: 0x35 };

/**
 * Builds a solid single-color lockup from the raster alpha channel, so every
 * logo reads at the same ink weight on light backgrounds no matter the source
 * palette (white-on-transparent marks included).
 */
async function monoInk(image: Sharp): Promise<Sharp> {
  const { data, info } = await image
    .clone()
    .ensureAlpha()
    .extractChannel(3)
    .raw()
    .toBuffer({ resolveWithObject: true });
  return sharp({
    create: { width: info.width, height: info.height, channels: 4, background: INK },
  }).composite([{ input: data, raw: { width: info.width, height: info.height, channels: 1 }, blend: "dest-in" }]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});