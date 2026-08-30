// "use client";

// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   motion,
//   AnimatePresence,
//   useInView,
//   useScroll,
//   useTransform,
//   useSpring,
// } from "framer-motion";
// import { leaders, type Leader } from "@/data/leadership";
// import { cn } from "@/lib/utils";
// import { ArrowUpRight, X, ChevronDown } from "lucide-react";

// const accentGradient: Record<Leader["accent"], string> = {
//   orange: "from-orange to-red",
//   red: "from-red to-orange",
//   blue: "from-blue to-cyan",
//   teal: "from-teal to-lime",
//   lime: "from-lime to-teal",
//   yellow: "from-yellow to-orange",
// };

// const accentSolid: Record<Leader["accent"], string> = {
//   orange: "bg-orange",
//   red: "bg-red",
//   blue: "bg-blue",
//   teal: "bg-teal",
//   lime: "bg-lime",
//   yellow: "bg-yellow",
// };

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
//   const inView = useInView(ref, { once: true, margin: "-50px" });

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 40 }}
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

// function getInitials(name: string) {
//   return name
//     .split(" ")
//     .filter(Boolean)
//     .slice(0, 2)
//     .map((n) => n[0])
//     .join("")
//     .toUpperCase();
// }

// /* ------------------------------------------------------------------ */
// /*  Portrait                                                           */
// /* ------------------------------------------------------------------ */
// function LeaderPortrait({
//   leader,
//   className,
//   sizes = "400px",
// }: {
//   leader: Leader;
//   className?: string;
//   sizes?: string;
// }) {
//   const [imgError, setImgError] = useState(false);

//   return (
//     <div
//       className={cn(
//         "absolute inset-0 overflow-hidden bg-background-soft",
//         className
//       )}
//     >
//       {!imgError && leader.image ? (
//         <Image
//           src={leader.image}
//           alt={leader.name}
//           fill
//           className="object-cover object-top"
//           sizes={sizes}
//           onError={() => setImgError(true)}
//         />
//       ) : (
//         <div
//           className={cn(
//             "absolute inset-0 flex items-center justify-center bg-gradient-to-br",
//             accentGradient[leader.accent]
//           )}
//         >
//           <span className="text-5xl font-bold text-white/90 sm:text-6xl">
//             {getInitials(leader.name)}
//           </span>
//         </div>
//       )}
//       <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-blue/40 via-transparent to-transparent opacity-70" />
//     </div>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  Bio panel – body scroll locked, panel scrolls                      */
// /* ------------------------------------------------------------------ */
// function BioPanel({
//   leader,
//   onClose,
// }: {
//   leader: Leader;
//   onClose: () => void;
// }) {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   // Lock page scroll while modal is open
//   useEffect(() => {
//     const prevOverflow = document.body.style.overflow;
//     const prevPadding = document.body.style.paddingRight;
//     const scrollbar = window.innerWidth - document.documentElement.clientWidth;

//     document.body.style.overflow = "hidden";
//     if (scrollbar > 0) {
//       document.body.style.paddingRight = `${scrollbar}px`;
//     }

//     return () => {
//       document.body.style.overflow = prevOverflow;
//       document.body.style.paddingRight = prevPadding;
//     };
//   }, []);

//   // Escape key closes
//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [onClose]);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.25 }}
//       className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-6"
//       // Capture wheel on overlay so it never reaches the page
//       onWheel={(e) => {
//         // Allow wheel only inside the scrollable body
//         const target = e.target as Node;
//         if (scrollRef.current?.contains(target)) return;
//         e.preventDefault();
//       }}
//       onTouchMove={(e) => {
//         const target = e.target as Node;
//         if (scrollRef.current?.contains(target)) return;
//         e.preventDefault();
//       }}
//     >
//       {/* Backdrop */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 bg-blue/45 backdrop-blur-md"
//         onClick={onClose}
//       />

