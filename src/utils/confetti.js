import confetti from 'canvas-confetti';

export function triggerConfettiBurst(x = 0.5, y = 0.5, particleCount = 65) {
  confetti({
    particleCount,
    spread: 75,
    origin: { x, y },
    colors: ['#e295b5', '#ebd39c', '#ffffff', '#d4af37', '#f4c2d4'],
    disableForReducedMotion: true
  });
}

export function triggerFireworksSequence() {
  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 28, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 45 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.18, 0.42), y: Math.random() - 0.2 },
      colors: ['#e295b5', '#ebd39c', '#ffffff']
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.58, 0.82), y: Math.random() - 0.2 },
      colors: ['#d4af37', '#f4c2d4', '#ffffff']
    });
  }, 380);
}
