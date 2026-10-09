import React, { useState } from 'react';
import { soundEngine } from '../utils/soundEngine';

export default function CakeSection({ blownCandles, onBlowCandle, onBlowAll, wishSent }) {
  const [smokes, setSmokes] = useState({});

  const handleCandleClick = (index) => {
    if (blownCandles.has(index)) return;
    soundEngine.playChime();
    setSmokes((prev) => ({ ...prev, [index]: true }));
    onBlowCandle(index);

    setTimeout(() => {
      setSmokes((prev) => {
        const next = { ...prev };
        delete next[index];
        return next;
      });
    }, 1500);
  };

  const remaining = 3 - blownCandles.size;

  return (
    <section id="hero" className="hero-section" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      paddingTop: 100,
      paddingBottom: 80
    }}>
      <div className="container">
        <div style={{
          fontFamily: 'var(--font-script)',
          fontSize: 'clamp(1.8rem, 4.2vw, 2.7rem)',
          color: 'var(--rose-soft)',
          marginBottom: 8,
          fontWeight: 600
        }}>
          Today is all about you ✨
        </div>

        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.7rem, 7vw, 4.8rem)',
          fontWeight: 700,
          lineHeight: 1.15,
          marginBottom: 18,
          background: 'linear-gradient(135deg, #ffffff 30%, #fbe7ed 70%, #ebd39c 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.5px'
        }}>
          Happy Birthday, Linh! 🎂✨
        </h1>

        <p style={{
          fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)',
          color: 'var(--white-muted)',
          maxWidth: 640,
          margin: '0 auto 40px',
          fontWeight: 300,
          lineHeight: 1.6
        }}>
          May your year ahead be as radiant, joyful, and deeply wonderful as you are.
        </p>

        {/* Illustrated 3D Birthday Cake */}
        <div style={{
          position: 'relative',
          margin: '15px auto 35px',
          width: 320,
          height: 280,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          userSelect: 'none'
        }}>
          <div style={{ position: 'relative', width: 260, height: 215 }}>
            {/* Candles Row */}
            <div style={{
              position: 'absolute',
              bottom: 148,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 24,
              zIndex: 5
            }}>
              {[0, 1, 2].map((idx) => {
                const isBlown = blownCandles.has(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => handleCandleClick(idx)}
                    title={isBlown ? "Blown out ✨" : "Click to blow out!"}
                    style={{
                      position: 'relative',
                      width: 10,
                      height: 38,
                      background: 'repeating-linear-gradient(45deg, #ffffff, #ffffff 4px, #e8a7bc 4px, #e8a7bc 8px)',
                      borderRadius: 3,
                      cursor: isBlown ? 'default' : 'pointer',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.25)',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    {/* Candle Wick */}
                    <div style={{
                      position: 'absolute',
                      top: -5,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 2,
                      height: 5,
                      background: '#554d5d'
                    }} />

                    {/* Warm Candlelight Flame */}
                    <div style={{
                      position: 'absolute',
                      top: -23,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 14,
                      height: 21,
                      background: 'radial-gradient(ellipse at bottom, #fff 0%, #fae29c 35%, #f59e0b 80%, transparent 100%)',
                      borderRadius: '50% 50% 20% 20% / 60% 60% 40% 40%',
                      boxShadow: '0 0 10px rgba(245, 158, 11, 0.65), 0 0 20px rgba(251, 191, 36, 0.4)',
                      opacity: isBlown ? 0 : 1,
                      transformOrigin: '50% 90%',
                      animation: isBlown ? 'none' : `flicker 1.3s infinite alternate ease-in-out ${idx * 0.3}s`,
                      transition: 'opacity 0.4s ease, transform 0.4s ease',
                      pointerEvents: isBlown ? 'none' : 'auto'
                    }} />

                    {/* Smoke Puff */}
                    {smokes[idx] && (
                      <div className="smoke-puff" style={{
                        position: 'absolute',
                        top: -18,
                        left: '50%',
                        width: 5,
                        height: 5,
                        background: 'rgba(255, 255, 255, 0.6)',
                        borderRadius: '50%',
                        filter: 'blur(2px)',
                        pointerEvents: 'none',
                        animation: 'smokeRise 1.4s forwards ease-out'
                      }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Cake Top Tier */}
            <div style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 155,
              height: 65,
              bottom: 84,
              background: 'linear-gradient(180deg, #f5e8f0 0%, #dfb8cb 45%, #b87e96 100%)',
              border: '1.5px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px 12px 18px 18px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: 16,
                background: '#ffffff',
                borderRadius: '8px 8px 12px 12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
              }} />
              <div style={{ display: 'flex', justifyContent: 'space-around', padding: '3px 10px' }}>
                {[1, 2, 3, 4].map(p => (
                  <div key={p} style={{ width: 7, height: 7, background: '#ebd39c', borderRadius: '50%', boxShadow: '0 0 4px rgba(235, 211, 156, 0.6)' }} />
                ))}
              </div>
            </div>

            {/* Cake Bottom Tier */}
            <div style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 225,
              height: 78,
              bottom: 10,
              background: 'linear-gradient(180deg, #fceef3 0%, #e2aabf 45%, #b36b85 100%)',
              border: '1.5px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px 12px 18px 18px',
              boxShadow: '0 10px 24px rgba(0, 0, 0, 0.35)'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: 20,
                background: '#ffffff',
                borderRadius: '10px 10px 14px 14px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.08)'
              }} />
              <div style={{ display: 'flex', justifyContent: 'space-around', padding: '3px 10px' }}>
                {[1, 2, 3, 4, 5, 6].map(p => (
                  <div key={p} style={{ width: 7, height: 7, background: '#ebd39c', borderRadius: '50%', boxShadow: '0 0 4px rgba(235, 211, 156, 0.6)' }} />
                ))}
              </div>
            </div>

            {/* Cake Plate */}
            <div style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 280,
              height: 14,
              background: 'radial-gradient(ellipse at center, #fbf7f4 0%, #cbd5e1 70%, #94a3b8 100%)',
              borderRadius: '50%',
              bottom: 0,
              boxShadow: '0 12px 28px rgba(0,0,0,0.5)'
            }} />
          </div>
        </div>

        {/* Blow Instruction / Remaining Count */}
        {remaining > 0 ? (
          <div
            onClick={onBlowAll}
            title="Click to blow all candles!"
            style={{
              fontSize: '0.92rem',
              color: 'var(--rose-soft)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              marginTop: 15,
              padding: '8px 22px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: 30,
              border: '1px solid rgba(255, 255, 255, 0.12)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <span>{remaining === 3 ? "Make a wish & tap the candles to blow them out" : `${remaining} candle${remaining > 1 ? 's' : ''} left to blow!`}</span> 💨
          </div>
        ) : (
          <div style={{
            display: 'inline-block',
            marginTop: 22,
            padding: '12px 28px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(235, 211, 156, 0.35)',
            borderRadius: 50,
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            animation: 'popIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: '#fff', fontWeight: 600 }}>
              Wish sent to the universe ✨🌌
            </div>
          </div>
        )}

        <br />
        <a href="#letter" className="scroll-hint">
          <span>Scroll to read your message</span>
          <span className="scroll-icon">↓</span>
        </a>
      </div>

      <style>{`
        @keyframes flicker {
          0% { transform: translateX(-50%) rotate(-1.5deg) scale(1); }
          50% { transform: translateX(-50%) rotate(2deg) scale(1.05, 0.96); }
          100% { transform: translateX(-50%) rotate(-1deg) scale(0.97, 1.03); }
        }
        @keyframes smokeRise {
          0% { opacity: 0.8; transform: translate(-50%, 0) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -45px) scale(3); }
        }
      `}</style>
    </section>
  );
}
