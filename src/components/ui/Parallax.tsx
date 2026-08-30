"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  useParallax – reusable hook                                       */
/* ------------------------------------------------------------------ */
export function useParallax(
  value: MotionValue<number>,
  distance: number
) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

/* ------------------------------------------------------------------ */
/*  ParallaxImage – background image that moves slower than scroll    */
/* ------------------------------------------------------------------ */
interface ParallaxImageProps {
  src: string;
  alt?: string;
  className?: string;
  /** How far the image travels (px). Higher = stronger effect */
  strength?: number;
  /** Optional coloured overlay gradient classes */
  overlayClassName?: string;
}

export function ParallaxImage({
  src,
  alt = "",
  className,
  strength = 120,
  overlayClassName,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div
        style={{ y: smoothY }}
        className="absolute inset-0 scale-125"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </motion.div>
      {overlayClassName && (
        <div className={cn("absolute inset-0", overlayClassName)} />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ParallaxSection – full section with depth layers                  */
/* ------------------------------------------------------------------ */
interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  /** Background decorative blobs that drift at different speeds */
  showBlobs?: boolean;
}

export function ParallaxSection({
  children,
  className,
  showBlobs = true,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const blob1Y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [120, -40]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], [40, -100]);

  return (
    <section ref={ref} className={cn("relative overflow-hidden", className)}>
      {showBlobs && (
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <motion.div
            style={{ y: blob1Y }}
            className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-orange blur-3xl"
          />
          <motion.div
            style={{ y: blob2Y }}
            className="absolute -right-16 top-1/3 h-96 w-96 rounded-full bg-blue blur-3xl"
          />
          <motion.div
            style={{ y: blob3Y }}
            className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-lime blur-3xl"
          />
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ParallaxText – text that drifts gently on scroll                  */
/* ------------------------------------------------------------------ */
interface ParallaxTextProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function ParallaxText({
  children,
  className,
  strength = 40,
}: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  RevealOnScroll – fade + rise as element enters viewport           */
/* ------------------------------------------------------------------ */
interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function RevealOnScroll({
  children,
  className,
  delay = 0,
  direction = "up",
}: RevealOnScrollProps) {
  const directionOffset = {
    up: { y: 48 },
    down: { y: -48 },
    left: { x: 48 },
    right: { x: -48 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
