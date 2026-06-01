import React from 'react';
import { MessageSquare, User, Send, CheckCircle, AlertCircle, Phone, HelpCircle } from 'lucide-react';

const SupportCenter = () => {
  const tickets = [
    { id: '#TKT-101', user: 'David G.', topic: 'Damaged Item on Delivery', priority: 'High', status: 'Open' },
    { id: '#TKT-102', user: 'Maria K.', topic: 'Refund Request', priority: 'Medium', status: 'In Progress' },
    { id: '#TKT-103', user: 'Alex J.', topic: 'Product Inquiry', priority: 'Low', status: 'Resolved' },
  ];

  return (
    <div className="support-center-content fade-in">
      <div className="pane-header mb-8">
        <h2>Customer Support Center</h2>
        <p>Respond to questions, handle complaints, and assist with returns.</p>
      </div>

      <div className="support-grid">
        <div className="tickets-col">
          <div className="glass-card p-6">
            <h3 className="mb-6 flex items-center gap-3"><AlertCircle size={20} className="text-warning" /> Active Tickets</h3>
            <div className="ticket-list">
              {tickets.map(t => (
                <div key={t.id} className="ticket-item glass-card mb-4 hover:border-primary cursor-pointer">
                  <div className="t-head">
                    <span className="t-id">{t.id}</span>
                    <span className={`p-badge ${t.priority.toLowerCase()}`}>{t.priority}</span>
                  </div>
                  <p className="t-topic">{t.topic}</p>
                  <div className="t-foot">
                    <span className="t-user"><User size={14} /> {t.user}</span>
                    <span className="t-status">{t.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chat-col">
          <div className="glass-card chat-interface">
            <div className="chat-header">
              <div className="c-user">
                <div className="c-avatar">DG</div>
                <div>
                  <p className="c-name">David G.</p>
                  <span className="c-status">Typing...</span>
                </div>
              </div>
              <div className="c-actions">
                <button className="icon-btn-sm"><Phone size={16} /></button>
                <button className="icon-btn-sm"><CheckCircle size={16} /></button>
              </div>
            </div>

            <div className="chat-messages">
              <div className="msg received">
                <p>Hello, my order #ORD-9901 arrived with a broken screen. Can I get a replacement?</p>
                <span>10:45 AM</span>
              </div>
              <div className="msg sent">
                <p>I'm so sorry to hear that, David. I've located your order. Could you please upload a photo of the damage?</p>
                <span>10:47 AM</span>
              </div>
            </div>

            <div className="chat-input-row">
              <button className="attach-btn"><HelpCircle size={20} /></button>
              <input type="text" placeholder="Type your response here..." />
              <button className="send-btn"><Send size={20} /></button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .support-grid { display: grid; grid-template-columns: 350px 1fr; gap: 1.5rem; height: 600px; }
        .ticket-list { max-height: 500px; overflow-y: auto; }
        .ticket-item { padding: 1.25rem; }
        .t-head { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
        .t-id { font-weight: 800; font-size: 0.85rem; color: var(--primary); }
        .p-badge { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; padding: 0.2rem 0.5rem; border-radius: 4px; }
        .p-badge.high { background: rgba(239, 68, 68, 0.1); color: var(--danger); }
        .p-badge.medium { background: rgba(245, 158, 11, 0.1); color: var(--warning); }
        .p-badge.low { background: rgba(16, 185, 129, 0.1); color: var(--success); }
        .t-topic { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.75rem; }
        .t-foot { display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); }
        .t-user { display: flex; align-items: center; gap: 0.4rem; }

        .chat-interface { display: flex; flex-direction: column; height: 100%; padding: 0; overflow: hidden; }
        .chat-header { padding: 1.25rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; }
        .c-user { display: flex; align-items: center; gap: 1rem; }
        .c-avatar { width: 40px; height: 40px; background: var(--secondary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; }
        .c-name { font-weight: 700; font-size: 0.95rem; }
        .c-status { font-size: 0.75rem; color: var(--success); font-weight: 600; }
        .c-actions { display: flex; gap: 0.75rem; }

        .chat-messages { flex: 1; padding: 1.5rem; overflow-y: auto; display: flex; flex-direction: column; gap: 1rem; background: rgba(0,0,0,0.1); }
        .msg { max-width: 80%; padding: 1rem; border-radius: 14px; position: relative; }
        .msg p { font-size: 0.9rem; margin-bottom: 0.25rem; }
        .msg span { font-size: 0.65rem; opacity: 0.6; display: block; text-align: right; }
        .msg.received { background: var(--card-bg); align-self: flex-start; border-bottom-left-radius: 2px; }
        .msg.sent { background: var(--primary); color: white; align-self: flex-end; border-bottom-right-radius: 2px; }

        .chat-input-row { padding: 1.25rem; border-top: 1px solid var(--border-color); display: flex; gap: 1rem; align-items: center; }
        .chat-input-row input { flex: 1; background: var(--bg-main); border: 1px solid var(--border-color); border-radius: 12px; padding: 0.75rem 1.25rem; color: white; outline: none; }
        .send-btn { background: var(--primary); color: white; width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .attach-btn { color: var(--text-muted); }
      `}</style>
    </div>
  );
};

export default SupportCenter;
