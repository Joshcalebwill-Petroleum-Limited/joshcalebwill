import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Culture",
  description:
    "The values and principles that guide Joshcalebwill — operational excellence, diversity, safety and teamwork.",
  alternates: { canonical: "/who-we-are/our-culture" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
