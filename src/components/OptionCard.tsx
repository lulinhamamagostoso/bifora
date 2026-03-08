import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { staggerChild } from "../quizData";

export function OptionCard({
    children,
    i,
    onClick,
    selected,
}: {
    children: React.ReactNode;
    i: number;
    onClick: () => void;
    selected?: boolean;
}) {
    return (
        <motion.button
            custom={i}
            variants={staggerChild}
            initial="hidden"
            animate="visible"
            onClick={onClick}
            className={`group flex items-center gap-3.5 border rounded-xl px-4 py-3.5 sm:py-4 text-left transition-all duration-200 cursor-pointer
                ${selected
                    ? "bg-brand/10 border-brand/40 scale-[0.98]"
                    : "bg-surface-card hover:bg-white/[0.06] border-border-muted hover:border-brand/30 hover:scale-[1.01] active:scale-[0.98]"
                }`}
        >
            {children}
            {selected && (
                <motion.div
                    className="ml-auto flex-shrink-0"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                    <CheckCircle2 className="w-5 h-5 text-brand" />
                </motion.div>
            )}
        </motion.button>
    );
}
