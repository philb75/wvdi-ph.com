import ReactDOM from 'react-dom/client'
import ChatWidget from './components/ChatWidget'
import './index.css'

ReactDOM.createRoot(document.getElementById('chat-widget')!).render(
  <>
    <ChatWidget />
  </>
)
