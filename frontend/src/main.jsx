import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ReportForm } from './ReportForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ReportForm />
  </StrictMode>,
)
