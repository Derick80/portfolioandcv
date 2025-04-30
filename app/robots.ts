import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap:
      process.env.NODE_ENV === "production"
        ? "https://derickhoskinson.com/sitemap.xml"
        : "http://localhost:3000/sitemap.ts",
  };
}
