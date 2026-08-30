// "use client";

// import { useRef, useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { valueWords, valueStatement, valueImages } from "@/data/values";
// import { cn } from "@/lib/utils";

// gsap.registerPlugin(ScrollTrigger);

// /** Group words into sets of 3 for the stacked reveal */
// const wordGroups: string[][] = [];
// for (let i = 0; i < valueWords.length; i += 3) {
//   wordGroups.push([...valueWords.slice(i, i + 3)]);
// }

// export function ValuesScroll() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const [activeGroup, setActiveGroup] = useState(0);
//   const [phase, setPhase] = useState<"words" | "statement">("words");

//   useEffect(() => {
//     const section = sectionRef.current;
//     if (!section) return;

//     const ctx = gsap.context(() => {
//       const groups = gsap.utils.toArray<HTMLElement>(".value-group");
//       const images = gsap.utils.toArray<HTMLElement>(".value-image");
//       const statement = section.querySelector(
//         ".value-statement",
//       ) as HTMLElement;
//       const statementLines = gsap.utils.toArray<HTMLElement>(".statement-line");
//       const cta = section.querySelector(".value-cta") as HTMLElement;
//       const progressBar = section.querySelector(
//         ".scroll-progress",
//       ) as HTMLElement;
//       const sectionLabel = section.querySelector(
//         ".section-label",
//       ) as HTMLElement;

//       gsap.set(images, { opacity: 0, scale: 0.88, y: 30 });
//       gsap.set(statement, { opacity: 0 });
//       gsap.set(statementLines, { opacity: 0, y: 30 });
//       gsap.set(cta, { opacity: 0, y: 20 });

//       // Each word starts far off-screen: even → LEFT, odd → RIGHT
//       const SLIDE = 200;
//       groups.forEach((group) => {
//         const words = group.querySelectorAll<HTMLElement>(".value-word");
//         words.forEach((word, wi) => {
//           const fromLeft = wi % 2 === 0;
//           gsap.set(word, {
//             opacity: 0,
//             x: fromLeft ? -SLIDE : SLIDE,
//           });
//         });
//         gsap.set(group, { autoAlpha: 0 });
//       });

//       const totalGroups = groups.length;

//       /*
//        * Per-group timeline (slow & sequential):
//        *  ENTER  – words slide in one-by-one from L/R
//        *  HOLD   – all three rest at center
//        *  EXIT   – words slide out one-by-one opposite direction
//        */
//       const GROUP_SPAN = 5.2;
//       const ENTER_DUR = 1.0;
//       const ENTER_STAGGER = 0.55;
//       const HOLD = 1.0;
//       const EXIT_DUR = 0.95;
//       const EXIT_STAGGER = 0.5;

//       // Extra scroll room so scrub feels cinematic / slow
//       const scrollDistance = window.innerHeight * (totalGroups * 3.2 + 2.4);

//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: section,
//           start: "top top",
//           end: `+=${scrollDistance}`,
//           pin: true,
//           scrub: 1.15,
//           anticipatePin: 1,
//           onUpdate: (self) => {
//             const p = self.progress;
//             if (progressBar) {
//               progressBar.style.width = `${p * 100}%`;
//             }
//             const wordPhaseEnd = totalGroups / (totalGroups + 1.4);
//             if (p < wordPhaseEnd) {
//               setPhase("words");
//               const idx = Math.min(
//                 totalGroups - 1,
//                 Math.floor((p / wordPhaseEnd) * totalGroups),
//               );
//               setActiveGroup(idx);
//             } else {
//               setPhase("statement");
//             }
//           },
//         },
//       });

//       groups.forEach((group, i) => {
//         const img = images[i] as HTMLElement | undefined;
//         const words = Array.from(
//           group.querySelectorAll<HTMLElement>(".value-word"),
//         );
//         const t0 = i * GROUP_SPAN;

//         // Show group
//         tl.set(group, { autoAlpha: 1 }, t0);

