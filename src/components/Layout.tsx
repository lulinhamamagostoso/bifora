import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { ExitIntentPopup } from "./ExitIntentPopup";

export function Layout() {
    return (
        <div className="min-h-screen bg-surface flex flex-col">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
            <WhatsAppButton />
            <ExitIntentPopup />
        </div>
    );
}
