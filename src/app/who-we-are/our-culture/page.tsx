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
  cultureIntro,
  culturePillars,
  culturePrinciples,
} from "@/data/culture";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

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

const accentBar: Record<string, string> = {
  orange: "from-orange to-red",
  blue: "from-blue to-cyan",
  teal: "from-teal to-lime",
};

const accentBg: Record<string, string> = {
  orange: "bg-background-warm",
  blue: "bg-background-soft",
  teal: "bg-[#f0fdfa]", // soft teal tint – not pure white
};

export default function OurCulturePage() {
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
          {/* Warm gradient – not blue-only, not white */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange via-red/90 to-blue" />
          <Image
            src="/assets/hero/hero-04.jpg"
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
        <div className="absolute inset-0 bg-gradient-to-t from-orange/40 via-transparent to-white/10" />

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
            transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Our culture
          </motion.h1>
        </motion.div>
      </section>

      {/* ========== INTRO – soft warm tint ========== */}
      <section className="relative border-b border-border bg-background-warm">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <p className="text-center text-xl font-medium leading-relaxed text-foreground sm:text-2xl lg:text-3xl lg:leading-snug">
              {cultureIntro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ========== PILLARS – alternating layouts, varied backgrounds ========== */}
      {culturePillars.map((pillar, index) => {
        const imageLeft = index % 2 === 0;
        return (
          <section
            key={pillar.id}
            className={cn(
              "relative overflow-hidden border-b border-border",
              accentBg[pillar.accent]
            )}
          >
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
              <div
                className={cn(
                  "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
                  !imageLeft && "lg:[&>*:first-child]:order-2"
                )}
              >
                {/* Image */}
                <Reveal delay={0.05}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                    <Image
                      src={pillar.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-tr opacity-30",
                        accentBar[pillar.accent]
                      )}
                    />
                  </div>
                </Reveal>

                {/* Copy */}
                <Reveal delay={0.12}>
                  <div>
                    <span
                      className={cn(
                        "mb-4 inline-block h-1.5 w-12 rounded-full bg-gradient-to-r",
                        accentBar[pillar.accent]
                      )}
                    />
                    <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-orange">
                      {pillar.eyebrow}
                    </p>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                      {pillar.title}
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-foreground-muted sm:text-lg">
                      {pillar.text}
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* ========== PRINCIPLES – soft blue field ========== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue via-[#2563eb] to-[#1d4ed8]">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-orange blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-56 w-56 rounded-full bg-cyan blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
              How we show up
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Culture in practice
            </h2>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {culturePrinciples.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:-translate-y-1">
                  <span className="mb-4 block text-xs font-bold uppercase tracking-wider text-yellow">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA – warm gradient ========== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange via-red to-yellow">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Grow with a culture that values you
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
              Explore careers at Joshcalebwill or get in touch with our team.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/who-we-are/jobs"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-orange shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                View careers
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
