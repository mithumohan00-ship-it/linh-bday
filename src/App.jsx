import React, { useState } from 'react';
import StarfieldCanvas from './components/StarfieldCanvas';
import AudioControl from './components/AudioControl';
import FloatingHeartButton from './components/FloatingHeartButton';
import OpeningScreen from './components/OpeningScreen';
import CakeSection from './components/CakeSection';
import WishOverlay from './components/WishOverlay';
import LetterSection from './components/LetterSection';
import PhotoGallery from './components/PhotoGallery';
import SpecialSection from './components/SpecialSection';
import SecretSurprise from './components/SecretSurprise';
import EndingSection from './components/EndingSection';
import { soundEngine } from './utils/soundEngine';

export default function App() {
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);
  const [isExitingIntro, setIsExitingIntro] = useState(false);
  const [blownCandles, setBlownCandles] = useState(new Set());
  const [showWishOverlay, setShowWishOverlay] = useState(false);
  const [wishSent, setWishSent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOpenSurprise = () => {
    setIsExitingIntro(true);
    soundEngine.startAmbientMelody();
    setIsPlaying(true);

    setTimeout(() => {
      setIsSurpriseOpen(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 750);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      soundEngine.stopAmbientMelody();
      setIsPlaying(false);
    } else {
      soundEngine.startAmbientMelody();
      setIsPlaying(true);
    }
  };

  const handleBlowCandle = (index) => {
    setBlownCandles((prev) => {
      const next = new Set(prev);
      next.add(index);
      if (next.size === 3) {
        setTimeout(() => {
          setShowWishOverlay(true);
        }, 650);
      }
      return next;
    });
  };

  const handleBlowAll = () => {
    setBlownCandles(new Set([0, 1, 2]));
    soundEngine.playChime();
    setTimeout(() => {
      setShowWishOverlay(true);
    }, 650);
  };

  const handleCloseWish = () => {
    setShowWishOverlay(false);
    setWishSent(true);
    document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setBlownCandles(new Set());
      setWishSent(false);
      setIsSurpriseOpen(false);
      setIsExitingIntro(false);
    }, 600);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-dark-base)' }}>
      {/* Background Starfield */}
      <StarfieldCanvas />

      {/* Floating Audio Controls */}
      <AudioControl isPlaying={isPlaying} onToggle={toggleAudio} />

      {/* Floating Heart Button */}
      <FloatingHeartButton />

      {/* Opening Mysterious Screen */}
      {!isSurpriseOpen && (
        <OpeningScreen onOpen={handleOpenSurprise} isExiting={isExitingIntro} />
      )}

      {/* Main Experience */}
      <main
        style={{
          position: 'relative',
          zIndex: 10,
          opacity: isSurpriseOpen ? 1 : 0,
          transform: isSurpriseOpen ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 1.2s ease, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          visibility: isSurpriseOpen ? 'visible' : 'hidden'
        }}
      >
        {/* 🎂 Birthday Hero & Cake */}
        <CakeSection
          blownCandles={blownCandles}
          onBlowCandle={handleBlowCandle}
          onBlowAll={handleBlowAll}
          wishSent={wishSent}
        />

        {/* 💌 Handwritten Letter */}
        <LetterSection />

        {/* 📸 Memory Photo Gallery (With Linh's Personal Photos) */}
        <PhotoGallery />

        {/* 🌷 Why You're Special */}
        <SpecialSection />

        {/* 🔐 Interactive Surprise Vault */}
        <SecretSurprise onComplete={() => {
          document.getElementById('ending')?.scrollIntoView({ behavior: 'smooth' });
        }} />

        {/* 🌌 Cinematic Ending */}
        <EndingSection onReplay={handleReplay} />
      </main>

      {/* Cinematic Make-A-Wish Overlay */}
      <WishOverlay isOpen={showWishOverlay} onClose={handleCloseWish} />
    </div>
  );
}
