import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import OpenAI from 'openai';
import type { MessageContent } from 'openai/resources/beta/threads/messages';

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
    if (isOpen) {
      const checkInactivity = () => {
        const currentTime = Date.now();
        const inactiveTime = currentTime - lastActivity;
        const fiveMinutes = 5 * 60 * 1000;

        if (inactiveTime >= fiveMinutes) {
          setIsOpen(false);
        } else {
          setTimeout(checkInactivity, 1000);
        }
      };

      const timeoutId = setTimeout(checkInactivity, 1000);

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
      const run = await openai.beta.threads.createAndRun({
        assistant_id: 'asst_IlhY3tI0oL6GoK3Shn7RJKQT',
        thread: {
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: input }
          ]
        }
      });

      // Wait for the run to complete
      let runStatus = await openai.beta.threads.runs.retrieve(
        run.thread_id,
        run.id
      );

      while (runStatus.status !== 'completed') {
        await new Promise(resolve => setTimeout(resolve, 500));
        runStatus = await openai.beta.threads.runs.retrieve(
          run.thread_id,
          run.id
        );
      }

      // Get the assistant's messages
      const threadMessages = await openai.beta.threads.messages.list(
        run.thread_id
      );

      // Find the first text content in the assistant's response
      const assistantContent = threadMessages.data[0].content.find(
        (content): content is Extract<MessageContent, { type: 'text' }> => content.type === 'text'
      );
      
      const assistantMessage = {
        role: 'assistant' as const,
        content: assistantContent?.text?.value || 'Sorry, I could not process your request.'
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
          className="bg-[#9a0606] text-white p-4 rounded-full shadow-lg hover:bg-[#7a0505] transition-colors"
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
          <div className="p-4 bg-[#9a0606] text-[#ffffff] rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold text-[#ffffff]">Chat with DriveBot</h3>
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
                👋 Hi! I'm DriveBot, your driving school assistant. How can I help you today?
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
                      ? 'bg-[#9a0606] text-white'
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
                className="bg-[#9a0606] text-white p-2 rounded-md hover:bg-[#7a0505] transition-colors disabled:opacity-50"
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
