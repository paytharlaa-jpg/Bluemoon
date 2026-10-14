'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * ArchitecturalSkylineWaveBackground Component
 * 
 * Replaces circular astrolabe/rings with:
 * 1. Blueprint Architectural Skyline (skyscrapers, wireframe towers, diagrid facades, spires, beacons)
 * 2. Multi-layered Harmonic Kinetic Waves (continuous undulating topographic sine ribbons)
 * 3. CAD Elevation Datum Lines & Traveling Laser Scan Pulses
 * 
 * Strictly adheres to approved BlueMoon Corporate Branding:
 * - Primary Blue: #26366F
 * - Sky Blue: #12A4DC
 * - Red Accent: #D2143A
 * - White: #FFFFFF
 * Zero circular rings or unapproved colors.
 */
export default function ArchitecturalSkylineWaveBackground({
  mousePos = { x: 0, y: 0 },
  activeCollectionName = 'COMMERCIALS',
  activeRoman = 'I',
}) {
  // Pre-configured architectural tower coordinates across the 100vw panorama
  const towers = useMemo(() => [
    { id: 't1', left: '3%', width: 74, height: 260, type: 'stepped', floors: 14, beacon: '#12A4DC', label: 'SECTOR α' },
    { id: 't2', left: '10%', width: 92, height: 380, type: 'diagrid', floors: 22, beacon: '#D2143A', label: 'TOWER 01' },
    { id: 't3', left: '18%', width: 80, height: 290, type: 'mullion', floors: 16, beacon: '#12A4DC', label: 'RESIDENCES' },
    { id: 't4', left: '26%', width: 112, height: 440, type: 'spire', floors: 28, beacon: '#12A4DC', label: 'BLUE CORE' },
    { id: 't5', left: '36%', width: 86, height: 320, type: 'stepped', floors: 18, beacon: '#D2143A', label: 'FINANCIAL' },
    { id: 't6', left: '44%', width: 124, height: 410, type: 'diagrid', floors: 26, beacon: '#12A4DC', label: 'SOVEREIGN' },
    { id: 't7', left: '55%', width: 88, height: 300, type: 'mullion', floors: 18, beacon: '#12A4DC', label: 'CORRIDOR' },
    { id: 't8', left: '64%', width: 118, height: 460, type: 'spire', floors: 30, beacon: '#D2143A', label: 'TOWER 05' },
    { id: 't9', left: '74%', width: 84, height: 330, type: 'stepped', floors: 20, beacon: '#12A4DC', label: 'EXCHANGE' },
    { id: 't10', left: '82%', width: 98, height: 390, type: 'diagrid', floors: 24, beacon: '#12A4DC', label: 'CITADEL' },
    { id: 't11', left: '91%', width: 76, height: 270, type: 'mullion', floors: 15, beacon: '#D2143A', label: 'EAST PEAK' },
  ], []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* ── 1. Soft Atmospheric Radiance (Sky Blue & Primary Blue) ── */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '85vw',
          height: '420px',
          background: 'linear-gradient(180deg, rgba(18, 164, 220, 0.07) 0%, rgba(38, 54, 111, 0.03) 60%, transparent 100%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ── 2. CAD Drafting Background Grid ── */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.65,
        }}
      >
        <defs>
          <pattern id="archSkylineGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="rgba(38, 54, 111, 0.04)"
              strokeWidth="0.8"
            />
            {/* Fine coordinate tick */}
            <path
              d="M 24 22 L 24 26 M 22 24 L 26 24"
              fill="none"
              stroke="rgba(18, 164, 220, 0.14)"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#archSkylineGrid)" />
      </svg>

      {/* ── 3. Horizontal Elevation Datum Lines (Rectilinear architectural heights) ── */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Datum Line +480m (Apex) */}
        <div
          style={{
            position: 'absolute',
            top: '28%',
            left: 0,
            right: 0,
            height: '1px',
            borderTop: '1px dashed rgba(18, 164, 220, 0.22)',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 3vw',
          }}
        >
          <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-heading)', color: 'rgba(18, 164, 220, 0.55)', letterSpacing: '1.5px', marginTop: '-9px' }}>
            DATUM +480M // APEX CANOPY
          </span>
          <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-heading)', color: 'rgba(38, 54, 111, 0.35)', letterSpacing: '1.5px', marginTop: '-9px' }}>
            ZONE A-1
          </span>
        </div>

        {/* Datum Line +320m (Mid-Rise) */}
        <div
          style={{
            position: 'absolute',
            top: '44%',
            left: 0,
            right: 0,
            height: '1px',
            borderTop: '1px solid rgba(38, 54, 111, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 3vw',
          }}
        >
          <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-heading)', color: 'rgba(38, 54, 111, 0.45)', letterSpacing: '1.5px', marginTop: '-9px' }}>
            DATUM +320M // COMMERCIAL SKYLINE
          </span>
          <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-heading)', color: 'rgba(18, 164, 220, 0.45)', letterSpacing: '1.5px', marginTop: '-9px' }}>
            SECTOR CORRIDOR
          </span>
        </div>

        {/* Datum Line +160m (Podium) */}
        <div
          style={{
            position: 'absolute',
            top: '64%',
            left: 0,
            right: 0,
            height: '1px',
            borderTop: '1px dashed rgba(18, 164, 220, 0.16)',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 3vw',
          }}
        >
          <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-heading)', color: 'rgba(38, 54, 111, 0.35)', letterSpacing: '1.5px', marginTop: '-9px' }}>
            DATUM +160M // RESIDENTIAL PODIUM
          </span>
          <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-heading)', color: 'rgba(38, 54, 111, 0.35)', letterSpacing: '1.5px', marginTop: '-9px' }}>
            GRADE ELEVATION
          </span>
        </div>
      </div>

      {/* ── 4. Architectural Wireframe Skyline Towers (Background Buildings) ── */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '12%',
          left: 0,
          right: 0,
          height: '520px',
          zIndex: 1,
        }}
        animate={{
          x: mousePos.x * -18,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 60 }}
      >
        {towers.map((tower) => (
          <div
            key={tower.id}
            style={{
              position: 'absolute',
              bottom: 0,
              left: tower.left,
              width: `${tower.width}px`,
              height: `${tower.height}px`,
              borderLeft: '1px solid rgba(18, 164, 220, 0.28)',
              borderRight: '1px solid rgba(18, 164, 220, 0.28)',
              borderTop: '1.5px solid rgba(38, 54, 111, 0.4)',
              backgroundColor: 'rgba(255, 255, 255, 0.55)',
              boxShadow: '0 -4px 20px rgba(38, 54, 111, 0.03)',
            }}
          >
            {/* Rooftop Spire Mast with Beacon Dot */}
            <div
              style={{
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '1px',
                height: tower.type === 'spire' ? '48px' : '20px',
                backgroundColor: 'rgba(18, 164, 220, 0.5)',
              }}
            >
              <motion.div
                animate={{ opacity: [1, 0.2, 1], scale: [1, 1.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '-4px',
                  left: '-2px',
                  width: '5px',
                  height: '5px',
                  borderRadius: '1px',
                  backgroundColor: tower.beacon,
                  boxShadow: `0 0 8px ${tower.beacon}`,
                }}
              />
            </div>

            {/* Architectural Building Facade Patterns (Diagrid, Mullion, Stepped) */}
            {tower.type === 'diagrid' && (
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.22 }}>
                <line x1="0" y1="0" x2={tower.width} y2={tower.height} stroke="#12A4DC" strokeWidth="0.8" />
                <line x1={tower.width} y1="0" x2="0" y2={tower.height} stroke="#12A4DC" strokeWidth="0.8" />
                <line x1="0" y1={tower.height / 2} x2={tower.width} y2={tower.height} stroke="#12A4DC" strokeWidth="0.8" />
                <line x1={tower.width} y1={tower.height / 2} x2="0" y2={tower.height} stroke="#12A4DC" strokeWidth="0.8" />
              </svg>
            )}

            {tower.type === 'mullion' && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  opacity: 0.2,
                }}
              >
                <div style={{ width: '1px', height: '100%', backgroundColor: '#26366F' }} />
                <div style={{ width: '1px', height: '100%', backgroundColor: '#12A4DC' }} />
                <div style={{ width: '1px', height: '100%', backgroundColor: '#26366F' }} />
              </div>
            )}

            {/* Horizontal Floor Plates */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '8px 0',
                opacity: 0.28,
              }}
            >
              {Array.from({ length: Math.min(tower.floors, 18) }).map((_, fIdx) => (
                <div
                  key={fIdx}
                  style={{
                    width: '100%',
                    height: '1px',
                    backgroundColor: fIdx % 4 === 0 ? 'rgba(38, 54, 111, 0.45)' : 'rgba(18, 164, 220, 0.25)',
                  }}
                />
              ))}
            </div>

            {/* Tower ID Badge on Facade */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '0.52rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                letterSpacing: '1px',
                color: 'rgba(38, 54, 111, 0.55)',
                whiteSpace: 'nowrap',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                padding: '1px 4px',
                borderRadius: '2px',
                border: '0.8px solid rgba(18, 164, 220, 0.25)',
              }}
            >
              {tower.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* ── 5. Continuous Architectural Lidar Scanning Beam (Sweeping Vertical Laser) ── */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          bottom: '8%',
          width: '2px',
          background: 'linear-gradient(180deg, transparent, #12A4DC 20%, #26366F 80%, transparent)',
          boxShadow: '0 0 16px rgba(18, 164, 220, 0.75), 0 0 35px rgba(18, 164, 220, 0.35)',
          zIndex: 2,
        }}
        animate={{
          left: ['-5vw', '105vw'],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* ── 6. Multi-Layer Harmonic Topographic & Sine Waves ── */}
      {/* Wave Layer 1: Wide primary ambient undulation wave */}
      <div
        style={{
          position: 'absolute',
          bottom: '4%',
          left: 0,
          right: 0,
          height: '240px',
          overflow: 'hidden',
          zIndex: 3,
        }}
      >
        <motion.svg
          viewBox="0 0 2880 240"
          fill="none"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '200%',
            height: '100%',
          }}
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <defs>
            <linearGradient id="primaryWaveFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#12A4DC" stopOpacity="0.08" />
              <stop offset="60%" stopColor="#26366F" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,120 Q360,30 720,110 T1440,100 Q1800,40 2160,110 T2880,100 L2880,240 L0,240 Z"
            fill="url(#primaryWaveFill)"
          />
          <path
            d="M0,120 Q360,30 720,110 T1440,100 Q1800,40 2160,110 T2880,100"
            stroke="rgba(18, 164, 220, 0.38)"
            strokeWidth="1.6"
          />
        </motion.svg>
      </div>

      {/* Wave Layer 2: Secondary Counter-Flowing Sky Blue Luminous Ribbon */}
      <div
        style={{
          position: 'absolute',
          bottom: '2%',
          left: 0,
          right: 0,
          height: '200px',
          overflow: 'hidden',
          zIndex: 4,
        }}
      >
        <motion.svg
          viewBox="0 0 2880 200"
          fill="none"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '200%',
            height: '100%',
          }}
          animate={{
            x: ['-50%', '0%'],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <defs>
            <linearGradient id="secondaryWaveFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#26366F" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,80 Q360,150 720,85 T1440,90 Q1800,160 2160,85 T2880,90 L2880,200 L0,200 Z"
            fill="url(#secondaryWaveFill)"
          />
          <path
            d="M0,80 Q360,150 720,85 T1440,90 Q1800,160 2160,85 T2880,90"
            stroke="rgba(38, 54, 111, 0.28)"
            strokeWidth="1.4"
          />
          {/* Dashed Secondary Harmonic Wave Contour */}
          <path
            d="M0,105 Q360,175 720,110 T1440,115 Q1800,185 2160,110 T2880,115"
            stroke="rgba(18, 164, 220, 0.3)"
            strokeWidth="1.2"
            strokeDasharray="6 8"
          />
        </motion.svg>
      </div>

      {/* Wave Layer 3: High-Frequency Surface Crest Wave with Red Accent Telemetry */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '140px',
          overflow: 'hidden',
          zIndex: 5,
        }}
      >
        <motion.svg
          viewBox="0 0 2880 140"
          fill="none"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '200%',
            height: '100%',
          }}
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <path
            d="M0,60 Q240,20 480,55 T960,50 Q1200,15 1440,55 T1920,50 Q2160,15 2400,55 T2880,50"
            stroke="rgba(18, 164, 220, 0.45)"
            strokeWidth="1.8"
          />
          <path
            d="M0,75 Q240,35 480,70 T960,65 Q1200,30 1440,70 T1920,65 Q2160,30 2400,70 T2880,65"
            stroke="rgba(38, 54, 111, 0.2)"
            strokeWidth="1"
          />
        </motion.svg>
      </div>

      {/* ── 7. Corner Architectural Telemetry Framing (Rectilinear Badges) ── */}
      {/* Top-Left Telemetry Bracket */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          left: '4%',
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
          fontFamily: 'var(--font-heading)',
          fontSize: '0.64rem',
          letterSpacing: '1.5px',
          color: 'rgba(38, 54, 111, 0.45)',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '6px', height: '6px', backgroundColor: '#D2143A' }} />
          <span style={{ fontWeight: 700, color: '#26366F' }}>BLUEMOON SKYLINE MATRIX</span>
        </div>
        <span>SECTOR: TELANGANA CAPITAL ZONE</span>
        <span style={{ color: '#12A4DC' }}>STATUS: LIVE // VECTOR WAVE ACTIVE</span>
      </div>

      {/* Top-Right Telemetry Bracket */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          right: '4%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '3px',
          fontFamily: 'var(--font-heading)',
          fontSize: '0.64rem',
          letterSpacing: '1.5px',
          color: 'rgba(38, 54, 111, 0.45)',
          zIndex: 10,
          textAlign: 'right',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>FOCUS: [{activeRoman}] {activeCollectionName}</span>
          <span style={{ width: '6px', height: '6px', backgroundColor: '#12A4DC' }} />
        </div>
        <span>ARCHITECTURAL DOSSIER CATALOG</span>
        <span style={{ color: '#26366F', fontWeight: 700 }}>ELEVATION: 540M // SOVEREIGN HORIZON</span>
      </div>

      {/* Bottom Ground Blend (Pure White Fade to merge seamlessly with page) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'linear-gradient(to top, #FFFFFF 0%, rgba(255, 255, 255, 0.9) 50%, transparent 100%)',
          zIndex: 6,
        }}
      />
    </div>
  );
}
