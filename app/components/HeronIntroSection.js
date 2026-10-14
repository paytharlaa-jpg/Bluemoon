'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

// Partner / Client Logos Data (8 architectural enterprise partners)
const CLIENT_PARTNERS = [
  { id: 'foster', name: 'FOSTER + PARTNERS', sub: 'LONDON' },
  { id: 'gensler', name: 'GENSLER', sub: 'GLOBAL' },
  { id: 'som', name: 'S.O.M.', sub: 'NEW YORK' },
  { id: 'zaha', name: 'ZAHA HADID', sub: 'ARCHITECTS' },
  { id: 'arup', name: 'ARUP GROUP', sub: 'ENGINEERING' },
  { id: 'hok', name: 'H.O.K.', sub: 'ARCHITECTURE' },
  { id: 'perkins', name: 'PERKINS & WILL', sub: 'STUDIO' },
  { id: 'buro', name: 'BURO HAPPOLD', sub: 'STRUCTURES' },
];

export default function HeronIntroSection() {
  const sectionRef = useRef(null);
  const imageFrameRef = useRef(null);

  // ── Auto-Rolling Clients State ──
  const [offset, setOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-roll clients every 2.4 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % CLIENT_PARTNERS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setOffset((prev) => (prev + CLIENT_PARTNERS.length - 1) % CLIENT_PARTNERS.length);
  };

  const handleNext = () => {
    setOffset((prev) => (prev + 1) % CLIENT_PARTNERS.length);
  };

  // ── Scroll Tracking for Building: Outline -> Colorful Building ──
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Smooth scroll spring for silky fluid reveal
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    restDelta: 0.001,
  });

  // Map scroll progress (entering at 0.2, completing at 0.7) to 0% -> 100%
  const scrollReveal = useTransform(smoothProgress, [0.22, 0.68], [0, 100]);
  
  // Interactive manual override for hover/drag
  const [isInteractive, setIsInteractive] = useState(false);
  const manualReveal = useMotionValue(0);

  // Active reveal clip-path: reveals colorful building from bottom to top or top to bottom
  const clipBottom = useTransform(isInteractive ? manualReveal : scrollReveal, (v) => {
    const clamped = Math.max(0, Math.min(100, v));
    return `inset(0 0 ${100 - clamped}% 0)`;
  });

  // Scanner Laser position
  const scanTop = useTransform(isInteractive ? manualReveal : scrollReveal, (v) => {
    const clamped = Math.max(0, Math.min(100, v));
    return `${clamped}%`;
  });

  const scanOpacity = useTransform(isInteractive ? manualReveal : scrollReveal, (v) => {
    if (v <= 2 || v >= 98) return 0;
    return 1;
  });

  // Percentage badge
  const [displayPercent, setDisplayPercent] = useState(0);
  useEffect(() => {
    const unsubscribe = (isInteractive ? manualReveal : scrollReveal).on('change', (latest) => {
      setDisplayPercent(Math.round(Math.max(0, Math.min(100, latest))));
    });
    return () => unsubscribe();
  }, [isInteractive]);

  return (
    <section
      ref={sectionRef}
      id="intro-modelling"
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid rgba(38, 54, 111, 0.15)',
        position: 'relative',
        zIndex: 20,
      }}
    >
      {/* ── Top Architectural Drafting Rule ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(38, 54, 111, 0.12)',
          padding: '0 24px',
          height: '24px',
          fontFamily: 'monospace',
          fontSize: '11px',
          color: 'rgba(38, 54, 111, 0.45)',
          userSelect: 'none',
        }}
      >
        <span>+</span>
        <span style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(38, 54, 111, 0.5)' }}>
          SECTION 02 // ARCHITECTURAL GUIDANCE &amp; PROPERTY ADVISORY
        </span>
        <span>+</span>
      </div>

      {/* ── Two-Column Grid: Left Building Outline-to-Color | Right Statement & Clients ── */}
      <div
        className="heron-intro-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1.05fr) minmax(360px, 1fr)',
          minHeight: '660px',
        }}
      >
        {/* Left Column: Building Outline that transforms into Colorful Building on Scroll */}
        <div
          ref={imageFrameRef}
          className="heron-intro-image"
          style={{
            borderRight: '1px solid rgba(38, 54, 111, 0.15)',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '520px',
            padding: '24px 20px',
          }}
          onMouseEnter={() => setIsInteractive(false)}
        >
          {/* Top Technical Drafting Metadata */}
          <div
            style={{
              position: 'absolute',
              top: '14px',
              left: '18px',
              right: '18px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'monospace',
              fontSize: '10px',
              color: 'rgba(38, 54, 111, 0.55)',
              zIndex: 10,
              userSelect: 'none',
            }}
          >
            <span>[ FIG 02.1 // BLUEPRINT TO REALITY ]</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: displayPercent > 10 ? 'var(--sky-blue)' : 'var(--primary-blue)',
                  boxShadow: displayPercent > 10 ? '0 0 8px #12A4DC' : 'none',
                  transition: 'background-color 0.3s',
                }}
              />
              <span style={{ color: 'var(--primary-blue)', fontWeight: 700 }}>
                {displayPercent === 0 ? 'CAD OUTLINE' : displayPercent === 100 ? '100% RENDERED' : `${displayPercent}% RENDER`}
              </span>
            </div>
          </div>

          {/* Bottom Technical Scale Indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: '14px',
              left: '18px',
              right: '18px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'monospace',
              fontSize: '9.5px',
              color: 'rgba(38, 54, 111, 0.45)',
              zIndex: 10,
              userSelect: 'none',
            }}
          >
            <span>SCALE 1:500 // ELEVATION 395M</span>
            <span style={{ letterSpacing: '1px' }}>SCROLL TO RENDER</span>
          </div>

          {/* Interactive Visual Stage: Dual-Layered Building */}
          <div
            className="heron-building-stage"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '520px',
              aspectRatio: '2 / 3',
              margin: 'auto',
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: '0 12px 36px rgba(38, 54, 111, 0.08)',
              backgroundColor: '#FFFFFF',
            }}
          >
            {/* LAYER 1: Building Architectural Outline / Line Drawing */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFFFFF',
              }}
            >
              <Image
                src="/tower-outline.jpg"
                alt="Architectural CAD outline elevation line drawing of skyscraper"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{
                  objectFit: 'contain',
                  objectPosition: 'center',
                  padding: '8px',
                }}
                priority
              />
            </div>

            {/* LAYER 2: Colorful Building (Revealed smoothly on scroll via clip-path) */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 2,
                clipPath: clipBottom,
                WebkitClipPath: clipBottom,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFFFFF',
                willChange: 'clip-path',
              }}
            >
              <Image
                src="/tower-color.jpg"
                alt="Colorful photorealistic architectural photograph of the completed skyscraper tower"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{
                  objectFit: 'contain',
                  objectPosition: 'center',
                  padding: '8px',
                }}
                priority
              />
            </motion.div>

            {/* LAYER 3: Cyan Blueprint Laser Scan Line (Tracks the scroll reveal edge) */}
            <motion.div
              style={{
                position: 'absolute',
                top: scanTop,
                left: 0,
                width: '100%',
                height: '2px',
                backgroundColor: 'var(--sky-blue)',
                boxShadow: '0 0 12px rgba(18, 164, 220, 0.9), 0 0 24px rgba(18, 164, 220, 0.5)',
                opacity: scanOpacity,
                zIndex: 5,
                pointerEvents: 'none',
                willChange: 'top, opacity',
              }}
            >
              {/* Technical Marker on the scan line */}
              <div
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '-10px',
                  fontFamily: 'monospace',
                  fontSize: '8.5px',
                  backgroundColor: 'var(--primary-blue)',
                  color: '#FFFFFF',
                  padding: '2px 6px',
                  borderRadius: '2px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                }}
              >
                + SCAN: {displayPercent}%
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Statement, Learn More Button, Auto-Rolling Clients, Integration Caption */}
        <div
          className="heron-intro-content"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF',
          }}
        >
          {/* Statement Block */}
          <div
            className="heron-intro-statement"
            style={{
              flex: 1,
              padding: 'clamp(36px, 5vw, 65px) clamp(24px, 5vw, 60px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {/* The user-requested corporate statement text */}
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.5rem, 2.1vw, 2.3rem)',
                lineHeight: 1.25,
                color: 'var(--primary-blue)',
                marginBottom: '32px',
                textTransform: 'uppercase',
                fontWeight: 700,
                letterSpacing: '-0.01em',
              }}
            >
              Every property journey comes with important decisions. We aim to make that journey
              clearer through responsive communication, personalized attention, and practical guidance.
            </h2>

            {/* Technical Button: Learn More */}
            <div>
              <a
                href="#portfolio"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: '44px',
                  gap: 0,
                  padding: 0,
                  border: '1px solid rgba(38, 54, 111, 0.28)',
                  backgroundColor: 'transparent',
                  color: 'var(--primary-blue)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.78rem',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                className="group hover:bg-[#26366F] hover:text-white hover:border-[#26366F]"
              >
                <span style={{ padding: '0 18px', color: 'inherit' }}>
                  Learn more
                </span>
                <span
                  style={{
                    boxSizing: 'content-box',
                    padding: '11px 14px',
                    borderLeft: '1px dashed rgba(38, 54, 111, 0.28)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'inherit',
                  }}
                >
                  <ArrowRight size={15} />
                </span>
              </a>
            </div>
          </div>

          {/* Partner / Clients Heading Row with Auto-Roll Status */}
          <div
            className="heron-intro-clients-header"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid rgba(38, 54, 111, 0.15)',
              borderBottom: '1px solid rgba(38, 54, 111, 0.15)',
              fontFamily: 'monospace',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: 'var(--primary-blue)',
              paddingLeft: '24px',
              height: '42px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontWeight: 700 }}>Clients</span>
              {/* Auto-rolling indicator badge */}
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                title={isPaused ? "Click to resume auto-roll" : "Click to pause auto-roll"}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  backgroundColor: isPaused ? 'rgba(38, 54, 111, 0.08)' : 'rgba(18, 164, 220, 0.12)',
                  color: isPaused ? 'rgba(38, 54, 111, 0.6)' : 'var(--sky-blue)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '2px 8px',
                  fontSize: '9px',
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                  transition: 'all 0.2s ease',
                }}
              >
                <span
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    backgroundColor: isPaused ? 'rgba(38, 54, 111, 0.4)' : 'var(--sky-blue)',
                    boxShadow: isPaused ? 'none' : '0 0 6px #12A4DC',
                  }}
                />
                <span>{isPaused ? 'PAUSED' : 'AUTO-ROLL'}</span>
              </button>
            </div>

            {/* Manual Navigation Controls */}
            <div style={{ display: 'flex', height: '100%' }}>
              <button
                type="button"
                aria-label="Previous clients"
                onClick={handlePrev}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '42px',
                  height: '100%',
                  border: 'none',
                  borderLeft: '1px solid rgba(38, 54, 111, 0.15)',
                  backgroundColor: 'transparent',
                  color: 'var(--primary-blue)',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease, color 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-blue)';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--primary-blue)';
                }}
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                aria-label="Next clients"
                onClick={handleNext}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '42px',
                  height: '100%',
                  border: 'none',
                  borderLeft: '1px solid rgba(38, 54, 111, 0.15)',
                  backgroundColor: 'transparent',
                  color: 'var(--primary-blue)',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease, color 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-blue)';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--primary-blue)';
                }}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Auto-Rolling Clients Grid with Smooth Transition */}
          <div
            className="heron-partners-grid"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              height: '96px',
              backgroundColor: '#FFFFFF',
            }}
          >
            {Array.from({ length: 5 }, (_, i) => {
              const client = CLIENT_PARTNERS[(i + offset) % CLIENT_PARTNERS.length];
              return (
                <div
                  key={`${client.id}-${i}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px 8px',
                    borderRight: i < 4 ? '1px dashed rgba(38, 54, 111, 0.15)' : 'none',
                    textAlign: 'center',
                    userSelect: 'none',
                    transition: 'all 0.4s ease',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      letterSpacing: '1px',
                      color: 'var(--primary-blue)',
                      lineHeight: 1.15,
                    }}
                  >
                    {client.name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '8.5px',
                      letterSpacing: '1.2px',
                      color: 'var(--sky-blue)',
                      marginTop: '3px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {client.sub}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Integration Caption */}
          <p
            className="heron-integration-caption"
            style={{
              padding: '11px 24px',
              borderTop: '1px solid rgba(38, 54, 111, 0.15)',
              margin: 0,
              fontFamily: 'monospace',
              fontSize: '9.5px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: 'rgba(38, 54, 111, 0.65)',
              backgroundColor: 'rgba(38, 54, 111, 0.02)',
            }}
          >
            Works natively inside the tools you already use, including Revit, Rhino, ArchiCAD and SketchUp.
          </p>
        </div>
      </div>
    </section>
  );
}
