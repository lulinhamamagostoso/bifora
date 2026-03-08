import {
    AlertTriangle,
    Search,
    Briefcase,
    Scale,
    Smartphone,
    Lock,
    FileText,
    CircleDot,
    BookOpen,
    Flame,
    Clock,
    Info,
    Shield,
    Users,
    Sparkles,
    ShieldCheck,
    Zap,
    Star,
    CheckCircle2,
    HelpCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type QuizAnswers = {
    situacao: string;
    tempo: string;
    prejuizo: string;
    providencia: string;
    urgencia: string;
    investimento: string;
};

export type LeadData = {
    nome: string;
    email: string;
    whatsapp: string;
};

export type LeadTier = "hot" | "warm" | "cold";

export type TestimonialCategory =
    | "golpe"
    | "localizar"
    | "fraude_empresa"
    | "provas"
    | "crime_digital"
    | "traicao"
    | "outro";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

export const PHONE_MAIN = "551131641004";
export const PHONE_TRIAGE = "551153042041";
export const FORMSPREE_URL = "https://formspree.io/f/mdawkeaj";

/* Step indexes */
export const S = {
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

export const TOTAL_QUESTIONS = 6;

/* ---- Question Data ---- */

export const SITUACOES = [
    { label: "Fui vítima de golpe financeiro (PIX, fraude bancária, estelionato)", icon: AlertTriangle, score: 3, categoria: "golpe" as TestimonialCategory },
    { label: "Preciso localizar uma pessoa ou rastrear bens", icon: Search, score: 3, categoria: "localizar" as TestimonialCategory },
    { label: "Suspeito de fraude dentro da minha empresa", icon: Briefcase, score: 3, categoria: "fraude_empresa" as TestimonialCategory },
    { label: "Preciso reunir provas para um processo judicial", icon: Scale, score: 3, categoria: "provas" as TestimonialCategory },
    { label: "Sofri um crime digital (invasão, vazamento, extorsão)", icon: Smartphone, score: 3, categoria: "crime_digital" as TestimonialCategory },
    { label: "Desconfio de traição ou infidelidade", icon: Lock, score: 1, categoria: "traicao" as TestimonialCategory },
    { label: "Outra situação que preciso investigar", icon: HelpCircle, score: 2, categoria: "outro" as TestimonialCategory },
] as const;

export const TEMPOS = [
    { label: "Está acontecendo agora / aconteceu hoje", score: 4 },
    { label: "Aconteceu nos últimos dias", score: 3 },
    { label: "Faz algumas semanas", score: 2 },
    { label: "Já tem alguns meses", score: 1 },
] as const;

export const PREJUIZOS = [
    { label: "Menos de R$ 5 mil", score: 1 },
    { label: "Entre R$ 5 mil e R$ 10 mil", score: 3 },
    { label: "Entre R$ 10 mil e R$ 50 mil", score: 4 },
    { label: "Entre R$ 50 mil e R$ 100 mil", score: 5 },
    { label: "Entre R$ 100 mil e R$ 500 mil", score: 6 },
    { label: "Acima de R$ 500 mil", score: 10 },
    { label: "Não houve perda financeira direta", score: 1 },
] as const;

export const PROVIDENCIAS = [
    { label: "Sim, fiz B.O. e/ou procurei advogado", icon: FileText, score: 4 },
    { label: "Tentei resolver por conta, mas sem resultado", icon: CircleDot, score: 3 },
    { label: "Ainda não fiz nada — não sei por onde começar", icon: BookOpen, score: 2 },
] as const;

export const URGENCIAS = [
    { label: "É urgente, preciso de ação imediata", icon: Flame, score: 4 },
    { label: "Quero orientação nos próximos dias", icon: Clock, score: 2 },
    { label: "Só estou pesquisando por enquanto", icon: Info, score: 1 },
] as const;

export const INVESTIMENTOS = [
    { label: "Quero contratar um profissional e resolver de vez", score: 5 },
    { label: "Quero entender as opções e valores antes de decidir", score: 3 },
    { label: "Estou apenas buscando informações por enquanto", score: 1 },
] as const;

/* ---- Testimonials with category tags ---- */

export const TESTIMONIALS: {
    cidade: string;
    initials: string;
    texto: string;
    estrelas: number;
    categoria: TestimonialCategory;
    tipoCaso: string;
    destaque?: string;
}[] = [
    {
        cidade: "São Paulo, SP",
        initials: "CV",
        texto: "Paguei R$ 5 mil de sinal e depois mais R$ 755 mil por uma BMW X6 que nunca recebi. A Bforense identificou todos os envolvidos, rastreou os responsáveis e conseguiu o congelamento judicial das contas. Recuperei um valor que eu já considerava perdido.",
        estrelas: 5,
        categoria: "golpe",
        tipoCaso: "Golpe financeiro",
        destaque: "R$ 755 mil recuperados",
    },
    {
        cidade: "Curitiba, PR",
        initials: "MR",
        texto: "Caí num golpe do PIX de R$ 23 mil. A polícia disse que não tinha o que fazer. A Bforense rastreou a conta destino, identificou o golpista e montou o dossiê completo. Em 12 dias meu advogado já tinha tudo pra entrar na justiça.",
        estrelas: 5,
        categoria: "golpe",
        tipoCaso: "Golpe do PIX",
        destaque: "R$ 23 mil recuperados",
    },
    {
        cidade: "Rio de Janeiro, RJ",
        initials: "LS",
        texto: "Minha empresa estava sangrando dinheiro e eu não entendia por quê. A investigação revelou que um gerente desviava valores há 2 anos usando notas frias. Montaram o dossiê com todas as provas, datas e valores.",
        estrelas: 5,
        categoria: "fraude_empresa",
        tipoCaso: "Fraude empresarial",
        destaque: "Desvio de 2 anos descoberto",
    },
    {
        cidade: "Belo Horizonte, MG",
        initials: "PA",
        texto: "Desconfiava do meu sócio há meses. A Bforense confirmou que ele estava desviando clientes e usando a estrutura da empresa pra benefício próprio. As provas foram tão sólidas que resolvemos tudo extrajudicialmente em 3 semanas.",
        estrelas: 4,
        categoria: "fraude_empresa",
        tipoCaso: "Fraude de sócio",
        destaque: "Resolvido em 3 semanas",
    },
    {
        cidade: "Florianópolis, SC",
        initials: "TF",
        texto: "Tive meu Instagram hackeado e o criminoso estava extorquindo meus contatos. A Bforense rastreou o IP, identificou o invasor e elaborou o laudo técnico. O delegado elogiou a qualidade do material. Caso resolvido em 10 dias.",
        estrelas: 5,
        categoria: "crime_digital",
        tipoCaso: "Crime digital",
        destaque: "Resolvido em 10 dias",
    },
    {
        cidade: "Brasília, DF",
        initials: "AC",
        texto: "Precisava de provas digitais para um processo de guarda. A equipe coletou e preservou todas as evidências seguindo os protocolos legais. Meu advogado disse que foi o laudo mais completo que ele já trabalhou.",
        estrelas: 4,
        categoria: "provas",
        tipoCaso: "Busca de provas",
        destaque: "Laudo técnico exemplar",
    },
    {
        cidade: "Campinas, SP",
        initials: "RB",
        texto: "Perdi R$ 48 mil num esquema de investimento falso. A Bforense identificou as contas dos golpistas, montou toda a cadeia de transações e o juiz deferiu o bloqueio. Já recuperei 70% do valor.",
        estrelas: 5,
        categoria: "golpe",
        tipoCaso: "Golpe de investimento",
        destaque: "70% do valor recuperado",
    },
    {
        cidade: "Porto Alegre, RS",
        initials: "JM",
        texto: "Recebi ameaças anônimas por WhatsApp durante semanas. A investigação identificou quem estava por trás em menos de uma semana. O sigilo foi total do início ao fim.",
        estrelas: 5,
        categoria: "crime_digital",
        tipoCaso: "Ameaças digitais",
        destaque: "Identificado em 7 dias",
    },
    {
        cidade: "Goiânia, GO",
        initials: "DF",
        texto: "Meu ex-sócio sumiu devendo R$ 320 mil e transferiu tudo pro nome de laranjas. A Bforense rastreou os bens, encontrou dois imóveis e um carro registrados em nome de terceiros. Meu advogado pediu a penhora e o juiz deferiu na mesma semana.",
        estrelas: 5,
        categoria: "localizar",
        tipoCaso: "Localização de bens",
        destaque: "R$ 320 mil em bens rastreados",
    },
    {
        cidade: "Recife, PE",
        initials: "AS",
        texto: "Desconfiava há meses, mas não tinha certeza de nada. A Bforense conduziu tudo com um sigilo absurdo — eu mesmo me surpreendi com a discrição. Em 15 dias recebi um relatório com evidências digitais que não deixavam dúvida nenhuma. Tomei minha decisão com segurança e tranquilidade.",
        estrelas: 5,
        categoria: "traicao",
        tipoCaso: "Investigação conjugal",
        destaque: "Sigilo total garantido",
    },
    {
        cidade: "Salvador, BA",
        initials: "WL",
        texto: "Um ex-funcionário abriu uma empresa concorrente usando nossa base de clientes e documentos internos. A Bforense fez a perícia nos computadores, recuperou os arquivos deletados e comprovou a cópia ilegal. Ganhamos a ação por concorrência desleal e danos morais.",
        estrelas: 5,
        categoria: "provas",
        tipoCaso: "Concorrência desleal",
        destaque: "Ação judicial ganha",
    },
];

/** Get filtered testimonials: prioritize matching category, fill with others, max 4 */
export function getFilteredTestimonials(situacao: string) {
    const selectedSit = SITUACOES.find(s => s.label === situacao);
    const cat = selectedSit?.categoria;

    if (!cat) return TESTIMONIALS.slice(0, 4);

    const matching = TESTIMONIALS.filter(t => t.categoria === cat);
    const others = TESTIMONIALS.filter(t => t.categoria !== cat);

    const result = [...matching, ...others];
    return result.slice(0, 4);
}

export const LOADING_MESSAGES = [
    { text: "Analisando viabilidade do caso...", icon: Search },
    { text: "Cruzando com base de protocolos...", icon: Shield },
    { text: "Verificando disponibilidade de especialistas...", icon: Users },
    { text: "Finalizando diagnóstico...", icon: Sparkles },
];

export const STEP_BADGES: Record<number, { text: string; icon: typeof Lock }> = {
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

export function calcTier(answers: QuizAnswers): LeadTier {
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

    const apenasBuscando = answers.investimento === "Estou apenas buscando informações por enquanto";

    /* Leads cautelosos com caso sério → warm, não cold */
    if (apenasBuscando) return total >= 15 ? "warm" : "cold";

    if (total >= 20) return "hot";
    if (total >= 10) return "warm";
    return "cold";
}

/* ------------------------------------------------------------------ */
/*  Animations                                                         */
/* ------------------------------------------------------------------ */

export const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

export const staggerChild = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.06, duration: 0.3, ease: [0, 0, 0.58, 1] as const },
    }),
};
