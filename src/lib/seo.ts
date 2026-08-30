/** Canonical site URL — set NEXT_PUBLIC_SITE_URL in production */
export const siteConfig = {
  name: "Joshcalebwill",
  legalName: "Joshcalebwill Petroleum Limited",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://joshcalebwill.com",
  description:
    "Integrated engineering, procurement, logistics and energy services across Africa. Haulage, pipelines, HSE, chemicals and more — delivered with safety and integrity.",
  locale: "en_NG",
  twitter: "@joshcalebwill",
  email: "info@joshcalebwill.com",
  phone: "+2347077077529",
  address: {
    street: "Plot 20B Close, United Estate, Alagbole",
    region: "Ogun State",
    country: "NG",
  },
  keywords: [
    "Joshcalebwill",
    "oil and gas Nigeria",
    "energy services Africa",
    "petroleum haulage",
    "pipeline construction",
    "HSE consultancy",
    "procurement logistics",
    "gas compression",
    "industrial chemicals",
    "lubricants supply",
  ],
} as const;

export function absoluteUrl(path = "") {
  const base = siteConfig.url.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p === "/" ? "" : p}`;
}
