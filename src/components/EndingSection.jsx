import React from 'react';

export default function EndingSection({ onReplay }) {
  return (
    <section id="ending" style={{
      minHeight: '85vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '90px 24px',
      position: 'relative',
      background: 'radial-gradient(circle at center bottom, #1e1130 0%, #10081d 50%, #090510 100%)'
    }}>
      <div className="container">
        <div style={{
          fontFamily: 'var(--font-script)',
          fontSize: 'clamp(1.8rem, 4.2vw, 2.6rem)',
          color: 'var(--rose-soft)',
          marginBottom: 10,
          fontWeight: 600
        }}>
          To another year around the sun 🥂
        </div>

        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.5rem, 6.2vw, 4.5rem)',
          fontWeight: 700,
          color: '#ffffff',
          marginBottom: 22,
          letterSpacing: '-0.3px'
        }}>
          Happy Birthday, Linh ❤️
        </h2>

        <p style={{
          fontFamily: 'var(--font-heading)',
          fontStyle: 'italic',
          fontSize: 'clamp(1.2rem, 2.6vw, 1.75rem)',
          color: 'var(--white-muted)',
          maxWidth: 680,
          margin: '0 auto 18px',
          lineHeight: 1.6
        }}>
          “May your next chapter be even more beautiful than the last.”
        </p>

        <div style={{
          fontFamily: 'var(--font-script)',
          fontSize: 'clamp(1.5rem, 3.2vw, 2.2rem)',
          color: 'var(--gold-soft)',
          marginBottom: 44
        }}>
          With lots of good wishes ✨
        </div>

        <button
          onClick={onReplay}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 50,
            padding: '14px 36px',
            color: '#ffffff',
            fontFamily: 'var(--font-body)',
            fontSize: '1.05rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)';
            e.currentTarget.style.borderColor = 'rgba(235, 211, 156, 0.4)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.45)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.35)';
          }}
        >
          <span>Replay the Surprise</span> 🔄
        </button>

        <div style={{
          marginTop: 54,
          fontSize: '0.88rem',
          color: 'rgba(255, 255, 255, 0.45)',
          letterSpacing: 0.5
        }}>
          Made with love & care just for Linh 💖
        </div>
      </div>
    </section>
  );
}
