// ---------------------------------------------------------------------------
// Google Tag Manager – dataLayer helper
// GTM ID: GTM-N4738ZFK (loaded via index.html)
// ---------------------------------------------------------------------------

// Extend Window so TypeScript knows about dataLayer
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

/**
 * Push an event (or any key/value map) into the GTM dataLayer.
 *
 * @example
 * // Fire a custom event
 * pushToDataLayer({ event: "quiz_start", category: "rastreamento" });
 *
 * // Fire a virtual page-view
 * pushToDataLayer({ event: "virtual_pageview", pagePath: "/quiz/step-3" });
 */
export function pushToDataLayer(data: Record<string, unknown>): void {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

/**
 * Convenience: track a custom event with optional extra params.
 *
 * @example
 * trackEvent("form_submit", { formName: "diagnostico", step: 5 });
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>,
): void {
  pushToDataLayer({ event: eventName, ...params });
}

/**
 * Convenience: send a virtual page-view to GTM.
 * Useful in SPAs where the URL doesn't actually change.
 *
 * @example
 * trackPageView("/quiz/resultado");
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
  pushToDataLayer({
    event: "virtual_pageview",
    pagePath,
    pageTitle: pageTitle ?? document.title,
  });
}
