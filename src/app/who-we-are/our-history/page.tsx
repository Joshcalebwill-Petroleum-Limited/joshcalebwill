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
import {
  historyIntro,
  historyExperience,
  expertiseList,
  expertiseNote,
  commitments,
  commitmentNote,
  workforce,
  corporateVision,
  historySummary,
  milestones,
} from "@/data/history";
import { cn } from "@/lib/utils";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

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
  const inView = useInView(ref, { once: true, margin: "-60px" });

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

export default function OurHistoryPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const smoothY = useSpring(heroY, { stiffness: 80, damping: 25 });
  const smoothScale = useSpring(heroScale, { stiffness: 80, damping: 25 });

  return (
    <div className="bg-background overflow-x-hidden">
      {/* ========== HERO ========== */}
      <section
        ref={heroRef}
        className="relative h-[65vh] min-h-[440px] max-h-[680px] overflow-hidden"
      >
        <motion.div
          style={{ y: smoothY, scale: smoothScale }}
          className="absolute inset-0 origin-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-teal via-blue to-[#1d4ed8]" />
          <Image
            src="/assets/hero/hero-02.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-35 mix-blend-overlay"
            sizes="100vw"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue/50 via-transparent to-white/10" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-20 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-white/85"
          >
            Who we are
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Our history
          </motion.h1>
        </motion.div>
      </section>

      {/* ========== INTRO ========== */}
      <section className="relative border-b border-border bg-background-soft">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <p className="text-center text-xl font-medium leading-relaxed text-foreground sm:text-2xl lg:text-[1.65rem] lg:leading-snug">
              {historyIntro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ========== MILESTONES ========== */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-6 sm:grid-cols-3">
            {milestones.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.1}>
                <div className="relative h-full rounded-2xl border border-border bg-background-elevated p-7 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <p className="bg-gradient-to-r from-orange via-red to-yellow bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
                    {m.year}
                  </p>
                  <h3 className="mt-3 text-lg font-bold text-foreground">
                    {m.label}
                  </h3>
                  <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
                    {m.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mx-auto mt-12 max-w-3xl text-center">
            <p className="text-base leading-relaxed text-foreground-muted sm:text-lg">
              {historyExperience}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ========== EXPERTISE ========== */}
      <section className="relative overflow-hidden border-b border-border bg-background-warm">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
                  What we built on
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Areas of expertise and services
                </h2>
                <p className="mt-5 text-base leading-relaxed text-foreground-muted sm:text-lg">
                  Joshcalebwill Petroleum Limited specializes in a broad
                  spectrum of services within the Oil &amp; Gas industry,
                  including but not limited to:
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <ul className="grid gap-3 sm:grid-cols-2">
                {expertiseList.map((item, i) => (
                  <Reveal key={item} delay={i * 0.05}>
                    <li className="flex items-start gap-3 rounded-xl border border-border bg-white px-4 py-3.5 transition-all duration-300 hover:border-orange/40 hover:shadow-md">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
                      <span className="text-sm font-semibold text-foreground sm:text-base">
                        {item}
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ul>
              <Reveal delay={0.25} className="mt-8">
                <p className="text-base leading-relaxed text-foreground-muted">
                  {expertiseNote}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========== COMMITMENT ========== */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
              How we operate
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Commitment to quality and innovation
            </h2>
            <p className="mt-4 text-foreground-muted">
              At the core of Joshcalebwill Petroleum Limited’s operations is a
              dedication to:
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {commitments.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.1}>
                <div
                  className={cn(
                    "h-full rounded-2xl border border-border p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
                    i === 1
                      ? "bg-gradient-to-br from-blue to-[#1d4ed8] text-white border-transparent"
                      : "bg-background-soft"
                  )}
                >
                  <div
                    className={cn(
                      "mb-5 h-1.5 w-12 rounded-full",
                      i === 1
                        ? "bg-gradient-to-r from-yellow to-orange"
                        : "bg-gradient-to-r from-orange to-red"
                    )}
                  />
                  <h3
                    className={cn(
                      "text-xl font-bold",
                      i === 1 ? "text-white" : "text-foreground"
                    )}
                  >
                    {c.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 text-sm leading-relaxed sm:text-base",
                      i === 1 ? "text-white/85" : "text-foreground-muted"
                    )}
                  >
                    {c.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mx-auto mt-12 max-w-3xl text-center">
            <p className="text-base leading-relaxed text-foreground-muted">
              {commitmentNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ========== WORKFORCE ========== */}
      <section className="relative overflow-hidden border-b border-border bg-background-soft">
        <div className="pointer-events-none absolute -right-16 top-10 h-72 w-72 rounded-full bg-orange/15 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-start">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
                  Our people
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {workforce.title}
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-8 space-y-5">
              {workforce.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-base leading-relaxed text-foreground-muted sm:text-lg">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== VISION + SUMMARY ========== */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-border bg-background-warm p-8 sm:p-10">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
                  Corporate vision
                </p>
                <p className="text-lg leading-relaxed text-foreground sm:text-xl">
                  {corporateVision}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl bg-gradient-to-br from-blue to-[#1d4ed8] p-8 sm:p-10 text-white">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                  Summary
                </p>
                <p className="text-lg leading-relaxed text-white/95 sm:text-xl">
                  {historySummary}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange via-red to-yellow">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Be part of the next chapter
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
              Partner with a team built on experience, integrity and delivery
              since 2014.
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
                href="/who-we-are"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/90 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white hover:text-orange"
              >
                Back to Who we are
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
