import { useState, useEffect, useCallback, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LazyIMaskInput = lazy(() => import("react-imask").then(m => ({ default: m.IMaskInput })));
import {
    ArrowLeft,
    ArrowRight,
    Lock,
    ShieldCheck,
    Clock,
    MessageCircle,
    CheckCircle2,
    Loader2,
    Send,
    Star,
    Quote,
} from "lucide-react";

import {
    type QuizAnswers,
    type LeadData,
    type LeadTier,
    PHONE_MAIN,
    PHONE_TRIAGE,
    FORMSPREE_URL,
    S,
    TOTAL_QUESTIONS,
    SITUACOES,
    TEMPOS,
    PREJUIZOS,
    PROVIDENCIAS,
    URGENCIAS,
    INVESTIMENTOS,
    LOADING_MESSAGES,
    slideVariants,
    calcTier,
    getFilteredTestimonials,
} from "./quizData";

import { trackQuizStart, trackQuizStep, trackLead, trackCTAClick } from "./tracking";

import { QScreen } from "./components/QScreen";
import { OptionCard } from "./components/OptionCard";
import { ResultHot, ResultWarm, ResultCold } from "./components/ResultScreens";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function QuizFunnel() {
    const [step, setStep] = useState<number>(S.COVER);
    const [dir, setDir] = useState<number>(1);
    const [answers, setAnswers] = useState<QuizAnswers>({
        situacao: "",
        tempo: "",
        prejuizo: "",
        providencia: "",
        urgencia: "",
        investimento: "",
    });
    const [leadData, setLeadData] = useState<LeadData>({ nome: "", email: "", whatsapp: "" });
    const [loadIdx, setLoadIdx] = useState<number>(0);
    const [tier, setTier] = useState<LeadTier>("warm");
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    /* Browser history — back button navigates quiz instead of leaving site */
    const stepRef = useRef(step);
    stepRef.current = step;

    useEffect(() => {
        history.replaceState({ step: S.COVER }, "");

        const onPopState = () => {
            const s = stepRef.current;
            if (s > S.COVER && s <= S.COLETA) {
                setDir(-1);
                setStep(s - 1);
                setSelectedOption(null);
                window.scrollTo({ top: 0, behavior: "instant" });
            } else if (s > S.COLETA) {
                history.pushState(null, "");
            }
        };

        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, []);

    /* Navigation */
    const goTo = useCallback(
        (target: number) => {
            setDir(target > step ? 1 : -1);
            setStep(target);
            setSelectedOption(null);
            window.scrollTo({ top: 0, behavior: "instant" });
            if (target > step) history.pushState({ step: target }, "");
        },
        [step],
    );

    const goBack = useCallback(() => {
        if (step > S.COVER && step <= S.COLETA) goTo(step - 1);
    }, [step, goTo]);

    /* Select with micro-delay for checkmark animation */
    const selectOption = useCallback(
        (key: string, answerKey: keyof QuizAnswers, value: string, nextStep: number) => {
            setSelectedOption(key);
            setAnswers((p) => ({ ...p, [answerKey]: value }));
            setTimeout(() => goTo(nextStep), 350);
        },
        [goTo],
    );

    /* Persist quiz state in sessionStorage */
    useEffect(() => {
        const saved = sessionStorage.getItem("bforense_quiz");
        if (saved) {
            try {
                const data = JSON.parse(saved);
                if (data.answers) setAnswers(data.answers);
                if (data.leadData) setLeadData(data.leadData);
                if (data.step != null && data.step > S.COVER && data.step < S.LOADING) {
                    setStep(data.step);
                }
            } catch { /* ignore */ }
        }
    }, []);

    /* Retry failed lead submissions saved in localStorage */
    useEffect(() => {
        const backup = localStorage.getItem("bforense_lead_backup");
        if (!backup) return;
        try {
            const payload = JSON.parse(backup);
            fetch(FORMSPREE_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(payload),
            }).then(res => { if (res.ok) localStorage.removeItem("bforense_lead_backup"); })
              .catch(() => {});
        } catch { /* silent */ }
    }, []);

    useEffect(() => {
        if (step > S.COVER && step < S.LOADING) {
            sessionStorage.setItem("bforense_quiz", JSON.stringify({ step, answers, leadData }));
        }
        if (step === S.RESULTADO) {
            sessionStorage.removeItem("bforense_quiz");
        }
    }, [step, answers, leadData]);

    /* Track step transitions for FB Pixel + GTM + GA4 */
    useEffect(() => {
        if (step === S.SITUACAO) trackQuizStart();
        if (step > S.COVER) trackQuizStep(step);
    }, [step]);

    /* Send lead data to Formspree (with retry + localStorage fallback) */
    const sendToFormspree = useCallback(async () => {
        const computedTier = calcTier(answers);
        const payload = {
            nome: leadData.nome,
            email: leadData.email,
            whatsapp: leadData.whatsapp,
            tier: computedTier,
            ...answers,
        };

        let success = false;
        for (let attempt = 0; attempt < 3; attempt++) {
            try {
                const res = await fetch(FORMSPREE_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Accept: "application/json" },
                    body: JSON.stringify(payload),
                });
                if (res.ok) { success = true; break; }
            } catch { /* retry */ }
        }

        if (success) {
            try { localStorage.removeItem("bforense_lead_backup"); } catch { /* silent */ }
        } else {
            try { localStorage.setItem("bforense_lead_backup", JSON.stringify(payload)); } catch { /* silent */ }
        }

        trackLead({ tier: computedTier, situacao: answers.situacao, prejuizo: answers.prejuizo });
    }, [answers, leadData]);

    /* Loading auto-advance */
    useEffect(() => {
        if (step !== S.LOADING) return;
        setLoadIdx(0);
        setTier(calcTier(answers));
        sendToFormspree();

        let tid: ReturnType<typeof setTimeout>;
        const iv = setInterval(() => {
            setLoadIdx((prev) => {
                if (prev >= LOADING_MESSAGES.length - 1) {
                    clearInterval(iv);
                    tid = setTimeout(() => goTo(S.RESULTADO), 700);
                    return prev;
                }
                return prev + 1;
            });
        }, 900);
        return () => { clearInterval(iv); clearTimeout(tid); };
    }, [step, goTo, answers, sendToFormspree]);

    /* WhatsApp — shortened message */
    const phone = tier === "hot" ? PHONE_MAIN : PHONE_TRIAGE;

    const openWhatsApp = () => {
        const nome = leadData.nome || "Cliente";
        const tierLabel = tier === "hot" ? "alta viabilidade" : tier === "warm" ? "análise necessária" : "orientação inicial";
        const resolucao = tier === "hot" ? " (94% de resolução)" : "";
        const msg = `Olá! Sou ${nome}. Acabei de fazer o diagnóstico e meu caso foi classificado como *${tierLabel}*${resolucao}.

Situação: ${answers.situacao}
Prejuízo: ${answers.prejuizo}
Urgência: ${answers.urgencia}

Gostaria de falar com o especialista designado para o meu caso.`;
        trackCTAClick(tier, "whatsapp");
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    };

    /* Progress — linear across all navigable steps (1 through COLETA) */
    const progress = step <= S.COVER ? 0 : Math.round((step / (S.COLETA + 1)) * 100);

    /* Validation */
    const cleanPhone = leadData.whatsapp.replace(/\D/g, "");
    const phoneIsValid = cleanPhone.length === 11;
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadData.email);
    const canSubmitLead = leadData.nome.trim().length >= 2 && phoneIsValid && (leadData.email.trim() === "" || emailIsValid);

    /* ---------------------------------------------------------------- */
    /*  Screens                                                          */
    /* ---------------------------------------------------------------- */

    /* ---------- COVER ---------- */
    const renderCover = () => (
        <motion.div
            key="cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center px-5 pt-20 pb-10 sm:px-6 sm:pt-28 sm:pb-12 min-h-dvh justify-center safe-bottom"
        >
            {/* Logo */}
            <motion.img
                src="/logowhiteB.png"
                alt="Bforense"
                className="h-7 sm:h-10 mb-8 sm:mb-12 opacity-80"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            />

            {/* Category label */}
            <motion.div
                className="inline-flex items-center gap-2 bg-surface-card border border-border-subtle rounded-full px-4 py-1.5 mb-5 sm:mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.4 }}
            >
                <img src="/logo.png" alt="" className="w-5 h-5 object-contain" decoding="async" />
                <span className="text-[11px] sm:text-xs text-text-secondary font-medium tracking-wide uppercase">Agência Privada de Investigações</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
                className="font-black text-text-primary leading-[1.08] mb-4 sm:mb-5 text-center text-balance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.45 }}
            >
                <span className="block text-[clamp(1.15rem,5vw,2.5rem)]">Algo errado aconteceu e você</span>
                <span className="block text-[clamp(1.15rem,5vw,2.5rem)]">não sabe o que fazer?</span>
                <span className="block text-[clamp(1rem,4.5vw,2.25rem)] text-brand mt-1">Descubra se o seu caso tem solução</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                className="text-text-secondary text-sm sm:text-base max-w-sm sm:max-w-md mb-6 sm:mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
            >
                Responda 6 perguntas rápidas e nossos investigadores vão avaliar o que ainda pode ser feito — em menos de 1 minuto, sem custo e com total sigilo.
            </motion.p>

            {/* Hero image */}
            <motion.div
                className="relative w-full max-w-sm sm:max-w-md mb-6 sm:mb-8 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.25, duration: 0.45 }}
            >
                <div className="absolute -inset-2 bg-brand-glow rounded-xl blur-xl sm:blur-2xl pointer-events-none opacity-30 sm:opacity-40" />
                <div className="relative rounded-xl overflow-hidden border border-border-muted shadow-2xl shadow-blue-950/30">
                    <img
                        src="/cover-team.webp"
                        alt="Centro de operações Bforense"
                        width={800}
                        height={450}
                        className="w-full h-auto object-cover"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
                </div>
            </motion.div>

            {/* Social proof stats */}
            <motion.div
                className="flex items-stretch justify-center gap-0 w-full max-w-sm sm:max-w-md mb-6 sm:mb-8 rounded-xl overflow-hidden border border-border-subtle bg-surface-card"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
            >
                {[
                    { value: "3.200+", label: "casos resolvidos" },
                    { value: "4.9★", label: "google" },
                    { value: "94%", label: "recuperação" },
                ].map((stat, i) => (
                    <div
                        key={stat.label}
                        className={`flex-1 flex flex-col items-center justify-center py-3.5 sm:py-4 ${i < 2 ? "border-r border-border-subtle" : ""}`}
                    >
                        <p className="text-text-primary font-black text-lg sm:text-xl leading-none font-heading">{stat.value}</p>
                        <p className="text-text-muted text-[9px] sm:text-[10px] uppercase tracking-[0.15em] mt-1 font-medium">{stat.label}</p>
                    </div>
                ))}
            </motion.div>

            {/* CTA */}
            <motion.button
                onClick={() => goTo(S.SITUACAO)}
                className="group relative w-full max-w-sm sm:max-w-md inline-flex items-center justify-center gap-3 bg-brand hover:bg-brand-hover text-text-primary font-bold text-[15px] sm:text-base px-6 py-4 sm:py-[18px] rounded-xl shadow-lg shadow-blue-900/25 transition-all duration-200 hover:shadow-blue-800/40 hover:scale-[1.015] active:scale-[0.98]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
            >
                <span className="absolute inset-0 rounded-xl bg-brand/15 animate-pulse pointer-events-none" style={{ animationDuration: "2s" }} />
                <span className="relative flex items-center gap-2.5">
                    DESCOBRIR SE MEU CASO TEM SOLUÇÃO
                    <ArrowRight className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" />
                </span>
            </motion.button>

            {/* Trust badges */}
            <motion.div
                className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-5 sm:mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
            >
                {[
                    { icon: Lock, text: "Dados protegidos" },
                    { icon: Clock, text: "Menos de 1 min" },
                    { icon: ShieldCheck, text: "Sem compromisso" },
                ].map((badge) => (
                    <span
                        key={badge.text}
                        className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-text-muted uppercase tracking-wider font-medium"
                    >
                        <badge.icon className="w-3 h-3 text-text-secondary" />
                        {badge.text}
                    </span>
                ))}
            </motion.div>

            {/* Direct contact link */}
            <motion.a
                href={`https://wa.me/${PHONE_MAIN}?text=${encodeURIComponent("Olá! Gostaria de falar diretamente com um especialista.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 sm:mt-6 flex items-center gap-2 bg-surface-card border border-border-subtle hover:border-brand/30 rounded-full px-4 py-2 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
            >
                <MessageCircle className="w-3.5 h-3.5 text-accent-emerald" />
                <span className="text-[11px] sm:text-xs text-text-secondary">
                    Prefere falar direto? <span className="text-brand font-semibold underline">Chame no WhatsApp</span>
                </span>
            </motion.a>

            {/* Disclaimer footer */}
            <motion.footer
                className="w-full max-w-lg mx-auto mt-10 px-5 pb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                <div className="border-t border-border-subtle pt-5">
                    <p className="text-[12px] leading-[1.6] text-text-muted/50">
                        Este site não faz parte do site do Facebook ou do Facebook Inc. Adicionalmente, este site NÃO é endossado pelo Facebook de forma alguma. FACEBOOK é uma marca comercial de FACEBOOK, Inc. Os depoimentos e resultados mencionados são reais, mas não garantem que você terá os mesmos resultados.
                    </p>
                    <p className="text-[12px] leading-[1.6] text-text-muted/50 mt-3">
                        AVISO LEGAL E LIMITES DE ATUAÇÃO: A Bforense é uma agência de Investigações Privada, operando estritamente sob a Lei Federal 13.432/2017. Declaramos expressamente que não possuímos vínculo com a Polícia Civil, Polícia Federal ou órgãos do Poder Judiciário. Nossos serviços restringem-se à investigação, produção de provas técnicas e inteligência em fontes abertas (OSINT) para suporte a litígios. Não realizamos interceptações telefônicas, quebra de sigilo bancário sem ordem judicial, bloqueios de contas ou prisões. Todo o material produzido destina-se a fundamentar a atuação de advogados e autoridades competentes.
                    </p>
                </div>
            </motion.footer>
        </motion.div>
    );

    /* ---------- P1: SITUAÇÃO ---------- */
    const renderSituacao = () => (
        <QScreen key="s1" dir={dir} step={1} title="Qual situação melhor descreve o seu caso?" subtitle="Selecione a opção mais próxima da sua realidade">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SITUACOES.map((item, i) => {
                    const Icon = item.icon;
                    const key = `sit_${i}`;
                    return (
                        <OptionCard
                            key={key}
                            i={i}
                            selected={selectedOption === key}
                            onClick={() => selectOption(key, "situacao", item.label, S.TEMPO)}
                        >
                            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-surface-card border border-border-subtle group-hover:bg-brand/10 group-hover:border-brand/20 flex items-center justify-center transition-colors">
                                <Icon className="w-[18px] h-[18px] text-text-secondary group-hover:text-brand transition-colors" />
                            </div>
                            <span className="text-[14px] sm:text-[15px] text-text-primary/90 font-medium leading-snug">{item.label}</span>
                        </OptionCard>
                    );
                })}
            </div>
        </QScreen>
    );

    /* ---------- P2: TEMPO ---------- */
    const renderTempo = () => (
        <QScreen key="s2" dir={dir} step={2} title="Há quanto tempo essa situação está acontecendo?" subtitle="Quanto mais recente, maiores as chances de resolver.">
            <div className="flex flex-col gap-2.5">
                {TEMPOS.map((item, i) => {
                    const key = `temp_${i}`;
                    return (
                        <OptionCard
                            key={key}
                            i={i}
                            selected={selectedOption === key}
                            onClick={() => selectOption(key, "tempo", item.label, S.PREJUIZO)}
                        >
                            <span className={`w-3 h-3 rounded-full flex-shrink-0 ${i === 0 ? "bg-brand" : i === 1 ? "bg-accent-amber" : i === 2 ? "bg-blue-400" : "bg-text-muted"}`} />
                            <span className="text-[15px] text-text-primary/90 font-medium">{item.label}</span>
                        </OptionCard>
                    );
                })}
            </div>
        </QScreen>
    );

    /* ---------- P3: PREJUÍZO ---------- */
    const renderPrejuizo = () => (
        <QScreen key="s3" dir={dir} step={3} title="Qual o valor financeiro envolvido na situação?" subtitle="Caso o prejuízo não seja financeiro, selecione a última opção.">
            <div className="flex flex-col gap-2.5">
                {PREJUIZOS.map((item, i) => {
                    const key = `prej_${i}`;
                    return (
                        <OptionCard
                            key={key}
                            i={i}
                            selected={selectedOption === key}
                            onClick={() => selectOption(key, "prejuizo", item.label, S.PROVIDENCIA)}
                        >
                            <span className="text-[15px] text-text-primary/90 font-medium">{item.label}</span>
                        </OptionCard>
                    );
                })}
            </div>
        </QScreen>
    );

    /* ---------- P4: PROVIDÊNCIA ---------- */
    const renderProvidencia = () => (
        <QScreen key="s4" dir={dir} step={4} title="Você já procurou ajuda para resolver isso?" subtitle="Não se preocupe — a maioria das pessoas chega aqui sem saber por onde começar.">
            <div className="flex flex-col gap-2.5">
                {PROVIDENCIAS.map((item, i) => {
                    const Icon = item.icon;
                    const key = `prov_${i}`;
                    return (
                        <OptionCard
                            key={key}
                            i={i}
                            selected={selectedOption === key}
                            onClick={() => selectOption(key, "providencia", item.label, S.URGENCIA)}
                        >
                            <Icon className="w-5 h-5 text-text-secondary group-hover:text-brand transition-colors flex-shrink-0" />
                            <span className="text-[15px] text-text-primary/90 font-medium">{item.label}</span>
                        </OptionCard>
                    );
                })}
            </div>
        </QScreen>
    );

    /* ---------- P5: URGÊNCIA ---------- */
    const renderUrgencia = () => (
        <QScreen key="s5" dir={dir} step={5} title="Qual é o seu nível de urgência para resolver isso?" subtitle="Saber sua urgência nos permite acionar o time certo imediatamente.">
            <div className="flex flex-col gap-2.5">
                {URGENCIAS.map((item, i) => {
                    const Icon = item.icon;
                    const key = `urg_${i}`;
                    return (
                        <OptionCard
                            key={key}
                            i={i}
                            selected={selectedOption === key}
                            onClick={() => selectOption(key, "urgencia", item.label, S.DEPOIMENTOS)}
                        >
                            <Icon className="w-5 h-5 text-text-secondary group-hover:text-brand transition-colors flex-shrink-0" />
                            <span className="text-[15px] text-text-primary/90 font-medium">{item.label}</span>
                        </OptionCard>
                    );
                })}
            </div>
        </QScreen>
    );

    /* ---------- DEPOIMENTOS (Dynamic by P1 answer) ---------- */
    const renderDepoimentos = () => {
        const filtered = getFilteredTestimonials(answers.situacao);

        return (
            <motion.div
                key="depoimentos"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="px-5 sm:px-6 pt-[86px] sm:pt-[106px] pb-8 sm:pb-10"
            >
                <motion.div
                    className="flex items-center justify-center gap-2 mb-2 sm:mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <Quote className="w-4 sm:w-5 h-4 sm:h-5 text-accent-amber" />
                    <p className="text-[10px] sm:text-[11px] text-text-muted uppercase tracking-widest font-semibold">Casos reais resolvidos</p>
                </motion.div>

                <motion.h2
                    className="text-base sm:text-xl font-bold text-text-primary text-center mb-2 leading-snug max-w-md mx-auto"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    Veja quem já passou por situações parecidas com a sua
                </motion.h2>

                <motion.p
                    className="text-text-secondary text-xs sm:text-sm text-center mb-4 sm:mb-6 max-w-sm mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                >
                    Mais de 3.200 casos resolvidos com sigilo total
                </motion.p>

                {/* Testimonial cards — filtered */}
                <motion.div
                    className="space-y-2.5 sm:space-y-3 max-w-md mx-auto"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {filtered.map((t, i) => (
                        <motion.div
                            key={`${t.initials}-${i}`}
                            className="bg-surface-card border border-border-subtle rounded-xl p-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.08 }}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: t.estrelas }).map((_, j) => (
                                        <Star key={j} className="w-3.5 h-3.5 text-accent-amber fill-accent-amber" />
                                    ))}
                                    {t.estrelas < 5 && Array.from({ length: 5 - t.estrelas }).map((_, j) => (
                                        <Star key={`e-${j}`} className="w-3.5 h-3.5 text-text-muted/30" />
                                    ))}
                                </div>
                                <span className="text-[10px] text-brand font-semibold uppercase tracking-wider">{t.tipoCaso}</span>
                            </div>
                            {t.destaque && (
                                <div className="inline-flex items-center gap-1.5 bg-accent-emerald/10 border border-accent-emerald/20 rounded-full px-2.5 py-1 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald flex-shrink-0" />
                                    <span className="text-[11px] text-accent-emerald font-semibold">{t.destaque}</span>
                                </div>
                            )}
                            <p className="text-text-primary/80 text-[13px] leading-relaxed mb-3">
                                "{t.texto}"
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full border border-border-subtle flex-shrink-0 bg-surface-elevated flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-text-muted select-none">{t.initials}</span>
                                </div>
                                <div>
                                    <p className="text-text-primary/60 text-[12px] font-semibold">Cliente verificado</p>
                                    <p className="text-text-muted text-[11px]">{t.cidade}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA to continue */}
                <motion.button
                    onClick={() => goTo(S.INVESTIMENTO)}
                    className="w-full max-w-md mx-auto flex items-center justify-center gap-3 bg-brand hover:bg-brand-hover text-text-primary font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-blue-900/20 transition-all duration-200 hover:scale-[1.015] active:scale-[0.98] mt-6"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    CONTINUAR DIAGNÓSTICO
                    <ArrowRight className="w-5 h-5" />
                </motion.button>
            </motion.div>
        );
    };

    /* ---------- P6: INVESTIMENTO ---------- */
    const renderInvestimento = () => (
        <QScreen
            key="s6"
            dir={dir}
            step={6}
            title="Como você pretende lidar com essa situação?"
            subtitle="Investigações técnicas exigem dedicação, ferramentas especializadas e sigilo absoluto. Nosso time avalia cada caso individualmente."
        >
            <div className="flex flex-col gap-2.5">
                {INVESTIMENTOS.map((item, i) => {
                    const key = `inv_${i}`;
                    return (
                        <OptionCard
                            key={key}
                            i={i}
                            selected={selectedOption === key}
                            onClick={() => selectOption(key, "investimento", item.label, S.COLETA)}
                        >
                            <span className="text-[15px] text-text-primary/90 font-medium">{item.label}</span>
                        </OptionCard>
                    );
                })}
            </div>
        </QScreen>
    );

    /* ---------- COLETA (Lead capture) ---------- */
    const renderColeta = () => (
        <motion.div
            key="coleta"
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="px-5 sm:px-6 pt-[86px] sm:pt-[106px] pb-8 sm:pb-10"
        >
            <motion.div
                className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center mx-auto mb-4 sm:mb-5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
            >
                <Send className="w-7 h-7 text-brand" />
            </motion.div>

            <motion.h2
                className="text-base sm:text-xl font-bold text-text-primary text-center mb-2 leading-snug max-w-md mx-auto"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
            >
                Seu diagnóstico está pronto. Para quem devemos enviar?
            </motion.h2>

            <motion.p
                className="text-text-secondary text-xs sm:text-sm text-center mb-6 sm:mb-8 max-w-sm mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
            >
                Nosso time vai analisar pessoalmente o seu caso e entrar em contato em até 2 horas.
            </motion.p>

            <motion.form
                onSubmit={(e) => { e.preventDefault(); if (canSubmitLead) goTo(S.LOADING); }}
                className="flex flex-col gap-4 max-w-sm mx-auto"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
            >
                {/* Nome */}
                <div>
                    <label className="block text-[12px] text-text-muted uppercase tracking-wider font-semibold mb-1.5 ml-1">
                        Seu nome
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={leadData.nome}
                            onChange={(e) => setLeadData((p) => ({ ...p, nome: e.target.value }))}
                            placeholder="Como podemos te chamar?"
                            className="w-full bg-surface-card border border-border-muted focus:border-brand/50 rounded-xl px-4 py-3.5 text-text-primary text-[15px] placeholder:text-text-muted outline-none transition-colors"
                        />
                        {leadData.nome.trim().length >= 2 && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-3 top-1/2 -translate-y-1/2">
                                <CheckCircle2 className="w-5 h-5 text-accent-emerald" />
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-[12px] text-text-muted uppercase tracking-wider font-semibold mb-1.5 ml-1">
                        Seu e-mail <span className="normal-case tracking-normal font-normal text-text-muted/60">(opcional)</span>
                    </label>
                    <div className="relative">
                        <input
                            type="email"
                            value={leadData.email}
                            onChange={(e) => setLeadData((p) => ({ ...p, email: e.target.value }))}
                            placeholder="seu@email.com"
                            className="w-full bg-surface-card border border-border-muted focus:border-brand/50 rounded-xl px-4 py-3.5 text-text-primary text-[15px] placeholder:text-text-muted outline-none transition-colors"
                        />
                        {emailIsValid && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-3 top-1/2 -translate-y-1/2">
                                <CheckCircle2 className="w-5 h-5 text-accent-emerald" />
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* WhatsApp */}
                <div>
                    <label className="block text-[12px] text-text-muted uppercase tracking-wider font-semibold mb-1.5 ml-1">
                        Seu WhatsApp
                    </label>
                    <div className="relative">
                        <Suspense fallback={<input placeholder="(11) 99999-0000" className="w-full bg-surface-card border border-border-muted rounded-xl px-4 py-3.5 text-text-primary text-[15px] placeholder:text-text-muted outline-none" />}>
                            <LazyIMaskInput
                                mask="(00) 00000-0000"
                                value={leadData.whatsapp}
                                onAccept={(value: string) => setLeadData((p) => ({ ...p, whatsapp: value }))}
                                placeholder="(11) 99999-0000"
                                className="w-full bg-surface-card border border-border-muted focus:border-brand/50 rounded-xl px-4 py-3.5 text-text-primary text-[15px] placeholder:text-text-muted outline-none transition-colors"
                            />
                        </Suspense>
                        {phoneIsValid && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-3 top-1/2 -translate-y-1/2">
                                <CheckCircle2 className="w-5 h-5 text-accent-emerald" />
                            </motion.div>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!canSubmitLead}
                    className={`w-full flex items-center justify-center gap-3 font-bold text-base px-8 py-4 rounded-xl shadow-lg transition-all duration-200 mt-2 ${canSubmitLead
                        ? "bg-brand hover:bg-brand-hover text-text-primary shadow-blue-900/20 hover:shadow-blue-800/40 hover:scale-[1.015] active:scale-[0.98] cursor-pointer"
                        : "bg-surface-card text-text-muted cursor-not-allowed shadow-none"
                        }`}
                >
                    VER MEU DIAGNÓSTICO
                    <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-[11px] text-text-muted text-center mt-1 flex items-center justify-center gap-1.5">
                    <Lock className="w-3 h-3" />
                    Seus dados estão protegidos e não serão compartilhados.
                </p>
            </motion.form>
        </motion.div>
    );

    /* ---------- LOADING ---------- */
    const renderLoading = () => (
        <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center px-6 min-h-[60vh]"
        >
            <div className="relative mb-10">
                <Loader2 className="w-14 h-14 text-brand animate-spin" />
                <div className="absolute inset-0 w-14 h-14 rounded-full bg-brand/10 animate-ping" />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={loadIdx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-3"
                >
                    {(() => {
                        const IconComp = LOADING_MESSAGES[loadIdx].icon;
                        return <IconComp className="w-5 h-5 text-brand" />;
                    })()}
                    <p className="text-text-secondary text-base sm:text-lg font-medium">
                        {LOADING_MESSAGES[loadIdx].text}
                    </p>
                </motion.div>
            </AnimatePresence>

            <div className="flex gap-1.5 mt-8">
                {LOADING_MESSAGES.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-500 ${i <= loadIdx ? "bg-brand w-6" : "bg-white/10 w-1.5"}`}
                    />
                ))}
            </div>

            <motion.p
                className="text-text-muted text-xs mt-6"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                Analisando suas {TOTAL_QUESTIONS} respostas...
            </motion.p>
        </motion.div>
    );

    /* ---------- RESULTADO ---------- */
    const renderResultado = () => {
        if (tier === "hot") return <ResultHot onCTA={openWhatsApp} nome={leadData.nome} />;
        if (tier === "warm") return <ResultWarm onCTA={openWhatsApp} nome={leadData.nome} />;
        return <ResultCold nome={leadData.nome} />;
    };

    /* ---------------------------------------------------------------- */
    /*  Main Render                                                      */
    /* ---------------------------------------------------------------- */

    return (
        <div className="min-h-screen bg-surface relative overflow-hidden selection:bg-blue-500/30">
            {/* Ambient background */}
            <div className="pointer-events-none fixed inset-0" style={{ contain: 'strict' }}>
                <div className="absolute top-[-20vh] left-1/2 -translate-x-1/2 w-[60vw] max-w-[500px] aspect-square bg-brand-glow rounded-full blur-3xl sm:blur-[120px] opacity-40 sm:opacity-60" />
                <div className="hidden sm:block absolute bottom-[-10vh] right-[-5vw] w-[50vw] max-w-[400px] aspect-square bg-blue-600/[0.04] rounded-full blur-[100px]" />
            </div>

            {/* Top Bar marquee */}
            <div className="fixed top-0 left-0 right-0 z-[60] h-8 sm:h-9 bg-brand overflow-hidden flex items-center safe-top">
                <div className="flex whitespace-nowrap animate-marquee">
                    {[
                        "INVESTIGAÇÃO", "INTELIGÊNCIA", "HACKING ÉTICO", "FORENSE",
                        "CYBERCRIME", "FRAUDE", "DILIGENCE", "SIGILO",
                        "INVESTIGAÇÃO", "INTELIGÊNCIA", "HACKING ÉTICO", "FORENSE",
                        "CYBERCRIME", "FRAUDE", "DILIGENCE", "SIGILO",
                    ].map((word, i) => (
                        <span
                            key={i}
                            className="inline-flex items-center gap-2.5 text-text-primary font-semibold text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mx-4 sm:mx-5"
                        >
                            <span className="w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                            {word}
                        </span>
                    ))}
                </div>
            </div>

            {/* Progress bar */}
            {step > S.COVER && step < S.LOADING && (
                <div className="fixed top-8 sm:top-9 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-border-subtle" style={{ height: '48px' }}>
                    <div className="h-full flex items-center gap-2.5 sm:gap-3 max-w-xl mx-auto px-3 sm:px-4">
                        {step <= S.COLETA && (
                            <button
                                onClick={goBack}
                                className="p-2 -ml-2 rounded-full hover:bg-white/5 text-text-muted hover:text-text-primary transition-colors"
                                aria-label="Voltar"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        )}
                        <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-brand rounded-full"
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            />
                        </div>
                        <span className="text-[11px] text-text-muted font-semibold tabular-nums w-8 text-right">
                            {progress}%
                        </span>
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 max-w-xl mx-auto min-h-screen flex flex-col justify-center">
                <AnimatePresence mode="wait" custom={dir}>
                    {step === S.COVER && renderCover()}
                    {step === S.SITUACAO && renderSituacao()}
                    {step === S.TEMPO && renderTempo()}
                    {step === S.PREJUIZO && renderPrejuizo()}
                    {step === S.PROVIDENCIA && renderProvidencia()}
                    {step === S.URGENCIA && renderUrgencia()}
                    {step === S.DEPOIMENTOS && renderDepoimentos()}
                    {step === S.INVESTIMENTO && renderInvestimento()}
                    {step === S.COLETA && renderColeta()}
                    {step === S.LOADING && renderLoading()}
                    {step === S.RESULTADO && renderResultado()}
                </AnimatePresence>
            </div>
        </div>
    );
}
