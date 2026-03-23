import { motion } from "framer-motion";
import { MessageCircle, Phone, ClipboardList, Settings, FileText } from "lucide-react";

const PHONE = "555131641004";

const STEPS = [
    {
        num: "01",
        icon: Phone,
        title: "Contato confidencial",
        desc: "Você entra em contato pelo WhatsApp ou email. Um especialista ouve sua situação, avalia a viabilidade e explica como podemos ajudar. Tudo sob sigilo desde o primeiro segundo. Sem custo nessa etapa.",
    },
    {
        num: "02",
        icon: ClipboardList,
        title: "Planejamento da operação",
        desc: "Definimos o escopo: o que precisa ser descoberto, quais fontes serão consultadas, qual o prazo estimado e o investimento. Você aprova antes de qualquer ação.",
    },
    {
        num: "03",
        icon: Settings,
        title: "Execução e coleta",
        desc: "Nossa equipe executa a operação — cruzando registros públicos, fontes abertas, inteligência digital e, quando necessário, trabalho de campo. Você recebe atualizações durante o processo.",
    },
    {
        num: "04",
        icon: FileText,
        title: "Dossiê e entrega",
        desc: "Entregamos um relatório de inteligência completo: provas documentadas, análise dos achados, conclusões e recomendações. Material pronto para uso por advogados, contadores ou diretamente pelo cliente.",
    },
];

export function ComoFunciona() {
    return (
        <div className="pt-16 sm:pt-18">
            {/* Hero */}
            <section className="hero-gradient px-6 sm:px-8 py-16 sm:py-24">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div className="section-title-accent-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="font-heading text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 font-extralight tracking-tight text-gradient-headline"
                            style={{ fontWeight: 200, letterSpacing: "-0.03em" }}
                        >
                            Nosso processo
                        </motion.h1>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-text-secondary text-lg max-w-2xl mx-auto font-light"
                        style={{ lineHeight: 1.8, fontWeight: 300 }}
                    >
                        Da primeira conversa à entrega do dossiê. Transparência em cada etapa.
                    </motion.p>
                </div>
            </section>

            {/* Steps */}
            <section className="px-6 sm:px-8 py-16 sm:py-24 bg-surface">
                <div className="max-w-3xl mx-auto">
                    <div className="relative pl-12 sm:pl-16">
                        {/* Vertical line */}
                        <div className="process-line" />
                        
                        {STEPS.map((step, i) => {
                            const Icon = step.icon;
                            const isLast = i === STEPS.length - 1;
                            return (
                                <motion.div
                                    key={step.num}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                                    className={`relative ${isLast ? '' : 'pb-12'}`}
                                >
                                    {/* Gold dot */}
                                    <div className="process-dot" />
                                    
                                    {/* Large background number */}
                                    <span className="process-number hidden sm:block">{step.num}</span>
                                    
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-surface-card border border-border-subtle flex items-center justify-center">
                                                <Icon className="w-5 h-5 text-gold" />
                                            </div>
                                            <span className="text-gold text-sm font-semibold tracking-wide sm:hidden">
                                                {step.num}
                                            </span>
                                        </div>
                                        <h2 className="font-heading text-xl sm:text-2xl text-text-primary mb-3 mt-4">
                                            {step.title}
                                        </h2>
                                        <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-lg">
                                            {step.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-6 sm:px-8 py-16 sm:py-20 bg-surface-alt">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="section-title-accent-center"
                    >
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary mb-4">
                            Pronto para começar?
                        </h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-text-secondary text-base sm:text-lg mb-8"
                    >
                        Inicie uma avaliação confidencial sem compromisso.
                    </motion.p>
                    <motion.a
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Gostaria de iniciar uma avaliação confidencial.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 btn-primary text-base"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Iniciar uma avaliação confidencial
                    </motion.a>
                </div>
            </section>
        </div>
    );
}
