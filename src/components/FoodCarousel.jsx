import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ITEMS = [
  { title: 'Special Chicken Biryani', image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=600', otherPrice: 250, ourPrice: 199 },
  { title: 'Double Cheeseburger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600', otherPrice: 150, ourPrice: 99 },
  { title: 'Margherita Pizza', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600', otherPrice: 199, ourPrice: 149 },
  { title: 'Biscoff Cheesecake', image: 'https://images.unsplash.com/photo-1567171466295-4afa63d45416?auto=format&fit=crop&q=80&w=600', otherPrice: 99, ourPrice: 79 },
  { title: 'Paneer Sandwich', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=600', otherPrice: 129, ourPrice: 99 },
  { title: 'Salmon Sushi Roll', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=600', otherPrice: 199, ourPrice: 129 },
  { title: 'Penne Arrabbiata', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=600', otherPrice: 99, ourPrice: 55 },
  { title: 'Healthy Green Salad', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600', otherPrice: 99, ourPrice: 55 },
  { title: 'Grilled Beef Steak', image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=600', otherPrice: 199, ourPrice: 159 },
  { title: 'Crunchy Tacos (Set of 3)', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=600', otherPrice: 129, ourPrice: 99 },
  { title: 'Classic Pancakes', image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80&w=600', otherPrice: 150, ourPrice: 100 },
  { title: 'Hakka Noodles', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=600', otherPrice: 150, ourPrice: 139 },
  { title: 'Vanilla Ice Cream', image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&q=80&w=600', otherPrice: 100, ourPrice: 60 },
  { title: 'Glazed Donut Box', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=600', otherPrice: 99, ourPrice: 55 },
  { title: 'Nutella Waffle', image: 'https://images.unsplash.com/photo-1504382103100-db7e92322d39?auto=format&fit=crop&q=80&w=600', otherPrice: 99, ourPrice: 45 },
  { title: 'Chicken Shawarma Wrap', image: 'https://images.unsplash.com/photo-1561651188-d207bbec4ec3?auto=format&fit=crop&q=80&w=600', otherPrice: 95, ourPrice: 65 },
  { title: 'Large French Fries', image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80&w=600', otherPrice: 159, ourPrice: 115 },
  { title: 'Tomato Basil Soup', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600', otherPrice: 129, ourPrice: 99 },
  { title: 'Butter Chicken Curry', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=600', otherPrice: 299, ourPrice: 255 },
  { title: 'Red Velvet Cupcake', image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&q=80&w=600', otherPrice: 129, ourPrice: 99 },
  { title: 'BBQ Chicken Wings', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600', otherPrice: 200, ourPrice: 150 }
];

const ComparisonCarousel = () => {
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
      // get offset relative to the container
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

  // Highlight center on mount
  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <section className="comparison-section" style={{ padding: '2.5rem 0', background: '#fafafa', overflow: 'hidden' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: '800',
          color: '#1B1B1B',
          marginBottom: '0.5rem',
          fontFamily: 'var(--font-display)'
        }}>
          Smart <span style={{ color: '#5FA300' }}>Honest Prices</span>, now in your <span style={{ color: '#7EC400' }}>city</span>
        </h2>
        <b><p style={{ color: '#666', fontSize: '1.1rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/food_logo.png" alt="Food Logo" style={{ height: '35px', marginRight: '10px' }} /> Food prices on OneBuddy vs Other Stores. </p></b>
      </div>

      {/* Carousel Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="carousel-container"
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
          .carousel-container::-webkit-scrollbar { display: none; }
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
              transition={{ duration: 0.5, delay: (index % 5) * 0.1 }} // Stagger animation for initial items
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

export default ComparisonCarousel;
