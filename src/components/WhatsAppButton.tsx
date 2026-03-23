import { MessageCircle } from "lucide-react";

const PHONE = "555131641004";

export function WhatsAppButton() {
    return (
        <a
            href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Gostaria de falar com um especialista.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-[rgba(184,150,78,0.3)] hover:scale-105 active:scale-95 transition-all duration-300"
            aria-label="Falar pelo WhatsApp"
        >
            <MessageCircle className="w-6 h-6 text-white" />
        </a>
    );
}
