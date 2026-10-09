import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ITEMS = [
  {
    name: 'Full Body Checkup',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600',
    otherPrice: 3999,
    oneBuddyPrice: 2999
  },
  {
    name: 'Online Consultation',
    image: 'https://icamshealthcare.in/wp-content/uploads/2025/03/ConsultingOnline-1024x576.webp',
    otherPrice: 300,
    oneBuddyPrice: 250
  },
  {
    name: 'OP Booking',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=600',
    otherPrice: 499,
    oneBuddyPrice: 399
  },
  {
    name: 'Medicine Delivery',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=600',
    otherPrice: 299,
    oneBuddyPrice: 199
  },
  {
    name: 'Home Visits',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600',
    otherPrice: 499,
    oneBuddyPrice: 399
  },
  {
    name: 'Physiotherapy Session',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600',
    otherPrice: 999,
    oneBuddyPrice: 799
  }
];

const CareCarousel = () => {
  const [selectedCard, setSelectedCard] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const center = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let minDiff = Infinity;

    const cardElements = container.querySelectorAll('.carousel-card');
    cardElements.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2 - container.offsetLeft;
      const diff = Math.abs(center - cardCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });

    if (closestIndex !== selectedCard) {
      setSelectedCard(closestIndex);
    }
  };

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <section className="care-section" style={{ padding: '2.5rem 0', background: '#fafafa', overflow: 'hidden' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: '800',
          color: '#1B1B1B',
          marginBottom: '0.5rem',
          fontFamily: 'var(--font-display)'
        }}>
          {/* Compare <span style={{ color: '#0d9488' }}>Care & Services</span> in real-time with <span style={{ color: '#06b6d4' }}>OneBuddy</span> */}
        </h2>
        <b><p style={{ color: '#666', fontSize: '1.1rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/care_logo.png" alt="Care Logo" style={{ height: '35px', marginRight: '10px' }} /> Care prices on OneBuddy vs Other Apps. </p></b>
      </div>

      {/* Carousel Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="care-carousel-container"
        style={{
          display: 'flex',
          gap: '1.5rem',
          padding: '1rem 0 3rem 2rem',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style dangerouslySetInnerHTML={{
          __html: `
          .care-carousel-container::-webkit-scrollbar { display: none; }
        `}} />

        {ITEMS.map((item, index) => {
          const isSelected = selectedCard === index;

          return (
            <motion.div
              className="carousel-card"
              key={index}
              onClick={() => setSelectedCard(index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 5) * 0.1 }}
              animate={{
                scale: isSelected ? 1.05 : 1,
                boxShadow: isSelected
                  ? '0 0 25px rgba(6,182,212,0.5), 0 15px 35px rgba(0,0,0,0.2)'
                  : '0 15px 30px rgba(0,0,0,0.1)'
              }}
              style={{
                height: '380px',
                borderRadius: '20px',
                position: 'relative',
                overflow: 'hidden',
                scrollSnapAlign: 'center',
                cursor: 'pointer',
                backgroundColor: '#ffffff',
                border: isSelected ? '3px solid #7EC400' : '3px solid transparent',
                transition: 'border 0.3s ease'
              }}
            >
              {/* Left Grayscale Image */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                filter: 'grayscale(100%)',
                clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)'
              }} />

              {/* Right Full Color Image */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)'
              }} />

              {/* Top Gradient for Text Readability */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '40%',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
                zIndex: 10
              }} />

              {/* Top Text */}
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                left: 0,
                right: 0,
                textAlign: 'center',
                zIndex: 15,
                padding: '0 1rem'
              }}>
                <h3 style={{
                  color: '#fff',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  lineHeight: 1.2
                }}>
                  {item.name}
                </h3>
              </div>

              {/* Save Badge */}
              <div style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
                background: '#7EC400',
                color: '#000',
                padding: '4px 8px',
                borderRadius: '8px',
                fontSize: '0.7rem',
                fontWeight: '800',
                zIndex: 20,
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
              }}>
                Save ₹{item.otherPrice - item.oneBuddyPrice}
              </div>

              {/* Bottom Gradient */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '50%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                zIndex: 10
              }} />

              {/* Bottom Badges */}
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 1rem',
                zIndex: 15
              }}>
                {/* Left Badge (Other Apps) */}
                <div style={{
                  background: '#ffffff',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ fontSize: '0.55rem', color: '#666', fontWeight: '700', textTransform: 'uppercase' }}>Other apps</div>
                  <div style={{ fontSize: '1rem', color: '#111', fontWeight: '800' }}>₹{item.otherPrice}</div>
                </div>

                {/* Right Badge (OneBuddy) */}
                <div style={{
                  background: 'linear-gradient(135deg, #5FA300, #7EC400)',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(6,182,212,0.3)'
                }}>
                  <div style={{ fontSize: '0.55rem', color: '#fff', fontWeight: '700', textTransform: 'uppercase' }}>OneBuddy</div>
                  <div style={{ fontSize: '1rem', color: '#fff', fontWeight: '800' }}>₹{item.oneBuddyPrice}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default CareCarousel;
