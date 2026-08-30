"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HeroSlider } from "@/components/home/HeroSlider";
import { ValuesScroll } from "@/components/home/ValuesScroll";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { ImpactStats } from "@/components/home/ImpactStats";
import { RevealOnScroll } from "@/components/ui/Parallax";

export default function HomePage() {
  return (
    <div>
      {/* Full-bleed Hero Slider with parallax */}
      <HeroSlider />

      {/* Chevron-style sticky values story */}
      {/* <ValuesScroll /> */}

      {/* What We Do – service grid */}
      <WhatWeDo />

      {/* Impact / stats proof strip */}
      <ImpactStats />

      {/* Mid-page parallax band */}
      <section className="relative overflow-hidden py-28 lg:py-36">
        <div className="absolute inset-0 bg-gradient-to-br from-background-soft via-background-warm to-background" />
        <motion.div
          className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-orange/25 blur-3xl"
          initial={{ y: 80 }}
          whileInView={{ y: -40 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="pointer-events-none absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-blue/25 blur-3xl"
          initial={{ y: -60 }}
          whileInView={{ y: 50 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/20 blur-3xl"
          initial={{ scale: 0.8, opacity: 0.4 }}
          whileInView={{ scale: 1.15, opacity: 0.7 }}
          viewport={{ once: false }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <RevealOnScroll>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
              Why Joshcalebwill
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Depth of expertise.
              <br />
              <span className="bg-gradient-to-r from-orange via-red to-yellow bg-clip-text text-transparent">
                Breadth of delivery.
              </span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground-muted leading-relaxed">
              From the first survey to final delivery, we integrate engineering,
              logistics, procurement and HSE so projects move faster, safer and
              with greater accountability.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA band */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange via-red to-yellow">
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-30"
          initial={{ backgroundPosition: "0% 50%" }}
          whileInView={{ backgroundPosition: "100% 50%" }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.25) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.15) 0%, transparent 45%)",
            backgroundSize: "200% 200%",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold text-white mb-4 sm:text-4xl">
              Ready to partner with us?
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
              Let&apos;s discuss how Joshcalebwill can support your next energy
              project with reliability, expertise and integrity.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.14}>
            <Link
              href="/who-we-are/contact-us"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-orange shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              Get in Touch
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
