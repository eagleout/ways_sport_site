import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules:{userAgent:"*",allow:"/"},
    sitemap:"https://ways-sport-site.vercel.app/sitemap.xml",
    host:"https://ways-sport-site.vercel.app"
  };
}
