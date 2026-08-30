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
  careersHero,
  careersIntro,
  whyJoin,
  careerAreas,
  openRoles,
  applicationInfo,
} from "@/data/careers";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  Shield,
  Wrench,
  GraduationCap,
  Heart,
  MapPin,
  Briefcase,
  Mail,
} from "lucide-react";

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

const whyIcons = [Shield, Wrench, GraduationCap, Heart];

export default function CareersPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const smoothY = useSpring(heroY, { stiffness: 80, damping: 25 });

  return (
    <div className="bg-background overflow-x-hidden">
      {/* Hero */}
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
              src="/assets/hero/hero-03.jpg"
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
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-orange"
            >
              Who we are
            </motion.p>
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
                backgroundImage: "url(/assets/hero/hero-03.jpg)",
                backgroundPosition: "center 40%",
              }}
            >
              {careersHero.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mx-auto mt-6 max-w-2xl text-base text-foreground-muted sm:text-lg leading-relaxed"
            >
              {careersHero.subtitle}
            </motion.p>
          </div>
        </section>
      </div>

      {/* Intro */}
      <section className="border-t border-border bg-background-soft">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <div className="mb-4 h-1.5 w-12 rounded-full bg-orange" />
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
                  {careersIntro.eyebrow}
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {careersIntro.title}
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-8 space-y-5">
              {careersIntro.text.map((para, i) => (
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

      {/* Why join */}
      <section className="border-t border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="mb-12 max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
              Why Joshcalebwill
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              What you can expect
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyJoin.map((item, i) => {
              const Icon = whyIcons[i] ?? Shield;
              return (
                <Reveal key={item.title} delay={i * 0.07}>
                  <div className="h-full rounded-2xl border border-border bg-background-elevated p-6 transition-all hover:border-orange/30 hover:shadow-md">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-orange/10">
                      <Icon className="h-5 w-5 text-orange" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Career areas */}
      <section className="border-t border-border bg-background-soft">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="mb-12 max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
              Disciplines
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Areas we hire into
            </h2>
            <p className="mt-3 text-foreground-muted">
              Opportunities span field operations, technical support and
              professional services.
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {careerAreas.map((area, i) => (
              <Reveal key={area.title} delay={i * 0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 transition-all hover:border-orange/30 hover:shadow-md">
                  <div className="mb-3 h-1 w-10 rounded-full bg-orange" />
                  <h3 className="text-lg font-bold text-foreground">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section
        id="openings"
        className="border-t border-border bg-white scroll-mt-24"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="mb-12 max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
              Openings
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Current opportunities
            </h2>
          </Reveal>

          {openRoles.length > 0 ? (
            <div className="space-y-4">
              {openRoles.map((role, i) => (
                <Reveal key={role.id} delay={i * 0.05}>
                  <div className="flex flex-col gap-4 rounded-2xl border border-border bg-background-elevated p-6 sm:flex-row sm:items-center sm:justify-between transition-all hover:border-orange/30 hover:shadow-md">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        {role.title}
                      </h3>
                      <p className="mt-1 text-sm text-foreground-muted">
                        {role.summary}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-3 text-xs font-medium text-foreground-muted">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-orange" />
                          {role.location}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Briefcase className="h-3.5 w-3.5 text-orange" />
                          {role.type}
                        </span>
                        <span className="rounded-full bg-orange/10 px-2.5 py-0.5 text-orange">
                          {role.department}
                        </span>
                      </div>
                    </div>
                    <a
                      href={`mailto:${applicationInfo.email}?subject=Application%20—%20${encodeURIComponent(role.title)}`}
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-orange px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red hover:-translate-y-0.5"
                    >
                      Apply
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="rounded-3xl border border-dashed border-border bg-background-soft px-6 py-14 text-center">
                <Briefcase className="mx-auto h-10 w-10 text-orange/60" />
                <h3 className="mt-4 text-xl font-bold text-foreground">
                  No open roles right now
                </h3>
                <p className="mx-auto mt-3 max-w-md text-foreground-muted">
                  We are not listing specific vacancies at the moment. Strong
                  candidates are still welcome to send a speculative
                  application.
                </p>
                <a
                  href={`mailto:${applicationInfo.email}?subject=Speculative%20application%20—%20Careers`}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange px-7 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-red hover:-translate-y-0.5"
                >
                  <Mail className="h-4 w-4" />
                  Send your CV
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* How to apply */}
      <section className="border-t border-border bg-background-soft">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
              How to apply
            </p>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Get in touch
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-foreground-muted leading-relaxed">
              {applicationInfo.note}
            </p>
            <a
              href={`mailto:${applicationInfo.email}`}
              className="mt-6 inline-flex items-center gap-2 text-lg font-semibold text-orange hover:text-red transition-colors"
            >
              <Mail className="h-5 w-5" />
              {applicationInfo.email}
            </a>
          </Reveal>
        </div>
      </section>

      {/* Culture CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue via-[#2563eb] to-[#1d4ed8]">
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-orange blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <p className="text-2xl font-medium leading-relaxed text-white sm:text-3xl">
              &ldquo;Our people remain our greatest strength — guided by
              responsibility, integrity and engineering excellence.&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/who-we-are/our-culture"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-blue"
              >
                Our culture
              </Link>
              <Link
                href="/who-we-are/leadership"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-blue"
              >
                Meet leadership
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange via-red to-yellow">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to grow with us?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
              Tell us about your experience — we will respond as soon as we
              can.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={`mailto:${applicationInfo.email}?subject=Careers%20enquiry`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-orange shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Email careers
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link
                href="/who-we-are/contact-us"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/90 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white hover:text-orange"
              >
                Contact us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