//       {/* Panel */}
//       <motion.div
//         layoutId={`leader-panel-${leader.id}`}
//         initial={{ y: 100, opacity: 0, scale: 0.96 }}
//         animate={{ y: 0, opacity: 1, scale: 1 }}
//         exit={{ y: 60, opacity: 0, scale: 0.97 }}
//         transition={{ type: "spring", stiffness: 320, damping: 30 }}
//         className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl"
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby={`leader-name-${leader.id}`}
//       >
//         {/* Header */}
//         <div className="relative flex shrink-0 items-end gap-5 border-b border-border bg-background-soft p-6 sm:p-8">
//           <motion.div
//             layoutId={`leader-photo-${leader.id}`}
//             className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl sm:h-24 sm:w-24 shadow-md"
//             transition={{ type: "spring", stiffness: 300, damping: 28 }}
//           >
//             <LeaderPortrait leader={leader} sizes="96px" />
//           </motion.div>

//           <div className="min-w-0 flex-1 pb-1 pr-10">
//             <motion.div
//               layoutId={`leader-bar-${leader.id}`}
//               className={cn(
//                 "mb-2 h-1 w-10 rounded-full bg-gradient-to-r",
//                 accentGradient[leader.accent]
//               )}
//             />
//             <motion.h3
//               layoutId={`leader-name-${leader.id}`}
//               id={`leader-name-${leader.id}`}
//               className="text-xl font-bold text-foreground sm:text-2xl"
//             >
//               {leader.name}
//             </motion.h3>
//             <motion.p
//               layoutId={`leader-title-${leader.id}`}
//               className="mt-0.5 text-sm font-medium text-orange"
//             >
//               {leader.title}
//             </motion.p>
//           </div>

//           <motion.button
//             type="button"
//             onClick={onClose}
//             initial={{ opacity: 0, rotate: -40 }}
//             animate={{ opacity: 1, rotate: 0 }}
//             transition={{ delay: 0.15 }}
//             className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-border text-foreground shadow-sm transition hover:bg-background-soft hover:scale-105"
//             aria-label="Close"
//           >
//             <X className="h-5 w-5" />
//           </motion.button>
//         </div>

//         {/* Scrollable body – min-h-0 is critical for flex overflow */}
//         <div
//           ref={scrollRef}
//           className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-4"
//           style={{ WebkitOverflowScrolling: "touch" }}
//         >
//           {leader.bio.map((para, i) => (
//             <motion.p
//               key={i}
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.12 + i * 0.06, duration: 0.4 }}
//               className="text-base leading-relaxed text-foreground-muted"
//             >
//               {para}
//             </motion.p>
//           ))}

//           {leader.credentials && leader.credentials.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.35, duration: 0.4 }}
//               className="mt-6 rounded-2xl border border-border bg-background-soft p-5"
//             >
//               <p className="mb-3 text-xs font-bold uppercase tracking-wider text-orange">
//                 Credentials
//               </p>
//               <ul className="space-y-2">
//                 {leader.credentials.map((c, i) => (
//                   <motion.li
//                     key={c}
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.4 + i * 0.05 }}
//                     className="flex items-start gap-2 text-sm text-foreground"
//                   >
//                     <span
//                       className={cn(
//                         "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
//                         accentSolid[leader.accent]
//                       )}
//                     />
//                     {c}
//                   </motion.li>
//                 ))}
//               </ul>
//             </motion.div>
//           )}
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  Page                                                               */
// /* ------------------------------------------------------------------ */
// export default function LeadershipPage() {
//   const [activeLeader, setActiveLeader] = useState<Leader | null>(null);
//   const heroRef = useRef<HTMLElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: heroRef,
//     offset: ["start start", "end start"],
//   });
//   const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
//   const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
//   const smoothY = useSpring(heroY, { stiffness: 80, damping: 25 });

//   const md = leaders[0];
//   const rest = leaders.slice(1);

//   return (
//     <div className="bg-background overflow-x-hidden">
//       {/* Hero */}
//       <section
//         ref={heroRef}
//         className="relative h-[60vh] min-h-[400px] max-h-[620px] overflow-hidden"
//       >
//         <motion.div
//           style={{ y: smoothY }}
//           className="absolute inset-0 scale-110"
//         >
//           <div className="absolute inset-0 bg-gradient-to-br from-blue via-[#1d4ed8] to-orange/70" />
//         </motion.div>
//         <div className="absolute inset-0 bg-gradient-to-t from-blue/40 via-transparent to-white/10" />

