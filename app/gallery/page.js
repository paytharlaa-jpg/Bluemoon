'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Images, 
  ShieldCheck, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Sparkles, 
  ArrowRight,
  Filter,
  Eye
} from 'lucide-react';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Top reading scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Complete catalog of 36 high-resolution assets organized across the 5 properties + blueprints
  const allImages = [
    // 1. Ultra Luxury Villas (8)
    {
      src: '/gallery/villas-twilight-mansion.jpg',
      title: 'The Celestial Crest Twilight Mansion',
      category: 'villas',
      categoryLabel: 'Ultra Luxury Villas',
      location: 'Kompally / Gandipet Hills',
      specs: 'Triplex Mansion • Heated Lap Pool • Private Lift',
    },
    {
      src: '/gallery/villas-cantilever-hills.jpg',
      title: 'Modernist Cantilever Hillside Villa',
      category: 'villas',
      categoryLabel: 'Ultra Luxury Villas',
      location: 'Gandipet Elevated Ridge',
      specs: 'Cantilever Master Suite • Teak & Volcanic Stone',
    },
    {
      src: '/gallery/villas-double-height-interior.jpg',
      title: 'Double-Height Statuario Marble Foyer',
      category: 'villas',
      categoryLabel: 'Ultra Luxury Villas',
      location: 'Celestial Crest Residences',
      specs: '22 Ft. Ceilings • Custom Chandelier • Smart Glass',
    },
    {
      src: '/gallery/villas-gated-enclave-aerial.jpg',
      title: 'Gated Villa Enclave Master Aerial',
      category: 'villas',
      categoryLabel: 'Ultra Luxury Villas',
      location: 'North Hyderabad Corridor',
      specs: 'Private 100-Acre Enclave • 24/7 Security Ring',
    },
    {
      src: '/gallery/villas-elevation-pool.jpg',
      title: 'Waterfront Villa Reflection Pool',
      category: 'villas',
      categoryLabel: 'Ultra Luxury Villas',
      location: 'Kompally Lake Enclave',
      specs: 'Sunken Fire Lounge • Zero-Edge Pool',
    },
    {
      src: '/gallery/villas-master-estate.jpg',
      title: 'Palatial Sovereign Villa Estate',
      category: 'villas',
      categoryLabel: 'Ultra Luxury Villas',
      location: 'Gandipet Valley',
      specs: '8,500 Sq. Ft. • 5 En-Suite Bedrooms',
    },
    {
      src: '/gallery/villas-palatial-facade.jpg',
      title: 'Contemporary Linear Facade & Courtyard',
      category: 'villas',
      categoryLabel: 'Ultra Luxury Villas',
      location: 'North Corridor Sanctuary',
      specs: 'Zen Water Feature • Italian Travertine Cladding',
    },
    {
      src: '/gallery/villas-contemporary-haven.jpg',
      title: 'Sunlit Private Residence & Garden',
      category: 'villas',
      categoryLabel: 'Ultra Luxury Villas',
      location: 'Kompally Greens',
      specs: 'Private Solarium • Rooftop Stargazing Deck',
    },

    // 2. Luxury Apartments (7)
    {
      src: '/gallery/apartments-skydeck-infinity.jpg',
      title: '45th-Floor Skydeck & Infinity Pool',
      category: 'apartments',
      categoryLabel: 'Luxury Apartments',
      location: 'Financial District Skyline',
      specs: 'Horizon Cabanas • 360° Panoramic City Views',
    },
    {
      src: '/gallery/apartments-aurora-tower.jpg',
      title: 'Aurora Residential Glass Skyscraper',
      category: 'apartments',
      categoryLabel: 'Luxury Apartments',
      location: 'High-Velocity Growth Corridor',
      specs: '50 Storeys • Aerodynamic Curved Balconies',
    },
    {
      src: '/gallery/apartments-highrise-living.jpg',
      title: 'Panoramic High-Rise Sky Mansions',
      category: 'apartments',
      categoryLabel: 'Luxury Apartments',
      location: 'Gachibowli – Financial District',
      specs: '4 BHK Ultra-Spacious • 4,800 Sq. Ft.',
    },
    {
      src: '/gallery/apartments-panoramic-condo.jpg',
      title: 'Floor-To-Ceiling Curtain Wall Living',
      category: 'apartments',
      categoryLabel: 'Luxury Apartments',
      location: 'Aurora Residences',
      specs: 'Triple-Glazed Acoustic Glass • Sunset Vista',
    },
    {
      src: '/gallery/apartments-tower-exterior.jpg',
      title: 'Illuminated Architectural Skyscraper Tower',
      category: 'apartments',
      categoryLabel: 'Luxury Apartments',
      location: 'Kompally Skyline',
      specs: 'LEED Gold Certified • German Elevators',
    },
    {
      src: '/gallery/apartments-residential-haven.jpg',
      title: 'Landscaped Podium & Residential Atrium',
      category: 'apartments',
      categoryLabel: 'Luxury Apartments',
      location: 'Aurora Parklands',
      specs: 'Cascading Water Wall • Concierge Reception',
    },
    {
      src: '/gallery/apartments-skyline-highrise.jpg',
      title: 'Sunset Skyline Towers Elevation',
      category: 'apartments',
      categoryLabel: 'Luxury Apartments',
      location: 'Financial District Corridor',
      specs: 'Helipad Equipped • Smart Home Automation',
    },

    // 3. Open Plots & Layouts (5)
    {
      src: '/gallery/plots-gated-community.jpg',
      title: 'Blue Moon Royal Palms Plotted Enclave',
      category: 'plots',
      categoryLabel: 'Open Plots & Layouts',
      location: 'Medchal Growth Corridor',
      specs: 'HMDA & TS RERA Approved • 60ft Wide Avenues',
    },
    {
      src: '/gallery/plots-master-survey.jpg',
      title: 'Demarcated Gated Plot Layout & Curbs',
      category: 'plots',
      categoryLabel: 'Open Plots & Layouts',
      location: 'Regional Ring Road (RRR) Hub',
      specs: 'Underground Drainage & Electricity Cabling',
    },
    {
      src: '/gallery/plots-avenue-layout.jpg',
      title: 'Royal Palm Boulevard & Infrastructure',
      category: 'plots',
      categoryLabel: 'Open Plots & Layouts',
      location: 'North Corridor Plotted Enclave',
      specs: '100% Vaastu Compliant • Clear Demarcation',
    },
    {
      src: '/gallery/plots-infrastructure-road.jpg',
      title: 'Engineered Blacktop Highways & Curbing',
      category: 'plots',
      categoryLabel: 'Open Plots & Layouts',
      location: 'Medchal Arterial Corridor',
      specs: 'Immediate Bank Loan Eligibility • Ready to Build',
    },
    {
      src: '/gallery/plots-smart-development.jpg',
      title: 'Master-Planned Plotted Community Greenery',
      category: 'plots',
      categoryLabel: 'Open Plots & Layouts',
      location: 'Banswada – Nizamabad Highway',
      specs: '200 to 1,000 Sq. Yds. • 24/7 Security Gate',
    },

    // 4. Commercial Business Hubs (5)
    {
      src: '/gallery/commercial-financial-tower.jpg',
      title: 'Blue Moon Horizon Commercial Plaza',
      category: 'commercial',
      categoryLabel: 'Commercial Hubs',
      location: 'High-Footfall Highway Junction',
      specs: 'Grade-A Retail & Offices • 8-11% Rental Yield',
    },
    {
      src: '/gallery/commercial-corporate-park.jpg',
      title: 'Corporate IT & Tech Campus Plaza',
      category: 'commercial',
      categoryLabel: 'Commercial Hubs',
      location: 'ORR Connectivity Hub',
      specs: 'Pre-Leased Institutional Tenants • 100% Backup',
    },
    {
      src: '/gallery/commercial-glass-atrium.jpg',
      title: 'Triple-Height Commercial Atrium Lobby',
      category: 'commercial',
      categoryLabel: 'Commercial Hubs',
      location: 'Horizon Commercial Plaza',
      specs: 'High Speed Elevators • Basement Parking',
    },
    {
      src: '/gallery/commercial-business-advisory.jpg',
      title: 'Executive Boardroom & Advisory Suite',
      category: 'commercial',
      categoryLabel: 'Commercial Hubs',
      location: 'Kompally HQ Center',
      specs: 'Private Client Concierge • Escrow Services',
    },
    {
      src: '/gallery/commercial-business-center.jpg',
      title: 'Modernist Commercial Retail Corridor',
      category: 'commercial',
      categoryLabel: 'Commercial Hubs',
      location: 'Medchal Arterial Junction',
      specs: 'High Highway Visibility • High ROI',
    },

    // 5. Bulk Land Parcels (5)
    {
      src: '/gallery/land-rolling-acreage.jpg',
      title: 'Strategic Sovereign Acreage Reserves',
      category: 'land',
      categoryLabel: 'Bulk Land Parcels',
      location: 'Regional Ring Road (RRR) Belt',
      specs: '50 to 200+ Acre Contiguous Land Banks',
    },
    {
      src: '/gallery/land-highway-growth-corridor.jpg',
      title: 'Highway Frontage Strategic Land Tract',
      category: 'land',
      categoryLabel: 'Bulk Land Parcels',
      location: 'Hyderabad – Nizamabad Expressway',
      specs: '100% Clear 30-Year Revenue Lineage',
    },
    {
      src: '/gallery/land-strategic-expansion.jpg',
      title: 'Green Agro-Tech & Farm Estate Reserves',
      category: 'land',
      categoryLabel: 'Bulk Land Parcels',
      location: 'Banswada Fertile Corridor',
      specs: 'Abundant Ground Water • Farmhouse Approved',
    },
    {
      src: '/gallery/land-investor-sovereign-tract.jpg',
      title: 'Institutional Wealth Preservation Tract',
      category: 'land',
      categoryLabel: 'Bulk Land Parcels',
      location: 'Telangana Expansion Corridors',
      specs: 'Boundary Fencing • Drone Security Audits',
    },
    {
      src: '/gallery/land-bulk-territory.jpg',
      title: 'Vast Undulating Horizon Land Bank',
      category: 'land',
      categoryLabel: 'Bulk Land Parcels',
      location: 'North Telangana Growth Zone',
      specs: 'Future Industrial & Logistics Zoning',
    },

    // 6. Blueprints & Architectural Dossiers (4)
    {
      src: '/gallery/blueprint-master-plan.jpg',
      title: 'Comprehensive Master-Plan Blueprint',
      category: 'blueprint',
      categoryLabel: 'Architectural Blueprints',
      location: 'Regional Engineering Archive',
      specs: '1:500 Scale CAD Schematic • Arterial Roads',
    },
    {
      src: '/gallery/blueprint-cad-villa.jpg',
      title: 'Celestial Villa CAD Elevation Schematic',
      category: 'blueprint',
      categoryLabel: 'Architectural Blueprints',
      location: 'Architectural Studio',
      specs: 'Structural Engineering & Floor Loading Specs',
    },
    {
      src: '/gallery/blueprint-isometric-dossier.jpg',
      title: 'High-Rise Isometric Engineering Dossier',
      category: 'blueprint',
      categoryLabel: 'Architectural Blueprints',
      location: 'Tower Engineering Department',
      specs: 'Seismic Zone Analysis • Glass Wind Load',
    },
    {
      src: '/gallery/blueprint-site-plan.jpg',
      title: 'Willow Creek Plotted Site Master Plan',
      category: 'blueprint',
      categoryLabel: 'Architectural Blueprints',
      location: 'Planning Commission Filing',
      specs: 'HMDA / RERA Approved Coordinates',
    },
  ];

  const filterTabs = [
    { id: 'all', label: `All Portfolio (${allImages.length})` },
    { id: 'villas', label: 'Villas (8)' },
    { id: 'apartments', label: 'Apartments (7)' },
    { id: 'plots', label: 'Open Plots (5)' },
    { id: 'commercial', label: 'Commercial (5)' },
    { id: 'land', label: 'Bulk Land (5)' },
    { id: 'blueprint', label: 'Blueprints (4)' },
  ];

  // Group images for dedicated sections
  const villaImages = allImages.filter(img => img.category === 'villas');
  const apartmentImages = allImages.filter(img => img.category === 'apartments');
  const plotImages = allImages.filter(img => img.category === 'plots');
  const commercialImages = allImages.filter(img => img.category === 'commercial');
  const landImages = allImages.filter(img => img.category === 'land');
  const blueprintImages = allImages.filter(img => img.category === 'blueprint');

  const openLightbox = (img) => setSelectedImage(img);
  const closeLightbox = () => setSelectedImage(null);

  const navigateLightbox = (dir) => {
    if (!selectedImage) return;
    const currentIndex = allImages.findIndex(img => img.src === selectedImage.src);
    let nextIndex = currentIndex + dir;
    if (nextIndex < 0) nextIndex = allImages.length - 1;
    if (nextIndex >= allImages.length) nextIndex = 0;
    setSelectedImage(allImages[nextIndex]);
  };

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
          SECTION 1: HERO & CINEMATIC GALLERY FILTER (BRIGHT THEME)
         ══════════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(3.5rem, 6vw, 6rem) 5% clamp(2.5rem, 4vw, 4rem) 5%',
          background: 'radial-gradient(circle at 50% 0%, #F0F7FF 0%, #FFFFFF 75%)',
          borderBottom: '1px solid rgba(18, 164, 220, 0.15)',
        }}
      >
        <div style={{ maxWidth: '1380px', margin: '0 auto' }}>
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
              <span style={{ color: '#0A1C3F', fontWeight: 800 }}>GALLERY</span>
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
              36 CURATED ASSETS • 5 CORE PROPERTY DOMAINS
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
              Architectural <span style={{ color: '#12A4DC' }}>Visual Manifesto</span>
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
              An immersive 8-section photographic and technical exploration of Blue Moon Properties.
              Over 36 curated, high-definition photographs and CAD blueprints capturing Telangana’s finest villas, sky towers, plotted layouts, commercial hubs, and strategic land reserves.
            </p>
          </motion.div>

          {/* Interactive Category Filter Pills (Bright Theme) */}
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
            {filterTabs.map((tab) => {
              const isSelected = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveFilter(tab.id);
                    if (tab.id !== 'all') {
                      const sectionMap = {
                        villas: 'section-villas',
                        apartments: 'section-apartments',
                        plots: 'section-plots',
                        commercial: 'section-commercial',
                        land: 'section-land',
                        blueprint: 'section-blueprints',
                      };
                      const targetEl = document.getElementById(sectionMap[tab.id]);
                      if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
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
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════════
          SECTION 2: ULTRA LUXURY VILLAS GALLERY (BRIGHT THEME)
         ══════════════════════════════════════════════════════════════════════════ */}
      <section
        id="section-villas"
        style={{
          padding: 'clamp(4rem, 6vw, 6.5rem) 5%',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid rgba(18, 164, 220, 0.12)',
        }}
      >
        <div style={{ maxWidth: '1380px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '2.5rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#12A4DC', fontSize: '0.82rem', fontFamily: 'var(--font-heading)', fontWeight: 800, letterSpacing: '1.5px', marginBottom: '6px' }}>
                <span>GALLERY SECTION 02</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.9rem, 3.4vw, 2.9rem)', fontWeight: 900, color: '#0A1C3F', margin: 0 }}>
                Ultra Luxury Villas Collection (8 Masterpieces)
              </h2>
            </div>
            <p style={{ fontSize: '0.98rem', color: '#64748B', maxWidth: '480px', margin: 0, lineHeight: 1.6 }}>
              Cantilever hillside architecture, private heated infinity pools, double-height Italian marble foyers, and bespoke private suites in Kompally and Gandipet.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {villaImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 18px 45px rgba(10, 28, 63, 0.12)' }}
                onClick={() => openLightbox(img)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1.5px solid rgba(18, 164, 220, 0.2)',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 6px 20px rgba(10, 28, 63, 0.05)',
                  transition: 'all 0.3s ease',
                }}
                className="group"
              >
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img
                    src={img.src}
                    alt={img.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    className="group-hover:scale-105"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(8px)',
                      color: '#0A1C3F',
                      padding: '6px',
                      borderRadius: '50%',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    }}
                  >
                    <Maximize2 size={15} />
                  </div>
                </div>

                <div style={{ padding: '18px 20px', borderTop: '1px solid rgba(18, 164, 220, 0.12)' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.02rem', fontWeight: 800, color: '#0A1C3F', marginBottom: '4px' }}>
                    {img.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#12A4DC', fontWeight: 600, marginBottom: '6px' }}>
                    <MapPin size={13} />
                    <span>{img.location}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                    {img.specs}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════════
          SECTION 3: LUXURY APARTMENTS GALLERY (BRIGHT THEME)
         ══════════════════════════════════════════════════════════════════════════ */}
      <section
        id="section-apartments"
        style={{
          padding: 'clamp(4rem, 6vw, 6.5rem) 5%',
          backgroundColor: '#F8FAFC',
          borderBottom: '1px solid rgba(18, 164, 220, 0.12)',
        }}
      >
        <div style={{ maxWidth: '1380px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '2.5rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#D2143A', fontSize: '0.82rem', fontFamily: 'var(--font-heading)', fontWeight: 800, letterSpacing: '1.5px', marginBottom: '6px' }}>
                <span>GALLERY SECTION 03</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.9rem, 3.4vw, 2.9rem)', fontWeight: 900, color: '#0A1C3F', margin: 0 }}>
                High-Rise Luxury Apartments & Sky Penthouses (7 Views)
              </h2>
            </div>
            <p style={{ fontSize: '0.98rem', color: '#64748B', maxWidth: '480px', margin: 0, lineHeight: 1.6 }}>
              45th-floor infinity skydeck pool, 50-storey glass aerodynamic skyscrapers, double-height atriums, and sweeping views of Hyderabad Financial District.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {apartmentImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 18px 45px rgba(10, 28, 63, 0.12)' }}
                onClick={() => openLightbox(img)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1.5px solid rgba(18, 164, 220, 0.2)',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 6px 20px rgba(10, 28, 63, 0.05)',
                  transition: 'all 0.3s ease',
                }}
                className="group"
              >
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img
                    src={img.src}
                    alt={img.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    className="group-hover:scale-105"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(8px)',
                      color: '#0A1C3F',
                      padding: '6px',
                      borderRadius: '50%',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    }}
                  >
                    <Maximize2 size={15} />
                  </div>
                </div>

                <div style={{ padding: '18px 20px', borderTop: '1px solid rgba(18, 164, 220, 0.12)' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.02rem', fontWeight: 800, color: '#0A1C3F', marginBottom: '4px' }}>
                    {img.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#12A4DC', fontWeight: 600, marginBottom: '6px' }}>
                    <MapPin size={13} />
                    <span>{img.location}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                    {img.specs}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════════
          SECTION 4: MASTER-PLANNED PLOTTED COMMUNITIES (BRIGHT THEME)
         ══════════════════════════════════════════════════════════════════════════ */}
      <section
        id="section-plots"
        style={{
          padding: 'clamp(4rem, 6vw, 6.5rem) 5%',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid rgba(18, 164, 220, 0.12)',
        }}
      >
        <div style={{ maxWidth: '1380px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '2.5rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#12A4DC', fontSize: '0.82rem', fontFamily: 'var(--font-heading)', fontWeight: 800, letterSpacing: '1.5px', marginBottom: '6px' }}>
                <span>GALLERY SECTION 04</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.9rem, 3.4vw, 2.9rem)', fontWeight: 900, color: '#0A1C3F', margin: 0 }}>
                Master-Planned Plotted Communities & Layouts (5 Views)
              </h2>
            </div>
            <p style={{ fontSize: '0.98rem', color: '#64748B', maxWidth: '480px', margin: 0, lineHeight: 1.6 }}>
              Wide 60ft and 40ft blacktop avenues, underground drainage, Royal Palm plantations, and HMDA / TS RERA demarcated villa plots.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {plotImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 18px 45px rgba(10, 28, 63, 0.12)' }}
                onClick={() => openLightbox(img)}
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1.5px solid rgba(18, 164, 220, 0.2)',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 6px 20px rgba(10, 28, 63, 0.05)',
                  transition: 'all 0.3s ease',
                }}
                className="group"
              >
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={img.src}
                    alt={img.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    className="group-hover:scale-105"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(8px)',
                      color: '#0A1C3F',
                      padding: '6px',
                      borderRadius: '50%',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    }}
                  >
                    <Maximize2 size={15} />
                  </div>
                </div>

                <div style={{ padding: '18px 20px', borderTop: '1px solid rgba(18, 164, 220, 0.12)' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, color: '#0A1C3F', marginBottom: '4px' }}>
                    {img.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#12A4DC', fontWeight: 600, marginBottom: '6px' }}>
                    <MapPin size={13} />
                    <span>{img.location}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                    {img.specs}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════════
          SECTION 5: COMMERCIAL HUBS & BUSINESS PLAZAS (BRIGHT THEME)
         ══════════════════════════════════════════════════════════════════════════ */}
      <section
        id="section-commercial"
        style={{
          padding: 'clamp(4rem, 6vw, 6.5rem) 5%',
          backgroundColor: '#F8FAFC',
          borderBottom: '1px solid rgba(18, 164, 220, 0.12)',
        }}
      >
        <div style={{ maxWidth: '1380px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '2.5rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#D2143A', fontSize: '0.82rem', fontFamily: 'var(--font-heading)', fontWeight: 800, letterSpacing: '1.5px', marginBottom: '6px' }}>
                <span>GALLERY SECTION 05</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.9rem, 3.4vw, 2.9rem)', fontWeight: 900, color: '#0A1C3F', margin: 0 }}>
                Commercial Hubs & Corporate Plazas (5 Views)
              </h2>
            </div>
            <p style={{ fontSize: '0.98rem', color: '#64748B', maxWidth: '480px', margin: 0, lineHeight: 1.6 }}>
              Grade-A corporate retail storefronts, executive atriums, and high-footfall highway developments generating steady 8-11% rental cashflow.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {commercialImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 18px 45px rgba(10, 28, 63, 0.12)' }}
                onClick={() => openLightbox(img)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1.5px solid rgba(210, 20, 58, 0.25)',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 6px 20px rgba(10, 28, 63, 0.05)',
                  transition: 'all 0.3s ease',
                }}
                className="group"
              >
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={img.src}
                    alt={img.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    className="group-hover:scale-105"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(8px)',
                      color: '#0A1C3F',
                      padding: '6px',
                      borderRadius: '50%',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    }}
                  >
                    <Maximize2 size={15} />
                  </div>
                </div>

                <div style={{ padding: '18px 20px', borderTop: '1px solid rgba(210, 20, 58, 0.15)' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, color: '#0A1C3F', marginBottom: '4px' }}>
                    {img.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#D2143A', fontWeight: 700, marginBottom: '6px' }}>
                    <MapPin size={13} />
                    <span>{img.location}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                    {img.specs}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════════
          SECTION 6: STRATEGIC BULK LAND RESERVES (BRIGHT THEME)
         ══════════════════════════════════════════════════════════════════════════ */}
      <section
        id="section-land"
        style={{
          padding: 'clamp(4rem, 6vw, 6.5rem) 5%',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid rgba(18, 164, 220, 0.12)',
        }}
      >
        <div style={{ maxWidth: '1380px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '2.5rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#12A4DC', fontSize: '0.82rem', fontFamily: 'var(--font-heading)', fontWeight: 800, letterSpacing: '1.5px', marginBottom: '6px' }}>
                <span>GALLERY SECTION 06</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.9rem, 3.4vw, 2.9rem)', fontWeight: 900, color: '#0A1C3F', margin: 0 }}>
                Strategic Bulk Land Reserves & Corridors (5 Views)
              </h2>
            </div>
            <p style={{ fontSize: '0.98rem', color: '#64748B', maxWidth: '480px', margin: 0, lineHeight: 1.6 }}>
              Contiguous 5 to 500+ Acre parcels along the Regional Ring Road (RRR) and Nizamabad – Banswada growth corridors for long-term wealth preservation.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {landImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 18px 45px rgba(10, 28, 63, 0.12)' }}
                onClick={() => openLightbox(img)}
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1.5px solid rgba(18, 164, 220, 0.2)',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 6px 20px rgba(10, 28, 63, 0.05)',
                  transition: 'all 0.3s ease',
                }}
                className="group"
              >
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={img.src}
                    alt={img.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    className="group-hover:scale-105"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(8px)',
                      color: '#0A1C3F',
                      padding: '6px',
                      borderRadius: '50%',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    }}
                  >
                    <Maximize2 size={15} />
                  </div>
                </div>

                <div style={{ padding: '18px 20px', borderTop: '1px solid rgba(18, 164, 220, 0.12)' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, color: '#0A1C3F', marginBottom: '4px' }}>
                    {img.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#12A4DC', fontWeight: 600, marginBottom: '6px' }}>
                    <MapPin size={13} />
                    <span>{img.location}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                    {img.specs}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════════
          SECTION 7: BLUEPRINTS & CAD SCHEMATICS (BRIGHT THEME)
         ══════════════════════════════════════════════════════════════════════════ */}
      <section
        id="section-blueprints"
        style={{
          padding: 'clamp(4rem, 6vw, 6.5rem) 5%',
          backgroundColor: '#F8FAFC',
          borderBottom: '1px solid rgba(18, 164, 220, 0.12)',
        }}
      >
        <div style={{ maxWidth: '1380px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '2.5rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#12A4DC', fontSize: '0.82rem', fontFamily: 'var(--font-heading)', fontWeight: 800, letterSpacing: '1.5px', marginBottom: '6px' }}>
                <span>GALLERY SECTION 07</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.9rem, 3.4vw, 2.9rem)', fontWeight: 900, color: '#0A1C3F', margin: 0 }}>
                Blueprints, CAD Schematics & Engineering Plans (4 Dossiers)
              </h2>
            </div>
            <p style={{ fontSize: '0.98rem', color: '#64748B', maxWidth: '480px', margin: 0, lineHeight: 1.6 }}>
              Technical drawings, isometric master plans, CAD villa structural elevations, and HMDA-approved survey schematics.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {blueprintImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 18px 45px rgba(10, 28, 63, 0.12)' }}
                onClick={() => openLightbox(img)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '2px solid rgba(18, 164, 220, 0.3)',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 6px 20px rgba(10, 28, 63, 0.05)',
                  transition: 'all 0.3s ease',
                }}
                className="group"
              >
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden', backgroundColor: '#F0F7FF' }}>
                  <img
                    src={img.src}
                    alt={img.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      padding: '12px',
                      transition: 'transform 0.5s ease',
                    }}
                    className="group-hover:scale-105"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: '#12A4DC',
                      color: '#FFFFFF',
                      padding: '6px',
                      borderRadius: '50%',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    }}
                  >
                    <Maximize2 size={15} />
                  </div>
                </div>

                <div style={{ padding: '18px 20px', borderTop: '1px solid rgba(18, 164, 220, 0.2)' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, color: '#0A1C3F', marginBottom: '4px' }}>
                    {img.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#12A4DC', fontWeight: 600, marginBottom: '6px' }}>
                    <MapPin size={13} />
                    <span>{img.location}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                    {img.specs}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════════
          SECTION 8: LIGHTBOX MODAL & VIP TOUR BOOKING CTA (BRIGHT THEME)
         ══════════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4.5rem, 7vw, 7.5rem) 5%',
          backgroundColor: '#FFFFFF',
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
              backgroundColor: '#0A1C3F',
              borderRadius: '20px',
              border: '2px solid #12A4DC',
              padding: 'clamp(2.5rem, 5vw, 4rem)',
              boxShadow: '0 24px 60px rgba(10, 28, 63, 0.25)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '30px',
            }}
          >
            <div style={{ maxWidth: '700px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#D2143A',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  backgroundColor: 'rgba(210, 20, 58, 0.15)',
                  padding: '4px 12px',
                  borderRadius: '20px',
                }}
              >
                <Sparkles size={16} />
                <span>EXPERIENCE IN PERSON</span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.7rem, 3vw, 2.4rem)',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  margin: '0 0 12px 0',
                }}
              >
                Book A Private Escorted Site Inspection
              </h3>
              <p style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.65, margin: 0 }}>
                Photographs can only reveal a fraction of the grandeur. Experience our properties firsthand with a dedicated Blue Moon senior advisor and luxury chauffeur vehicle.
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <a
                href="https://wa.me/919849442929?text=Hello%20Blue%20Moon,%20I%20would%20like%20to%20book%20a%20private%20escorted%20site%20visit."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#D2143A',
                  color: '#FFFFFF',
                  padding: '14px 28px',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(210, 20, 58, 0.4)',
                  transition: 'all 0.25s ease',
                }}
                className="hover:scale-105"
              >
                <MessageCircle size={18} />
                <span>Book Via WhatsApp</span>
              </a>

              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#FFFFFF',
                  color: '#0A1C3F',
                  padding: '14px 28px',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.25s ease',
                }}
                className="hover:bg-[#12A4DC] hover:text-[#FFFFFF]"
              >
                <span>Contact Office</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          FULLSCREEN LIGHTBOX MODAL WITH ZOOM & NAVIGATION
         ══════════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              backgroundColor: 'rgba(3, 8, 20, 0.96)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '20px',
            }}
          >
            {/* Top Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
              <div>
                <span
                  style={{
                    backgroundColor: '#D2143A',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    padding: '4px 12px',
                    borderRadius: '4px',
                    letterSpacing: '1px',
                    marginRight: '12px',
                  }}
                >
                  {selectedImage.categoryLabel}
                </span>
                <span style={{ fontSize: '0.92rem', color: '#12A4DC', fontWeight: 700 }}>
                  {selectedImage.location}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <a
                  href={`https://wa.me/919849442929?text=Hello%20Blue%20Moon,%20I%20am%20inquiring%20about:%20${encodeURIComponent(selectedImage.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#25D366',
                    color: '#061024',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    textDecoration: 'none',
                  }}
                >
                  <MessageCircle size={15} />
                  <span>Enquire Asset</span>
                </a>

                <button
                  onClick={closeLightbox}
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: 'none',
                    color: '#FFFFFF',
                    padding: '8px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                  }}
                  className="hover:bg-white/30"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Middle Image with Prev / Next Navigation */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '16px 0' }}>
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
                style={{
                  position: 'absolute',
                  left: '10px',
                  background: 'rgba(0, 0, 0, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  padding: '12px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  zIndex: 2,
                }}
                className="hover:bg-[#12A4DC] hover:text-[#061024]"
              >
                <ChevronLeft size={28} />
              </button>

              <motion.img
                key={selectedImage.src}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={selectedImage.src}
                alt={selectedImage.title}
                style={{
                  maxHeight: '75vh',
                  maxWidth: '90vw',
                  objectFit: 'contain',
                  borderRadius: '10px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
                }}
              />

              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
                style={{
                  position: 'absolute',
                  right: '10px',
                  background: 'rgba(0, 0, 0, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  padding: '12px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  zIndex: 2,
                }}
                className="hover:bg-[#12A4DC] hover:text-[#061024]"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 4px 0' }}>
                {selectedImage.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.75)', margin: 0 }}>
                {selectedImage.specs}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
