import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import QuizFunnel from './QuizFunnel.tsx'
import { SpeedInsights } from '@vercel/speed-insights/react'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QuizFunnel />
        <SpeedInsights />
    </StrictMode>,
)
