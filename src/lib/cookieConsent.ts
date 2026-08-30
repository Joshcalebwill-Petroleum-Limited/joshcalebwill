// export const COOKIE_CONSENT_KEY = "jcwl-cookie-consent-v1";

// export type CookieConsentValue = "accepted" | "declined";

// export function getCookieConsent(): CookieConsentValue | null {
//   if (typeof window === "undefined") return null;
//   try {
//     const v = localStorage.getItem(COOKIE_CONSENT_KEY);
//     if (v === "accepted" || v === "declined") return v;
//   } catch {
//     /* ignore */
//   }
//   return null;
// }

// export function setCookieConsent(value: CookieConsentValue) {
//   try {
//     localStorage.setItem(COOKIE_CONSENT_KEY, value);
//     window.dispatchEvent(
//       new CustomEvent("jcwl-cookie-consent", { detail: value }),
//     );
//   } catch {
//     /* ignore */
//   }
// }

// /** Use before loading analytics / non-essential scripts */
// export function hasAnalyticsConsent(): boolean {
//   return getCookieConsent() === "accepted";
// }


export const COOKIE_CONSENT_KEY = "jcwl-cookie-consent-v1";

export type CookieConsentValue = "accepted" | "declined";

/** Only "accepted" is persisted. Decline is session/UI-only. */
export function getCookieConsent(): "accepted" | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (v === "accepted") return "accepted";
  } catch {
    /* ignore */
  }
  return null;
}

export function setCookieAccepted() {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    window.dispatchEvent(
      new CustomEvent("jcwl-cookie-consent", { detail: "accepted" }),
    );
  } catch {
    /* ignore */
  }
}
