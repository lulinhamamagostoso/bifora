import { motion } from "framer-motion";
import {
    CheckCircle2,
    BadgeCheck,
    Timer,
    Trophy,
    MessageCircle,
    Search,
    BookOpen,
    Download,
} from "lucide-react";
import { PHONE_TRIAGE } from "../quizData";
import { trackCTAClick } from "../tracking";

/* ---------- Result: HOT ---------- */
export function ResultHot({ onCTA, nome }: { onCTA: () => void; nome: string }) {
    const firstName = nome ? nome.split(" ")[0] : "";

    return (
        <motion.div
            key="hot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center text-center px-5 sm:px-6 py-8 sm:py-10 min-h-[70vh] justify-center"
        >
            <motion.div
                className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-accent-emerald/10 border border-accent-emerald/20 flex items-center justify-center mb-4 sm:mb-5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.15, stiffness: 200 }}
            >
                <CheckCircle2 className="w-7 sm:w-8 h-7 sm:h-8 text-accent-emerald" />
            </motion.div>

            <motion.h2
                className="text-lg sm:text-2xl font-black text-text-primary mb-2 max-w-sm"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                {firstName ? `${firstName}, identificamos` : "Identificamos"} um protocolo compatível com o seu caso.
            </motion.h2>

            <motion.p
                className="text-text-secondary text-sm mb-6 max-w-sm leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
            >
                Com base nas suas respostas, casos como o seu têm <span className="text-accent-emerald font-semibold">94% de taxa de resolução</span>. Um perito sênior já foi pré-designado para a sua análise inicial — sem custos.
            </motion.p>

            <motion.div
                className="flex flex-col gap-2.5 w-full max-w-sm mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
            >
                {[
                    { icon: BadgeCheck, text: "Protocolo de investigação compatível identificado", color: "text-accent-emerald" },
                    { icon: Timer, text: "Prazo estimado: 3 a 12 dias úteis para conclusão", color: "text-brand" },
                    { icon: Trophy, text: "Perito sênior disponível para iniciar imediatamente", color: "text-accent-amber" },
                ].map((b) => (
                    <div
                        key={b.text}
                        className="flex items-center gap-3 bg-surface-card border border-border-subtle rounded-xl px-4 py-3"
                    >
                        <b.icon className={`w-4 h-4 flex-shrink-0 ${b.color}`} />
                        <span className="text-text-primary/70 text-[13px] text-left">{b.text}</span>
                    </div>
                ))}
            </motion.div>

            {/* Urgency */}
            <motion.div
                className="w-full max-w-sm flex items-center gap-3 bg-accent-amber/5 border border-accent-amber/15 rounded-xl px-4 py-3 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 }}
            >
                <div className="w-2 h-2 rounded-full bg-accent-amber animate-pulse flex-shrink-0" />
                <span className="text-text-secondary text-[13px] text-left">
                    Perito designado disponível <span className="text-accent-amber font-semibold">nas próximas 2h</span> — responda para garantir atendimento prioritário.
                </span>
            </motion.div>

            <motion.button
                onClick={onCTA}
                className="w-full max-w-sm flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebd5a] text-text-primary font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-emerald-600/15 transition-all duration-200 hover:scale-[1.015] active:scale-[0.98] relative overflow-hidden"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
            >
                <span className="absolute inset-0 rounded-xl bg-emerald-400/10 animate-ping pointer-events-none" style={{ animationDuration: "2.5s" }} />
                <MessageCircle className="w-5 h-5 relative z-10" />
                <span className="relative z-10">FALAR COM PERITO AGORA</span>
            </motion.button>

            <motion.p
                className="text-[11px] text-text-muted mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
            >
                Consulta inicial sigilosa &middot; Sem compromisso
            </motion.p>
        </motion.div>
    );
}

