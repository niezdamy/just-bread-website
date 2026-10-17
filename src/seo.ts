export const siteUrl = (import.meta.env.VITE_SITE_URL ?? "https://justbread.app").replace(/\/$/, "");

export function canonicalUrl(path: string) {
  return `${siteUrl}${path === "/" ? "/" : path.replace(/\/$/, "")}`;
}