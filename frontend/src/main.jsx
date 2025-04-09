import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './_Global.scss'
import './ReportForm.scss'
import App from './App.jsx'
import { ReportForm } from './ReportForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ReportForm />
  </StrictMode>,
)
