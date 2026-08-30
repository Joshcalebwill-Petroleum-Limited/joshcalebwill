// "use client";

// import { useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   motion,
//   useInView,
//   useScroll,
//   useTransform,
//   useSpring,
// } from "framer-motion";
// import {
//   whatWeDoHero,
//   whatWeDoStory,
//   whatWeDoInnovation,
//   whatWeDoReach,
//   serviceCards,
// } from "@/data/whatWeDo";
// import { cn } from "@/lib/utils";
// import { ArrowUpRight, ArrowRight } from "lucide-react";

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
//       initial={{ opacity: 0, y: 40 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{
//         duration: 0.7,
//         delay,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// }

// const accentBar: Record<string, string> = {
//   orange: "bg-orange",
//   red: "bg-red",
//   blue: "bg-blue",
//   teal: "bg-teal",
//   lime: "bg-lime",
//   yellow: "bg-yellow",
//   cyan: "bg-cyan",
// };

// const collageImages = [
//   "/assets/hero/hero-01.jpg",
//   "/assets/hero/hero-02.jpg",
//   "/assets/hero/hero-03.jpg",
//   "/assets/hero/hero-04.jpg",
// ];

// export default function WhatWeDoPage() {
//   const heroRef = useRef<HTMLElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: heroRef,
//     offset: ["start start", "end start"],
//   });
//   const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
//   const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
//   const smoothY = useSpring(heroY, { stiffness: 80, damping: 25 });

//   return (
//     <div className="bg-background overflow-x-hidden">
//       {/* Hero */}
//       <section
//         ref={heroRef}
//         className="relative h-[70vh] min-h-[480px] max-h-[720px] overflow-hidden"
//       >
//         <motion.div style={{ y: smoothY }} className="absolute inset-0 scale-110">
//           <Image
//             src="/assets/hero/hero-01.jpg"
//             alt=""
//             fill
//             priority
//             className="object-cover"
//             sizes="100vw"
//             onError={(e) => {
//               (e.target as HTMLImageElement).style.display = "none";
//             }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-blue/50 via-blue/40 to-background" />
//         </motion.div>

//         <motion.div
//           style={{ opacity: heroOpacity }}
//           className="relative z-10 flex h-full flex-col items-center justify-end px-4 pb-16 pt-24 text-center sm:pb-20"
//         >
//           <motion.h1
//             initial={{ opacity: 0, y: 28 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
//             className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
//           >
//             {whatWeDoHero.title}
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 18 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.55, delay: 0.3 }}
//             className="mt-5 max-w-2xl text-base text-white/90 sm:text-lg leading-relaxed"
//           >
//             {whatWeDoHero.subtitle}
//           </motion.p>
//         </motion.div>
//       </section>

//       {/* Story band – deep blue */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-blue via-[#1d4ed8] to-[#1e3a8a]">
//         <div className="pointer-events-none absolute inset-0 opacity-30">
//           <div className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-orange/40 blur-3xl" />
//           <div className="absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-cyan/30 blur-3xl" />
//         </div>

//         <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
//           <div className="mx-auto max-w-3xl text-center">
//             <Reveal>
//               <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white/60">
//                 {whatWeDoStory.eyebrow}
//               </p>
//               <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">
//                 {whatWeDoStory.title}
//               </h2>
//               <p className="mt-6 text-base leading-relaxed text-white/85 sm:text-lg">
//                 {whatWeDoStory.text}
//               </p>
//               <Link
//                 href={whatWeDoStory.cta.href}
//                 className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-white/80 px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-blue"
//               >
//                 <span>→</span> {whatWeDoStory.cta.label}
//               </Link>
//             </Reveal>
//           </div>

//           <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
//             {collageImages.map((src, i) => (
//               <Reveal key={src} delay={i * 0.08}>
//                 <motion.div
//                   whileHover={{ y: -6 }}
//                   transition={{ type: "spring", stiffness: 300, damping: 22 }}
//                   className={cn(
//                     "relative overflow-hidden rounded-2xl shadow-xl",
//                     i % 2 === 1 ? "aspect-[4/5] lg:mt-10" : "aspect-[4/3]"
//                   )}
//                 >
//                   <Image
//                     src={src}
//                     alt=""
//                     fill
//                     className="object-cover"
//                     sizes="(max-width:1024px) 50vw, 25vw"
//                     onError={(e) => {
//                       (e.target as HTMLImageElement).style.display = "none";
//                     }}
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-blue/30 to-transparent" />
//                 </motion.div>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Innovation – teal */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-teal via-[#0d9488] to-blue">
//         <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
//           <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
//             <Reveal>
//               <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
//                 {whatWeDoInnovation.eyebrow}
//               </p>
//               <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
//                 {whatWeDoInnovation.title}
//               </h2>
//               <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
//                 {whatWeDoInnovation.text}
//               </p>
//               <Link
//                 href={whatWeDoInnovation.cta.href}
//                 className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-white/80 px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-teal"
//               >
//                 <span>→</span> {whatWeDoInnovation.cta.label}
//               </Link>
//             </Reveal>

