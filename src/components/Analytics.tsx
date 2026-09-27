import { useEffect } from "react";

const SRC = import.meta.env.VITE_ANALYTICS_SRC?.trim();
const DOMAIN = import.meta.env.VITE_ANALYTICS_DOMAIN?.trim();

/**
 * Cookieless analytics, opt-in. Renders nothing and injects nothing unless
 * VITE_ANALYTICS_SRC is set, so a default build ships zero third-party code.
 *
 * Plausible example:
 *   VITE_ANALYTICS_SRC=https://plausible.io/js/script.js
 *   VITE_ANALYTICS_DOMAIN=rashidahwangara.co.ke
 */
export function Analytics() {
  useEffect(() => {
    if (!SRC || document.querySelector(`script[src="${SRC}"]`)) return;

    const script = document.createElement("script");
    script.src = SRC;
    script.defer = true;
    if (DOMAIN) script.dataset.domain = DOMAIN;
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
