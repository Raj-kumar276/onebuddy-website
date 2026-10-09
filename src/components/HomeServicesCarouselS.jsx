import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ITEMS = [
    { name: 'Home Services', image: 'https://safaiwale.in/wp-content/uploads/2024/11/House-cleaning.webp', otherPrice: 699, oneBuddyPrice: 499 },
    { name: 'AC Service', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHMTdnqAu0K8HaZ1Cvj4vVtKDOwowJJZPiuPslZfIEDA&s=10', otherPrice: 1500, oneBuddyPrice: 1299 },
    { name: 'Plumbing services', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp4bBrR-YI_OWeQE6o624ccdnEsS5G2ezbXCP4tSshnA&s=10', otherPrice: 900, oneBuddyPrice: 750 },
    { name: 'Water Services', image: 'https://media.istockphoto.com/id/2160475928/photo/industrial-engineer-communicating-via-walkie-talkie-on-site.jpg?s=612x612&w=0&k=20&c=G93tmSER-6UW6FpIHDCBur2ZB5ecaCs7d8S4oQa4KLs=', otherPrice: 499, oneBuddyPrice: 250 },
    { name: 'deep cleaning services', image: 'https://i.pinimg.com/736x/a3/0d/9a/a30d9a78421f7cfff3813f5a13075fb5.jpg', otherPrice: 3599, oneBuddyPrice: 3000 },
    { name: 'Kitchen cleaning', image: 'https://m.economictimes.com/thumb/msid-129839032,width-1600,height-900,resizemode-4,imgsize-2200999/why-aggressive-kitchen-cleaning-may-be-doing-more-harm-than-good.jpg', otherPrice: 899, oneBuddyPrice: 799 },
    { name: 'Bathroom cleaning', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4NctncznAFpoh8XHJ9JoN0csM70Rze5KFKYOIU_jr4Q&s=10', otherPrice: 499, oneBuddyPrice: 399 },
    { name: 'AC Repair', image: 'https://www.handysquad.in/_next/image?url=https%3A%2F%2Fmnxudygqftjfxuzebsnp.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fpublic%2Fhq-cms%2Fsubcategories%2F1784635339952_ccd25c65-1c8b-4868-8b33-41be8b09ad0c_AC-AMC-Basic-Plan.webp&w=3840&q=90', otherPrice: 2500, oneBuddyPrice: 2000 },
    { name: 'Electrician', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjRQUEtI3g3MUEZgDVHSwDNwNgtzpVAl2WPUOh1H6Zdg&s=10', otherPrice: 799, oneBuddyPrice: 599 },
    { name: 'Tap Repair', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn3ALpT5QjIneCX-kPkkMt68V67armmckCifC_0sykQw&s=10', otherPrice: 499, oneBuddyPrice: 399 }
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
        <section className="comparison-section" style={{ padding: '2.5rem 0', background: '#fafafa', overflow: 'hidden' }}>
            <div className="container" style={{ textAlign: 'center', marginBottom: '3rem' }}>

                <b><p style={{ color: '#666', fontSize: '1.1rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/home_logo.png" alt="Home Services Logo" style={{ height: '35px', marginRight: '10px' }} /> Home Services prices on OneBuddy vs Other Stores.</p></b>
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
        </section >
    );
};

export default ComparisonCarousel;
