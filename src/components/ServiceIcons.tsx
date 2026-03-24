import { useEffect, useRef, useState } from "react";

interface AnimatedIconProps {
    className?: string;
    animate?: boolean;
}

// Investigacao Patrimonial - Lupa sobre documento
export function IconPatrimonial({ className = "", animate = false }: AnimatedIconProps) {
    return (
        <svg
            viewBox="0 0 48 48"
            className={`service-icon ${className}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Document */}
            <rect x="8" y="6" width="20" height="28" rx="2" className="icon-draw" />
            <line x1="12" y1="14" x2="24" y2="14" className={`icon-reveal ${animate ? "revealed" : ""}`} />
            <line x1="12" y1="20" x2="22" y2="20" className={`icon-reveal ${animate ? "revealed" : ""}`} />
            <line x1="12" y1="26" x2="20" y2="26" className={`icon-reveal ${animate ? "revealed" : ""}`} />
            
            {/* Magnifying glass */}
            <circle cx="32" cy="28" r="10" className="icon-draw" />
            <line x1="39" y1="35" x2="44" y2="40" className="icon-draw" />
        </svg>
    );
}

// Due Diligence - Escudo com olho
export function IconDueDiligence({ className = "", animate = false }: AnimatedIconProps) {
    return (
        <svg
            viewBox="0 0 48 48"
            className={`service-icon ${className}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Shield */}
            <path d="M24 4L6 12v12c0 11 18 18 18 18s18-7 18-18V12L24 4z" className="icon-draw" />
            
            {/* Eye */}
            <ellipse cx="24" cy="22" rx="8" ry="5" className="icon-draw" />
            <circle cx="24" cy="22" r="3" className={`icon-blink ${animate ? "blinking" : ""}`} />
        </svg>
    );
}

// Suporte a Litigios - Balanca
export function IconLitigios({ className = "", animate = false }: AnimatedIconProps) {
    return (
        <svg
            viewBox="0 0 48 48"
            className={`service-icon ${className}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Base */}
            <line x1="24" y1="42" x2="24" y2="10" className="icon-draw" />
            <line x1="16" y1="42" x2="32" y2="42" className="icon-draw" />
            
            {/* Balance arm */}
            <line x1="8" y1="14" x2="40" y2="14" className="icon-draw" />
            
            {/* Left plate */}
            <path d="M8 14L4 28h16L16 14" className="icon-draw" />
            
            {/* Right plate with document (heavier) */}
            <path 
                d="M32 14L28 28h16L40 14" 
                className={`icon-scale ${animate ? "weighted" : ""}`}
            />
            <rect x="33" y="20" width="6" height="5" rx="1" className="icon-draw" style={{ strokeWidth: 1 }} />
        </svg>
    );
}

// Inteligencia Financeira - Dinheiro com setas
export function IconFinanceira({ className = "", animate = false }: AnimatedIconProps) {
    return (
        <svg
            viewBox="0 0 48 48"
            className={`service-icon ${className}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Money notes */}
            <rect x="8" y="14" width="24" height="16" rx="2" className="icon-draw" />
            <circle cx="20" cy="22" r="5" className="icon-draw" />
            <line x1="12" y1="22" x2="14" y2="22" className="icon-draw" />
            <line x1="26" y1="22" x2="28" y2="22" className="icon-draw" />
            
            {/* Tracking arrows */}
            <path d="M36 18L42 12" className={`icon-flow ${animate ? "flow-1" : ""}`} />
            <polyline points="38,12 42,12 42,16" className={`icon-flow ${animate ? "flow-1" : ""}`} />
            
            <path d="M36 26L42 32" className={`icon-flow ${animate ? "flow-2" : ""}`} />
            <polyline points="42,28 42,32 38,32" className={`icon-flow ${animate ? "flow-2" : ""}`} />
            
            <path d="M4 22L8 22" className={`icon-flow ${animate ? "flow-3" : ""}`} />
            <polyline points="4,18 4,22 4,26" className={`icon-flow ${animate ? "flow-3" : ""}`} />
        </svg>
    );
}

