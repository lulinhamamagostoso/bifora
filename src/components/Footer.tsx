import { Link } from "react-router-dom";

const PHONE = "555131641004";
const EMAIL = "bscy@pm.me";

export function Footer() {
    return (
        <footer className="bg-surface-elevated border-t border-[rgba(255,255,255,0.06)]">
            <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                    {/* Logo & Info */}
                    <div className="flex flex-col gap-4">
                        <img
                            src="/logowhiteB.png"
                            alt="Bforense"
                            className="h-6 w-auto opacity-80"
                        />
                        <div className="flex flex-col gap-1 text-sm text-text-secondary">
                            <a
                                href={`https://wa.me/${PHONE}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-text-primary transition-colors"
                            >
                                WhatsApp: (51) 3164-1004
                            </a>
                            <a
                                href={`mailto:${EMAIL}`}
                                className="hover:text-text-primary transition-colors"
                            >
                                {EMAIL}
                            </a>
                        </div>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex flex-wrap items-center gap-x-2 text-sm text-[#6b6b6b]">
                        <Link to="/servicos" className="hover:text-text-primary transition-colors">
                            Serviços
                        </Link>
                        <span className="text-[#4a4a4a]">·</span>
                        <Link to="/como-funciona" className="hover:text-text-primary transition-colors">
                            Como funciona
                        </Link>
                        <span className="text-[#4a4a4a]">·</span>
                        <Link to="/sobre" className="hover:text-text-primary transition-colors">
                            Sobre
                        </Link>
                        <span className="text-[#4a4a4a]">·</span>
                        <Link to="/contato" className="hover:text-text-primary transition-colors">
                            Contato
                        </Link>
                    </nav>
                </div>

                {/* Bottom */}
                <div className="mt-10 pt-8 border-t border-[rgba(255,255,255,0.06)]">
                    <p className="text-xs text-text-muted mb-4">
                        © 2026 Bforense Investigações. Todos os direitos reservados.
                    </p>
                    <p className="text-[11px] leading-relaxed text-text-legal max-w-3xl">
                        A Bforense é uma agência de investigações privada, operando sob a Lei Federal 13.432/2017. 
                        Não realizamos interceptações telefônicas, quebra de sigilo bancário sem ordem judicial, 
                        bloqueios de contas ou prisões.
                    </p>
                </div>
            </div>
        </footer>
    );
}
