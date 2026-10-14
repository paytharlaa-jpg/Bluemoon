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
    <div
      ref={rowRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
  );
}

// ── 8 Use Case Disciplines Data ──
const USE_CASES = [
  {
    num: '01',
    role: 'Architects',
    text: 'Hand the repetitive modelling to Heron and keep your focus on design.',
    detail: 'Eliminate hours spent manually re-dimensioning floor plans and cleaning CAD linework. Heron handles repetitive grid layout adjustments so you can spend your time exploring design iterations.',
    image: '/why-us-observe.jpg',
    tag: 'REPETITIVE_MODELLING',
    software: 'REVIT // RHINO // ARCHICAD',
  },
  {
    num: '02',
    role: 'Interior Designers',
    text: 'Get quick help with layouts, fixtures, and clearances without leaving your model.',
    detail: 'Verify ADA door swing clearances, furniture clearances, and custom casework offsets instantly within your 3D model environment.',
    image: '/why-us-advise.jpg',
    tag: 'CLEARANCE_OPTIMIZATION',
    software: 'SKETCHUP // REVIT',
  },
  {
    num: '03',
    role: 'Landscape Architects',
    text: 'Sort grading, site elements, and layouts without the manual grind.',
    detail: 'Automate contour calculations, cut-and-fill balances, and hardscape boundary alignments seamlessly across complex terrain masterplans.',
    image: '/why-us-learn.jpg',
    tag: 'TERRAIN_GRADING_CAD',
    software: 'CIVIL 3D // RHINO',
  },
  {
    num: '04',
    role: 'Engineers',
    text: 'Run discipline-specific checks and edits in the model, so coordination issues surface earlier.',
    detail: 'Detect structural clash points, beam penetration violations, and MEP shaft interferences well before schematic milestones or construction documentation.',
    image: '/why-us-act.jpg',
    tag: 'STRUCTURAL_COORDINATION',
    software: 'TEKLA // REVIT STRUCTURE',
  },
  {
    num: '05',
    role: 'BIM Managers',
    text: "Keep models clean and on-standard with an agent that knows your firm's rules.",
    detail: 'Enforce naming conventions, clean up unreferenced CAD links, purge corrupt families, and maintain audit-ready BIM execution standards across all team models.',
    image: '/architectural-tower-drawing.jpg',
    tag: 'BIM_GOVERNANCE',
    software: 'NAVISWORKS // REVIT BIM',
  },
  {
    num: '06',
    role: 'Drafters',
    text: 'Skip the tedious drawing cleanup and let Heron handle the repeatable parts.',
    detail: 'Automate sheet annotations, detail referencing, view alignment, and title block parameters without repetitive manual typing.',
    image: '/tower-outline.jpg',
    tag: 'DRAWING_PRODUCTION',
    software: 'AUTOCAD // REVIT ARCH',
  },
  {
    num: '07',
    role: 'Design Leads',
    text: "Keep quality and standards consistent across everyone's work.",
    detail: 'Ensure cohesive architectural language and regulatory compliance across diverse project squads without spending your evenings performing redline checks.',
    image: '/commercial.jpg',
    tag: 'STUDIO_QUALITY_CONTROL',
    software: 'ENTERPRISE_STUDIO_SUITE',
  },
  {
    num: '08',
    role: 'Small Firms',
    text: 'Get the output of a bigger team without adding headcount.',
    detail: 'Scale project capacity, handle enterprise-scale commercial tenders, and deliver multi-story developments with the nimble agility of a boutique studio.',
    image: '/willow-creek-site-plan.jpg',
    tag: 'AGILE_PRACTICE_SCALING',
    software: 'CLOUD_STUDIO_COLLAB',
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
            <div style={{ position: 'relative', width: '100%', maxWidth: '520px', height: '75%' }}>
              <Image
                src="/why-us-observe.jpg"
                alt="Property Buying & Selling Elevation Model"
                fill
                sizes="(max-width: 768px) 100vw, 520px"
                style={{
                  objectFit: 'contain',
                  filter: 'contrast(1.1)',
                  mixBlendMode: 'multiply',
                }}
              />
              {/* Red Square Accent Observation Markers matching Screenshot 1 */}
              <div
                style={{
                  position: 'absolute',
                  top: '34%',
                  left: '42%',
                  width: '12px',
                  height: '12px',
                  backgroundColor: BRAND.premiumRed,
                  boxShadow: '0 0 10px rgba(210, 20, 58, 0.6)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '36%',
                  right: '28%',
                  width: '12px',
                  height: '12px',
                  backgroundColor: BRAND.premiumRed,
                  boxShadow: '0 0 10px rgba(210, 20, 58, 0.6)',
                }}
              />
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
            <div style={{ position: 'relative', width: '100%', maxWidth: '520px', height: '75%' }}>
              <Image
                src="/why-us-advise.jpg"
                alt="Real Estate Investment Floor Plan"
                fill
                sizes="(max-width: 768px) 100vw, 520px"
                style={{
                  objectFit: 'contain',
                  filter: 'contrast(1.1)',
                  mixBlendMode: 'multiply',
                }}
              />
              {/* Red Indicator Point in Corridor matching Screenshot 2 */}
              <div
                style={{
                  position: 'absolute',
                  top: '38%',
                  left: '49%',
                  width: '12px',
                  height: '12px',
                  backgroundColor: BRAND.premiumRed,
                  boxShadow: '0 0 10px rgba(210, 20, 58, 0.7)',
                }}
              />
              {/* Dark Investment Intelligence Card matching Screenshot 2 */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '8%',
                  right: '6%',
                  backgroundColor: '#1E2433',
                  color: '#FFFFFF',
                  padding: '16px 20px',
                  borderRadius: '4px',
                  border: `1.5px solid ${BRAND.skyBlue}`,
                  boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
                  maxWidth: '280px',
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
            <div style={{ position: 'relative', width: '100%', maxWidth: '520px', height: '75%' }}>
              <Image
                src="/why-us-act.jpg"
                alt="Construction & Development Structural Model"
                fill
                sizes="(max-width: 768px) 100vw, 520px"
                style={{
                  objectFit: 'contain',
                  filter: 'contrast(1.1)',
                  mixBlendMode: 'multiply',
                }}
              />
              {/* Floating "QUALITY AUDIT..." Card matching Screenshot 3 */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16%',
                  left: '10%',
                  backgroundColor: '#1E2433',
                  color: '#FFFFFF',
                  padding: '12px 18px',
                  borderRadius: '4px',
                  border: '1px solid rgba(18, 164, 220, 0.4)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
                  width: '180px',
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
                  QUALITY AUDIT...
                </div>
                <div style={{ height: '4px', width: '100%', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '2px', marginBottom: '6px' }} />
                <div style={{ height: '4px', width: '70%', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '2px', marginBottom: '6px' }} />
                <div style={{ height: '4px', width: '85%', backgroundColor: BRAND.skyBlue, borderRadius: '2px' }} />
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
            <div style={{ position: 'relative', width: '100%', maxWidth: '520px', height: '75%' }}>
              <Image
                src="/why-us-learn.jpg"
                alt="Property Consulting & NRI Services Master Plan"
                fill
                sizes="(max-width: 768px) 100vw, 520px"
                style={{
                  objectFit: 'contain',
                  filter: 'contrast(1.1)',
                  mixBlendMode: 'multiply',
                }}
              />
              {/* Dark "SERVICE ASSURANCE" Card matching Screenshot 4 */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '10%',
                  left: '6%',
                  backgroundColor: '#1E2433',
                  color: '#FFFFFF',
                  padding: '14px 18px',
                  borderRadius: '4px',
                  border: `1.5px solid ${BRAND.skyBlue}`,
                  boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
                  width: '180px',
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
                    color: 'rgba(255,255,255,0.8)',
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
                ROLE: {USE_CASES[activeUseCase].role.toUpperCase()}
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
              [{USE_CASES[activeUseCase].num} / 08]
            </span>
          </div>

          {/* Main Visual Image for Active Use Case with Smooth Fade */}
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
                height: '75%',
                maxWidth: '620px',
                zIndex: 2,
              }}
            >
              <Image
                src={USE_CASES[activeUseCase].image}
                alt={USE_CASES[activeUseCase].role}
                fill
                priority
                style={{
                  objectFit: 'contain',
                  filter: 'contrast(1.08)',
                  mixBlendMode: 'multiply',
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
            <span>INTEGRATION: {USE_CASES[activeUseCase].software}</span>
            <span style={{ color: BRAND.skyBlue, fontWeight: 700 }}>TAG: {USE_CASES[activeUseCase].tag}</span>
          </div>
        </div>

        {/* Right Side: Use Cases Heading + Interactive Accordion List */}
        <div
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
              <span>USE CASES +</span>
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
              Made for the people
              <br />
              in the model
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
