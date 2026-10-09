import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Navbar from './components/Navbar';
import VideoIntro from './components/VideoIntro';
import Hero from './components/Hero';
import OrbitAnimation from './components/OrbitAnimation';
import About from './components/About';
import ComparisonCarousel from './components/FoodCarousel';
import GroceryCarousel from './components/GroceryCarousel';
import RideCarousel from './components/RideCarousel';
import CareCarousel from './components/CareCarousel';
import Services from './components/Services';
import HomeServices from './components/HomeServicesCarouselS';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PartnerWithUs from './components/PartnerWithUs';

gsap.registerPlugin(ScrollTrigger);

if (typeof window !== 'undefined' && 'history' in window) {
  window.history.scrollRestoration = 'manual';
}

function App() {
  const [showPartner, setShowPartner] = useState(false);

  const handleOpenPartner = () => {
    // Scroll to top before navigating to partner page
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setShowPartner(true);
  };

  const handleClosePartner = () => {
    // Force clear any GSAP-leftover overflow locks on body/html
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.body.style.position = '';
    
    // Reset scroll position BEFORE React re-renders so GSAP pin calculations are correct
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    setShowPartner(false);
    
    // Give DOM time to update display: block, then refresh ScrollTrigger
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      ScrollTrigger.refresh();
    }, 100);
  };

  return (
    <>
      <div style={{ display: showPartner ? 'none' : 'block' }}>
        <MainPage onPartnerClick={handleOpenPartner} />
      </div>
      {showPartner && (
        <PartnerWithUs onClose={handleClosePartner} />
      )}
    </>
  );
}

function MainPage({ onPartnerClick }) {
  // We keep this mounted, so we don't need the complex remount RAF logic here anymore
  return (
    <>
      <Navbar onPartnerClick={onPartnerClick} />
      <main>
        <OrbitAnimation />
        <VideoIntro />
        <Hero />
        <About />
        <ComparisonCarousel />
        <GroceryCarousel />
        <RideCarousel />
        <CareCarousel />
        <HomeServices />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
