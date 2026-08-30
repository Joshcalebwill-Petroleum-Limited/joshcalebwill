"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  contactHero,
  helpLinks,
  contactDetails,
  socialLinks,
  mapEmbedSrc,
  contactApiUrl,
} from "@/data/contact";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  Send,
  MessageCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa'

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
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const socialIcons: Record<string, React.ReactNode> = {
  Facebook: <FaFacebook className="h-5 w-5" />,
  Instagram: <FaInstagram className="h-5 w-5" />,
  LinkedIn: <FaLinkedin className="h-5 w-5" />,
  WhatsApp: <MessageCircle className="h-5 w-5" />,
};

export default function ContactPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const smoothY = useSpring(heroY, { stiffness: 80, damping: 25 });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(contactApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or email us directly.");
    }
  }

  return (
    <div className="bg-background overflow-x-hidden">
      {/* ========== HERO ========== */}
      <section
        ref={heroRef}
        className="relative h-[55vh] min-h-[380px] max-h-[560px] overflow-hidden"
      >
        <motion.div style={{ y: smoothY }} className="absolute inset-0 scale-110">
          <div className="absolute inset-0 bg-gradient-to-br from-orange via-red to-blue" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-orange/30 via-transparent to-white/10" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-16 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-white/85"
          >
            Contact
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            {contactHero.title}
          </motion.h1>
        </motion.div>
      </section>

      {/* ========== INTRO ========== */}
      <section className="border-b border-border bg-background-warm">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          {contactHero.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p
                className={cn(
                  "text-center text-base leading-relaxed text-foreground-muted sm:text-lg",
                  i > 0 && "mt-5"
                )}
              >
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ========== HOW WE CAN HELP ========== */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Reveal className="mb-10 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
              Services
            </p>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              How we can help you
            </h2>
          </Reveal>

          <div className="flex flex-wrap justify-center gap-3">
            {helpLinks.map((item, i) => (
              <Reveal key={item.href} delay={i * 0.05}>
                <Link
                  href={item.href}
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-background-soft px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-orange/40 hover:bg-orange hover:text-white"
                >
                  {item.label}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== INFO + FORM ========== */}
      <section className="border-b border-border bg-background-soft">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Contact info */}
            <div className="lg:col-span-5 space-y-8">
              <Reveal>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
                  Reach us
                </p>
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  Get in touch
                </h2>
              </Reveal>

              <Reveal delay={0.06}>
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange/15 text-orange">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Head Office</h3>
                    <p className="mt-1 text-sm text-foreground-muted leading-relaxed">
                      {contactDetails.address}
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue/15 text-blue">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Phone</h3>
                    {contactDetails.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="mt-1 block text-sm text-foreground-muted hover:text-orange transition-colors"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/20 text-teal">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <a
                      href={`mailto:${contactDetails.email}`}
                      className="mt-1 block text-sm text-foreground-muted hover:text-orange transition-colors"
                    >
                      {contactDetails.email}
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow/25 text-orange">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Office Hours</h3>
                    {contactDetails.hours.map((h) => (
                      <p key={h} className="mt-1 text-sm text-foreground-muted">
                        {h}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Social */}
              <Reveal delay={0.22}>
                <div className="rounded-2xl border border-border bg-white p-6">
                  <h3 className="font-semibold text-foreground">Stay connected</h3>
                  <p className="mt-1 text-sm text-foreground-muted">
                    Follow us for projects, innovations and industry insights.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {socialLinks.map((s) => (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background-soft text-foreground transition-all hover:border-orange hover:bg-orange hover:text-white"
                        aria-label={s.name}
                      >
                        {socialIcons[s.name]}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <Reveal>
                <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8 lg:p-10">
                  <h2 className="text-2xl font-bold text-foreground">
                    Quick contact form
                  </h2>
                  <p className="mt-2 text-sm text-foreground-muted">
                    Have a question? Send us a message and our team will get
                    back to you shortly.
                  </p>

                  {status === "success" ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-10 flex flex-col items-center text-center py-10"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lime/20 text-lime">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <h3 className="mt-4 text-xl font-bold text-foreground">
                        Message sent
                      </h3>
                      <p className="mt-2 text-foreground-muted max-w-sm">
                        Thank you for reaching out. We&apos;ll respond as soon
                        as possible.
                      </p>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="mt-6 text-sm font-semibold text-orange hover:text-red transition-colors"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="name"
                            className="mb-1.5 block text-sm font-semibold text-foreground"
                          >
                            Name
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-xl border border-border bg-background-soft px-4 py-3 text-sm text-foreground outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="mb-1.5 block text-sm font-semibold text-foreground"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-border bg-background-soft px-4 py-3 text-sm text-foreground outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
                            placeholder="you@company.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="mb-1.5 block text-sm font-semibold text-foreground"
                        >
                          Subject
                        </label>
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full rounded-xl border border-border bg-background-soft px-4 py-3 text-sm text-foreground outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
                          placeholder="How can we help?"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="mb-1.5 block text-sm font-semibold text-foreground"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full resize-y rounded-xl border border-border bg-background-soft px-4 py-3 text-sm text-foreground outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
                          placeholder="Tell us about your project or inquiry..."
                        />
                      </div>

                      {status === "error" && (
                        <p className="text-sm text-red font-medium">{errorMsg}</p>
                      )}

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-orange px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-red hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:pointer-events-none"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send message
                            <Send className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========== MAP ========== */}
      <section className="bg-white">
        <Reveal>
          <div className="relative h-[360px] sm:h-[420px] lg:h-[480px] w-full overflow-hidden">
            <iframe
              src={mapEmbedSrc}
              title="Joshcalebwill office location"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
