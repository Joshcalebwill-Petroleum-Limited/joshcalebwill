// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   getCookieConsent,
//   setCookieConsent,
//   type CookieConsentValue,
// } from "@/lib/cookieConsent";
// import { Cookie } from "lucide-react";

// export function CookieConsent() {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     // Avoid flash: only show after mount if no stored choice
//     const existing = getCookieConsent();
//     if (!existing) {
//       const t = window.setTimeout(() => setVisible(true), 600);
//       return () => window.clearTimeout(t);
//     }
//   }, []);

//   const choose = (value: CookieConsentValue) => {
//     setCookieConsent(value);
//     setVisible(false);
//   };

//   return (
//     <AnimatePresence>
//       {visible && (
//         <motion.div
//           role="dialog"
//           aria-labelledby="cookie-consent-title"
//           aria-describedby="cookie-consent-desc"
//           initial={{ y: 40, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           exit={{ y: 24, opacity: 0 }}
//           transition={{ type: "spring", stiffness: 280, damping: 28 }}
//           className="fixed inset-x-0 bottom-0 z-[90] p-4 sm:p-6 pointer-events-none"
//         >
//           <div className="pointer-events-auto mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-border bg-white p-5 shadow-2xl sm:flex-row sm:items-center sm:gap-6 sm:p-6">
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange/10">
//               <Cookie className="h-5 w-5 text-orange" />
//             </div>

//             <div className="min-w-0 flex-1">
//               <h2
//                 id="cookie-consent-title"
//                 className="text-base font-bold text-foreground"
//               >
//                 We use cookies
//               </h2>
//               <p
//                 id="cookie-consent-desc"
//                 className="mt-1 text-sm leading-relaxed text-foreground-muted"
//               >
//                 We use essential cookies to make this site work, and optional
//                 cookies to improve your experience. You can accept or decline
//                 optional cookies.{" "}
//                 <Link
//                   href="/who-we-are/contact-us"
//                   className="font-semibold text-orange underline-offset-2 hover:underline"
//                 >
//                   Contact us
//                 </Link>{" "}
//                 if you have questions about privacy.
//               </p>
//             </div>

//             <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
//               <button
//                 type="button"
//                 onClick={() => choose("declined")}
//                 className="rounded-full border-2 border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-orange/40 hover:text-orange"
//               >
//                 Decline
//               </button>
//               <button
//                 type="button"
//                 onClick={() => choose("accepted")}
//                 className="rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-red hover:-translate-y-0.5"
//               >
//                 Accept
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getCookieConsent, setCookieAccepted } from "@/lib/cookieConsent";
import { Cookie } from "lucide-react";

export function CookieConsent() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  // Show again on every route change until the user accepts
  useEffect(() => {
    if (getCookieConsent() === "accepted") {
      setVisible(false);
      return;
    }
    const t = window.setTimeout(() => setVisible(true), 500);
    return () => window.clearTimeout(t);
  }, [pathname]);

  const accept = () => {
    setCookieAccepted();
    setVisible(false);
  };

  // Decline: hide only until next navigation / refresh (not stored)
  const decline = () => {
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-desc"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className="fixed inset-x-0 bottom-0 z-[90] p-4 sm:p-6 pointer-events-none"
        >
          <div className="pointer-events-auto mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-border bg-white p-5 shadow-2xl sm:flex-row sm:items-center sm:gap-6 sm:p-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange/10">
              <Cookie className="h-5 w-5 text-orange" />
            </div>

            <div className="min-w-0 flex-1">
              <h2
                id="cookie-consent-title"
                className="text-base font-bold text-foreground"
              >
                We use cookies
              </h2>
              <p
                id="cookie-consent-desc"
                className="mt-1 text-sm leading-relaxed text-foreground-muted"
              >
                We use essential cookies to make this site work, and optional
                cookies to improve your experience. You can accept or decline
                optional cookies.{" "}
                <Link
                  href="/who-we-are/contact-us"
                  className="font-semibold text-orange underline-offset-2 hover:underline"
                >
                  Contact us
                </Link>{" "}
                if you have questions about privacy.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={decline}
                className="rounded-full border-2 border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-orange/40 hover:text-orange"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={accept}
                className="rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-red hover:-translate-y-0.5"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
