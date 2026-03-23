import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
    MessageCircle,
    ArrowRight,
    Lock,
    Scale,
    Brain,
    Search,
    FileCheck,
    Gavel,
    TrendingUp,
    Heart,
    Globe,
    Mail,
    Check,
    ShieldCheck,
    Map,
    Radar,
    FileText,
    AlertTriangle,
} from "lucide-react";

const PHONE = "555131641004";
const EMAIL = "bscy@pm.me";

// Image URLs
const IMAGES = {
    operationsCenter: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wddwdw%281%29-jrhvOUbjJ0QHEcDXRSlEqCDVvST5xH.png",
    adversaryGroup: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/adversary-group-LDMy9ZdFpdsPlgCixC0IRSKVMgxU1D.png",
    urgencyBg: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/urgency-bg-t2Zqubwhjc8bjK1SYGxf2E3AwPtbOt.png",
    dataEngineer: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/data-engineer-analyse-datasets-multiple-monitor-aig41-N3L3bLzSta22ppGOe0EIj7ehHQPJH3.jpg",
    iconLock: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/681b04ef179e21ce78452075_036-lock-SRSFzsZRkdvpWlfb6jh72JytTW3waQ.png",
    iconHacker: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/681b00e1acd27c89a25e0301_023-hacker-j4oNq2Vq6OcImmIVvJevG7X52NhUMZ.png",
    iconShield: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/681b0836c7dd7b00fc37de2e_058-shield-yAYyco3pvnwn0wC8qgad1eBiIsRKHm.png",
};

const SERVICES = [
    {
        icon: Search,
        title: "Investigação patrimonial",
        desc: "Rastreamento de bens, empresas de fachada e patrimônio oculto.",
    },
    {
        icon: ShieldCheck,
        title: "Due diligence",
        desc: "Verificação profunda de pessoas e empresas antes de decisões críticas.",
    },
    {
        icon: Gavel,
        title: "Suporte a litígios",
        desc: "Produção de provas e inteligência para disputas judiciais e arbitragens.",
    },
    {
        icon: TrendingUp,
        title: "Inteligência financeira",
        desc: "Investigação de desvios, movimentações suspeitas e fraude societária.",
    },
    {
        icon: Heart,
        title: "Investigação conjugal",
        desc: "Monitoramento, levantamento de provas e documentação para casos pessoais.",
    },
    {
        icon: Globe,
        title: "Investigação digital",
        desc: "Análise de pegada digital, redes sociais, domínios e rastros online.",
    },
];

