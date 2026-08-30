import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/data/services";
import { ServicePage } from "@/components/services/ServicePage";
import { absoluteUrl } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service" };

  return {
    title: service.title,
    description: service.description,
    alternates: {
      canonical: `/what-we-do/${slug}`,
    },
    openGraph: {
      title: `${service.title} | Joshcalebwill`,
      description: service.description,
      url: absoluteUrl(`/what-we-do/${slug}`),
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  return <ServicePage service={service} />;
}
