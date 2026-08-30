import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/services";
import { ServicePage } from "@/components/services/ServicePage";

const SLUG = "health-and-safety";

export function generateMetadata() {
  const service = getServiceBySlug(SLUG);
  if (!service) return { title: "Service" };
  return {
    title: `${service.title} | What We Do`,
    description: service.description,
  };
}

export default function Page() {
  const service = getServiceBySlug(SLUG);
  if (!service) notFound();
  return <ServicePage service={service} />;
}
