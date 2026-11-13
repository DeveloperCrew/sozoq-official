import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/data/content";

/**
 * Sitemap for https://sozoq.in
 * Next.js serves this automatically at /sitemap.xml
 *
 * Notes:
 * - BASE must exactly match your live address (https, with or without www).
 * - Update the dates below only when a page's content actually changes.
 *   Google ignores lastModified if it is always "now".
 * - Google ignores changeFrequency and priority; they are kept because
 *   some other search engines (e.g. Bing) may still read them.
 */
const BASE = "https://www.sozoq.in";

const SITE_UPDATED = new Date("2026-11-12");

type Entry = MetadataRoute.Sitemap[number];

// Core pages
const corePages: Entry[] = [
  {
    url: `${BASE}/`,
    lastModified: SITE_UPDATED,
    changeFrequency: "weekly",
    priority: 1.0,
  },
  {
    url: `${BASE}/work`,
    lastModified: SITE_UPDATED,
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    url: `${BASE}/contact`,
    lastModified: SITE_UPDATED,
    changeFrequency: "yearly",
    priority: 0.8,
  },
];

// Service pages: /services/<slug>
const serviceSlugs = [
  "website-development",
  "branding",
  "ui-ux-design",
  "seo-marketing",
  "app-development",
  "cms-development",
];

const servicePages: Entry[] = serviceSlugs.map((slug) => ({
  url: `${BASE}/services/${slug}`,
  lastModified: SITE_UPDATED,
  changeFrequency: "monthly",
  priority: 0.8,
}));

// Case studies: /work/<slug>
// "workley" is a separate static route, the rest come from CASE_STUDIES,
// so any case study you add later is included automatically.
const caseStudySlugs = Array.from(
  new Set(["workley", ...Object.keys(CASE_STUDIES)]),
);

const caseStudyPages: Entry[] = caseStudySlugs.map((slug) => ({
  url: `${BASE}/work/${slug}`,
  lastModified: SITE_UPDATED,
  changeFrequency: "monthly",
  priority: 0.7,
}));

// Legal pages
const legalPages: Entry[] = ["privacy", "terms"].map((slug) => ({
  url: `${BASE}/${slug}`,
  lastModified: SITE_UPDATED,
  changeFrequency: "yearly",
  priority: 0.3,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [...corePages, ...servicePages, ...caseStudyPages, ...legalPages];
}
