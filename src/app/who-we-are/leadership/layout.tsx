import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Leadership",
  description:
    "Meet the leadership team driving Joshcalebwill — experienced professionals in engineering, HSE, projects and operations.",
  alternates: { canonical: "/who-we-are/leadership" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
