import React from "react";
import imgFood from "../assets/service_food.jpg";
import imgGroceries from "../assets/service_groceries.jpg";
import imgRide from "../assets/service_ride.jpg";
import imgCare from "../assets/service_care.jpg";
import imgHome from "../assets/service_home.jpg";

const PARTNER_SERVICES = [
  {
    id: "food",
    title: "Deliver happiness. Earn on your terms.",
    img: imgFood,
    desc: "Join as a food delivery partner and enjoy zero commission fees. Flexible timings, weekly payouts, and an ever-growing network of top restaurants to pick up from.",
  },
  {
    id: "groceries",
    title: "Neighborhood runs, big earnings.",
    img: imgGroceries,
    desc: "Help people get their daily essentials. Be a grocery shopper and delivery partner. Quick trips in your local area mean more orders and steady income.",
  },
  {
    id: "ride",
    title: "Drive your way to financial freedom.",
    img: imgRide,
    desc: "Whether you have a bike, auto, or cab, drive with OneBuddy to keep 100% of your earnings. No hidden fees, full transparency, and a massive rider base.",
  },
  {
    id: "care",
    title: "Your expertise, valued and rewarded.",
    img: imgCare,
    desc: "Doctors, nurses, and care professionals — reach more patients effortlessly. Manage your own schedule and get instant settlements for your consultations.",
  },
  {
    id: "home",
    title: "Turn your skills into a thriving business.",
    img: imgHome,
    desc: "Electricians, plumbers, and cleaning experts — connect directly with households needing your skills. Set your own availability and boost your monthly income.",
  },
];

export default function PartnerServices() {
  return (
    <section id="partner-services" style={{ padding: '5rem 5%', backgroundColor: '#f9fafb' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <span style={{ 
          color: "var(--brand-primary, #7EC400)", 
          fontWeight: 700, 
          textTransform: "uppercase", 
          letterSpacing: "0.15em", 
          fontSize: "0.85rem", 
          display: "block", 
          marginBottom: "0.75rem" 
        }}>
          Partner Opportunities
        </span>
        <h2 style={{ 
          fontFamily: "var(--font-display, 'Outfit', sans-serif)", 
          fontSize: "clamp(1.8rem, 4vw, 2.5rem)", 
          fontWeight: 800, 
          color: "#111",
          margin: 0
        }}>
          Five sectors. <em style={{ fontStyle: 'normal', color: 'var(--brand-primary, #7EC400)' }}>Infinite</em> possibilities.
        </h2>
        <p style={{ marginTop: "1.25rem", fontSize: "1.25rem", color: "var(--brand-primary, #7EC400)", fontWeight: 700 }}>
          Work More, Earn More
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {PARTNER_SERVICES.map((svc) => (
          <div key={svc.id} style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
          }}
          >
            <img src={svc.img} alt={svc.title} style={{ 
              width: '100%', 
              height: '220px', 
              objectFit: 'cover',
              objectPosition: svc.id === 'ride' ? 'top center' : 'center'
            }} />
            <div style={{ padding: '1.75rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 700, 
                color: '#111', 
                marginBottom: '0.75rem', 
                lineHeight: 1.3 
              }}>
                {svc.title}
              </h3>
              <p style={{ 
                fontSize: '0.95rem', 
                color: '#4b5563', 
                lineHeight: 1.6,
                margin: 0
              }}>
                {svc.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