//         // ENTER – one after the other
//         words.forEach((word, wi) => {
//           tl.to(
//             word,
//             {
//               opacity: 1,
//               x: 0,
//               duration: ENTER_DUR,
//               ease: "power2.inOut",
//             },
//             t0 + wi * ENTER_STAGGER,
//           );
//         });

//         // HOLD at center
//         const holdStart = t0 + (words.length - 1) * ENTER_STAGGER + ENTER_DUR;
//         const exitStart = holdStart + HOLD;

//         // EXIT – one after the other, opposite direction
//         words.forEach((word, wi) => {
//           const fromLeft = wi % 2 === 0;
//           tl.to(
//             word,
//             {
//               opacity: 0,
//               x: fromLeft ? SLIDE : -SLIDE,
//               duration: EXIT_DUR,
//               ease: "power2.inOut",
//             },
//             exitStart + wi * EXIT_STAGGER,
//           );
//         });

//         const groupEnd =
//           exitStart + (words.length - 1) * EXIT_STAGGER + EXIT_DUR;
//         tl.set(group, { autoAlpha: 0 }, groupEnd);

//         // Image fades with the group
//         if (img) {
//           const imgFromLeft = i % 2 === 0;
//           gsap.set(img, { x: imgFromLeft ? -70 : 70 });

//           tl.to(
//             img,
//             {
//               opacity: 1,
//               scale: 1,
//               x: 0,
//               y: 0,
//               duration: 1.2,
//               ease: "power2.inOut",
//             },
//             t0 + 0.35,
//           );

//           tl.to(
//             img,
//             {
//               opacity: 0,
//               scale: 0.92,
//               x: imgFromLeft ? 70 : -70,
//               duration: 1.0,
//               ease: "power2.inOut",
//             },
//             exitStart,
//           );
//         }
//       });

//       // Statement phase
//       const statementStart = totalGroups * GROUP_SPAN + 0.35;

//       // Fade out "Who we are" label so it doesn't sit behind the statement
//       if (sectionLabel) {
//         tl.to(
//           sectionLabel,
//           { opacity: 0, duration: 0.35, ease: "power1.out" },
//           statementStart,
//         );
//       }

//       tl.to(
//         statement,
//         { opacity: 1, duration: 0.4, ease: "power1.out" },
//         statementStart,
//       );

//       tl.to(
//         statementLines,
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.55,
//           stagger: 0.2,
//           ease: "power2.out",
//         },
//         statementStart + 0.15,
//       );

//       tl.to(
//         cta,
//         { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
//         statementStart + 0.15 + statementLines.length * 0.2 + 0.12,
//       );
//     }, section);

//     return () => ctx.revert();
//   }, []);

//   const sentences = valueStatement
//     .split(/(?<=\.)\s+/)
//     .map((s) => s.trim())
//     .filter(Boolean);

//   return (
//     <section ref={sectionRef} className="relative z-10">
//       <div className="relative h-screen w-full overflow-hidden">
//         {/* Background */}
//         <div className="absolute inset-0 bg-gradient-to-br from-blue via-[#2563eb] to-[#1d4ed8]" />
//         <div className="pointer-events-none absolute inset-0 opacity-25">
//           <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-orange/40 blur-[130px]" />
//           <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-cyan/30 blur-[110px]" />
//         </div>

//         <p className="section-label absolute left-0 right-0 top-24 z-30 text-center text-xs font-semibold uppercase tracking-[0.28em] text-white/60 sm:top-28 sm:text-sm">
//           Who we are
//         </p>

//         {/* Word groups – 3 at a time, stacked */}
//         <div className="absolute inset-0 z-20 flex items-center justify-center">
//           {wordGroups.map((group, gi) => (
//             <div
//               key={gi}
//               className="value-group pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4"
//             >
//               {group.map((word, wi) => (
//                 <h2
//                   key={word}
//                   className={cn(
//                     "value-word text-center font-bold tracking-tight leading-[0.95] px-2",
//                     "text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
//                     wi === 1
//                       ? "bg-gradient-to-r from-orange via-red to-yellow bg-clip-text text-transparent sm:scale-105"
//                       : "text-white/90",
//                     wi > 0 && "mt-1.5 sm:mt-3",
//                   )}
//                 >
//                   {word}
//                 </h2>
//               ))}
//             </div>
//           ))}
//         </div>