//             <Reveal delay={0.12}>
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 transition={{ type: "spring", stiffness: 280, damping: 24 }}
//                 className="relative aspect-[16/11] overflow-hidden rounded-3xl shadow-2xl"
//               >
//                 <Image
//                   src="/assets/hero/hero-03.jpg"
//                   alt=""
//                   fill
//                   className="object-cover"
//                   sizes="(max-width:1024px) 100vw, 50vw"
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).style.display = "none";
//                   }}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-tr from-teal/40 via-transparent to-orange/20" />
//               </motion.div>
//             </Reveal>
//           </div>
//         </div>
//       </section>

//       {/* Reach – brand gradient with giant type */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-[#7c3aed]/90 via-red to-orange">
//         <div
//           aria-hidden
//           className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
//         >
//           <p className="text-[12vw] font-bold leading-none tracking-tighter text-white/[0.07] whitespace-nowrap">
//             across Africa
//           </p>
//         </div>

//         <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
//           <div className="mx-auto max-w-3xl text-center">
//             <Reveal>
//               <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
//                 {whatWeDoReach.eyebrow}
//               </p>
//               <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
//                 {whatWeDoReach.title}
//               </h2>
//               <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
//                 {whatWeDoReach.text}
//               </p>
//             </Reveal>
//           </div>

//           <div className="mt-14 grid gap-5 sm:grid-cols-2 max-w-3xl mx-auto">
//             {["/assets/hero/hero-02.jpg", "/assets/hero/hero-04.jpg"].map(
//               (src, i) => (
//                 <Reveal key={src} delay={i * 0.1}>
//                   <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
//                     <Image
//                       src={src}
//                       alt=""
//                       fill
//                       className="object-cover"
//                       sizes="(max-width:640px) 100vw, 40vw"
//                       onError={(e) => {
//                         (e.target as HTMLImageElement).style.display = "none";
//                       }}
//                     />
//                   </div>
//                 </Reveal>
//               )
//             )}
//           </div>

//           <Reveal delay={0.15} className="mt-10 text-center">
//             <Link
//               href={whatWeDoReach.cta.href}
//               className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-orange"
//             >
//               <span>→</span> {whatWeDoReach.cta.label}
//             </Link>
//           </Reveal>
//         </div>
//       </section>

//       {/* Services grid */}
//       <section
//         id="services"
//         className="relative border-y border-border bg-background-soft scroll-mt-24"
//       >
//         <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
//           <Reveal className="mx-auto mb-14 max-w-2xl text-center">
//             <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
//               Capabilities
//             </p>
//             <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
//               Our services
//             </h2>
//             <p className="mt-4 text-foreground-muted">
//               Eight integrated offerings spanning the energy value chain —
//               delivered with professionalism, safety and technical excellence.
//             </p>
//           </Reveal>

//           <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
//             {serviceCards.map((service, i) => (
//               <Reveal key={service.href} delay={(i % 4) * 0.06}>
//                 <Link
//                   href={service.href}
//                   className={cn(
//                     "group flex h-full flex-col rounded-2xl border border-border bg-white p-6 transition-all duration-300",
//                     "hover:-translate-y-1.5 hover:shadow-xl hover:border-orange/30"
//                   )}
//                 >
//                   <div
//                     className={cn(
//                       "mb-5 h-1 w-10 rounded-full transition-all duration-300 group-hover:w-16",
//                       accentBar[service.accent] ?? "bg-orange"
//                     )}
//                   />
//                   <h3 className="text-lg font-bold text-foreground group-hover:text-orange transition-colors leading-snug">
//                     {service.title}
//                   </h3>
//                   <p className="mt-2 flex-1 text-sm text-foreground-muted leading-relaxed">
//                     {service.description}
//                   </p>
//                   <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-orange opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
//                     Learn more
//                     <ArrowRight className="h-3.5 w-3.5" />
//                   </span>
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
//               Ready to discuss your next project?
//             </h2>
//           </Reveal>
//           <Reveal delay={0.08}>
//             <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
//               Tell us what you need — our team will respond with clarity and
//               speed.
//             </p>
//           </Reveal>
//           <Reveal delay={0.14}>
//             <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
//               <Link
//                 href="/who-we-are/contact-us"
//                 className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-orange shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
//               >
//                 Contact us
//                 <ArrowUpRight className="h-4 w-4" />
//               </Link>
//               <Link
//                 href="/who-we-are"
//                 className="inline-flex items-center justify-center rounded-full border-2 border-white/90 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white hover:text-orange"
//               >
//                 Who we are
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
  whatWeDoHero,
  whatWeDoStory,
  whatWeDoInnovation,
  whatWeDoReach,
  serviceCards,
} from "@/data/whatWeDo";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowRight } from "lucide-react";

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
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
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

const accentBar: Record<string, string> = {
  orange: "bg-orange",
  red: "bg-red",
  blue: "bg-blue",
  teal: "bg-teal",
  lime: "bg-lime",
  yellow: "bg-yellow",
  cyan: "bg-cyan",
};

