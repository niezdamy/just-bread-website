export const siteUrl = (import.meta.env.VITE_SITE_URL ?? "https://niezdamy.github.io/just-bread-website").replace(/\/$/, "");

export function canonicalUrl(path: string) {
  return `${siteUrl}${path === "/" ? "/" : path.replace(/\/$/, "")}`;
}