//         {/* Floating images – desktop only (overlap words on small screens) */}
//         <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
//           {wordGroups.map((_, gi) => {
//             const src = valueImages[gi % valueImages.length];
//             const side = gi % 2 === 0 ? "right" : "left";
//             return (
//               <div
//                 key={gi}
//                 className={cn(
//                   "value-image absolute top-1/2 -translate-y-1/2",
//                   side === "right"
//                     ? "right-[6%] lg:right-[12%]"
//                     : "left-[6%] lg:left-[12%]",
//                 )}
//               >
//                 <div className="relative w-[32vw] max-w-[380px] aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl">
//                   <Image
//                     src={src}
//                     alt=""
//                     fill
//                     className="object-cover"
//                     sizes="400px"
//                     onError={(e) => {
//                       (e.target as HTMLImageElement).style.display = "none";
//                     }}
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-tr from-orange/15 via-transparent to-blue/20" />
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Statement */}
//         <div className="value-statement absolute inset-0 z-30 flex flex-col items-center justify-center px-5 pt-20 pb-16 sm:px-10 sm:pt-24 sm:pb-20">
//           <div className="mx-auto max-w-4xl text-center">
//             {sentences.map((line, i) => (
//               <p
//                 key={i}
//                 className="statement-line text-lg sm:text-2xl md:text-3xl lg:text-[2.15rem] font-medium leading-snug text-white mb-3 sm:mb-5 last:mb-0"
//               >
//                 {line}
//               </p>
//             ))}

//             <div className="value-cta mt-10 sm:mt-12">
//               <Link
//                 href="/who-we-are"
//                 className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-orange"
//               >
//                 <span>→</span> Discover who we are
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Progress bar */}
//         <div className="absolute bottom-0 left-0 right-0 z-40 h-1 bg-white/15">
//           <div className="scroll-progress h-full bg-gradient-to-r from-orange via-red to-yellow" />
//         </div>

//         {/* Group dots */}
//         <div className="absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 gap-2">
//           {wordGroups.map((_, i) => (
//             <div
//               key={i}
//               className={cn(
//                 "h-1.5 rounded-full transition-all duration-300",
//                 phase === "words" && activeGroup === i
//                   ? "w-6 bg-orange"
//                   : "w-1.5 bg-white/40",
//               )}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { valueWords, valueStatement, valueImages } from "@/data/values";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
 * GROUP WORDS
 * ======================================================= */

const wordGroups: string[][] = [];

for (let i = 0; i < valueWords.length; i += 3) {
  wordGroups.push([...valueWords.slice(i, i + 3)]);
}

/* =========================================================
 * ANIMATION SETTINGS
 * ======================================================= */

const SLIDE_DISTANCE = 200;

const GROUP_SPAN = 5.2;

const ENTER_DURATION = 1.0;
const ENTER_STAGGER = 0.55;

const HOLD_DURATION = 1.0;

const EXIT_DURATION = 0.95;
const EXIT_STAGGER = 0.5;

