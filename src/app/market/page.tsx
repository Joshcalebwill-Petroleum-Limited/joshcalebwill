"use client";

import { useMemo, useRef, useState } from "react";
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
  products,
  productCategories,
  formatPrice,
  type Product,
} from "@/data/market";
import { CartProvider, useCart } from "@/components/market/CartProvider";
import { CartDrawer } from "@/components/market/CartDrawer";
import { cn } from "@/lib/utils";
import { ShoppingCart, Star, Plus, ArrowUpRight } from "lucide-react";

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
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-background-soft">
        {!imgFailed ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-foreground-muted">
            No image
          </div>
        )}
        {product.oldPrice && (
          <span className="absolute left-3 top-3 rounded-full bg-red px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            Sale
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-orange">
          {product.category.replace("-", " & ")}
        </p>
        <h3 className="mt-1 text-base font-bold text-foreground leading-snug line-clamp-2">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-foreground-muted flex-1">
          {product.description}
        </p>
        <div className="mt-3 flex items-center gap-1 text-amber-500">
          <Star className="h-3.5 w-3.5 fill-current" />
          <span className="text-xs font-semibold text-foreground-muted">
            {product.rating.toFixed(1)}
          </span>
        </div>
        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <p className="text-lg font-bold text-foreground">
              {formatPrice(product.price)}
            </p>
            {product.oldPrice && (
              <p className="text-xs text-foreground-muted line-through">
                {formatPrice(product.oldPrice)}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="inline-flex items-center gap-1.5 rounded-full bg-orange px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-red hover:-translate-y-0.5"
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function MarketContent() {
  const [category, setCategory] = useState("all");
  const { count, openCart } = useCart();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const smoothY = useSpring(heroY, { stiffness: 80, damping: 25 });

  const filtered = useMemo(() => {
    if (category === "all") return products;
    return products.filter((p) => p.category === category);
  }, [category]);

  return (
    <div className="bg-background overflow-x-hidden">
      {/* Floating cart button */}
      {/* <button
        type="button"
        onClick={openCart}
        className="fixed bottom-6 right-[5.5rem] z-50 flex items-center gap-2 rounded-full bg-orange px-5 py-3.5 text-sm font-semibold text-white shadow-xl transition-all hover:bg-red hover:-translate-y-0.5"
      >
        <ShoppingCart className="h-5 w-5" />
        Cart
        {count > 0 && (
          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-orange">
            {count}
          </span>
        )}
      </button> */}
      <div
        className="pointer-events-none fixed bottom-6 right-6 z-50 grid grid-cols-[auto_3.5rem] items-center gap-3"
        aria-label="Market actions"
      >
        <button
          type="button"
          onClick={openCart}
          className="pointer-events-auto flex items-center gap-2 rounded-full bg-orange px-5 py-3.5 text-sm font-semibold text-white shadow-xl transition-all hover:bg-red hover:-translate-y-0.5"
        >
          <ShoppingCart className="h-5 w-5" />
          Cart
          {count > 0 && (
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-orange">
              {count}
            </span>
          )}
        </button>
        {/* Empty cell aligns with ChatWidget (h-14 w-14) at bottom-right */}
        <div className="h-14 w-14" aria-hidden />
      </div>

      <CartDrawer />

      {/* Hero */}
      <div className="relative min-h-[70svh] flex flex-col bg-white">
        <section
          ref={heroRef}
          className="relative flex-1 min-h-[36vh] overflow-hidden"
        >
          <motion.div
            style={{ y: smoothY }}
            className="absolute inset-0 scale-110"
          >
            <Image
              src="/assets/hero/hero-02.jpg"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
          </motion.div>
        </section>

        <section className="relative z-10 -mt-14 sm:-mt-20 bg-white pb-10 sm:pb-14">
          <div className="mx-auto max-w-4xl px-4 pt-2 sm:px-6 lg:px-8 text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-orange"
            >
              Supply
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl bg-cover bg-center bg-no-repeat bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
              style={{
                backgroundImage: "url(/assets/hero/hero-02.jpg)",
                backgroundPosition: "center 40%",
              }}
            >
              Market
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mx-auto mt-5 max-w-xl text-base text-foreground-muted sm:text-lg"
            >
              Safety gear, lubricants, hoses and instrumentation — browse the
              catalog and enquire about the items you need.
            </motion.p>
          </div>
        </section>
      </div>

      {/* Filters + grid */}
      <section className="border-t border-border bg-background-soft">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            {productCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-all",
                  category === cat.id
                    ? "bg-orange text-white shadow-md"
                    : "bg-white text-foreground-muted border border-border hover:border-orange/40 hover:text-orange",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <p className="mb-6 text-center text-sm text-foreground-muted">
            {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product, i) => (
              <Reveal key={product.id} delay={(i % 4) * 0.05}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="border-t border-border bg-white">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
          <Reveal>
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              How ordering works
            </h2>
            <p className="mt-3 text-foreground-muted leading-relaxed">
              Add items to your cart, then send an enquiry. Our team will
              confirm availability, pricing and delivery — no online payment
              required for now.
            </p>
            <Link
              href="/who-we-are/contact-us"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange hover:text-red"
            >
              Prefer to talk first? Contact us
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

export default function MarketPage() {
  return (
    <CartProvider>
      <MarketContent />
    </CartProvider>
  );
}
