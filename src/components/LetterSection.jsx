import React, { useEffect, useRef, useState } from 'react';
import { soundEngine } from '../utils/soundEngine';

export default function LetterSection() {
  const sectionRef = useRef(null);
  const [revealedIdx, setRevealedIdx] = useState(-1);

  const paragraphs = [
    "Today is all about you. I just wanted to create a small corner of the internet that reminds you how special you are.",
    "May this year bring you countless smiles, unforgettable memories, exciting adventures, and everything you’ve been wishing for.",
    "Keep being the amazing person you are.",
    "Happy Birthday, Linh! ❤️"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && revealedIdx === -1) {
          paragraphs.forEach((_, idx) => {
            setTimeout(() => {
              setRevealedIdx(idx);
              soundEngine.playTone(523.25 + idx * 40, soundEngine.ctx ? soundEngine.ctx.currentTime : 0, 1.0, 0.035);
            }, idx * 950);
          });
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [revealedIdx]);

  return (
    <section id="letter" ref={sectionRef} style={{
      background: 'radial-gradient(circle at center, rgba(30, 17, 48, 0.25) 0%, transparent 70%)'
    }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">From the Heart</span>
          <h2 className="section-title">A Little Message For You 💌</h2>
          <p className="section-desc">Words from a heart that wishes you the absolute best.</p>
        </div>

        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
          <div className="floating-dec" style={{ position: 'absolute', top: -28, left: -22, fontSize: '2.2rem', opacity: 0.6 }}>🌸</div>
          <div className="floating-dec" style={{ position: 'absolute', bottom: -18, right: -18, fontSize: '2.4rem', animationDelay: '-3s', opacity: 0.6 }}>✨</div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.03) 100%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            borderRadius: 24,
            padding: 'clamp(32px, 6vw, 60px)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Subtle hairline top accent */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: 'linear-gradient(90deg, transparent, rgba(235, 211, 156, 0.6), transparent)'
            }} />

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.09)',
              paddingBottom: 18,
              marginBottom: 28
            }}>
              {/* Antique Garnet Wax Seal */}
              <div style={{
                width: 48,
                height: 48,
                background: 'radial-gradient(circle at 35% 35%, #9e2a4b, #6b152d)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                color: '#fdf8ed',
                fontWeight: 700,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4), inset 0 2px 3px rgba(255, 255, 255, 0.25)',
                border: '1px solid rgba(235, 211, 156, 0.3)'
              }}>
                L
              </div>
              <div style={{ fontFamily: 'var(--font-script)', fontSize: '1.3rem', color: 'var(--rose-soft)' }}>
                For Your Special Day 🥂
              </div>
            </div>

            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.4rem, 3.2vw, 1.9rem)',
              color: '#ffffff',
              marginBottom: 24,
              fontWeight: 600
            }}>
              Dear Linh,
            </div>

            <div style={{
              fontFamily: 'var(--font-handwriting)',
              fontSize: 'clamp(1.4rem, 2.7vw, 1.75rem)',
              lineHeight: 1.85,
              color: '#fbf7f0',
              letterSpacing: '0.3px',
              minHeight: 220
            }}>
              {paragraphs.map((text, idx) => {
                const isWritten = idx <= revealedIdx;
                return (
                  <p
                    key={idx}
                    style={{
                      marginBottom: 20,
                      opacity: isWritten ? 1 : 0,
                      transform: isWritten ? 'translateY(0)' : 'translateY(10px)',
                      transition: 'opacity 0.8s ease, transform 0.8s ease'
                    }}
                  >
                    {text}
                  </p>
                );
              })}
            </div>

            <div style={{
              marginTop: 34,
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(1.6rem, 3.2vw, 2.1rem)',
              color: 'var(--rose-soft)',
              textAlign: 'right',
              opacity: revealedIdx >= paragraphs.length - 1 ? 1 : 0,
              transition: 'opacity 1s ease 0.4s'
            }}>
              Always cheering for you ✨
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
