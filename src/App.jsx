import React, { useState } from 'react';
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

function App() {
  const [showPartner, setShowPartner] = useState(false);

  if (showPartner) {
    return <PartnerWithUs onClose={() => setShowPartner(false)} />;
  }

  return (
    <>
      <Navbar onPartnerClick={() => setShowPartner(true)} />
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
