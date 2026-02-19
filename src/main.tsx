import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import QuizFunnel from './QuizFunnel.tsx'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HelmetProvider>
            <QuizFunnel />
        </HelmetProvider>
    </StrictMode>,
)
