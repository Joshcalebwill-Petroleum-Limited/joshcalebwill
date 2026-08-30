import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our History",
  description:
    "From incorporation in 2014 to an integrated energy services provider — the journey of Joshcalebwill Petroleum Limited.",
  alternates: { canonical: "/who-we-are/our-history" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
