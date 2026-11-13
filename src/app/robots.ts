import type { MetadataRoute } from "next";

const BASE = "https://www.sozoq.in/"; // must match the BASE in sitemap.ts

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
