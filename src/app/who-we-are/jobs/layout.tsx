import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Joshcalebwill. Careers in logistics, HSE, technical support, procurement and operations across Nigeria's energy sector.",
  alternates: { canonical: "/who-we-are/jobs" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
