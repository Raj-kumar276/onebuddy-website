import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const VideoIntro = () => {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);

  // The outer container is 300vh tall so the sticky section pins for 2 full scrolls
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Over the 2 sticky scrolls (0 → 1):
  // height shrinks from 100vh → 55vh (vertical only, width stays full)
  const videoHeight = useTransform(scrollYProgress, [0, 1], ['100vh', '55vh']);

  // Border-radius: 0px (full-bleed) → 24px (rounded card)
  const borderRadius = useTransform(scrollYProgress, [0, 0.6], ['0px', '24px']);

  // Subtle green glow outline fades in as the card shrinks
  const outlineOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  // Vimeo Player — loop first 3 seconds
  useEffect(() => {
    let player = null;

    const loadVimeoSDK = () => {
      if (window.Vimeo) { initPlayer(); return; }
      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.async = true;
      script.onload = initPlayer;
      document.head.appendChild(script);
    };

    const initPlayer = () => {
      if (!iframeRef.current) return;
      player = new window.Vimeo.Player(iframeRef.current);
      let seeking = false;
      player.on('timeupdate', (data) => {
        if (data.seconds >= 3 && !seeking) {
          seeking = true;
          player.setCurrentTime(0).then(() => {
            player.play();
            seeking = false;
          });
        }
      });
    };

    loadVimeoSDK();
    return () => { if (player) player.off('timeupdate'); };
  }, []);

  return (
    /* Outer scroll-space: 300vh gives 2 full scrolls while the inner sticky div is pinned */
    <div
      ref={containerRef}
      style={{
        height: '100vh',
        position: 'relative',
      }}
    >
      {/* Sticky wrapper — pins for the full 300vh scroll-space */}
      <div
        style={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          zIndex: 10,
          background: 'transparent',
          padding: 0,
          boxSizing: 'border-box',
        }}
      >
        {/* Animated height (vertical shrink only) + border-radius card */}
        <motion.div
          style={{
            borderRadius,
            width: '100vw',
            height: videoHeight,
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#000',  /* keep video bg dark */
            flexShrink: 0,
          }}
        >
          {/* Green glow outline that fades in as card shrinks */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius,
              boxShadow: '0 0 0 3px #4ade80',
              opacity: outlineOpacity,
              pointerEvents: 'none',
              zIndex: 20,
            }}
          />

          {/* Vimeo background video */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.85 }}>
            <iframe
              ref={iframeRef}
              src="https://player.vimeo.com/video/790313576?background=1&autoplay=1&loop=0&byline=0&title=0&muted=1"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100vw',
                height: '56.25vw',    /* 16:9 */
                minHeight: '100vh',
                minWidth: '177.77vh', /* 16:9 */
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Overlay text */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center',
            zIndex: 10,
            padding: '0 20px',
          }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              marginBottom: '0.75rem',
              fontFamily: 'var(--font-display, sans-serif)',
            }}>
              Now in Hyderabad
            </h1>
            <p style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)', opacity: 0.9 }}>
              Scroll down to explore
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VideoIntro;
