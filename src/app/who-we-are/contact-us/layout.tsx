import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Joshcalebwill. Head office in Alagbole, Ogun State. Phone, email and contact form for enquiries.",
  alternates: { canonical: "/who-we-are/contact-us" },
  openGraph: {
    title: "Contact Us | Joshcalebwill",
    description: "Speak with our team about your next energy project.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
