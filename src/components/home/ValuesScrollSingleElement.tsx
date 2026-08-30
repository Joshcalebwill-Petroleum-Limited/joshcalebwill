"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { valueWords, valueStatement, valueImages } from "@/data/values";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/** Group words into sets of 3 for the stacked reveal */
const wordGroups: string[][] = [];
for (let i = 0; i < valueWords.length; i += 3) {
  wordGroups.push([...valueWords.slice(i, i + 3)]);
}

export function ValuesScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeGroup, setActiveGroup] = useState(0);
  const [phase, setPhase] = useState<"words" | "statement">("words");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const groups = gsap.utils.toArray<HTMLElement>(".value-group");
      const images = gsap.utils.toArray<HTMLElement>(".value-image");
      const statement = section.querySelector(
        ".value-statement",
      ) as HTMLElement;
      const statementLines = gsap.utils.toArray<HTMLElement>(".statement-line");
      const cta = section.querySelector(".value-cta") as HTMLElement;
      const progressBar = section.querySelector(
        ".scroll-progress",
      ) as HTMLElement;

      gsap.set(groups, { opacity: 0, y: 80 });
      gsap.set(images, { opacity: 0, scale: 0.85, y: 40 });
      gsap.set(statement, { opacity: 0 });
      gsap.set(statementLines, { opacity: 0, y: 30 });
      gsap.set(cta, { opacity: 0, y: 20 });

      // Individual words start slightly offset
      groups.forEach((group) => {
        const words = group.querySelectorAll(".value-word");
        gsap.set(words, { opacity: 0, y: 28 });
      });

      const totalGroups = groups.length;
      const scrollDistance = window.innerHeight * (totalGroups + 1.8);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (progressBar) {
              progressBar.style.width = `${p * 100}%`;
            }
            const wordPhaseEnd = totalGroups / (totalGroups + 1.5);
            if (p < wordPhaseEnd) {
              setPhase("words");
              const idx = Math.min(
                totalGroups - 1,
                Math.floor((p / wordPhaseEnd) * totalGroups),
              );
              setActiveGroup(idx);
            } else {
              setPhase("statement");
            }
          },
        },
      });

      // Word groups + images
      groups.forEach((group, i) => {
        const img = images[i] as HTMLElement | undefined;
        const words = group.querySelectorAll(".value-word");

        tl.to(
          group,
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          i * 1.25,
        );

        tl.to(
          words,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.14,
            ease: "power2.out",
          },
          i * 1.25 + 0.12,
        );

        if (img) {
          tl.to(
            img,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
            },
            i * 1.25 + 0.28,
          );
        }

        const exitTime = i * 1.25 + 1.0;
        tl.to(
          group,
          { opacity: 0, y: -70, duration: 0.55, ease: "power2.in" },
          exitTime,
        );
        if (img) {
          tl.to(
            img,
            {
              opacity: 0,
              scale: 0.9,
              y: -30,
              duration: 0.5,
              ease: "power2.in",
            },
            exitTime,
          );
        }
      });

      // Statement phase
      const statementStart = totalGroups * 1.25 + 0.35;

      tl.to(
        statement,
        { opacity: 1, duration: 0.4, ease: "power1.out" },
        statementStart,
      );

      tl.to(
        statementLines,
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.2,
          ease: "power2.out",
        },
        statementStart + 0.15,
      );

      tl.to(
        cta,
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
        statementStart + 0.15 + statementLines.length * 0.2 + 0.12,
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const sentences = valueStatement
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <section ref={sectionRef} className="relative z-10">
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue via-[#2563eb] to-[#1d4ed8]" />
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-orange/40 blur-[130px]" />
          <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-cyan/30 blur-[110px]" />
        </div>

        <p className="absolute left-0 right-0 top-24 z-30 text-center text-xs font-semibold uppercase tracking-[0.28em] text-white/60 sm:top-28 sm:text-sm">
          Who we are
        </p>

        {/* Word groups – 3 at a time, stacked */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          {wordGroups.map((group, gi) => (
            <div
              key={gi}
              className="value-group pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4"
            >
              {group.map((word, wi) => (
                <h2
                  key={word}
                  className={cn(
                    "value-word text-center font-bold tracking-tight leading-[0.95]",
                    "text-4xl sm:text-6xl md:text-7xl lg:text-8xl",
                    wi === 1
                      ? "bg-gradient-to-r from-orange via-red to-yellow bg-clip-text text-transparent scale-105"
                      : "text-white/90",
                    wi > 0 && "mt-2 sm:mt-3",
                  )}
                >
                  {word}
                </h2>
              ))}
            </div>
          ))}
        </div>

        {/* Floating images – one per group, alternating sides */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {wordGroups.map((_, gi) => {
            const src = valueImages[gi % valueImages.length];
            const side = gi % 2 === 0 ? "right" : "left";
            return (
              <div
                key={gi}
                className={cn(
                  "value-image absolute top-1/2 -translate-y-1/2",
                  side === "right"
                    ? "right-[4%] sm:right-[8%] lg:right-[12%]"
                    : "left-[4%] sm:left-[8%] lg:left-[12%]",
                )}
              >
                <div className="relative w-[42vw] max-w-[340px] aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl sm:w-[36vw] sm:max-w-[400px]">
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="400px"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange/15 via-transparent to-blue/20" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Statement */}
        <div className="value-statement absolute inset-0 z-30 flex flex-col items-center justify-center px-6 sm:px-10">
          <div className="mx-auto max-w-4xl text-center">
            {sentences.map((line, i) => (
              <p
                key={i}
                className="statement-line text-xl sm:text-2xl md:text-3xl lg:text-[2.15rem] font-medium leading-snug text-white mb-4 sm:mb-5 last:mb-0"
              >
                {line}
              </p>
            ))}

            <div className="value-cta mt-10 sm:mt-12">
              <Link
                href="/who-we-are"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-orange"
              >
                <span>→</span> Discover who we are
              </Link>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 z-40 h-1 bg-white/15">
          <div className="scroll-progress h-full bg-gradient-to-r from-orange via-red to-yellow" />
        </div>

        {/* Group dots */}
        <div className="absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 gap-2">
          {wordGroups.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                phase === "words" && activeGroup === i
                  ? "w-6 bg-orange"
                  : "w-1.5 bg-white/40",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
