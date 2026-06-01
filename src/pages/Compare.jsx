import React from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

const Compare = () => {
  const comparisonList = [
    { 
      _id: '1', name: 'AI Watch Pro', price: 299, brand: 'NexTech', 
      attributes: { 'Battery': '48h', 'Sensors': '12', 'Waterproof': 'Yes' },
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500']
    },
    { 
      _id: '2', name: 'Smart Band X', price: 149, brand: 'NexTech', 
      attributes: { 'Battery': '14 days', 'Sensors': '6', 'Waterproof': 'Yes' },
      images: ['https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500']
    }
  ];

  return (
    <div className="compare-container">
      <h1>Compare Products</h1>
      
      <div className="compare-grid glass-card">
        <div className="attribute-labels">
          <div className="header-cell" />
          <div className="label-cell">Price</div>
          <div className="label-cell">Brand</div>
          <div className="label-cell">Battery</div>
          <div className="label-cell">Sensors</div>
          <div className="label-cell">Waterproof</div>
        </div>

        {comparisonList.map(item => (
          <div key={item._id} className="compare-column">
            <div className="header-cell">
              <button className="remove-btn"><X size={16} /></button>
              <img src={item.images[0]} alt={item.name} />
              <h3>{item.name}</h3>
            </div>
            <div className="value-cell">${item.price}</div>
            <div className="value-cell">{item.brand}</div>
            <div className="value-cell">{item.attributes['Battery']}</div>
            <div className="value-cell">{item.attributes['Sensors']}</div>
            <div className="value-cell"><Check className="success-icon" size={18} /></div>
            <button className="primary-btn add-btn">Add to Cart</button>
          </div>
        ))}
      </div>

      <style>{`
        .compare-container { max-width: 1200px; margin: 0 auto; }
        .compare-grid { display: grid; grid-template-columns: 200px repeat(auto-fit, minmax(250px, 1fr)); padding: 0; overflow: hidden; }
        .header-cell { height: 250px; padding: 2rem; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); position: relative; }
        .header-cell img { width: 120px; height: 120px; object-fit: cover; border-radius: 1rem; }
        .header-cell h3 { font-size: 1.1rem; text-align: center; }
        .remove-btn { position: absolute; top: 1rem; right: 1rem; color: var(--text-muted); }
        
        .label-cell, .value-cell { padding: 1.5rem; height: 70px; display: flex; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .label-cell { background: rgba(255,255,255,0.02); font-weight: 600; color: var(--text-muted); }
        .value-cell { justify-content: center; font-weight: 500; }
        .compare-column { border-left: 1px solid rgba(255,255,255,0.05); text-align: center; }
        .success-icon { color: #10b981; }
        .add-btn { margin: 2rem; width: calc(100% - 4rem); }
      `}</style>
    </div>
  );
};

export default Compare;

