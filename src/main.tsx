import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'
import QuizFunnel from './QuizFunnel.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QuizFunnel />
        <SpeedInsights />
    </StrictMode>,
)
