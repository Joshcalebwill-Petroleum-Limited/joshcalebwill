"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { type ServicePageData, getRelatedServices } from "@/data/services";
import { cn } from "@/lib/utils";
import { ArrowUpRight, CheckCircle2, ArrowRight } from "lucide-react";

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const accentSolid: Record<string, string> = {
  orange: "bg-orange",
  red: "bg-red",
  blue: "bg-blue",
  teal: "bg-teal",
  lime: "bg-lime",
  yellow: "bg-yellow",
  cyan: "bg-cyan",
};

export function ServicePage({ service }: { service: ServicePageData }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const smoothY = useSpring(heroY, { stiffness: 80, damping: 25 });

  const related = getRelatedServices(service.slug, 3);

  return (
    <div className="bg-background overflow-x-hidden">
      {/*
        Hero fills the first screen so coloured sections below
        only appear after the user starts scrolling.
      */}
      <div className="relative min-h-[100svh] flex flex-col bg-white">
        <section
          ref={heroRef}
          className="relative flex-1 min-h-[40vh] overflow-hidden"
        >
          <motion.div
            style={{ y: smoothY }}
            className="absolute inset-0 scale-110"
          >
            <Image
              src={service.image}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            {/* Soft fade into white only — no blue overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
          </motion.div>
        </section>

        {/* Clipped text title (Chevron-style) */}
        <section className="relative z-10 -mt-16 sm:-mt-24 bg-white pb-14 sm:pb-16 lg:pb-20">
          <div className="mx-auto max-w-5xl px-4 pt-2 sm:px-6 lg:px-8 text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-orange"
            >
              What we do
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl",
                "bg-cover bg-center bg-no-repeat",
                "bg-clip-text text-transparent",
                "[-webkit-background-clip:text] [-webkit-text-fill-color:transparent]",
              )}
              style={{
                backgroundImage: `url(${service.image})`,
                backgroundPosition: "center 40%",
              }}
            >
              {service.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg"
            >
              {service.intro}
            </motion.p>
          </div>
        </section>
      </div>

      {/* ========== OVERVIEW ========== */}
      <section className="border-t border-border bg-background-soft">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <div
                  className={cn(
                    "mb-4 h-1.5 w-12 rounded-full",
                    accentSolid[service.accent],
                  )}
                />
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Overview
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-8 space-y-5">
              {service.overview.map((para, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-base leading-relaxed text-foreground-muted sm:text-lg">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== CAPABILITIES ========== */}
      <section className="border-t border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="mb-10 max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
              Capabilities
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              What this service covers
            </h2>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((item, i) => (
              <Reveal key={item} delay={i * 0.05}>
                <div className="flex h-full items-start gap-3 rounded-2xl border border-border bg-background-elevated px-5 py-4 transition-all hover:border-orange/30 hover:shadow-md">
                  <CheckCircle2
                    className={cn(
                      "mt-0.5 h-5 w-5 shrink-0",
                      service.accent === "orange" && "text-orange",
                      service.accent === "red" && "text-red",
                      service.accent === "blue" && "text-blue",
                      service.accent === "teal" && "text-teal",
                      service.accent === "lime" && "text-lime",
                      service.accent === "yellow" && "text-yellow",
                      service.accent === "cyan" && "text-cyan",
                    )}
                  />
                  <span className="text-sm font-semibold text-foreground leading-snug">
                    {item}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== OUTCOMES ========== */}
      <section className="relative overflow-hidden border-t border-border bg-gradient-to-br from-blue via-[#2563eb] to-[#1d4ed8]">
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-orange blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal className="mb-10 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
              Results
            </p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Outcomes clients care about
            </h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-3">
            {service.outcomes.map((item, i) => (
              <Reveal key={item} delay={i * 0.08}>
                <div className="rounded-2xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm">
                  <p className="text-lg font-bold text-white">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== RELATED ========== */}
      <section className="border-t border-border bg-background-soft">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal className="mb-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
              More capabilities
            </p>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Related services
            </h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-3">
            {related.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.07}>
                <Link
                  href={`/what-we-do/${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-orange/30"
                >
                  <div
                    className={cn(
                      "mb-4 h-1 w-10 rounded-full transition-all group-hover:w-14",
                      accentSolid[s.accent],
                    )}
                  />
                  <h3 className="text-lg font-bold text-foreground group-hover:text-orange transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-foreground-muted">
                    {s.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-orange">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange via-red to-yellow">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Need {service.shortTitle.toLowerCase()} support?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
              Speak with our team about scope, timelines and how we can support
              your next project.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/who-we-are/contact-us"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-orange shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Contact us
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/what-we-do"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/90 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white hover:text-orange"
              >
                All services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
