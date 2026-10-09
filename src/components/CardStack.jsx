import { useLayoutEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./CardStack.css";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    bg: "#FF5B4B",
    fg: "#201c1c",
    name: "Affordable Prices",
    genre: "Budget Friendly",
    tag: "SAVINGS",
    title: ["AFFORDABLE", "PRICES"],
    items: [
      "Competitive Rates",
      "Maximum Value Deals",
      "Pocket Friendly",
      "No Hidden Charges",
      "Daily Cost Savings",
    ],
  },
  {
    bg: "#FF9800",
    fg: "#201c1c",
    name: "Easy & Convenient",
    genre: "Single App Access",
    tag: "CONVENIENCE",
    title: ["EASY &", "CONVENIENT"],
    items: [
      "Find & Access from One App",
      "Instant 1-Tap Booking",
      "Smooth Navigation",
      "Quick Discovery",
      "Hassle-Free Flow",
    ],
  },
  {
    bg: "#E8E070",
    fg: "#1c1d1f",
    name: "Multiple Services",
    genre: "All-in-One Platform",
    tag: "SERVICES",
    title: ["MULTIPLE", "SERVICES"],
    big: true,
    items: [
      "Food Delivery",
      "Grocery Shopping",
      "Cab & Bike Rides",
      "Home Services",
      "Care & Helpers",
      "Instant Tasks",
    ],
  },
  {
    bg: "#8BC34A",
    fg: "#1c1d1f",
    name: "Reliable & Secure",
    genre: "Safe & Smooth",
    tag: "SECURITY",
    title: ["RELIABLE &", "SECURE"],
    items: [
      "Safe & Smooth Experience",
      "Verified Service Partners",
      "Encrypted Payments",
      "Data Protection",
      "24/7 Support",
    ],
  },
  {
    bg: "#B2E37D",
    fg: "#1c1d1f",
    name: "One App for All",
    genre: "Everyday Needs",
    tag: "EVERYDAY",
    title: ["EVERYDAY", "NEEDS"],
    items: [
      "Reduces Multiple App Usage",
      "Saves Phone Storage",
      "Unified Orders & History",
      "One Single Account",
      "Seamless Experience",
    ],
  },
  {
    bg: "#5eead4",
    fg: "#00363a",
    name: "Zero Platform Fee",
    genre: "Transparent Pricing",
    tag: "ZERO GST",
    title: ["NO PLATFORM", "FEE & NO GST"],
    items: [
      "Pay Only for What You Order",
      "Zero Hidden Charges",
      "No Platform Fee",
      "No GST Extra",
      "100% Transparent Bills",
    ],
  },
];

export default function CardStack({ cards = CARDS }) {
  const root = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollTriggerRef = useRef(null);
  const total = cards.length;

  // Function to calculate Arc transforms for any offset
  const getArcTransform = useCallback((offset, isMobile) => {
    const angleStep = isMobile ? 24 : 28;
    const angleRad = (offset * angleStep * Math.PI) / 180;

    // Half-circle arc geometry
    const radius = isMobile ? 200 : 320;
    const x = Math.sin(angleRad) * radius + offset * (isMobile ? 18 : 35);
    const y = (1 - Math.cos(angleRad)) * (isMobile ? 70 : 100) + Math.abs(offset) * (isMobile ? 12 : 18);
    const rot = offset * (isMobile ? 10 : 14);
    const scale = Math.max(0.65, 1 - Math.abs(offset) * 0.12);

    // Opacity based on distance from center
    let opacity = 1;
    const abs = Math.abs(offset);
    if (abs > 0.6 && abs <= 1.6) {
      opacity = Math.max(0.6, 1 - (abs - 0.6) * 0.4);
    } else if (abs > 1.6 && abs <= 2.6) {
      opacity = Math.max(0.2, 0.6 - (abs - 1.6) * 0.4);
    } else if (abs > 2.6) {
      opacity = 0;
    }

    const zIndex = Math.round(20 - Math.abs(offset) * 5);

    return { x, y, rot, scale, opacity, zIndex };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray(".service-card");
      if (!els.length) return;

      const isMobile = window.innerWidth < 768;

      // Position update function along the half-circle arc
      const updateArcPositions = (progressFloat) => {
        els.forEach((el, i) => {
          const offset = i - progressFloat;
          const { x, y, rot, scale, opacity, zIndex } = getArcTransform(offset, isMobile);

          gsap.set(el, {
            x,
            y,
            rotationZ: rot,
            scale,
            opacity,
            zIndex,
          });
        });
      };

      // Set initial positions for card 0 centered
      updateArcPositions(0);

      // ScrollTrigger with strict discrete snapping per card
      const st = ScrollTrigger.create({
        trigger: root.current,
        pin: true,
        scrub: 0.5,
        start: "top top",
        end: `+=${(total - 1) * 400}`, // 400px per card makes 1 normal scroll tick advance exactly 1 card
        snap: {
          snapTo: 1 / (total - 1),
          duration: { min: 0.15, max: 0.3 }, // Fast snap
          delay: 0.05,
          ease: "power1.inOut",
        },
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const currentProgress = self.progress * (total - 1);
          updateArcPositions(currentProgress);
          const roundedIdx = Math.min(total - 1, Math.max(0, Math.round(currentProgress)));
          setActiveIndex(roundedIdx);
        },
      });

      scrollTriggerRef.current = st;
    }, root);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [cards, total, getArcTransform]);

  // Jump to specific card
  const goToCard = (index) => {
    if (index < 0 || index >= total || !scrollTriggerRef.current) return;
    const st = scrollTriggerRef.current;
    const targetScroll = st.start + (index / (total - 1)) * (st.end - st.start);
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <div className="cs-wrapper" ref={root}>
      <div className="cs">
        {/* Background Half-Circle Arc Track */}
        <div className="cs-arc-glow" />

        <div className="cs-header-hint">
          <span className="cs-hint-dot" />
          <span className="cs-hint-text">
            {cards[activeIndex].name} ({activeIndex + 1} of {total})
          </span>
        </div>

        {/* Navigation arrows */}
        <button
          className="cs-nav-btn cs-nav-prev"
          onClick={() => goToCard(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous card"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          className="cs-nav-btn cs-nav-next"
          onClick={() => goToCard(activeIndex + 1)}
          disabled={activeIndex === total - 1}
          aria-label="Next card"
        >
          <ChevronRight size={24} />
        </button>

        {/* Half-Circle Arc Card Stack */}
        <div className="card-stack">
          {cards.map((c, idx) => (
            <div
              className={`service-card ${idx === activeIndex ? "is-active" : ""}`}
              key={c.tag || idx}
              onClick={() => goToCard(idx)}
            >
              <div
                className="service-card-inner"
                style={{ background: c.bg, color: c.fg }}
              >
                <div className="card-header">
                  <span>{c.name}</span>
                  <span className="card-index-badge">0{idx + 1}</span>
                </div>
                <div className="artist-section">
                  <span className="artist-prefix">{c.tag}</span>
                  <h2 className={`artist-name${c.big ? " big" : ""}`}>
                    {c.title[0]}
                    <br />
                    {c.title[1]}
                  </h2>
                </div>
                <div className="card-footer">
                  {c.items.map((t) => (
                    <div key={t}>{t}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress dots */}
        <div className="cs-progress-dots">
          {cards.map((_, i) => (
            <button
              key={i}
              className={`cs-progress-dot ${i === activeIndex ? "active" : ""}`}
              onClick={() => goToCard(i)}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
