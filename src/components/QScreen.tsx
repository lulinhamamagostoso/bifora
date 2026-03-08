import { motion } from "framer-motion";
import { slideVariants, STEP_BADGES, TOTAL_QUESTIONS } from "../quizData";

export function QScreen({
    children,
    dir,
    step,
    title,
    subtitle,
}: {
    children: React.ReactNode;
    dir: number;
    step: number;
    title: string;
    subtitle?: string;
}) {
    const badge = STEP_BADGES[step];

    return (
        <motion.div
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="px-5 sm:px-6 pt-[86px] sm:pt-[106px] pb-8 sm:pb-10"
        >
            {/* Step badge */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <p className="text-[10px] sm:text-[11px] text-text-muted uppercase tracking-widest font-semibold text-center">
                    Pergunta {step} de {TOTAL_QUESTIONS}
                </p>
                {badge && (
                    <motion.div
                        className="inline-flex items-center gap-1.5 bg-surface-card border border-border-subtle rounded-full px-2.5 sm:px-3 py-1"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <badge.icon className="w-3 h-3 text-text-muted" />
                        <span className="text-[9px] sm:text-[10px] text-text-muted font-medium uppercase tracking-wider">{badge.text}</span>
                    </motion.div>
                )}
            </div>

            <h2 className="text-base sm:text-xl font-bold text-text-primary text-center mb-2 leading-snug max-w-md mx-auto text-balance">
                {title}
            </h2>
            {subtitle && (
                <p className="text-text-secondary text-xs sm:text-sm text-center mb-5 sm:mb-7 max-w-sm mx-auto leading-relaxed">
                    {subtitle}
                </p>
            )}
            {!subtitle && <div className="mb-5 sm:mb-7" />}
            {children}
        </motion.div>
    );
}
