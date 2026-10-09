import React, { useEffect, useRef } from 'react';

export default function StarfieldCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    class Star {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.4;
        this.alpha = Math.random() * 0.7 + 0.15;
        this.speed = Math.random() * 0.015 + 0.003;
        this.direction = Math.random() > 0.5 ? 1 : -1;
        // Soft starlight: ivory white, warm cream, delicate champagne
        this.color = Math.random() > 0.4 ? '#ffffff' : (Math.random() > 0.5 ? '#faf3eb' : '#ebd39c');
      }
      update() {
        this.alpha += this.speed * this.direction;
        if (this.alpha >= 0.85) {
          this.alpha = 0.85;
          this.direction = -1;
        } else if (this.alpha <= 0.12) {
          this.alpha = 0.12;
          this.direction = 1;
        }
      }
      draw(c) {
        c.save();
        c.globalAlpha = this.alpha;
        c.fillStyle = this.color;
        c.shadowBlur = this.size * 1.5;
        c.shadowColor = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    const initStars = () => {
      stars = [];
      const count = Math.min(130, Math.floor(window.innerWidth / 10));
      for (let i = 0; i < count; i++) {
        stars.push(new Star());
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.update();
        star.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    resize();
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
}
