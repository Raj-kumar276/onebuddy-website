import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const VideoIntro = () => {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);

  // Parallax scroll tracking for VideoIntro as Home section scrolls over it
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms:
  // Video moves down at slower speed (parallax depth), text floats up and dims
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0px', '-100px']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const dimOpacity = useTransform(scrollYProgress, [0, 0.85], [0, 0.45]);

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
    <div
      ref={containerRef}
      style={{
        height: '100vh',
        position: 'sticky',
        top: 0,
        width: '100%',
        overflow: 'hidden',
        zIndex: 1,
        backgroundColor: '#000',
      }}
    >
      {/* Parallax background video layer */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          y: videoY,
          scale: videoScale,
          overflow: 'hidden',
          opacity: 0.85,
        }}
      >
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
      </motion.div>

      {/* Dim overlay as next section moves over */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#000',
          opacity: dimOpacity,
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />

      {/* Parallax Overlay text */}
      <motion.div
        style={{
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
          y: textY,
          opacity: textOpacity,
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            marginBottom: '0.75rem',
            fontFamily: 'var(--font-display, sans-serif)',
          }}
        >
          Now in Hyderabad
        </h1>
        <p style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)', opacity: 0.9 }}>
          Scroll down to explore
        </p>
      </motion.div>
    </div>
  );
};

export default VideoIntro;
