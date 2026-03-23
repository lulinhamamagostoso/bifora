import { motion } from "framer-motion";
import { Scale, Users, MapPin } from "lucide-react";

const DIFFERENTIALS = [
    {
        icon: Scale,
        title: "Metodologia legal",
        desc: "Tudo dentro da lei. Relatórios produzidos para ter validade jurídica.",
    },
    {
        icon: Users,
        title: "Equipe multidisciplinar",
        desc: "Investigadores, analistas de inteligência, especialistas em forense digital e análise financeira.",
    },
    {
        icon: MapPin,
        title: "Atuação nacional",
        desc: "Sede em Porto Alegre, operações em todo o Brasil.",
    },
];

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" },
};

export function Sobre() {
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
                        <span className="section-label">Sobre</span>
                        <h1
                            className="font-heading text-3xl sm:text-4xl md:text-5xl leading-tight mb-6 tracking-tight text-gradient-headline"
                            style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
                        >
                            Quem somos
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* About Text */}
            <section className="px-6 sm:px-8 py-16 sm:py-24 bg-surface">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        {...fadeIn}
                        className="flex flex-col gap-6 text-text-secondary text-base sm:text-lg leading-relaxed"
                        style={{ lineHeight: 1.8 }}
                    >
                        <p>
                            A Bforense é uma agência de investigações privada especializada em inteligência, 
                            investigação patrimonial e produção de provas. Atuamos em todo o território nacional, 
                            atendendo pessoas físicas, empresas e escritórios de advocacia.
                        </p>
                        <p>
                            Nossa equipe combina experiência em investigação forense digital, análise de fontes 
                            abertas e inteligência humana. Trabalhamos com metodologia legal, sob a Lei Federal 
                            13.432/2017, e produzimos material aceito como prova em processos judiciais e arbitragens.
                        </p>
                        <p>
                            Operamos com sigilo absoluto. Não divulgamos identidade de clientes, não publicamos 
                            cases com nomes reais e não mantemos registros além do necessário para a operação.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Differentials */}
            <section className="px-6 sm:px-8 py-16 sm:py-24 bg-surface-alt">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeIn} className="text-center mb-12">
                        <span className="section-label">Diferenciais</span>
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary">
                            Por que escolher a Bforense
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {DIFFERENTIALS.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                                    className="process-card text-center"
                                >
                                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-surface-card border border-border-subtle mb-5">
                                        <Icon className="w-7 h-7 text-gold" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="font-heading text-xl text-text-primary mb-3">{item.title}</h3>
                                    <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
