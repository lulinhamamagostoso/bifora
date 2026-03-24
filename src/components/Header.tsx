import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PHONE = "551131641004";
const NAV_LINKS = [
    { label: "Serviços", href: "/servicos" },
    { label: "Como funciona", href: "/como-funciona" },
    { label: "Sobre", href: "/sobre" },
    { label: "Blog", href: "/blog" },
    { label: "Contato", href: "/contato" },
];

export function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled 
                    ? "bg-[rgba(10,10,10,0.8)] backdrop-blur-[20px] border-b border-[rgba(255,255,255,0.04)]" 
                    : "bg-[rgba(10,10,10,0.8)] backdrop-blur-[20px] border-b border-transparent"
            }`}
        >
            <div className="max-w-6xl mx-auto px-6 sm:px-8">
                <div className="flex items-center justify-between h-16 sm:h-18">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <img
                            src="/logowhiteB.png"
                            alt="Bforense"
                            className="h-6 sm:h-7 w-auto"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className={`text-sm font-medium transition-colors ${
                                    location.pathname === link.href
                                        ? "text-text-primary"
                                        : "text-text-secondary hover:text-text-primary"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Desktop */}
                    <a
                        href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Gostaria de falar com um especialista.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:inline-flex items-center gap-2 btn-header font-medium text-sm px-5 py-2.5 rounded-md"
                    >
                        <MessageCircle className="w-4 h-4" />
                        Fale conosco
                    </a>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 text-text-secondary hover:text-text-primary"
                        aria-label="Menu"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-surface border-b border-[rgba(255,255,255,0.04)] overflow-hidden"
                    >
                        <nav className="flex flex-col px-6 py-4 gap-1">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                                        location.pathname === link.href
                                            ? "bg-surface-card text-text-primary"
                                            : "text-text-secondary hover:text-text-primary hover:bg-surface-card"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <a
                                href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Gostaria de falar com um especialista.")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 flex items-center justify-center gap-2 btn-header font-medium text-sm px-5 py-3 rounded-md"
                            >
                                <MessageCircle className="w-4 h-4" />
                                Fale conosco
                            </a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
