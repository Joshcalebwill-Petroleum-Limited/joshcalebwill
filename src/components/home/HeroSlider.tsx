"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { heroData } from "@/data/hero";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTO_PLAY_MS = 7000;

const textVariants = {
  enter: { opacity: 0, y: 40 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const imageVariants = {
  enter: { opacity: 0, scale: 1.08 },
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Brand gradient overlays (no black) — different tint per slide
const slideOverlays = [
  "from-orange/80 via-orange/40 to-transparent",
  "from-blue/80 via-blue/40 to-transparent",
  "from-teal/80 via-teal/40 to-transparent",
  "from-lime/70 via-lime/35 to-transparent",
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: background moves slower / scales slightly as user scrolls away
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const smoothBgY = useSpring(bgY, { stiffness: 80, damping: 25 });
  const smoothBgScale = useSpring(bgScale, { stiffness: 80, damping: 25 });

  const total = heroData.length;
  const slide = heroData[current];

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent((index + total) % total);
      setProgress(0);
    },
    [current, total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Autoplay + progress bar
  useEffect(() => {
    if (isPaused) return;

    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / AUTO_PLAY_MS, 1);
      setProgress(pct);
      if (pct >= 1) {
        next();
      }
    };

    const id = setInterval(tick, 40);
    return () => clearInterval(id);
  }, [current, isPaused, next]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[600px] max-h-[920px] w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background images – parallax layer */}
      <AnimatePresence mode="sync" custom={direction}>
        <motion.div
          key={`img-${current}`}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{ y: smoothBgY, scale: smoothBgScale }}
          className="absolute inset-0 origin-center"
        >
          {/* Fallback gradient when image is missing */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br",
              current === 0 && "from-orange/30 via-background-warm to-blue/20",
              current === 1 && "from-blue/30 via-background-soft to-cyan/20",
              current === 2 && "from-teal/30 via-background-warm to-lime/20",
              current === 3 && "from-lime/30 via-background-soft to-orange/20"
            )}
          />

          {/* Actual image (gracefully fails if missing) */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={current === 0}
            className="object-cover"
            sizes="100vw"
            onError={(e) => {
              // Hide broken image so gradient shows through
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />

          {/* Soft coloured overlay (brand colours, no pure black) */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-r via-40%",
              slideOverlays[current]
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/10" />
        </motion.div>
      </AnimatePresence>

      {/* Content – also drifts on scroll for depth */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full items-center"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-28 sm:pb-24">
          <div className="max-w-2xl lg:max-w-3xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`text-${current}`}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {/* Eyebrow */}
                <p className="mb-3 sm:mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white drop-shadow-sm sm:text-sm">
                  <span className="inline-block rounded-full bg-white/20 px-3 py-1 sm:px-4 sm:py-1.5 backdrop-blur-sm">
                    {slide.eyebrow}
                  </span>
                </p>

                {/* Title */}
                <h1 className="text-3xl font-bold leading-[1.12] tracking-tight text-white drop-shadow-md sm:text-5xl lg:text-6xl xl:text-7xl">
                  {slide.title}
                </h1>

                {/* Description */}
                <p className="mt-4 sm:mt-6 max-w-xl text-sm leading-relaxed text-white/95 drop-shadow-sm sm:text-lg">
                  {slide.description}
                </p>

                {/* Actions */}
                <div className="mt-8 sm:mt-10 flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4">
                  <Link
                    href={slide.primaryAction.href}
                    className="inline-flex items-center justify-center rounded-full bg-orange px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-red hover:shadow-xl hover:-translate-y-0.5"
                  >
                    {slide.primaryAction.label}
                  </Link>

                  {slide.secondaryAction && (
                    <Link
                      href={slide.secondaryAction.href}
                      className="inline-flex items-center justify-center rounded-full border-2 border-white/90 bg-white/10 px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-orange"
                    >
                      {slide.secondaryAction.label}
                    </Link>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Navigation arrows */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-2 sm:px-6">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-md transition-all hover:bg-white hover:text-orange sm:h-14 sm:w-14"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-md transition-all hover:bg-white hover:text-orange sm:h-14 sm:w-14"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>

      {/* Bottom progress + dots */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* Thin progress bar */}
        <div className="h-1 w-full bg-white/20">
          <motion.div
            className="h-full bg-orange"
            style={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.05, ease: "linear" }}
          />
        </div>

        <div className="flex items-center justify-between px-4 py-4 sm:px-8 sm:py-5">
          {/* Slide counter */}
          <div className="flex items-center gap-1.5 text-sm font-medium text-white/90 min-w-[3.5rem]">
            <span className="text-base sm:text-lg font-bold text-white tabular-nums">
              {String(current + 1).padStart(2, "0")}
            </span>
            <span className="text-white/50">/</span>
            <span className="tabular-nums text-white/80">
              {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-2 sm:gap-3">
            {heroData.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 sm:h-2.5",
                  i === current
                    ? "w-8 bg-orange sm:w-10"
                    : "w-2 bg-white/50 hover:bg-white/80 sm:w-2.5"
                )}
              />
            ))}
          </div>

          {/* Pause indicator */}
          <div className="min-w-[3.5rem] text-right text-[10px] sm:text-xs font-medium uppercase tracking-wider text-white/70">
            {isPaused ? "Paused" : "Auto"}
          </div>
        </div>
      </div>
    </section>
  );
}
