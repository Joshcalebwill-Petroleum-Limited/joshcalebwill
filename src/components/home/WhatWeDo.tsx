"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Compass,
  Truck,
  PackageSearch,
  FlaskConical,
  Route,
  Wind,
  ShieldCheck,
  Droplets,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { navigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Exploration: Compass,
  "Haulage Services": Truck,
  "Procurement Solutions": PackageSearch,
  "Chemical Supply & Treatments": FlaskConical,
  "Pipeline Construction": Route,
  "Gas Compression Services": Wind,
  "HSE Consultancy": ShieldCheck,
  Lubricants: Droplets,
};

const accentColors = [
  "from-orange to-red",
  "from-blue to-cyan",
  "from-lime to-teal",
  "from-red to-orange",
  "from-teal to-blue",
  "from-yellow to-orange",
  "from-cyan to-blue",
  "from-gold to-yellow",
];

const accentSolid = [
  "bg-orange",
  "bg-blue",
  "bg-lime",
  "bg-red",
  "bg-teal",
  "bg-yellow",
  "bg-cyan",
  "bg-gold",
];

const services =
  navigation.find((n) => n.title === "What We Do")?.submenu ?? [];

function ServiceCard({
  title,
  description,
  href,
  index,
}: {
  title: string;
  description?: string;
  href: string;
  index: number;
}) {
  const Icon = iconMap[title] ?? Compass;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: (index % 4) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={href}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-6 sm:p-7",
          "transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-orange/30"
        )}
      >
        {/* Hover gradient wash */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-[0.07]",
            "bg-gradient-to-br",
            accentColors[index % accentColors.length]
          )}
        />

        {/* Top accent line */}
        <div
          className={cn(
            "mb-5 h-1 w-10 rounded-full transition-all duration-300 group-hover:w-16",
            accentSolid[index % accentSolid.length]
          )}
        />

        {/* Icon */}
        <div
          className={cn(
            "mb-5 flex h-12 w-12 items-center justify-center rounded-xl",
            "bg-background-soft text-foreground transition-all duration-300",
            "group-hover:bg-orange group-hover:text-white group-hover:shadow-md"
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>

        {/* Title + arrow */}
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-foreground leading-snug transition-colors group-hover:text-orange sm:text-xl">
            {title}
          </h3>
          <ArrowUpRight
            className="mt-0.5 h-5 w-5 shrink-0 text-foreground-subtle transition-all duration-300 group-hover:text-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>

        {/* Description */}
        {description && (
          <p className="mt-1 text-sm leading-relaxed text-foreground-muted flex-1">
            {description}
          </p>
        )}

        {/* Bottom CTA hint */}
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-orange opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          Learn more
          <span aria-hidden>→</span>
        </span>
      </Link>
    </motion.div>
  );
}

export function WhatWeDo() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-40px" });

  return (
    <section className="relative overflow-hidden bg-background-soft border-y border-border">
      {/* Soft decorative blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-orange/20 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-blue/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        {/* Header */}
        <div ref={headerRef} className="mx-auto max-w-3xl text-center mb-14 lg:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange"
          >
            What we do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Integrated energy solutions
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-orange via-red to-yellow bg-clip-text text-transparent">
              {" "}
              across the value chain
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-5 text-base sm:text-lg text-foreground-muted leading-relaxed"
          >
            From exploration and pipeline construction to procurement, logistics,
            chemicals and HSE — we deliver reliable results with integrity and
            technical excellence.
          </motion.p>
        </div>

        {/* Service grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {services.map((item, i) => (
            <ServiceCard
              key={item.href}
              title={item.title}
              description={item.description}
              href={item.href}
              index={i}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/what-we-do"
            className="inline-flex items-center justify-center rounded-full bg-orange px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-red hover:shadow-lg hover:-translate-y-0.5"
          >
            Explore all services
          </Link>
          <Link
            href="/who-we-are/contact-us"
            className="inline-flex items-center justify-center rounded-full border-2 border-blue px-8 py-3.5 text-sm font-semibold text-blue transition-all duration-300 hover:bg-blue hover:text-white"
          >
            Talk to our team
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