//         <motion.div
//           style={{ opacity: heroOpacity }}
//           className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-16 text-center"
//         >
//           <motion.p
//             initial={{ opacity: 0, y: 12 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.45, delay: 0.1 }}
//             className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-white/80"
//           >
//             Who we are
//           </motion.p>
//           <motion.h1
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{
//               duration: 0.7,
//               delay: 0.18,
//               ease: [0.22, 1, 0.36, 1],
//             }}
//             className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
//           >
//             Our leadership
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.32 }}
//             className="mt-4 max-w-xl text-base text-white/85 sm:text-lg"
//           >
//             Experience, integrity and technical depth guiding every project.
//           </motion.p>
//         </motion.div>
//       </section>

//       {/* Featured MD */}
//       <section className="relative border-b border-border bg-background-soft overflow-hidden">
//         <div className="pointer-events-none absolute -left-20 top-20 h-80 w-80 rounded-full bg-orange/20 blur-3xl" />
//         <div className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-blue/15 blur-3xl" />

//         <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
//           <Reveal>
//             <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
//               Managing Director
//             </p>
//           </Reveal>

//           <div className="mt-6 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
//             <Reveal className="lg:col-span-5" delay={0.05}>
//               <motion.button
//                 type="button"
//                 onClick={() => setActiveLeader(md)}
//                 whileHover={{ scale: 1.02 }}
//                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                 className="group relative w-full overflow-hidden rounded-3xl shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
//               >
//                 <motion.div
//                   layoutId={
//                     activeLeader?.id === md.id
//                       ? undefined
//                       : `leader-photo-${md.id}`
//                   }
//                   className="relative aspect-[4/5] w-full"
//                   transition={{ type: "spring", stiffness: 300, damping: 28 }}
//                 >
//                   <LeaderPortrait
//                     leader={md}
//                     sizes="(max-width:1024px) 100vw, 40vw"
//                   />
//                 </motion.div>
//                 <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue/80 to-transparent p-6 pt-20">
//                   <p className="text-sm font-medium text-white/80">
//                     Click to read full profile
//                   </p>
//                 </div>
//               </motion.button>
//             </Reveal>

//             <div className="lg:col-span-7">
//               <Reveal delay={0.1}>
//                 <div
//                   className={cn(
//                     "mb-5 h-1.5 w-14 rounded-full bg-gradient-to-r",
//                     accentGradient[md.accent]
//                   )}
//                 />
//                 <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
//                   {md.name}
//                 </h2>
//                 <p className="mt-2 text-base font-semibold text-orange sm:text-lg">
//                   {md.title}
//                 </p>
//               </Reveal>

//               <Reveal delay={0.16}>
//                 <p className="mt-6 text-base leading-relaxed text-foreground-muted sm:text-lg">
//                   {md.shortBio}
//                 </p>
//               </Reveal>

//               {md.credentials && (
//                 <Reveal delay={0.2}>
//                   <div className="mt-6 flex flex-wrap gap-2">
//                     {md.credentials.map((c) => (
//                       <span
//                         key={c}
//                         className="rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-medium text-foreground-muted"
//                       >
//                         {c}
//                       </span>
//                     ))}
//                   </div>
//                 </Reveal>
//               )}

//               <Reveal delay={0.26}>
//                 <button
//                   type="button"
//                   onClick={() => setActiveLeader(md)}
//                   className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-red hover:shadow-lg hover:-translate-y-0.5"
//                 >
//                   Read full profile
//                   <ChevronDown className="h-4 w-4" />
//                 </button>
//               </Reveal>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Team grid */}
//       <section className="border-b border-border bg-white">
//         <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
//           <Reveal className="mb-12 max-w-2xl">
//             <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
//               The team
//             </p>
//             <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
//               Directors &amp; executive leadership
//             </h2>
//             <p className="mt-4 text-foreground-muted">
//               A multidisciplinary team spanning engineering, finance, projects
//               and operations — united by delivery and integrity.
//             </p>
//           </Reveal>

