'use client';

import { useState, useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'framer-motion';
import Image from 'next/image';
import {
  ArrowUpRight,
  Compass,
  Sliders,
  Rotate3d,
  TrendingUp,
  FileText,
  Radio,
  Layers,
  ChevronDown,
  Building,
  CheckCircle2,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Disc3,
  Sparkles
} from 'lucide-react';

// ─── Approved Brand Constants ──────────────────────────────────────────────────
// Brand Colors: Primary Blue #26366F | Sky Blue #12A4DC | Premium Red #D2143A | White #FFFFFF
// Typography: Headings 'Trajan Pro Bold' / Cinzel | Body 'Times New Roman'
const BRAND = {
  primaryBlue: '#26366F',
  skyBlue: '#12A4DC',
  premiumRed: '#D2143A',
  white: '#FFFFFF',
};

// ─── The Five Master Collections ───────────────────────────────────────────────
const COLLECTIONS = [
  {
    id: 1,
    roman: 'I',
    num: '01',
    name: 'COMMERCIALS',
    categoryTag: 'GRADE-A CORPORATE ASSETS',
    title: 'COMMERCIAL LANDMARKS',
    subtitle: 'Next-Generation Headquarters & Flagship Retail Hubs',
    image: '/commercial.jpg',
    desc: "Architectural marvels engineered for international enterprise. Column-free floor plates, integrated smart BMS telemetry, biophilic sky terraces, and platinum-grade connectivity anchoring Hyderabad's prime financial corridors.",
    zone: 'FINANCIAL DISTRICT // SECTOR 01',
    coords: '17°26\'44"N  78°22\'18"E',
    compass: '018° NNE',
    minInvestment: 5.0,
    baseArea: '4,500 SQ.FT',
    projectedYield: '11.8% NET',
    appreciation: '16.5% YoY',
    specs: [
      { label: 'DELIVERED SCALE', val: '2.8M+', unit: 'SQ.FT' },
      { label: 'PRIME HUBS', val: '40+', unit: 'TOWERS' },
      { label: 'TENANT ROSTER', val: 'AAA', unit: 'GRADE' },
      { label: 'ECO STANDARD', val: 'PLATINUM', unit: 'LEED' },
    ],
    features: ['High-Speed Elevators', 'Integrated Heliport', 'Double-Height Lobby', 'Zero Carbon Footprint'],
  },
  {
    id: 2,
    roman: 'II',
    num: '02',
    name: 'LAND RESERVES',
    categoryTag: 'SOVEREIGN HOLDINGS',
    title: 'TERRA RESERVES',
    subtitle: 'Curated Institutional Land Banks & Infrastructure Corridors',
    image: '/lands.jpg',
    desc: 'Pristine, strategically accumulated land tracts spanning high-velocity growth axes. Meticulously cleared with 100% legal sovereignty, these generational tracts anchor upcoming master-planned commercial and residential townships.',
    zone: 'OUTER RING ROAD // AXIS 02',
    coords: '17°22\'10"N  78°18\'04"E',
    compass: '112° ESE',
    minInvestment: 8.5,
    baseArea: '10 ACRES',
    projectedYield: '14.2% NET',
    appreciation: '22.0% YoY',
    specs: [
      { label: 'CURATED HOLDINGS', val: '500+', unit: 'ACRES' },
      { label: 'TITLE SECURITY', val: '100%', unit: 'CLEAR' },
      { label: 'CORRIDOR ACCESS', val: '150FT', unit: 'ROAD' },
      { label: 'HORIZON VALUE', val: '3.4X', unit: 'ALPHA' },
    ],
    features: ['Highway Frontage', 'Instant Registration', 'Complete Title Clearance', 'Master-Plan Zoned'],
  },
  {
    id: 3,
    roman: 'III',
    num: '03',
    name: 'LUXURY FLATS',
    categoryTag: 'SKYLINE RESIDENCES',
    title: 'VERTICAL SANCTUARIES',
    subtitle: 'Sculptural High-Rise Residences Overlooking the Horizon',
    image: '/flats.jpg',
    desc: 'Ascending high above the metropolis, these vertical sanctuaries merge monumental structural beauty with the serenity of a private estate. Wrap-around panoramic terraces, acoustic sound isolation, and dedicated private sky lounges.',
    zone: 'JUBILEE HILLS OVERLOOK // SECTOR 03',
    coords: '17°25\'32"N  78°21\'45"E',
    compass: '245° WSW',
    minInvestment: 3.5,
    baseArea: '3,800 SQ.FT',
    projectedYield: '8.4% NET',
    appreciation: '14.8% YoY',
    specs: [
      { label: 'CURATED SUITES', val: '3,200+', unit: 'UNITS' },
      { label: 'TOWER HEIGHT', val: '55', unit: 'FLOORS' },
      { label: 'HOSPITALITY', val: '5★', unit: 'CONCIERGE' },
      { label: 'ACOUSTICS', val: 'P-3', unit: 'ISOLATION' },
    ],
    features: ['Private Elevator Lobby', 'Sky Infinity Pool', 'Bespoke Italian Kitchens', 'Panoramic Decks'],
  },
  {
    id: 4,
    roman: 'IV',
    num: '04',
    name: 'OPEN PLOTS',
    categoryTag: 'CANVAS ESTATES',
    title: 'PRISTINE ENCLAVES',
    subtitle: 'Gated Eco-Sanctuaries & Bespoke Building Canvases',
    image: '/plots.jpg',
    desc: 'An immaculate canvas for your bespoke architectural dream. Situated within secure, low-density gated eco-communities featuring wide tree-lined boulevards, underground utility grids, and private country clubs.',
    zone: 'AEROTROPOLIS CORRIDOR // SECTOR 04',
    coords: '17°19\'50"N  78°28\'12"E',
    compass: '168° SSE',
    minInvestment: 1.8,
    baseArea: '600 SQ.YDS',
    projectedYield: '10.5% NET',
    appreciation: '19.2% YoY',
    specs: [
      { label: 'PLOTTED PARCELS', val: '1,200+', unit: 'PARCELS' },
      { label: 'APPROVAL STATUS', val: '100%', unit: 'HMDA' },
      { label: 'BOULEVARD WIDTH', val: '60FT', unit: 'AVENUE' },
      { label: 'GREEN BUFFER', val: '45%', unit: 'BIOPHILIC' },
    ],
    features: ['100% Vastu Compliant', 'Underground Utilities', 'Clubhouse Access', '24/7 Gated Perimeter'],
  },
  {
    id: 5,
    roman: 'V',
    num: '05',
    name: 'ULTRA VILLAS',
    categoryTag: 'PRIVATE ESTATES',
    title: 'SOVEREIGN RESIDENCES',
    subtitle: 'Palatial Mansions Surrounded by Private Zen Gardens',
    image: '/villas.jpg',
    desc: 'The crowning achievement of residential grandeur. Palatial individual estates designed with double-height marble lobbies, private heated infinity lap pools, zen reflection courtyards, private elevators, and subterranean car galleries.',
    zone: 'PRESTIGE VALLEY ENCLAVE // SECTOR 05',
    coords: '17°24\'08"N  78°19\'36"E',
    compass: '315° NW',
    minInvestment: 9.0,
    baseArea: '8,500 SQ.FT',
    projectedYield: '9.2% NET',
    appreciation: '17.6% YoY',
    specs: [
      { label: 'PALATIAL SCALE', val: '8,500', unit: 'SQ.FT' },
      { label: 'LIMITED EDITION', val: '50+', unit: 'ESTATES' },
      { label: 'PRIVATE AMENITY', val: 'INFINITY', unit: 'POOL' },
      { label: 'WHITE-GLOVE', val: '24/7', unit: 'BUTLER' },
    ],
    features: ['Private Heated Lap Pool', 'Subterranean Car Gallery', 'Private Otis Elevator', 'Smart Home Matrix'],
  },
];

// ─── Inline SVG Symbols for Ticker Tape ─────────────────────────────────────────
const TickerSymbols = {
  Star: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ display: 'inline-block', verticalAlign: 'middle', margin: '0 16px' }}>
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#12A4DC" />
    </svg>
  ),
  Arch: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#26366F" strokeWidth="2" style={{ display: 'inline-block', verticalAlign: 'middle', margin: '0 16px' }}>
      <path d="M4 21V10C4 5.58 7.58 2 12 2C16.42 2 20 5.58 20 10V21" />
      <path d="M2 21H22" />
      <path d="M9 21V14C9 12.34 10.34 11 12 11C13.66 11 15 12.34 15 14V21" />
    </svg>
  ),
  Diamond: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#D2143A" style={{ display: 'inline-block', verticalAlign: 'middle', margin: '0 16px' }}>
      <path d="M12 2L22 12L12 22L2 12L12 2Z" />
    </svg>
  ),
  Crest: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#26366F" strokeWidth="1.8" style={{ display: 'inline-block', verticalAlign: 'middle', margin: '0 16px' }}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3V21M3 12H21" strokeDasharray="2 2" />
      <circle cx="12" cy="12" r="3" fill="#12A4DC" />
    </svg>
  ),
};

