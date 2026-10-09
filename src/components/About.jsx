import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import CardStack from './CardStack';

/* ── Typewriter hook ─────────────────────────────────────────────────── */
const useTypewriter = (text, speed = 28) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let i = 0;
          const interval = setInterval(() => {
            setDisplayed(text.slice(0, i + 1));
            i++;
            if (i >= text.length) {
              clearInterval(interval);
              setDone(true);
            }
          }, speed);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [text, speed]);

  return { displayed, done, ref };
};

/* ── Typewriter paragraph component ─────────────────────────────────── */
const FULL_TEXT =
  'One Buddy is an all-in-one app designed to make everyday services simple, convenient, and affordable. Our platform brings multiple services together in one place, helping users save time and access services easily.';

const BOLD_PHRASE = 'simple, convenient, and affordable';

const TypewriterPara = () => {
  const { displayed, done, ref } = useTypewriter(FULL_TEXT, 22);

  // Split displayed text so we can bold the phrase once it's reached
  const boldStart = FULL_TEXT.indexOf(BOLD_PHRASE);
  const boldEnd   = boldStart + BOLD_PHRASE.length;

  const before = displayed.slice(0, boldStart);
  const bold   = displayed.slice(boldStart, Math.min(displayed.length, boldEnd));
  const after  = displayed.slice(boldEnd);

  return (
    <p className="about-description" ref={ref}>
      {before}
      {bold && <strong>{bold}</strong>}
      {after}
      {/* blinking cursor */}
      {!done && <span className="about-cursor">|</span>}
    </p>
  );
};

const About = () => {
  return (
    <section id="about" className="about-section">
      {/* Floating background blobs */}
      <div className="about-blob about-blob-1" />
      <div className="about-blob about-blob-2" />

      <div className="container" style={{ position: 'relative' }}>

        {/* Section Header */}
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="about-label"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            About Us
          </motion.span>

          <motion.h2
            className="about-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            About Us –{' '}
            <motion.span
              className="about-heading-brand"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              One Buddy
            </motion.span>
          </motion.h2>

          <motion.div
            className="about-divider"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0.5 }}
          />
        </motion.div>

        {/* Description — typing effect */}
        <TypewriterPara />

        {/* Subheading */}
        <motion.p
          className="about-subheading"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          What makes <span style={{ color: 'var(--brand-primary)' }}>One Buddy</span> useful:
        </motion.p>

        {/* Animated GSAP Pinned Card Stack in place of the static grid */}
        <CardStack />

      </div>
    </section>
  );
};

export default About;
