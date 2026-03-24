import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
    MessageCircle,
    ArrowRight,
    Lock,
    Scale,
    Brain,
    Check,
    Star,
    ChevronDown,
    Shield,
    MapPin,
} from "lucide-react";
import { NetworkBackground } from "../components/NetworkBackground";
import {
    IconPatrimonial,
    IconDueDiligence,
    IconLitigios,
    IconFinanceira,
    IconConjugal,
    IconDigital,
    ProcessIcon,
    useIntersectionObserver,
} from "../components/ServiceIcons";

const PHONE = "551131641004";
const EMAIL = "bforense@pm.me";

const SERVICES = [
    {
        Icon: IconPatrimonial,
        title: "Investigação patrimonial",
        desc: "Rastreamento de bens, empresas de fachada e patrimônio oculto.",
        slug: "investigacao-patrimonial",
    },
    {
        Icon: IconDueDiligence,
        title: "Due diligence",
        desc: "Verificação profunda de pessoas e empresas antes de decisões críticas.",
        slug: "due-diligence",
    },
    {
        Icon: IconLitigios,
        title: "Suporte a litígios",
        desc: "Produção de provas e inteligência para disputas judiciais e arbitragens.",
        slug: "suporte-a-litigios",
    },
    {
        Icon: IconFinanceira,
        title: "Inteligência financeira",
        desc: "Investigação de desvios, movimentações suspeitas e fraude societária.",
        slug: "inteligencia-financeira",
    },
    {
        Icon: IconConjugal,
        title: "Investigação conjugal",
        desc: "Monitoramento, levantamento de provas e documentação para casos pessoais.",
        slug: "investigacao-conjugal",
    },
    {
        Icon: IconDigital,
        title: "Investigação digital",
        desc: "Análise de pegada digital, redes sociais, domínios e rastros online.",
        slug: "investigacao-digital",
    },
];

const STEPS = [
    {
        num: "01",
        type: "contact" as const,
        title: "Contato confidencial",
        desc: "Você fala com um especialista. Tudo sob sigilo desde o primeiro minuto.",
    },
    {
        num: "02",
        type: "assessment" as const,
        title: "Avaliação do caso",
        desc: "Entendemos a situação, definimos o que é viável e apresentamos um plano.",
    },
    {
        num: "03",
        type: "execution" as const,
        title: "Execução da operação",
        desc: "Nossa equipe coleta, analisa e cruza informações em campo e no digital.",
    },
    {
        num: "04",
        type: "delivery" as const,
        title: "Entrega do dossiê",
        desc: "Relatório completo com provas documentadas, pronto para uso jurídico.",
    },
];

const METRICS = [
    { value: 200, suffix: "+", label: "Casos resolvidos" },
    { value: 98, suffix: "%", label: "Taxa de sucesso" },
    { value: 30, suffix: "min", label: "Tempo de resposta" },
    { value: 12, suffix: "+", label: "Estados atendidos" },
];

const TESTIMONIALS = [
    {
        text: "Recuperamos R$ 340 mil que já dávamos como perdidos. A investigação patrimonial revelou bens ocultos que nem nosso advogado sabia.",
        name: "Cliente Confidencial",
        role: "Empresário — Curitiba",
        initials: "RC",
        highlight: "R$ 340 mil recuperados",
    },
    {
        text: "Contratei para uma due diligence antes de uma sociedade. Descobriram processos e dívidas que a outra parte omitiu. Evitou um prejuízo de R$ 2 milhões.",
        name: "Cliente Confidencial",
        role: "Investidor — São Paulo",
        initials: "MF",
        highlight: "R$ 2M em prejuízo evitado",
    },
    {
        text: "A equipe entendeu a complexidade do caso e entregou em 12 dias o que meu advogado tentava há 8 meses.",
        name: "Cliente Confidencial",
        role: "Diretor Jurídico",
        initials: "DJ",
        highlight: "12 dias vs 8 meses",
    },
    {
        text: "As provas levantadas mudaram completamente o rumo do processo. Ganhamos a causa após anos de impasse.",
        name: "Cliente Confidencial",
        role: "via Escritório de Advocacia",
        initials: "EA",
        highlight: "Causa ganha",
    },
    {
        text: "Profissionalismo absoluto. Desde o primeiro contato até a entrega do dossiê, tudo foi conduzido com discrição exemplar.",
        name: "Cliente Confidencial",
        role: "Empresário",
        initials: "EM",
        highlight: "Discrição total",
    },
];

