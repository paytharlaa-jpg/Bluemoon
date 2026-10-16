'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Building2, 
  Home, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  MessageCircle, 
  Layers, 
  Maximize2, 
  Compass, 
  Sparkles, 
  Download,
  Filter,
  Eye,
  Check
} from 'lucide-react';

export default function PropertiesPage() {
  const [activeTab, setActiveTab] = useState('all');

  // Top reading scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const categories = [
    { id: 'all', label: 'All Portfolio (5)' },
    { id: 'villas', label: 'Ultra Luxury Villas' },
    { id: 'apartments', label: 'Luxury Apartments' },
    { id: 'plots', label: 'Open Plots & Layouts' },
    { id: 'commercial', label: 'Commercial Hubs' },
    { id: 'land', label: 'Bulk Land Parcels' },
  ];

  return (
    <main 
      style={{ 
        backgroundColor: '#FFFFFF', 
        color: '#0A1C3F', 
        minHeight: '100vh', 
        paddingTop: '92px',
        overflow: 'hidden'
      }}
    >
      {/* ── Fixed Reading Scroll Progress Bar ── */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #12A4DC 0%, #D2143A 100%)',
          transformOrigin: '0%',
          zIndex: 999999,
        }}
      />

      {/* ══════════════════════════════════════════════════════════════════════════
          SECTION 1: HERO & MASTER CATEGORY SWITCHER (BRIGHT THEME)
         ══════════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(3.5rem, 6vw, 6rem) 5% clamp(2.5rem, 4vw, 4rem) 5%',
          background: 'radial-gradient(circle at 50% 0%, #F0F7FF 0%, #FFFFFF 75%)',
          borderBottom: '1px solid rgba(18, 164, 220, 0.15)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Breadcrumb & RERA tag */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '1.8rem' }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                backgroundColor: '#FFFFFF',
                borderRadius: '30px',
                border: '1px solid rgba(10, 28, 63, 0.12)',
                fontSize: '0.82rem',
                color: '#475569',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '1px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              }}
            >
              <Link href="/" style={{ color: '#12A4DC', textDecoration: 'none', fontWeight: 700 }}>HOME</Link>
              <span>/</span>
              <span style={{ color: '#0A1C3F', fontWeight: 800 }}>PROPERTIES</span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                backgroundColor: 'rgba(210, 20, 58, 0.06)',
                borderRadius: '30px',
                border: '1.5px solid #D2143A',
                fontSize: '0.82rem',
                fontWeight: 800,
                color: '#D2143A',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '1px',
                boxShadow: '0 2px 8px rgba(210, 20, 58, 0.08)',
              }}
            >
              <ShieldCheck size={16} style={{ color: '#D2143A' }} />
              <span>TS RERA NO: A02200004138</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: '960px' }}
          >
            <div
              style={{
                color: '#D2143A',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.88rem',
                fontWeight: 800,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '0.8rem',
              }}
            >
              PRESTIGIOUS DEVELOPMENTS & HIGH-GROWTH LAND BANKS
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.3rem, 5.2vw, 4rem)',
                fontWeight: 900,
                letterSpacing: '1px',
                lineHeight: 1.15,
                color: '#0A1C3F',
                margin: '0 0 1.2rem 0',
                textTransform: 'uppercase',
              }}
            >
              Masterworks Across <span style={{ color: '#12A4DC' }}>5 Core Asset Classes</span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                lineHeight: 1.75,
                color: '#334155',
                margin: '0 0 2.5rem 0',
                maxWidth: '850px',
              }}
            >
              Explore our master-curated real estate portfolio across Telangana’s prime economic corridors.
              From hillside cantilevered villas and high-rise panoramic skydecks to HMDA-approved plotted enclaves and sovereign bulk land reserves.
            </p>
          </motion.div>

          {/* Interactive Category Filter Switcher (Bright White & Red/Cyan) */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              padding: '8px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1.5px solid rgba(18, 164, 220, 0.25)',
              width: 'fit-content',
              maxWidth: '100%',
              boxShadow: '0 4px 16px rgba(10, 28, 63, 0.05)',
            }}
          >
            {categories.map((cat) => {
              const isSelected = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveTab(cat.id);
                    if (cat.id !== 'all') {
                      const el = document.getElementById(cat.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  style={{
                    backgroundColor: isSelected ? '#D2143A' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#0A1C3F',
                    border: isSelected ? '1px solid #D2143A' : '1px solid rgba(10, 28, 63, 0.1)',
                    borderRadius: '8px',
                    padding: '10px 18px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    letterSpacing: '0.8px',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: isSelected ? '0 4px 15px rgba(210, 20, 58, 0.35)' : 'none',
                  }}
                  className={!isSelected ? 'hover:bg-slate-50' : ''}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════════
          SECTION 2: ULTRA LUXURY VILLAS (BRIGHT THEME)
         ══════════════════════════════════════════════════════════════════════════ */}
      <section
        id="villas"
        style={{
          padding: 'clamp(4.5rem, 7vw, 7.5rem) 5%',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid rgba(18, 164, 220, 0.12)',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.8rem' }}
          >
            <span
              style={{
                backgroundColor: '#D2143A',
                color: '#FFFFFF',
                fontSize: '0.78rem',
                fontWeight: 800,
                fontFamily: 'var(--font-heading)',
                letterSpacing: '1px',
                padding: '4px 12px',
                borderRadius: '4px',
              }}
            >
              ASSET CLASS 01
            </span>
            <span style={{ color: '#12A4DC', fontSize: '0.9rem', fontWeight: 700 }}>RERA Certified & Gated Enclave</span>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(2.5rem, 5vw, 4.5rem)',
              alignItems: 'center',
            }}
          >
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2rem, 3.5vw, 3.1rem)',
                  fontWeight: 900,
                  color: '#0A1C3F',
                  lineHeight: 1.2,
                  margin: '0 0 1.2rem 0',
                }}
              >
                Ultra Luxury Villas: The Celestial Crest Estates
              </h2>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: '#475569', marginBottom: '1.8rem' }}>
                Conceived for those who command the highest echelon of architectural beauty. Set amidst lush elevated ridges in North Hyderabad (Kompally) and Gandipet foothills, each triplex mansion is an individual work of sculpture.
              </p>

              {/* Specs Pills Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '14px',
                  marginBottom: '2rem',
                }}
              >
                {[
                  { label: 'Configurations', val: '4 & 5 BHK Triplex Mansions' },
                  { label: 'Super Built-Up Area', val: '4,500 – 8,500 Sq. Ft.' },
                  { label: 'Plot Extent', val: '350 – 800 Sq. Yards' },
                  { label: 'Private Amenities', val: 'Heated Lap Pool & Private Lift' },
                  { label: 'Clubhouse Extent', val: '40,000 Sq. Ft. World-Class Hub' },
                  { label: 'Legal Status', val: '100% Clear Title & TS RERA' },
                ].map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    style={{
                      backgroundColor: '#F8FAFC',
                      border: '1px solid rgba(18, 164, 220, 0.2)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                    }}
                  >
                    <div style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '3px' }}>
                      {spec.label}
                    </div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.94rem', fontWeight: 800, color: '#0A1C3F' }}>
                      {spec.val}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                <a
                  href="https://wa.me/919849442929?text=Hello%20Blue%20Moon%20Properties,%20I%20am%20interested%20in%20Ultra%20Luxury%20Villas."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#D2143A',
                    color: '#FFFFFF',
                    padding: '14px 26px',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(210, 20, 58, 0.35)',
                    transition: 'all 0.25s ease',
                  }}
                  className="hover:scale-105"
                >
                  <MessageCircle size={16} />
                  <span>Enquire Via WhatsApp</span>
                </a>

                <Link
                  href="/gallery"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#F8FAFC',
                    color: '#0A1C3F',
                    border: '1.5px solid rgba(10, 28, 63, 0.2)',
                    padding: '14px 26px',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                  className="hover:border-[#12A4DC] hover:text-[#12A4DC]"
                >
                  <Eye size={16} />
                  <span>View Villa Gallery</span>
                </Link>
              </div>
            </motion.div>

            {/* Right Images Composite with Parallax on Scroll */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <div
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '2px solid rgba(18, 164, 220, 0.2)',
                  boxShadow: '0 20px 50px rgba(10, 28, 63, 0.12)',
                  position: 'relative',
                }}
              >
                <img
                  src="/gallery/villas-twilight-mansion.jpg"
                  alt="Ultra Luxury Villa Twilight Elevation"
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#0A1C3F',
                    border: '1px solid rgba(18, 164, 220, 0.3)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  Architectural Twilight Elevation
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid rgba(18, 164, 220, 0.18)',
                    boxShadow: '0 8px 24px rgba(10, 28, 63, 0.08)',
                  }}
                >
                  <img
                    src="/gallery/villas-cantilever-hills.jpg"
                    alt="Cantilever Hills Villa"
                    style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid rgba(18, 164, 220, 0.18)',
                    boxShadow: '0 8px 24px rgba(10, 28, 63, 0.08)',
                  }}
                >
                  <img
                    src="/gallery/villas-double-height-interior.jpg"
                    alt="Double Height Living Room"
                    style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════════
          SECTION 3: LUXURY APARTMENTS & HIGH-RISE LIVING (BRIGHT THEME)
         ══════════════════════════════════════════════════════════════════════════ */}
      <section
        id="apartments"
        style={{
          padding: 'clamp(4.5rem, 7vw, 7.5rem) 5%',
          backgroundColor: '#F8FAFC',
          borderBottom: '1px solid rgba(18, 164, 220, 0.12)',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.8rem' }}
          >
            <span
              style={{
                backgroundColor: '#12A4DC',
                color: '#FFFFFF',
                fontSize: '0.78rem',
                fontWeight: 800,
                fontFamily: 'var(--font-heading)',
                letterSpacing: '1px',
                padding: '4px 12px',
                borderRadius: '4px',
              }}
            >
              ASSET CLASS 02
            </span>
            <span style={{ color: '#0A1C3F', fontSize: '0.9rem', fontWeight: 700 }}>Skyline Living & Infinite Vistas</span>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(2.5rem, 5vw, 4.5rem)',
              alignItems: 'center',
            }}
          >
            {/* Left Images Composite with Scroll Parallax */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px', order: 2 }}
            >
              <div
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '2px solid rgba(18, 164, 220, 0.2)',
                  boxShadow: '0 20px 50px rgba(10, 28, 63, 0.12)',
                  position: 'relative',
                }}
              >
                <img
                  src="/gallery/apartments-skydeck-infinity.jpg"
                  alt="45th Floor Skydeck Infinity Pool"
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#0A1C3F',
                    border: '1px solid rgba(18, 164, 220, 0.3)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  45th Floor Infinity Skydeck & Horizon Cabanas
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid rgba(18, 164, 220, 0.18)',
                    boxShadow: '0 8px 24px rgba(10, 28, 63, 0.08)',
                  }}
                >
                  <img
                    src="/gallery/apartments-aurora-tower.jpg"
                    alt="Aurora Tower Exterior Glass Facade"
                    style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid rgba(18, 164, 220, 0.18)',
                    boxShadow: '0 8px 24px rgba(10, 28, 63, 0.08)',
                  }}
                >
                  <img
                    src="/gallery/apartments-highrise-living.jpg"
                    alt="Panoramic Balcony Living"
                    style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              style={{ order: 1 }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2rem, 3.5vw, 3.1rem)',
                  fontWeight: 900,
                  color: '#0A1C3F',
                  lineHeight: 1.2,
                  margin: '0 0 1.2rem 0',
                }}
              >
                Luxury Apartments: Aurora Sky Residences
              </h2>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: '#475569', marginBottom: '1.8rem' }}>
                Experience elevated sanctuary in Hyderabad’s prime Financial District & Kompally junctions. Soaring 50 storeys into the clouds, Aurora Sky blends international curtain-wall engineering with expansive private sky decks.
              </p>

              {/* Specs Pills Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '14px',
                  marginBottom: '2rem',
                }}
              >
                {[
                  { label: 'Tower Height', val: '50 Storeys of Pure Glass' },
                  { label: 'Configurations', val: '3, 4 & 5 BHK Sky Mansions' },
                  { label: 'Super Built-Up Area', val: '2,800 – 6,200 Sq. Ft.' },
                  { label: 'Ceiling Height', val: '12 Ft. Clear Floor-to-Ceiling' },
                  { label: 'Skydeck Elevation', val: 'Floor 45 Infinity Pool & Club' },
                  { label: 'EV Parking', val: '100% Dedicated Fast Chargers' },
                ].map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(18, 164, 220, 0.2)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                    }}
                  >
                    <div style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '3px' }}>
                      {spec.label}
                    </div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.94rem', fontWeight: 800, color: '#12A4DC' }}>
                      {spec.val}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                <a
                  href="https://wa.me/919553442929?text=Hello%20Blue%20Moon%20Properties,%20please%20send%20brochure%20and%20pricing%20for%20Luxury%20Apartments."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#12A4DC',
                    color: '#FFFFFF',
                    padding: '14px 26px',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(18, 164, 220, 0.35)',
                    transition: 'all 0.25s ease',
                  }}
                  className="hover:scale-105"
                >
                  <MessageCircle size={16} />
                  <span>Request Floor Plans</span>
                </a>

                <Link
                  href="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#FFFFFF',
                    color: '#0A1C3F',
                    border: '1.5px solid rgba(10, 28, 63, 0.2)',
                    padding: '14px 26px',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                  className="hover:border-[#12A4DC] hover:text-[#12A4DC]"
                >
                  <Phone size={16} />
                  <span>Schedule Site Visit</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════════
          SECTION 4: OPEN PLOTS & COMMERCIAL HUBS (BRIGHT THEME)
         ══════════════════════════════════════════════════════════════════════════ */}
      <section
        id="plots"
        style={{
          padding: 'clamp(4.5rem, 7vw, 7.5rem) 5%',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid rgba(18, 164, 220, 0.12)',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem auto' }}>
            <div
              style={{
                color: '#D2143A',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.88rem',
                fontWeight: 800,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '0.8rem',
              }}
            >
              ASSET CLASSES 03 & 04
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.9rem, 3.5vw, 3rem)',
                fontWeight: 800,
                color: '#0A1C3F',
                margin: '0 0 1.2rem 0',
              }}
            >
              Gated Plotted Enclaves & High-Yield Commercial Hubs
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#64748B', lineHeight: 1.7 }}>
              Whether you seek clear-title residential plots in planned communities or high-ROI retail & office spaces on prominent arterial highways, Blue Moon delivers institutional-grade due diligence.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '30px',
            }}
          >
            {/* Card A: Open Plots */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(10, 28, 63, 0.1)' }}
              style={{
                backgroundColor: '#F8FAFC',
                border: '1.5px solid rgba(18, 164, 220, 0.25)',
                borderTop: '4px solid #12A4DC',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 6px 20px rgba(10, 28, 63, 0.05)',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ height: '260px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src="/gallery/plots-gated-community.jpg"
                  alt="Open Plots Gated Community"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: '#12A4DC',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-heading)',
                    padding: '5px 12px',
                    borderRadius: '4px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                  }}
                >
                  HMDA & TS RERA APPROVED
                </div>
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      color: '#0A1C3F',
                      marginBottom: '10px',
                    }}
                  >
                    Blue Moon Royal Palms Plotted Enclave
                  </h3>
                  <p style={{ fontSize: '0.94rem', color: '#475569', lineHeight: 1.65, marginBottom: '1.2rem' }}>
                    Nestled in Medchal growth corridor. Premium demarcated villa plots with 60ft and 40ft blacktop avenues, underground drainage, royal palm plantations, and 100% Vaastu compliance.
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
                    {['200 to 1,000 Sq. Yds', 'Underground Cabling', 'Bank Loan Approved', 'Immediate Registration'].map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          backgroundColor: 'rgba(18, 164, 220, 0.1)',
                          color: '#12A4DC',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          padding: '4px 10px',
                          borderRadius: '20px',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="https://wa.me/919849442929?text=Hello%20Blue%20Moon,%20I%20am%20inquiring%20about%20Open%20Plots%20availability."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: '#12A4DC',
                    color: '#FFFFFF',
                    borderRadius: '6px',
                    padding: '12px 18px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    boxShadow: '0 4px 15px rgba(18, 164, 220, 0.3)',
                    transition: 'all 0.25s ease',
                  }}
                  className="hover:scale-102"
                >
                  <span>Check Plot Availability</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            </motion.div>

            {/* Card B: Commercial Hubs */}
            <motion.div
              id="commercial"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(10, 28, 63, 0.1)' }}
              style={{
                backgroundColor: '#F8FAFC',
                border: '1.5px solid rgba(210, 20, 58, 0.25)',
                borderTop: '4px solid #D2143A',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 6px 20px rgba(10, 28, 63, 0.05)',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ height: '260px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src="/gallery/commercial-financial-tower.jpg"
                  alt="Commercial Hub and Business Plaza"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: '#D2143A',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-heading)',
                    padding: '5px 12px',
                    borderRadius: '4px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                  }}
                >
                  8% - 11% HIGH RENTAL YIELD
                </div>
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      color: '#0A1C3F',
                      marginBottom: '10px',
                    }}
                  >
                    Blue Moon Horizon Commercial Plaza
                  </h3>
                  <p style={{ fontSize: '0.94rem', color: '#475569', lineHeight: 1.65, marginBottom: '1.2rem' }}>
                    Grade-A corporate retail storefronts and boutique office suites situated along prime highway arterial junctions. Pre-leased anchor tenants providing high predictable cashflow.
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
                    {['Triple-Glazed Facade', 'High Footfall Corridor', '100% Power Backup', 'Ample Basement Parking'].map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          backgroundColor: 'rgba(210, 20, 58, 0.1)',
                          color: '#D2143A',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          padding: '4px 10px',
                          borderRadius: '20px',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="https://wa.me/919553442929?text=Hello%20Blue%20Moon,%20I%20am%20inquiring%20about%20Commercial%20Plaza%20investment."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: '#D2143A',
                    color: '#FFFFFF',
                    borderRadius: '6px',
                    padding: '12px 18px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    boxShadow: '0 4px 15px rgba(210, 20, 58, 0.3)',
                    transition: 'all 0.25s ease',
                  }}
                  className="hover:scale-102"
                >
                  <span>Enquire Commercial Units</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════════
          SECTION 5: BULK LAND PARCELS & CONCIERGE (BRIGHT THEME)
         ══════════════════════════════════════════════════════════════════════════ */}
      <section
        id="land"
        style={{
          padding: 'clamp(4.5rem, 7vw, 7.5rem) 5%',
          backgroundColor: '#F8FAFC',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '2px solid rgba(18, 164, 220, 0.35)',
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(10, 28, 63, 0.08)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 0,
            }}
          >
            {/* Left Content */}
            <div style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(210, 20, 58, 0.08)',
                  border: '1.5px solid #D2143A',
                  color: '#D2143A',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  letterSpacing: '1px',
                  marginBottom: '1rem',
                }}
              >
                ASSET CLASS 05 • INSTITUTIONAL LAND BANKING
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2rem, 3.2vw, 2.9rem)',
                  fontWeight: 900,
                  color: '#0A1C3F',
                  margin: '0 0 1.2rem 0',
                  lineHeight: 1.2,
                }}
              >
                Bulk Land Parcels & Sovereign Holdings
              </h2>

              <p style={{ fontSize: '1.02rem', lineHeight: 1.75, color: '#475569', marginBottom: '1.8rem' }}>
                We assemble, verify, and secure contiguous multi-acre land banks (5 to 500+ Acres) across Telangana’s mega infrastructure corridors: Regional Ring Road (RRR), Outer Ring Road (ORR), and the high-growth Banswada – Nizamabad economic belt.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2.5rem' }}>
                {[
                  '100% Clean 30-Year Revenue Lineage & Encumbrance Free',
                  'Strategic Highway Frontage & Direct Road Connectivity',
                  'Boundary Demarcation, Drone Topography & Fencing Included',
                  'Suitable for Agro-Tech, Farm Estates, Warehousing & Long-Term Banking',
                ].map((point, ptIdx) => (
                  <div key={ptIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={18} style={{ color: '#12A4DC', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.94rem', color: '#0A1C3F', fontWeight: 600 }}>{point}</span>
                  </div>
                ))}
              </div>

              {/* Direct Booking Callouts */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                <a
                  href="tel:+919849442929"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: '#D2143A',
                    color: '#FFFFFF',
                    padding: '14px 26px',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(210, 20, 58, 0.35)',
                    transition: 'all 0.25s ease',
                  }}
                  className="hover:scale-105"
                >
                  <Phone size={17} />
                  <span>Call Land Concierge</span>
                </a>

                <a
                  href="https://wa.me/919849442929?text=Hello%20Blue%20Moon%20Properties,%20I%20am%20interested%20in%20Bulk%20Land%20Parcels."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: '#25D366',
                    color: '#061024',
                    padding: '14px 26px',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(37, 211, 102, 0.25)',
                    transition: 'all 0.25s ease',
                  }}
                  className="hover:scale-105"
                >
                  <MessageCircle size={17} />
                  <span>Instant WhatsApp Dossier</span>
                </a>
              </div>
            </div>

            {/* Right Images Composite */}
            <div
              style={{
                background: `url('/gallery/land-rolling-acreage.jpg') center/cover no-repeat`,
                minHeight: '380px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.2) 60%, rgba(10, 28, 63, 0.4) 100%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  padding: '16px 20px',
                  borderRadius: '10px',
                  border: '1.5px solid rgba(18, 164, 220, 0.3)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.94rem', color: '#D2143A', marginBottom: '4px' }}>
                  SOVEREIGN ACREAGE RESERVE
                </div>
                <div style={{ fontSize: '0.86rem', color: '#334155', fontWeight: 500 }}>
                  Continuous 25 to 200+ Acre holdings mapped with high-precision drone GIS telemetry.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
