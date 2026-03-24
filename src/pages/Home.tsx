import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
    MessageCircle,
    ArrowRight,
    Check,
    Star,
    ChevronDown,
    Shield,
    Clock,
    MapPin,
    Heart,
    Search,
    Briefcase,
    Laptop,
    Scale,
    Users,
    FileText,
    BadgeCheck,
} from "lucide-react";
import { NetworkBackground } from "../components/NetworkBackground";

const PHONE = "551131641004";

const SERVICES = [
    {
        icon: Heart,
        title: "Investigacao Conjugal",
        desc: "Descubra a verdade sobre seu relacionamento com provas concretas de traicao, flagrantes de adulterio e relatorios detalhados.",
        features: ["Flagrantes em foto e video", "Monitoramento discreto", "Relatorio completo"],
        slug: "investigacao-conjugal",
    },
    {
        icon: Search,
        title: "Localizacao de Pessoas",
        desc: "Encontramos pessoas desaparecidas, devedores, pais biologicos, golpistas e individuos que nao desejam ser encontrados.",
        features: ["Rastreamento avancado", "Localizacao de golpistas", "Busca de familiares"],
        slug: "localizacao-pessoas",
    },
    {
        icon: Briefcase,
        title: "Investigacao Empresarial",
        desc: "Proteja sua empresa contra fraudes, corrupcao, desvios e praticas antieticas de funcionarios ou socios.",
        features: ["Combate a fraudes", "Verificacao de socios", "Due diligence"],
        slug: "investigacao-empresarial",
    },
    {
        icon: Scale,
        title: "Investigacao Trabalhista",
        desc: "Comprove fraudes em auxilio-doenca, acidentes de trabalho falsos e funcionarios que trabalham durante afastamento.",
        features: ["Flagrantes de fraude", "Documentacao legal", "Provas para RH"],
        slug: "investigacao-trabalhista",
    },
    {
        icon: Laptop,
        title: "Investigacao Virtual",
        desc: "Descobrimos perfis ocultos em redes sociais, sites de relacionamento adulto e atividades suspeitas online.",
        features: ["Perfis ocultos", "Redes sociais", "Rastreamento digital"],
        slug: "investigacao-virtual",
    },
    {
        icon: Users,
        title: "Localizacao de Golpistas",
        desc: "Encontramos criminosos que aplicam golpes do Pix, veiculos, emprestimos falsos e estelionato em geral.",
        features: ["Golpes financeiros", "Rastreamento de PIX", "Recuperacao de dados"],
        slug: "localizacao-golpistas",
    },
    {
        icon: FileText,
        title: "Exoneracao de Pensao",
        desc: "Reunimos provas para solicitar exoneracao de pensao alimenticia de forma legal e eficaz.",
        features: ["Provas de renda", "Novo relacionamento", "Documentacao judicial"],
        slug: "exoneracao-pensao",
    },
    {
        icon: BadgeCheck,
        title: "Provas para Advogados",
        desc: "Coleta profissional de provas e evidencias validas para fortalecer processos judiciais.",
        features: ["Provas validas", "Relatorios tecnicos", "Suporte em audiencias"],
        slug: "provas-advogados",
    },
];

const METRICS = [
    { value: 255, suffix: "+", label: "Casos Resolvidos" },
    { value: 10, suffix: "+", label: "Anos de Experiencia" },
    { value: 100, suffix: "%", label: "Sigilo Garantido" },
    { value: 12, suffix: "+", label: "Estados Atendidos" },
];

const TESTIMONIALS = [
    {
        text: "Depois de meses de suspeitas, finalmente tive a confirmacao que precisava. O trabalho foi rapido e totalmente sigiloso. Agradeco muito pela profissionalidade.",
        name: "Maria S.",
        location: "Sao Paulo, SP",
        type: "Investigacao Conjugal",
    },
    {
        text: "Minha empresa estava tendo prejuizos inexplicaveis. A Bforense descobriu um funcionario que desviava mercadorias ha 2 anos. Provas completas para a justica.",
        name: "Roberto C.",
        location: "Rio de Janeiro, RJ",
        type: "Investigacao Empresarial",
    },
    {
        text: "Consegui encontrar meu pai biologico depois de 30 anos. Um trabalho sensivel e profissional. Sou eternamente grata pela competencia da equipe.",
        name: "Ana Paula L.",
        location: "Belo Horizonte, MG",
        type: "Localizacao de Pessoas",
    },
    {
        text: "O ex funcionario alegava invalidez mas foi flagrado trabalhando normalmente. As provas coletadas foram fundamentais para o processo trabalhista.",
        name: "Carlos M.",
        location: "Curitiba, PR",
        type: "Investigacao Trabalhista",
    },
];

