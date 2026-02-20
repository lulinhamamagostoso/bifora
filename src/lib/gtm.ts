// ---------------------------------------------------------------------------
// Tracking layer: GTM dataLayer + Meta Pixel (fbq)
// GTM ID: GTM-N4738ZFK  |  Meta Pixel: 1430299605240318
// Both scripts are loaded in index.html
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    fbq: (...args: unknown[]) => void;
  }
}

// ======================== LOW-LEVEL HELPERS ================================

/** Push any payload to GTM dataLayer */
export function pushToDataLayer(data: Record<string, unknown>): void {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

/** Fire a Meta Pixel standard or custom event */
function fbqTrack(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window.fbq === "function") {
    window.fbq("track", eventName, params ?? {});
  }
}

/** Fire a Meta Pixel custom event (trackCustom) */
function fbqTrackCustom(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, params ?? {});
  }
}

// ======================== FUNNEL EVENTS ====================================
// Each function fires both GTM dataLayer push AND Meta Pixel event.
// This ensures Google Ads + GA4 (via GTM) and Meta Ads track the same actions.

/** 1. User lands on the page */
export function trackPageView(): void {
  pushToDataLayer({
    event: "page_view",
    page_path: window.location.pathname,
    page_title: document.title,
  });
  fbqTrack("PageView");
}

/** 2. User clicks "Iniciar Diagnostico" */
export function trackQuizStart(): void {
  pushToDataLayer({ event: "quiz_start" });
  fbqTrackCustom("QuizStart");
}

/** 3. User answers a quiz question */
export function trackQuizAnswer(
  stepNumber: number,
  stepName: string,
  answer: string,
): void {
  pushToDataLayer({
    event: "quiz_answer",
    quiz_step: stepNumber,
    quiz_step_name: stepName,
    quiz_answer: answer,
  });
  fbqTrackCustom("QuizAnswer", {
    step: stepNumber,
    step_name: stepName,
    answer,
  });
}

/** 4. User views the social proof (depoimentos) screen */
export function trackViewTestimonials(): void {
  pushToDataLayer({ event: "view_testimonials" });
  fbqTrackCustom("ViewTestimonials");
}

/** 5. User submits lead form (nome + whatsapp) -- this is the LEAD event */
export function trackLeadSubmit(data: {
  nome: string;
  tier: string;
  situacao: string;
  prejuizo: string;
  urgencia: string;
}): void {
  // GTM -- fires GA4 "generate_lead" + custom "lead_submit"
  pushToDataLayer({
    event: "generate_lead",
    lead_name: data.nome,
    lead_tier: data.tier,
    lead_situacao: data.situacao,
    lead_prejuizo: data.prejuizo,
    lead_urgencia: data.urgencia,
  });
  // Meta Pixel -- standard Lead event (used for optimization in Meta Ads)
  fbqTrack("Lead", {
    content_name: "diagnostico_quiz",
    lead_tier: data.tier,
    situacao: data.situacao,
  });
}

/** 6. User sees the result screen */
export function trackResultView(tier: string): void {
  pushToDataLayer({
    event: "quiz_result",
    result_tier: tier,
  });
  fbqTrackCustom("QuizResult", { tier });
}

/** 7. User clicks WhatsApp CTA -- this is the CONVERSION event */
export function trackWhatsAppClick(tier: string): void {
  // GTM -- primary conversion event for Google Ads
  pushToDataLayer({
    event: "whatsapp_click",
    conversion_tier: tier,
  });
  // Meta Pixel -- Contact standard event (used for optimization in Meta Ads)
  fbqTrack("Contact", {
    content_name: "whatsapp_cta",
    tier,
  });
}

/** 8. Cold lead clicks "Baixar Guia" */
export function trackDownloadGuide(): void {
  pushToDataLayer({ event: "download_guide" });
  fbqTrackCustom("DownloadGuide");
}
