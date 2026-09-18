import { cases, faqs, services, translated } from "@/content/experience";
import { organization } from "@/content/organization";
import { getPageContent, type Locale, type PageSlug } from "@/content/site";
import { absoluteUrl, hreflang, localizedPath } from "./seo";

type SchemaNode = Record<string, unknown>;

const organizationId = absoluteUrl("/#organization");
const websiteId = absoluteUrl("/#website");

function graph(nodes: SchemaNode[]): SchemaNode {
  return { "@context": "https://schema.org", "@graph": nodes };
}

function serviceNode(locale: Locale, service: (typeof services)[number]): SchemaNode {
  return {
    "@type": "Service",
    "@id": absoluteUrl(`${localizedPath(locale, "servicios")}#${service.slug}`),
    name: translated(locale, service.title),
    description: translated(locale, service.body),
    serviceType: translated(locale, service.intro),
    provider: { "@id": organizationId },
    areaServed: organization.address.country,
    inLanguage: hreflang[locale],
  };
}

function caseNode(locale: Locale, study: (typeof cases)[number]): SchemaNode {
  return {
    "@type": "CreativeWork",
    "@id": absoluteUrl(`${localizedPath(locale, "casos")}#${study.slug}`),
    name: study.name,
    about: translated(locale, study.category),
    abstract: translated(locale, study.result),
    creator: { "@id": organizationId },
    inLanguage: hreflang[locale],
  };
}

function organizationNode(locale: Locale): SchemaNode {
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: organization.name,
    legalName: organization.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl(organization.logo),
    email: organization.email,
    telephone: organization.phone,
    foundingDate: organization.foundingYear,
    sameAs: organization.social,
    address: {
      "@type": "PostalAddress",
      streetAddress: organization.address.street,
      addressLocality: organization.address.locality,
      addressRegion: organization.address.region,
      addressCountry: organization.address.country,
    },
    areaServed: organization.address.country,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "es" ? "Servicios XDEVELOP" : "XDEVELOP services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: serviceNode(locale, service),
      })),
    },
  };
}

function websiteNode(locale: Locale): SchemaNode {
  const [, title, description] = getPageContent(locale, undefined);

  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: absoluteUrl(localizedPath(locale)),
    name: organization.name,
    headline: title,
    description,
    inLanguage: hreflang[locale],
    publisher: { "@id": organizationId },
  };
}

function itemListNode(name: string, items: SchemaNode[]): SchemaNode {
  return {
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item,
    })),
  };
}

function breadcrumbNode(locale: Locale, slug: PageSlug, title: string): SchemaNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: organization.name,
        item: absoluteUrl(localizedPath(locale)),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: absoluteUrl(localizedPath(locale, slug)),
      },
    ],
  };
}

function webPageNode(locale: Locale, slug: PageSlug, title: string, description: string): SchemaNode {
  return {
    "@type": "WebPage",
    "@id": absoluteUrl(localizedPath(locale, slug)),
    url: absoluteUrl(localizedPath(locale, slug)),
    name: title,
    description,
    inLanguage: hreflang[locale],
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
  };
}

function faqNode(locale: Locale): SchemaNode {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: translated(locale, question),
      acceptedAnswer: { "@type": "Answer", text: translated(locale, answer) },
    })),
  };
}

function collectionNodes(locale: Locale, slug: PageSlug): SchemaNode[] {
  if (slug === "servicios") {
    return [itemListNode(locale === "es" ? "Servicios" : "Services", services.map((service) => serviceNode(locale, service)))];
  }
  if (slug === "casos") {
    return [itemListNode(locale === "es" ? "Casos" : "Cases", cases.map((study) => caseNode(locale, study)))];
  }
  if (slug === "preguntas-frecuentes") {
    return [faqNode(locale)];
  }
  return [];
}

export function homeStructuredData(locale: Locale): SchemaNode {
  return graph([
    organizationNode(locale),
    websiteNode(locale),
    itemListNode(locale === "es" ? "Casos" : "Cases", cases.map((study) => caseNode(locale, study))),
  ]);
}

export function pageStructuredData(locale: Locale, slug?: PageSlug): SchemaNode {
  if (!slug) return graph([organizationNode(locale), websiteNode(locale)]);

  const [, title, description] = getPageContent(locale, slug);

  return graph([
    organizationNode(locale),
    webPageNode(locale, slug, title, description),
    breadcrumbNode(locale, slug, title),
    ...collectionNodes(locale, slug),
  ]);
}
