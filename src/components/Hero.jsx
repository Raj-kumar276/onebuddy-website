import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, User, Search, Utensils, ShoppingBag, Car, Stethoscope, Wrench, Star, ShoppingCart, ArrowRight } from 'lucide-react';
import Logo from './Logo';

const APP_SERVICES = [
  {
    id: 'food',
    color: '#8CCB2E',
    title: 'Food Delivery',
    icon: <Utensils size={16} color="#8CCB2E" />,
    searchPlaceholder: 'Search food delivery...',
    navIcon: <Utensils size={20} />,
    cards: [
      { emoji: '🍔', bgClass: 'bg-orange-100', name: 'Burger King', rating: '4.5', sub: '20-30 min' },
      { emoji: '🍕', bgClass: 'bg-red-100', name: 'Pizza Hut', rating: '4.2', sub: '35-45 min' }
    ]
  },
  {
    id: 'groceries',
    color: '#8CCB2E',
    title: 'Grocery Delivery',
    icon: <ShoppingBag size={16} color="#8CCB2E" />,
    searchPlaceholder: 'Search groceries...',
    navIcon: <ShoppingBag size={20} />,
    cards: [
      { emoji: '🛒', bgClass: 'bg-green-100', name: 'Fresh Market', rating: '4.8', sub: '10-15 min' },
      { emoji: '🥦', bgClass: 'bg-emerald-100', name: 'Daily Needs', rating: '4.6', sub: '15-20 min' }
    ]
  },
  {
    id: 'ride',
    color: '#8CCB2E',
    title: 'Book a Ride',
    icon: <Logo size={16} />,
    searchPlaceholder: 'Where to?',
    navIcon: <Logo size={20} />,
    cards: [
      { emoji: '🚕', bgClass: 'bg-yellow-100', name: 'City Cab', rating: '4.7', sub: '2 mins away' },
      { emoji: '🛵', bgClass: 'bg-amber-100', name: 'Bike Taxi', rating: '4.9', sub: '1 min away' }
    ]
  },
  {
    id: 'care',
    color: '#8CCB2E',
    title: 'Health & Care',
    icon: <Stethoscope size={16} color="#8CCB2E" />,
    searchPlaceholder: 'Search doctors, medicines...',
    navIcon: <Stethoscope size={20} />,
    cards: [
      { emoji: '🏥', bgClass: 'bg-blue-100', name: 'Teleconsult', rating: '4.9', sub: 'Available now' },
      { emoji: '💊', bgClass: 'bg-cyan-100', name: 'Pharmacy', rating: '4.8', sub: '30-40 min' }
    ]
  },
  {
    id: 'home',
    color: '#8CCB2E',
    title: 'Home Services',
    icon: <Wrench size={16} color="#8CCB2E" />,
    searchPlaceholder: 'Search home services...',
    navIcon: <Wrench size={20} />,
    cards: [
      { emoji: '🛠️', bgClass: 'bg-indigo-100', name: 'Plumbing', rating: '4.7', sub: 'In 30 mins' },
      { emoji: '🧹', bgClass: 'bg-violet-100', name: 'Cleaning', rating: '4.8', sub: 'Book schedule' }
    ]
  }
];

const TypewriterText = () => {
  const [text, setText] = useState("");
  const fullText = "Everything you need. One Buddy away.";
  
  useEffect(() => {
    let i = 0;
    let isDeleting = false;
    let timeoutId;

    const type = () => {
      setText(fullText.slice(0, i));

      let speed = isDeleting ? 30 : 70;

      if (!isDeleting && i === fullText.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && i === 0) {
        isDeleting = false;
        speed = 500;
      } else {
        if (isDeleting) {
          i--;
        } else {
          i++;
        }
      }

      timeoutId = setTimeout(type, speed);
    };

    timeoutId = setTimeout(type, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  const part1 = "Everything you need. ";
  const part2 = "One Buddy";

  const currentPart1 = text.slice(0, part1.length);
  const currentPart2 = text.slice(part1.length, part1.length + part2.length);
  const currentPart3 = text.slice(part1.length + part2.length);

  return (
    <h1 className="hero-heading">
      {currentPart1}
      {currentPart2.length > 0 && <span className="hero-highlight">{currentPart2}</span>}
      {currentPart3}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        style={{ display: 'inline-block', width: '3px', backgroundColor: 'currentColor', marginLeft: '4px', height: '0.9em', verticalAlign: 'middle' }}
      />
    </h1>
  );
};

const TypewriterDesc = () => {
  const [text, setText] = useState("");
  const fullText = "OneBuddy brings together Food, Grocery, Rides, Home Services, and Care — all in one simple, seamless platform. Your everyday needs, handled by one buddy you can count on.";
  
  useEffect(() => {
    let i = 0;
    let timeoutId;

    const type = () => {
      setText(fullText.slice(0, i));

      if (i < fullText.length) {
        i++;
        timeoutId = setTimeout(type, 40);
      }
    };

    timeoutId = setTimeout(type, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <p className="hero-desc">
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        style={{ display: 'inline-block', width: '2px', backgroundColor: 'currentColor', marginLeft: '2px', height: '1em', verticalAlign: 'middle' }}
      />
    </p>
  );
};

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % APP_SERVICES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const activeService = APP_SERVICES[activeIndex];

  return (
    <section id="home" className="hero-split">
      <div className="container">
        <div className="hero-grid">
          <motion.div 
            className="hero-text-content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="hero-pill">
              <span className="hero-pill-dot"></span>
              All-in-One Platform
            </div>
            
            <TypewriterText />
            
            <TypewriterDesc />
            
            <div className="hero-actions">
              <button 
                className="btn btn-green"
                onClick={() => scrollTo('services')}
              >
                Explore Services <ArrowRight size={18} />
              </button>
              <button 
                className="btn btn-outline"
                onClick={() => scrollTo('about')}
              >
                Get the App
              </button>
            </div>
          </motion.div>

          {/* Right Phone Mockup */}
          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <div className="phone-mockup">
              {/* Phone Notch/Header */}
              <div className="phone-notch"></div>
              
              {/* Phone Screen */}
              <div className="phone-screen">
                {/* Dynamic Top Area */}
                <motion.div 
                  className="phone-top"
                  animate={{ backgroundColor: activeService.color }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="phone-header-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ background: 'white', borderRadius: '8px', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Logo size={24} />
                    </div>
                    <div className="phone-location" style={{ background: 'rgba(0,0,0,0.1)', padding: '4px 8px', borderRadius: '12px' }}>
                      <MapPin size={12} /> 123 Main St
                    </div>
                    <div className="phone-user" style={{ background: 'rgba(0,0,0,0.1)' }}>
                      <User size={14} />
                    </div>
                  </div>
                  
                  <h3 className="phone-title">What can we help with today?</h3>
                  
                  <div className="phone-search">
                    <Search size={16} />
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={activeService.searchPlaceholder}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {activeService.searchPlaceholder}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Content Area */}
                <div className="phone-content">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeService.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="phone-section-title">
                        {activeService.icon} {activeService.title}
                      </div>
                      
                      {activeService.cards.map((card, idx) => (
                        <div className="phone-card" key={idx}>
                          <div className={`phone-card-img ${card.bgClass}`} style={{ backgroundColor: `${activeService.color}20` }}>
                            {card.emoji}
                          </div>
                          <div className="phone-card-info">
                            <h4>{card.name}</h4>
                            <p><Star size={10} className="star-icon" fill="currentColor" /> {card.rating} • {card.sub}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
