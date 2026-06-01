import React, { useState } from 'react';
import { 
  Star, 
  Search, 
  Filter, 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  Flag, 
  Trash2, 
  User, 
  Package, 
  TrendingUp, 
  ThumbsUp,
  BrainCircuit,
  MoreVertical,
  ChevronDown
} from 'lucide-react';
import './ReviewManager.css';

const ReviewManager = () => {
  const reviews = [
    { id: 1, customer: 'Alice Wang', product: 'Smart Watch v2', rating: 5, comment: 'Absolutely love the AI tracking features! Very accurate.', sentiment: 'Positive', date: '2 hours ago' },
    { id: 2, customer: 'Marcus Reed', product: 'Wireless Earbuds', rating: 2, comment: 'Connection drops frequently when jogging.', sentiment: 'Negative', date: '5 hours ago' },
    { id: 3, customer: 'Elena Petrova', product: 'Home Hub', rating: 4, comment: 'Good quality, but the setup was a bit complex.', sentiment: 'Neutral', date: 'Yesterday' },
  ];

  return (
    <div className="admin-reviews">
      <header className="page-header">
        <div>
          <h1 className="page-title">Review & Feedback Moderation</h1>
          <p className="page-subtitle">Monitor customer sentiment, moderate reviews, and analyze product feedback.</p>
        </div>
        <div className="header-actions">
          <div className="sentiment-stat-pill">
            <BrainCircuit size={16} />
            <span>AI Sentiment: Positive (84%)</span>
          </div>
        </div>
      </header>

      <div className="glass-card review-metrics">
        <div className="rev-metric">
          <div className="rm-icon"><Star size={20} /></div>
          <div className="rm-info">
            <p>Average Rating</p>
            <h3>4.6 / 5.0</h3>
          </div>
        </div>
        <div className="rev-metric">
          <div className="rm-icon"><MessageSquare size={20} /></div>
          <div className="rm-info">
            <p>Total Reviews</p>
            <h3>1,240</h3>
          </div>
        </div>
        <div className="rev-metric">
          <div className="rm-icon positive"><CheckCircle size={20} /></div>
          <div className="rm-info">
            <p>Approval Rate</p>
            <h3>98%</h3>
          </div>
        </div>
      </div>

      <div className="glass-card table-controls">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Search by product or customer..." />
        </div>
        <div className="filter-group">
          <select className="control-select">
            <option>All Ratings</option>
            <option>5 Stars</option>
            <option>4 Stars</option>
            <option>3 Stars</option>
            <option>2 Stars</option>
            <option>1 Star</option>
          </select>
          <button className="control-btn"><Filter size={18} /><span>Filters</span></button>
        </div>
      </div>

      <div className="reviews-list-grid">
        {reviews.map((r) => (
          <div key={r.id} className="glass-card review-card">
            <div className="review-card-header">
              <div className="reviewer-info">
                <div className="rev-avatar"><User size={18} /></div>
                <div>
                  <h4>{r.customer}</h4>
                  <span>{r.date}</span>
                </div>
              </div>
              <div className="review-rating">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} size={14} fill={s <= r.rating ? "#f59e0b" : "none"} color={s <= r.rating ? "#f59e0b" : "var(--text-muted)"} />
                ))}
              </div>
            </div>

            <div className="review-product-meta">
              <Package size={14} />
              <span>Product: <strong>{r.product}</strong></span>
            </div>

            <p className="review-comment">"{r.comment}"</p>

            <div className="review-footer">
              <div className={`sentiment-tag ${r.sentiment.toLowerCase()}`}>
                <BrainCircuit size={12} />
                <span>AI Detected: {r.sentiment}</span>
              </div>
              <div className="review-actions">
                <button className="icon-btn-sm" title="Approve"><CheckCircle size={16} /></button>
                <button className="icon-btn-sm" title="Reply"><MessageSquare size={16} /></button>
                <button className="icon-btn-sm delete" title="Flag"><Flag size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewManager;
