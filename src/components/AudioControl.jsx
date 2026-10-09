import React from 'react';

export default function AudioControl({ isPlaying, onToggle }) {
  return (
    <div
      onClick={onToggle}
      title={isPlaying ? "Mute Music" : "Play Dreamy Music"}
      style={{
        position: 'fixed',
        top: 24,
        right: 24,
        zIndex: 2500,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: 'rgba(20, 12, 32, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: 50,
        padding: '8px 16px 8px 12px',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35)',
        cursor: 'pointer',
        transition: 'all 0.25s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(235, 211, 156, 0.35)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
      }}
    >
      <span style={{ fontSize: '1.15rem' }}>{isPlaying ? '🎶' : '🎵'}</span>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 16 }}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              width: 3,
              background: 'linear-gradient(to top, var(--rose-primary), var(--gold-warm))',
              borderRadius: 2,
              height: isPlaying ? undefined : 4,
              animation: isPlaying ? `wave 1s infinite ease-in-out ${(i * 0.2)}s` : 'none'
            }}
          />
        ))}
      </div>

      <span
        style={{
          fontSize: '0.82rem',
          fontWeight: 500,
          color: 'var(--white-muted)',
          letterSpacing: '0.3px'
        }}
      >
        {isPlaying ? 'Music On' : 'Music Off'}
      </span>

      <style>{`
        @keyframes wave {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
      `}</style>
    </div>
  );
}
