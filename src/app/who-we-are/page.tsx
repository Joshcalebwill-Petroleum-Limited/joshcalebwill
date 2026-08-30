// "use client";

// import { useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion, useInView, useScroll, useTransform } from "framer-motion";
// import {
//   whoWeAreIntro,
//   whoWeAreStory,
//   vision,
//   mission,
//   coreValues,
//   exploreLinks,
// } from "@/data/whoWeAre";
// import { cn } from "@/lib/utils";
// import { ArrowUpRight } from "lucide-react";

// function Reveal({
//   children,
//   className,
//   delay = 0,
// }: {
//   children: React.ReactNode;
//   className?: string;
//   delay?: number;
// }) {
//   const ref = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, margin: "-60px" });

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 36 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{
//         duration: 0.65,
//         delay,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// }

// export default function WhoWeArePage() {
//   const heroRef = useRef<HTMLElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: heroRef,
//     offset: ["start start", "end start"],
//   });
//   const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
//   const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

//   return (
//     <div className="bg-background">
//       {/* Hero */}
//       <section
//         ref={heroRef}
//         className="relative h-[70vh] min-h-[480px] max-h-[720px] overflow-hidden"
//       >
//         <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110">
//           <div className="absolute inset-0 bg-gradient-to-br from-blue via-[#2563eb] to-orange/80" />
//           <Image
//             src="/assets/hero/hero-01.jpg"
//             alt=""
//             fill
//             priority
//             className="object-cover opacity-40 mix-blend-overlay"
//             sizes="100vw"
//             onError={(e) => {
//               (e.target as HTMLImageElement).style.display = "none";
//             }}
//           />
//         </motion.div>
//         <div className="absolute inset-0 bg-gradient-to-t from-blue/40 via-transparent to-white/10" />

//         <motion.div
//           style={{ opacity: heroOpacity }}
//           className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-20 text-center"
//         >
//           <motion.p
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-white/80"
//           >
//             Joshcalebwill
//           </motion.p>
//           <motion.h1
//             initial={{ opacity: 0, y: 28 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
//             className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
//           >
//             Who we are
//           </motion.h1>
//         </motion.div>
//       </section>

//       {/* Intro pull-quote */}
//       <section className="relative border-b border-border bg-white">
//         <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
//           <Reveal>
//             <p className="text-center text-2xl font-medium leading-relaxed text-foreground sm:text-3xl lg:text-4xl lg:leading-snug">
//               {whoWeAreIntro}
//             </p>
//           </Reveal>
//         </div>
//       </section>

//       {/* Story */}
//       <section className="relative overflow-hidden bg-background-soft">
//         <div className="pointer-events-none absolute -right-20 top-20 h-80 w-80 rounded-full bg-orange/15 blur-3xl" />
//         <div className="pointer-events-none absolute -left-16 bottom-10 h-72 w-72 rounded-full bg-blue/15 blur-3xl" />

//         <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
//           <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
//             <div className="lg:col-span-4">
//               <div className="lg:sticky lg:top-28">
//                 <Reveal>
//                   <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
//                     Our story
//                   </p>
//                   <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
//                     What we believe drives how we work
//                   </h2>
//                 </Reveal>
//               </div>
//             </div>

//             <div className="lg:col-span-8 space-y-6">
//               {whoWeAreStory.map((para, i) => (
//                 <Reveal key={i} delay={i * 0.08}>
//                   <p className="text-base leading-relaxed text-foreground-muted sm:text-lg">
//                     {para}
//                   </p>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Vision + Mission */}
//       <section className="border-y border-border bg-white">
//         <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
//           <div className="grid gap-8 md:grid-cols-2">
//             <Reveal>
//               <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-background-soft p-8 sm:p-10 transition-all duration-300 hover:shadow-xl hover:border-orange/30">
//                 <div className="mb-6 h-1.5 w-14 rounded-full bg-gradient-to-r from-orange to-red transition-all duration-300 group-hover:w-20" />
//                 <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
//                   {vision.title}
//                 </h3>
//                 <p className="mt-5 text-base leading-relaxed text-foreground-muted sm:text-lg">
//                   {vision.text}
//                 </p>
//               </div>
//             </Reveal>

//             <Reveal delay={0.1}>
//               <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-blue to-[#1d4ed8] p-8 sm:p-10 text-white transition-all duration-300 hover:shadow-xl">
//                 <div className="mb-6 h-1.5 w-14 rounded-full bg-gradient-to-r from-yellow to-orange transition-all duration-300 group-hover:w-20" />
//                 <h3 className="text-2xl font-bold sm:text-3xl">{mission.title}</h3>
//                 <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
//                   {mission.text}
//                 </p>
//               </div>
//             </Reveal>
//           </div>
//         </div>
//       </section>

//       {/* Values */}
//       <section className="relative overflow-hidden bg-background-soft">
//         <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
//           <Reveal className="mx-auto mb-14 max-w-2xl text-center">
//             <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
//               How we work
//             </p>
//             <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
//               Our values
//             </h2>
//             <p className="mt-4 text-foreground-muted">
//               The principles that shape every decision, partnership and project.
//             </p>
//           </Reveal>

//           <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-6">
//             {coreValues.map((value, i) => (
//               <Reveal key={value} delay={i * 0.06}>
//                 <div
//                   className={cn(
//                     "group flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-white px-4 py-8 text-center transition-all duration-300",
//                     "hover:-translate-y-1 hover:shadow-lg hover:border-orange/40"
//                   )}
//                 >
//                   <span
//                     className={cn(
//                       "mb-4 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white",
//                       [
//                         "bg-orange",
//                         "bg-red",
//                         "bg-blue",
//                         "bg-lime",
//                         "bg-teal",
//                         "bg-yellow",
//                       ][i % 6]
//                     )}
//                   >
//                     {String(i + 1).padStart(2, "0")}
//                   </span>
//                   <h3 className="text-sm font-bold text-foreground sm:text-base leading-snug">
//                     {value}
//                   </h3>
//                 </div>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Explore links */}
//       <section className="border-t border-border bg-white">
//         <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
//           <Reveal className="mb-12">
//             <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
//               Go deeper
//             </p>
//             <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
//               Explore who we are
//             </h2>
//           </Reveal>

//           <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
//             {exploreLinks.map((item, i) => (
//               <Reveal key={item.href} delay={i * 0.07}>
//                 <Link
//                   href={item.href}
//                   className={cn(
//                     "group flex h-full flex-col rounded-2xl border border-border bg-background-elevated p-6 transition-all duration-300",
//                     "hover:-translate-y-1 hover:shadow-lg hover:border-orange/30"
//                   )}
//                 >
//                   <div className="mb-4 flex items-start justify-between">
//                     <span className="text-xs font-bold uppercase tracking-wider text-orange">
//                       {String(i + 1).padStart(2, "0")}
//                     </span>
//                     <ArrowUpRight className="h-5 w-5 text-foreground-subtle transition-all duration-300 group-hover:text-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//                   </div>
//                   <h3 className="text-lg font-bold text-foreground group-hover:text-orange transition-colors">
//                     {item.title}
//                   </h3>
//                   <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
//                     {item.description}
//                   </p>
//                 </Link>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="relative overflow-hidden bg-gradient-to-r from-orange via-red to-yellow">
//         <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
//           <Reveal>
//             <h2 className="text-3xl font-bold text-white sm:text-4xl">
//               Ready to work with us?
//             </h2>
//           </Reveal>
//           <Reveal delay={0.08}>
//             <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
//               Let&apos;s discuss how Joshcalebwill can support your next energy
//               project.
//             </p>
//           </Reveal>
//           <Reveal delay={0.14}>
//             <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
//               <Link
//                 href="/who-we-are/contact-us"
//                 className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-orange shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
//               >
//                 Contact us
//               </Link>
//               <Link
//                 href="/what-we-do"
//                 className="inline-flex items-center justify-center rounded-full border-2 border-white/90 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white hover:text-orange"
//               >
//                 What we do
//               </Link>
//             </div>
//           </Reveal>
//         </div>
//       </section>
//     </div>
//   );
// }


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
  whoWeAreIntro,
  whoWeAreStory,
  vision,
  mission,
  coreValues,
  exploreLinks,
} from "@/data/whoWeAre";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Reveal on scroll                                                   */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/*  Parallax layer helper                                              */
/* ------------------------------------------------------------------ */
function ParallaxLayer({
  children,
  className,
  strength = 80,
  direction = 1,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  direction?: 1 | -1;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [strength * direction, -strength * direction]
  );
  const smoothY = useSpring(y, { stiffness: 90, damping: 28 });

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function WhoWeArePage() {
  const heroRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLElement>(null);

  /* Hero parallax */
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "40%"]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);
  const heroTitleY = useTransform(heroProgress, [0, 1], ["0%", "25%"]);
  const smoothHeroY = useSpring(heroY, { stiffness: 80, damping: 25 });
  const smoothHeroScale = useSpring(heroScale, { stiffness: 80, damping: 25 });

  /* Intro parallax */
  const { scrollYProgress: introProgress } = useScroll({
    target: introRef,
    offset: ["start end", "end start"],
  });
  const introY = useTransform(introProgress, [0, 1], [40, -40]);
  const smoothIntroY = useSpring(introY, { stiffness: 100, damping: 30 });

  /* Story section blobs */
  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"],
  });
  const blob1Y = useTransform(storyProgress, [0, 1], [100, -120]);
  const blob2Y = useTransform(storyProgress, [0, 1], [60, -80]);
  const smoothBlob1 = useSpring(blob1Y, { stiffness: 70, damping: 25 });
  const smoothBlob2 = useSpring(blob2Y, { stiffness: 70, damping: 25 });

  /* Values section blobs */
  const { scrollYProgress: valuesProgress } = useScroll({
    target: valuesRef,
    offset: ["start end", "end start"],
  });
  const valuesBlobY = useTransform(valuesProgress, [0, 1], [80, -100]);
  const smoothValuesBlob = useSpring(valuesBlobY, {
    stiffness: 70,
    damping: 25,
  });

  return (
    <div className="bg-background overflow-x-hidden">
      {/* ========== HERO – parallax background + title ========== */}
      <section
        ref={heroRef}
        className="relative h-[75vh] min-h-[500px] max-h-[780px] overflow-hidden"
      >
        <motion.div
          style={{ y: smoothHeroY, scale: smoothHeroScale }}
          className="absolute inset-0 origin-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue via-[#2563eb] to-orange/80" />
          <Image
            src="/assets/hero/hero-01.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-40 mix-blend-overlay"
            sizes="100vw"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue/50 via-transparent to-white/10" />

        <motion.div
          style={{ opacity: heroOpacity, y: heroTitleY }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-20 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-white/80"
          >
            Joshcalebwill
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Who we are
          </motion.h1>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-5 rounded-full border-2 border-white/50 flex justify-center pt-1.5"
          >
            <div className="h-1.5 w-1 rounded-full bg-white/80" />
          </motion.div>
        </motion.div>
      </section>

      {/* ========== INTRO – parallax text ========== */}
      <section
        ref={introRef}
        className="relative border-b border-border bg-white overflow-hidden"
      >
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <motion.div style={{ y: smoothIntroY }}>
            <Reveal>
              <p className="text-center text-2xl font-medium leading-relaxed text-foreground sm:text-3xl lg:text-4xl lg:leading-snug">
                {whoWeAreIntro}
              </p>
            </Reveal>
          </motion.div>
        </div>
      </section>

      {/* ========== STORY – parallax blobs ========== */}
      <section
        ref={storyRef}
        className="relative overflow-hidden bg-background-soft"
      >
        <motion.div
          style={{ y: smoothBlob1 }}
          className="pointer-events-none absolute -right-20 top-10 h-96 w-96 rounded-full bg-orange/20 blur-3xl"
        />
        <motion.div
          style={{ y: smoothBlob2 }}
          className="pointer-events-none absolute -left-16 bottom-0 h-80 w-80 rounded-full bg-blue/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <ParallaxLayer strength={30} direction={-1}>
                  <Reveal>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
                      Our story
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                      What we believe drives how we work
                    </h2>
                  </Reveal>
                </ParallaxLayer>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              {whoWeAreStory.map((para, i) => (
                <ParallaxLayer
                  key={i}
                  strength={20 + i * 6}
                  direction={i % 2 === 0 ? 1 : -1}
                >
                  <Reveal delay={i * 0.06}>
                    <p className="text-base leading-relaxed text-foreground-muted sm:text-lg">
                      {para}
                    </p>
                  </Reveal>
                </ParallaxLayer>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== VISION + MISSION – offset parallax cards ========== */}
      <section className="border-y border-border bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-8 md:grid-cols-2">
            <ParallaxLayer strength={45} direction={1}>
              <Reveal>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-background-soft p-8 sm:p-10 transition-all duration-300 hover:shadow-xl hover:border-orange/30">
                  <div className="mb-6 h-1.5 w-14 rounded-full bg-gradient-to-r from-orange to-red transition-all duration-300 group-hover:w-20" />
                  <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
                    {vision.title}
                  </h3>
                  <p className="mt-5 text-base leading-relaxed text-foreground-muted sm:text-lg">
                    {vision.text}
                  </p>
                </div>
              </Reveal>
            </ParallaxLayer>

            <ParallaxLayer strength={45} direction={-1}>
              <Reveal delay={0.1}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-blue to-[#1d4ed8] p-8 sm:p-10 text-white transition-all duration-300 hover:shadow-xl">
                  <div className="mb-6 h-1.5 w-14 rounded-full bg-gradient-to-r from-yellow to-orange transition-all duration-300 group-hover:w-20" />
                  <h3 className="text-2xl font-bold sm:text-3xl">
                    {mission.title}
                  </h3>
                  <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
                    {mission.text}
                  </p>
                </div>
              </Reveal>
            </ParallaxLayer>
          </div>
        </div>
      </section>

      {/* ========== VALUES – parallax ambient ========== */}
      <section
        ref={valuesRef}
        className="relative overflow-hidden bg-background-soft"
      >
        <motion.div
          style={{ y: smoothValuesBlob }}
          className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-lime/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
              How we work
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our values
            </h2>
            <p className="mt-4 text-foreground-muted">
              The principles that shape every decision, partnership and project.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-6">
            {coreValues.map((value, i) => (
              <ParallaxLayer
                key={value}
                strength={15 + (i % 3) * 10}
                direction={i % 2 === 0 ? 1 : -1}
              >
                <Reveal delay={i * 0.05}>
                  <div
                    className={cn(
                      "group flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-white px-4 py-8 text-center transition-all duration-300",
                      "hover:-translate-y-1 hover:shadow-lg hover:border-orange/40"
                    )}
                  >
                    <span
                      className={cn(
                        "mb-4 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white",
                        [
                          "bg-orange",
                          "bg-red",
                          "bg-blue",
                          "bg-lime",
                          "bg-teal",
                          "bg-yellow",
                        ][i % 6]
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-sm font-bold text-foreground sm:text-base leading-snug">
                      {value}
                    </h3>
                  </div>
                </Reveal>
              </ParallaxLayer>
            ))}
          </div>
        </div>
      </section>

      {/* ========== EXPLORE ========== */}
      <section className="border-t border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
              Go deeper
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Explore who we are
            </h2>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {exploreLinks.map((item, i) => (
              <Reveal key={item.href} delay={i * 0.07}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex h-full flex-col rounded-2xl border border-border bg-background-elevated p-6 transition-all duration-300",
                    "hover:-translate-y-1 hover:shadow-lg hover:border-orange/30"
                  )}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-orange">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-foreground-subtle transition-all duration-300 group-hover:text-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
                    {item.description}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange via-red to-yellow">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to work with us?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
              Let&apos;s discuss how Joshcalebwill can support your next energy
              project.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/who-we-are/contact-us"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-orange shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Contact us
              </Link>
              <Link
                href="/what-we-do"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/90 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white hover:text-orange"
              >
                What we do
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
