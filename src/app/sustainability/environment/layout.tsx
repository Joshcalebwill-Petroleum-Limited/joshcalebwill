import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Environment",
  description:
    "Environmental stewardship at Joshcalebwill — safe product handling, logistics discipline, field readiness and incident learning.",
  alternates: { canonical: "/sustainability/environment" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
