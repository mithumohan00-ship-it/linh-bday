import React, { useEffect, useRef } from 'react';
import { soundEngine } from '../utils/soundEngine';

const QUALITIES = [
  {
    icon: '💗',
    title: 'Your Smile',
    quote: '“Never stop smiling. It suits you.”'
  },
  {
    icon: '✨',
    title: 'Your Energy',
    quote: '“You somehow make ordinary moments feel special.”'
  },
  {
    icon: '🌷',
    title: 'Your Heart',
    quote: '“Stay kind, genuine, and beautifully you.”'
  },
  {
    icon: '🌙',
    title: 'Your Presence',
    quote: '“Some people simply make life a little brighter.”'
  }
];

export default function SpecialSection({ onCardHeartBurst }) {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.15 }
    );

    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (e, index) => {
    soundEngine.playTone(587.33 + index * 50, soundEngine.ctx ? soundEngine.ctx.currentTime : 0, 1.0, 0.06);
    const rect = e.currentTarget.getBoundingClientRect();
    onCardHeartBurst?.(rect.left + rect.width / 2, rect.top + 30);
  };

  return (
    <section id="special" style={{ position: 'relative' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Cherished Qualities</span>
          <h2 className="section-title">Why You’re Special 🌷</h2>
          <p className="section-desc">A few reminders of the gentle magic you carry wherever you go.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 26
        }}>
          {QUALITIES.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              onClick={(e) => handleCardClick(e, idx)}
              style={{
                background: 'rgba(255, 255, 255, 0.045)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 20,
                padding: '36px 26px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
                opacity: 0,
                transform: 'translateY(28px)',
                transitionDelay: `${idx * 120}ms`,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.28)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'rgba(235, 211, 156, 0.35)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.075)';
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.045)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.28)';
              }}
            >
              <div style={{
                fontSize: '2.6rem',
                marginBottom: 18,
                display: 'inline-block',
                transition: 'transform 0.3s ease'
              }}>
                {item.icon}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.45rem',
                color: '#ffffff',
                marginBottom: 12,
                fontWeight: 600
              }}>
                {item.title}
              </h3>

              <p style={{
                fontSize: '1.02rem',
                color: 'var(--white-soft)',
                lineHeight: 1.6,
                fontWeight: 300
              }}>
                {item.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
