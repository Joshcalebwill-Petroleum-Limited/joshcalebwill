import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Market",
  description:
    "Browse Joshcalebwill's product catalog — safety equipment, lubricants, piping, hoses and instrumentation. Enquire about supply.",
  alternates: { canonical: "/market" },
  openGraph: {
    title: "Market | Joshcalebwill",
    description: "Safety, lubricants and industrial supply products.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
