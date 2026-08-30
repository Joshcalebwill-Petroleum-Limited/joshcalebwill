"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/data/market";
import { X, Minus, Plus, Trash2, Mail } from "lucide-react";

export function CartDrawer() {
  const {
    items,
    subtotal,
    isOpen,
    closeCart,
    setQty,
    removeItem,
    clear,
  } = useCart();

  const enquireMailto = () => {
    const lines = items.map(
      (i) =>
        `• ${i.product.name} × ${i.qty} — ${formatPrice(i.product.price * i.qty)}`
    );
    const body = encodeURIComponent(
      `Hello Joshcalebwill,\n\nI would like to enquire about the following items:\n\n${lines.join("\n")}\n\nSubtotal: ${formatPrice(subtotal)}\n\nPlease contact me with availability and next steps.\n`
    );
    return `mailto:info@joshcalebwill.com?subject=${encodeURIComponent("Product enquiry from Market")}&body=${body}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-blue/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="text-lg font-bold text-foreground">Your cart</h2>
              <button
                type="button"
                onClick={closeCart}
                className="rounded-full p-2 text-foreground-muted hover:bg-background-soft hover:text-foreground transition-colors"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <p className="py-16 text-center text-foreground-muted">
                  Your cart is empty. Browse the catalog and add items.
                </p>
              ) : (
                <ul className="space-y-4">
                  {items.map(({ product, qty }) => (
                    <li
                      key={product.id}
                      className="flex gap-3 rounded-2xl border border-border p-3"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-background-soft">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {product.name}
                        </p>
                        <p className="mt-0.5 text-sm font-medium text-orange">
                          {formatPrice(product.price)}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setQty(product.id, qty - 1)}
                            className="rounded-full border border-border p-1 hover:bg-background-soft"
                            aria-label="Decrease"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(product.id, qty + 1)}
                            className="rounded-full border border-border p-1 hover:bg-background-soft"
                            aria-label="Increase"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeItem(product.id)}
                            className="ml-auto rounded-full p-1.5 text-foreground-muted hover:bg-red/10 hover:text-red"
                            aria-label="Remove"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border px-5 py-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground-muted">Subtotal</span>
                  <span className="text-lg font-bold text-foreground">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="text-xs text-foreground-muted">
                  No online checkout yet — send an enquiry and our team will
                  confirm availability and pricing.
                </p>
                <a
                  href={enquireMailto()}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-red"
                >
                  <Mail className="h-4 w-4" />
                  Enquire about cart
                </a>
                <button
                  type="button"
                  onClick={clear}
                  className="w-full text-center text-xs font-medium text-foreground-muted hover:text-red"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
