import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import QuizFunnel from "./QuizFunnel";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <HelmetProvider>
            <QuizFunnel />
        </HelmetProvider>
    </StrictMode>,
);
