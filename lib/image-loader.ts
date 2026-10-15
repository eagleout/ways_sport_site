type LoaderArgs = { src: string; width: number; quality?: number };

/**
 * Loader next/image : délègue le redimensionnement aux CDN d'origine (Unsplash / Pexels),
 * plus rapide et sans quota d'optimisation Vercel. Les fichiers locaux sont servis tels quels.
 */
export default function waysImageLoader({ src, width, quality }: LoaderArgs): string {
  const q = String(quality ?? 78);

  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", q);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    return url.toString();
  }

  if (src.startsWith("https://images.pexels.com/")) {
    const url = new URL(src);
    url.searchParams.set("auto", "compress");
    url.searchParams.set("cs", "tinysrgb");
    url.searchParams.set("w", String(width));
    return url.toString();
  }

  return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
}
