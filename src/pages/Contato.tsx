import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, Send, Loader2 } from "lucide-react";

const PHONE = "555131641004";
const EMAIL = "bscy@pm.me";

const OPTIONS = [
    "Preciso verificar informações sobre uma pessoa",
    "Preciso proteger meu patrimônio ou empresa",
    "Estou em uma disputa judicial ou societária",
    "Preciso de um levantamento antes de uma decisão importante",
    "Prefiro não dizer agora",
];

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
};

export function Contato() {
    const [form, setForm] = useState({
        nome: "",
        whatsapp: "",
        assunto: "",
    });
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.nome || !form.whatsapp || !form.assunto) return;
        
        setLoading(true);
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setLoading(false);
        setSent(true);
    };

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
                        Fale conosco
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto"
                    >
                        Sigilo absoluto desde o primeiro contato. Escolha como prefere falar.
                    </motion.p>
                </div>
            </section>

            {/* Contact Options */}
            <section className="px-5 sm:px-8 pb-10 sm:pb-16">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* WhatsApp */}
                        <motion.div
                            {...fadeIn}
                            className="p-6 sm:p-8 rounded-xl bg-surface-card border border-border-subtle"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center">
                                    <MessageCircle className="w-6 h-6 text-[#25D366]" />
                                </div>
                                <h2 className="font-heading text-xl text-text-primary">WhatsApp</h2>
                            </div>
                            <p className="text-text-secondary text-sm mb-6">
                                Resposta em até 2 horas em horário comercial.
                            </p>
                            <a
                                href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Gostaria de falar com um especialista.")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#1faf55] transition-colors"
                            >
                                Abrir conversa no WhatsApp
                            </a>
                        </motion.div>

                        {/* Email */}
                        <motion.div
                            {...fadeIn}
                            transition={{ delay: 0.1 }}
                            className="p-6 sm:p-8 rounded-xl bg-surface-card border border-border-subtle"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center">
                                    <Mail className="w-6 h-6 text-brand" />
                                </div>
                                <h2 className="font-heading text-xl text-text-primary">Email criptografado</h2>
                            </div>
                            <p className="text-text-secondary text-sm mb-6">
                                Para casos que exigem documentação inicial por escrito.
                            </p>
                            <a
                                href={`mailto:${EMAIL}`}
                                className="inline-flex items-center justify-center gap-2 w-full bg-brand text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-brand-hover transition-colors"
                            >
                                {EMAIL}
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Form */}
            <section className="px-5 sm:px-8 pb-20 sm:pb-28">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        {...fadeIn}
                        className="p-6 sm:p-8 rounded-xl bg-surface-card border border-border-subtle"
                    >
                        <h2 className="font-heading text-xl text-text-primary mb-6 text-center">
                            Ou envie uma mensagem
                        </h2>

                        {sent ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 rounded-full bg-accent-emerald/10 flex items-center justify-center mx-auto mb-4">
                                    <MessageCircle className="w-8 h-8 text-accent-emerald" />
                                </div>
                                <h3 className="font-semibold text-text-primary text-lg mb-2">
                                    Mensagem enviada
                                </h3>
                                <p className="text-text-secondary text-sm">
                                    Entraremos em contato pelo WhatsApp informado de forma discreta.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-text-secondary text-sm mb-2">
                                        Nome (primeiro nome)
                                    </label>
                                    <input
                                        type="text"
                                        value={form.nome}
                                        onChange={(e) => setForm({ ...form, nome: e.target.value })}
                                        className="w-full bg-surface border border-border-subtle rounded-lg px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-brand transition-colors"
                                        placeholder="Seu nome"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-text-secondary text-sm mb-2">
                                        WhatsApp
                                    </label>
                                    <input
                                        type="tel"
                                        value={form.whatsapp}
                                        onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                                        className="w-full bg-surface border border-border-subtle rounded-lg px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-brand transition-colors"
                                        placeholder="(00) 00000-0000"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-text-secondary text-sm mb-2">
                                        Como podemos ajudar?
                                    </label>
                                    <select
                                        value={form.assunto}
                                        onChange={(e) => setForm({ ...form, assunto: e.target.value })}
                                        className="w-full bg-surface border border-border-subtle rounded-lg px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-brand transition-colors appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="" disabled>
                                            Selecione uma opção
                                        </option>
                                        {OPTIONS.map((opt) => (
                                            <option key={opt} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-2 inline-flex items-center justify-center gap-2 bg-text-primary text-surface font-semibold text-sm px-6 py-3 rounded-lg hover:bg-text-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Enviar
                                        </>
                                    )}
                                </button>
                            </form>
                        )}

                        <p className="text-text-muted text-xs text-center mt-6">
                            Seus dados são tratados com sigilo absoluto. O contato será feito exclusivamente 
                            pelo WhatsApp informado, de forma discreta.
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
