/* ------------------------------------------------------------------ */
/*  Tracking · GA4 + Facebook Pixel + Google Tag Manager (dataLayer)   */
/* ------------------------------------------------------------------ */

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
        gtag?: (...args: unknown[]) => void;
        dataLayer?: Record<string, unknown>[];
    }
}

const STEP_NAMES: Record<number, string> = {
    0: "cover",
    1: "situacao",
    2: "tempo",
    3: "prejuizo",
    4: "providencia",
    5: "urgencia",
    6: "depoimentos",
    7: "investimento",
    8: "coleta",
    9: "loading",
    10: "resultado",
};

/** Push event to GTM dataLayer */
function pushDataLayer(event: string, params?: Record<string, unknown>) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
}

/** Send event directly to GA4 via gtag() */
function sendGA4(eventName: string, params?: Record<string, unknown>) {
    if (window.gtag) window.gtag("event", eventName, params);
}

/** Track custom event on FB Pixel + GTM + GA4 */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
    try {
        if (window.fbq) window.fbq("trackCustom", eventName, params);
        pushDataLayer(eventName, params);
        sendGA4(eventName, params);
    } catch { /* silent */ }
}

/** Track standard FB Pixel event + GTM + GA4 */
export function trackStandard(fbEventName: string, params?: Record<string, unknown>, ga4EventName?: string) {
    try {
        if (window.fbq) window.fbq("track", fbEventName, params);
        pushDataLayer(fbEventName, params);
        sendGA4(ga4EventName ?? fbEventName, params);
    } catch { /* silent */ }
}

/** Quiz started (cover → Q1) */
export function trackQuizStart() {
    trackEvent("QuizStarted");
    trackStandard("InitiateCheckout", { content_name: "quiz_start" }, "begin_checkout");
}

/** User advances to a quiz step */
export function trackQuizStep(step: number, answer?: string) {
    const stepName = STEP_NAMES[step] ?? `step_${step}`;
    trackEvent("QuizStep", { step, stepName, answer });
    trackStandard("ViewContent", { content_name: `quiz_${stepName}`, content_category: "quiz" }, "page_view");
}

/** Lead form submitted */
export function trackLead(data: Record<string, unknown>) {
    trackStandard("Lead", data, "generate_lead");
    trackEvent("QuizLeadSubmitted", data);
}

/** Final CTA clicked (WhatsApp / guide) */
export function trackCTAClick(tier: string, destination: string) {
    trackStandard("Contact", { content_name: tier, content_category: destination }, "contact");
    trackEvent("QuizCTAClicked", { tier, destination });
}
