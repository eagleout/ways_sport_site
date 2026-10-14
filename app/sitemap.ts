import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base="https://ways-sport-site.vercel.app";
  const now=new Date();
  return [
    {url:`${base}/`,lastModified:now,changeFrequency:"weekly",priority:1},
    {url:`${base}/levallois`,lastModified:now,changeFrequency:"weekly",priority:.95},
    {url:`${base}/cours`,lastModified:now,changeFrequency:"weekly",priority:.9},
    {url:`${base}/abonnements`,lastModified:now,changeFrequency:"weekly",priority:.9},
    ...["pilates","lagree","rpm","cardio-boxing","cardio-abdos-fessiers","body-sculpt"].map(slug=>({url:`${base}/cours/${slug}`,lastModified:now,changeFrequency:"monthly" as const,priority:.82}))
  ];
}
