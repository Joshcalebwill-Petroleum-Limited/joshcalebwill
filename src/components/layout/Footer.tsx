import Link from "next/link";
import Image from "next/image";
import { navigation } from "@/data/navigation";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background-elevated">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-12 w-12">
                <Image
                  src="/logo.png"
                  alt="Joshcalebwill"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold text-foreground">
                Joshcalebwill
              </span>
            </Link>
            <p className="text-sm text-foreground-muted leading-relaxed max-w-xs">
              Integrated energy, procurement, engineering and logistics
              solutions. Delivering excellence across the energy value chain.
            </p>
          </div>

          {/* Who We Are */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              Who We Are
            </h3>
            <ul className="space-y-2.5">
              {navigation[0]?.submenu?.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground-muted hover:text-orange transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/who-we-are/jobs"
                  className="text-sm text-foreground-muted hover:text-orange transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* What We Do */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              What We Do
            </h3>
            <ul className="space-y-2.5">
              {navigation[1]?.submenu?.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground-muted hover:text-orange transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sustainability + Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              Sustainability
            </h3>
            <ul className="space-y-2.5 mb-8">
              {navigation[2]?.submenu?.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground-muted hover:text-orange transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/market"
                  className="text-sm text-foreground-muted hover:text-orange transition-colors"
                >
                  Market
                </Link>
              </li>
            </ul>

            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">
              Get in Touch
            </h3>
            <Link
              href="/who-we-are/contact-us"
              className="inline-flex items-center justify-center rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red hover:shadow-md"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground-subtle">
            © {currentYear} Joshcalebwill. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-foreground-subtle hover:text-orange transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-foreground-subtle hover:text-orange transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