/* ---------- Result: WARM ---------- */
export function ResultWarm({ onCTA, nome }: { onCTA: () => void; nome: string }) {
    const firstName = nome ? nome.split(" ")[0] : "";

    return (
        <motion.div
            key="warm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center text-center px-5 sm:px-6 py-8 sm:py-10 min-h-[70vh] justify-center"
        >
            <motion.div
                className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-4 sm:mb-5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.15, stiffness: 200 }}
            >
                <Search className="w-7 sm:w-8 h-7 sm:h-8 text-brand" />
            </motion.div>

            <motion.h2
                className="text-lg sm:text-2xl font-black text-text-primary mb-2 max-w-sm"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                {firstName ? `${firstName}, seu` : "Seu"} caso precisa de uma avaliação mais detalhada.
            </motion.h2>

            <motion.p
                className="text-text-secondary text-sm mb-6 max-w-sm leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
            >
                Identificamos que o seu perfil se beneficia de uma conversa rápida com nosso time de triagem para definir a melhor estratégia. Sem custo e sem compromisso.
            </motion.p>

            <motion.div
                className="flex flex-col gap-2 w-full max-w-sm mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                {[
                    "Conversa rápida de 5 min com especialista",
                    "Orientação personalizada para o seu caso",
                    "Sem custo e sem compromisso",
                ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3 bg-surface-card border border-border-subtle rounded-xl px-4 py-3">
                        <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0" />
                        <span className="text-text-primary/70 text-[13px] text-left">{text}</span>
                    </div>
                ))}
            </motion.div>

            {/* Urgency */}
            <motion.div
                className="w-full max-w-sm flex items-center gap-3 bg-brand/5 border border-brand/15 rounded-xl px-4 py-3 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
            >
                <div className="w-2 h-2 rounded-full bg-brand animate-pulse flex-shrink-0" />
                <span className="text-text-secondary text-[13px] text-left">
                    Atendimento imediato disponível — <span className="text-brand font-semibold">tempo médio de resposta: 3 min</span>
                </span>
            </motion.div>

            <motion.button
                onClick={onCTA}
                className="w-full max-w-sm flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebd5a] text-text-primary font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-emerald-600/15 transition-all duration-200 hover:scale-[1.015] active:scale-[0.98]"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <MessageCircle className="w-5 h-5" />
                FALAR COM ESPECIALISTA
            </motion.button>

            <motion.p
                className="text-[11px] text-text-muted mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                Atendimento gratuito &middot; Sem compromisso
            </motion.p>
        </motion.div>
    );
}

/* ---------- Result: COLD ---------- */
export function ResultCold({ nome }: { nome: string }) {
    const firstName = nome ? nome.split(" ")[0] : "";

    return (
        <motion.div
            key="cold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center text-center px-5 sm:px-6 py-8 sm:py-10 min-h-[70vh] justify-center"
        >
            <motion.div
                className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-text-muted/10 border border-text-muted/20 flex items-center justify-center mb-4 sm:mb-5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.15, stiffness: 200 }}
            >
                <BookOpen className="w-7 sm:w-8 h-7 sm:h-8 text-text-secondary" />
            </motion.div>

            <motion.h2
                className="text-lg sm:text-2xl font-black text-text-primary mb-2 max-w-sm"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                {firstName ? `${firstName}, preparamos` : "Preparamos"} um material especial para o seu perfil.
            </motion.h2>

            <motion.p
                className="text-text-secondary text-sm mb-8 max-w-sm leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
            >
                Neste momento, o caminho mais indicado é se proteger. Reunimos um guia com os passos que você pode tomar agora — mesmo sem contratar ninguém.
            </motion.p>

            <motion.a
                href={`https://wa.me/${PHONE_TRIAGE}?text=${encodeURIComponent(`Olá! Sou ${nome || "Cliente"}. Fiz o diagnóstico no site e gostaria de receber o guia gratuito sobre preservação de evidências digitais.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick("cold", "whatsapp_guide")}
                className="w-full max-w-sm flex items-center justify-center gap-3 bg-surface-card hover:bg-white/[0.08] border border-border-muted text-text-primary font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 hover:scale-[1.015] active:scale-[0.98]"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <Download className="w-5 h-5" />
                RECEBER GUIA GRATUITO
            </motion.a>

            {/* Secondary WhatsApp CTA */}
            <motion.div
                className="w-full max-w-sm flex flex-col items-center gap-3 mt-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75 }}
            >
                <div className="flex items-center gap-3 w-full">
                    <div className="flex-1 h-px bg-border-subtle" />
                    <span className="text-[11px] text-text-muted uppercase tracking-wider font-medium">ou</span>
                    <div className="flex-1 h-px bg-border-subtle" />
                </div>
                <a
                    href={`https://wa.me/${PHONE_TRIAGE}?text=${encodeURIComponent(`Olá! Sou ${nome || "Cliente"}. Fiz o diagnóstico no site e gostaria de falar com um especialista sobre o meu caso.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCTAClick("cold", "whatsapp")}
                    className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebd5a] text-text-primary font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-600/15 transition-all duration-200 hover:scale-[1.015] active:scale-[0.98]"
                >
                    <MessageCircle className="w-4 h-4" />
                    FALAR COM ESPECIALISTA AGORA
                </a>
                <p className="text-[11px] text-text-muted">Consulta gratuita &middot; Sem compromisso</p>
            </motion.div>
        </motion.div>
    );
}
