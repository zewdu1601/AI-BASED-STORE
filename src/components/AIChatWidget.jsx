import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm your AI shopping assistant. How can I help you today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "That's a great question! Based on your preferences, I'd recommend checking out our new electronics section.",
        "I can certainly help with that. Are you looking for something specific?",
        "Your order #AI-8921 is currently out for delivery and should arrive soon.",
        "I've updated your recommendations based on this! Feel free to browse your dashboard.",
        "Let me analyze our inventory... Yes, we have that in stock right now!"
      ];
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setMessages(prev => [...prev, { id: Date.now() + 1, text: randomResponse, sender: 'ai' }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button 
          className="chat-toggle-btn pulse-anim" 
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-chat-window glass-card fade-in">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="ai-avatar">
                <Bot size={20} />
              </div>
              <div>
                <h4>SmartStore AI</h4>
                <span className="online-status"><span className="dot"></span> Online</span>
              </div>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`message-bubble ${msg.sender}`}>
                <div className="msg-icon">
                  {msg.sender === 'ai' ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div className="msg-text">
                  {msg.sender === 'ai' && msg.id === 1 && <Sparkles size={14} className="sparkle" />}
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-area" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask me anything..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" disabled={!input.trim()}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <style>{`
        .chat-toggle-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00C2FF, #a855f7);
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 10px 20px rgba(0, 194, 255, 0.4);
          z-index: 1000;
          transition: transform 0.3s;
        }
        .chat-toggle-btn:hover {
          transform: scale(1.1);
        }
        .pulse-anim {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(0, 194, 255, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(0, 194, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 194, 255, 0); }
        }

        .ai-chat-window {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 350px;
          height: 500px;
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.5rem;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 1000;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }

        .chat-header {
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .chat-header-info { display: flex; align-items: center; gap: 1rem; }
        .ai-avatar {
          width: 40px; height: 40px;
          background: linear-gradient(135deg, #00C2FF, #a855f7);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: white;
        }
        .chat-header h4 { margin: 0; color: white; font-size: 1rem; }
        .online-status { font-size: 0.8rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.3rem; }
        .dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; }
        .close-btn { background: transparent; border: none; color: var(--text-muted); cursor: pointer; }
        .close-btn:hover { color: white; }

        .chat-messages {
          flex: 1;
          padding: 1.5rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .message-bubble {
          display: flex;
          gap: 0.5rem;
          max-width: 85%;
        }
        .message-bubble.ai { align-self: flex-start; }
        .message-bubble.user { align-self: flex-end; flex-direction: row-reverse; }
        
        .msg-icon {
          width: 24px; height: 24px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.1); color: var(--text-muted);
          flex-shrink: 0;
        }
        .message-bubble.ai .msg-icon { background: rgba(0, 194, 255, 0.2); color: #00C2FF; }
        .message-bubble.user .msg-icon { background: rgba(168, 85, 247, 0.2); color: #a855f7; }

        .msg-text {
          padding: 0.8rem 1rem;
          border-radius: 1rem;
          font-size: 0.95rem;
          line-height: 1.4;
          position: relative;
        }
        .message-bubble.ai .msg-text {
          background: rgba(255,255,255,0.05);
          color: var(--text-main);
          border-top-left-radius: 0;
        }
        .message-bubble.user .msg-text {
          background: linear-gradient(135deg, rgba(0, 194, 255, 0.2), rgba(168, 85, 247, 0.2));
          color: white;
          border-top-right-radius: 0;
        }
        .sparkle { color: #facc15; margin-right: 0.5rem; }

        .chat-input-area {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          gap: 0.5rem;
        }
        .chat-input-area input {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 2rem;
          padding: 0.8rem 1.2rem;
          color: white;
          outline: none;
        }
        .chat-input-area input:focus {
          border-color: #00C2FF;
        }
        .chat-input-area button {
          width: 45px; height: 45px;
          border-radius: 50%;
          background: #00C2FF;
          color: white;
          border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .chat-input-area button:disabled { background: rgba(255,255,255,0.1); color: var(--text-muted); cursor: not-allowed; }
        .chat-input-area button:hover:not(:disabled) { background: #a855f7; }
      `}</style>
    </>
  );
};

export default AIChatWidget;
