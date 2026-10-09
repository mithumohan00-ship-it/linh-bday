import React, { useState } from 'react';
import { soundEngine } from '../utils/soundEngine';

export default function FloatingHeartButton() {
  const [hearts, setHearts] = useState([]);

  const spawnHeart = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    
    soundEngine.playTone(659.25, soundEngine.ctx ? soundEngine.ctx.currentTime : 0, 1.2, 0.08);

    const emojis = ['💖', '✨', '🌸', '🌷', '🤍', '🎂', '⭐'];
    const newHeart = {
      id: Date.now() + Math.random(),
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: x + (Math.random() * 30 - 15),
      y,
      randX: Math.random()
    };

    setHearts((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 2400);
  };

  return (
    <>
      <button
        onClick={spawnHeart}
        title="Send Love to Linh! 💖"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #d9829f, #b85d7b)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          color: '#ffffff',
          fontSize: '1.35rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
          zIndex: 2500,
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.45)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.35)';
        }}
      >
        💖
      </button>

      {hearts.map((h) => (
        <div
          key={h.id}
          style={{
            position: 'fixed',
            left: h.x,
            top: h.y,
            pointerEvents: 'none',
            fontSize: '1.75rem',
            zIndex: 9999,
            animation: 'floatUpAndFade 2.4s cubic-bezier(0.2, 0.8, 0.3, 1) forwards'
          }}
        >
          {h.emoji}
        </div>
      ))}

      <style>{`
        @keyframes floatUpAndFade {
          0% { opacity: 1; transform: translate(0, 0) scale(0.65); }
          50% { opacity: 0.9; transform: translate(calc((${hearts.length % 2 === 0 ? 1 : -1} * 35px)), -120px) scale(1.15); }
          100% { opacity: 0; transform: translate(calc((${hearts.length % 2 === 0 ? 1 : -1} * 70px)), -280px) scale(0.85); }
        }
      `}</style>
    </>
  );
}
