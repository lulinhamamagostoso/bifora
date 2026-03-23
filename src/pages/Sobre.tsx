import { motion } from "framer-motion";
import { Scale, Users, MapPin, Check, ArrowRight, MessageCircle } from "lucide-react";

const PHONE = "555131641004";

// Image URLs
const IMAGES = {
    teamCollab: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6822e1099ac98a3f9cf4026a_bg-JHfqOqfDWtwPv4QgEyFucyFdG7iOFX.png",
    operationsCenter: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wddwdw%281%29-jrhvOUbjJ0QHEcDXRSlEqCDVvST5xH.png",
    lookingCode: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/looking-bugs-code-cropped-shot-young-computer-programmer-looking-through-data-XqZ1blvETYjySJPFX8uXFV8Tzd4ILp.jpg",
    iconLock: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/681b04ef179e21ce78452075_036-lock-SRSFzsZRkdvpWlfb6jh72JytTW3waQ.png",
    iconShield: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/681b0836c7dd7b00fc37de2e_058-shield-yAYyco3pvnwn0wC8qgad1eBiIsRKHm.png",
    iconHacker: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/681b00e1acd27c89a25e0301_023-hacker-j4oNq2Vq6OcImmIVvJevG7X52NhUMZ.png",
};

const DIFFERENTIALS = [
    {
        iconUrl: IMAGES.iconShield,
        title: "Metodologia legal",
        desc: "Tudo dentro da lei. Relatórios produzidos para ter validade jurídica.",
    },
    {
        iconUrl: IMAGES.iconHacker,
        title: "Equipe multidisciplinar",
        desc: "Investigadores, analistas de inteligência, especialistas em forense digital e análise financeira.",
    },
    {
        iconUrl: IMAGES.iconLock,
        title: "Atuação nacional",
        desc: "Sede em Porto Alegre, operações em todo o Brasil.",
    },
];

const CAPABILITIES = [
    "Investigação patrimonial e financeira",
    "Due diligence de pessoas e empresas",
    "Inteligência de fontes abertas (OSINT)",
    "Forense digital e análise de metadados",
    "Rastreamento de ativos e estruturas offshore",
    "Produção de provas para litígios",
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
            {/* Hero with Background Image */}
            <section className="relative px-6 sm:px-8 py-20 sm:py-32 overflow-hidden">
                {/* Background Image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ 
                        backgroundImage: `url(${IMAGES.operationsCenter})`,
                    }}
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/85 to-[#0a0a0a]" />
                
                <div className="max-w-4xl mx-auto text-center relative z-10">
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
                        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                            Inteligência e investigação para quem precisa de fatos, não suposições.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* About with Image */}
            <section className="px-6 sm:px-8 py-16 sm:py-24 bg-surface">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative rounded-2xl overflow-hidden">
                                <img 
                                    src={IMAGES.teamCollab} 
                                    alt="Equipe de analistas" 
                                    className="w-full h-auto"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 via-transparent to-transparent" />
                            </div>
                        </motion.div>

                        {/* Content */}
                        <motion.div {...fadeIn}>
                            <span className="section-label">Nossa história</span>
                            <h2 className="font-heading text-2xl sm:text-3xl text-text-primary mb-6">
                                Uma agência criada para entregar resultados
                            </h2>
                            <div className="flex flex-col gap-4 text-text-secondary text-base leading-relaxed">
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
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Capabilities with Image */}
            <section className="px-6 sm:px-8 py-16 sm:py-24 bg-surface-alt">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Content */}
                        <motion.div {...fadeIn}>
                            <span className="section-label">Capacidades</span>
                            <h2 className="font-heading text-2xl sm:text-3xl text-text-primary mb-6">
                                O que fazemos de melhor
                            </h2>
                            <p className="text-text-secondary text-base leading-relaxed mb-8">
                                Combinamos técnicas tradicionais de investigação com tecnologia avançada 
                                para cobrir todas as frentes de uma operação de inteligência.
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {CAPABILITIES.map((cap, i) => (
                                    <motion.li
                                        key={cap}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.05 }}
                                        className="flex items-center gap-3 text-text-secondary text-sm"
                                    >
                                        <Check className="w-4 h-4 text-gold flex-shrink-0" />
                                        <span>{cap}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative rounded-2xl overflow-hidden">
                                <img 
                                    src={IMAGES.lookingCode} 
                                    alt="Análise forense digital" 
                                    className="w-full h-auto"
                                />
                                <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0a]/30 via-transparent to-transparent" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Differentials */}
            <section className="px-6 sm:px-8 py-16 sm:py-24 bg-surface">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeIn} className="text-center mb-12">
                        <span className="section-label">Diferenciais</span>
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary">
                            Por que escolher a Bforense
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {DIFFERENTIALS.map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                                className="process-card text-center"
                            >
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-surface-card border border-border-subtle mb-5">
                                    <img 
                                        src={item.iconUrl} 
                                        alt="" 
                                        className="w-7 h-7 opacity-80" 
                                        style={{ filter: "invert(73%) sepia(57%) saturate(394%) hue-rotate(9deg) brightness(92%) contrast(91%)" }} 
                                    />
                                </div>
                                <h3 className="font-heading text-xl text-text-primary mb-3">{item.title}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-gradient px-6 sm:px-8 py-16 sm:py-20 grid-pattern">
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="section-label">Próximo passo</span>
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary mb-4">
                            Pronto para conversar?
                        </h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-text-secondary text-base sm:text-lg mb-8"
                    >
                        Conte-nos sobre sua situação. A avaliação inicial é confidencial e sem compromisso.
                    </motion.p>
                    <motion.a
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Gostaria de conhecer melhor a Bforense.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-base"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Fale conosco
                        <ArrowRight className="w-4 h-4" />
                    </motion.a>
                </div>
            </section>
        </div>
    );
}
