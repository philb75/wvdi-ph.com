import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ChatWidget from './components/ChatWidget'
import './index.css'

// Mount main app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Mount chat widget
ReactDOM.createRoot(document.getElementById('chat-widget')!).render(
  <React.StrictMode>
    <ChatWidget />
  </React.StrictMode>
)
