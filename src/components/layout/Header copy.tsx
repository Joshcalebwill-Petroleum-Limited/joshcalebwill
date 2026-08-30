"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { navigation } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change-ish
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-border"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-12 w-12 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Joshcalebwill Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold tracking-tight text-foreground">
                Joshcalebwill
              </span>
              <span className="block text-xs font-medium text-foreground-muted">
                Energy & Beyond
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() =>
                  item.submenu ? setActiveDropdown(item.title) : null
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200",
                    "text-foreground hover:text-orange hover:bg-background-warm",
                  )}
                >
                  {item.title}
                  {item.submenu && (
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        activeDropdown === item.title && "rotate-180",
                      )}
                    />
                  )}
                </Link>

                {/* Mega Dropdown */}
                <AnimatePresence>
                  {item.submenu && activeDropdown === item.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
                      style={{ width: item.dropdownWidth || "600px" }}
                    >
                      <div className="rounded-2xl border border-border bg-white shadow-xl overflow-hidden">
                        <div className="p-6">
                          {item.description && (
                            <p className="mb-5 text-sm text-foreground-muted leading-relaxed">
                              {item.description}
                            </p>
                          )}
                          <div
                            className={cn(
                              "grid gap-2",
                              item.submenu.length > 4
                                ? "grid-cols-2"
                                : "grid-cols-1",
                            )}
                          >
                            {item.submenu.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="group flex flex-col rounded-xl p-3 transition-all duration-200 hover:bg-background-soft"
                              >
                                <span className="font-semibold text-foreground group-hover:text-orange transition-colors">
                                  {sub.title}
                                </span>
                                {sub.description && (
                                  <span className="mt-0.5 text-xs text-foreground-subtle leading-snug">
                                    {sub.description}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/who-we-are/contact-us"
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-red hover:shadow-lg hover:-translate-y-0.5"
            >
              Contact Us
            </Link>

            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center rounded-lg p-2 text-foreground hover:bg-background-warm transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-border bg-white overflow-hidden"
          >
            <div className="max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain">
              <div className="mx-auto max-w-7xl px-4 py-4 space-y-1">
                {navigation.map((item) => (
                  <div key={item.title}>
                    <Link
                      href={item.href}
                      className="block rounded-lg px-4 py-3 text-base font-semibold text-foreground hover:bg-background-warm hover:text-orange transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.title}
                    </Link>
                    {item.submenu && (
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-orange/30 pl-3">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block rounded-lg px-3 py-2 text-sm text-foreground-muted hover:text-orange hover:bg-background-soft transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-3 pb-2">
                  <Link
                    href="/who-we-are/contact-us"
                    className="flex w-full items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
