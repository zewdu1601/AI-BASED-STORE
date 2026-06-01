import React from 'react';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="ai-pulse" />
      <p>Synchronizing Intelligence...</p>
      
      <style>{`
        .loader-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(5px);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          z-index: 9999; gap: 2rem;
        }
        .ai-pulse {
          width: 60px; height: 60px; background: var(--accent);
          border-radius: 50%; animation: pulse 1.5s infinite;
          box-shadow: 0 0 20px var(--accent);
        }
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0.5; }
        }
        p { color: var(--accent); font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }
      `}</style>
    </div>
  );
};

export default Loader;