//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//             {rest.map((leader, i) => (
//               <Reveal key={leader.id} delay={i * 0.08}>
//                 <motion.button
//                   type="button"
//                   onClick={() => setActiveLeader(leader)}
//                   whileHover={{ y: -6 }}
//                   transition={{ type: "spring", stiffness: 320, damping: 22 }}
//                   className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-background-elevated text-left shadow-sm transition-shadow hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
//                 >
//                   <div className="relative aspect-[4/5] w-full overflow-hidden">
//                     {/* Shared-element photo – morphs into modal */}
//                     <motion.div
//                       layoutId={
//                         activeLeader?.id === leader.id
//                           ? undefined
//                           : `leader-photo-${leader.id}`
//                       }
//                       className="absolute inset-0"
//                       transition={{
//                         type: "spring",
//                         stiffness: 300,
//                         damping: 28,
//                       }}
//                     >
//                       <LeaderPortrait
//                         leader={leader}
//                         className="transition-transform duration-500 group-hover:scale-105"
//                         sizes="(max-width:640px) 100vw, 25vw"
//                       />
//                     </motion.div>
//                     <div
//                       className={cn(
//                         "absolute left-4 top-4 h-1.5 w-10 rounded-full bg-gradient-to-r",
//                         accentGradient[leader.accent]
//                       )}
//                     />
//                   </div>
//                   <div className="flex flex-1 flex-col p-5">
//                     <h3 className="text-lg font-bold text-foreground group-hover:text-orange transition-colors leading-snug">
//                       {leader.name}
//                     </h3>
//                     <p className="mt-1 text-sm font-medium text-orange/90">
//                       {leader.title}
//                     </p>
//                     <p className="mt-3 line-clamp-3 text-sm text-foreground-muted leading-relaxed flex-1">
//                       {leader.shortBio}
//                     </p>
//                     <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-orange opacity-80 group-hover:opacity-100 transition-opacity">
//                       View profile
//                       <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//                     </span>
//                   </div>
//                 </motion.button>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Quote */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-blue via-[#2563eb] to-[#1d4ed8]">
//         <div className="pointer-events-none absolute inset-0 opacity-25">
//           <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-orange blur-3xl" />
//           <div className="absolute bottom-1/4 right-1/4 h-56 w-56 rounded-full bg-cyan blur-3xl" />
//         </div>
//         <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
//           <Reveal>
//             <p className="text-2xl font-medium leading-relaxed text-white sm:text-3xl lg:text-4xl lg:leading-snug">
//               &ldquo;Our people remain our greatest strength — guided by
//               responsibility, integrity and engineering excellence.&rdquo;
//             </p>
//           </Reveal>
//           <Reveal delay={0.1}>
//             <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
//               Joshcalebwill leadership
//             </p>
//           </Reveal>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="relative overflow-hidden bg-gradient-to-r from-orange via-red to-yellow">
//         <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
//           <Reveal>
//             <h2 className="text-3xl font-bold text-white sm:text-4xl">
//               Work with our team
//             </h2>
//           </Reveal>
//           <Reveal delay={0.08}>
//             <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
//               Partner with experienced leaders committed to safe, reliable
//               delivery across Africa&apos;s energy sector.
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
//                 href="/who-we-are/jobs"
//                 className="inline-flex items-center justify-center rounded-full border-2 border-white/90 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white hover:text-orange"
//               >
//                 Careers
//               </Link>
//             </div>
//           </Reveal>
//         </div>
//       </section>

//       <AnimatePresence mode="sync">
//         {activeLeader && (
//           <BioPanel
//             key={activeLeader.id}
//             leader={activeLeader}
//             onClose={() => setActiveLeader(null)}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { leaders, type Leader } from "@/data/leadership";
import { cn } from "@/lib/utils";
import { ArrowUpRight, X, ChevronDown } from "lucide-react";

const accentGradient: Record<Leader["accent"], string> = {
  orange: "from-orange to-red",
  red: "from-red to-orange",
  blue: "from-blue to-cyan",
  teal: "from-teal to-lime",
  lime: "from-lime to-teal",
  yellow: "from-yellow to-orange",
};

const accentSolid: Record<Leader["accent"], string> = {
  orange: "bg-orange",
  red: "bg-red",
  blue: "bg-blue",
  teal: "bg-teal",
  lime: "bg-lime",
  yellow: "bg-yellow",
};

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
      initial={{ opacity: 0, y: 40 }}
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

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

