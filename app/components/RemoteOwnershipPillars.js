'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Plane,
  ShieldCheck,
  Building2,
  TrendingUp,
  CheckCircle2,
  Compass,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import GlobalNetworkGlobe from './GlobalNetworkGlobe';
import TopographicContours from './TopographicContours';
import PanoramicLandscapeSilhouette from './PanoramicLandscapeSilhouette';

// Approved BlueMoon Corporate Palette Tokens
const PALETTE = {
  warmIvory: '#FFFFFF',
  ivoryCard: '#FFFFFF',
  deepNavy: '#26366F',
  primaryBlue: '#26366F',
  champagneGold: '#12A4DC', // Replaced prohibited gold with approved Sky Blue
  goldAccent: '#D2143A', // Replaced prohibited gold with approved Red Accent
  mutedSand: '#FFFFFF',
  skyBlue: '#12A4DC',
  pureWhite: '#FFFFFF',
  redAccent: '#D2143A',
};

// Approved 4 Pillars Content
const PILLARS_DATA = [
  {
    num: '01',
    title: '100% REMOTE DIGITAL REGISTRATION',
    subtitle: 'Zero Physical Travel Required',
    desc: 'Execute full asset acquisition from your living room overseas. We facilitate Power of Attorney (PoA) validation via Indian Embassies, virtual KYC, biometric registry appointments, and original registered deeds couriered via secure diplomatic vault pouch.',
    icon: Plane,
    points: [
      'Indian Consulate / Embassy PoA Adjudication Assistance',
      'Virtual Notarization & Secure Cloud KYC Vault',
      'Original Registered Sale Deed Delivered via Tracked Courier',
      'Dedicated High-Court Legal Counsel Representing Buyer',
    ],
  },
  {
    num: '02',
    title: 'FEMA & REPATRIATION CERTAINTY',
    subtitle: 'NRE / NRO Seamless Flow',
    desc: '100% compliant with RBI Master Directions and FEMA guidelines. Complete capital repatriation certainty for future asset sales, automated Form 15CA/15CB tax clearances, and double taxation treaty (DTAA) optimization for maximum net returns.',
    icon: ShieldCheck,
    points: [
      'Repatriable NRE Account Investment Routing',
      'Seamless Capital Repatriation Back to Foreign Bank Accounts',
      'Pre-Arranged 15CA & 15CB CA Certification Protocols',
      'Zero Hidden Surcharges or Currency Remittance Penalties',
    ],
  },
  {
    num: '03',
    title: 'AERIAL DRONE TELEMETRY AUDITS',
    subtitle: 'Quarterly 4K Timestamped Surveillance',
    desc: 'Never wonder about on-ground progress. Receive quarterly high-definition drone surveys, 360-degree boundary inspection scans, and milestone progression telemetry pushed directly to your private Blue Moon Sovereign Investor Portal.',
    icon: Building2,
    points: [
      'Quarterly 4K Aerial Drone Surveillance Pushed to Portal',
      'Precision Geo-Tagged Timestamped Boundary Photos',
      'Live Video Walkthroughs with Lead Project Directors',
      '24/7 RFID Guarded Enclave Boundary Protection Guarantee',
    ],
  },
  {
    num: '04',
    title: 'LIFECYCLE ASSET WEALTH DESK',
    subtitle: 'Leasing, Maintenance & Exit Liquidity',
    desc: 'We protect and grow your capital across the entire holding cycle. Our dedicated Wealth Desk handles annual property tax payments, compound fence upkeep, corporate tenant acquisition, and high-yield secondary market liquidation.',
    icon: TrendingUp,
    points: [
      'Complete Property Tax & Municipal Records Administration',
      'Corporate Tenant Acquisition for Commercials & Villas',
      'Secondary Market Resale Liquidity Desk with 0% Brokerage',
      'Quarterly Capital Appreciation & Yield Statement Reports',
    ],
  },
];

