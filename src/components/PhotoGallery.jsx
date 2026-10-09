import React, { useState, useEffect } from 'react';
import { soundEngine } from '../utils/soundEngine';

// All 11 personal photos of Linh
export const PHOTOS = [
  {
    id: 1,
    src: '/images/photo_pink_aodai.jpg',
    tag: 'Elegance',
    title: 'Áo Dài Elegance 🌸',
    caption: 'Traditional grace & pure Vietnamese charm ✨'
  },
  {
    id: 2,
    src: '/images/photo_white_dress.jpg',
    tag: 'Radiant',
    title: 'Soft & Radiant 🤍',
    caption: 'Breathtakingly beautiful, gentle, and ethereal 💫'
  },
  {
    id: 3,
    src: '/images/photo_garden_flowers.jpg',
    tag: 'Sunny',
    title: 'Garden Bloom 🌼',
    caption: 'Brighter than all the sunny flowers combined 🌷'
  },
  {
    id: 4,
    src: '/images/photo_night_cafe.jpg',
    tag: 'Cozy',
    title: 'Night Cafe & City Lights ☕',
    caption: 'Cozy evenings, sparkling city views & quiet comfort 🌙'
  },
  {
    id: 5,
    src: '/images/photo_photobooth_plaid.jpg',
    tag: 'Vintage',
    title: 'Photobooth Keepsake 🎞️',
    caption: 'Vintage frames and timeless, lovely expressions 📸'
  },
  {
    id: 6,
    src: '/images/photo_pe_class.jpg',
    tag: 'School',
    title: 'PE Class Energy ✌️',
    caption: 'School days, playful peace signs & carefree laughter 🏫'
  },
  {
    id: 7,
    src: '/images/photo_young_sunglasses.jpg',
    tag: 'Childhood',
    title: 'Born Stylish 😎',
    caption: 'Cool shades, sweet grin & iconic from day one! 🎀'
  },
  {
    id: 8,
    src: '/images/photo_childhood_bike.jpg',
    tag: 'Childhood',
    title: 'Little Adventurer 🏍️',
    caption: 'Peace signs and big dreams on two wheels ✌️✨'
  },
  {
    id: 9,
    src: '/images/photo_piercing_profile.jpg',
    tag: 'Aesthetic',
    title: 'Effortless Aesthetic 🌙',
    caption: 'Subtle elegance and a style uniquely your own 💎'
  },
  {
    id: 10,
    src: '/images/photo_mirror_selfie.jpg',
    tag: 'Authentic',
    title: 'Always Genuine 💖',
    caption: 'Real, beautiful, and wonderful just as you are 🌷'
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    tag: 'Celebration',
    title: 'To Your Next Chapter 🥂',
    caption: 'Here’s to countless more memories & adventures ahead! ✨🎂'
  }
];

const CATEGORIES = ['All', 'Elegance', 'Childhood', 'Aesthetic'];