const FAQ_ITEMS = [
    {
        question: "Quanto custa uma investigação?",
        answer: "O investimento depende da complexidade do caso. Após a avaliação gratuita, apresentamos um orçamento detalhado sem compromisso. Valores a partir de R$1.500 para investigações pontuais. Aceitamos PIX, transferência e cartão em até 6x.",
    },
    {
        question: "A investigação privada é legal?",
        answer: "Sim. Somos regulamentados pela Lei Federal 13.432/2017. Todos os métodos operam dentro da legalidade e os relatórios são aceitos como prova em processos judiciais, arbitragens e procedimentos administrativos.",
    },
    {
        question: "Como funciona o sigilo?",
        answer: "Comunicação por canais seguros e criptografados. Não armazenamos dados além do necessário. Relatórios entregues em formato seguro e deletados de nossos servidores após a entrega.",
    },
    {
        question: "Quanto tempo dura uma investigação?",
        answer: "Investigações pontuais: 5 a 15 dias. Operações complexas como rastreamento patrimonial: 30 a 90 dias. Atuamos em todo o Brasil, com sede em Porto Alegre e operações em mais de 12 estados.",
    },
];

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" },
};

// FAQ Accordion Item
function FAQItem({ item, isOpen, onClick }: { item: typeof FAQ_ITEMS[0]; isOpen: boolean; onClick: () => void }) {
    return (
        <div className="border-b border-border-subtle">
            <button
                onClick={onClick}
                className="w-full py-5 flex items-center justify-between text-left group"
            >
                <span className="font-medium text-text-primary group-hover:text-gold transition-colors pr-4">
                    {item.question}
                </span>
                <ChevronDown
                    className={`w-5 h-5 text-text-secondary flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-5" : "max-h-0"}`}
            >
                <p className="text-text-secondary leading-relaxed">
                    {item.answer}
                </p>
            </div>
        </div>
    );
}

