import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "Discover Joshcalebwill's culture, leadership, history and values. An integrated energy services company committed to safety, integrity and excellence across Africa.",
  openGraph: {
    title: "Who We Are | Joshcalebwill",
    description:
      "Culture, leadership and the story behind Joshcalebwill Petroleum Limited.",
  },
  alternates: { canonical: "/who-we-are" },
};

export default function WhoWeAreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