export default function PhotoGallery() {
  const [activePhotoIdx, setActivePhotoIdx] = useState(null);
  const [touchStart, setTouchStart] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [photoHearts, setPhotoHearts] = useState({});

  const filteredPhotos = selectedCategory === 'All'
    ? PHOTOS
    : PHOTOS.filter(p => {
        if (selectedCategory === 'Childhood') return p.tag === 'Childhood' || p.tag === 'School';
        if (selectedCategory === 'Elegance') return p.tag === 'Elegance' || p.tag === 'Radiant' || p.tag === 'Vintage';
        if (selectedCategory === 'Aesthetic') return p.tag === 'Aesthetic' || p.tag === 'Sunny' || p.tag === 'Cozy' || p.tag === 'Authentic';
        return true;
      });

  const openLightbox = (photo) => {
    const idx = PHOTOS.findIndex(p => p.id === photo.id);
    setActivePhotoIdx(idx >= 0 ? idx : 0);
    soundEngine.playTone(523.25, soundEngine.ctx ? soundEngine.ctx.currentTime : 0, 0.8, 0.04);
  };

  const closeLightbox = () => {
    setActivePhotoIdx(null);
  };

  const prevPhoto = (e) => {
    e?.stopPropagation();
    setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : PHOTOS.length - 1));
    soundEngine.playTone(440, soundEngine.ctx ? soundEngine.ctx.currentTime : 0, 0.4, 0.035);
  };

  const nextPhoto = (e) => {
    e?.stopPropagation();
    setActivePhotoIdx((prev) => (prev < PHOTOS.length - 1 ? prev + 1 : 0));
    soundEngine.playTone(587.33, soundEngine.ctx ? soundEngine.ctx.currentTime : 0, 0.4, 0.035);
  };

  const likePhoto = (e, photoId) => {
    e?.stopPropagation();
    setPhotoHearts(prev => ({
      ...prev,
      [photoId]: (prev[photoId] || 0) + 1
    }));
    soundEngine.playTone(659.25, soundEngine.ctx ? soundEngine.ctx.currentTime : 0, 1.0, 0.08);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhotoIdx === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIdx]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchEnd - touchStart;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        prevPhoto();
      } else {
        nextPhoto();
      }
    }
  };

  const tilts = ['-2deg', '1.8deg', '-1.2deg', '2deg', '-1.6deg', '1.4deg', '-1.8deg', '2deg', '-1.5deg', '1.8deg', '-2.2deg', '1.2deg'];

  return (
    <section id="gallery" style={{ position: 'relative' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">A Lifetime of Highlights</span>
          <h2 className="section-title">Moments Worth Remembering 📸</h2>
          <p className="section-desc">
            From childhood peace signs to graceful elegance — snapshots of laughter, serene days, and chapters worth celebrating.
          </p>

          {/* Understated Category Filter Pills */}
          <div style={{
            display: 'inline-flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 10,
            marginTop: 24,
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '5px 8px',
            borderRadius: 30,
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: selectedCategory === cat ? 'rgba(255, 255, 255, 0.14)' : 'transparent',
                  color: selectedCategory === cat ? '#ffffff' : 'var(--white-muted)',
                  border: selectedCategory === cat ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid transparent',
                  padding: '6px 18px',
                  borderRadius: 20,
                  fontSize: '0.88rem',
                  fontWeight: selectedCategory === cat ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                {cat} {cat === 'All' ? `(${PHOTOS.length})` : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Polaroid Gallery Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 32,
          padding: 10
        }}>
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(photo)}
              style={{
                background: '#ffffff',
                padding: '14px 14px 22px 14px',
                borderRadius: 6,
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.38), 0 1px 3px rgba(0, 0, 0, 0.15)',
                cursor: 'pointer',
                position: 'relative',
                transform: `rotate(${tilts[idx % tilts.length]})`,
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
                userSelect: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) rotate(0deg) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.48), 0 2px 6px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.zIndex = '20';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `rotate(${tilts[idx % tilts.length]})`;
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.38), 0 1px 3px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.zIndex = '1';
              }}
            >
              {/* Natural Parchment Washi Tape */}
              <div style={{
                position: 'absolute',
                top: -9,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 58,
                height: 19,
                background: 'rgba(247, 238, 228, 0.82)',
                backdropFilter: 'blur(3px)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                clipPath: 'polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)',
                zIndex: 2
              }} />

              {/* Photo Frame */}
              <div style={{
                width: '100%',
                aspectRatio: '1 / 1',
                overflow: 'hidden',
                borderRadius: 3,
                background: '#f8f4f0',
                position: 'relative'
              }}>
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    display: 'block'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=700&q=80';
                  }}
                />

                {/* Heart react count badge */}
                {photoHearts[photo.id] > 0 && (
                  <div style={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    background: 'rgba(255, 255, 255, 0.92)',
                    color: '#b85d7b',
                    borderRadius: 14,
                    padding: '2px 8px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                  }}>
                    ❤️ {photoHearts[photo.id]}
                  </div>
                )}
              </div>

              {/* Caption */}
              <div style={{
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.25rem',
                color: '#334155',
                textAlign: 'center',
                marginTop: 13,
                lineHeight: 1.25
              }}>
                {photo.caption}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhotoIdx !== null && (
        <div
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(10, 6, 16, 0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 4000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 640,
              width: '100%',
              background: '#ffffff',
              padding: '16px 16px 26px 16px',
              borderRadius: 10,
              boxShadow: '0 25px 70px rgba(0,0,0,0.7)',
              textAlign: 'center',
              position: 'relative',
              animation: 'popIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Top Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
              padding: '0 4px'
            }}>
              <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 500 }}>
                {activePhotoIdx + 1} of {PHOTOS.length}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  onClick={(e) => likePhoto(e, PHOTOS[activePhotoIdx].id)}
                  title="Send Love for this memory!"
                  style={{
                    background: '#fdf2f4',
                    border: '1px solid #f6d3dc',
                    color: '#b85d7b',
                    borderRadius: 20,
                    padding: '4px 12px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    transition: 'all 0.2s ease'
                  }}
                >
                  ❤️ {photoHearts[PHOTOS[activePhotoIdx].id] || 0}
                </button>

                <button
                  onClick={closeLightbox}
                  title="Close (Esc)"
                  style={{
                    background: '#f1f5f9',
                    border: 'none',
                    color: '#475569',
                    fontSize: '1.2rem',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Prev Button */}
            <button
              onClick={prevPhoto}
              title="Previous Photo (←)"
              style={{
                position: 'absolute',
                top: '50%',
                left: 12,
                transform: 'translateY(-50%)',
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.94)',
                border: '1px solid rgba(0,0,0,0.06)',
                color: '#1a0b2e',
                fontSize: '1.2rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                transition: 'all 0.2s ease',
                zIndex: 10
              }}
            >
              ❮
            </button>

            {/* Next Button */}
            <button
              onClick={nextPhoto}
              title="Next Photo (→)"
              style={{
                position: 'absolute',
                top: '50%',
                right: 12,
                transform: 'translateY(-50%)',
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.94)',
                border: '1px solid rgba(0,0,0,0.06)',
                color: '#1a0b2e',
                fontSize: '1.2rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                transition: 'all 0.2s ease',
                zIndex: 10
              }}
            >
              ❯
            </button>

            {/* Lightbox Image */}
            <img
              src={PHOTOS[activePhotoIdx].src}
              alt={PHOTOS[activePhotoIdx].title}
              style={{
                width: '100%',
                maxHeight: '65vh',
                objectFit: 'contain',
                borderRadius: 4,
                background: '#0d0714',
                display: 'block'
              }}
            />

            {/* Caption & Title */}
            <div style={{ marginTop: 14 }}>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                color: '#0f172a',
                fontWeight: 600
              }}>
                {PHOTOS[activePhotoIdx].title}
              </div>
              <div style={{
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.45rem',
                color: '#475569',
                marginTop: 4
              }}>
                {PHOTOS[activePhotoIdx].caption}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
