import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Servicos } from "./pages/Servicos";
import { ComoFunciona } from "./pages/ComoFunciona";
import { Sobre } from "./pages/Sobre";
import { Contato } from "./pages/Contato";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/servicos" element={<Servicos />} />
                    <Route path="/como-funciona" element={<ComoFunciona />} />
                    <Route path="/sobre" element={<Sobre />} />
                    <Route path="/contato" element={<Contato />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
