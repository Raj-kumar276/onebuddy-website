import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Handshake, Rocket } from 'lucide-react';
import PartnerServices from './PartnerServices';

const steps = [
  {
    number: '01',
    icon: <FileText size={36} color="#10b981" />,
    title: 'Submit Your Application',
    desc: 'Fill out our simple partner registration form with your business details, service type, and contact information.',
    color: '#10b981',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=400',
    bgPosition: 'center center',
  },
  {
    number: '02',
    icon: <Search size={36} color="#8b5cf6" />,
    title: 'Verification & Review',
    desc: 'Our team will verify your documents and review your application within 2–3 business days.',
    color: '#8b5cf6',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400',
    bgPosition: 'top center',
  },
  {
    number: '03',
    icon: <Handshake size={36} color="#f59e0b" />,
    title: 'Agreement & Onboarding',
    desc: 'Sign the partnership agreement and complete the onboarding training with our dedicated support team.',
    color: '#f59e0b',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=400',
    bgPosition: 'center center',
  },
  {
    number: '04',
    icon: <Rocket size={36} color="#ec4899" />,
    title: 'Go Live & Earn',
    desc: 'Get listed on OneBuddy, start receiving orders, and grow your business with our platform.',
    color: '#ec4899',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=400',
    bgPosition: 'center top',
  },
];


const PartnerWithUs = ({ onClose }) => {

  // Always start at the top of the partner page
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <div className="partner-page">
      {/* Close Button */}
      <button className="partner-close-btn" onClick={onClose} aria-label="Close">
        ✕ Back to Home
      </button>

      {/* Hero Image — full width, half screen height */}
      <div className="partner-hero">
        <img src="/partner_hero.jpg" alt="Partner with OneBuddy" className="partner-hero-img" />
        <div className="partner-hero-overlay">
          <motion.div
            className="partner-hero-text"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="partner-overline">partner with onebuddy</span>
            <h1 className="partner-headline">Partner <em>With Us</em></h1>
            <p className="partner-subtext">
              Grow your business by joining India's fastest-growing multi-service platform.
              Reach thousands of customers instantly.
            </p>
          </motion.div>
        </div>
      </div>

      <PartnerServices />

      {/* Registration Steps */}
      <section className="partner-steps-section">
        <div className="partner-steps-header">
          <span className="partner-steps-overline">How It Works</span>
          <h2 className="partner-steps-title">4 Simple Steps to Get Started</h2>
          {/* <p className="partner-steps-sub">Join OneBuddy as a partner and start earning in just a few easy steps.</p> */}
        </div>

        <div className="process__steps-wrap">
          <ol className="process__steps">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="process__step"
                style={{ "--offset": `${(steps.length - 1 - index) * 60}px` }}
              >
                <article
                  className="process__card"
                  style={{ "--card-color": step.color }}
                >
                  <div
                    className="process__card-inner"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.55)), url(${step.image})`,
                      backgroundPosition: step.bgPosition || 'center center',
                    }}
                  >
                    <span className="process__number" aria-hidden="true" style={{ color: step.color }}>
                      {index + 1}
                    </span>
                    <div className="process__card-icon" style={{ color: step.color, marginBottom: '16px' }}>
                      {step.icon}
                    </div>
                    <h3 className="process__card-title">{step.title}</h3>
                    <p className="process__card-text">{step.desc}</p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>



      {/* Registration Form */}
      <section className="partner-form-section">
        <div className="partner-form-wrap">
          <div className="partner-form-left">
            {/* <span className="partner-form-overline">Apply Now</span> */}
            <h2 className="partner-form-title">Start Your Partnership Journey</h2>
            <p className="partner-form-sub">
              Fill in your details and our team will reach out within 48 hours to guide you through the next steps.
            </p>
            <ul className="partner-benefits">
              <li>✅ Zero onboarding fee</li>
              <li>✅ Dedicated support manager</li>
              <li>✅ Real-time earnings dashboard</li>
              <li>✅ Flexible working hours</li>
              <li>✅ Instant payment settlements</li>
              <li>✅ Grow Your Business with ONEBUDDY</li>
              <li>✅ Get More Orders & Bookings</li>
            </ul>

            {/* App Download Buttons */}
            <div style={{ marginTop: '2rem' }}>
              <p style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.85rem' }}>
                Download the Partner App
              </p>
              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                {/* Google Play */}
                <a
                  href="https://onebuddy-admin.vercel.app/#/overview"
                  style={{ display: 'inline-block', transition: 'transform 0.2s', height: '44px' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <img
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                    alt="Get it on Google Play"
                    style={{ height: '64px', marginTop: '-10px' }}
                  />
                </a>

                {/* App Store */}
                <a
                  href="#"
                  style={{ display: 'inline-block', transition: 'transform 0.2s', height: '44px' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="Download on the App Store"
                    style={{ height: '44px' }}
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="partner-form-right">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto', gap: '12px', height: '100%' }}>
              {/* Tall image left */}
              <div style={{ gridRow: '1 / 3', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 28px rgba(0,0,0,0.12)' }}>
                <img
                  src="https://i.pinimg.com/736x/1a/03/f5/1a03f5ee8008004f023203a113011c4c.jpg"
                  alt="Food delivery partner"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '320px' }}
                />
              </div>
              {/* Top right */}
              <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 28px rgba(0,0,0,0.12)' }}>
                <img
                  src="https://i.pinimg.com/736x/d8/03/b0/d803b02de161aef06713bb5155114110.jpg"
                  alt="Grocery partner"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '150px' }}
                />
              </div>
              {/* Bottom right */}
              <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 28px rgba(0,0,0,0.12)', position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=400"
                  alt="Home service partner"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '150px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnerWithUs;
