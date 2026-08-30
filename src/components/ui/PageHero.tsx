"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
}

export function PageHero({ title, subtitle, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background-warm via-background to-background-soft pt-32 pb-20">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-20 h-64 w-64 rounded-full bg-orange blur-3xl" />
        <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-blue blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-widest text-orange mb-3"
          >
            {subtitle}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-5 max-w-2xl text-lg text-foreground-muted leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
