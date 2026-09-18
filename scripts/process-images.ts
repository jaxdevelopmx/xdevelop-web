import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDir = path.resolve("assets/source");
const outputDir = path.resolve("public/media/generated");
const widths = [320, 640, 1280];

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
    const image = sharp(file).rotate().ensureAlpha().trim();

    for (const width of widths) {
      const resized = image.clone().resize({ width, withoutEnlargement: true });
      await resized.clone().webp({ quality: 82 }).toFile(path.join(outputDir, `${base}-${width}.webp`));
      await resized.clone().grayscale().tint("#101b35").webp({ quality: 82 }).toFile(path.join(outputDir, `${base}-${width}-mono.webp`));
    }

    await image.clone().png({ compressionLevel: 9 }).toFile(path.join(outputDir, `${base}.png`));
    await image.clone().grayscale().tint("#101b35").png({ compressionLevel: 9 }).toFile(path.join(outputDir, `${base}-mono.png`));
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