// Individual Interactive Cinematic Card Component
function PillarCard({ pillar, index, shouldReduceMotion }) {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 8, y: -y * 8 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 36 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: shouldReduceMotion ? 0 : index * 0.12,
          },
        },
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        y: isHovered && !shouldReduceMotion ? -8 : 0,
        rotateY: !shouldReduceMotion ? tilt.x : 0,
        rotateX: !shouldReduceMotion ? tilt.y : 0,
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      style={{
        position: 'relative',
        backgroundColor: '#FFFFFF',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '24px',
        padding: '2.4rem 2rem',
        border: isHovered
          ? `1px solid rgba(18, 164, 220, 0.65)`
          : `1px solid rgba(38, 54, 111, 0.12)`,
        boxShadow: isHovered
          ? '0 28px 65px rgba(38, 54, 111, 0.12), 0 2px 10px rgba(18, 164, 220, 0.15)'
          : '0 18px 45px rgba(38, 54, 111, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        transition: 'border 0.35s ease, box-shadow 0.35s ease',
      }}
    >
      {/* ── Oversized Pale Watermark Numeral (01, 02, 03, 04) ── */}
      <motion.span
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 0.09, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
        style={{
          position: 'absolute',
          top: '-10px',
          right: '12px',
          fontFamily: 'var(--font-heading)',
          fontSize: '5.8rem',
          fontWeight: 800,
          color: PALETTE.deepNavy,
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        {pillar.num}
      </motion.span>

      {/* ── Ambient Sky Blue Corner Sheen ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '140px',
          height: '140px',
          background: 'radial-gradient(circle at top right, rgba(18, 164, 220, 0.12), transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Card Main Content ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Top Header: Numeral Indicator + Luxury Icon Container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.6rem',
          }}
        >
          {/* Subtle Step Indicator */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '20px',
              backgroundColor: 'rgba(18, 164, 220, 0.10)',
              border: '1px solid rgba(18, 164, 220, 0.3)',
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: PALETTE.skyBlue,
                letterSpacing: '1px',
              }}
            >
              PILLAR {pillar.num}
            </span>
          </div>

          {/* Luxury Icon Badge */}
          <motion.div
            animate={{
              scale: isHovered && !shouldReduceMotion ? 1.08 : 1,
              backgroundColor: isHovered ? PALETTE.primaryBlue : PALETTE.skyBlue,
            }}
            transition={{ duration: 0.3 }}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '13px',
              backgroundColor: PALETTE.primaryBlue,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: PALETTE.pureWhite,
              boxShadow: '0 8px 20px rgba(38, 54, 111, 0.22)',
              border: '1px solid rgba(18, 164, 220, 0.45)',
            }}
          >
            <pillar.icon size={21} color="#FFFFFF" />
          </motion.div>
        </div>

        {/* Title */}
        <h4
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.2rem',
            color: PALETTE.deepNavy,
            margin: '0 0 6px 0',
            lineHeight: 1.3,
            letterSpacing: '0.5px',
          }}
        >
          {pillar.title}
        </h4>

        {/* Subtitle */}
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-body)',
            fontSize: '0.78rem',
            letterSpacing: '1.2px',
            color: PALETTE.skyBlue,
            fontWeight: 700,
            textTransform: 'uppercase',
            marginBottom: '1.1rem',
          }}
        >
          {pillar.subtitle}
        </span>

        {/* Description Paragraph */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.92rem',
            lineHeight: 1.68,
            color: 'rgba(38, 54, 111, 0.85)',
            marginBottom: '1.6rem',
          }}
        >
          {pillar.desc}
        </p>
      </div>

      {/* ── Benefits Checklist ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          borderTop: '1px solid rgba(38, 54, 111, 0.12)',
          paddingTop: '1.3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '9px',
        }}
      >
        {pillar.points.map((pt, ptIdx) => (
          <div
            key={ptIdx}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '9px',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-body)',
              color: PALETTE.deepNavy,
              lineHeight: 1.4,
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: 'rgba(18, 164, 220, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px',
              }}
            >
              <CheckCircle2 size={12} color={PALETTE.skyBlue} />
            </div>
            <span>{pt}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function RemoteOwnershipPillars({ className = '' }) {
  // Ensure the full cinematic opening animation is rendered
  const shouldReduceMotion = false;

  return (
    <div style={{ position: 'relative', marginBottom: '5.5rem' }}>
      {/* ── PHASE 1: Corporate Sky Blue Horizon Beam (Expands Outward on Entry) ── */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: [0, 1, 0.85] }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: '-2px',
          left: '4%',
          right: '4%',
          height: '3px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(18, 164, 220, 0.4) 15%, #12A4DC 50%, rgba(38, 54, 111, 0.5) 85%, transparent 100%)',
          boxShadow: '0 0 24px rgba(18, 164, 220, 0.8), 0 0 10px rgba(38, 54, 111, 0.4)',
          zIndex: 10,
          transformOrigin: 'center',
          pointerEvents: 'none',
        }}
      >
        {/* Center Diamond Pulsing Beacon */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: 0 }}
          whileInView={{ scale: [0, 1.4, 1], opacity: 1, rotate: 45 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{
            position: 'absolute',
            top: '-5px',
            left: '50%',
            transform: 'translateX(-50%) rotate(45deg)',
            width: '12px',
            height: '12px',
            backgroundColor: '#12A4DC',
            boxShadow: '0 0 16px rgba(18, 164, 220, 0.95)',
          }}
        />
      </motion.div>

      {/* ── PHASE 2: Main Section Container with Cinematic Aperture Unveil ── */}
      <motion.section
        aria-label="The 4 Pillars of Remote Ownership"
        className={className}
        initial={{
          opacity: 0,
          scale: shouldReduceMotion ? 1 : 0.96,
          clipPath: shouldReduceMotion
            ? 'inset(0% 0% 0% 0% round 36px)'
            : 'inset(6% 0% 6% 0% round 36px)',
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0% round 36px)',
        }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          position: 'relative',
          backgroundColor: '#FFFFFF',
          borderRadius: '36px',
          padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 4vw, 4rem)',
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(38, 54, 111, 0.06)',
          border: '1px solid rgba(38, 54, 111, 0.12)',
        }}
      >
        {/* ── PHASE 3: Architectural Retracting Shutter / Veil ── */}
        {!shouldReduceMotion && (
          <motion.div
            aria-hidden="true"
            initial={{ scaleY: 1, opacity: 0.95 }}
            whileInView={{ scaleY: 0, opacity: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.15, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.92))',
              transformOrigin: 'top',
              pointerEvents: 'none',
              zIndex: 4,
            }}
          />
        )}

        {/* ── Architectural Background Layers ── */}
        <TopographicContours />
        <PanoramicLandscapeSilhouette />

        {/* Soft Ambient Radiance Gradient */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-15%',
            left: '20%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(18, 164, 220, 0.10) 0%, rgba(255, 255, 255, 0) 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1380px',
            margin: '0 auto',
          }}
        >
          {/* ── Section Header with Global Network Visualization ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '2rem',
              marginBottom: '4.5rem',
              position: 'relative',
            }}
          >
            {/* Left Column: Editorial Heading Sequence */}
            <div style={{ maxWidth: '780px' }}>
              {/* 1. Small Uppercase Eyebrow with Compass Star */}
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 18px',
                  borderRadius: '50px',
                  backgroundColor: 'rgba(18, 164, 220, 0.12)',
                  border: '1px solid rgba(18, 164, 220, 0.35)',
                  marginBottom: '1.2rem',
                }}
              >
                <Compass size={13} color={PALETTE.skyBlue} />
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.74rem',
                    letterSpacing: '3px',
                    color: PALETTE.primaryBlue,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  WHITE-GLOVE GUARANTEES
                </span>
              </motion.div>

              {/* 2. Large Editorial Title */}
              <motion.h3
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.12 }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.3rem, 4.8vw, 3.8rem)',
                  color: PALETTE.primaryBlue,
                  margin: '0 0 1rem 0',
                  lineHeight: 1.15,
                  letterSpacing: '0.5px',
                  fontWeight: 800,
                }}
              >
                THE 4 PILLARS OF <br />
                <span style={{ color: PALETTE.skyBlue }}>REMOTE OWNERSHIP</span>
              </motion.h3>

              {/* 3. Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.22 }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
                  lineHeight: 1.7,
                  color: 'rgba(38, 54, 111, 0.85)',
                  margin: '0 0 1.6rem 0',
                  maxWidth: '680px',
                }}
              >
                Institutional-Grade Land Security &amp; Cross-Border Wealth Continuity for Global NRIs.
                Engineered to eliminate distance, bureaucratic friction, and physical transit requirements.
              </motion.p>

              {/* 4. Animated Thin Accent Line */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  height: '2px',
                  width: '100%',
                  maxWidth: '380px',
                  background: `linear-gradient(90deg, ${PALETTE.skyBlue}, rgba(38, 54, 111, 0.4), transparent)`,
                  transformOrigin: 'left',
                }}
              />
            </div>

            {/* Right Column: Global Network Visualization Globe with Opening Scale */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82, rotate: shouldReduceMotion ? 0 : -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <GlobalNetworkGlobe size={360} speed={0.48} interactive={true} />
            </motion.div>
          </div>

          {/* ── 4 Cinematic Service Cards Grid with Staggered Cascading Reveal ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '26px',
              marginBottom: '4.5rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {PILLARS_DATA.map((pillar, idx) => (
              <PillarCard
                key={pillar.num}
                pillar={pillar}
                index={idx}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </motion.div>

          {/* ── Premium Editorial Closing Composition ── */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '2rem',
              textAlign: 'center',
            }}
          >
            {/* Decorative Dividers & Emblem */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                width: '100%',
                maxWidth: '680px',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(18, 164, 220, 0.5))',
                }}
              />
              {/* Emblem */}
              <div
                style={{
                  width: '9px',
                  height: '9px',
                  transform: 'rotate(45deg)',
                  backgroundColor: PALETTE.skyBlue,
                  boxShadow: '0 0 10px rgba(18, 164, 220, 0.6)',
                }}
              />
              <div
                style={{
                  flex: 1,
                  height: '1px',
                  background: 'linear-gradient(90deg, rgba(18, 164, 220, 0.5), transparent)',
                }}
              />
            </div>

            {/* Restrained Editorial Closing Line */}
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(0.82rem, 1.2vw, 0.95rem)',
                letterSpacing: '5px',
                color: PALETTE.primaryBlue,
                fontWeight: 800,
                textTransform: 'uppercase',
              }}
            >
              TRUSTED · TRANSPARENT · GLOBAL
            </span>

            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '0.78rem',
                color: 'rgba(38, 54, 111, 0.65)',
                marginTop: '6px',
                letterSpacing: '1px',
              }}
            >
              BLUE MOON SOVEREIGN LAND RESERVES // GOVERNANCE CERTIFIED
            </span>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
