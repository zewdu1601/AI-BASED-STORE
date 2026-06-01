import React, { useState } from 'react';
import { MessageCircle, Send, X, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI Shopping Assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { text: input, isBot: false };
    setMessages([...messages, userMsg]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const botMsg = { text: "I'm analyzing your request. Based on your profile, you might like our latest AI Smart Watches!", isBot: true };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="chatbot-wrapper">
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="chat-window glass-card"
          >
            <div className="chat-header">
              <Bot size={20} />
              <span>AI Assistant</span>
            </div>

            <div className="chat-messages">
              {messages.map((m, i) => (
                <div key={i} className={`message ${m.isBot ? 'bot' : 'user'}`}>
                  {m.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="chat-input">
              <input 
                type="text" 
                placeholder="Ask me anything..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit"><Send size={18} /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .chatbot-wrapper { position: fixed; bottom: 2rem; right: 2rem; z-index: 2000; }
        .chat-toggle { width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4); }
        .chat-window { position: absolute; bottom: 80px; right: 0; width: 350px; height: 450px; display: flex; flex-direction: column; padding: 0; overflow: hidden; }
        .chat-header { padding: 1rem; background: var(--primary); display: flex; align-items: center; gap: 0.8rem; font-weight: 600; }
        .chat-messages { flex: 1; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; overflow-y: auto; }
        .message { max-width: 80%; padding: 0.8rem; border-radius: 1rem; font-size: 0.9rem; }
        .message.bot { background: rgba(255,255,255,0.05); align-self: flex-start; border-bottom-left-radius: 0; }
        .message.user { background: var(--primary); align-self: flex-end; border-bottom-right-radius: 0; }
        .chat-input { display: flex; padding: 1rem; border-top: 1px solid rgba(255,255,255,0.05); gap: 0.5rem; }
        .chat-input input { flex: 1; background: transparent; border: none; color: white; outline: none; }
        .chat-input button { padding: 0.5rem; background: transparent; color: var(--accent); }
      `}</style>
    </div>
  );
};

export default Chatbot;
