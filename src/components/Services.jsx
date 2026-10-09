import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

import imgFood from "../assets/service_food.jpg";
import imgGroceries from "../assets/service_groceries.jpg";
import imgRide from "../assets/service_ride.jpg";
import imgCare from "../assets/service_care.jpg";
import imgHome from "../assets/service_home.jpg";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: "food",
    title: "Your favorite meals, delivered hot.",
    color: "#f97316",
    bg: "#fff7ed",
    img: imgFood,
    desc: "Experience a curated selection of culinary delights from top restaurants near you — delivered piping hot, exactly when you want them.",
  },
  {
    id: "groceries",
    title: "Everyday essentials, made simple.",
    color: "#10b981",
    bg: "#ecfdf5",
    img: imgGroceries,
    desc: "Fresh produce, daily staples, and household necessities — delivered in minutes. Quality groceries you can trust, every single day.",
  },
  {
    id: "ride",
    title: "Move freely. Reach anywhere.",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    img: imgRide,
    desc: "Safe, reliable, and comfortable rides whenever you need them — whether a quick bike ride across town or a premium cab for longer journeys.",
  },
  {
    id: "care",
    title: "Healthcare that stays closer to you.",
    color: "#ec4899",
    bg: "#fdf2f8",
    img: imgCare,
    desc: "Book appointments, consult specialists, and manage your health seamlessly. Top-tier medical professionals, just a tap away.",
  },
  {
    id: "home",
    title: "Comfort and care for every corner.",
    color: "#f59e0b",
    bg: "#fffbeb",
    img: imgHome,
    desc: "Expert professionals for home maintenance, cleaning, and repairs. Vetted, trusted, and ready to make your home a better place.",
  },
];

export default function Services() {
  const root = useRef(null);

  useEffect(() => {
    /* ── Lenis smooth scroll ── */
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const el = root.current;
      const arch = el.querySelector(".srv-arch");
      const right = el.querySelector(".srv-arch__right");
      const imgs = gsap.utils.toArray(".srv-arch__img", el);

      /* ── Sticky right panel with clip reveal for Desktop & Mobile Phone ── */
      const main = gsap.timeline({
        scrollTrigger: {
          trigger: arch,
          start: "top top",
          end: "bottom bottom",
          pin: right,
          pinSpacing: false,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // First image fully visible, all others start hidden (clipped from top so they wipe up from bottom)
      gsap.set(imgs[0], { clipPath: "inset(0% 0% 0% 0%)", objectPosition: "0px 0%" });
      gsap.set(imgs.slice(1), { clipPath: "inset(100% 0% 0% 0%)", objectPosition: "0px 0%" });

      imgs.slice(0, -1).forEach((img, i) => {
        main.add(
          gsap
            .timeline()
            // Fade background colour to next service
            .to(el, { backgroundColor: SERVICES[i + 1].bg, duration: 1.5, ease: "power2.inOut" }, 0)
            // Slide the NEXT image up from the bottom, covering the current one cleanly
            .to(imgs[i + 1], { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "none" }, 0)
            // Add a slight parallax to the old image as it gets covered
            .to(img, { objectPosition: "0px 40%", duration: 1.5, ease: "none" }, 0)
        );
      });
    }, root);

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <section
      id="services"
      className="srv-section"
      ref={root}
      style={{ backgroundColor: SERVICES[0].bg }}
    >
      {/* ── Section header ── */}
      <div className="srv-header-wrap">
        <span className="srv-overline">What We Offer</span>
        <h2 className="srv-headline">
          Five services. <em>One</em> platform.
        </h2>
        <p style={{ marginTop: "1.25rem", fontSize: "1.25rem", color: "var(--brand-primary, #7EC400)", fontWeight: 700 }}>
          Use More, Save More
        </p>
      </div>

      <div className="srv-arch">
        {/* ── Left: tall text panels, one per service ── */}
        <div className="srv-arch__left">
          {SERVICES.map((svc) => (
            <div className="srv-arch__info" key={svc.id}>
              <div className="srv-content">
                <h3 className="srv-item-title">{svc.title}</h3>
                <p className="srv-item-desc">{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Right: stacked images with clip-path reveal ── */}
        <div className="srv-arch__right">
          <div className="srv-img-stack">
            {SERVICES.map((svc, i) => (
              <div
                className="srv-img-wrapper"
                key={svc.id}
                style={{ zIndex: i + 1 }}  /* each next service is rendered above the previous */
              >
                <img className="srv-arch__img" src={svc.img} alt={svc.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
