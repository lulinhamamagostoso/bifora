import { motion } from "framer-motion";
import { MessageCircle, Search, ShieldCheck, Gavel, TrendingUp, Heart, Globe, ArrowRight } from "lucide-react";

const PHONE = "555131641004";

const SERVICES = [
    {
        icon: Search,
        title: "Investigação patrimonial",
        desc: "Rastreamento de bens, empresas de fachada, laranjas e estruturas offshore. Identificamos quem realmente controla os ativos — mesmo quando não há rastro em papel.",
        bullets: [
            "Mapeamento de CNPJs e participações societárias ocultas",
            "Identificação de testas-de-ferro e estruturas de blindagem",
            "Relatório com cadeia de propriedade documentada",
        ],
    },
    {
        icon: ShieldCheck,
        title: "Due diligence",
        desc: "Verificação profunda de pessoas e empresas antes de decisões críticas. Vamos além do Google e dos registros públicos.",
        bullets: [
            "Background check de sócios, parceiros e executivos",
            "Análise de reputação, litígios, dívidas e vínculos ocultos",
            "Verificação de credenciais e histórico profissional",
        ],
    },
    {
        icon: Gavel,
        title: "Suporte a litígios",
        desc: "Produção de provas e inteligência estratégica para disputas judiciais, arbitragens e processos de alta complexidade.",
        bullets: [
            "Acervo probatório robusto para litígios e arbitragens",
            "Investigação de testemunhas, peritos e partes adversas",
            "Inteligência para fundamentar teses jurídicas",
        ],
    },
    {
        icon: TrendingUp,
        title: "Inteligência financeira",
        desc: "Investigação de movimentações suspeitas, desvios de capital, fraude societária e lavagem de dinheiro. Seguimos o dinheiro até o destino final.",
        bullets: [
            "Rastreamento de fluxos financeiros e transações atípicas",
            "Análise de contas intermediárias e padrões de movimentação",
            "Evidências para suporte jurídico e contábil",
        ],
    },
    {
        icon: Heart,
        title: "Investigação conjugal",
        desc: "Monitoramento discreto, coleta de provas e documentação completa para casos de infidelidade e questões pessoais. Sigilo absoluto.",
        bullets: [
            "Monitoramento e levantamento de provas em campo",
            "Documentação fotográfica e relatório detalhado",
            "Material aceito como prova judicial",
        ],
    },
    {
        icon: Globe,
        title: "Investigação digital",
        desc: "Análise de pegada digital, redes sociais, domínios, registros e rastros online. Tudo que alguém tenta esconder na internet, nós encontramos.",
        bullets: [
            "Mapeamento de presença digital e perfis vinculados",
            "Análise de domínios, registros e infraestrutura web",
            "Recuperação de conteúdo deletado e análise de metadados",
        ],
    },
];

export function Servicos() {
    return (
        <div className="pt-16 sm:pt-18">
            {/* Hero */}
            <section className="hero-gradient px-6 sm:px-8 py-16 sm:py-24">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="section-label">Serviços</span>
                        <h1
                            className="font-heading text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 tracking-tight text-gradient-headline"
                            style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
                        >
                            Serviços de investigação e inteligência
                        </h1>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-text-secondary text-lg max-w-2xl mx-auto"
                        style={{ lineHeight: 1.7, fontWeight: 400 }}
                    >
                        Cada caso define a operação. Nós definimos o resultado.
                    </motion.p>
                </div>
            </section>

            {/* Services */}
            <section className="px-6 sm:px-8 pb-20 sm:pb-28 bg-surface">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col gap-6 -mt-8">
                        {SERVICES.map((service, i) => {
                            const Icon = service.icon;
                            return (
                                <motion.div
                                    key={service.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                                    className="service-card p-8 rounded-xl group"
                                >
                                    <div className="flex items-start gap-5 mb-5">
                                        <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-surface border border-border-subtle flex items-center justify-center">
                                            <Icon className="w-7 h-7 text-text-secondary card-icon" strokeWidth={1.5} />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="font-heading text-xl sm:text-2xl text-text-primary mb-2">
                                                {service.title}
                                            </h2>
                                            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                                                {service.desc}
                                            </p>
                                        </div>
                                    </div>
                                    <ul className="ml-[4.75rem] mb-6 flex flex-col gap-2">
                                        {service.bullets.map((bullet) => (
                                            <li
                                                key={bullet}
                                                className="text-text-secondary text-sm flex items-start gap-3"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="ml-[4.75rem] flex items-center justify-between">
                                        <a
                                            href={`https://wa.me/${PHONE}?text=${encodeURIComponent(`Olá! Gostaria de falar sobre ${service.title}.`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-gold hover:text-[#d4ac5a] font-medium text-sm transition-colors"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                            Falar sobre esse serviço
                                        </a>
                                        <ArrowRight className="w-5 h-5 text-gold card-arrow" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
