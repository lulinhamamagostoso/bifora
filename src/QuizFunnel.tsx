import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { IMaskInput } from "react-imask";
import {
    ArrowLeft,
    ArrowRight,
    Search,
    User,
    Briefcase,
    Smartphone,
    Scale,
    Lock,
    ShieldCheck,
    Clock,
    FileText,
    MessageCircle,
    CheckCircle2,
    Loader2,
    Trophy,
    BadgeCheck,
    Timer,
    AlertTriangle,
    BookOpen,
    CircleDot,
    Download,
    Send,
    Zap,
    Star,
    Users,
    Shield,
    Sparkles,
    Quote,
    Flame,
    Info,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type QuizAnswers = {
    situacao: string;
    tempo: string;
    prejuizo: string;
    providencia: string;
    urgencia: string;
    investimento: string;
};

type LeadData = {
    nome: string;
    whatsapp: string;
};

type LeadTier = "hot" | "warm" | "cold";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const PHONE_MAIN = "551131641004";
const PHONE_TRIAGE = "551153042041";

/* Step indexes */
const S = {
    COVER: 0,
    SITUACAO: 1,
    TEMPO: 2,
    PREJUIZO: 3,
    PROVIDENCIA: 4,
    URGENCIA: 5,
    DEPOIMENTOS: 6,
    INVESTIMENTO: 7,
    COLETA: 8,
    LOADING: 9,
    RESULTADO: 10,
} as const;

const TOTAL_QUESTIONS = 6;

/* ---- Question Data ---- */

const SITUACOES = [
    { label: "Fui vítima de golpe financeiro (PIX, fraude bancária, estelionato)", icon: AlertTriangle, score: 3 },
    { label: "Preciso localizar uma pessoa ou rastrear bens", icon: Search, score: 3 },
    { label: "Suspeito de fraude dentro da minha empresa", icon: Briefcase, score: 3 },
    { label: "Preciso reunir provas para um processo judicial", icon: Scale, score: 3 },
    { label: "Sofri um crime digital (invasão, vazamento, extorsão)", icon: Smartphone, score: 3 },
    { label: "Desconfio de traição, quero investigar meu parceiro(a)", icon: Lock, score: 2 },
] as const;

const TEMPOS = [
    { label: "Está acontecendo agora / ou aconteceu hoje", score: 4 },
    { label: "Aconteceu nos últimos dias", score: 3 },
    { label: "Faz algumas semanas", score: 2 },
    { label: "Já tem alguns meses", score: 1 },
] as const;

const PREJUIZOS = [
    { label: "Menos de R$ 5 mil", score: 1 },
    { label: "Entre R$ 5 mil e R$ 10 mil", score: 3 },
    { label: "Entre R$ 10 mil e R$ 50 mil", score: 4 },
    { label: "Entre R$ 50 mil e R$ 100 mil", score: 5 },
    { label: "Entre R$ 100 mil e R$ 500 mil", score: 6 },
    { label: "Acima de R$ 500 mil", score: 10 },
    { label: "Prejuízo emocional", score: 2 },
    { label: "Prejuízo reputacional", score: 2 },
] as const;

const PROVIDENCIAS = [
    { label: "Sim, fiz B.O. e/ou procurei advogado/profissional", icon: FileText, score: 4 },
    { label: "Tentei resolver mas não tive resultado", icon: CircleDot, score: 3 },
    { label: "Ainda não fiz nada, não sei por onde começar", icon: BookOpen, score: 2 },
] as const;

const URGENCIAS = [
    { label: "É urgente e preciso de ação imediata", icon: Flame, score: 4 },
    { label: "Quero orientação nos próximos dias", icon: Clock, score: 2 },
    { label: "Quero apenas me informar por enquanto", icon: Info, score: 1 },
] as const;

const INVESTIMENTOS = [
    { label: "Sim, quero resolver de vez", score: 5 },
    { label: "Depende, quero entender o que está incluso", score: 3 },
    { label: "No momento não tenho esse valor", score: 0 },
] as const;

const TESTIMONIALS = [
    {
        cidade: "São Paulo, SP",
        avatar: "https://i.pravatar.cc/80?img=12",
        texto: "Paguei R$ 5 mil de sinal e depois mais R$ 755 mil por uma BMW X6 que nunca recebi. Era uma quadrilha especializada em fraude veicular. A Bforense não só investigou e identificou todos os envolvidos da organização criminosa, como rastreou os responsáveis e conseguiu o congelamento judicial das contas. Recuperei um valor que eu já considerava perdido. Profissionalismo absurdo.",
        estrelas: 5,
    },
    {
        cidade: "Curitiba, PR",
        avatar: "https://i.pravatar.cc/80?img=32",
        texto: "Caí num golpe do PIX de R$ 23 mil. A polícia disse que não tinha o que fazer. A Bforense rastreou a conta destino, identificou o golpista e montou o dossiê completo. Em 12 dias meu advogado já tinha tudo pra entrar na justiça. Estou em processo de recuperação do valor.",
        estrelas: 5,
    },
    {
        cidade: "Rio de Janeiro, RJ",
        avatar: "https://i.pravatar.cc/80?img=53",
        texto: "Minha empresa estava sangrando dinheiro e eu não entendia por quê. A investigação revelou que um gerente desviava valores há 2 anos usando notas frias. Montaram o dossiê com todas as provas, datas e valores. Demiti com justa causa e entrei na justiça.",
        estrelas: 5,
    },
    {
        cidade: "Belo Horizonte, MG",
        avatar: "https://i.pravatar.cc/80?img=25",
        texto: "Desconfiava do meu sócio há meses. A Bforense confirmou que ele estava desviando clientes e usando a estrutura da empresa pra benefício próprio. As provas foram tão sólidas que resolvemos tudo extrajudicialmente em 3 semanas.",
        estrelas: 5,
    },
    {
        cidade: "Florianópolis, SC",
        avatar: "https://i.pravatar.cc/80?img=59",
        texto: "Tive meu Instagram hackeado e o criminoso estava extorquindo meus contatos. A Bforense rastreou o IP, identificou o invasor e elaborou o laudo técnico. O delegado elogiou a qualidade do material. Caso resolvido em 10 dias.",
        estrelas: 5,
    },
    {
        cidade: "Brasília, DF",
        avatar: "https://i.pravatar.cc/80?img=44",
        texto: "Precisava de provas digitais para um processo de guarda. A equipe coletou e preservou todas as evidências seguindo os protocolos legais. Meu advogado disse que foi o laudo mais completo que ele já trabalhou.",
        estrelas: 5,
    },
    {
        cidade: "Campinas, SP",
        avatar: "https://i.pravatar.cc/80?img=14",
        texto: "Perdi R$ 48 mil num esquema de investimento falso. Achei que nunca ia ver esse dinheiro de novo. A Bforense identificou as contas dos golpistas, montou toda a cadeia de transações e o juiz deferiu o bloqueio. Já recuperei 70% do valor.",
        estrelas: 5,
    },
    {
        cidade: "Porto Alegre, RS",
        avatar: "https://i.pravatar.cc/80?img=38",
        texto: "Recebi ameaças anônimas por WhatsApp durante semanas. A investigação identificou quem estava por trás em menos de uma semana. O sigilo foi total do início ao fim. Me senti segura o tempo todo.",
        estrelas: 5,
    },
];

const LOADING_MESSAGES = [
    { text: "Analisando viabilidade do caso...", icon: Search },
    { text: "Cruzando com base de protocolos...", icon: Shield },
    { text: "Verificando disponibilidade de especialistas...", icon: Users },
    { text: "Finalizando diagnóstico...", icon: Sparkles },
];

const STEP_BADGES: Record<number, { text: string; icon: typeof Lock }> = {
    1: { text: "100% sigiloso", icon: Lock },
    2: { text: "Avaliação rápida", icon: Zap },
    3: { text: "Sem compromisso", icon: ShieldCheck },
    4: { text: "Quase lá!", icon: Star },
    5: { text: "Prioridade", icon: Flame },
    6: { text: "Última pergunta", icon: CheckCircle2 },
};

/* ------------------------------------------------------------------ */
/*  Scoring                                                            */
/* ------------------------------------------------------------------ */

function calcTier(answers: QuizAnswers): LeadTier {
    const scoreMap: Record<string, number> = {};

    for (const s of SITUACOES) scoreMap[s.label] = s.score;
    for (const t of TEMPOS) scoreMap[t.label] = t.score;
    for (const p of PREJUIZOS) scoreMap[p.label] = p.score;
    for (const p of PROVIDENCIAS) scoreMap[p.label] = p.score;
    for (const u of URGENCIAS) scoreMap[u.label] = u.score;
    for (const i of INVESTIMENTOS) scoreMap[i.label] = i.score;

    const total =
        (scoreMap[answers.situacao] ?? 0) +
        (scoreMap[answers.tempo] ?? 0) +
        (scoreMap[answers.prejuizo] ?? 0) +
        (scoreMap[answers.providencia] ?? 0) +
        (scoreMap[answers.urgencia] ?? 0) +
        (scoreMap[answers.investimento] ?? 0);

    if (answers.investimento === "No momento não tenho esse valor") return "cold";
    if (total >= 16) return "hot";
    if (total >= 10) return "warm";
    return "cold";
}

/* ------------------------------------------------------------------ */
/*  Animations                                                         */
/* ------------------------------------------------------------------ */

const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

const staggerChild = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.06, duration: 0.3, ease: [0, 0, 0.58, 1] as const },
    }),
};

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
    const [leadData, setLeadData] = useState<LeadData>({ nome: "", whatsapp: "" });
    const [loadIdx, setLoadIdx] = useState<number>(0);
    const [tier, setTier] = useState<LeadTier>("warm");
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    /* Navigation */
    const goTo = useCallback(
        (target: number) => {
            setDir(target > step ? 1 : -1);
            setStep(target);
            setSelectedOption(null);
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

    /* Loading auto-advance */
    useEffect(() => {
        if (step !== S.LOADING) return;
        setLoadIdx(0);
        setTier(calcTier(answers));

        const iv = setInterval(() => {
            setLoadIdx((prev) => {
                if (prev >= LOADING_MESSAGES.length - 1) {
                    clearInterval(iv);
                    setTimeout(() => goTo(S.RESULTADO), 700);
                    return prev;
                }
                return prev + 1;
            });
        }, 900);
        return () => clearInterval(iv);
    }, [step, goTo, answers]);

    /* WhatsApp */
    const phone = tier === "hot" ? PHONE_MAIN : PHONE_TRIAGE;

    const openWhatsApp = () => {
        const nome = leadData.nome || "Cliente";
        const tierLabel = tier === "hot" ? "alta viabilidade" : "análise necessária";
        const msg = `Olá! Sou ${nome}. Fiz o diagnóstico no site e meu caso foi classificado como ${tierLabel}.

📋 *Resumo do caso:*
• Situação: ${answers.situacao}
• Tempo: ${answers.tempo}
• Prejuízo: ${answers.prejuizo}
• Providências: ${answers.providencia}
• Urgência: ${answers.urgencia}
• Investimento: ${answers.investimento}

Aguardo orientação para iniciar.`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
    };

    /* Progress — count questions only (not depoimentos) */
    const getQuestionNum = () => {
        if (step <= S.COVER) return 0;
        if (step <= S.URGENCIA) return step; // steps 1-5 are questions
        if (step === S.DEPOIMENTOS) return TOTAL_QUESTIONS; // testimonials = after all questions
        if (step >= S.INVESTIMENTO) return TOTAL_QUESTIONS;
        return TOTAL_QUESTIONS;
    };
    const questionStep = getQuestionNum();
    const progress =
        step <= S.COVER
            ? 0
            : step >= S.LOADING
                ? 100
                : Math.round((questionStep / TOTAL_QUESTIONS) * 100);

    /* WhatsApp phone - clean digits only */
    const cleanPhone = leadData.whatsapp.replace(/\D/g, "");
    const phoneIsValid = cleanPhone.length >= 10 && cleanPhone.length <= 11;
    const canSubmitLead = leadData.nome.trim().length >= 2 && phoneIsValid;

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
            className="flex flex-col items-center justify-center text-center px-5 pt-20 pb-10 min-h-[80vh]"
        >
            <motion.img
                src="/logowhiteB.png"
                alt="Bforense"
                className="h-10 sm:h-12 mb-10 opacity-90"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 0.9, y: 0 }}
                transition={{ duration: 0.5 }}
            />

            {/* Social proof — editorial stats */}
            <motion.div
                className="flex items-center justify-center gap-6 sm:gap-8 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="text-center">
                    <p className="text-white font-black text-xl sm:text-2xl leading-none">3.200+</p>
                    <p className="text-gray-500 text-[10px] sm:text-[11px] uppercase tracking-widest mt-1">casos</p>
                </div>
                <div className="w-px h-8 bg-white/[0.08]" />
                <div className="text-center">
                    <p className="text-white font-black text-xl sm:text-2xl leading-none">4.9</p>
                    <p className="text-gray-500 text-[10px] sm:text-[11px] uppercase tracking-widest mt-1">avaliação</p>
                </div>
                <div className="w-px h-8 bg-white/[0.08]" />
                <div className="text-center">
                    <p className="text-white font-black text-xl sm:text-2xl leading-none">94%</p>
                    <p className="text-gray-500 text-[10px] sm:text-[11px] uppercase tracking-widest mt-1">sucesso</p>
                </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
                className="text-[2rem] sm:text-4xl md:text-[2.75rem] font-black text-white leading-[1.15] mb-4 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                Seu caso tem solução{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0030fd] to-blue-400">
                    Descubra em 60 segundos
                </span>
            </motion.h1>

            <motion.p
                className="text-gray-400 text-base sm:text-lg max-w-md mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
            >
                Diagnóstico gratuito e 100% sigiloso feito por especialistas em investigação e inteligência forense.
            </motion.p>

            {/* Hero image — operations center */}
            <motion.div
                className="relative w-full max-w-md mb-10 rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                {/* Subtle blue glow behind image */}
                <div className="absolute -inset-1 bg-gradient-to-br from-[#0030fd]/20 via-transparent to-blue-500/10 rounded-2xl blur-xl pointer-events-none" />
                <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-blue-900/20">
                    <img
                        src="/cover-team.png"
                        alt="Centro de operações Bforense"
                        className="w-full h-auto object-cover"
                        loading="eager"
                    />
                    {/* Bottom gradient fade */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0e1a] to-transparent pointer-events-none" />
                </div>
            </motion.div>

            {/* CTA — pulsating */}
            <motion.button
                onClick={() => goTo(S.SITUACAO)}
                className="group relative inline-flex items-center gap-3 bg-[#0030fd] hover:bg-[#0026cc] text-white font-bold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-xl shadow-lg shadow-blue-700/20 transition-all duration-200 hover:shadow-blue-700/40 hover:scale-[1.02] active:scale-[0.98]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-xl bg-[#0030fd]/20 animate-ping pointer-events-none" style={{ animationDuration: "2s" }} />
                <span className="relative flex items-center gap-3">
                    INICIAR DIAGNÓSTICO GRATUITO
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
            </motion.button>

            {/* Trust row */}
            <motion.div
                className="flex flex-wrap items-center justify-center gap-5 mt-10 text-[11px] sm:text-xs text-gray-500 uppercase tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <span className="flex items-center gap-1.5">
                    <Lock className="w-3 h-3" /> Dados protegidos
                </span>
                <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" /> Menos de 1 min
                </span>
                <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3" /> Sem compromisso
                </span>
            </motion.div>

            {/* Online now indicator */}
            <motion.div
                className="mt-6 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-[12px] text-gray-500">
                    <span className="text-emerald-400 font-semibold">3 especialistas</span> online agora
                </span>
            </motion.div>
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
                            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/[0.05] group-hover:bg-[#0030fd]/10 flex items-center justify-center transition-colors">
                                <Icon className="w-[18px] h-[18px] text-gray-500 group-hover:text-blue-400 transition-colors" />
                            </div>
                            <span className="text-[14px] sm:text-[15px] text-white/90 font-medium leading-snug">{item.label}</span>
                        </OptionCard>
                    );
                })}
            </div>
        </QScreen>
    );

    /* ---------- P2: TEMPO ---------- */
    const renderTempo = () => (
        <QScreen key="s2" dir={dir} step={2} title="Há quanto tempo essa situação está acontecendo?" subtitle="Isso nos ajuda a avaliar a urgência do caso">
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
                            <span className={`w-3 h-3 rounded-full flex-shrink-0 ${i === 0 ? "bg-[#0030fd]" : i === 1 ? "bg-amber-400" : i === 2 ? "bg-blue-400" : "bg-gray-500"
                                }`} />
                            <span className="text-[15px] text-white/90 font-medium">{item.label}</span>
                        </OptionCard>
                    );
                })}
            </div>
        </QScreen>
    );

    /* ---------- P3: PREJUÍZO ---------- */
    const renderPrejuizo = () => (
        <QScreen key="s3" dir={dir} step={3} title="Qual o prejuízo estimado que essa situação já te causou?" subtitle="Pode ser financeiro, emocional ou reputacional">
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
                            <span className="text-[15px] text-white/90 font-medium">{item.label}</span>
                        </OptionCard>
                    );
                })}
            </div>
        </QScreen>
    );

    /* ---------- P4: PROVIDÊNCIA ---------- */
    const renderProvidencia = () => (
        <QScreen key="s4" dir={dir} step={4} title="Você já tomou alguma providência sobre isso?" subtitle="Entender o que já foi feito nos ajuda a montar a melhor estratégia">
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
                            <Icon className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                            <span className="text-[15px] text-white/90 font-medium">{item.label}</span>
                        </OptionCard>
                    );
                })}
            </div>
        </QScreen>
    );

    /* ---------- P5: URGÊNCIA ---------- */
    const renderUrgencia = () => (
        <QScreen key="s5" dir={dir} step={5} title="Qual é o seu nível de urgência para resolver isso?" subtitle="Isso nos ajuda a avaliar a urgência do caso e quais casos dar prioridade">
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
                            <Icon className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                            <span className="text-[15px] text-white/90 font-medium">{item.label}</span>
                        </OptionCard>
                    );
                })}
            </div>
        </QScreen>
    );

    /* ---------- DEPOIMENTOS (Social Proof interlude) ---------- */
    const renderDepoimentos = () => (
        <motion.div
            key="depoimentos"
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="px-5 pt-[106px] pb-10"
        >
            <motion.div
                className="flex items-center justify-center gap-2 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <Quote className="w-5 h-5 text-amber-400" />
                <p className="text-[11px] text-gray-500 uppercase tracking-widest font-semibold">O que nossos clientes dizem</p>
            </motion.div>

            <motion.h2
                className="text-lg sm:text-xl font-bold text-white text-center mb-2 leading-snug max-w-md mx-auto"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                Veja relatos reais de quem já passou por situações parecidas
            </motion.h2>

            <motion.p
                className="text-gray-500 text-sm text-center mb-6 max-w-sm mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
            >
                Mais de 3.200 casos resolvidos com sigilo total
            </motion.p>

            {/* Testimonial cards — show 2 at a time on desktop, 1 on mobile */}
            <motion.div
                className="space-y-3 max-w-md mx-auto max-h-[45vh] overflow-y-auto pr-1 scrollbar-thin"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}
            >
                {TESTIMONIALS.map((t, i) => (
                    <motion.div
                        key={i}
                        className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.06 }}
                    >
                        <div className="flex items-center gap-1 mb-2">
                            {Array.from({ length: t.estrelas }).map((_, j) => (
                                <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            ))}
                        </div>
                        <p className="text-white/80 text-[13px] leading-relaxed mb-3">
                            "{t.texto}"
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/[0.08] flex-shrink-0">
                                <img
                                    src={t.avatar}
                                    alt=""
                                    className="w-full h-full object-cover"
                                    style={{ filter: 'blur(4px)', transform: 'scale(1.15)' }}
                                    loading="lazy"
                                />
                            </div>
                            <div>
                                <p className="text-white/60 text-[12px] font-semibold">Cliente verificado</p>
                                <p className="text-gray-600 text-[11px]">{t.cidade}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* CTA to continue */}
            <motion.button
                onClick={() => goTo(S.INVESTIMENTO)}
                className="w-full max-w-md mx-auto flex items-center justify-center gap-3 bg-[#0030fd] hover:bg-[#0026cc] text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-blue-700/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] mt-6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
            >
                CONTINUAR DIAGNÓSTICO
                <ArrowRight className="w-5 h-5" />
            </motion.button>
        </motion.div>
    );

    /* ---------- P6: INVESTIMENTO ---------- */
    const renderInvestimento = () => (
        <QScreen
            key="s6"
            dir={dir}
            step={6}
            title="Uma investigação profissional completa, que de fato consegue resultados concretos custa a partir de R$ 1.500. Isso cabe no seu momento?"
            subtitle={"Investigações técnicas especializadas exigem dedicação, ferramentas profissionais e sigilo.\nVocê está disposto(a) a investir em uma solução séria? Nosso time avalia cada caso individualmente para encontrar a melhor solução."}
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
                            <span className="text-[15px] text-white/90 font-medium">{item.label}</span>
                        </OptionCard>
                    );
                })}
            </div>
        </QScreen>
    );

    /* ---------- COLETA (Lead capture) ---------- */
    const renderColeta = () => {
        return (
            <motion.div
                key="coleta"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="px-5 pt-[106px] pb-10"
            >
                <motion.div
                    className="w-14 h-14 rounded-2xl bg-[#0030fd]/10 border border-[#0030fd]/20 flex items-center justify-center mx-auto mb-5"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    <Send className="w-7 h-7 text-blue-400" />
                </motion.div>

                <motion.h2
                    className="text-lg sm:text-xl font-bold text-white text-center mb-2 leading-snug max-w-md mx-auto"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                >
                    Falta pouco! Preencha seus dados para receber seu diagnóstico personalizado.
                </motion.h2>

                <motion.p
                    className="text-gray-500 text-sm text-center mb-8 max-w-sm mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                >
                    Seus dados são usados exclusivamente para o diagnóstico. Nenhum spam.
                </motion.p>

                <motion.div
                    className="flex flex-col gap-4 max-w-sm mx-auto"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                >
                    {/* Nome */}
                    <div>
                        <label className="block text-[12px] text-gray-500 uppercase tracking-wider font-semibold mb-1.5 ml-1">
                            Seu nome
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={leadData.nome}
                                onChange={(e) => setLeadData((p) => ({ ...p, nome: e.target.value }))}
                                placeholder="Como podemos te chamar?"
                                className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#0030fd]/50 rounded-xl px-4 py-3.5 text-white text-[15px] placeholder:text-gray-600 outline-none transition-colors"
                            />
                            {leadData.nome.trim().length >= 2 && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* WhatsApp com máscara */}
                    <div>
                        <label className="block text-[12px] text-gray-500 uppercase tracking-wider font-semibold mb-1.5 ml-1">
                            Seu WhatsApp
                        </label>
                        <div className="relative">
                            <IMaskInput
                                mask="(00) 00000-0000"
                                value={leadData.whatsapp}
                                onAccept={(value: string) => setLeadData((p) => ({ ...p, whatsapp: value }))}
                                placeholder="(11) 99999-0000"
                                className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#0030fd]/50 rounded-xl px-4 py-3.5 text-white text-[15px] placeholder:text-gray-600 outline-none transition-colors"
                            />
                            {phoneIsValid && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                </motion.div>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => canSubmitLead && goTo(S.LOADING)}
                        disabled={!canSubmitLead}
                        className={`w-full flex items-center justify-center gap-3 font-bold text-base px-8 py-4 rounded-xl shadow-lg transition-all duration-200 mt-2 ${canSubmitLead
                            ? "bg-[#0030fd] hover:bg-[#0026cc] text-white shadow-blue-700/20 hover:shadow-blue-700/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                            : "bg-white/[0.04] text-gray-600 cursor-not-allowed shadow-none"
                            }`}
                    >
                        VER MEU DIAGNÓSTICO
                        <ArrowRight className="w-5 h-5" />
                    </button>

                    <p className="text-[11px] text-gray-600 text-center mt-1 flex items-center justify-center gap-1.5">
                        <Lock className="w-3 h-3" />
                        Seus dados estão protegidos e criptografados.
                    </p>
                </motion.div>
            </motion.div>
        );
    };

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
                <Loader2 className="w-14 h-14 text-[#0030fd] animate-spin" />
                <div className="absolute inset-0 w-14 h-14 rounded-full bg-[#0030fd]/10 animate-ping" />
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
                        return <IconComp className="w-5 h-5 text-blue-400" />;
                    })()}
                    <p className="text-gray-300 text-base sm:text-lg font-medium">
                        {LOADING_MESSAGES[loadIdx].text}
                    </p>
                </motion.div>
            </AnimatePresence>

            <div className="flex gap-1.5 mt-8">
                {LOADING_MESSAGES.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-500 ${i <= loadIdx ? "bg-[#0030fd] w-6" : "bg-white/10 w-1.5"
                            }`}
                    />
                ))}
            </div>

            {/* Analyzing your answers text */}
            <motion.p
                className="text-gray-600 text-xs mt-6"
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
        <>
            <Helmet>
                <title>Diagnóstico Gratuito — Bforense | Investigação Digital</title>
                <meta name="description" content="Descubra em 60 segundos se o seu caso tem solução. Diagnóstico gratuito e 100% sigiloso com especialistas em investigação forense digital." />
                <meta property="og:title" content="Diagnóstico Gratuito Bforense" />
                <meta property="og:description" content="Descubra em 60 segundos se o seu caso tem solução. Diagnóstico gratuito e sigiloso." />
                <meta name="robots" content="noindex,nofollow" />
            </Helmet>

            <div className="min-h-screen bg-[#141414] relative overflow-hidden selection:bg-blue-500/30">
                {/* Ambient background */}
                <div className="pointer-events-none fixed inset-0">
                    <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-700/[0.04] rounded-full blur-[150px]" />
                    <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[120px]" />
                    {/* Extra subtle grid pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                            backgroundSize: "60px 60px",
                        }}
                    />
                </div>

                {/* ── Top Bar marquee ── */}
                <div className="fixed top-0 left-0 right-0 z-[60] h-9 bg-[#0026CC] overflow-hidden flex items-center">
                    <div className="flex whitespace-nowrap animate-marquee">
                        {[
                            "INVESTIGAÇÃO", "INTELIGÊNCIA", "HACKING ÉTICO", "FORENSE",
                            "CYBERCRIME", "FRAUDE", "DILLIGENCE", "SIGILO",
                            "INVESTIGAÇÃO", "INTELIGÊNCIA", "HACKING ÉTICO", "FORENSE",
                            "CYBERCRIME", "FRAUDE", "DILLIGENCE", "SIGILO",
                        ].map((word, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center gap-2 text-white font-semibold text-[11px] tracking-[0.18em] uppercase mx-5"
                            >
                                <span className="w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
                                {word}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Progress bar */}
                {step > S.COVER && step < S.RESULTADO && (
                    <div className="fixed top-9 left-0 right-0 z-50 bg-[#141414]/80 backdrop-blur-xl border-b border-white/[0.04]" style={{ height: '56px' }}>
                        <div className="h-full flex items-center gap-3 max-w-xl mx-auto px-4">
                            {step <= S.COLETA && (
                                <button
                                    onClick={goBack}
                                    className="p-2 -ml-2 rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
                                    aria-label="Voltar"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                            )}
                            <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-700 to-[#0030fd] rounded-full"
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.4 }}
                                />
                            </div>
                            <span className="text-[11px] text-gray-600 font-semibold tabular-nums w-8 text-right">
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
        </>
    );
}

/* ================================================================== */
/*  Sub-components                                                     */
/* ================================================================== */

/* ---------- Question Screen wrapper ---------- */
function QScreen({
    children,
    dir,
    step,
    title,
    subtitle,
}: {
    children: React.ReactNode;
    dir: number;
    step: number;
    title: string;
    subtitle?: string;
}) {
    const badge = STEP_BADGES[step];

    return (
        <motion.div
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="px-5 pt-[106px] pb-10"
        >
            {/* Step badge */}
            <div className="flex items-center justify-center gap-4 mb-4">
                <p className="text-[11px] text-gray-600 uppercase tracking-widest font-semibold text-center">
                    Pergunta {step} de {TOTAL_QUESTIONS}
                </p>
                {badge && (
                    <motion.div
                        className="inline-flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.06] rounded-full px-3 py-1"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <badge.icon className="w-3 h-3 text-gray-500" />
                        <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{badge.text}</span>
                    </motion.div>
                )}
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-white text-center mb-2 leading-snug max-w-md mx-auto">
                {title}
            </h2>
            {subtitle && (
                <p className="text-gray-500 text-sm text-center mb-7 max-w-sm mx-auto">
                    {subtitle}
                </p>
            )}
            {!subtitle && <div className="mb-7" />}
            {children}
        </motion.div>
    );
}

/* ---------- Option Card ---------- */
function OptionCard({
    children,
    i,
    onClick,
    selected,
}: {
    children: React.ReactNode;
    i: number;
    onClick: () => void;
    selected?: boolean;
}) {
    return (
        <motion.button
            custom={i}
            variants={staggerChild}
            initial="hidden"
            animate="visible"
            onClick={onClick}
            className={`group flex items-center gap-3.5 border rounded-xl px-4 py-3.5 text-left transition-all duration-200 cursor-pointer
                ${selected
                    ? "bg-[#0030fd]/10 border-[#0030fd]/40 scale-[0.98]"
                    : "bg-white/[0.03] hover:bg-white/[0.07] border-white/[0.07] hover:border-[#0030fd]/40 hover:scale-[1.015] active:scale-[0.98]"
                }`}
        >
            {children}
            {/* Checkmark animation */}
            {selected && (
                <motion.div
                    className="ml-auto flex-shrink-0"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                </motion.div>
            )}
        </motion.button>
    );
}

/* ---------- Result: HOT ---------- */
function ResultHot({ onCTA, nome }: { onCTA: () => void; nome: string }) {
    const displayName = nome ? `, ${nome.split(" ")[0]}` : "";
    const [countdown, setCountdown] = useState(15 * 60); // 15 min in seconds

    useEffect(() => {
        const iv = setInterval(() => setCountdown((p) => (p > 0 ? p - 1 : 0)), 1000);
        return () => clearInterval(iv);
    }, []);

    const mins = Math.floor(countdown / 60);
    const secs = countdown % 60;

    return (
        <motion.div
            key="hot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center text-center px-5 py-10 min-h-[70vh] justify-center"
        >
            <motion.div
                className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.15, stiffness: 200 }}
            >
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </motion.div>

            <motion.h2
                className="text-xl sm:text-2xl font-black text-white mb-2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                Ótima notícia{displayName}: seu caso tem{" "}
                <span className="text-emerald-400">alta viabilidade.</span>
            </motion.h2>

            <motion.p
                className="text-gray-400 text-sm mb-5 max-w-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
            >
                Um perito sênior foi pré-designado para o seu perfil de caso. Fale agora para iniciar a análise sem custos.
            </motion.p>

            {/* Urgency timer */}
            <motion.div
                className="flex items-center gap-2 bg-amber-500/[0.08] border border-amber-500/[0.15] rounded-full px-4 py-2 mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
            >
                <Timer className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="text-amber-300 text-[13px] font-semibold tabular-nums">
                    Especialista reservado por {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
                </span>
            </motion.div>

            <motion.div
                className="flex flex-col gap-2.5 w-full max-w-sm mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
            >
                {[
                    { icon: BadgeCheck, text: "Protocolo compatível identificado", color: "text-emerald-400" },
                    { icon: Timer, text: "Prazo estimado para conclusão do caso: 3 a 12 dias úteis", color: "text-blue-400" },
                    { icon: Trophy, text: "Taxa de sucesso: 94% em casos similares", color: "text-amber-400" },
                ].map((b) => (
                    <div
                        key={b.text}
                        className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3"
                    >
                        <b.icon className={`w-4 h-4 flex-shrink-0 ${b.color}`} />
                        <span className="text-white/70 text-[13px] text-left">{b.text}</span>
                    </div>
                ))}
            </motion.div>

            {/* CTA  */}
            <motion.button
                onClick={onCTA}
                className="w-full max-w-sm flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-emerald-600/15 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
            >
                <span className="absolute inset-0 rounded-xl bg-emerald-400/10 animate-ping pointer-events-none" style={{ animationDuration: "2.5s" }} />
                <MessageCircle className="w-5 h-5 relative z-10" />
                <span className="relative z-10">FALAR COM PERITO AGORA</span>
            </motion.button>

            <motion.p
                className="text-[11px] text-gray-600 mt-4"
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
function ResultWarm({ onCTA, nome }: { onCTA: () => void; nome: string }) {
    const displayName = nome ? `, ${nome.split(" ")[0]}` : "";
    return (
        <motion.div
            key="warm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center text-center px-5 py-10 min-h-[70vh] justify-center"
        >
            <motion.div
                className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.15, stiffness: 200 }}
            >
                <User className="w-8 h-8 text-blue-400" />
            </motion.div>

            <motion.h2
                className="text-xl sm:text-2xl font-black text-white mb-2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                Analisamos o seu perfil{displayName}.
            </motion.h2>

            <motion.p
                className="text-gray-400 text-sm mb-6 max-w-sm leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
            >
                Para o seu tipo de caso, recomendamos uma consulta rápida com o nosso time de triagem.
                Eles vão avaliar as melhores opções e esclarecer valores.
            </motion.p>

            {/* Next steps */}
            <motion.div
                className="flex flex-col gap-2 w-full max-w-sm mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                {[
                    "Conversa rápida de 5 min — sem compromisso",
                    "Orientação personalizada para o seu caso",
                    "Opções flexíveis de investimento",
                ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span className="text-white/70 text-[13px] text-left">{text}</span>
                    </div>
                ))}
            </motion.div>

            <motion.button
                onClick={onCTA}
                className="w-full max-w-sm flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-emerald-600/15 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <MessageCircle className="w-5 h-5" />
                FALAR COM TRIAGEM
            </motion.button>

            <motion.p
                className="text-[11px] text-gray-600 mt-4"
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
function ResultCold({ nome }: { nome: string }) {
    const displayName = nome ? `, ${nome.split(" ")[0]}` : "";
    return (
        <motion.div
            key="cold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center text-center px-5 py-10 min-h-[70vh] justify-center"
        >
            <motion.div
                className="w-16 h-16 rounded-2xl bg-gray-500/10 border border-gray-500/20 flex items-center justify-center mb-5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.15, stiffness: 200 }}
            >
                <BookOpen className="w-8 h-8 text-gray-400" />
            </motion.div>

            <motion.h2
                className="text-xl sm:text-2xl font-black text-white mb-2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                Obrigado pelo seu tempo{displayName}.
            </motion.h2>

            <motion.p
                className="text-gray-400 text-sm mb-8 max-w-sm leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
            >
                Para o perfil do seu caso, preparamos um material gratuito sobre como preservar evidências
                digitais e proteger seus direitos. Quando estiver pronto para avançar, estamos à disposição.
            </motion.p>

            <motion.a
                href="#"
                className="w-full max-w-sm flex items-center justify-center gap-3 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <Download className="w-5 h-5" />
                BAIXAR GUIA GRATUITO
            </motion.a>

            <motion.p
                className="text-[11px] text-gray-600 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                Se mudar de ideia, fale com a gente:{" "}
                <a
                    href={`https://wa.me/${PHONE_TRIAGE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                >
                    WhatsApp
                </a>
            </motion.p>
        </motion.div>
    );
}
