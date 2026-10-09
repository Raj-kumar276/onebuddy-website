import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const YEAR = new Date().getFullYear();

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Contact', id: 'contact' },
];

const SERVICE_LINKS = [
  'OneBuddy Food',
  'OneBuddy Groceries',
  'OneBuddy Ride',
  'OneBuddy Care',
  'OneBuddy Home Services',
];

const scrollTo = (e, id) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-top"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          {/* Brand column */}
          <div>
            <div className="footer-logo">
              OneBuddy
            </div>
            <p className="footer-brand-desc">
              Your all-in-one lifestyle platform. Five powerful services in one
              seamless, everyday ecosystem.
            </p>
            <div className="footer-social">
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l16 16M4 20L20 4" />
                  <path d="M20 4h-5l-11 16h5" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} onClick={(e) => scrollTo(e, l.id)}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-links">
              {SERVICE_LINKS.map((s) => (
                <li key={s}>
                  <a href="#services" onClick={(e) => scrollTo(e, 'services')}>
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer-col-title">Contact</h4>
            <ul className="footer-links">
              <li><a href="mailto:onebuddyin@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} /> onebuddyin@gmail.com</a></li>
              <li><a href="tel:+910000000000" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={16} /> +91 7416708994</a></li>
              <li>
                <a href="https://maps.google.com/?q=2nd+floor,+A2+square+towers,+Jai+Hind+Gandhi+Rd,+VIP+Hills,+Jaihind+Enclave,+Madhapur,+Hyderabad,+Telangana+500081,+India" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: '1.4' }}>
                  <MapPin size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>
                    <strong style={{ display: 'block', marginBottom: '2px' }}>Office Location</strong>
                    2nd floor, A2 square towers, Jai Hind Gandhi Rd, VIP Hills, Jaihind Enclave, Madhapur, Hyderabad, Telangana 500081, India
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span className="footer-copy" style={{ color: 'var(--brand-primary, #7EC400)' }}>
            &copy; {YEAR} OneBuddy. All rights reserved.
          </span>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
