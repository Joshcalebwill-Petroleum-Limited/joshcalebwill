import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Communities",
  description:
    "Creating positive impact where we operate — local employment, safe operations near communities and responsible partnerships.",
  alternates: { canonical: "/sustainability/communities" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
