import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from './providers/ThemeProvider'
import './i18n/config'
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
)
