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
import { communitiesContent } from "@/data/sustainability";
import { cn } from "@/lib/utils";
import { ArrowUpRight, CheckCircle2, Users } from "lucide-react";

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

export default function CommunitiesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const smoothY = useSpring(heroY, { stiffness: 80, damping: 25 });
  const c = communitiesContent;

  return (
    <div className="bg-background overflow-x-hidden">
      <div className="relative min-h-[100svh] flex flex-col bg-white">
        <section
          ref={heroRef}
          className="relative flex-1 min-h-[40vh] overflow-hidden"
        >
          <motion.div style={{ y: smoothY }} className="absolute inset-0 scale-110">
            <Image
              src={c.image}
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

        <section className="relative z-10 -mt-16 sm:-mt-24 bg-white pb-12 sm:pb-16">
          <div className="mx-auto max-w-5xl px-4 pt-2 sm:px-6 lg:px-8 text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-orange"
            >
              {c.eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl bg-cover bg-center bg-no-repeat bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
              style={{
                backgroundImage: `url(${c.image})`,
                backgroundPosition: "center 40%",
              }}
            >
              {c.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg"
            >
              {c.intro}
            </motion.p>
          </div>
        </section>
      </div>

      {/* Overview */}
      <section className="border-t border-border bg-background-soft">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="space-y-5">
            {c.overview.map((para, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="text-center text-base leading-relaxed text-foreground-muted sm:text-lg">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Focus areas */}
      <section className="border-t border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="mb-12 max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
              Where we focus
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Positive impact in practice
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {c.focusAreas.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.07}>
                <div className="h-full rounded-2xl border border-border bg-background-elevated p-6 sm:p-7 transition-all hover:border-orange/30 hover:shadow-md">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-orange/10">
                    <Users className="h-5 w-5 text-orange" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted sm:text-base">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="relative overflow-hidden border-t border-border bg-gradient-to-br from-orange via-red to-[#c2410c]">
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Principles we work by
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.principles.map((item, i) => (
              <Reveal key={item} delay={i * 0.06}>
                <div className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                  <span className="text-sm font-semibold text-white leading-snug">
                    {item}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="border-t border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
              Also explore
            </p>
            <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
              Environment &amp; Careers
            </h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/sustainability/environment"
                className="inline-flex items-center gap-2 rounded-full bg-orange px-7 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-red hover:-translate-y-0.5"
              >
                Environment
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/who-we-are/jobs"
                className="inline-flex items-center gap-2 rounded-full border-2 border-border px-7 py-3 text-sm font-semibold text-foreground transition-all hover:border-orange hover:text-orange"
              >
                Careers
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange via-red to-yellow">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Build with us
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
              Whether you are a client, partner or future team member — we
              would like to hear from you.
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
                href="/who-we-are/jobs"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/90 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white hover:text-orange"
              >
                Join the team
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
