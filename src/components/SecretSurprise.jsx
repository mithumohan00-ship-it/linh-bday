import React, { useState } from 'react';
import { soundEngine } from '../utils/soundEngine';
import { triggerFireworksSequence } from '../utils/confetti';

export default function SecretSurprise({ onComplete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(3);
  const [isRevealed, setIsRevealed] = useState(false);

  const startCountdown = () => {
    setIsOpen(true);
    setCount(3);
    setIsRevealed(false);
    soundEngine.playChime();

    let current = 3;
    const interval = setInterval(() => {
      current--;
      if (current > 0) {
        setCount(current);
        soundEngine.playChime();
      } else {
        clearInterval(interval);
        setIsRevealed(true);
        soundEngine.playCelebrationFanfare();
        triggerFireworksSequence();
      }
    }, 1000);
  };

  const handleClose = () => {
    setIsOpen(false);
    onComplete?.();
  };

  return (
    <section id="surprise" style={{ textAlign: 'center', position: 'relative' }}>
      <div className="container">
        <div style={{
          maxWidth: 680,
          margin: '0 auto',
          background: 'linear-gradient(135deg, rgba(28, 17, 43, 0.7) 0%, rgba(16, 9, 26, 0.8) 100%)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 28,
          padding: 'clamp(38px, 7vw, 68px) 30px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)'
        }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.9rem, 4.2vw, 2.5rem)',
            color: '#ffffff',
            marginBottom: 12,
            fontWeight: 600
          }}>
            There’s still one more surprise… 👀
          </h2>

          <p style={{
            color: 'var(--white-muted)',
            fontSize: '1.1rem',
            marginBottom: 36,
            fontWeight: 300
          }}>
            A secret celebration saved especially for this moment.
          </p>

          <button
            onClick={startCountdown}
            style={{
              background: 'linear-gradient(135deg, #d9829f 0%, #b85d7b 50%, #c59b27 100%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 50,
              padding: '17px 46px',
              color: '#ffffff',
              fontFamily: 'var(--font-body)',
              fontSize: '1.15rem',
              fontWeight: 600,
              letterSpacing: '0.3px',
              cursor: 'pointer',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12
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
            <span>Unlock It</span> 🔐
          </button>
        </div>
      </div>

      {/* Countdown & Grand Reveal Modal */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(10, 6, 16, 0.96)',
          backdropFilter: 'blur(22px)',
          WebkitBackdropFilter: 'blur(22px)',
          zIndex: 5000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 24
        }}>
          {!isRevealed ? (
            <div
              key={count}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(6.5rem, 22vw, 12rem)',
                fontWeight: 700,
                color: '#fff',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(235, 211, 156, 0.45)',
                animation: 'countPulse 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards'
              }}
            >
              {count}
            </div>
          ) : (
            <div style={{
              maxWidth: 720,
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.04) 100%)',
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              border: '1px solid rgba(235, 211, 156, 0.4)',
              borderRadius: 32,
              padding: 'clamp(36px, 6vw, 60px) 30px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
              animation: 'popIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              position: 'relative'
            }}>
              <div style={{ fontSize: '2.8rem', marginBottom: 14 }}>🌸✨🤍</div>

              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)',
                lineHeight: 1.25,
                background: 'linear-gradient(135deg, #ffffff 30%, #fbe7ed 70%, #ebd39c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 22,
                fontWeight: 700
              }}>
                Linh, you deserve all the happiness in the world. 💖
              </h2>

              <p style={{
                fontSize: 'clamp(1.1rem, 2.4vw, 1.35rem)',
                color: '#f5ece3',
                lineHeight: 1.8,
                fontWeight: 300,
                marginBottom: 36
              }}>
                May every dream you hold close find its way to you this year. Keep inspiring, keep shining, and never forget how deeply appreciated and cherished you are!
              </p>

              <button
                onClick={handleClose}
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  padding: '13px 34px',
                  borderRadius: 50,
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)';
                  e.currentTarget.style.transform = 'scale(1.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Accept the Wishes 🌟
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes countPulse {
          0% { opacity: 0; transform: scale(0.35); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