// FAQ Section Component
function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="px-6 sm:px-8 py-20 sm:py-28 bg-surface">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <span className="section-label">Dúvidas</span>
                    <h2 className="font-heading text-2xl sm:text-3xl text-text-primary">
                        Perguntas <span className="text-gold-accent">frequentes</span>
                    </h2>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {FAQ_ITEMS.map((item, i) => (
                        <FAQItem
                            key={i}
                            item={item}
                            isOpen={openIndex === i}
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// Animated counter component
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;
        
        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [isInView, value]);

    return (
        <span ref={ref} className="counter-value">
            {count}{suffix}
        </span>
    );
}

// Text reveal component for section titles
function TextReveal({ children, className = "" }: { children: string; className?: string }) {
    const ref = useRef<HTMLHeadingElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const words = children.split(" ");

    return (
        <h2 ref={ref} className={className}>
            {words.map((word, i) => (
                <span
                    key={i}
                    className="text-reveal-word"
                    style={{
                        transitionDelay: `${i * 0.08}s`,
                        ...(isInView ? { opacity: 1, transform: "translateY(0)" } : {}),
                    }}
                >
                    {word}{" "}
                </span>
            ))}
        </h2>
    );
}

// Service card with animated icon
function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
    const [isHovered, setIsHovered] = useState(false);
    const { Icon } = service;

    return (
        <Link to={`/servicos/${service.slug}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="service-card p-8 rounded-xl group service-icon-container h-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Icon className="mb-5" animate={isHovered} />
                <h3 className="font-semibold text-lg text-text-primary mb-2">{service.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">{service.desc}</p>
                <ArrowRight className="w-5 h-5 text-gold card-arrow" />
            </motion.div>
        </Link>
    );
}

// Process step card with animated icon
function ProcessCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
    const { ref, isInView } = useIntersectionObserver(0.3);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            className="process-card"
        >
            <span className="process-card-number">{step.num}</span>
            <div className="relative z-10">
                <div className="icon-container-gold mb-4" style={{ width: 48, height: 48, borderRadius: 12 }}>
                    <ProcessIcon type={step.type} inView={isInView} />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
            </div>
        </motion.div>
    );
}

export function Home() {
    return (
        <div className="pt-16 sm:pt-18 pb-20 md:pb-0">
            {/* Hero */}
            <section className="hero-section relative min-h-screen overflow-hidden">
                {/* Absolute background layer */}
                <div className="absolute inset-0 hero-gradient" />
                <NetworkBackground />

                {/* Grid pattern subtle */}
                <div className="absolute inset-0 hero-grid-overlay pointer-events-none" aria-hidden="true" />

                {/* Mobile background image */}
                <div className="hero-mobile-bg md:hidden" aria-hidden="true" />

                {/* Desktop — fullbleed image right half */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.15 }}
                    className="hero-desktop-image hidden md:block"
                    aria-hidden="true"
                >
                    <img
                        src="/hero-desktop.webp"
                        alt=""
                        className="hero-desktop-img"
                        loading="eager"
                        decoding="async"
                    />
                    <div className="hero-img-fade-left" />
                    <div className="hero-img-fade-bottom" />
                    <div className="hero-img-fade-top" />
                </motion.div>

                {/* Content — left side */}
                <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 min-h-screen flex flex-col justify-start pt-24 md:justify-center md:pt-0 pb-0 md:pb-0">
                    <div className="md:max-w-[50%] lg:max-w-[45%]">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="font-heading text-[2rem] sm:text-[2.5rem] lg:text-[3.2rem] xl:text-[3.75rem] leading-[1.08] mb-7 tracking-tight"
                            style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
                        >
                            <span className="text-white">Investigadores. </span>
                            <span className="text-white">Detetives. </span>
                            <span className="text-gold-accent">Hackers.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-[#b0ada8] text-base lg:text-lg max-w-lg mb-6"
                            style={{ lineHeight: 1.75 }}
                        >
                            Uma agência privada completa, com investigadores de campo, detetives, analistas de inteligência e hackers éticos, para quem precisa vencer, proteger o que é seu ou revelar o que tentaram esconder.
                        </motion.p>

                        {/* Social Proof Mini - Above the fold */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-wrap items-center gap-4 mb-8"
                        >
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {["DJ", "EM", "EA"].map((initials, i) => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-elevation border-2 border-bg flex items-center justify-center text-xs font-medium text-gold">
                                            {initials}
                                        </div>
                                    ))}
                                </div>
                                <span className="text-sm text-text-secondary">+200 casos resolvidos</span>
                            </div>
                            <div className="hidden sm:flex items-center gap-1.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                                ))}
                                <span className="text-sm text-text-secondary ml-1">98% de sucesso</span>
                            </div>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8"
                        >
                            <a
                                href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Gostaria de uma avaliação gratuita do meu caso.")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary text-base group"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Avaliação gratuita do caso
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <Link to="/servicos" className="btn-secondary text-base">
                                Ver serviços
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                        
                        {/* Response time badge */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            className="flex items-center gap-2 text-sm text-text-secondary"
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Resposta em até 30 minutos
                        </motion.div>

                    </div>
                </div>

                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000000] to-transparent z-20 pointer-events-none" />
            </section>

            {/* Trust badges strip */}
            <div className="trust-strip px-6 sm:px-8 py-5">
                <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-3">
                    {[
                        { icon: <Shield className="w-4 h-4" />, label: "Sigilo Absoluto" },
                        { icon: <Scale className="w-4 h-4" />, label: "Lei 13.432/2017" },
                        { icon: <Check className="w-4 h-4" />, label: "Avaliação Gratuita" },
                        { icon: <MapPin className="w-4 h-4" />, label: "12 Estados" },
                    ].map((item, i) => (
                        <div key={i} className="hero-trust-badge">
                            {item.icon}
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Metrics Section */}
            <section className="metrics-section metrics-grid-pattern px-6 sm:px-8 py-16 sm:py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
                        {METRICS.map((metric, i) => (
                            <motion.div
                                key={metric.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="text-center relative"
                            >
                                <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                                <p className="counter-label">{metric.label}</p>
                                {i < METRICS.length - 1 && <div className="metrics-divider" />}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="section-divider-glow" />

            {/* Value Proposition */}
            <section className="px-6 sm:px-8 py-20 sm:py-28 bg-surface-alt section-glow-bg">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        <motion.div {...fadeIn} className="text-center md:text-left group">
                            <div className="icon-container-gold mb-5">
                                <Lock className="w-6 h-6 text-gold" strokeWidth={1.5} />
                            </div>
                            <h3 className="font-heading text-xl text-text-primary mb-3">Sigilo <span className="text-gold-accent">operacional</span></h3>
                            <p className="text-text-secondary text-sm leading-relaxed">
                                Toda interação é confidencial. Do primeiro contato à entrega do relatório.
                            </p>
                        </motion.div>
                        <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="text-center md:text-left group">
                            <div className="icon-container-gold mb-5">
                                <Scale className="w-6 h-6 text-gold" strokeWidth={1.5} />
                            </div>
                            <h3 className="font-heading text-xl text-text-primary mb-3">Atuação dentro da <span className="text-gold-accent">lei</span></h3>
                            <p className="text-text-secondary text-sm leading-relaxed">
                                Operamos sob a Lei 13.432/2017. Resultados sólidos com metodologia legal.
                            </p>
                        </motion.div>
                        <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="text-center md:text-left group">
                            <div className="icon-container-gold mb-5">
                                <Brain className="w-6 h-6 text-gold" strokeWidth={1.5} />
                            </div>
                            <h3 className="font-heading text-xl text-text-primary mb-3"><span className="text-gold-accent">Inteligência</span>, não achismo</h3>
                            <p className="text-text-secondary text-sm leading-relaxed">
                                Cruzamos fontes abertas, registros públicos e inteligência humana para entregar fatos documentados.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="section-divider-glow" />

            {/* Services */}
            <section className="px-6 sm:px-8 py-20 sm:py-28 bg-surface section-glow-bg relative overflow-hidden">
                <div className="glow-orb glow-orb-lg animate-pulse-glow" style={{ top: "20%", right: "-10%" }} aria-hidden="true" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div {...fadeIn} className="text-center mb-12">
                        <span className="section-label">Serviços</span>
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary">
                            O que <span className="text-gold-accent">resolvemos</span>
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {SERVICES.map((service, i) => (
                            <ServiceCard key={service.title} service={service} index={i} />
                        ))}
                    </div>
                    <motion.div {...fadeIn} className="text-center mt-10">
                        <Link
                            to="/servicos"
                            className="inline-flex items-center gap-2 text-gold hover:text-[#d4ac5a] font-medium text-sm transition-colors"
                        >
                            Ver todos os serviços
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Divider */}
            <div className="section-divider-glow" />

            {/* How it works */}
            <section className="px-6 sm:px-8 py-20 sm:py-28 bg-surface-alt">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeIn} className="text-center mb-12">
                        <span className="section-label">Processo</span>
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary">
                            Do primeiro contato ao <span className="text-gold-accent">relatório final</span>
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {STEPS.map((step, i) => (
                            <ProcessCard key={step.num} step={step} index={i} />
                        ))}
                    </div>
                    <motion.div {...fadeIn} className="text-center mt-10">
                        <a
                            href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Gostaria de uma avaliação confidencial do meu caso.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-gold hover:text-[#d4ac5a] font-medium text-sm transition-colors"
                        >
                            Fale conosco para uma avaliação
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Divider */}
            <div className="section-divider-glow" />

            {/* Testimonials Carousel */}
            <section className="px-6 sm:px-8 py-20 sm:py-28 bg-surface">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeIn} className="text-center mb-12">
                        <span className="section-label">Depoimentos</span>
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary">
                            O que dizem nossos <span className="text-gold-accent">clientes</span>
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="testimonial-scroll -mx-6 px-6"
                    >
                        {TESTIMONIALS.map((testimonial, i) => (
                            <div key={i} className="testimonial-card">
                                <span className="testimonial-quote">"</span>
                                {/* Highlight badge */}
                                <div className="relative z-10 mt-4 mb-3">
                                    <span className="inline-block px-3 py-1 bg-gold/10 border border-gold/20 rounded-full text-gold text-xs font-medium">
                                        {testimonial.highlight}
                                    </span>
                                </div>
                                {/* Stars */}
                                <div className="testimonial-stars relative z-10">
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} className="w-4 h-4" />
                                    ))}
                                </div>
                                <p className="text-text-primary text-base leading-relaxed my-4 relative z-10">
                                    {testimonial.text}
                                </p>
                                <div className="flex items-center gap-3 relative z-10">
                                    <div className="testimonial-initials">
                                        {testimonial.initials}
                                    </div>
                                    <div>
                                        <p className="text-text-primary text-sm font-medium">{testimonial.name}</p>
                                        <p className="text-text-muted text-xs">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* FAQ */}
            <FAQSection />

            {/* Divider */}
            <div className="section-divider-glow" />

            {/* Credibility */}
            <section className="credibility-section px-6 sm:px-8 py-20 sm:py-28 bg-surface-alt relative overflow-hidden">
                <div className="glow-orb glow-orb-sm animate-float" style={{ top: "10%", left: "-5%" }} aria-hidden="true" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div {...fadeIn} className="text-center mb-12">
                        <span className="section-label">Credibilidade</span>
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary mb-4">
                            Por que confiar na <span className="text-gold-accent">Bforense</span>
                        </h2>
                        <p className="text-text-secondary max-w-2xl mx-auto">
                            Equipe com background em investigação forense, inteligência de fontes abertas e análise financeira.
                            Relatórios aceitos como prova em processos judiciais e arbitragens.
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: "shield", title: "Lei 13.432/2017", desc: "Atuação regulamentada pela legislação federal que disciplina a profissão de detetive particular." },
                            { icon: "file", title: "Relatórios judiciais", desc: "Dossiês com rigor documental aceitos como prova em processos, arbitragens e procedimentos administrativos." },
                            { icon: "lock", title: "Canais seguros", desc: "Comunicação criptografada. Dados deletados após entrega. Sem rastros." },
                            { icon: "map", title: "Atuação nacional", desc: "Sede em Porto Alegre com operações já conduzidas em mais de 12 estados brasileiros." },
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="credibility-card"
                            >
                                <div className="icon-container-gold mb-4" style={{ width: 48, height: 48, borderRadius: 12 }}>
                                    {item.icon === "shield" && <Scale className="w-5 h-5 text-gold" strokeWidth={1.5} />}
                                    {item.icon === "file" && <Check className="w-5 h-5 text-gold" strokeWidth={1.5} />}
                                    {item.icon === "lock" && <Lock className="w-5 h-5 text-gold" strokeWidth={1.5} />}
                                    {item.icon === "map" && <Star className="w-5 h-5 text-gold" strokeWidth={1.5} />}
                                </div>
                                <h3 className="font-semibold text-text-primary text-sm mb-2">{item.title}</h3>
                                <p className="text-text-secondary text-xs leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="section-divider-glow" />

            {/* Final CTA */}
            <section className="cta-gradient px-6 sm:px-8 py-24 sm:py-32 grid-pattern relative overflow-hidden">
                <div className="cta-bg-image" aria-hidden="true" />
                <div className="glow-orb glow-orb-lg animate-pulse-glow" style={{ top: "30%", left: "10%" }} aria-hidden="true" />
                <div className="glow-orb glow-orb-sm animate-float-slow" style={{ bottom: "20%", right: "15%" }} aria-hidden="true" />
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <motion.div {...fadeIn}>
                        <span className="section-label">Comece agora</span>
                        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-text-primary mb-4">
                            Pronto para ter <span className="text-gold-accent">clareza</span> sobre a situação?
                        </h2>
                        <p className="text-text-secondary mb-8 max-w-xl mx-auto">
                            O primeiro contato é sigiloso e sem compromisso. Avaliamos seu caso e apresentamos as possibilidades.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Gostaria de uma avaliação confidencial do meu caso.")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto btn-primary text-base"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Falar com especialista
                                <ArrowRight className="w-4 h-4" />
                            </a>
                            <a
                                href={`mailto:${EMAIL}`}
                                className="w-full sm:w-auto btn-secondary text-base"
                            >
                                Enviar e-mail seguro
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
