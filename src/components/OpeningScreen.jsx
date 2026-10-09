import React from 'react';
import { triggerConfettiBurst } from '../utils/confetti';

export default function OpeningScreen({ onOpen, isExiting }) {
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerConfettiBurst(rect.left / window.innerWidth, rect.top / window.innerHeight, 70);
    onOpen();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: 'radial-gradient(circle at center, #1c112b 0%, #10081a 60%, #090510 100%)',
        padding: 24,
        transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.04)' : 'scale(1)',
        pointerEvents: isExiting ? 'none' : 'auto'
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 18px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 30,
          fontSize: '0.82rem',
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: 'var(--rose-soft)',
          marginBottom: 26,
          backdropFilter: 'blur(12px)',
          fontWeight: 500
        }}
      >
        A Birthday Note 🌸
      </div>

      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.5rem, 6.5vw, 4.2rem)',
          fontWeight: 600,
          letterSpacing: '-0.3px',
          color: '#ffffff',
          marginBottom: 16,
          animation: 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards'
        }}
      >
        Hey Linh… 💫
      </h1>

      <p
        style={{
          fontSize: 'clamp(1.1rem, 2.6vw, 1.35rem)',
          color: 'var(--white-muted)',
          maxWidth: 480,
          marginBottom: 44,
          fontWeight: 300,
          lineHeight: 1.6,
          animation: 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards'
        }}
      >
        I made something special for you.
      </p>

      <button
        onClick={handleClick}
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #d9829f 0%, #b85d7b 50%, #c59b27 100%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 50,
          padding: '16px 40px',
          color: '#ffffff',
          fontFamily: 'var(--font-body)',
          fontSize: '1.05rem',
          fontWeight: 600,
          letterSpacing: '0.3px',
          cursor: 'pointer',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          animation: 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.4)';
        }}
      >
        <span style={{ fontSize: '1.25rem' }}>🎁</span>
        <span>Open Your Surprise</span>
      </button>
    </div>
  );
}
