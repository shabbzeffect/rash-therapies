/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Where the booking form POSTs. Any endpoint that accepts a JSON body works —
   * Formspree (`https://formspree.io/f/<id>`), Resend, a Cloudflare Worker, your own API.
   * Leave unset and the form falls back to opening a pre-filled email instead.
   */
  readonly VITE_BOOKING_ENDPOINT?: string;
  /** Cookieless analytics script URL, e.g. Plausible. Injected only when set. */
  readonly VITE_ANALYTICS_SRC?: string;
  /** Analytics domain passed to the script as `data-domain`. */
  readonly VITE_ANALYTICS_DOMAIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