const STEPS = [
    {
        num: "01",
        icon: MessageCircle,
        title: "Contato confidencial",
        desc: "Você fala com um especialista. Tudo sob sigilo desde o primeiro minuto.",
    },
    {
        num: "02",
        icon: Map,
        title: "Avaliação do caso",
        desc: "Entendemos a situação, definimos o que é viável e apresentamos um plano.",
    },
    {
        num: "03",
        icon: Radar,
        title: "Execução da operação",
        desc: "Nossa equipe coleta, analisa e cruza informações em campo e no digital.",
    },
    {
        num: "04",
        icon: FileText,
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

const THREATS = [
    "Sócios desviando recursos da empresa",
    "Ex-cônjuge ocultando patrimônio",
    "Parceiro comercial com histórico oculto",
    "Funcionário vazando informações sensíveis",
];

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" },
};

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

export function Home() {
    return (
        <div className="pt-16 sm:pt-18">
            {/* Hero with Background Image */}
            <section className="relative min-h-[90vh] flex items-center justify-center px-6 sm:px-8 py-20 sm:py-32 overflow-hidden">
                {/* Background Image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ 
                        backgroundImage: `url(${IMAGES.operationsCenter})`,
                    }}
                />
                {/* Dark Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/80 to-[#0a0a0a]" />
                {/* Mesh gradient overlay */}
                <div className="absolute inset-0 hero-gradient opacity-60" />
                
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
                            <img src={IMAGES.iconLock} alt="" className="w-4 h-4 invert opacity-80" />
                            <span>Sigilo Total</span>
                        </div>
                        <div className="hero-badge">
                            <img src={IMAGES.iconShield} alt="" className="w-4 h-4 invert opacity-80" />
                            <span>100% Legal</span>
                        </div>
                        <div className="hero-badge">
                            <img src={IMAGES.iconHacker} alt="" className="w-4 h-4 invert opacity-80" />
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
            <section className="metrics-section px-6 sm:px-8 py-16 sm:py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {METRICS.map((metric, i) => (
                            <motion.div
                                key={metric.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="text-center"
                            >
                                <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                                <p className="counter-label">{metric.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why You Need Us - with Adversary Image */}
            <section className="relative px-6 sm:px-8 py-20 sm:py-28 bg-surface overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Content */}
                        <motion.div {...fadeIn}>
                            <span className="section-label">Por que agir agora</span>
                            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-text-primary mb-6">
                                Enquanto você espera, alguém está agindo contra você.
                            </h2>
                            <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-8">
                                Fraudes, desvios e ocultação de patrimônio não acontecem por acaso. 
                                Quem quer esconder algo age rápido. Você também deveria.
                            </p>
                            <ul className="flex flex-col gap-4 mb-8">
                                {THREATS.map((threat, i) => (
                                    <motion.li
                                        key={threat}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                        className="flex items-start gap-3 text-text-secondary"
                                    >
                                        <AlertTriangle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                        <span>{threat}</span>
                                    </motion.li>
                                ))}
                            </ul>
                            <a
                                href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Preciso de uma avaliação urgente.")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary text-base"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Solicitar avaliação urgente
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </motion.div>

                        {/* Adversary Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative rounded-2xl overflow-hidden">
                                <img 
                                    src={IMAGES.adversaryGroup} 
                                    alt="Ameaças digitais" 
                                    className="w-full h-auto"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Value Proposition */}
            <section className="px-6 sm:px-8 py-16 sm:py-24 bg-surface-alt">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        <motion.div {...fadeIn} className="text-center md:text-left">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-surface-card border border-border-subtle mb-5">
                                <img src={IMAGES.iconLock} alt="" className="w-7 h-7 opacity-80" style={{ filter: "invert(73%) sepia(57%) saturate(394%) hue-rotate(9deg) brightness(92%) contrast(91%)" }} />
                            </div>
                            <h3 className="font-heading text-xl text-text-primary mb-3">Sigilo operacional</h3>
                            <p className="text-text-secondary text-sm leading-relaxed">
                                Toda interação é confidencial. Do primeiro contato à entrega do relatório.
                            </p>
                        </motion.div>
                        <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="text-center md:text-left">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-surface-card border border-border-subtle mb-5">
                                <img src={IMAGES.iconShield} alt="" className="w-7 h-7 opacity-80" style={{ filter: "invert(73%) sepia(57%) saturate(394%) hue-rotate(9deg) brightness(92%) contrast(91%)" }} />
                            </div>
                            <h3 className="font-heading text-xl text-text-primary mb-3">Atuação dentro da lei</h3>
                            <p className="text-text-secondary text-sm leading-relaxed">
                                Operamos sob a Lei 13.432/2017. Resultados sólidos com metodologia legal.
                            </p>
                        </motion.div>
                        <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="text-center md:text-left">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-surface-card border border-border-subtle mb-5">
                                <img src={IMAGES.iconHacker} alt="" className="w-7 h-7 opacity-80" style={{ filter: "invert(73%) sepia(57%) saturate(394%) hue-rotate(9deg) brightness(92%) contrast(91%)" }} />
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
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary">O que resolvemos</h2>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {SERVICES.map((service, i) => {
                            const Icon = service.icon;
                            return (
                                <motion.div
                                    key={service.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                                    className="service-card p-8 rounded-xl group"
                                >
                                    <Icon className="w-8 h-8 text-text-secondary card-icon mb-5" strokeWidth={1.5} />
                                    <h3 className="font-semibold text-lg text-text-primary mb-2">{service.title}</h3>
                                    <p className="text-text-secondary text-sm leading-relaxed mb-4">{service.desc}</p>
                                    <ArrowRight className="w-5 h-5 text-gold card-arrow" />
                                </motion.div>
                            );
                        })}
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
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary">
                            Do primeiro contato ao relatório final
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {STEPS.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={step.num}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                                    className="process-card"
                                >
                                    <span className="process-card-number">{step.num}</span>
                                    <div className="relative z-10">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-surface-card border border-border-subtle mb-4">
                                            <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                                        </div>
                                        <h3 className="font-semibold text-text-primary mb-2">{step.title}</h3>
                                        <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
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
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary">
                            O que dizem nossos clientes
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
                                <p className="text-text-primary text-base leading-relaxed mb-6 relative z-10">
                                    {testimonial.text}
                                </p>
                                <div className="flex items-center gap-3">
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

            {/* Credibility with Image */}
            <section className="relative px-6 sm:px-8 py-20 sm:py-28 bg-surface-alt overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative order-2 lg:order-1"
                        >
                            <div className="relative rounded-2xl overflow-hidden">
                                <img 
                                    src={IMAGES.dataEngineer} 
                                    alt="Analista de inteligência" 
                                    className="w-full h-auto"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 via-transparent to-transparent" />
                            </div>
                        </motion.div>

                        {/* Content */}
                        <motion.div {...fadeIn} className="order-1 lg:order-2">
                            <span className="section-label">Credibilidade</span>
                            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-text-primary mb-6">
                                Profissionais com background em inteligência
                            </h2>
                            <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-6">
                                Equipe com experiência em investigação forense, inteligência de fontes abertas e análise financeira. 
                                Atuação em todo o território nacional.
                            </p>
                            <ul className="flex flex-col gap-3 mb-8">
                                <li className="flex items-center gap-3 text-text-secondary">
                                    <Check className="w-5 h-5 text-gold flex-shrink-0" />
                                    <span>Relatórios aceitos como prova judicial</span>
                                </li>
                                <li className="flex items-center gap-3 text-text-secondary">
                                    <Check className="w-5 h-5 text-gold flex-shrink-0" />
                                    <span>Operação dentro da Lei 13.432/2017</span>
                                </li>
                                <li className="flex items-center gap-3 text-text-secondary">
                                    <Check className="w-5 h-5 text-gold flex-shrink-0" />
                                    <span>Metodologia forense documentada</span>
                                </li>
                            </ul>
                            <Link
                                to="/sobre"
                                className="inline-flex items-center gap-2 text-gold hover:text-[#d4ac5a] font-medium text-sm transition-colors"
                            >
                                Conheça nossa equipe
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Final CTA with Background Image */}
            <section className="relative px-6 sm:px-8 py-20 sm:py-28 overflow-hidden">
                {/* Background Image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ 
                        backgroundImage: `url(${IMAGES.urgencyBg})`,
                    }}
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/90 to-[#0a0a0a]/80" />
                {/* Grid Pattern */}
                <div className="absolute inset-0 grid-pattern opacity-30" />
                
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="section-label">Próximo passo</span>
                        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-text-primary mb-4">
                            Você merece respostas.
                        </h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-text-secondary text-base sm:text-lg mb-10"
                    >
                        Fale agora com um especialista. Avaliação confidencial, sem compromisso.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <a
                            href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Gostaria de uma avaliação confidencial.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto btn-primary text-base"
                        >
                            <MessageCircle className="w-5 h-5" />
                            WhatsApp: Fale agora
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <a
                            href={`mailto:${EMAIL}`}
                            className="w-full sm:w-auto btn-secondary text-base"
                        >
                            <Mail className="w-5 h-5" />
                            E-mail criptografado
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-text-muted text-xs mt-8"
                    >
                        Sigilo desde o primeiro contato. Não registramos ligações. Comunicação criptografada disponível.
                    </motion.p>
                </div>
            </section>
        </div>
    );
}