const FAQ_ITEMS = [
    {
        question: "Qual o preco de um Detetive Particular?",
        answer: "O investimento varia conforme a complexidade do caso, tempo de investigacao e recursos necessarios. Apos uma conversa inicial gratuita, apresentamos um orcamento detalhado e transparente. Valores a partir de R$1.500 para investigacoes pontuais. Aceitamos PIX, transferencia e cartao em ate 6x.",
    },
    {
        question: "E licito contratar um Detetive Particular?",
        answer: "Sim. A profissao de detetive particular e regulamentada pela Lei Federal 13.432/2017. Todos os nossos metodos operam dentro da legalidade e os relatorios sao aceitos como prova em processos judiciais, arbitragens e procedimentos administrativos.",
    },
    {
        question: "Quanto tempo demora uma investigacao conjugal?",
        answer: "Em media, investigacoes conjugais levam de 5 a 15 dias para obter provas conclusivas. Casos mais complexos podem levar ate 30 dias. Mantemos voce informado sobre o andamento durante todo o processo.",
    },
    {
        question: "As provas coletadas valem na justica?",
        answer: "Sim. Todos os nossos relatorios sao elaborados com rigor documental e metodologia que atende aos requisitos para utilizacao como prova em processos judiciais. Trabalhamos em conjunto com seu advogado quando necessario.",
    },
    {
        question: "Como funciona o sigilo das informacoes?",
        answer: "Toda comunicacao e feita por canais seguros e criptografados. Nao armazenamos dados alem do necessario para a operacao. Relatorios sao entregues em formato seguro e deletados de nossos servidores apos a entrega.",
    },
    {
        question: "Voces atendem em qual regiao?",
        answer: "Temos sede em Sao Paulo mas atuamos em todo o territorio nacional. Ja conduzimos operacoes em mais de 12 estados brasileiros, incluindo todas as capitais.",
    },
    {
        question: "E possivel clonar o WhatsApp do meu parceiro?",
        answer: "NAO. Clonagem de WhatsApp sem acesso fisico ao aparelho e GOLPE. Nao oferecemos esse servico pois e ilegal. Desconfie de qualquer empresa que prometa isso. Trabalhamos apenas com metodos legais e eticos.",
    },
    {
        question: "Como solicito um orcamento?",
        answer: "Basta clicar no botao de WhatsApp e enviar uma mensagem. Um de nossos especialistas respondera em ate 30 minutos durante o horario comercial. A conversa inicial e totalmente gratuita e sigilosa.",
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
        <div className="border border-border-subtle rounded-xl mb-3 overflow-hidden bg-elevation hover:border-gold/30 transition-colors">
            <button
                onClick={onClick}
                className="w-full p-5 flex items-center justify-between text-left group"
            >
                <span className="font-medium text-text-primary group-hover:text-gold transition-colors pr-4">
                    {item.question}
                </span>
                <ChevronDown
                    className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-5 px-5" : "max-h-0"}`}
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
                    className="text-center mb-12"
                >
                    <span className="section-label">Duvidas Frequentes</span>
                    <h2 className="font-heading text-2xl sm:text-3xl text-text-primary">
                        Perguntas <span className="text-gold-accent">Frequentes</span>
                    </h2>
                    <p className="text-text-secondary mt-4">
                        Tire suas duvidas sobre nossos servicos de investigacao particular.
                    </p>
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

// Service Card
function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
    const Icon = service.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            className="service-card p-6 rounded-xl group h-full flex flex-col"
        >
            <div className="icon-container-gold mb-4" style={{ width: 48, height: 48, borderRadius: 12 }}>
                <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
            </div>
            <h3 className="font-semibold text-lg text-text-primary mb-2">{service.title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">{service.desc}</p>
            <ul className="space-y-2">
                {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                        <Check className="w-4 h-4 text-gold flex-shrink-0" />
                        {feature}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}

// Testimonial Card
function TestimonialCard({ testimonial, index }: { testimonial: typeof TESTIMONIALS[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="testimonial-card"
        >
            <span className="testimonial-quote">"</span>
            {/* Type badge */}
            <div className="relative z-10 mt-4 mb-3">
                <span className="inline-block px-3 py-1 bg-gold/10 border border-gold/20 rounded-full text-gold text-xs font-medium">
                    {testimonial.type}
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
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                    <p className="text-text-primary text-sm font-medium">{testimonial.name}</p>
                    <p className="text-text-muted text-xs">{testimonial.location}</p>
                </div>
            </div>
        </motion.div>
    );
}

export function Home() {
    return (
        <div className="pt-16 sm:pt-18 pb-20 md:pb-0">
            {/* Warning Banner */}
            <div className="bg-red-950/50 border-b border-red-900/50 px-4 py-3">
                <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 text-center">
                    <Shield className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <p className="text-red-200 text-sm">
                        <span className="font-semibold">CUIDADO COM GOLPES!</span> Clone de WhatsApp sem acesso ao celular e GOLPE. Nao caia nessa armadilha.
                    </p>
                </div>
            </div>

            {/* Hero */}
            <section className="hero-section relative min-h-screen overflow-hidden">
                {/* Absolute background layer */}
                <div className="absolute inset-0 hero-gradient" />
                <NetworkBackground />

                {/* Grid pattern subtle */}
                <div className="absolute inset-0 hero-grid-overlay pointer-events-none" aria-hidden="true" />

                {/* Mobile background image */}
                <div className="hero-mobile-bg md:hidden" aria-hidden="true" />

                {/* Desktop fullbleed image right half */}
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

                {/* Content left side */}
                <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 min-h-screen flex flex-col justify-start pt-24 md:justify-center md:pt-0 pb-0 md:pb-0">
                    <div className="md:max-w-[50%] lg:max-w-[48%]">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-6"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full text-gold text-sm font-medium">
                                <Shield className="w-4 h-4" />
                                Desde 2015 - Sigilo Absoluto
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="font-heading text-[2rem] sm:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] leading-[1.1] mb-6 tracking-tight"
                            style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
                        >
                            <span className="text-white">Descubra a Verdade que Voce </span>
                            <span className="text-gold-accent">Precisa Saber</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-[#b0ada8] text-base lg:text-lg max-w-lg mb-6"
                            style={{ lineHeight: 1.75 }}
                        >
                            Investigacao particular profissional com provas validas na justica. Resolva suas duvidas com quem ja solucionou mais de 255 casos em todo o Brasil.
                        </motion.p>

                        {/* Trust badges inline */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-wrap items-center gap-4 mb-8"
                        >
                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                                <Check className="w-4 h-4 text-gold" />
                                Provas Validas na Justica
                            </div>
                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                                <MapPin className="w-4 h-4 text-gold" />
                                Atendimento em Todo Brasil
                            </div>
                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                                <Shield className="w-4 h-4 text-gold" />
                                100% Sigiloso
                            </div>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6"
                        >
                            <a
                                href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Ola! Gostaria de falar com um detetive para avaliar meu caso.")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary text-base group"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Falar com Detetive Agora
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <Link to="/servicos" className="btn-secondary text-base">
                                Ver Servicos
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                        
                        {/* Response time */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            className="flex items-center gap-2 text-sm text-text-secondary"
                        >
                            <Clock className="w-4 h-4 text-gold" />
                            Orcamento gratuito - Resposta em ate 30 minutos
                        </motion.div>

                    </div>
                </div>

                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000000] to-transparent z-20 pointer-events-none" />
            </section>

            {/* Metrics Section */}
            <section className="metrics-section metrics-grid-pattern px-6 sm:px-8 py-16 sm:py-20 bg-elevation">
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

            {/* Services */}
            <section className="px-6 sm:px-8 py-20 sm:py-28 bg-surface section-glow-bg relative overflow-hidden">
                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div {...fadeIn} className="text-center mb-6">
                        <span className="section-label">Nossos Servicos</span>
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary">
                            Investigacoes Profissionais para <span className="text-gold-accent">Cada Situacao</span>
                        </h2>
                        <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
                            Oferecemos solucoes completas com sigilo absoluto e provas validas na justica.
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
                        {SERVICES.map((service, i) => (
                            <ServiceCard key={service.title} service={service} index={i} />
                        ))}
                    </div>
                    <motion.div {...fadeIn} className="text-center mt-12">
                        <p className="text-text-secondary mb-4">Nao encontrou o que procura? Atendemos diversos tipos de investigacao.</p>
                        <a
                            href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Ola! Gostaria de consultar um especialista sobre meu caso.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-gold hover:text-[#d4ac5a] font-medium text-sm transition-colors"
                        >
                            Consultar Especialista
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Divider */}
            <div className="section-divider-glow" />

            {/* Testimonials Section */}
            <section className="px-6 sm:px-8 py-20 sm:py-28 bg-surface-alt">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeIn} className="text-center mb-6">
                        <span className="section-label">Depoimentos</span>
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary">
                            Historias Reais de <span className="text-gold-accent">Clientes Satisfeitos</span>
                        </h2>
                        <p className="text-text-secondary mt-4">
                            Conheca alguns dos milhares de casos que ja resolvemos com discricao e profissionalismo.
                        </p>
                    </motion.div>

                    {/* Stats row */}
                    <motion.div 
                        {...fadeIn}
                        className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12 mt-8"
                    >
                        <div className="text-center p-4 bg-elevation rounded-xl border border-border-subtle">
                            <p className="text-2xl font-bold text-gold">87%</p>
                            <p className="text-xs text-text-secondary mt-1">Taxa de Sucesso em Casos Conjugais</p>
                        </div>
                        <div className="text-center p-4 bg-elevation rounded-xl border border-border-subtle">
                            <p className="text-2xl font-bold text-gold">15 dias</p>
                            <p className="text-xs text-text-secondary mt-1">Tempo Medio de Resolucao</p>
                        </div>
                        <div className="text-center p-4 bg-elevation rounded-xl border border-border-subtle">
                            <p className="text-2xl font-bold text-gold">4.9/5</p>
                            <p className="text-xs text-text-secondary mt-1">Avaliacao dos Clientes</p>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {TESTIMONIALS.map((testimonial, i) => (
                            <TestimonialCard key={i} testimonial={testimonial} index={i} />
                        ))}
                    </div>

                    <motion.p {...fadeIn} className="text-center text-text-muted text-xs mt-8">
                        * Nomes alterados para preservar a identidade dos clientes. Todos os depoimentos sao reais.
                    </motion.p>
                </div>
            </section>

            {/* Divider */}
            <div className="section-divider-glow" />

            {/* FAQ */}
            <FAQSection />

            {/* Divider */}
            <div className="section-divider-glow" />

            {/* Final CTA */}
            <section className="cta-gradient px-6 sm:px-8 py-24 sm:py-32 grid-pattern relative overflow-hidden">
                <div className="cta-bg-image" aria-hidden="true" />
                <div className="glow-orb glow-orb-lg animate-pulse-glow" style={{ top: "30%", left: "10%" }} aria-hidden="true" />
                <div className="glow-orb glow-orb-sm animate-float-slow" style={{ bottom: "20%", right: "15%" }} aria-hidden="true" />
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <motion.div {...fadeIn}>
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-xs font-medium mb-6">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Atendimento disponivel agora
                        </span>
                        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-text-primary mb-4">
                            Nao Fique com Duvidas. <span className="text-gold-accent">Descubra a Verdade Agora.</span>
                        </h2>
                        <p className="text-text-secondary mb-8 max-w-xl mx-auto">
                            Cada dia que passa pode significar mais provas perdidas. Converse com um especialista e resolva seu caso com sigilo e profissionalismo.
                        </p>

                        {/* Trust badges */}
                        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                                <Check className="w-4 h-4 text-gold" />
                                Orcamento Gratuito
                            </div>
                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                                <Clock className="w-4 h-4 text-gold" />
                                Resposta em 30 minutos
                            </div>
                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                                <Shield className="w-4 h-4 text-gold" />
                                Sigilo Absoluto
                            </div>
                        </div>

                        <a
                            href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Ola! Gostaria de falar com um detetive para avaliar meu caso.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto btn-primary text-base inline-flex"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Falar com Detetive pelo WhatsApp
                            <ArrowRight className="w-4 h-4" />
                        </a>

                        <p className="text-text-muted text-sm mt-6">
                            Atendemos em todo o Brasil - WhatsApp: (11) 3164-1004
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
