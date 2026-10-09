import React, { useEffect, useState } from 'react';
import { soundEngine } from '../utils/soundEngine';
import { triggerConfettiBurst } from '../utils/confetti';

export default function WishOverlay({ isOpen, onClose }) {
  const [stage, setStage] = useState('wishing'); // 'wishing' -> 'sent'
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStage('wishing');
      setShowButton(false);

      soundEngine.playChime();

      const timer1 = setTimeout(() => {
        setStage('sent');
        setShowButton(true);
        soundEngine.playCelebrationFanfare();
        triggerConfettiBurst(0.5, 0.45, 60);
      }, 3500);

      return () => clearTimeout(timer1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at center, #150d22 0%, #090510 75%, #05020a 100%)',
        zIndex: 3500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 24,
        animation: 'fadeIn 1s ease forwards'
      }}
    >
      {/* Subtle Shooting Star */}
      <div
        style={{
          position: 'absolute',
          top: '22%',
          left: '-20%',
          width: 140,
          height: 2,
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), #ebd39c)',
          borderRadius: '50%',
          transform: 'rotate(28deg)',
          animation: 'shootStar 2.2s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards'
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 620 }}>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.3rem, 5.8vw, 3.8rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            background: 'linear-gradient(135deg, #ffffff 30%, #fbe7ed 70%, #ebd39c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 20,
            animation: 'popIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
        >
          {stage === 'wishing' ? "Make a wish, Linh… 🌟" : "Wish sent to the universe ✨🌌"}
        </h2>

        <p
          style={{
            fontSize: 'clamp(1.1rem, 2.4vw, 1.35rem)',
            color: 'var(--white-muted)',
            marginBottom: 36,
            fontWeight: 300,
            lineHeight: 1.6
          }}
        >
          {stage === 'wishing'
            ? "Close your eyes and whisper your deepest wish into the stars."
            : "May every star align to bring your dreams to life."}
        </p>

        {showButton && (
          <button
            onClick={onClose}
            style={{
              background: 'linear-gradient(135deg, #d9829f, #b85d7b)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
              padding: '14px 36px',
              borderRadius: 50,
              fontSize: '1.02rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.35)',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              animation: 'popIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 14px 30px rgba(0, 0, 0, 0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.35)';
            }}
          >
            <span>Continue the Surprise</span> ↓
          </button>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shootStar {
          0% { opacity: 0; transform: translate(0, 0) rotate(28deg) scaleX(0.2); }
          20% { opacity: 0.9; transform: translate(25vw, 14vh) rotate(28deg) scaleX(1.3); }
          100% { opacity: 0; transform: translate(110vw, 68vh) rotate(28deg) scaleX(0.4); }
        }
      `}</style>
    </div>
  );
}
