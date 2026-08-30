"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { impactStats, type StatItem } from "@/data/stats";
import { cn } from "@/lib/utils";

function useCountUp(
  target: number,
  enabled: boolean,
  durationMs = 1800,
): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    let start: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / durationMs, 1);
      // Ease-out cubic for a premium feel
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, enabled, durationMs]);

  return value;
}

function StatCard({
  stat,
  index,
  inView,
}: {
  stat: StatItem;
  index: number;
  inView: boolean;
}) {
  const count = useCountUp(stat.value, inView, 1600 + index * 150);

  const accents = [
    "from-orange to-red",
    "from-blue to-cyan",
    "from-lime to-teal",
    "from-yellow to-orange",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex flex-col items-center text-center px-4 py-6 sm:py-8"
    >
      {/* Accent glow */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500",
          inView && "opacity-100",
        )}
      >
        <div
          className={cn(
            "absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-25",
            "bg-gradient-to-br",
            accents[index % accents.length],
          )}
        />
      </div>

      <div className="relative z-10">
        <p
          className={cn(
            "text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl",
            "bg-gradient-to-br bg-clip-text text-transparent",
            accents[index % accents.length],
          )}
        >
          {stat.prefix}
          {count}
          {stat.suffix}
        </p>
        <h3 className="mt-3 text-base font-bold text-foreground sm:text-lg">
          {stat.label}
        </h3>
        {stat.description && (
          <p className="mt-1.5 max-w-[200px] mx-auto text-sm text-foreground-muted leading-snug">
            {stat.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function ImpactStats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-border bg-white"
    >
      {/* Soft background depth */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-orange/10 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-blue/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center lg:mb-14"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
            Our impact
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Numbers that reflect{" "}
            <span className="bg-gradient-to-r from-orange via-red to-yellow bg-clip-text text-transparent">
              our commitment
            </span>
          </h2>
          <p className="mt-4 text-foreground-muted">
            Scale, safety and delivery — measured where it matters.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y-0 lg:divide-x lg:divide-border">
          {impactStats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
