import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
    Quote,
    Mail,
} from "lucide-react";

const PHONE = "555131641004";
const EMAIL = "bscy@pm.me";

const SERVICES = [
    {
        icon: Search,
        title: "Investigação patrimonial",
        desc: "Rastreamento de bens, empresas de fachada e patrimônio oculto.",
    },
    {
        icon: FileCheck,
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
        title: "Contato confidencial",
        desc: "Você fala com um especialista. Tudo sob sigilo desde o primeiro minuto.",
    },
    {
        num: "02",
        title: "Avaliação do caso",
        desc: "Entendemos a situação, definimos o que é viável e apresentamos um plano.",
    },
    {
        num: "03",
        title: "Execução da operação",
        desc: "Nossa equipe coleta, analisa e cruza informações em campo e no digital.",
    },
    {
        num: "04",
        title: "Entrega do dossiê",
        desc: "Relatório completo com provas documentadas, pronto para uso jurídico.",
    },
];

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
};

export function Home() {
    return (
        <div className="pt-16 sm:pt-18">
            {/* Hero */}
            <section className="relative min-h-[80vh] flex items-center justify-center px-5 sm:px-8 py-20 sm:py-32">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-primary leading-tight mb-6"
                    >
                        A informação certa muda o resultado.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        Investigação privada e inteligência para quem precisa de respostas — não de suposições.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <a
                            href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Gostaria de falar com um especialista.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-text-primary text-surface font-semibold text-base px-8 py-4 rounded-xl hover:bg-text-secondary transition-colors"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Fale com um especialista
                        </a>
                        <Link
                            to="/servicos"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-border-muted text-text-primary font-semibold text-base px-8 py-4 rounded-xl hover:bg-surface-card transition-colors"
                        >
                            Conheça os serviços
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Value Proposition */}
            <section className="px-5 sm:px-8 py-16 sm:py-24 bg-surface-elevated">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        <motion.div {...fadeIn} className="text-center md:text-left">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-surface-card border border-border-subtle mb-4">
                                <Lock className="w-6 h-6 text-brand" />
                            </div>
                            <h3 className="font-heading text-xl text-text-primary mb-2">Sigilo operacional</h3>
                            <p className="text-text-secondary text-sm leading-relaxed">
                                Toda interação é confidencial. Do primeiro contato à entrega do relatório.
                            </p>
                        </motion.div>
                        <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="text-center md:text-left">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-surface-card border border-border-subtle mb-4">
                                <Scale className="w-6 h-6 text-brand" />
                            </div>
                            <h3 className="font-heading text-xl text-text-primary mb-2">Atuação dentro da lei</h3>
                            <p className="text-text-secondary text-sm leading-relaxed">
                                Operamos sob a Lei 13.432/2017. Resultados sólidos com metodologia legal.
                            </p>
                        </motion.div>
                        <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="text-center md:text-left">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-surface-card border border-border-subtle mb-4">
                                <Brain className="w-6 h-6 text-brand" />
                            </div>
                            <h3 className="font-heading text-xl text-text-primary mb-2">Inteligência, não achismo</h3>
                            <p className="text-text-secondary text-sm leading-relaxed">
                                Cruzamos fontes abertas, registros públicos e inteligência humana para entregar fatos documentados.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="px-5 sm:px-8 py-16 sm:py-24">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeIn} className="text-center mb-12">
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary mb-3">O que resolvemos</h2>
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
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                    className="p-6 rounded-xl bg-surface-card border border-border-subtle hover:border-brand/30 transition-colors"
                                >
                                    <Icon className="w-6 h-6 text-brand mb-4" />
                                    <h3 className="font-semibold text-text-primary mb-2">{service.title}</h3>
                                    <p className="text-text-secondary text-sm leading-relaxed">{service.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                    <motion.div {...fadeIn} className="text-center mt-8">
                        <Link
                            to="/servicos"
                            className="inline-flex items-center gap-2 text-brand hover:text-brand-hover font-medium text-sm transition-colors"
                        >
                            Ver todos os serviços
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* How it works */}
            <section className="px-5 sm:px-8 py-16 sm:py-24 bg-surface-elevated">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeIn} className="text-center mb-12">
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary mb-3">
                            Do primeiro contato ao relatório final
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {STEPS.map((step, i) => (
                            <motion.div
                                key={step.num}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className="relative"
                            >
                                <span className="text-5xl font-heading text-brand/20 mb-2 block">{step.num}</span>
                                <h3 className="font-semibold text-text-primary mb-2">{step.title}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                    <motion.div {...fadeIn} className="text-center mt-10">
                        <a
                            href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Gostaria de uma avaliação confidencial do meu caso.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-brand hover:text-brand-hover font-medium text-sm transition-colors"
                        >
                            Fale conosco para uma avaliação
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Credibility */}
            <section className="px-5 sm:px-8 py-16 sm:py-24 border-y border-border-subtle">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.p
                        {...fadeIn}
                        className="text-text-secondary text-base sm:text-lg leading-relaxed mb-10"
                    >
                        Equipe com background em investigação forense, inteligência de fontes abertas e análise financeira. 
                        Atuação em todo o território nacional. Relatórios aceitos como prova em processos judiciais e arbitragens.
                    </motion.p>
                    <motion.div
                        {...fadeIn}
                        className="bg-surface-card border border-border-subtle rounded-xl p-6 sm:p-8"
                    >
                        <Quote className="w-8 h-8 text-brand/50 mx-auto mb-4" />
                        <p className="text-text-primary text-base sm:text-lg italic leading-relaxed mb-4">
                            "A equipe entendeu a complexidade do caso e entregou em 12 dias o que meu advogado tentava há 8 meses."
                        </p>
                        <p className="text-text-muted text-sm">
                            — Cliente confidencial, Diretor Jurídico
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="px-5 sm:px-8 py-20 sm:py-28 bg-surface-elevated">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.h2
                        {...fadeIn}
                        className="font-heading text-2xl sm:text-3xl md:text-4xl text-text-primary mb-4"
                    >
                        Tem uma situação que precisa resolver?
                    </motion.h2>
                    <motion.p
                        {...fadeIn}
                        className="text-text-secondary text-base sm:text-lg mb-10"
                    >
                        Entre em contato para uma avaliação confidencial. Sem compromisso.
                    </motion.p>
                    <motion.div
                        {...fadeIn}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <a
                            href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Gostaria de falar com um especialista.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-text-primary text-surface font-semibold text-base px-8 py-4 rounded-xl hover:bg-text-secondary transition-colors"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Falar pelo WhatsApp
                        </a>
                        <a
                            href={`mailto:${EMAIL}`}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-border-muted text-text-primary font-semibold text-base px-8 py-4 rounded-xl hover:bg-surface-card transition-colors"
                        >
                            <Mail className="w-5 h-5" />
                            Enviar email criptografado
                        </a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
