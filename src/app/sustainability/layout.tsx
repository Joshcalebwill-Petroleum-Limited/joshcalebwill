import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "Joshcalebwill's commitment to environmental stewardship and positive community impact across our energy operations.",
  alternates: { canonical: "/sustainability" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
