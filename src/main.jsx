import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FlipProvider } from './context/FlipContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FlipProvider>
      <App />
    </FlipProvider>
  </React.StrictMode>,
)