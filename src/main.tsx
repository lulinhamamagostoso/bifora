import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import QuizFunnel from './QuizFunnel.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QuizFunnel />
    </StrictMode>,
)
