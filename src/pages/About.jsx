import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Users, Target, BarChart3, Globe, ShieldCheck } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Active Products', value: '5,000+', icon: <BarChart3 size={20} /> },
    { label: 'Global Users', value: '100k+', icon: <Globe size={20} /> },
    { label: 'Orders Processed', value: '1M+', icon: <ShieldCheck size={20} /> },
    { label: 'AI Accuracy', value: '99.2%', icon: <Cpu size={20} /> },
  ];

  const roles = [
    { title: 'Admin', desc: 'Full system orchestration and business intelligence management.' },
    { title: 'Customer', desc: 'Enjoying a personalized, AI-curated shopping journey.' },
    { title: 'Sales Staff', desc: 'High-speed POS operations with real-time stock insights.' },
    { title: 'Supplier', desc: 'Seamless inventory supply and portal-based management.' },
    { title: 'AI Engine', desc: 'The "Brain" powering recommendations and demand forecasting.' },
  ];

  return (
    <div className="about-page">
      {/* 3.1 & 3.2.A: Introduction */}
      <section className="about-hero">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hero-text"
        >
          <h1>About <span className="highlight">SmartStore AI</span></h1>
          <p className="lead">
            Where cutting-edge Artificial Intelligence meets the future of Global Commerce.
          </p>
        </motion.div>
      </section>

      <div className="about-grid">
        {/* 3.2.B: Mission Statement */}
        <section className="mission glass-card">
          <div className="section-title">
            <Target className="icon" />
            <h2>Our Mission</h2>
          </div>
          <p>
            SmartStore AI is designed to revolutionize the online shopping experience by combining 
            high-speed automation with deep learning personalization. Our goal is to provide every user 
            with a "Personal Shopper" experience while automating complex business operations for retailers.
          </p>
        </section>

        {/* 3.2.C: AI System Explanation */}
        <section className="ai-explanation glass-card">
          <div className="section-title">
            <Cpu className="icon" />
            <h2>The AI Engine</h2>
          </div>
          <ul>
            <li><strong>Recommendation Engine:</strong> Real-time product suggestions based on behavior.</li>
            <li><strong>Behavior Tracking:</strong> Anonymized data collection for pattern recognition.</li>
            <li><strong>Demand Prediction:</strong> Forecasting stock needs before they happen.</li>
            <li><strong>Smart Search:</strong> NLP-powered search that understands intent, not just keywords.</li>
          </ul>
        </section>
      </div>

      {/* 3.2.D: System Roles */}
      <section className="roles-section mt-4">
        <h2>Ecosystem Roles</h2>
        <div className="roles-grid">
          {roles.map((role, index) => (
            <motion.div 
              key={role.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="role-card glass-card"
            >
              <Users className="role-icon" />
              <h3>{role.title}</h3>
              <p>{role.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3.2.E: Statistics */}
      <section className="stats-banner glass-card mt-4">
        {stats.map(stat => (
          <div key={stat.label} className="stat-item">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </section>

      <style>{`
        .about-page { padding-bottom: 5rem; }
        .about-hero { text-align: center; padding: 6rem 2rem; }
        .about-hero h1 { font-size: 3.5rem; margin-bottom: 1rem; }
        .lead { font-size: 1.2rem; color: var(--text-muted); max-width: 700px; margin: 0 auto; }
        
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .section-title { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
        .section-title .icon { color: var(--accent); }
        .glass-card p { line-height: 1.8; color: var(--text-muted); }
        
        .ai-explanation ul { list-style: none; padding: 0; }
        .ai-explanation li { margin-bottom: 1rem; color: var(--text-muted); }
        .ai-explanation strong { color: var(--accent); display: block; margin-bottom: 0.2rem; }

        .mt-4 { margin-top: 4rem; }
        .roles-section h2 { margin-bottom: 2rem; text-align: center; }
        .roles-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; }
        .role-card { padding: 2rem; text-align: center; transition: transform 0.3s; }
        .role-card:hover { transform: translateY(-10px); }
        .role-icon { color: var(--accent); margin-bottom: 1rem; width: 32px; height: 32px; }
        .role-card h3 { margin-bottom: 1rem; color: white; }
        .role-card p { font-size: 0.9rem; margin: 0; }

        .stats-banner { 
          display: grid; grid-template-columns: repeat(4, 1fr); 
          padding: 3rem; text-align: center;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
        }
        .stat-icon { color: var(--accent); margin-bottom: 0.8rem; display: flex; justify-content: center; }
        .stat-value { font-size: 2rem; font-weight: 800; color: white; margin-bottom: 0.3rem; }
        .stat-label { font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }

        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; }
          .stats-banner { grid-template-columns: 1fr 1fr; gap: 2rem; }
        }
      `}</style>
    </div>
  );
};

export default About;