/* ------------------------------------------------------------------ */
/*  Portrait                                                           */
/* ------------------------------------------------------------------ */
function LeaderPortrait({
  leader,
  className,
  sizes = "400px",
}: {
  leader: Leader;
  className?: string;
  sizes?: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden bg-background-soft",
        className
      )}
    >
      {!imgError && leader.image ? (
        <Image
          src={leader.image}
          alt={leader.name}
          fill
          className="object-cover object-top"
          sizes={sizes}
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-gradient-to-br",
            accentGradient[leader.accent]
          )}
        >
          <span className="text-5xl font-bold text-white/90 sm:text-6xl">
            {getInitials(leader.name)}
          </span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-blue/40 via-transparent to-transparent opacity-70" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Bio panel – body scroll locked, panel scrolls                      */
/* ------------------------------------------------------------------ */
function BioPanel({
  leader,
  onClose,
}: {
  leader: Leader;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock page scroll (html + body) while modal is open
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - html.clientWidth;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbar > 0) {
      body.style.paddingRight = `${scrollbar}px`;
    }

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.paddingRight = prevBodyPadding;
    };
  }, []);

  // Escape closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Explicit wheel handling so scrolling works over any part of the panel
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      panel.scrollTop += e.deltaY;
    };

    panel.addEventListener("wheel", onWheel, { passive: false });
    return () => panel.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-6"
      onWheel={(e) => e.preventDefault()}
    >
      {/* Backdrop – swallows scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-blue/45 backdrop-blur-md"
        onClick={onClose}
        onWheel={(e) => e.preventDefault()}
      />

      {/* Panel – the single scroll container */}
      <motion.div
        ref={panelRef}
        layoutId={`leader-panel-${leader.id}`}
        initial={{ y: 100, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl"
        style={{ WebkitOverflowScrolling: "touch" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`leader-name-${leader.id}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header */}
        <div className="sticky top-0 z-10 flex items-end gap-5 border-b border-border bg-background-soft/95 backdrop-blur-sm p-6 sm:p-8">
          <motion.div
            layoutId={`leader-photo-${leader.id}`}
            className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl sm:h-24 sm:w-24 shadow-md"
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            <LeaderPortrait leader={leader} sizes="96px" />
          </motion.div>

          <div className="min-w-0 flex-1 pb-1 pr-10">
            <motion.div
              layoutId={`leader-bar-${leader.id}`}
              className={cn(
                "mb-2 h-1 w-10 rounded-full bg-gradient-to-r",
                accentGradient[leader.accent]
              )}
            />
            <motion.h3
              layoutId={`leader-name-${leader.id}`}
              id={`leader-name-${leader.id}`}
              className="text-xl font-bold text-foreground sm:text-2xl"
            >
              {leader.name}
            </motion.h3>
            <motion.p
              layoutId={`leader-title-${leader.id}`}
              className="mt-0.5 text-sm font-medium text-orange"
            >
              {leader.title}
            </motion.p>
          </div>

          <motion.button
            type="button"
            onClick={onClose}
            initial={{ opacity: 0, rotate: -40 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.15 }}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-border text-foreground shadow-sm transition hover:bg-background-soft hover:scale-105"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Body content */}
        <div className="p-6 sm:p-8 space-y-4">
          {leader.bio.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + i * 0.06, duration: 0.4 }}
              className="text-base leading-relaxed text-foreground-muted"
            >
              {para}
            </motion.p>
          ))}

          {leader.credentials && leader.credentials.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="mt-6 rounded-2xl border border-border bg-background-soft p-5"
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-orange">
                Credentials
              </p>
              <ul className="space-y-2">
                {leader.credentials.map((c, i) => (
                  <motion.li
                    key={c}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    className="flex items-start gap-2 text-sm text-foreground"
                  >
                    <span
                      className={cn(
                        "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                        accentSolid[leader.accent]
                      )}
                    />
                    {c}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function LeadershipPage() {
  const [activeLeader, setActiveLeader] = useState<Leader | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const smoothY = useSpring(heroY, { stiffness: 80, damping: 25 });

  const md = leaders[0];
  const rest = leaders.slice(1);

  return (
    <div className="bg-background overflow-x-hidden">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative h-[60vh] min-h-[400px] max-h-[620px] overflow-hidden"
      >
        <motion.div
          style={{ y: smoothY }}
          className="absolute inset-0 scale-110"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue via-[#1d4ed8] to-orange/70" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue/40 via-transparent to-white/10" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-16 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-white/80"
          >
            Who we are
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Our leadership
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-4 max-w-xl text-base text-white/85 sm:text-lg"
          >
            Experience, integrity and technical depth guiding every project.
          </motion.p>
        </motion.div>
      </section>

      {/* Featured MD */}
      <section className="relative border-b border-border bg-background-soft overflow-hidden">
        <div className="pointer-events-none absolute -left-20 top-20 h-80 w-80 rounded-full bg-orange/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-blue/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
              Managing Director
            </p>
          </Reveal>

          <div className="mt-6 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5" delay={0.05}>
              <motion.button
                type="button"
                onClick={() => setActiveLeader(md)}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative w-full overflow-hidden rounded-3xl shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
              >
                <motion.div
                  layoutId={
                    activeLeader?.id === md.id
                      ? undefined
                      : `leader-photo-${md.id}`
                  }
                  className="relative aspect-[4/5] w-full"
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                >
                  <LeaderPortrait
                    leader={md}
                    sizes="(max-width:1024px) 100vw, 40vw"
                  />
                </motion.div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue/80 to-transparent p-6 pt-20">
                  <p className="text-sm font-medium text-white/80">
                    Click to read full profile
                  </p>
                </div>
              </motion.button>
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <div
                  className={cn(
                    "mb-5 h-1.5 w-14 rounded-full bg-gradient-to-r",
                    accentGradient[md.accent]
                  )}
                />
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {md.name}
                </h2>
                <p className="mt-2 text-base font-semibold text-orange sm:text-lg">
                  {md.title}
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-6 text-base leading-relaxed text-foreground-muted sm:text-lg">
                  {md.shortBio}
                </p>
              </Reveal>

              {md.credentials && (
                <Reveal delay={0.2}>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {md.credentials.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-medium text-foreground-muted"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </Reveal>
              )}

              <Reveal delay={0.26}>
                <button
                  type="button"
                  onClick={() => setActiveLeader(md)}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-red hover:shadow-lg hover:-translate-y-0.5"
                >
                  Read full profile
                  <ChevronDown className="h-4 w-4" />
                </button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Team grid */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
              The team
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Directors &amp; executive leadership
            </h2>
            <p className="mt-4 text-foreground-muted">
              A multidisciplinary team spanning engineering, finance, projects
              and operations — united by delivery and integrity.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((leader, i) => (
              <Reveal key={leader.id} delay={i * 0.08}>
                <motion.button
                  type="button"
                  onClick={() => setActiveLeader(leader)}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-background-elevated text-left shadow-sm transition-shadow hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    {/* Shared-element photo – morphs into modal */}
                    <motion.div
                      layoutId={
                        activeLeader?.id === leader.id
                          ? undefined
                          : `leader-photo-${leader.id}`
                      }
                      className="absolute inset-0"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 28,
                      }}
                    >
                      <LeaderPortrait
                        leader={leader}
                        className="transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:640px) 100vw, 25vw"
                      />
                    </motion.div>
                    <div
                      className={cn(
                        "absolute left-4 top-4 h-1.5 w-10 rounded-full bg-gradient-to-r",
                        accentGradient[leader.accent]
                      )}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-orange transition-colors leading-snug">
                      {leader.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-orange/90">
                      {leader.title}
                    </p>
                    <p className="mt-3 line-clamp-3 text-sm text-foreground-muted leading-relaxed flex-1">
                      {leader.shortBio}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-orange opacity-80 group-hover:opacity-100 transition-opacity">
                      View profile
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </motion.button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue via-[#2563eb] to-[#1d4ed8]">
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-orange blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-56 w-56 rounded-full bg-cyan blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <Reveal>
            <p className="text-2xl font-medium leading-relaxed text-white sm:text-3xl lg:text-4xl lg:leading-snug">
              &ldquo;Our people remain our greatest strength — guided by
              responsibility, integrity and engineering excellence.&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
              Joshcalebwill leadership
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange via-red to-yellow">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Work with our team
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
              Partner with experienced leaders committed to safe, reliable
              delivery across Africa&apos;s energy sector.
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
                Careers
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <AnimatePresence mode="sync">
        {activeLeader && (
          <BioPanel
            key={activeLeader.id}
            leader={activeLeader}
            onClose={() => setActiveLeader(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
