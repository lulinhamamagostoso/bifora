import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import QuizFunnel from './QuizFunnel.tsx'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ErrorBoundary>
            <QuizFunnel />
        </ErrorBoundary>
    </StrictMode>,
)