// ─── Individual 3D Cinematic Scroll Card (Section 1 - Smooth Transition & Mobile Responsive) ──
function CinematicScrollCard({
  collection,
  index,
  total,
  smoothProgress,
}) {
  const step = 1 / total;
  const start = index * step;
  const center = start + step * 0.5;
  const end = start + step;

  // Ultra-smooth cross-fade transition: Card 0 is 100% visible at start, Card 4 stays at end
  const opacity = useTransform(
    smoothProgress,
    index === 0
      ? [0, 0, center, end - 0.04, end]
      : index === total - 1
      ? [start, start + 0.04, center, 1, 1]
      : [start, start + 0.04, center, end - 0.04, end],
    index === 0
      ? [1, 1, 1, 1, 0]
      : index === total - 1
      ? [0, 1, 1, 1, 1]
      : [0, 1, 1, 1, 0]
  );

  const y = useTransform(
    smoothProgress,
    [start, start + 0.06, center, end - 0.06, end],
    ['50px', '0px', '0px', '0px', '-50px']
  );

  const scale = useTransform(
    smoothProgress,
    [start, center, end],
    [0.93, 1.0, 0.95]
  );

  const rotateX = useTransform(
    smoothProgress,
    [start, start + 0.06, center, end - 0.06, end],
    [-10, 0, 0, 0, 8]
  );

  const rotateY = useTransform(
    smoothProgress,
    [start, center, end],
    [-4, 0, 4]
  );

  const translateZ = useTransform(
    smoothProgress,
    [start, center, end],
    [-100, 0, -100]
  );

  const imageZoom = useTransform(
    smoothProgress,
    [start, center, end],
    [1.08, 1.0, 1.06]
  );

  const specsX = useTransform(
    smoothProgress,
    [start + 0.02, center, end - 0.02],
    ['30px', '0px', '-20px']
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        y,
        scale,
        rotateX,
        rotateY,
        z: translateZ,
        transformStyle: 'preserve-3d',
        pointerEvents: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="cinematic-card-box"
        style={{
          width: '95%',
          maxWidth: '1360px',
          backgroundColor: BRAND.white,
          border: '1px solid rgba(38, 54, 111, 0.16)',
          borderRadius: '24px',
          boxShadow: '0 30px 100px rgba(38, 54, 111, 0.12), 0 10px 30px rgba(18, 164, 220, 0.06)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* macOS Window Controls Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.8rem',
            backgroundColor: '#F8FAFD',
            borderBottom: '1px solid rgba(38, 54, 111, 0.12)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: BRAND.premiumRed, display: 'inline-block' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: BRAND.skyBlue, display: 'inline-block' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: BRAND.primaryBlue, display: 'inline-block' }} />
            <span
              style={{
                marginLeft: '14px',
                fontFamily: 'monospace',
                fontSize: '0.74rem',
                letterSpacing: '1px',
                color: 'rgba(38, 54, 111, 0.6)',
              }}
            >
              BLUEMOON_SOVEREIGN_ARCHIVE_{collection.num}_{collection.name.replace(/\s+/g, '_')}.3D
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '0.74rem',
                color: BRAND.skyBlue,
                fontWeight: 700,
              }}
            >
              COMPASS: {collection.compass}
            </span>
            <span
              style={{
                display: 'inline-block',
                padding: '3px 10px',
                backgroundColor: 'rgba(38, 54, 111, 0.06)',
                borderRadius: '4px',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.7rem',
                letterSpacing: '1.5px',
                color: BRAND.primaryBlue,
                fontWeight: 700,
              }}
            >
              {collection.zone}
            </span>
          </div>
        </div>

        {/* 2-Column Split Stage (Mobile Responsive) */}
        <div
          className="cinematic-split-stage"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            minHeight: '540px',
          }}
        >
          {/* Left Column: Visual */}
          <div
            className="cinematic-left-visual"
            style={{
              position: 'relative',
              minHeight: '400px',
              backgroundColor: '#0F172A',
              overflow: 'hidden',
            }}
          >
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                scale: imageZoom,
              }}
            >
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{
                  objectFit: 'cover',
                  transition: 'filter 0.5s ease',
                }}
                className="grayscale hover:grayscale-0"
              />

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.88) 0%, rgba(38, 54, 111, 0.25) 50%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />

              <div style={{ position: 'absolute', top: '20px', left: '20px', color: BRAND.white, fontFamily: 'monospace', fontSize: '13px', opacity: 0.7 }}>+</div>
              <div style={{ position: 'absolute', top: '20px', right: '20px', color: BRAND.white, fontFamily: 'monospace', fontSize: '13px', opacity: 0.7 }}>+</div>
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: BRAND.white, fontFamily: 'monospace', fontSize: '13px', opacity: 0.7 }}>+</div>
              <div style={{ position: 'absolute', bottom: '20px', right: '20px', color: BRAND.white, fontFamily: 'monospace', fontSize: '13px', opacity: 0.7 }}>+</div>

              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '25px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '9rem',
                  fontWeight: 900,
                  color: 'rgba(255, 255, 255, 0.12)',
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                {collection.roman}
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                  color: BRAND.white,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  zIndex: 2,
                }}
              >
                <div>
                  <span
                    style={{
                      display: 'inline-block',
                      backgroundColor: BRAND.premiumRed,
                      color: BRAND.white,
                      padding: '3px 10px',
                      borderRadius: '3px',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.68rem',
                      letterSpacing: '2px',
                      fontWeight: 700,
                      marginBottom: '6px',
                    }}
                  >
                    STAGE {collection.num} OF 05
                  </span>
                  <h4
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.8rem',
                      color: BRAND.white,
                      letterSpacing: '1px',
                      margin: 0,
                    }}
                  >
                    {collection.title}
                  </h4>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.72rem', color: BRAND.skyBlue, letterSpacing: '1px', display: 'block' }}>
                    ENTRY ALLOCATION
                  </span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 900, color: BRAND.white }}>
                    FROM ₹{collection.minInvestment} CR
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Dossier Specs */}
          <div
            className="cinematic-right-dossier"
            style={{
              padding: '2.4rem 2.2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: BRAND.white,
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.2rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '44px',
                    height: '44px',
                    backgroundColor: BRAND.primaryBlue,
                    color: BRAND.white,
                    borderRadius: '8px',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 900,
                    fontSize: '1.15rem',
                    boxShadow: '0 6px 18px rgba(38, 54, 111, 0.22)',
                  }}
                >
                  {collection.roman}
                </div>
                <div>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.76rem',
                      letterSpacing: '3px',
                      color: BRAND.skyBlue,
                      fontWeight: 700,
                    }}
                  >
                    PORTFOLIO #{collection.num}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.7rem',
                      color: BRAND.primaryBlue,
                      margin: 0,
                      letterSpacing: '0.5px',
                    }}
                  >
                    {collection.name}
                  </h3>
                </div>
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.14rem',
                  fontStyle: 'italic',
                  color: BRAND.primaryBlue,
                  fontWeight: 700,
                  marginBottom: '1rem',
                  lineHeight: 1.4,
                }}
              >
                &ldquo;{collection.subtitle}&rdquo;
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.05rem',
                  lineHeight: 1.75,
                  color: 'rgba(38, 54, 111, 0.8)',
                  marginBottom: '1.8rem',
                }}
              >
                {collection.desc}
              </p>

              {/* Specs */}
              <motion.div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px',
                  marginBottom: '1.8rem',
                  x: specsX,
                }}
              >
                {collection.specs.map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    style={{
                      padding: '12px 16px',
                      backgroundColor: '#F8FAFD',
                      border: '1px solid rgba(38, 54, 111, 0.12)',
                      borderRadius: '8px',
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.65rem',
                        fontFamily: 'var(--font-heading)',
                        letterSpacing: '1.8px',
                        color: 'rgba(38, 54, 111, 0.65)',
                        marginBottom: '4px',
                      }}
                    >
                      {spec.label}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.3rem',
                          fontWeight: 900,
                          color: BRAND.primaryBlue,
                        }}
                      >
                        {spec.val}
                      </span>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          color: BRAND.skyBlue,
                        }}
                      >
                        {spec.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Feature pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '2rem' }}>
                {collection.features.map((feat, fIdx) => (
                  <span
                    key={fIdx}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 12px',
                      backgroundColor: 'rgba(38, 54, 111, 0.04)',
                      border: '1px solid rgba(38, 54, 111, 0.1)',
                      borderRadius: '20px',
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-body)',
                      color: BRAND.primaryBlue,
                    }}
                  >
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: BRAND.skyBlue }} />
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="cinematic-cta-group" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  backgroundColor: BRAND.primaryBlue,
                  color: BRAND.white,
                  padding: '1rem 2rem',
                  borderRadius: '50px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.84rem',
                  letterSpacing: '2px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 8px 24px rgba(38, 54, 111, 0.25)',
                }}
                className="hover:scale-105"
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = BRAND.premiumRed;
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(210, 20, 58, 0.35)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = BRAND.primaryBlue;
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(38, 54, 111, 0.25)';
                }}
              >
                <span>ENQUIRE ARCHITECTURAL ALLOCATION</span>
                <ArrowUpRight size={16} />
              </a>

              <a
                href="/Brochures/Corporate%20Brochure.pdf"
                download="BlueMoon_Portfolio_Dossier.pdf"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: BRAND.white,
                  color: BRAND.primaryBlue,
                  border: `1px solid ${BRAND.primaryBlue}`,
                  padding: '1rem 1.6rem',
                  borderRadius: '50px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.82rem',
                  letterSpacing: '1.5px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  transition: 'all 0.3s ease',
                }}
                className="hover:scale-105"
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#F8FAFD';
                  e.currentTarget.style.borderColor = BRAND.skyBlue;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = BRAND.white;
                  e.currentTarget.style.borderColor = BRAND.primaryBlue;
                }}
              >
                <FileText size={16} color={BRAND.primaryBlue} />
                <span>DOSSIER PDF</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function PropertyShowcase() {
  const containerRef = useRef(null);
  const catalogSectionRef = useRef(null);

  const [investAmount, setInvestAmount] = useState(10);
  const [activeCollectionIdx, setActiveCollectionIdx] = useState(0);

  // Safe clamping to guarantee no out-of-bounds indexing or undefined exceptions
  const safeActiveIdx = Math.max(0, Math.min(activeCollectionIdx ?? 0, COLLECTIONS.length - 1));
  const activeCollection = COLLECTIONS[safeActiveIdx] || COLLECTIONS[0];

  // ── Section 1: Scroll binding for 5 properties ──
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
    restDelta: 0.0005,
  });

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      const val = typeof latest === 'number' && !isNaN(latest) ? latest : 0;
      const clampedLatest = Math.max(0, Math.min(val, 0.9999));
      const idx = Math.floor(clampedLatest * COLLECTIONS.length);
      setActiveCollectionIdx(idx);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  const tickerX = useTransform(smoothProgress, [0, 1], ['0%', '-65%']);
  const watermarkScale = useTransform(smoothProgress, [0, 1], [0.85, 1.45]);
  const watermarkOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.03, 0.06, 0.03]);
  const progressHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  // ── Smooth Background Color & Ambient Transitions for the 5 Properties ──
  // Commercials (Crystal Corporate Blue) -> Land Reserves (Sage Terra Green) -> Luxury Flats (Palatial Rose Champagne) -> Open Plots (Horizon Azure) -> Ultra Villas (Imperial Warm Gold)
  const sectionBgColor = useTransform(
    smoothProgress,
    [0, 0.22, 0.45, 0.68, 0.9, 1],
    [
      '#F4F7FC', // Commercials
      '#F2F8F4', // Land Reserves
      '#FBF5F7', // Luxury Flats
      '#F2F8FC', // Open Plots
      '#FCF9F2', // Ultra Villas
      '#FCF9F2',
    ]
  );

  const ambientGlowGradient = useTransform(
    smoothProgress,
    [0, 0.22, 0.45, 0.68, 0.9, 1],
    [
      'radial-gradient(ellipse at center, rgba(18, 164, 220, 0.16) 0%, rgba(38, 54, 111, 0.03) 55%, transparent 75%)',
      'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.14) 0%, rgba(38, 54, 111, 0.03) 55%, transparent 75%)',
      'radial-gradient(ellipse at center, rgba(210, 20, 58, 0.14) 0%, rgba(38, 54, 111, 0.03) 55%, transparent 75%)',
      'radial-gradient(ellipse at center, rgba(14, 165, 233, 0.16) 0%, rgba(38, 54, 111, 0.03) 55%, transparent 75%)',
      'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.15) 0%, rgba(38, 54, 111, 0.03) 55%, transparent 75%)',
      'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.15) 0%, rgba(38, 54, 111, 0.03) 55%, transparent 75%)',
    ]
  );

  // Screen size state for responsive touch & geometry
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Touch drag interaction for Rotary Wheel on mobile
  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      setIsDragging(true);
      setDragStartX(e.touches[0].clientX);
      setDragStartAngle(dragOffsetAngle);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !e.touches || !e.touches[0]) return;
    const deltaX = e.touches[0].clientX - dragStartX;
    setDragOffsetAngle(dragStartAngle + deltaX * 0.4);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // ── Section 2: Complete Portfolio Catalog Rotary Wheel (EXACTLY 5 CARDS) ──
  const { scrollYProgress: catalogScrollProgress } = useScroll({
    target: catalogSectionRef,
    offset: ['start start', 'end end'],
  });

  const smoothCatalogScroll = useSpring(catalogScrollProgress, {
    stiffness: 85,
    damping: 22,
    mass: 0.5,
  });

  // Track scroll velocity: both catalog-specific and window-wide scroll velocity
  const { scrollY } = useScroll();
  const windowScrollVelocity = useVelocity(scrollY);
  const catalogScrollVelocity = useVelocity(catalogScrollProgress);

  // Background Motion Graphics continuous rotation: moves auto, accelerates with scroll!
  const bgCompassRotate = useMotionValue(0);
  const bgInnerRingRotate = useMotionValue(0);
  const bgOrbitRotate = useMotionValue(0);
  const bgRadarRotate = useMotionValue(0);
  const currentSpeedRef = useRef(20);
  const [liveScrollSpeed, setLiveScrollSpeed] = useState('IDLE 20°/S');

  useAnimationFrame((time, delta) => {
    const dt = Math.min(delta / 1000, 0.05);
    const vWin = Math.abs(windowScrollVelocity.get() || 0); // Window scroll in px/sec
    const vCat = Math.abs(catalogScrollVelocity.get() || 0); // Catalog progress rate
    
    // Calm, majestic architectural motion (much slower as requested!):
    // Idle auto speed: 2.6 deg/s (slow, tranquil, graceful drift)
    // When scrolling: gently increases up to 9.5 deg/s (smooth acceleration, never frantic!)
    const scrollBoost = Math.min(vWin * 0.005 + vCat * 4, 7);
    const targetSpeed = 2.6 + scrollBoost;

    // Smooth inertia interpolation:
    currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * 0.06;

    bgCompassRotate.set((bgCompassRotate.get() + currentSpeedRef.current * dt) % 360);
    bgInnerRingRotate.set((bgInnerRingRotate.get() - currentSpeedRef.current * 0.6 * dt) % 360);
    bgOrbitRotate.set((bgOrbitRotate.get() - currentSpeedRef.current * 0.4 * dt) % 360);
    bgRadarRotate.set((bgRadarRotate.get() + currentSpeedRef.current * 1.0 * dt) % 360);
  });

  // Continuous wheel rotation driven by catalog scroll (rotates through all 5 cards)
  const [scrollWheelAngle, setScrollWheelAngle] = useState(0);
  const [dragOffsetAngle, setDragOffsetAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartAngle, setDragStartAngle] = useState(0);

  // 5 cards means 72 degrees per card. Full 360 degrees rotation over the scroll track!
  useEffect(() => {
    const unsubscribe = smoothCatalogScroll.on('change', (latest) => {
      setScrollWheelAngle(latest * -360);
    });
    return () => unsubscribe();
  }, [smoothCatalogScroll]);

  // Combined rotation angle
  const totalRotaryAngle = scrollWheelAngle + dragOffsetAngle;

  const cardCount = COLLECTIONS.length; // Exactly 5 cards!
  const angleStep = 360 / cardCount; // 72 degrees!

  // Active index at apex
  const activeRotaryIndex =
    Math.round(((-totalRotaryAngle % 360 + 360) % 360) / angleStep) % cardCount;
  const currentRotaryItem = COLLECTIONS[activeRotaryIndex] || COLLECTIONS[0];
  const safeRotaryItem = currentRotaryItem || COLLECTIONS[0];

  const handleNextRotary = () => {
    setDragOffsetAngle((prev) => prev - angleStep);
  };

  const handlePrevRotary = () => {
    setDragOffsetAngle((prev) => prev + angleStep);
  };

  const scrollToCollection = (idx) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const containerHeight = containerRef.current.offsetHeight;
    const targetScroll = containerTop + (idx * 0.2 + 0.05) * (containerHeight - window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const scrollToCatalog = () => {
    if (catalogSectionRef.current) {
      catalogSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Drag interaction for Rotary Wheel
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartAngle(dragOffsetAngle);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX;
    setDragOffsetAngle(dragStartAngle + deltaX * 0.35);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
  };

  // Calculator figures
  const projectedAppreciation5Yr = (investAmount * Math.pow(1.155, 5)).toFixed(2);
  const annualYield = (investAmount * 0.108).toFixed(2);
  const totalWealthGain = (projectedAppreciation5Yr - investAmount).toFixed(2);

  const recommendedCategory =
    investAmount < 3
      ? 'OPEN PLOTS // PRISTINE ENCLAVES'
      : investAmount < 7
      ? 'LUXURY FLATS // VERTICAL SANCTUARIES'
      : investAmount < 15
      ? 'COMMERCIALS // GRADE-A LANDMARKS'
      : 'ULTRA VILLAS & TERRA RESERVES';

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════════
          1. 3D SCROLL-DRIVEN 5 PROPERTIES SHOWCASE (500vh Sticky Experience)
         ══════════════════════════════════════════════════════════════════════════ */}
      <div
        ref={containerRef}
        id="property-showcase"
        style={{
          position: 'relative',
          height: '500vh',
          backgroundColor: BRAND.white,
        }}
      >
        <motion.div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            backgroundColor: sectionBgColor,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            perspective: '2000px',
            transition: 'background-color 0.4s ease',
          }}
        >
          {/* Grid Background */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              backgroundImage: `
                linear-gradient(to right, rgba(38, 54, 111, 0.035) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(38, 54, 111, 0.035) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
              opacity: 0.8,
              zIndex: 0,
            }}
          />

          {/* Daylight Ambient Glow (Morphs smoothly between 5 ambient colors!) */}
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-15%',
              left: '50%',
              x: '-50%',
              width: '90vw',
              height: '450px',
              borderRadius: '50%',
              background: ambientGlowGradient,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Dynamic Watermark */}
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '8%',
              right: '5%',
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(9rem, 24vw, 26rem)',
              fontWeight: 900,
              color: BRAND.primaryBlue,
              opacity: watermarkOpacity,
              scale: watermarkScale,
              lineHeight: 0.8,
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            {activeCollection?.roman || 'I'}
          </motion.div>

          {/* Top Bar: Telemetry & Status */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              padding: '1.4rem 4vw 0.8rem 4vw',
              borderBottom: '1px solid rgba(38, 54, 111, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '10px',
                    height: '10px',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      backgroundColor: BRAND.premiumRed,
                      opacity: 0.75,
                      animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
                    }}
                  />
                  <span
                    style={{
                      position: 'relative',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: BRAND.premiumRed,
                    }}
                  />
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.78rem',
                    letterSpacing: '3px',
                    color: BRAND.primaryBlue,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  SCROLL ARCHIVE // 3D CINEMATIC MOTION
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.72rem',
                    letterSpacing: '2px',
                    color: BRAND.skyBlue,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  SCROLL TO ADVANCE PROPERTIES
                </span>
                <ChevronDown size={14} color={BRAND.skyBlue} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button
                  onClick={scrollToCatalog}
                  style={{
                    cursor: 'pointer',
                    background: 'none',
                    border: `1px solid ${BRAND.skyBlue}`,
                    padding: '4px 14px',
                    borderRadius: '20px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.7rem',
                    color: BRAND.primaryBlue,
                    letterSpacing: '1px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                  className="hover:scale-105"
                >
                  5-CARDS ROTARY DIAL ↓
                </button>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '2px 8px',
                    backgroundColor: 'rgba(18, 164, 220, 0.1)',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '0.74rem',
                    color: BRAND.skyBlue,
                    fontWeight: 700,
                  }}
                >
                  {safeActiveIdx + 1} / {COLLECTIONS.length}
                </span>
              </div>
            </div>
          </div>

          {/* Continuous Ticker Tape */}
          <div
            style={{
              position: 'relative',
              zIndex: 9,
              backgroundColor: '#F9FBFE',
              borderBottom: '1px solid rgba(38, 54, 111, 0.12)',
              padding: '0.8rem 0',
              overflow: 'hidden',
            }}
          >
            <motion.div
              style={{
                display: 'flex',
                whiteSpace: 'nowrap',
                width: 'max-content',
                x: tickerX,
              }}
            >
              {[0, 1, 2].map((copyIdx) => (
                <div
                  key={copyIdx}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.92rem',
                    letterSpacing: '3px',
                    fontWeight: 700,
                    color: BRAND.primaryBlue,
                    textTransform: 'uppercase',
                    paddingRight: '30px',
                  }}
                >
                  <span>IN EVERY BLUE MOON DESTINATION</span>
                  <TickerSymbols.Star />
                  <span>DISCOVER THE UNDENIABLE SOVEREIGN PRESTIGE</span>
                  <TickerSymbols.Arch />
                  <span>OF SHARING ARCHITECTURAL MAJESTY</span>
                  <TickerSymbols.Diamond />
                  <span>THAT BRINGS GENERATIONS AND LEGACIES TOGETHER</span>
                  <TickerSymbols.Crest />
                  <span style={{ color: BRAND.skyBlue }}>I. COMMERCIALS</span>
                  <TickerSymbols.Star />
                  <span style={{ color: BRAND.primaryBlue }}>II. LAND RESERVES</span>
                  <TickerSymbols.Arch />
                  <span style={{ color: BRAND.skyBlue }}>III. LUXURY FLATS</span>
                  <TickerSymbols.Diamond />
                  <span style={{ color: BRAND.primaryBlue }}>IV. OPEN PLOTS</span>
                  <TickerSymbols.Star />
                  <span style={{ color: BRAND.premiumRed }}>V. ULTRA VILLAS</span>
                  <TickerSymbols.Crest />
                </div>
              ))}
            </motion.div>
          </div>

          {/* 3D Sequential Cards Stage */}
          <div
            style={{
              position: 'relative',
              flex: 1,
              width: '100%',
              padding: '0 4vw',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transformStyle: 'preserve-3d',
              perspective: '2000px',
            }}
          >
            {COLLECTIONS.map((c, idx) => (
              <CinematicScrollCard
                key={c.id}
                collection={c}
                index={idx}
                total={COLLECTIONS.length}
                smoothProgress={smoothProgress}
              />
            ))}

            {/* Right Elevator HUD (Hidden on mobile for full card width) */}
            <div
              className="cinematic-hud-desktop"
              style={{
                position: 'absolute',
                right: '2.5vw',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 30,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  bottom: '10px',
                  width: '2px',
                  backgroundColor: 'rgba(38, 54, 111, 0.12)',
                  zIndex: 0,
                }}
              >
                <motion.div
                  style={{
                    width: '100%',
                    height: progressHeight,
                    backgroundColor: BRAND.skyBlue,
                  }}
                />
              </div>

              {COLLECTIONS.map((item, idx) => {
                const isCurrent = idx === activeCollectionIdx;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToCollection(idx)}
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      cursor: 'pointer',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      border: isCurrent ? `2px solid ${BRAND.skyBlue}` : '1px solid rgba(38, 54, 111, 0.2)',
                      backgroundColor: isCurrent ? BRAND.primaryBlue : BRAND.white,
                      color: isCurrent ? BRAND.white : BRAND.primaryBlue,
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.82rem',
                      fontWeight: 900,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      boxShadow: isCurrent ? '0 0 16px rgba(18, 164, 220, 0.45)' : 'none',
                    }}
                    className="hover:scale-110"
                    title={`${item.roman} - ${item.name}`}
                  >
                    {item.roman}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              padding: '0.8rem 4vw',
              backgroundColor: 'rgba(255, 255, 255, 0.94)',
              borderTop: '1px solid rgba(38, 54, 111, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-heading)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'rgba(38, 54, 111, 0.6)' }}>ACTIVE COLLECTION:</span>
              <span style={{ fontWeight: 900, color: BRAND.primaryBlue, letterSpacing: '1px' }}>
                [{activeCollection?.roman || 'I'}] {activeCollection?.name || 'COMMERCIALS'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'rgba(38, 54, 111, 0.6)' }}>PROGRESS:</span>
              <span style={{ fontWeight: 900, color: BRAND.skyBlue }}>
                {Math.min(Math.round((safeActiveIdx + 1) * 20), 100)}%
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════
          2. UPGRADED: 5-CARDS ROTARY DIAL WITH GLOWING NEON BORDERS
             & DYNAMIC AUTOPLAY + SCROLL-ACCELERATED BACKGROUND MOTION GRAPHICS
         ══════════════════════════════════════════════════════════════════════════ */}
      <div
        ref={catalogSectionRef}
        id="complete-portfolio-catalog"
        style={{
          position: 'relative',
          height: '320vh', // Sticky track so cards rotate continuously with scroll
          backgroundColor: BRAND.white,
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            backgroundColor: BRAND.white,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '82px', // Leaves full clearance for fixed navbar so text is never cut off!
            boxSizing: 'border-box',
            borderTop: '1px solid rgba(38, 54, 111, 0.12)',
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* ── HIGH-CONTRAST DYNAMIC BACKGROUND MOTION GRAPHICS (UPGRADED) ── */}
          {/* Moves auto continuously; accelerates visibly while scrolling; decelerates smoothly when stopped */}

          {/* Motion Element 1: High-Contrast Rotating Compass Wheel with 8 Cardinal Badges & Crosshairs */}
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '52%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              width: '1120px',
              height: '1120px',
              borderRadius: '50%',
              border: '2px dashed rgba(38, 54, 111, 0.28)',
              rotate: bgCompassRotate, // Auto + Scroll accelerated!
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            {/* Rotating Crosshair Axes */}
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', borderTop: '1px dashed rgba(38, 54, 111, 0.22)' }} />
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', borderLeft: '1px dashed rgba(38, 54, 111, 0.22)' }} />

            {/* 8 Cardinal & Intercardinal Markers on the Ring: 100% UNMISTAKABLY VISIBLE! */}
            {[
              { label: 'NORTH // 000°', angle: 0, primary: true },
              { label: 'NE 045°', angle: 45, primary: false },
              { label: 'EAST // 090°', angle: 90, primary: true },
              { label: 'SE 135°', angle: 135, primary: false },
              { label: 'SOUTH // 180°', angle: 180, primary: true },
              { label: 'SW 225°', angle: 225, primary: false },
              { label: 'WEST // 270°', angle: 270, primary: true },
              { label: 'NW 315°', angle: 315, primary: false },
            ].map((card, cIdx) => {
              const rad = (card.angle * Math.PI) / 180;
              const rDist = 560; // On outer boundary
              const xPos = Math.round(rDist * Math.sin(rad));
              const yPos = Math.round(-rDist * Math.cos(rad));
              return (
                <div
                  key={cIdx}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `translate(calc(-50% + ${xPos}px), calc(-50% + ${yPos}px))`,
                    backgroundColor: card.primary ? BRAND.primaryBlue : BRAND.white,
                    color: card.primary ? BRAND.white : BRAND.skyBlue,
                    border: `1.5px solid ${card.primary ? BRAND.skyBlue : 'rgba(18, 164, 220, 0.7)'}`,
                    padding: card.primary ? '3px 10px' : '2px 7px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: card.primary ? '0.72rem' : '0.64rem',
                    fontWeight: 900,
                    letterSpacing: '0.8px',
                    boxShadow: '0 2px 8px rgba(38, 54, 111, 0.15)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {card.label}
                </div>
              );
            })}
          </motion.div>

          {/* Motion Element 2: Concentric Inner Coordinate Ring (Diameter 760px) Counter-Rotating */}
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '52%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              width: '760px',
              height: '760px',
              borderRadius: '50%',
              border: '1.5px solid rgba(18, 164, 220, 0.35)',
              rotate: bgInnerRingRotate, // Counter-rotates auto + scroll accelerated!
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            {/* 12 Nautical Graduation Ticks at 30-degree increments */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, dIdx) => {
              const rad = (deg * Math.PI) / 180;
              const rDist = 380;
              const xPos = rDist * Math.sin(rad);
              const yPos = -rDist * Math.cos(rad);
              const isQuarter = deg % 90 === 0;
              return (
                <div
                  key={dIdx}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `translate(calc(-50% + ${xPos}px), calc(-50% + ${yPos}px))`,
                    width: isQuarter ? '10px' : '6px',
                    height: isQuarter ? '10px' : '6px',
                    borderRadius: '50%',
                    backgroundColor: isQuarter ? BRAND.premiumRed : BRAND.skyBlue,
                    boxShadow: isQuarter ? '0 0 10px #D2143A' : '0 0 6px #12A4DC',
                  }}
                />
              );
            })}
          </motion.div>

          {/* Motion Element 3: Counter-Rotating Outer Planetary Ring with Roman Badges */}
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '52%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              width: '1420px',
              height: '1420px',
              borderRadius: '50%',
              border: '1.5px solid rgba(18, 164, 220, 0.22)',
              rotate: bgOrbitRotate, // Counter-rotates auto + scroll accelerated!
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            {/* Orbiting Roman badges along circle */}
            {['I', 'II', 'III', 'IV', 'V'].map((roman, rIdx) => {
              const rAngle = rIdx * 72;
              const rRad = (rAngle * Math.PI) / 180;
              const xPos = Math.round(710 * Math.sin(rRad));
              const yPos = Math.round(-710 * Math.cos(rRad));
              return (
                <div
                  key={rIdx}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `translate(calc(-50% + ${xPos}px), calc(-50% + ${yPos}px))`,
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: `2px solid ${BRAND.skyBlue}`,
                    boxShadow: '0 0 14px rgba(18, 164, 220, 0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.78rem',
                    fontWeight: 900,
                    color: BRAND.primaryBlue,
                  }}
                >
                  {roman}
                </div>
              );
            })}
          </motion.div>

          {/* Motion Element 4: Illuminated Rotating Radar Sweep Beam with High-Contrast Needle! */}
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '52%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              width: '940px',
              height: '940px',
              borderRadius: '50%',
              background: 'conic-gradient(from 0deg, rgba(18, 164, 220, 0.28) 0deg, rgba(18, 164, 220, 0.06) 45deg, transparent 75deg, transparent 360deg)',
              rotate: bgRadarRotate, // Sweeps around continuously!
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            {/* Illuminated Sweeping Cyan Needle Arm with Glowing Beacon Head - 100% CLEARLY OBSERVABLE */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '470px',
                height: '2.5px',
                background: 'linear-gradient(90deg, rgba(18, 164, 220, 0.15) 0%, #12A4DC 70%, #FFFFFF 100%)',
                boxShadow: '0 0 14px #12A4DC, 0 0 28px rgba(18, 164, 220, 0.7)',
                transformOrigin: '0% 50%',
                transform: 'translateY(-50%)',
                borderRadius: '3px',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  right: '-5px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: BRAND.skyBlue,
                  border: '2px solid #FFFFFF',
                  boxShadow: '0 0 16px #12A4DC, 0 0 24px #12A4DC',
                }}
              />
            </div>
          </motion.div>

          {/* Motion Element 4: Floating Drifting Stars & Badges */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '20%',
              left: '7%',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontFamily: 'monospace',
              fontSize: '0.7rem',
              color: 'rgba(38, 54, 111, 0.45)',
              letterSpacing: '1.5px',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: BRAND.skyBlue }} />
              <span>HYDERABAD SOVEREIGN GRID</span>
            </div>
            <span>ELEVATION: 540M // SECTOR 01-05</span>
          </div>

          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '22%',
              right: '7%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '6px',
              fontFamily: 'monospace',
              fontSize: '0.7rem',
              color: 'rgba(38, 54, 111, 0.45)',
              letterSpacing: '1.5px',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>ACTIVE ROTARY BEARING: {Math.round(((-totalRotaryAngle % 360 + 360) % 360))}°</span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: BRAND.premiumRed }} />
            </div>
            <span>ROTARY SPEED: DYNAMIC KINETIC</span>
          </div>

          {/* ── STREAMLINED SECTION HEADER & INTEGRATED CONTROLS (COMPACT & FULLY VISIBLE) ── */}
          <div
            style={{
              padding: '0.2rem 4vw 0 4vw',
              textAlign: 'center',
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {/* Eyebrow */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <Disc3 size={14} color={BRAND.skyBlue} className="animate-spin-slow" />
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.7rem',
                  letterSpacing: '3px',
                  color: BRAND.skyBlue,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                ROTARY OBSERVATORY // FIVE DISTINCTIONS
              </span>
            </div>

            {/* Main Title - Compact, elegant Trajan Roman, completely visible below navbar */}
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.6rem, 2.6vw, 2.3rem)',
                fontWeight: 900,
                color: BRAND.primaryBlue,
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
                margin: '0 0 6px 0',
                textTransform: 'uppercase',
              }}
            >
              COMPLETE PORTFOLIO CATALOG
            </h2>

            {/* Compact Integrated Controls & Landmark Row: all on one sleek line! */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                flexWrap: 'wrap',
                margin: '2px 0 4px 0',
              }}
            >
              <button
                onClick={handlePrevRotary}
                style={{
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: BRAND.white,
                  color: BRAND.primaryBlue,
                  border: `1.5px solid ${BRAND.skyBlue}`,
                  padding: '4px 14px',
                  borderRadius: '20px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  boxShadow: '0 0 10px rgba(18, 164, 220, 0.2)',
                  transition: 'all 0.2s ease',
                }}
                className="hover:scale-105"
              >
                <ChevronLeft size={14} />
                <span>PREV</span>
              </button>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    padding: '3px 10px',
                    backgroundColor: BRAND.primaryBlue,
                    color: BRAND.white,
                    borderRadius: '4px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.72rem',
                    fontWeight: 900,
                  }}
                >
                  [{safeRotaryItem.roman}] {safeRotaryItem.name}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    color: BRAND.primaryBlue,
                    letterSpacing: '0.5px',
                  }}
                >
                  {safeRotaryItem.title}
                </span>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: BRAND.skyBlue,
                  }}
                >
                  // {safeRotaryItem.zone}
                </span>
              </div>

              <button
                onClick={handleNextRotary}
                style={{
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: BRAND.primaryBlue,
                  color: BRAND.white,
                  border: 'none',
                  padding: '4px 16px',
                  borderRadius: '20px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  boxShadow: '0 4px 14px rgba(38, 54, 111, 0.25)',
                  transition: 'all 0.2s ease',
                }}
                className="hover:scale-105"
              >
                <span>NEXT</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'rgba(38, 54, 111, 0.8)',
                fontStyle: 'italic',
                maxWidth: '680px',
                margin: '0 0 4px 0',
              }}
            >
              &ldquo;{safeRotaryItem.subtitle}&rdquo;
            </p>
          </div>

          {/* ── THE 5-CARDS ROTARY WHEEL CONTAINER (TOUCH SWIPEABLE & MOBILE ADAPTIVE) ── */}
          <div
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              position: 'relative',
              width: '100%',
              height: isMobile ? '415px' : '470px',
              overflow: 'hidden',
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: 'none',
              zIndex: 5,
              marginTop: '4px',
            }}
          >
            {/* Rotating 5-Cards Dial */}
            <div
              style={{
                position: 'absolute',
                top: isMobile ? '180px' : '215px',
                left: '50%',
                width: isMobile ? '720px' : '900px',
                height: isMobile ? '720px' : '900px',
                transform: 'translate(-50%, 0)',
                transformOrigin: 'center center',
              }}
            >
              {COLLECTIONS.map((item, idx) => {
                const radius = isMobile ? 360 : 450;
                const baseAngle = idx * angleStep; // 0, 72, 144, 216, 288
                const effectiveAngle = baseAngle + totalRotaryAngle;
                const normAngle = (((effectiveAngle % 360) + 540) % 360) - 180;
                const absDiff = Math.abs(normAngle);

                // With 5 cards, top card at 0 deg, side cards at 72 deg are visible
                const isVisible = absDiff < 105;
                const distRatio = Math.min(absDiff / 85, 1);
                const blurVal = Math.round(Math.min(distRatio * 5, 4) * 10) / 10;
                const grayscaleVal = Math.round(distRatio * 0.85 * 100) / 100;
                const scaleVal = Math.round(Math.max(0.88, (isMobile ? 1.05 : 1.08) - distRatio * 0.22) * 100) / 100;
                const opacityVal = isVisible ? Math.round(Math.max(0, 1 - distRatio * 1.25) * 100) / 100 : 0;
                const isApex = absDiff < 18;

                const rad = (effectiveAngle * Math.PI) / 180;
                const cardX = Math.round(radius * Math.sin(rad));
                const cardY = Math.round(-radius * Math.cos(rad));

                return (
                  <div
                    key={item.id}
                    onClick={() => setDragOffsetAngle(-idx * angleStep - scrollWheelAngle)}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      // ── RESPONSIVE CARD SIZE: 265px on mobile, 300px on desktop (100% FULLY IN VIEW!) ──
                      width: isMobile ? '260px' : '300px',
                      aspectRatio: '4 / 5.15',
                      transform: `translate(calc(-50% + ${cardX}px), calc(-50% + ${cardY}px)) scale(${scaleVal})`,
                      transformOrigin: 'center center',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      backgroundColor: BRAND.white,

                      // ── UPGRADED GLOWING NEON BORDER LINE AS REQUESTED ──
                      border: isApex
                        ? `2.5px solid ${BRAND.skyBlue}`
                        : `1.8px solid rgba(18, 164, 220, 0.85)`,
                      boxShadow: isApex
                        ? `0 0 20px rgba(18, 164, 220, 0.95), 0 0 45px rgba(18, 164, 220, 0.55), 0 0 75px rgba(18, 164, 220, 0.22), 0 20px 50px rgba(38, 54, 111, 0.25), inset 0 0 14px rgba(18, 164, 220, 0.35)`
                        : `0 0 14px rgba(18, 164, 220, 0.5), 0 0 28px rgba(18, 164, 220, 0.2), inset 0 0 8px rgba(18, 164, 220, 0.15)`,

                      filter: `blur(${blurVal}px) grayscale(${grayscaleVal})`,
                      opacity: opacityVal,
                      transition: isDragging
                        ? 'none'
                        : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.35s ease, opacity 0.35s ease, box-shadow 0.35s ease',
                      pointerEvents: isVisible ? 'auto' : 'none',
                      cursor: 'pointer',
                      zIndex: isApex ? 20 : Math.round(10 - absDiff / 10),
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="360px"
                      style={{ objectFit: 'cover' }}
                    />

                    {/* Gradient Overlay & Information */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: isApex
                          ? 'linear-gradient(to top, rgba(38, 54, 111, 0.95) 0%, rgba(38, 54, 111, 0.15) 55%, transparent 100%)'
                          : 'linear-gradient(to top, rgba(0, 0, 0, 0.78) 0%, transparent 70%)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '18px',
                        color: BRAND.white,
                      }}
                    >
                      {/* Top Badges */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span
                          style={{
                            padding: '4px 10px',
                            backgroundColor: BRAND.primaryBlue,
                            color: BRAND.white,
                            borderRadius: '4px',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '0.72rem',
                            fontWeight: 900,
                          }}
                        >
                          [{item.roman}] {item.name}
                        </span>
                        <span
                          style={{
                            fontFamily: 'monospace',
                            fontSize: '0.72rem',
                            color: BRAND.skyBlue,
                            fontWeight: 700,
                          }}
                        >
                          {item.appreciation}
                        </span>
                      </div>

                      {/* Bottom Card Title & Specs */}
                      <div>
                        <span
                          style={{
                            display: 'block',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '0.68rem',
                            letterSpacing: '1.8px',
                            color: BRAND.skyBlue,
                            fontWeight: 700,
                            marginBottom: '3px',
                          }}
                        >
                          {item.categoryTag}
                        </span>
                        <h4
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.25rem',
                            color: BRAND.white,
                            margin: 0,
                            lineHeight: 1.2,
                          }}
                        >
                          {item.title}
                        </h4>

                        {/* Specs row */}
                        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                          {item.specs.slice(0, 2).map((s, sIdx) => (
                            <div
                              key={sIdx}
                              style={{
                                padding: '4px 8px',
                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(6px)',
                                borderRadius: '4px',
                                fontSize: '0.66rem',
                                fontFamily: 'monospace',
                              }}
                            >
                              <span style={{ opacity: 0.8 }}>{s.label}: </span>
                              <span style={{ fontWeight: 700, color: BRAND.skyBlue }}>{s.val}</span>
                            </div>
                          ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                          <span
                            style={{
                              fontSize: '0.8rem',
                              fontFamily: 'var(--font-heading)',
                              color: 'rgba(255,255,255,0.95)',
                              fontWeight: 700,
                            }}
                          >
                            FROM ₹{item.minInvestment} CR
                          </span>

                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '0.7rem',
                              fontFamily: 'var(--font-heading)',
                              color: BRAND.skyBlue,
                              fontWeight: 700,
                            }}
                          >
                            <span>DETAILS</span>
                            <ArrowUpRight size={14} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Spacing Anchor */}
          <div style={{ height: '20px' }} />

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════
          3. INTERACTIVE INVESTMENT & YIELD CALCULATOR
         ══════════════════════════════════════════════════════════════════════════ */}
      <section
        id="investment-calculator"
        style={{
          position: 'relative',
          backgroundColor: BRAND.white,
          padding: '5rem 4vw 7rem 4vw',
          borderTop: '1px solid rgba(38, 54, 111, 0.1)',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div
            style={{
              backgroundColor: BRAND.white,
              border: '1px solid rgba(38, 54, 111, 0.18)',
              borderRadius: '28px',
              padding: 'clamp(1.5rem, 4vw, 4rem) clamp(1.2rem, 3.5vw, 3.5rem)',
              boxShadow: '0 25px 70px rgba(38, 54, 111, 0.08)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: 'clamp(2rem, 4vw, 4rem)',
                alignItems: 'center',
              }}
            >
              {/* Left: Slider Controls */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Sliders size={18} color={BRAND.skyBlue} />
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.78rem',
                      letterSpacing: '3px',
                      color: BRAND.skyBlue,
                      fontWeight: 700,
                    }}
                  >
                    INTERACTIVE VALUATION
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                    color: BRAND.primaryBlue,
                    lineHeight: 1.1,
                    margin: '0 0 1rem 0',
                    textTransform: 'uppercase',
                  }}
                >
                  PORTFOLIO ALLOCATION ESTIMATOR
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                    color: 'rgba(38, 54, 111, 0.8)',
                    marginBottom: '2.5rem',
                  }}
                >
                  Calculate projected asset expansion, expected sovereign yield, and five-year capital compounding tailored to your deployment scale.
                </p>

                {/* Slider */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.85rem',
                        letterSpacing: '1.5px',
                        color: BRAND.primaryBlue,
                        fontWeight: 700,
                      }}
                    >
                      TARGET CAPITAL ALLOCATION:
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '2rem',
                        fontWeight: 900,
                        color: BRAND.primaryBlue,
                      }}
                    >
                      ₹{investAmount.toFixed(1)} CR
                    </span>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="40"
                    step="0.5"
                    value={investAmount}
                    onChange={(e) => setInvestAmount(parseFloat(e.target.value))}
                    style={{
                      width: '100%',
                      height: '8px',
                      appearance: 'none',
                      backgroundColor: '#E2E8F0',
                      borderRadius: '4px',
                      outline: 'none',
                      cursor: 'pointer',
                      accentColor: BRAND.skyBlue,
                    }}
                  />

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '8px',
                      fontFamily: 'monospace',
                      fontSize: '0.78rem',
                      color: 'rgba(38, 54, 111, 0.55)',
                    }}
                  >
                    <span>₹1.0 CR</span>
                    <span>₹20.0 CR</span>
                    <span>₹40.0 CR+</span>
                  </div>
                </div>

                <div
                  style={{
                    padding: '12px 18px',
                    backgroundColor: '#F8FAFD',
                    border: '1px solid rgba(38, 54, 111, 0.12)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <TrendingUp size={18} color={BRAND.premiumRed} />
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'rgba(38, 54, 111, 0.6)', display: 'block', fontFamily: 'var(--font-heading)' }}>
                      OPTIMAL ASSET VECTOR
                    </span>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 900, color: BRAND.primaryBlue }}>
                      {recommendedCategory}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Yield Matrix */}
              <div
                style={{
                  backgroundColor: '#F8FAFD',
                  border: '1px solid rgba(38, 54, 111, 0.14)',
                  borderRadius: '20px',
                  padding: '3rem 2.5rem',
                }}
              >
                <h4
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1rem',
                    letterSpacing: '2px',
                    color: BRAND.primaryBlue,
                    marginBottom: '2rem',
                    textTransform: 'uppercase',
                  }}
                >
                  PROJECTED 5-YEAR WEALTH OUTLOOK
                </h4>

                <div style={{ marginBottom: '1.8rem', paddingBottom: '1.4rem', borderBottom: '1px solid rgba(38, 54, 111, 0.1)' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'rgba(38, 54, 111, 0.7)', display: 'block', marginBottom: '4px' }}>
                    Projected Capital Valuation (at ~15.5% CAGR):
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '2.5rem',
                      fontWeight: 900,
                      color: BRAND.primaryBlue,
                    }}
                  >
                    ₹{projectedAppreciation5Yr} CR
                  </span>
                </div>

                <div style={{ marginBottom: '1.8rem', paddingBottom: '1.4rem', borderBottom: '1px solid rgba(38, 54, 111, 0.1)' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'rgba(38, 54, 111, 0.7)', display: 'block', marginBottom: '4px' }}>
                    Estimated Annual Lease & Yield Income:
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.9rem',
                      fontWeight: 900,
                      color: BRAND.skyBlue,
                    }}
                  >
                    ₹{annualYield} CR / YR
                  </span>
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'rgba(38, 54, 111, 0.7)', display: 'block', marginBottom: '4px' }}>
                    Net Projected Alpha Gain:
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.6rem',
                      fontWeight: 900,
                      color: BRAND.premiumRed,
                    }}
                  >
                    +₹{totalWealthGain} CR APPRECIATION
                  </span>
                </div>

                <a
                  href="/contact"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    width: '100%',
                    backgroundColor: BRAND.primaryBlue,
                    color: BRAND.white,
                    padding: '1.1rem 1.5rem',
                    borderRadius: '50px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.84rem',
                    letterSpacing: '2px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 20px rgba(38, 54, 111, 0.2)',
                  }}
                  className="hover:scale-102"
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = BRAND.premiumRed;
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(210, 20, 58, 0.35)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = BRAND.primaryBlue;
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(38, 54, 111, 0.2)';
                  }}
                >
                  <span>REQUEST BESPOKE PORTFOLIO AUDIT</span>
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global CSS keyframes */}
      <style jsx global>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spinSlow 20s linear infinite;
        }
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </>
  );
}
