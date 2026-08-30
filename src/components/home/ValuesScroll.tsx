"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  valueWords,
  valueStatement,
  valueImages,
} from "@/data/values";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
 * WORD GROUPS
 * ======================================================= */

const wordGroups: string[][] = [];

for (let i = 0; i < valueWords.length; i += 3) {
  wordGroups.push(valueWords.slice(i, i + 3));
}

/* =========================================================
 * COMPONENT
 * ======================================================= */

export function ValuesScroll() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /* ---------------------------------------------------
       * Elements
       * ------------------------------------------------- */

      const groups = gsap.utils.toArray<HTMLElement>(
        ".value-group"
      );

      const images = gsap.utils.toArray<HTMLElement>(
        ".value-image"
      );

      const statement = section.querySelector(
        ".value-statement"
      ) as HTMLElement | null;

      const statementLines = gsap.utils.toArray<HTMLElement>(
        ".statement-line"
      );

      const cta = section.querySelector(
        ".value-cta"
      ) as HTMLElement | null;

      const progressBar = section.querySelector(
        ".scroll-progress"
      ) as HTMLElement | null;

      const sectionLabel = section.querySelector(
        ".section-label"
      ) as HTMLElement | null;

      /* ---------------------------------------------------
       * Safety check
       *
       * If something is missing, do not allow GSAP to
       * continue manipulating undefined elements.
       * ------------------------------------------------- */

      if (!groups.length) {
        return;
      }

      /* ---------------------------------------------------
       * Initial image state
       * ------------------------------------------------- */

      if (images.length) {
        gsap.set(images, {
          opacity: 0,
          scale: 0.88,
          x: 0,
          y: 30,
        });
      }

      /* ---------------------------------------------------
       * Initial statement state
       * ------------------------------------------------- */

      if (statement) {
        gsap.set(statement, {
          opacity: 0,
        });
      }

      if (statementLines.length) {
        gsap.set(statementLines, {
          opacity: 0,
          y: 30,
        });
      }

      if (cta) {
        gsap.set(cta, {
          opacity: 0,
          y: 20,
        });
      }

      /* ---------------------------------------------------
       * Initial section label
       * ------------------------------------------------- */

      if (sectionLabel) {
        gsap.set(sectionLabel, {
          opacity: 1,
        });
      }

      /* ---------------------------------------------------
       * Initial word state
       * ------------------------------------------------- */

      const SLIDE_DISTANCE = 200;

      groups.forEach((group) => {
        const words = Array.from(
          group.querySelectorAll<HTMLElement>(".value-word")
        );

        gsap.set(group, {
          autoAlpha: 0,
        });

        words.forEach((word, index) => {
          const fromLeft = index % 2 === 0;

          gsap.set(word, {
            opacity: 0,
            x: fromLeft
              ? -SLIDE_DISTANCE
              : SLIDE_DISTANCE,
          });
        });
      });

      /* ---------------------------------------------------
       * Animation timing
       * ------------------------------------------------- */

      const GROUP_SPAN = 5.2;

      const ENTER_DURATION = 1.0;
      const ENTER_STAGGER = 0.55;

      const HOLD_DURATION = 1.0;

      const EXIT_DURATION = 0.95;
      const EXIT_STAGGER = 0.5;

      /*
       * Give the section plenty of scroll distance.
       */

      const scrollDistance =
        window.innerHeight *
        (groups.length * 3.2 + 2.4);

      /* ---------------------------------------------------
       * Main timeline
       * ------------------------------------------------- */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 1.15,
          anticipatePin: 1,

          onUpdate: (self) => {
            if (progressBar) {
              progressBar.style.width = `${
                self.progress * 100
              }%`;
            }
          },
        },
      });

      /* ===================================================
       * GROUP ANIMATIONS
       * ================================================= */

      groups.forEach((group, groupIndex) => {
        const image = images[groupIndex];

        const words = Array.from(
          group.querySelectorAll<HTMLElement>(".value-word")
        );

        const start = groupIndex * GROUP_SPAN;

        /* -------------------------------------------------
         * SHOW GROUP
         * ----------------------------------------------- */

        timeline.set(
          group,
          {
            autoAlpha: 1,
          },
          start
        );

        /* -------------------------------------------------
         * WORDS ENTER
         * ----------------------------------------------- */

        words.forEach((word, wordIndex) => {
          timeline.to(
            word,
            {
              opacity: 1,
              x: 0,
              duration: ENTER_DURATION,
              ease: "power2.inOut",
            },
            start + wordIndex * ENTER_STAGGER
          );
        });

        /* -------------------------------------------------
         * HOLD
         * ----------------------------------------------- */

        const holdStart =
          start +
          (words.length - 1) * ENTER_STAGGER +
          ENTER_DURATION;

        const exitStart =
          holdStart + HOLD_DURATION;

        /* -------------------------------------------------
         * IMAGE ENTER
         *
         * Each image appears shortly after its group
         * begins.
         * ----------------------------------------------- */

        if (image) {
          const fromLeft = groupIndex % 2 === 0;

          gsap.set(image, {
            opacity: 0,
            scale: 0.88,
            x: fromLeft ? -70 : 70,
            y: 30,
          });

          timeline.to(
            image,
            {
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              duration: 1.2,
              ease: "power2.out",
            },
            start + 0.45
          );
        }

        /* -------------------------------------------------
         * WORDS EXIT
         *
         * Every word leaves toward the TOP.
         * ----------------------------------------------- */

        words.forEach((word, wordIndex) => {
          timeline.to(
            word,
            {
              opacity: 0,
              y: -window.innerHeight * 1.1,
              duration: EXIT_DURATION,
              ease: "power2.inOut",
            },
            exitStart + wordIndex * EXIT_STAGGER
          );
        });

        /* -------------------------------------------------
         * IMAGE EXIT
         * ----------------------------------------------- */

        if (image) {
          timeline.to(
            image,
            {
              opacity: 0,
              scale: 0.92,
              y: -80,
              duration: 1,
              ease: "power2.inOut",
            },
            exitStart
          );
        }

        /* -------------------------------------------------
         * HIDE GROUP
         * ----------------------------------------------- */

        const groupEnd =
          exitStart +
          (words.length - 1) * EXIT_STAGGER +
          EXIT_DURATION;

        timeline.set(
          group,
          {
            autoAlpha: 0,
          },
          groupEnd
        );
      });

      /* ===================================================
       * STATEMENT
       * ================================================= */

      const statementStart =
        groups.length * GROUP_SPAN + 0.35;

      /* ---------------------------------------------------
       * Hide "Who we are"
       * ------------------------------------------------- */

      if (sectionLabel) {
        timeline.to(
          sectionLabel,
          {
            opacity: 0,
            duration: 0.35,
            ease: "power1.out",
          },
          statementStart
        );
      }

      /* ---------------------------------------------------
       * Show statement container
       * ------------------------------------------------- */

      if (statement) {
        timeline.to(
          statement,
          {
            opacity: 1,
            duration: 0.4,
            ease: "power1.out",
          },
          statementStart
        );
      }

      /* ---------------------------------------------------
       * Reveal statement lines
       * ------------------------------------------------- */

      if (statementLines.length) {
        timeline.to(
          statementLines,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.2,
            ease: "power2.out",
          },
          statementStart + 0.15
        );
      }

      /* ---------------------------------------------------
       * CTA
       * ------------------------------------------------- */

      if (cta) {
        timeline.to(
          cta,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
          },
          statementStart +
            0.15 +
            statementLines.length * 0.2 +
            0.12
        );
      }

      /* ---------------------------------------------------
       * Refresh ScrollTrigger after everything exists
       * ------------------------------------------------- */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /* =======================================================
   * STATEMENT SENTENCES
   * ===================================================== */

  const sentences = valueStatement
    .split(/(?<=\.)\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

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
          className="
            section-label
            absolute
            left-0
            right-0
            top-24
            z-30
            text-center
            text-xs
            font-semibold
            uppercase
            tracking-[0.28em]
            text-white/60
            sm:top-28
            sm:text-sm
          "
        >
          Who we are
        </p>

        {/* =================================================
         * WORD GROUPS
         * =============================================== */}

        <div className="absolute inset-0 z-20 flex items-center justify-center">
          {wordGroups.map((group, groupIndex) => (
            <div
              key={`group-${groupIndex}`}
              className="
                value-group
                pointer-events-none
                absolute
                inset-0
                flex
                flex-col
                items-center
                justify-center
                px-4
              "
            >
              {group.map((word, wordIndex) => (
                <h2
                  key={`${word}-${wordIndex}`}
                  className={cn(
                    "value-word text-center font-bold tracking-tight leading-[0.95] px-2",
                    "text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",

                    wordIndex === 1
                      ? "bg-gradient-to-r from-orange via-red to-yellow bg-clip-text text-transparent sm:scale-105"
                      : "text-white/90",

                    wordIndex > 0 &&
                      "mt-1.5 sm:mt-3"
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
              valueImages[
                groupIndex % valueImages.length
              ];

            const side =
              groupIndex % 2 === 0
                ? "right"
                : "left";

            return (
              <div
                key={`image-${groupIndex}`}
                className={cn(
                  "value-image absolute top-1/2 -translate-y-1/2",

                  side === "right"
                    ? "right-[6%] lg:right-[12%]"
                    : "left-[6%] lg:left-[12%]"
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
          className="
            value-statement
            absolute
            inset-0
            z-30
            flex
            flex-col
            items-center
            justify-center
            px-5
            pt-20
            pb-16
            sm:px-10
            sm:pt-24
            sm:pb-20
          "
        >
          <div className="mx-auto max-w-4xl text-center">
            {sentences.map((sentence, index) => (
              <p
                key={`statement-${index}`}
                className="
                  statement-line
                  mb-3
                  text-lg
                  font-medium
                  leading-snug
                  text-white
                  sm:mb-5
                  sm:text-2xl
                  md:text-3xl
                  lg:text-[2.15rem]
                  last:mb-0
                "
              >
                {sentence}
              </p>
            ))}

            <div className="value-cta mt-10 sm:mt-12">
              <Link
                href="/who-we-are"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border-2
                  border-white/80
                  px-7
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-white
                  hover:text-orange
                "
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
          <div className="scroll-progress h-full w-0 bg-gradient-to-r from-orange via-red to-yellow" />
        </div>

        {/* =================================================
         * GROUP INDICATORS
         * =============================================== */}

        <div className="absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 gap-2">
          {wordGroups.map((_, index) => (
            <div
              key={`dot-${index}`}
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-white/40
              "
            />
          ))}
        </div>
      </div>
    </section>
  );
}
