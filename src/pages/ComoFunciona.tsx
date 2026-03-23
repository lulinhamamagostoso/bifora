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
            <section className="px-5 sm:px-8 py-16 sm:py-24">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="font-heading text-3xl sm:text-4xl md:text-5xl text-text-primary leading-tight mb-4"
                    >
                        Nosso processo
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto"
                    >
                        Da primeira conversa à entrega do dossiê. Transparência em cada etapa.
                    </motion.p>
                </div>
            </section>

            {/* Steps */}
            <section className="px-5 sm:px-8 pb-16 sm:pb-24">
                <div className="max-w-3xl mx-auto">
                    <div className="flex flex-col gap-0">
                        {STEPS.map((step, i) => {
                            const Icon = step.icon;
                            const isLast = i === STEPS.length - 1;
                            return (
                                <motion.div
                                    key={step.num}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                    className="relative flex gap-6"
                                >
                                    {/* Timeline */}
                                    <div className="flex flex-col items-center">
                                        <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-surface-card border border-border-subtle flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-brand" />
                                        </div>
                                        {!isLast && (
                                            <div className="w-px flex-1 bg-border-subtle my-4" />
                                        )}
                                    </div>
                                    
                                    {/* Content */}
                                    <div className={`pb-10 ${isLast ? 'pb-0' : ''}`}>
                                        <span className="text-brand text-sm font-semibold tracking-wide mb-1 block">
                                            {step.num}
                                        </span>
                                        <h2 className="font-heading text-xl sm:text-2xl text-text-primary mb-3">
                                            {step.title}
                                        </h2>
                                        <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
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
            <section className="px-5 sm:px-8 py-16 sm:py-20 bg-surface-elevated">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="font-heading text-2xl sm:text-3xl text-text-primary mb-4"
                    >
                        Pronto para começar?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-text-secondary text-base sm:text-lg mb-8"
                    >
                        Inicie uma avaliação confidencial sem compromisso.
                    </motion.p>
                    <motion.a
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Gostaria de iniciar uma avaliação confidencial.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-text-primary text-surface font-semibold text-base px-8 py-4 rounded-xl hover:bg-text-secondary transition-colors"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Iniciar uma avaliação confidencial
                    </motion.a>
                </div>
            </section>
        </div>
    );
}