const collageImages = [
  "/assets/hero/hero-01.jpg",
  "/assets/hero/hero-02.jpg",
  "/assets/hero/hero-03.jpg",
  "/assets/hero/hero-04.jpg",
];

export default function WhatWeDoPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const smoothY = useSpring(heroY, { stiffness: 80, damping: 25 });

  return (
    <div className="bg-background overflow-x-hidden">
      {/* Hero image band */}
      <section
        ref={heroRef}
        className="relative h-[52vh] min-h-[340px] max-h-[560px] overflow-hidden"
      >
        <motion.div style={{ y: smoothY }} className="absolute inset-0 scale-110">
          <Image
            src="/assets/hero/hero-01.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue/25 via-transparent to-white" />
        </motion.div>
      </section>

      {/* Clipped-text title – image shows through letters (Chevron style) */}
      <section className="relative -mt-16 sm:-mt-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 pt-4 pb-12 sm:px-6 lg:px-8 lg:pb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl bg-cover bg-center bg-no-repeat bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
            style={{
              backgroundImage: "url(/assets/hero/hero-01.jpg)",
              backgroundPosition: "center 35%",
            }}
          >
            {whatWeDoHero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28 }}
            className="mt-6 max-w-2xl mx-auto text-base text-foreground-muted sm:text-lg leading-relaxed"
          >
            {whatWeDoHero.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Story band – deep blue */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue via-[#1d4ed8] to-[#1e3a8a]">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-orange/40 blur-3xl" />
          <div className="absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-cyan/30 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white/60">
                {whatWeDoStory.eyebrow}
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">
                {whatWeDoStory.title}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/85 sm:text-lg">
                {whatWeDoStory.text}
              </p>
              <Link
                href={whatWeDoStory.cta.href}
                className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-white/80 px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-blue"
              >
                <span>→</span> {whatWeDoStory.cta.label}
              </Link>
            </Reveal>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {collageImages.map((src, i) => (
              <Reveal key={src} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className={cn(
                    "relative overflow-hidden rounded-2xl shadow-xl",
                    i % 2 === 1 ? "aspect-[4/5] lg:mt-10" : "aspect-[4/3]"
                  )}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 50vw, 25vw"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue/30 to-transparent" />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation – teal */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal via-[#0d9488] to-blue">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
                {whatWeDoInnovation.eyebrow}
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {whatWeDoInnovation.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
                {whatWeDoInnovation.text}
              </p>
              <Link
                href={whatWeDoInnovation.cta.href}
                className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-white/80 px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-teal"
              >
                <span>→</span> {whatWeDoInnovation.cta.label}
              </Link>
            </Reveal>

            <Reveal delay={0.12}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className="relative aspect-[16/11] overflow-hidden rounded-3xl shadow-2xl"
              >
                <Image
                  src="/assets/hero/hero-03.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-teal/40 via-transparent to-orange/20" />
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Reach – brand gradient with giant type */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#7c3aed]/90 via-red to-orange">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
        >
          <p className="text-[12vw] font-bold leading-none tracking-tighter text-white/[0.07] whitespace-nowrap">
            across Africa
          </p>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
                {whatWeDoReach.eyebrow}
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {whatWeDoReach.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
                {whatWeDoReach.text}
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 max-w-3xl mx-auto">
            {["/assets/hero/hero-02.jpg", "/assets/hero/hero-04.jpg"].map(
              (src, i) => (
                <Reveal key={src} delay={i * 0.1}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width:640px) 100vw, 40vw"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                </Reveal>
              )
            )}
          </div>

          <Reveal delay={0.15} className="mt-10 text-center">
            <Link
              href={whatWeDoReach.cta.href}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-orange"
            >
              <span>→</span> {whatWeDoReach.cta.label}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Services grid */}
      <section
        id="services"
        className="relative border-y border-border bg-background-soft scroll-mt-24"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
              Capabilities
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our services
            </h2>
            <p className="mt-4 text-foreground-muted">
              Eight integrated offerings spanning the energy value chain —
              delivered with professionalism, safety and technical excellence.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCards.map((service, i) => (
              <Reveal key={service.href} delay={(i % 4) * 0.06}>
                <Link
                  href={service.href}
                  className={cn(
                    "group flex h-full flex-col rounded-2xl border border-border bg-white p-6 transition-all duration-300",
                    "hover:-translate-y-1.5 hover:shadow-xl hover:border-orange/30"
                  )}
                >
                  <div
                    className={cn(
                      "mb-5 h-1 w-10 rounded-full transition-all duration-300 group-hover:w-16",
                      accentBar[service.accent] ?? "bg-orange"
                    )}
                  />
                  <h3 className="text-lg font-bold text-foreground group-hover:text-orange transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-foreground-muted leading-relaxed">
                    {service.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-orange opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange via-red to-yellow">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to discuss your next project?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
              Tell us what you need — our team will respond with clarity and
              speed.
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
                href="/who-we-are"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/90 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white hover:text-orange"
              >
                Who we are
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
