import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ITEMS = [
  {
    title: 'City Auto Ride (5 km)',

    image: '/rides/auto.png',
    otherPrice: 110,
    ourPrice: 85,
    savings: 25
  },
  {
    title: 'Mini Cab Ride (8 km)',

    image: '/rides/sedan.png',
    otherPrice: 190,
    ourPrice: 150,
    savings: 40
  },
  {
    title: 'Prime Sedan City (10 km)',

    image: '/rides/sedan.png',
    otherPrice: 260,
    ourPrice: 215,
    savings: 45
  },
  {
    title: 'Bike Taxi Express (4 km)',

    image: '/rides/motorcycle.png',
    otherPrice: 75,
    ourPrice: 50,
    savings: 25
  },
  {
    title: 'Luxury SUV Ride (15 km)',

    image: '/rides/suv.png',
    otherPrice: 450,
    ourPrice: 370,
    savings: 80
  }
];

const RideCarousel = () => {
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
    <section className="ride-section" style={{ padding: '2.5rem 0', background: '#fafafa', overflow: 'hidden' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '3rem' }}>

        <b><p style={{ color: '#666', fontSize: '1.1rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/ride_logo.png" alt="Ride Logo" style={{ height: '35px', marginRight: '10px' }} /> Ride fares on OneBuddy vs Other Apps.</p></b>
      </div>

      {/* Carousel Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="ride-carousel-container"
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
          .ride-carousel-container::-webkit-scrollbar { display: none; }
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
                  {item.title}
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
                Save ₹{item.savings}
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
                  <div style={{ fontSize: '1rem', color: '#fff', fontWeight: '800' }}>₹{item.ourPrice}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default RideCarousel;
