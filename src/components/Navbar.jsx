import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Navbar = ({ onPartnerClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isClickScrolling = useRef(false);
  const clickTimeout = useRef(null);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Contact Us', id: 'footer' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      if (isClickScrolling.current) return;

      let current = '';
      navLinks.forEach((link) => {
        const section = document.getElementById(link.id);
        if (section) {
          const sectionTop = section.offsetTop;
          if (window.scrollY >= sectionTop - 150) {
            current = link.id;
          }
        }
      });

      // Handle edge cases like scrolled to very bottom or very top
      const footerElement = document.getElementById('footer') || document.getElementById('contact');
      const isAtBottom = window.innerHeight + Math.ceil(window.scrollY) >= document.documentElement.scrollHeight - 60;
      const isFooterInView = footerElement && footerElement.getBoundingClientRect().top <= window.innerHeight * 0.65;

      if (isAtBottom || isFooterInView) {
        current = 'footer';
      } else if (window.scrollY <= 100) {
        current = 'home';
      }

      if (current !== '') {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (clickTimeout.current) clearTimeout(clickTimeout.current);
    };
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    isClickScrolling.current = true;
    if (clickTimeout.current) clearTimeout(clickTimeout.current);
    clickTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 1000);

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          {/* Logo */}
          <a href="#home" className="logo" onClick={(e) => scrollTo(e, 'home')} style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/onebuddy_logo.png" alt="OneBuddy" style={{ height: '36px', marginRight: '10px' }} />
            OneBuddy
          </a>

          {/* Desktop Nav */}
          <div className="nav-links">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollTo(e, link.id)}
                className={activeSection === link.id ? 'active' : ''}
                style={{
                  color: activeSection === link.id ? 'var(--brand-primary, #7EC400)' : '',
                  fontWeight: activeSection === link.id ? '700' : '500',
                  borderBottom: activeSection === link.id ? '2px solid var(--brand-primary, #7EC400)' : '2px solid transparent',
                  paddingBottom: '4px'
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            className="btn btn-primary nav-btn"
            onClick={onPartnerClick}
          >
            Partner with Us
          </button>

          {/* Mobile Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              className="mobile-menu-close"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            {navLinks.map((link, i) => (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollTo(e, link.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.button
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
              onClick={() => { setMobileOpen(false); onPartnerClick(); }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.07 }}
            >
              Partner with Us
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
