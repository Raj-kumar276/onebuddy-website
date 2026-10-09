import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ITEMS = [
  { store: 'BIGBASKET', title: 'Fresh Whole Milk (1L)', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=600', otherPrice: 35, ourPrice: 30 },
  { store: 'BLINKIT', title: 'Brown Eggs (12 pack)', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600', otherPrice: 80, ourPrice: 65 },
  { store: 'ZEPTO', title: 'Organic Bananas (1 doz)', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=600', otherPrice: 70, ourPrice: 55 },
  { store: 'DUNZO', title: 'Basmati Rice (5kg)', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600', otherPrice: 85, ourPrice: 65 },
  { store: 'SWIGGY INSTAMART', title: 'Fresh Avocados (2 pcs)', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600', otherPrice: 99, ourPrice: 80 },
  { store: 'JIOMART', title: 'Sourdough Bread Loaf', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600', otherPrice: 30, ourPrice: 20 },
  { store: 'BIGBASKET', title: 'Greek Yogurt (400g)', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600', otherPrice: 30, ourPrice: 10 },
  { store: 'BLINKIT', title: 'Extra Virgin Olive Oil', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600', otherPrice: 150, ourPrice: 125 },
  { store: 'ZEPTO', title: 'Fresh Strawberries (250g)', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=600', otherPrice: 129, ourPrice: 99 },
  { store: 'DUNZO', title: 'Peanut Butter (500g)', image: 'https://images.unsplash.com/photo-1598965402089-897ce52e8355?auto=format&fit=crop&q=80&w=600', otherPrice: 79, ourPrice: 55 },
  { store: 'SWIGGY INSTAMART', title: 'Almond Milk (1L)', image: 'https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&q=80&w=600', otherPrice: 55, ourPrice: 45 },
  { store: 'JIOMART', title: 'Fresh Broccoli (500g)', image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&q=80&w=600', otherPrice: 35, ourPrice: 30 },
  { store: 'BIGBASKET', title: 'Organic Honey (500g)', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600', otherPrice: 129, ourPrice: 115 },
  { store: 'BLINKIT', title: 'Dark Chocolate Bar', image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80&w=600', otherPrice: 150, ourPrice: 135 },
  { store: 'ZEPTO', title: 'Fresh Orange Juice (1L)', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=600', otherPrice: 99, ourPrice: 75 },
  { store: 'DUNZO', title: 'Whole Wheat Atta (5kg)', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&q=80&w=600', otherPrice: 45, ourPrice: 35 },
  { store: 'SWIGGY INSTAMART', title: 'Mixed Dry Fruits (500g)', image: 'https://images.unsplash.com/photo-1606567595334-d39972c85dbe?auto=format&fit=crop&q=80&w=600', otherPrice: 499, ourPrice: 480 },
  { store: 'JIOMART', title: 'Cheddar Cheese (200g)', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&q=80&w=600', otherPrice: 129, ourPrice: 115 },
  { store: 'BIGBASKET', title: 'Green Tea Bags (25 pcs)', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=600', otherPrice: 89, ourPrice: 69 },
  { store: 'BLINKIT', title: 'Fresh Tomatoes (1kg)', image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&q=80&w=600', otherPrice: 40, ourPrice: 20 },
  { store: 'ZEPTO', title: 'Coconut Water (6 pack)', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=600', otherPrice: 40, ourPrice: 30 }
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
      <div className="container" style={{ textAlign: 'center', marginBottom: '3rem' }}>

        <b><p style={{ color: '#666', fontSize: '1.1rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/grocery_logo.png" alt="Grocery Logo" style={{ height: '35px', marginRight: '10px' }} /> Grocery prices on OneBuddy vs Other Stores. </p></b>
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

              {/* Right Full Color Image */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)'
              }} />

              {/* Divider Line Removed */}

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
