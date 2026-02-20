import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 3001,
        host: true,
    },
    build: {
        outDir: "dist",
        emptyOutDir: true,
        target: "es2020",
        cssMinify: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    "framer": ["framer-motion"],
                    "react-vendor": ["react", "react-dom"],
                },
            },
        },
    },
});
