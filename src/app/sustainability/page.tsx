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
  sustainabilityHero,
  sustainabilityPillars,
} from "@/data/sustainability";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowUpRight } from "lucide-react";

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
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function SustainabilityPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const smoothY = useSpring(heroY, { stiffness: 80, damping: 25 });

  return (
    <div className="bg-background overflow-x-hidden">
      <div className="relative min-h-[100svh] flex flex-col bg-white">
        <section
          ref={heroRef}
          className="relative flex-1 min-h-[42vh] overflow-hidden"
        >
          <motion.div
            style={{ y: smoothY }}
            className="absolute inset-0 scale-110"
          >
            <Image
              src="/assets/hero/hero-04.jpg"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
          </motion.div>
        </section>

        <section className="relative z-10 -mt-16 sm:-mt-24 bg-white pb-14 sm:pb-20">
          <div className="mx-auto max-w-4xl px-4 pt-2 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl bg-cover bg-center bg-no-repeat bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
              style={{
                backgroundImage: "url(/assets/hero/hero-04.jpg)",
                backgroundPosition: "center 40%",
              }}
            >
              {sustainabilityHero.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mx-auto mt-6 max-w-2xl text-base text-foreground-muted sm:text-lg leading-relaxed"
            >
              {sustainabilityHero.subtitle}
            </motion.p>
          </div>
        </section>
      </div>

      {/* Pillars */}
      <section className="border-t border-border bg-background-soft">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
              Our approach
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Two pillars of responsibility
            </h2>
            <p className="mt-4 text-foreground-muted">
              Environment and communities are not side projects — they are how
              we deliver energy services with integrity.
            </p>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-2">
            {sustainabilityPillars.map((pillar, i) => (
              <Reveal key={pillar.href} delay={i * 0.1}>
                <Link
                  href={pillar.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={pillar.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width:1024px) 100vw, 50vw"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue/50 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-orange transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 flex-1 text-foreground-muted leading-relaxed">
                      {pillar.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange">
                      Explore
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values band */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue via-[#2563eb] to-[#1d4ed8]">
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-orange blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-56 w-56 rounded-full bg-cyan blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <Reveal>
            <p className="text-2xl font-medium leading-relaxed text-white sm:text-3xl lg:text-4xl lg:leading-snug">
              &ldquo;Safety, integrity and respect for people guide every
              engagement — from the terminal gate to the customer site.&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
              Joshcalebwill
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange via-red to-yellow">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Partner with a responsible operator
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
              Talk to us about safe, reliable delivery across your next energy
              project.
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
                href="/what-we-do/health-and-safety"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/90 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white hover:text-orange"
              >
                HSE Consultancy
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
