import { MessageCircle } from "lucide-react";

const PHONE = "555131641004";

export function WhatsAppButton() {
    return (
        <a
            href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Gostaria de falar com um especialista.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg shadow-[#25D366]/30 hover:scale-105 active:scale-95 transition-transform"
            aria-label="Falar pelo WhatsApp"
        >
            <MessageCircle className="w-6 h-6 text-white" />
        </a>
    );
}
