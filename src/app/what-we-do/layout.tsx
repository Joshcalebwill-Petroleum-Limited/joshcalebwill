import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "Integrated energy services: exploration support, haulage, procurement, chemical supply, pipeline construction, gas compression, HSE consultancy and lubricants.",
  openGraph: {
    title: "What We Do | Joshcalebwill",
    description:
      "Engineering, logistics and field services across the energy value chain.",
  },
  alternates: { canonical: "/what-we-do" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
