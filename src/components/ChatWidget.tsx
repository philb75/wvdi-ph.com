import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import OpenAI from 'openai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inactivityTimeoutRef = useRef<NodeJS.Timeout>();
  
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
    dangerouslyAllowBrowser: true
  });

  const updateLastActivity = () => {
    setLastActivity(Date.now());
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isOpen) {
      const checkInactivity = () => {
        const currentTime = Date.now();
        const inactiveTime = currentTime - lastActivity;
        const fiveMinutes = 5 * 60 * 1000;

        if (inactiveTime >= fiveMinutes) {
          setIsOpen(false);
        } else {
          timeoutId = setTimeout(checkInactivity, 1000);
        }
      };

      timeoutId = setTimeout(checkInactivity, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isOpen, lastActivity]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateLastActivity();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          ...messages.map(m => ({ role: m.role, content: m.content })),
          { role: 'user', content: input }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      const assistantMessage = {
        role: 'assistant' as const,
        content: chatCompletion.choices[0].message.content || 'Sorry, I could not process your request.'
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again later.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateLastActivity();
    setInput(e.target.value);
  };

  const handleChatOpen = () => {
    updateLastActivity();
    setIsOpen(true);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={handleChatOpen}
          className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div 
          className="bg-white rounded-lg shadow-xl w-[90vw] sm:w-96 h-[80vh] sm:h-[500px] flex flex-col"
          onMouseMove={updateLastActivity}
          onKeyDown={updateLastActivity}
        >
          <div className="p-4 bg-red-600 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat with Wheelie</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-4">
                👋 Hi! I'm Wheelie, your driving school assistant. How can I help you today?
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
