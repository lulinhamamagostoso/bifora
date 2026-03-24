import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Shield, Clock, ArrowRight } from "lucide-react";

const PHONE = "551131641004";

export function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasShown, setHasShown] = useState(false);

    const handleExitIntent = useCallback((e: MouseEvent) => {
        // Only trigger when mouse leaves towards the top of the viewport
        if (e.clientY <= 5 && !hasShown) {
            // Check if popup was already shown in this session
            const wasShown = sessionStorage.getItem("exitPopupShown");
            if (!wasShown) {
                setIsVisible(true);
                setHasShown(true);
                sessionStorage.setItem("exitPopupShown", "true");
            }
        }
    }, [hasShown]);

    useEffect(() => {
        // Only add listener on desktop
        if (window.innerWidth >= 768) {
            document.addEventListener("mouseout", handleExitIntent);
            return () => document.removeEventListener("mouseout", handleExitIntent);
        }
    }, [handleExitIntent]);

    // Also show after 45 seconds of inactivity (for users who don't trigger exit intent)
    useEffect(() => {
        const wasShown = sessionStorage.getItem("exitPopupShown");
        if (wasShown) return;

        const timer = setTimeout(() => {
            if (!hasShown) {
                setIsVisible(true);
                setHasShown(true);
                sessionStorage.setItem("exitPopupShown", "true");
            }
        }, 45000);

        return () => clearTimeout(timer);
    }, [hasShown]);

    const handleClose = () => {
        setIsVisible(false);
    };

    const handleWhatsAppClick = () => {
        window.open(
            `https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Vi o site de vocês e gostaria de uma avaliação gratuita do meu caso.")}`,
            "_blank"
        );
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
                    />
                    
                    {/* Popup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-lg bg-elevation border border-border-subtle rounded-2xl shadow-2xl z-[101] overflow-hidden"
                    >
                        {/* Close button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 text-text-secondary hover:text-text-primary transition-colors z-10"
                            aria-label="Fechar"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Content */}
                        <div className="p-6 sm:p-8">
                            {/* Header */}
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 border border-gold/20 mb-4">
                                    <Shield className="w-8 h-8 text-gold" />
                                </div>
                                <h3 className="font-heading text-2xl sm:text-3xl text-text-primary mb-2">
                                    Espere!
                                </h3>
                                <p className="text-text-secondary text-base">
                                    Antes de ir, que tal uma <span className="text-gold font-medium">avaliação gratuita</span> do seu caso?
                                </p>
                            </div>

                            {/* Benefits */}
                            <div className="space-y-3 mb-6">
                                {[
                                    { icon: Clock, text: "Resposta em até 30 minutos" },
                                    { icon: Shield, text: "100% sigiloso e sem compromisso" },
                                    { icon: MessageCircle, text: "Fale direto com um especialista" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-surface rounded-xl">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                                            <item.icon className="w-5 h-5 text-gold" />
                                        </div>
                                        <span className="text-text-primary text-sm">{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <button
                                onClick={handleWhatsAppClick}
                                className="w-full bg-gold hover:bg-gold/90 text-bg font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 group"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Quero minha avaliação gratuita
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>

                            {/* Dismiss link */}
                            <button
                                onClick={handleClose}
                                className="w-full mt-3 text-text-secondary hover:text-text-primary text-sm py-2 transition-colors"
                            >
                                Não, obrigado
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
