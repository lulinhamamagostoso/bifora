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

const PHONE = "555131641004";
const EMAIL = "bscy@pm.me";

const SERVICES = [
    {
        Icon: IconPatrimonial,
        title: "Investigação patrimonial",
        desc: "Rastreamento de bens, empresas de fachada e patrimônio oculto.",
    },
    {
        Icon: IconDueDiligence,
        title: "Due diligence",
        desc: "Verificação profunda de pessoas e empresas antes de decisões críticas.",
    },
    {
        Icon: IconLitigios,
        title: "Suporte a litígios",
        desc: "Produção de provas e inteligência para disputas judiciais e arbitragens.",
    },
    {
        Icon: IconFinanceira,
        title: "Inteligência financeira",
        desc: "Investigação de desvios, movimentações suspeitas e fraude societária.",
    },
    {
        Icon: IconConjugal,
        title: "Investigação conjugal",
        desc: "Monitoramento, levantamento de provas e documentação para casos pessoais.",
    },
    {
        Icon: IconDigital,
        title: "Investigação digital",
        desc: "Análise de pegada digital, redes sociais, domínios e rastros online.",
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
    { value: 200, suffix: "+", label: "Operações concluídas" },
    { value: 12, suffix: "", label: "Estados de atuação" },
    { value: 98, suffix: "%", label: "Taxa de resolução" },
    { value: 24, suffix: "h", label: "Tempo de resposta" },
];

const TESTIMONIALS = [
    {
        text: "A equipe entendeu a complexidade do caso e entregou em 12 dias o que meu advogado tentava há 8 meses.",
        name: "Cliente Confidencial",
        role: "Diretor Jurídico",
        initials: "DJ",
    },
    {
        text: "Profissionalismo absoluto. Desde o primeiro contato até a entrega do dossiê, tudo foi conduzido com discrição exemplar.",
        name: "Cliente Confidencial",
        role: "Empresário",
        initials: "EM",
    },
    {
        text: "As provas levantadas mudaram completamente o rumo do processo. Resultado que parecia impossível.",
        name: "Cliente Confidencial",
        role: "via Escritório de Advocacia",
        initials: "EA",
    },
];

const FAQ_ITEMS = [
    {
        question: "Quanto custa uma investigação?",
        answer: "O investimento depende da complexidade do caso, do prazo e dos recursos necessários. Após o primeiro contato confidencial, apresentamos um orçamento detalhado antes de qualquer compromisso. Trabalhamos com valores a partir de R$1.500 para investigações pontuais.",
    },
    {
        question: "Como funciona o sigilo?",
        answer: "Toda comunicação é feita por canais seguros. Não armazenamos dados além do necessário para a operação. O contato pelo WhatsApp é feito de forma discreta, sem identificação do serviço. Relatórios são entregues em formato seguro e deletados de nossos servidores após a entrega.",
    },
    {
        question: "A investigação privada é legal?",
        answer: "Sim. A profissão de detetive particular é regulamentada pela Lei Federal 13.432/2017. Todos os nossos métodos operam dentro da legalidade — não realizamos interceptações telefônicas, quebra de sigilo bancário ou qualquer procedimento que exija ordem judicial.",
    },
    {
        question: "Os relatórios servem como prova judicial?",
        answer: "Sim. Nossos relatórios são elaborados com rigor documental e metodologia que atende aos requisitos para utilização como prova em processos judiciais, arbitragens e procedimentos administrativos.",
    },
    {
        question: "Vocês atendem fora de Porto Alegre?",
        answer: "Sim. Temos sede em Porto Alegre mas atuamos em todo o território nacional. Já conduzimos operações em mais de 12 estados.",
    },
    {
        question: "Quanto tempo dura uma investigação?",
        answer: "Depende do caso. Investigações pontuais podem ser concluídas em 5 a 15 dias. Operações mais complexas, como rastreamento patrimonial ou suporte a litígios, podem levar de 30 a 90 dias.",
    },
    {
        question: "Quais formas de pagamento vocês aceitam?",
        answer: "Trabalhamos com PIX, transferência bancária e cartão de crédito em até 6x. Emitimos nota fiscal de todos os serviços prestados.",
    },
    {
        question: "Posso contratar para meu advogado usar?",
        answer: "Sim. Muitos de nossos clientes são escritórios de advocacia que nos contratam para produção de provas e inteligência em processos. Trabalhamos diretamente com a equipe jurídica do cliente.",
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
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="px-6 sm:px-8 py-16 sm:py-24 bg-surface">
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
                        Perguntas frequentes
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            className="service-card p-8 rounded-xl group service-icon-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Icon className="mb-5" animate={isHovered} />
            <h3 className="font-semibold text-lg text-text-primary mb-2">{service.title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">{service.desc}</p>
            <ArrowRight className="w-5 h-5 text-gold card-arrow" />
        </motion.div>
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
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-surface-card border border-border-subtle mb-4">
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
        <div className="pt-16 sm:pt-18">
            {/* Hero */}
            <section className="hero-gradient relative min-h-[85vh] flex items-center justify-center px-6 sm:px-8 py-20 sm:py-32">
                {/* Network background animation */}
                <NetworkBackground />
                
                {/* City background image */}
                <div className="hero-city-bg" aria-hidden="true" />

                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 tracking-tight text-gradient-headline"
                        style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
                    >
                        A informação certa muda o resultado.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-text-secondary text-lg max-w-2xl mx-auto mb-8"
                        style={{ lineHeight: 1.7, fontWeight: 400 }}
                    >
                        Investigação privada e inteligência para quem precisa de respostas — não de suposições.
                    </motion.p>

                    {/* Hero Badges */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="flex flex-wrap items-center justify-center gap-3 mb-10"
                    >
                        <div className="hero-badge">
                            <Check className="w-4 h-4" />
                            <span>Sigilo Total</span>
                        </div>
                        <div className="hero-badge">
                            <Check className="w-4 h-4" />
                            <span>100% Legal</span>
                        </div>
                        <div className="hero-badge">
                            <Check className="w-4 h-4" />
                            <span>Atuação Nacional</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <a
                            href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Gostaria de falar com um especialista.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto btn-primary text-base"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Fale com um especialista
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <Link
                            to="/servicos"
                            className="w-full sm:w-auto btn-secondary text-base"
                        >
                            Conheça os serviços
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>

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

            {/* Value Proposition */}
            <section className="px-6 sm:px-8 py-16 sm:py-24 bg-surface-alt">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        <motion.div {...fadeIn} className="text-center md:text-left">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-surface-card border border-border-subtle mb-5">
                                <Lock className="w-6 h-6 text-gold" strokeWidth={1.5} />
                            </div>
                            <h3 className="font-heading text-xl text-text-primary mb-3">Sigilo operacional</h3>
                            <p className="text-text-secondary text-sm leading-relaxed">
                                Toda interação é confidencial. Do primeiro contato à entrega do relatório.
                            </p>
                        </motion.div>
                        <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="text-center md:text-left">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-surface-card border border-border-subtle mb-5">
                                <Scale className="w-6 h-6 text-gold" strokeWidth={1.5} />
                            </div>
                            <h3 className="font-heading text-xl text-text-primary mb-3">Atuação dentro da lei</h3>
                            <p className="text-text-secondary text-sm leading-relaxed">
                                Operamos sob a Lei 13.432/2017. Resultados sólidos com metodologia legal.
                            </p>
                        </motion.div>
                        <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="text-center md:text-left">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-surface-card border border-border-subtle mb-5">
                                <Brain className="w-6 h-6 text-gold" strokeWidth={1.5} />
                            </div>
                            <h3 className="font-heading text-xl text-text-primary mb-3">Inteligência, não achismo</h3>
                            <p className="text-text-secondary text-sm leading-relaxed">
                                Cruzamos fontes abertas, registros públicos e inteligência humana para entregar fatos documentados.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="px-6 sm:px-8 py-16 sm:py-24 bg-surface">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeIn} className="text-center mb-12">
                        <span className="section-label">Serviços</span>
                        <TextReveal className="font-heading text-2xl sm:text-3xl text-text-primary">
                            O que resolvemos
                        </TextReveal>
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

            {/* How it works */}
            <section className="px-6 sm:px-8 py-16 sm:py-24 bg-surface-alt">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeIn} className="text-center mb-12">
                        <span className="section-label">Processo</span>
                        <TextReveal className="font-heading text-2xl sm:text-3xl text-text-primary">
                            Do primeiro contato ao relatório final
                        </TextReveal>
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

            {/* Testimonials Carousel */}
            <section className="px-6 sm:px-8 py-16 sm:py-24 bg-surface">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeIn} className="text-center mb-12">
                        <span className="section-label">Depoimentos</span>
                        <TextReveal className="font-heading text-2xl sm:text-3xl text-text-primary">
                            O que dizem nossos clientes
                        </TextReveal>
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
                                {/* Stars */}
                                <div className="testimonial-stars relative z-10 mt-4">
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

            {/* Geographic Coverage */}
            <section className="px-6 sm:px-8 py-16 sm:py-24 bg-surface-alt">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeIn} className="text-center mb-10">
                        <span className="section-label">Cobertura</span>
                        <TextReveal className="font-heading text-2xl sm:text-3xl text-text-primary">
                            Onde atuamos
                        </TextReveal>
                        <p className="text-text-secondary mt-4 max-w-xl mx-auto">
                            Sede em Porto Alegre — RS. Operações em todo o Brasil.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-wrap items-center justify-center gap-3"
                    >
                        {[
                            "Porto Alegre",
                            "Região Metropolitana",
                            "Litoral Gaúcho",
                            "Serra Gaúcha",
                            "Interior do RS",
                            "Santa Catarina",
                            "Paraná",
                            "São Paulo",
                            "Rio de Janeiro",
                            "Brasília",
                            "Minas Gerais",
                            "Nordeste",
                        ].map((region, i) => (
                            <span
                                key={region}
                                className="px-4 py-2 rounded-full bg-surface-card border border-border-subtle text-text-secondary text-sm hover:border-gold hover:text-gold transition-colors"
                            >
                                {region}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* FAQ */}
            <FAQSection />

            {/* Credibility */}
            <section className="credibility-section px-6 sm:px-8 py-20 bg-surface-alt">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div {...fadeIn}>
                            <span className="section-label">Credibilidade</span>
                            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
                                Equipe com background em investigação forense, inteligência de fontes abertas e análise financeira. 
                                Atuação em todo o território nacional. Relatórios aceitos como prova em processos judiciais e arbitragens.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="credibility-image hidden lg:block"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800"
                                alt="Mesa de trabalho de analista"
                                className="w-full h-64 object-cover rounded-xl"
                                loading="lazy"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="cta-gradient px-6 sm:px-8 py-20 sm:py-28 grid-pattern relative overflow-hidden">
                <div className="cta-bg-image" aria-hidden="true" />
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <motion.div {...fadeIn}>
                        <span className="section-label">Comece agora</span>
                        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-text-primary mb-4">
                            Pronto para ter clareza sobre a situação?
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