export function ValuesScroll() {
  /* =======================================================
   * REFS
   * ===================================================== */

  const sectionRef = useRef<HTMLElement>(null);

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const statementRef = useRef<HTMLDivElement>(null);

  const statementLineRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const ctaRef = useRef<HTMLDivElement>(null);

  const sectionLabelRef = useRef<HTMLParagraphElement>(null);

  const progressRef = useRef<HTMLDivElement>(null);

  /* =======================================================
   * SPLIT STATEMENT
   * ===================================================== */

  const sentences = valueStatement
    .split(/(?<=\.)\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  /* =======================================================
   * GSAP
   * ===================================================== */

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    /*
     * Match the number of images to the number of groups.
     *
     * This is important because a missing image should never
     * cause the animation to crash.
     */

    const images = imageRefs.current.filter(
      (element): element is HTMLDivElement => Boolean(element),
    );

    const statement = statementRef.current;

    const statementLines = statementLineRefs.current.filter(
      (element): element is HTMLParagraphElement => Boolean(element),
    );

    const cta = ctaRef.current;

    const sectionLabel = sectionLabelRef.current;

    const progress = progressRef.current;

    /*
     * Make sure the browser has finished laying out the section
     * before calculating dimensions.
     */

    const ctx = gsap.context(() => {
      /* =====================================================
       * GROUPS
       * =================================================== */

      const groups = gsap.utils.toArray<HTMLElement>(
        ".value-group",
        section,
      );

      const totalGroups = groups.length;

      if (!totalGroups) {
        return;
      }

      /* =====================================================
       * INITIAL STATES
       * =================================================== */

      /*
       * Images
       */

      gsap.set(images, {
        autoAlpha: 0,
        scale: 0.88,
        x: 0,
        y: 0,
      });

      /*
       * Statement
       */

      if (statement) {
        gsap.set(statement, {
          autoAlpha: 0,
          y: 20,
        });
      }

      /*
       * Statement lines
       */

      gsap.set(statementLines, {
        autoAlpha: 0,
        y: 30,
      });

      /*
       * CTA
       */

      if (cta) {
        gsap.set(cta, {
          autoAlpha: 0,
          y: 20,
        });
      }

      /*
       * Section label
       */

      if (sectionLabel) {
        gsap.set(sectionLabel, {
          autoAlpha: 1,
          y: 0,
        });
      }

      /*
       * Progress
       */

      if (progress) {
        gsap.set(progress, {
          width: "0%",
        });
      }

      /* =====================================================
       * INITIAL WORD POSITIONS
       * =================================================== */

      groups.forEach((group) => {
        const words = Array.from(
          group.querySelectorAll<HTMLElement>(".value-word"),
        );

        /*
         * Hide the group initially.
         */

        gsap.set(group, {
          autoAlpha: 0,
        });

        /*
         * Put every word outside the viewport.
         */

        words.forEach((word, wordIndex) => {
          const fromLeft = wordIndex % 2 === 0;

          gsap.set(word, {
            autoAlpha: 0,
            x: fromLeft ? -SLIDE_DISTANCE : SLIDE_DISTANCE,
          });
        });
      });

      /* =====================================================
       * SCROLL DISTANCE
       * =================================================== */

      const scrollDistance =
        window.innerHeight * (totalGroups * 3.2 + 2.4);

      /* =====================================================
       * MAIN TIMELINE
       * =================================================== */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,

          start: "top top",

          end: `+=${scrollDistance}`,

          pin: true,

          scrub: 1.15,

          anticipatePin: 1,

          invalidateOnRefresh: true,

          onUpdate: (self) => {
            /*
             * IMPORTANT:
             *
             * Do NOT call React setState() here.
             *
             * ScrollTrigger can fire this callback many times
             * per second. Calling setState() here can cause
             * unnecessary renders and mobile performance/runtime
             * problems.
             */

            if (progress) {
              progress.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      /* =====================================================
       * EACH WORD GROUP
       * =================================================== */

      groups.forEach((group, groupIndex) => {
        const image = images[groupIndex];

        const words = Array.from(
          group.querySelectorAll<HTMLElement>(".value-word"),
        );

        /*
         * Starting point of this group inside the timeline.
         */

        const start = groupIndex * GROUP_SPAN;

        /* ===================================================
         * SHOW GROUP
         * ================================================= */

        timeline.set(
          group,
          {
            autoAlpha: 1,
          },
          start,
        );

        /* ===================================================
         * WORD ENTER
         * ================================================= */

        words.forEach((word, wordIndex) => {
          timeline.to(
            word,
            {
              autoAlpha: 1,
              x: 0,

              duration: ENTER_DURATION,

              ease: "power2.out",
            },
            start + wordIndex * ENTER_STAGGER,
          );
        });

        /* ===================================================
         * HOLD
         * ================================================= */

        const holdStart =
          start +
          (words.length - 1) * ENTER_STAGGER +
          ENTER_DURATION;

        const exitStart = holdStart + HOLD_DURATION;

        /* ===================================================
         * WORD EXIT
         *
         * IMPORTANT:
         *
         * Every group leaves toward the TOP.
         * This keeps the movement consistent with the effect
         * you liked previously.
         * ================================================= */

        words.forEach((word, wordIndex) => {
          timeline.to(
            word,
            {
              autoAlpha: 0,

              y: -window.innerHeight * 1.1,

              duration: EXIT_DURATION,

              ease: "power2.inOut",
            },
            exitStart + wordIndex * EXIT_STAGGER,
          );
        });

        /* ===================================================
         * HIDE GROUP
         * ================================================= */

        const groupEnd =
          exitStart +
          (words.length - 1) * EXIT_STAGGER +
          EXIT_DURATION;

        timeline.set(
          group,
          {
            autoAlpha: 0,
          },
          groupEnd,
        );

        /* ===================================================
         * IMAGE ENTER
         * ================================================= */

        if (image) {
          /*
           * Alternate image entrance direction.
           */

          const fromLeft = groupIndex % 2 === 0;

          gsap.set(image, {
            autoAlpha: 0,

            scale: 0.88,

            x: fromLeft ? -70 : 70,

            y: 0,
          });

          timeline.to(
            image,
            {
              autoAlpha: 1,

              scale: 1,

              x: 0,

              y: 0,

              duration: 1.2,

              ease: "power3.out",
            },
            start + 0.35,
          );

          /* =================================================
           * IMAGE EXIT
           * ================================================= */

          timeline.to(
            image,
            {
              autoAlpha: 0,

              scale: 0.92,

              x: fromLeft ? 70 : -70,

              duration: 0.9,

              ease: "power2.inOut",
            },
            exitStart,
          );
        }
      });

      /* =====================================================
       * STATEMENT
       * =================================================== */

      const statementStart =
        totalGroups * GROUP_SPAN + 0.35;

      /* =====================================================
       * HIDE SECTION LABEL
       * =================================================== */

      if (sectionLabel) {
        timeline.to(
          sectionLabel,
          {
            autoAlpha: 0,

            duration: 0.35,

            ease: "power1.out",
          },
          statementStart,
        );
      }

      /* =====================================================
       * SHOW STATEMENT CONTAINER
       * =================================================== */

      if (statement) {
        timeline.to(
          statement,
          {
            autoAlpha: 1,

            y: 0,

            duration: 0.45,

            ease: "power2.out",
          },
          statementStart,
        );
      }

      /* =====================================================
       * SHOW STATEMENT LINES
       * =================================================== */

      statementLines.forEach((line, index) => {
        timeline.to(
          line,
          {
            autoAlpha: 1,

            y: 0,

            duration: 0.55,

            ease: "power2.out",
          },
          statementStart +
            0.15 +
            index * 0.2,
        );
      });

      /* =====================================================
       * CTA
       * =================================================== */

      if (cta) {
        timeline.to(
          cta,
          {
            autoAlpha: 1,

            y: 0,

            duration: 0.45,

            ease: "power2.out",
          },
          statementStart +
            0.15 +
            statementLines.length * 0.2 +
            0.12,
        );
      }

      /* =====================================================
       * REFRESH
       * =================================================== */

      /*
       * Give ScrollTrigger a chance to recalculate after
       * images/fonts/layout have settled.
       */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    /* =======================================================
     * CLEANUP
     * ===================================================== */

    return () => {
      ctx.revert();
    };
  }, []);

  /* =======================================================
   * RENDER
   * ===================================================== */

  return (
    <section
      ref={sectionRef}
      className="relative z-10"
    >
      <div className="relative h-screen w-full overflow-hidden">
        {/* =================================================
         * BACKGROUND
         * =============================================== */}

        <div className="absolute inset-0 bg-gradient-to-br from-blue via-[#2563eb] to-[#1d4ed8]" />

        <div className="pointer-events-none absolute inset-0 opacity-25">
          <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-orange/40 blur-[130px]" />

          <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-cyan/30 blur-[110px]" />
        </div>

        {/* =================================================
         * SECTION LABEL
         * =============================================== */}

        <p
          ref={sectionLabelRef}
          className="section-label absolute left-0 right-0 top-24 z-30 text-center text-xs font-semibold uppercase tracking-[0.28em] text-white/60 sm:top-28 sm:text-sm"
        >
          Who we are
        </p>

        {/* =================================================
         * WORD GROUPS
         * =============================================== */}

        <div className="absolute inset-0 z-20 flex items-center justify-center">
          {wordGroups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="value-group pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4"
            >
              {group.map((word, wordIndex) => (
                <h2
                  key={`${word}-${wordIndex}`}
                  className={cn(
                    "value-word px-2 text-center font-bold leading-[0.95] tracking-tight",

                    "text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",

                    wordIndex === 1
                      ? "bg-gradient-to-r from-orange via-red to-yellow bg-clip-text text-transparent sm:scale-105"
                      : "text-white/90",

                    wordIndex > 0 && "mt-1.5 sm:mt-3",
                  )}
                >
                  {word}
                </h2>
              ))}
            </div>
          ))}
        </div>

        {/* =================================================
         * FLOATING IMAGES
         * =============================================== */}

        <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
          {wordGroups.map((_, groupIndex) => {
            const src =
              valueImages[groupIndex % valueImages.length];

            const side =
              groupIndex % 2 === 0 ? "right" : "left";

            return (
              <div
                key={groupIndex}
                ref={(element) => {
                  imageRefs.current[groupIndex] = element;
                }}
                className={cn(
                  "value-image absolute top-1/2 -translate-y-1/2",

                  side === "right"
                    ? "right-[6%] lg:right-[12%]"
                    : "left-[6%] lg:left-[12%]",
                )}
              >
                <div className="relative aspect-[16/10] w-[32vw] max-w-[380px] overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="400px"
                  />

                  <div className="absolute inset-0 bg-gradient-to-tr from-orange/15 via-transparent to-blue/20" />
                </div>
              </div>
            );
          })}
        </div>

        {/* =================================================
         * STATEMENT
         * =============================================== */}

        <div
          ref={statementRef}
          className="value-statement absolute inset-0 z-30 flex flex-col items-center justify-center px-5 pt-20 pb-16 sm:px-10 sm:pt-24 sm:pb-20"
        >
          <div className="mx-auto max-w-4xl text-center">
            {sentences.map((line, index) => (
              <p
                key={index}
                ref={(element) => {
                  statementLineRefs.current[index] =
                    element;
                }}
                className="statement-line mb-3 text-lg font-medium leading-snug text-white sm:mb-5 sm:text-2xl md:text-3xl lg:text-[2.15rem] last:mb-0"
              >
                {line}
              </p>
            ))}

            {/* =================================================
             * CTA
             * =============================================== */}

            <div
              ref={ctaRef}
              className="value-cta mt-10 sm:mt-12"
            >
              <Link
                href="/who-we-are"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-orange"
              >
                <span>→</span>

                Discover who we are
              </Link>
            </div>
          </div>
        </div>

        {/* =================================================
         * PROGRESS BAR
         * =============================================== */}

        <div className="absolute bottom-0 left-0 right-0 z-40 h-1 bg-white/15">
          <div
            ref={progressRef}
            className="scroll-progress h-full bg-gradient-to-r from-orange via-red to-yellow"
          />
        </div>

        {/* =================================================
         * GROUP DOTS
         * =============================================== */}

        <div className="absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 gap-2">
          {wordGroups.map((_, index) => (
            <div
              key={index}
              className="h-1.5 w-1.5 rounded-full bg-white/40"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
