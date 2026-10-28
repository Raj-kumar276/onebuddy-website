import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ITEMS = [
  { title: 'Fresh Whole Milk ', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=600', otherPrice: 35, ourPrice: 30 },
  { title: 'Fresh Vegetables', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600', otherPrice: 80, ourPrice: 65 },
  { title: 'Natural Milk', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=600', otherPrice: 70, ourPrice: 55 },
  { title: 'Basmati Rice ', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600', otherPrice: 85, ourPrice: 65 },
  { title: 'Watermelon', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600', otherPrice: 99, ourPrice: 80 },
  { title: 'Sourdough Bread Loaf', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600', otherPrice: 30, ourPrice: 20 },
  { title: 'Greek Yogurt ', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600', otherPrice: 30, ourPrice: 10 },
  { title: 'Extra Virgin Olive Oil', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600', otherPrice: 150, ourPrice: 125 },
  { title: 'Fresh Strawberries', image: 'https://i.pinimg.com/736x/ba/fb/64/bafb6465335aa3183bcdf4d21f367051.jpg', otherPrice: 129, ourPrice: 99 },
  { title: 'Peanut Butter ', image: 'https://i.pinimg.com/736x/ad/a5/54/ada5548be128421ba0bdd29c075cd3e8.jpg', otherPrice: 79, ourPrice: 55 },
  { title: 'Ice cream', image: 'https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&q=80&w=600', otherPrice: 55, ourPrice: 45 },
  { title: 'Fresh Broccoli ', image: 'https://i.pinimg.com/736x/7e/dc/52/7edc52a84bf2c3905c66720d3a9b540e.jpg', otherPrice: 35, ourPrice: 30 },
  { title: 'Organic Honey', image: 'https://i.pinimg.com/736x/dd/7e/97/dd7e97c712013da822d20c1f66e45922.jpg', otherPrice: 129, ourPrice: 115 },
  { title: 'Dark Chocolate Bar', image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80&w=600', otherPrice: 150, ourPrice: 135 },
  { title: 'Fresh Orange Juice ', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=600', otherPrice: 99, ourPrice: 75 },
  { title: 'Whole Wheat Atta ', image: 'https://i.pinimg.com/736x/ea/52/a8/ea52a845532a55338bc7db14dbba45ec.jpg', otherPrice: 45, ourPrice: 35 },
  { title: 'Mixed Dry Fruits ', image: 'https://i.pinimg.com/1200x/18/c4/ab/18c4abab57ad47d4750e7b8152b86008.jpg', otherPrice: 499, ourPrice: 480 },
  { title: 'Cheddar Cheese ', image: 'https://i.pinimg.com/736x/6a/43/ba/6a43baf6f12a876c75b4ebd5814189dd.jpg', otherPrice: 129, ourPrice: 115 },
  { title: 'Green Tea Bags ', image: 'https://i.pinimg.com/1200x/8b/8b/a2/8b8ba2c1bd07dfa0d54353eb4cfaa630.jpg', otherPrice: 89, ourPrice: 69 },
  { title: 'Fresh Tomatoes ', image: 'https://i.pinimg.com/1200x/43/f5/1d/43f51d78bed2b91126a23ba2b3e6c6a8.jpg', otherPrice: 40, ourPrice: 20 },
  { title: 'Coconut Water ', image: 'https://i.pinimg.com/736x/20/6c/ac/206cac66691869bb63fdbba58435f677.jpg', otherPrice: 100, ourPrice: 80 }
];

const GroceryCarousel = () => {
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
    <section className="grocery-section" style={{ padding: '2.5rem 0', background: '#fafafa', overflow: 'hidden' }}>
      <div className="container carousel-header-wrap">
        <p className="carousel-badge-title">
          <img src="/grocery_logo.png" alt="Grocery Logo" className="carousel-badge-icon" />
          <span className="carousel-badge-text">Grocery prices on OneBuddy vs Other Stores.</span>
        </p>
      </div>

      {/* Carousel Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="grocery-carousel-container"
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
          .grocery-carousel-container::-webkit-scrollbar { display: none; }
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
              whileHover={{
                scale: isSelected ? 1.08 : 1.05,
                boxShadow: '0 0 32px rgba(126,196,0,0.55), 0 20px 45px rgba(0,0,0,0.25)',
                y: -6,
                transition: { duration: 0.22, ease: 'easeOut' }
              }}
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
                border: isSelected ? '3px solid #7EC400' : '3px solid transparent',
                transition: 'border 0.3s ease'
              }}
            >
              {/* Base Full Color Image */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />

              {/* Left Grayscale Image */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'grayscale(100%)',
                clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)'
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
                top: '2.6rem',
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
                Save ₹{item.otherPrice - item.ourPrice}
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
                  <div style={{ fontSize: '0.55rem', color: '#666', fontWeight: '700', textTransform: 'uppercase' }}>Other Store</div>
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

export default GroceryCarousel;
