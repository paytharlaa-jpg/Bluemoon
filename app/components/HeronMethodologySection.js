'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { Plus, Minus, Scan, Activity, Compass, Layers, CheckCircle2, ShieldCheck, Terminal, Crosshair, Check } from 'lucide-react';

// Approved Brand Colors
const BRAND = {
  primaryBlue: '#26366F',
  skyBlue: '#12A4DC',
  premiumRed: '#D2143A',
  white: '#FFFFFF',
  offWhite: '#FAFAF9',
  border: 'rgba(38, 54, 111, 0.15)',
  borderDashed: 'rgba(38, 54, 111, 0.22)',
  textMuted: 'rgba(38, 54, 111, 0.75)',
};

// ── Interactive Single Section Row Component with Mouse-Tracking Line & Pill ──
function MethodologyRow({
  stepNum,
  name,
  text,
  side, // 'left' | 'right' (where the dark text pill bar is located)
  imageContent,
  mobileContent,
  isFirst,
  isLast,
}) {
  const rowRef = useRef(null);

  // Default initial Y position is vertical center of row (~280px)
  const lineY = useMotionValue(280);
  const smoothLineY = useSpring(lineY, { stiffness: 360, damping: 30, mass: 0.12 });

  const handleMouseMove = (e) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    // Keep line comfortably within row boundaries
    const clampedY = Math.max(50, Math.min(rect.height - 50, relativeY));
    lineY.set(clampedY);
  };

  const handleMouseLeave = () => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    // Return smoothly to center
    lineY.set(rect.height / 2);
  };

  const isBarOnRight = side === 'right';

  return (
    <>
      {/* ─── DESKTOP VIEW (Visible on screens > 768px, 100% UNTOUCHED) ─── */}
      <div
        ref={rowRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="methodology-desktop-row"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: 'clamp(520px, 62vh, 660px)',
          backgroundColor: BRAND.offWhite,
          borderBottom: isLast ? 'none' : '1px solid rgba(38, 54, 111, 0.15)',
          overflow: 'hidden',
          cursor: 'row-resize',
          userSelect: 'none',
        }}
      >
        {/* ── Continuous Center Vertical Divider (Runs down through all 4 sections) ── */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '50%',
            width: '1px',
            backgroundColor: 'rgba(38, 54, 111, 0.16)',
            pointerEvents: 'none',
            zIndex: 3,
          }}
        />

        {/* ── Left Edge Continuous CAD Measurement Ruler ── */}
        <div
          style={{
            position: 'absolute',
            left: '12px',
            top: '25px',
            bottom: '25px',
            width: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              style={{
                width: i % 4 === 0 ? '12px' : '6px',
                height: '1px',
                backgroundColor: 'rgba(38, 54, 111, 0.22)',
                display: 'block',
              }}
            />
          ))}
        </div>

        {/* ── Technical Corner Plus Ticks (+) ── */}
        <span style={{ position: 'absolute', top: '16px', left: '20px', color: 'rgba(38, 54, 111, 0.35)', fontFamily: 'monospace', fontSize: '15px', pointerEvents: 'none', zIndex: 2 }}>+</span>
        <span style={{ position: 'absolute', top: '16px', right: '20px', color: 'rgba(38, 54, 111, 0.35)', fontFamily: 'monospace', fontSize: '15px', pointerEvents: 'none', zIndex: 2 }}>+</span>
        <span style={{ position: 'absolute', bottom: '16px', left: '20px', color: 'rgba(38, 54, 111, 0.35)', fontFamily: 'monospace', fontSize: '15px', pointerEvents: 'none', zIndex: 2 }}>+</span>
        <span style={{ position: 'absolute', bottom: '16px', right: '20px', color: 'rgba(38, 54, 111, 0.35)', fontFamily: 'monospace', fontSize: '15px', pointerEvents: 'none', zIndex: 2 }}>+</span>

        {/* ── Section Telemetry Tag at Top Corner ── */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: isBarOnRight ? '36px' : 'calc(50% + 28px)',
            zIndex: 4,
            fontFamily: 'var(--font-heading)',
            fontSize: '0.72rem',
            letterSpacing: '2.5px',
            color: BRAND.skyBlue,
            fontWeight: 700,
            textTransform: 'uppercase',
            pointerEvents: 'none',
          }}
        >
          [{stepNum}] // SERVICE: {name.toUpperCase()}
        </div>

        {/* ── 2-Column Content Grid: Image on one side, Pill bar tracks line on other side ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          {/* Left Half (holds either image or empty space for pill) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '30px',
              boxSizing: 'border-box',
            }}
          >
            {isBarOnRight && imageContent}
          </div>

          {/* Right Half (holds either image or empty space for pill) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '30px',
              boxSizing: 'border-box',
            }}
          >
            {!isBarOnRight && imageContent}
          </div>
        </div>

        {/* ── Dynamic Mouse-Tracking Full-Width Red Laser Line ── */}
        <motion.div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: smoothLineY,
            height: '1.5px',
            backgroundColor: BRAND.premiumRed,
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        {/* ── Dynamic Dark Text Pill Bar (Attached to line on designated side, moves with mouse) ── */}
        <motion.div
          style={{
            position: 'absolute',
            top: smoothLineY,
            translateY: '-50%',
            left: isBarOnRight ? '50%' : '24px',
            width: isBarOnRight ? 'calc(50% - 24px)' : 'calc(50% - 48px)',
            minHeight: '52px',
            backgroundColor: '#1E2433', // Sleek dark charcoal pill bar matching screenshots
            color: BRAND.white,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 24px',
            zIndex: 12,
            pointerEvents: 'none',
            boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
            borderLeft: isBarOnRight ? `3px solid ${BRAND.skyBlue}` : 'none',
            borderRight: !isBarOnRight ? `3px solid ${BRAND.skyBlue}` : 'none',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0, flex: 1, overflow: 'hidden' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(0.85rem, 1vw, 1.05rem)',
                fontWeight: 900,
                letterSpacing: '0.8px',
                color: BRAND.white,
                textTransform: 'uppercase',
                flexShrink: 0,
              }}
            >
              {name}
            </span>

            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.8rem, 0.9vw, 0.92rem)',
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: 1.35,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {text}
            </span>
          </div>

          {/* Red Accent Dot at End of Pill Bar */}
          <span
            style={{
              width: '6px',
              height: '6px',
              backgroundColor: BRAND.premiumRed,
              display: 'block',
              flexShrink: 0,
              marginLeft: '12px',
            }}
          />
        </motion.div>
      </div>

      {/* ─── MOBILE VIEW (Visible on screens <= 768px, Perfectly Aligned & Stacked) ─── */}
      <div
        className="methodology-mobile-row"
        style={{
          width: '100%',
          backgroundColor: BRAND.offWhite,
          borderBottom: isLast ? 'none' : '1px solid rgba(38, 54, 111, 0.15)',
          padding: '24px 16px 28px 16px',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/* Top Header Tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
            paddingBottom: '8px',
            borderBottom: '1px dashed rgba(38, 54, 111, 0.15)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.74rem',
                letterSpacing: '2px',
                color: BRAND.skyBlue,
                fontWeight: 800,
              }}
            >
              [{stepNum}]
            </span>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.68rem',
                letterSpacing: '2px',
                color: 'rgba(38, 54, 111, 0.65)',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              CORE SERVICE
            </span>
          </div>

          <span
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: BRAND.premiumRed,
              borderRadius: '50%',
              boxShadow: '0 0 8px rgba(210, 20, 58, 0.6)',
              display: 'block',
            }}
          />
        </div>

        {/* Dark Charcoal Pill Banner: Full Width on Mobile */}
        <div
          style={{
            backgroundColor: '#1E2433',
            color: BRAND.white,
            borderRadius: '8px',
            padding: '16px 18px',
            borderLeft: `4px solid ${BRAND.skyBlue}`,
            boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
            marginBottom: '16px',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.08rem',
              fontWeight: 900,
              letterSpacing: '0.5px',
              color: BRAND.white,
              textTransform: 'uppercase',
              margin: '0 0 8px 0',
              lineHeight: 1.25,
            }}
          >
            {name}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.92rem',
              color: 'rgba(255, 255, 255, 0.92)',
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            {text}
          </p>
        </div>

        {/* Clean Architectural Drawing Stage */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            border: '1px solid rgba(38, 54, 111, 0.12)',
            boxShadow: '0 4px 16px rgba(38, 54, 111, 0.05)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '18px 12px',
            boxSizing: 'border-box',
          }}
        >
          {/* Subtle Technical Plus Marks */}
          <span style={{ position: 'absolute', top: '8px', left: '10px', color: 'rgba(38, 54, 111, 0.25)', fontFamily: 'monospace', fontSize: '13px' }}>+</span>
          <span style={{ position: 'absolute', top: '8px', right: '10px', color: 'rgba(38, 54, 111, 0.25)', fontFamily: 'monospace', fontSize: '13px' }}>+</span>
          <span style={{ position: 'absolute', bottom: '8px', left: '10px', color: 'rgba(38, 54, 111, 0.25)', fontFamily: 'monospace', fontSize: '13px' }}>+</span>
          <span style={{ position: 'absolute', bottom: '8px', right: '10px', color: 'rgba(38, 54, 111, 0.25)', fontFamily: 'monospace', fontSize: '13px' }}>+</span>

          {mobileContent || imageContent}
        </div>
      </div>
    </>
  );
}