// Investigacao Conjugal - Silhuetas com linha quebrada
export function IconConjugal({ className = "", animate = false }: AnimatedIconProps) {
    return (
        <svg
            viewBox="0 0 48 48"
            className={`service-icon ${className}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Person 1 */}
            <circle cx="14" cy="16" r="6" className="icon-draw" />
            <path d="M6 38c0-8 4-14 8-14s8 6 8 14" className="icon-draw" />
            
            {/* Person 2 */}
            <circle cx="34" cy="16" r="6" className="icon-draw" />
            <path d="M26 38c0-8 4-14 8-14s8 6 8 14" className="icon-draw" />
            
            {/* Connection line (breaks on hover) */}
            <line 
                x1="20" y1="24" x2="23" y2="24" 
                className={`icon-break ${animate ? "broken" : ""}`}
            />
            <line 
                x1="25" y1="24" x2="28" y2="24" 
                className={`icon-break ${animate ? "broken" : ""}`}
            />
        </svg>
    );
}

// Investigacao Digital - Monitor com fingerprint
export function IconDigital({ className = "", animate = false }: AnimatedIconProps) {
    return (
        <svg
            viewBox="0 0 48 48"
            className={`service-icon ${className}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Monitor */}
            <rect x="6" y="8" width="28" height="22" rx="2" className="icon-draw" />
            <line x1="14" y1="34" x2="26" y2="34" className="icon-draw" />
            <line x1="20" y1="30" x2="20" y2="34" className="icon-draw" />
            
            {/* Code lines */}
            <line x1="10" y1="14" x2="18" y2="14" className={`icon-code ${animate ? "scrolling" : ""}`} />
            <line x1="10" y1="18" x2="22" y2="18" className={`icon-code ${animate ? "scrolling" : ""}`} />
            <line x1="10" y1="22" x2="16" y2="22" className={`icon-code ${animate ? "scrolling" : ""}`} />
            
            {/* Fingerprint */}
            <circle cx="38" cy="30" r="8" className="icon-draw" />
            <path d="M35 30c0-2 1-4 3-4s3 2 3 4-1 4-3 4" className="icon-draw" style={{ strokeWidth: 1 }} />
            <path d="M36 30c0-1 1-2 2-2s2 1 2 2" className="icon-draw" style={{ strokeWidth: 1 }} />
        </svg>
    );
}

// Process Step Icons with draw-in animation
interface ProcessIconProps {
    type: "contact" | "assessment" | "execution" | "delivery";
    className?: string;
    inView?: boolean;
}

export function ProcessIcon({ type, className = "", inView = false }: ProcessIconProps) {
    const icons = {
        contact: (
            <>
                {/* Chat bubble */}
                <path d="M8 12h24c2.2 0 4 1.8 4 4v12c0 2.2-1.8 4-4 4H16l-6 6v-6H8c-2.2 0-4-1.8-4-4V16c0-2.2 1.8-4 4-4z" className="process-draw" />
                {/* Lock inside */}
                <rect x="18" y="20" width="8" height="6" rx="1" className="process-draw" />
                <path d="M20 20v-2a2 2 0 014 0v2" className="process-draw" />
            </>
        ),
        assessment: (
            <>
                {/* Clipboard */}
                <rect x="10" y="8" width="20" height="28" rx="2" className="process-draw" />
                <rect x="16" y="4" width="8" height="6" rx="1" className="process-draw" />
                {/* Magnifying glass */}
                <circle cx="32" cy="30" r="8" className="process-draw" />
                <line x1="38" y1="36" x2="42" y2="40" className="process-draw" />
            </>
        ),
        execution: (
            <>
                {/* Radar circle */}
                <circle cx="24" cy="24" r="16" className="process-draw" />
                <circle cx="24" cy="24" r="10" className="process-draw" />
                <circle cx="24" cy="24" r="4" className="process-draw" />
                {/* Radar line */}
                <line x1="24" y1="24" x2="24" y2="8" className={`radar-sweep ${inView ? "sweeping" : ""}`} />
            </>
        ),
        delivery: (
            <>
                {/* Document */}
                <rect x="10" y="6" width="20" height="28" rx="2" className="process-draw" />
                <line x1="14" y1="14" x2="26" y2="14" className="process-draw" />
                <line x1="14" y1="20" x2="24" y2="20" className="process-draw" />
                <line x1="14" y1="26" x2="22" y2="26" className="process-draw" />
                {/* Seal */}
                <circle cx="34" cy="28" r="8" className="process-draw" />
                <path d="M30 28l3 3 5-6" className="process-draw" />
            </>
        ),
    };

    return (
        <svg
            viewBox="0 0 48 48"
            className={`process-icon ${inView ? "animate-draw" : ""} ${className}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {icons[type]}
        </svg>
    );
}

// Hook for viewport detection
export function useIntersectionObserver(threshold = 0.2) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isInView };
}