// ── 5 Core Property Portfolios Data ──
const USE_CASES = [
  {
    num: '01',
    role: 'Ultra Luxury Villas',
    text: 'Private architectural sanctuaries with infinity pools and bespoke craftsmanship.',
    detail: 'Individually crafted private residences featuring expansive manicured lawns, double-height living spaces, custom Italian marble finishes, personal infinity pools, and smart-home automation within high-security gated estates.',
    image: '/use-cases/ultra-luxury-villas.jpg',
    tag: 'BESPOKE_LIVING_VILLAS',
    software: '4,500 – 12,000 SQ.FT // PRIVATE ESTATES',
  },
  {
    num: '02',
    role: 'Luxury Apartments',
    text: 'Skyline residences with panoramic vistas, sky terraces, and resort amenities.',
    detail: 'Iconic architectural high-rise towers offering curated 3 & 4 BHK residences with wraparound private balconies, private elevator lobbies, sky lounges, and resort-grade wellness facilities in premier metropolitan nodes.',
    image: '/use-cases/luxury-apartments.jpg',
    tag: 'HIGH_RISE_RESIDENCES',
    software: '1,800 – 4,200 SQ.FT // SKY RESIDENCES',
  },
  {
    num: '03',
    role: 'Open Plots',
    text: 'RERA-approved plotted developments with manicured avenues and immediate possession.',
    detail: 'Master-planned gated layouts featuring underground utility cabling, wide blacktop avenue trees, designer street lighting, dedicated clubhouses, and 100% clear titles ready for bespoke construction.',
    image: '/use-cases/open-plots.jpg',
    tag: 'GATED_PLOTTED_COMMUNITY',
    software: '200 – 1,200 SQ.YDS // CLEAR TITLE LAYOUTS',
  },
  {
    num: '04',
    role: 'Commercial',
    text: 'Grade-A office towers, corporate tech parks, and high-footfall retail avenues.',
    detail: 'Institutional-grade commercial assets engineered for multinational corporate tenants, tech campuses, and prime high-street retail promenades offering LEED-certified sustainability and lucrative yield stability.',
    image: '/use-cases/commercial.jpg',
    tag: 'GRADE_A_COMMERCIAL',
    software: '10,000 – 250,000 SQ.FT // HIGH YIELD ASSETS',
  },
  {
    num: '05',
    role: 'Bulk Land Parcels',
    text: 'Strategic contiguous acreage along high-velocity infrastructure growth corridors.',
    detail: 'Vast master development land banks positioned along state expressways, industrial growth corridors, and high-density expansion zones, completely vetted with forensic legal scrutiny and boundary geo-fencing.',
    image: '/use-cases/bulk-land-parcels.jpg',
    tag: 'INSTITUTIONAL_LAND_BANK',
    software: '5 – 100+ ACRES // EXPRESSWAY CORRIDORS',
  },
];

export default function HeronMethodologySection() {
  const [activeUseCase, setActiveUseCase] = useState(0);

  return (
    <div
      id="methodology-usecases"
      style={{
        backgroundColor: BRAND.white,
        position: 'relative',
        zIndex: 25,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* ══════════════════════════════════════════════════════════════════════════
          OVERALL HEADER FOR THE 4 METHODOLOGY SECTIONS
         ══════════════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          borderTop: '1px solid rgba(38, 54, 111, 0.15)',
          backgroundColor: BRAND.white,
          maxWidth: '1500px',
          margin: '0 auto',
          padding: '60px 4vw 40px 4vw',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '40px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: '1 1 500px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.75rem',
              letterSpacing: '3px',
              color: BRAND.skyBlue,
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            <span>+ SECTION 03.1</span>
            <span style={{ color: 'rgba(38, 54, 111, 0.3)' }}>//</span>
            <span>WHY BLUEMOON +</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
              fontWeight: 900,
              color: BRAND.primaryBlue,
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            Built around your property goals
          </h2>
        </div>

        <div style={{ flex: '1 1 380px', maxWidth: '520px', paddingTop: '10px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.7rem',
              letterSpacing: '2px',
              color: 'rgba(38, 54, 111, 0.6)',
              marginBottom: '12px',
              textTransform: 'uppercase',
            }}
          >
            <Activity size={13} color={BRAND.skyBlue} />
            <span>4 CORE SERVICES // COMPLETE REAL ESTATE GUIDANCE</span>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.12rem',
              lineHeight: 1.6,
              color: 'rgba(38, 54, 111, 0.85)',
              margin: 0,
            }}
          >
            BlueMoon Properties fits your goals, not the other way around. Whether you&apos;re searching for a luxury villa, a premium apartment, an open plot, or a smart investment opportunity, we guide you through every step with transparency and care. From the first conversation to the final decision, you&apos;re always in control.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════
          4 SEPARATE CONNECTED SECTIONS STACKED VERTICALLY:
          1. OBSERVE (Image Left, Moving Pill Right)
          2. ADVISE (Moving Pill Left, Image Right)
          3. ACT (Image Left, Moving Pill Right)
          4. LEARN (Moving Pill Left, Image Right)
         ══════════════════════════════════════════════════════════════════════════ */}
      <div style={{ borderTop: '1px solid rgba(38, 54, 111, 0.15)', backgroundColor: BRAND.offWhite }}>
        
        {/* ── 1. SECTION: Property Buying & Selling ── */}
        <MethodologyRow
          stepNum="01"
          name="Property Buying & Selling"
          text="Find the right property or sell with confidence through transparent guidance."
          side="right"
          isFirst={true}
          isLast={false}
          imageContent={
            <div style={{ position: 'relative', width: '100%', maxWidth: '540px', height: '360px' }}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 45px rgba(38, 54, 111, 0.16)',
                  border: '1px solid rgba(38, 54, 111, 0.14)',
                }}
              >
                <Image
                  src="/4%20services/property%20buying%20and%20selling.jpg"
                  alt="Property Buying & Selling"
                  fill
                  sizes="(max-width: 768px) 100vw, 540px"
                  style={{
                    objectFit: 'cover',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(16, 24, 40, 0.65) 0%, rgba(16, 24, 40, 0.1) 45%, rgba(16, 24, 40, 0) 100%)',
                  }}
                />
              </div>

              {/* Floating Blueprint Telemetry Tag */}
              <div
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '16px',
                  backgroundColor: 'rgba(30, 36, 51, 0.88)',
                  backdropFilter: 'blur(8px)',
                  color: BRAND.skyBlue,
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.65rem',
                  letterSpacing: '1.5px',
                  fontWeight: 800,
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: '1px solid rgba(18, 164, 220, 0.4)',
                }}
              >
                TRANSACTION // VERIFIED LISTINGS
              </div>

              {/* Bottom Floating Info Card */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(30, 36, 51, 0.92)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFFFFF',
                  padding: '14px 18px',
                  borderRadius: '6px',
                  border: `1.5px solid ${BRAND.skyBlue}`,
                  boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
                  maxWidth: '340px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.62rem',
                    letterSpacing: '1.8px',
                    color: 'rgba(255,255,255,0.65)',
                    textTransform: 'uppercase',
                    marginBottom: '3px',
                  }}
                >
                  BLUEMOON // SERVICE #01
                </div>
                <h4
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    color: BRAND.skyBlue,
                    letterSpacing: '0.5px',
                    margin: '0 0 4px 0',
                    textTransform: 'uppercase',
                  }}
                >
                  END-TO-END TRANSACTION ASSURANCE
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    lineHeight: 1.35,
                    color: 'rgba(255,255,255,0.88)',
                    margin: 0,
                  }}
                >
                  Transparent pricing, clear ownership titles, and frictionless paperwork from offer to registration.
                </p>
              </div>
            </div>
          }
          mobileContent={
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
              <div style={{ position: 'relative', width: '100%', height: '210px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(38, 54, 111, 0.12)' }}>
                <Image
                  src="/4%20services/property%20buying%20and%20selling.jpg"
                  alt="Property Buying & Selling"
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div
                style={{
                  width: '100%',
                  backgroundColor: '#1E2433',
                  color: '#FFFFFF',
                  padding: '14px 16px',
                  borderRadius: '6px',
                  border: `1.5px solid ${BRAND.skyBlue}`,
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.62rem',
                    letterSpacing: '1.5px',
                    color: 'rgba(255,255,255,0.6)',
                    textTransform: 'uppercase',
                    marginBottom: '3px',
                  }}
                >
                  BLUEMOON // SERVICE #01
                </div>
                <h4
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    color: BRAND.skyBlue,
                    letterSpacing: '0.5px',
                    lineHeight: 1.25,
                    margin: '0 0 6px 0',
                    textTransform: 'uppercase',
                  }}
                >
                  END-TO-END TRANSACTION ASSURANCE
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    lineHeight: 1.4,
                    color: 'rgba(255,255,255,0.88)',
                    margin: 0,
                  }}
                >
                  Transparent pricing, clear ownership titles, and frictionless paperwork from offer to registration.
                </p>
              </div>
            </div>
          }
        />

        {/* ── 2. SECTION: Real Estate Investment ── */}
        <MethodologyRow
          stepNum="02"
          name="Real Estate Investment"
          text="Explore property opportunities aligned with your investment goals."
          side="left"
          isFirst={false}
          isLast={false}
          imageContent={
            <div style={{ position: 'relative', width: '100%', maxWidth: '540px', height: '360px' }}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 45px rgba(38, 54, 111, 0.16)',
                  border: '1px solid rgba(38, 54, 111, 0.14)',
                }}
              >
                <Image
                  src="/4%20services/realestate%20investment.jpg"
                  alt="Real Estate Investment Analysis"
                  fill
                  sizes="(max-width: 768px) 100vw, 540px"
                  style={{
                    objectFit: 'cover',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(16, 24, 40, 0.6) 0%, rgba(16, 24, 40, 0) 50%)',
                  }}
                />
              </div>

              {/* Top Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '16px',
                  backgroundColor: 'rgba(30, 36, 51, 0.88)',
                  backdropFilter: 'blur(8px)',
                  color: BRAND.skyBlue,
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.65rem',
                  letterSpacing: '1.5px',
                  fontWeight: 800,
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: '1px solid rgba(18, 164, 220, 0.4)',
                }}
              >
                PORTFOLIO // HIGH ROI YIELD
              </div>

              {/* Dark Investment Intelligence Card */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '14px',
                  right: '16px',
                  backgroundColor: 'rgba(30, 36, 51, 0.94)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFFFFF',
                  padding: '16px 20px',
                  borderRadius: '6px',
                  border: `1.5px solid ${BRAND.skyBlue}`,
                  boxShadow: '0 16px 40px rgba(0,0,0,0.35)',
                  maxWidth: '300px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.65rem',
                    letterSpacing: '2px',
                    color: 'rgba(255,255,255,0.6)',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}
                >
                  BLUEMOON // INVESTMENT AUDIT #02
                </div>
                <h4
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    color: BRAND.skyBlue,
                    letterSpacing: '0.5px',
                    lineHeight: 1.25,
                    margin: '0 0 8px 0',
                    textTransform: 'uppercase',
                  }}
                >
                  HIGH APPRECIATION CORRIDOR
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    lineHeight: 1.4,
                    color: 'rgba(255,255,255,0.85)',
                    margin: '0 0 10px 0',
                  }}
                >
                  Strategic growth location verified with 100% clear legal title and high ROI trajectory.
                </p>
                <div
                  style={{
                    borderTop: '1px dashed rgba(255,255,255,0.2)',
                    paddingTop: '8px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.65rem',
                    color: BRAND.premiumRed,
                    letterSpacing: '1px',
                    fontWeight: 700,
                  }}
                >
                  RERA APPROVED &amp; AUDITED
                </div>
              </div>
            </div>
          }
          mobileContent={
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
              <div style={{ position: 'relative', width: '100%', height: '210px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(38, 54, 111, 0.12)' }}>
                <Image
                  src="/4%20services/realestate%20investment.jpg"
                  alt="Real Estate Investment Floor Plan"
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div
                style={{
                  width: '100%',
                  backgroundColor: '#1E2433',
                  color: '#FFFFFF',
                  padding: '14px 16px',
                  borderRadius: '6px',
                  border: `1.5px solid ${BRAND.skyBlue}`,
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.62rem',
                    letterSpacing: '1.5px',
                    color: 'rgba(255,255,255,0.6)',
                    textTransform: 'uppercase',
                    marginBottom: '3px',
                  }}
                >
                  BLUEMOON // INVESTMENT AUDIT #02
                </div>
                <h4
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    color: BRAND.skyBlue,
                    letterSpacing: '0.5px',
                    lineHeight: 1.25,
                    margin: '0 0 6px 0',
                    textTransform: 'uppercase',
                  }}
                >
                  HIGH APPRECIATION CORRIDOR
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    lineHeight: 1.4,
                    color: 'rgba(255,255,255,0.88)',
                    margin: '0 0 8px 0',
                  }}
                >
                  Strategic growth location verified with 100% clear legal title and high ROI trajectory.
                </p>
                <div
                  style={{
                    borderTop: '1px dashed rgba(255,255,255,0.2)',
                    paddingTop: '6px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.62rem',
                    color: BRAND.premiumRed,
                    letterSpacing: '1px',
                    fontWeight: 700,
                  }}
                >
                  RERA APPROVED &amp; AUDITED
                </div>
              </div>
            </div>
          }
        />

        {/* ── 3. SECTION: Construction & Development ── */}
        <MethodologyRow
          stepNum="03"
          name="Construction & Development"
          text="From strong foundations to quality construction, build with confidence."
          side="right"
          isFirst={false}
          isLast={false}
          imageContent={
            <div style={{ position: 'relative', width: '100%', maxWidth: '540px', height: '360px' }}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 45px rgba(38, 54, 111, 0.16)',
                  border: '1px solid rgba(38, 54, 111, 0.14)',
                }}
              >
                <Image
                  src="/4%20services/construction%20and%20development.jpg"
                  alt="Construction & Development"
                  fill
                  sizes="(max-width: 768px) 100vw, 540px"
                  style={{
                    objectFit: 'cover',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(16, 24, 40, 0.6) 0%, rgba(16, 24, 40, 0) 50%)',
                  }}
                />
              </div>

              {/* Top Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '16px',
                  backgroundColor: 'rgba(30, 36, 51, 0.88)',
                  backdropFilter: 'blur(8px)',
                  color: BRAND.skyBlue,
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.65rem',
                  letterSpacing: '1.5px',
                  fontWeight: 800,
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: '1px solid rgba(18, 164, 220, 0.4)',
                }}
              >
                STANDARDS // IS 456 CERTIFIED
              </div>

              {/* Floating "QUALITY AUDIT..." Card */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  backgroundColor: 'rgba(30, 36, 51, 0.94)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFFFFF',
                  padding: '14px 18px',
                  borderRadius: '6px',
                  border: '1.5px solid rgba(18, 164, 220, 0.5)',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
                  width: '210px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.72rem',
                    letterSpacing: '1.5px',
                    fontWeight: 800,
                    color: BRAND.skyBlue,
                    marginBottom: '8px',
                  }}
                >
                  QUALITY AUDIT // PASS
                </div>
                <div style={{ height: '4px', width: '100%', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '2px', marginBottom: '6px' }} />
                <div style={{ height: '4px', width: '70%', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '2px', marginBottom: '6px' }} />
                <div style={{ height: '4px', width: '92%', backgroundColor: BRAND.skyBlue, borderRadius: '2px', marginBottom: '8px' }} />
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.65rem',
                    color: 'rgba(255,255,255,0.7)',
                    letterSpacing: '0.5px',
                  }}
                >
                  GRADE M30 • STRUC QA VERIFIED
                </div>
              </div>
            </div>
          }
          mobileContent={
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative', width: '100%', height: '210px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(38, 54, 111, 0.12)' }}>
                <Image
                  src="/4%20services/construction%20and%20development.jpg"
                  alt="Construction & Development Structural Model"
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div
                style={{
                  width: '100%',
                  maxWidth: '260px',
                  backgroundColor: '#1E2433',
                  color: '#FFFFFF',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  border: '1px solid rgba(18, 164, 220, 0.4)',
                  alignSelf: 'flex-start',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.68rem',
                    letterSpacing: '1.5px',
                    fontWeight: 800,
                    color: BRAND.skyBlue,
                    marginBottom: '6px',
                  }}
                >
                  QUALITY AUDIT // PASS
                </div>
                <div style={{ height: '3px', width: '100%', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '2px', marginBottom: '4px' }} />
                <div style={{ height: '3px', width: '70%', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '2px', marginBottom: '4px' }} />
                <div style={{ height: '3px', width: '92%', backgroundColor: BRAND.skyBlue, borderRadius: '2px' }} />
              </div>
            </div>
          }
        />

        {/* ── 4. SECTION: Property Consulting & NRI Services ── */}
        <MethodologyRow
          stepNum="04"
          name="Property Consulting & NRI Services"
          text="Get personalized property guidance and assistance for local and NRI clients."
          side="left"
          isFirst={false}
          isLast={true}
          imageContent={
            <div style={{ position: 'relative', width: '100%', maxWidth: '540px', height: '360px' }}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 45px rgba(38, 54, 111, 0.16)',
                  border: '1px solid rgba(38, 54, 111, 0.14)',
                }}
              >
                <Image
                  src="/4%20services/property%20consultant.jpg"
                  alt="Property Consulting & NRI Services"
                  fill
                  sizes="(max-width: 768px) 100vw, 540px"
                  style={{
                    objectFit: 'cover',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(16, 24, 40, 0.6) 0%, rgba(16, 24, 40, 0) 50%)',
                  }}
                />
              </div>

              {/* Top Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '16px',
                  backgroundColor: 'rgba(30, 36, 51, 0.88)',
                  backdropFilter: 'blur(8px)',
                  color: BRAND.skyBlue,
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.65rem',
                  letterSpacing: '1.5px',
                  fontWeight: 800,
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: '1px solid rgba(18, 164, 220, 0.4)',
                }}
              >
                GLOBAL CLIENTS // NRI DESK
              </div>

              {/* Dark "SERVICE ASSURANCE" Card */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '14px',
                  left: '16px',
                  backgroundColor: 'rgba(30, 36, 51, 0.94)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFFFFF',
                  padding: '14px 18px',
                  borderRadius: '6px',
                  border: `1.5px solid ${BRAND.skyBlue}`,
                  boxShadow: '0 16px 40px rgba(0,0,0,0.35)',
                  width: '210px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.72rem',
                    letterSpacing: '2px',
                    fontWeight: 800,
                    color: BRAND.skyBlue,
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                  }}
                >
                  SERVICE ASSURANCE
                </div>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    fontFamily: 'monospace',
                    fontSize: '0.68rem',
                    color: 'rgba(255,255,255,0.85)',
                    lineHeight: 1.6,
                  }}
                >
                  <li>• CLEAR TITLE VERIFICATION</li>
                  <li>• RERA COMPLIANCE CHECK</li>
                  <li>• NRI POWER OF ATTORNEY</li>
                  <li>• DEDICATED CONSULTANT</li>
                </ul>
              </div>
            </div>
          }
          mobileContent={
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative', width: '100%', height: '210px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(38, 54, 111, 0.12)' }}>
                <Image
                  src="/4%20services/property%20consultant.jpg"
                  alt="Property Consulting & NRI Services Master Plan"
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div
                style={{
                  width: '100%',
                  backgroundColor: '#1E2433',
                  color: '#FFFFFF',
                  padding: '14px 16px',
                  borderRadius: '6px',
                  border: `1.5px solid ${BRAND.skyBlue}`,
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.68rem',
                    letterSpacing: '2px',
                    fontWeight: 800,
                    color: BRAND.skyBlue,
                    marginBottom: '6px',
                    textTransform: 'uppercase',
                  }}
                >
                  SERVICE ASSURANCE
                </div>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    fontFamily: 'monospace',
                    fontSize: '0.65rem',
                    color: 'rgba(255,255,255,0.88)',
                    lineHeight: 1.6,
                  }}
                >
                  <li>• CLEAR TITLE VERIFICATION</li>
                  <li>• RERA COMPLIANCE CHECK</li>
                  <li>• NRI POWER OF ATTORNEY</li>
                  <li>• DEDICATED CONSULTANT</li>
                </ul>
              </div>
            </div>
          }
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════
          PART 2: USE CASES — MADE FOR THE PEOPLE IN THE MODEL
          Connected cleanly below the 4 methodology sections.
         ══════════════════════════════════════════════════════════════════════════ */}
      <section
        className="use-cases-grid"
        style={{
          borderTop: '1px solid rgba(38, 54, 111, 0.15)',
          borderBottom: '1px solid rgba(38, 54, 111, 0.15)',
          backgroundColor: BRAND.white,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          minHeight: '680px',
        }}
      >
        {/* Left Side: Clean CAD Preview on Light Canvas (Zero Dark Grid) */}
        <div
          className="use-cases-left-pane"
          style={{
            borderRight: '1px solid rgba(38, 54, 111, 0.15)',
            position: 'relative',
            minHeight: '520px',
            backgroundColor: BRAND.offWhite,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px',
          }}
        >
          {/* Subtle Technical Plus Marks */}
          <span style={{ position: 'absolute', top: '16px', left: '20px', color: 'rgba(38, 54, 111, 0.35)', fontFamily: 'monospace', fontSize: '15px' }}>+</span>
          <span style={{ position: 'absolute', top: '16px', right: '20px', color: 'rgba(38, 54, 111, 0.35)', fontFamily: 'monospace', fontSize: '15px' }}>+</span>
          <span style={{ position: 'absolute', bottom: '16px', left: '20px', color: 'rgba(38, 54, 111, 0.35)', fontFamily: 'monospace', fontSize: '15px' }}>+</span>
          <span style={{ position: 'absolute', bottom: '16px', right: '20px', color: 'rgba(38, 54, 111, 0.35)', fontFamily: 'monospace', fontSize: '15px' }}>+</span>

          {/* Top HUD Badge */}
          <div
            style={{
              position: 'absolute',
              top: '24px',
              left: '28px',
              right: '28px',
              zIndex: 10,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: BRAND.primaryBlue,
                color: BRAND.white,
                padding: '6px 14px',
                borderRadius: '4px',
                border: `1px solid ${BRAND.skyBlue}`,
              }}
            >
              <Terminal size={14} color={BRAND.skyBlue} />
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.7rem',
                  letterSpacing: '2px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                PROPERTY: {USE_CASES[activeUseCase].role.toUpperCase()}
              </span>
            </div>

            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.72rem',
                letterSpacing: '1.5px',
                color: BRAND.primaryBlue,
                textTransform: 'uppercase',
                fontWeight: 800,
              }}
            >
              [{USE_CASES[activeUseCase].num} / 05]
            </span>
          </div>

          {/* Main Visual Image for Active Property Portfolio with Smooth Fade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={USE_CASES[activeUseCase].role}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                maxWidth: '640px',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(38, 54, 111, 0.18)',
                border: '1px solid rgba(38, 54, 111, 0.15)',
                zIndex: 2,
              }}
            >
              <Image
                src={USE_CASES[activeUseCase].image}
                alt={USE_CASES[activeUseCase].role}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 640px"
                style={{
                  objectFit: 'cover',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(16, 24, 40, 0.45) 0%, rgba(16, 24, 40, 0) 40%)',
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Bottom HUD Metadata */}
          <div
            style={{
              position: 'absolute',
              bottom: '22px',
              left: '28px',
              right: '28px',
              zIndex: 10,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.68rem',
              letterSpacing: '2px',
              color: BRAND.primaryBlue,
              textTransform: 'uppercase',
              borderTop: '1px dashed rgba(38, 54, 111, 0.25)',
              paddingTop: '10px',
            }}
          >
            <span>SCALE // {USE_CASES[activeUseCase].software}</span>
            <span style={{ color: BRAND.skyBlue, fontWeight: 700 }}>CATEGORY: {USE_CASES[activeUseCase].tag}</span>
          </div>
        </div>

        {/* Right Side: 5 Properties Heading + Interactive Accordion List */}
        <div
          className="use-cases-right-pane"
          style={{
            padding: '60px 4vw 60px 4vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: BRAND.white,
          }}
        >
          {/* Eyebrow & Main Title */}
          <div style={{ marginBottom: '32px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.75rem',
                letterSpacing: '3px',
                color: BRAND.skyBlue,
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '14px',
              }}
            >
              <span>+ SECTION 03.2</span>
              <span style={{ color: 'rgba(38, 54, 111, 0.3)' }}>//</span>
              <span>5 PROPERTIES +</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
                fontWeight: 900,
                color: BRAND.primaryBlue,
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              Curated for every
              <br />
              investment scale
            </h2>
          </div>

          {/* Accordion List of 8 Roles */}
          <div
            style={{
              borderBottom: '1px solid rgba(38, 54, 111, 0.15)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {USE_CASES.map((uc, i) => {
              const isOpen = activeUseCase === i;
              return (
                <div
                  key={uc.role}
                  style={{
                    borderTop: '1px solid rgba(38, 54, 111, 0.15)',
                    transition: 'background-color 0.25s ease',
                  }}
                >
                  {/* Trigger Button */}
                  <button
                    onClick={() => setActiveUseCase(i)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      padding: '16px 0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.75rem',
                          color: isOpen ? BRAND.skyBlue : 'rgba(38, 54, 111, 0.45)',
                          letterSpacing: '1.5px',
                          fontWeight: 700,
                        }}
                      >
                        [{uc.num}]
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)',
                          fontWeight: 800,
                          letterSpacing: '0.5px',
                          textTransform: 'uppercase',
                          color: isOpen ? BRAND.primaryBlue : 'rgba(38, 54, 111, 0.85)',
                          transition: 'color 0.25s ease',
                        }}
                      >
                        {uc.role}
                      </span>
                    </div>

                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: isOpen ? BRAND.primaryBlue : 'rgba(38, 54, 111, 0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isOpen ? BRAND.white : BRAND.primaryBlue,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {isOpen ? <Minus size={16} strokeWidth={2.5} /> : <Plus size={16} strokeWidth={2.5} />}
                    </div>
                  </button>

                  {/* Expanded Content with AnimatePresence */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ paddingBottom: '22px', paddingLeft: '32px', maxWidth: '540px' }}>
                          <p
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '1.08rem',
                              lineHeight: 1.55,
                              color: BRAND.primaryBlue,
                              fontWeight: 600,
                              margin: '0 0 8px 0',
                            }}
                          >
                            {uc.text}
                          </p>
                          <p
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.96rem',
                              lineHeight: 1.5,
                              color: 'rgba(38, 54, 111, 0.75)',
                              margin: 0,
                            }}
                          >
                            {uc.detail}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
