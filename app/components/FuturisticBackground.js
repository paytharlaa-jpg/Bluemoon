'use client';

import { motion } from 'framer-motion';

/**
 * 3D Wireframe Floating Box / Cube Hologram
 * Renders an interactive 6-faced architectural wireframe cube in 3D perspective
 */
function WireframeCube({ size = 60, x = 0, y = 0, duration = 20, delay = 0, color = '#12A4DC', opacity = 0.35, mousePos = { x: 0, y: 0 }, parallaxFactor = 15 }) {
  const half = size / 2;

  const faces = [
    { transform: `translateZ(${half}px)` },
    { transform: `rotateY(180deg) translateZ(${half}px)` },
    { transform: `rotateY(-90deg) translateZ(${half}px)` },
    { transform: `rotateY(90deg) translateZ(${half}px)` },
    { transform: `rotateX(90deg) translateZ(${half}px)` },
    { transform: `rotateX(-90deg) translateZ(${half}px)` },
  ];

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: `${size}px`,
        height: `${size}px`,
        perspective: '800px',
        pointerEvents: 'none',
        zIndex: 2,
      }}
      animate={{
        x: mousePos.x * parallaxFactor,
        y: mousePos.y * parallaxFactor,
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 80 }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
          rotateZ: [0, 180, 0],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {faces.map((face, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              border: `1px solid ${color}`,
              backgroundColor: 'rgba(18, 164, 220, 0.015)',
              transform: face.transform,
              opacity,
              boxShadow: `inset 0 0 12px rgba(18, 164, 220, 0.04)`,
            }}
          >
            {/* Corner Vertex Dots */}
            <span
              style={{
                position: 'absolute',
                top: '-2px',
                left: '-2px',
                width: '4px',
                height: '4px',
                backgroundColor: color,
                borderRadius: '50%',
                opacity: 0.8,
              }}
            />
            <span
              style={{
                position: 'absolute',
                bottom: '-2px',
                right: '-2px',
                width: '4px',
                height: '4px',
                backgroundColor: color,
                borderRadius: '50%',
                opacity: 0.8,
              }}
            />
            {/* Fine architectural diagonal brace */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg, transparent calc(50% - 0.5px), ${color} calc(50% - 0.5px), ${color} calc(50% + 0.5px), transparent calc(50% + 0.5px))`,
                opacity: 0.25,
              }}
            />
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/**
 * Futuristic Motion Graphics Animated Background
 * - Boxed CAD Drafting Grid
 * - Traveling Laser Pulses along axes
 * - Floating 3D Wireframe Cubes
 * - Architectural HUD Telemetry and Reticles
 * - Pure White Canvas with #26366F, #12A4DC, #D2143A brand elements
 */
export default function FuturisticBackground({ mousePos = { x: 0, y: 0 } }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* ── 1. Ambient Radial Glows (Sky Blue & Primary Blue) ── */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: '55vw',
          height: '55vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(18, 164, 220, 0.06) 0%, rgba(38, 54, 111, 0.02) 45%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '10%',
          width: '45vw',
          height: '45vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(38, 54, 111, 0.04) 0%, rgba(18, 164, 220, 0.02) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* ── 2. SVG Boxed Architectural Drafting Grid ── */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.85,
        }}
      >
        <defs>
          {/* Main 64px Grid Cell */}
          <pattern id="cadGrid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path
              d="M 64 0 L 0 0 0 64"
              fill="none"
              stroke="rgba(38, 54, 111, 0.06)"
              strokeWidth="1"
            />
            {/* Center crosshair tick (+) inside every cell */}
            <path
              d="M 32 30 L 32 34 M 30 32 L 34 32"
              fill="none"
              stroke="rgba(18, 164, 220, 0.22)"
              strokeWidth="1"
            />
          </pattern>

          {/* Sub-grid 256px Major Section Box with Corner Dots */}
          <pattern id="cadMajorGrid" width="256" height="256" patternUnits="userSpaceOnUse">
            <rect width="256" height="256" fill="url(#cadGrid)" />
            <path
              d="M 256 0 L 0 0 0 256"
              fill="none"
              stroke="rgba(18, 164, 220, 0.16)"
              strokeWidth="1.2"
            />
            {/* Major Corner Crosses */}
            <circle cx="0" cy="0" r="2" fill="#12A4DC" opacity="0.3" />
            <circle cx="256" cy="0" r="2" fill="#12A4DC" opacity="0.3" />
            <circle cx="0" cy="256" r="2" fill="#12A4DC" opacity="0.3" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#cadMajorGrid)" />
      </svg>

      {/* ── 3. Kinetic Traveling Laser Pulses along Grid Lines ── */}
      {/* Laser 1: Horizontal Sky Blue beam shooting left-to-right at Y=22% */}
      <motion.div
        style={{
          position: 'absolute',
          top: '22%',
          left: 0,
          height: '1.5px',
          width: '160px',
          background: 'linear-gradient(90deg, transparent, #12A4DC 50%, #26366F 90%, transparent)',
          boxShadow: '0 0 10px rgba(18, 164, 220, 0.6)',
          zIndex: 3,
        }}
        animate={{
          x: ['-200px', '110vw'],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 2,
        }}
      />

      {/* Laser 2: Horizontal Navy beam shooting right-to-left at Y=68% */}
      <motion.div
        style={{
          position: 'absolute',
          top: '68%',
          right: 0,
          height: '1.5px',
          width: '220px',
          background: 'linear-gradient(270deg, transparent, #12A4DC 40%, #26366F 80%, transparent)',
          boxShadow: '0 0 8px rgba(38, 54, 111, 0.4)',
          zIndex: 3,
        }}
        animate={{
          x: ['200px', '-110vw'],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.5,
          repeatDelay: 3,
        }}
      />

      {/* Laser 3: Vertical Sky Blue beam shooting top-to-bottom at X=24% */}
      <motion.div
        style={{
          position: 'absolute',
          left: '24%',
          top: 0,
          width: '1.5px',
          height: '180px',
          background: 'linear-gradient(180deg, transparent, #12A4DC 60%, transparent)',
          boxShadow: '0 0 8px rgba(18, 164, 220, 0.5)',
          zIndex: 3,
        }}
        animate={{
          y: ['-200px', '110vh'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
          repeatDelay: 2,
        }}
      />

      {/* Laser 4: Vertical Red Accent beam shooting bottom-to-top at X=76% */}
      <motion.div
        style={{
          position: 'absolute',
          left: '76%',
          bottom: 0,
          width: '1.5px',
          height: '140px',
          background: 'linear-gradient(0deg, transparent, #D2143A 60%, transparent)',
          boxShadow: '0 0 8px rgba(210, 20, 58, 0.45)',
          zIndex: 3,
        }}
        animate={{
          y: ['200px', '-110vh'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
          repeatDelay: 3.5,
        }}
      />

      {/* ── 4. Floating 3D Wireframe Isometric Cubes ("Boxed Futuristic Look") ── */}
      {/* Cube 1: Upper-Left floating matrix box */}
      <WireframeCube
        size={68}
        x="7%"
        y="14%"
        duration={22}
        delay={0}
        color="#12A4DC"
        opacity={0.38}
        mousePos={mousePos}
        parallaxFactor={-22}
      />

      {/* Cube 2: Center-Bottom floating matrix box */}
      <WireframeCube
        size={84}
        x="47%"
        y="74%"
        duration={26}
        delay={3}
        color="#26366F"
        opacity={0.28}
        mousePos={mousePos}
        parallaxFactor={18}
      />

      {/* Cube 3: Upper-Right background satellite box */}
      <WireframeCube
        size={52}
        x="88%"
        y="12%"
        duration={18}
        delay={1.5}
        color="#12A4DC"
        opacity={0.32}
        mousePos={mousePos}
        parallaxFactor={-14}
      />

      {/* Cube 4: Mid-Left lower satellite box */}
      <WireframeCube
        size={46}
        x="15%"
        y="78%"
        duration={20}
        delay={4}
        color="#D2143A"
        opacity={0.24}
        mousePos={mousePos}
        parallaxFactor={16}
      />

      {/* Cube 5: Subtle far-right anchor box */}
      <WireframeCube
        size={58}
        x="92%"
        y="62%"
        duration={24}
        delay={2}
        color="#26366F"
        opacity={0.22}
        mousePos={mousePos}
        parallaxFactor={-10}
      />

      {/* ── 5. Architectural Compass Reticle / Radar Gauge in Upper-Right ── */}
      <motion.div
        style={{
          position: 'absolute',
          top: '3.5rem',
          right: '7%',
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          border: '1px dashed rgba(18, 164, 220, 0.28)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <div
          style={{
            width: '66px',
            height: '66px',
            borderRadius: '50%',
            border: '1px solid rgba(38, 54, 111, 0.15)',
            position: 'relative',
          }}
        >
          {/* North Axis Marker */}
          <div
            style={{
              position: 'absolute',
              top: '-4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              height: '8px',
              backgroundColor: '#D2143A',
            }}
          />
          {/* East Axis Marker */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: '-4px',
              transform: 'translateY(-50%)',
              width: '8px',
              height: '2px',
              backgroundColor: '#12A4DC',
            }}
          />
        </div>
      </motion.div>

      {/* ── 6. Futuristic Telemetry Data & Corner Target Brackets ── */}
      {/* Top-Left Corner Bracket with System Telemetry */}
      <div
        style={{
          position: 'absolute',
          top: '3rem',
          left: '3%',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          fontFamily: 'var(--font-heading)',
          fontSize: '0.62rem',
          letterSpacing: '2px',
          color: 'rgba(38, 54, 111, 0.42)',
          zIndex: 3,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#D2143A',
              display: 'inline-block',
            }}
          />
          <span style={{ color: '#26366F', fontWeight: 700 }}>BLUEMOON // CORE 02</span>
        </div>
        <span>CANOPY STRUCTURAL MATRIX</span>
        <span style={{ color: '#12A4DC' }}>STATUS: ONLINE // 60 FPS</span>
      </div>

      {/* Top-Right Coordinates HUD */}
      <div
        style={{
          position: 'absolute',
          top: '3rem',
          right: '15%',
          fontFamily: 'var(--font-heading)',
          fontSize: '0.62rem',
          letterSpacing: '2px',
          color: 'rgba(38, 54, 111, 0.35)',
          zIndex: 3,
          textAlign: 'right',
        }}
      >
        <div>LAT 44.8125° N</div>
        <div>LON 20.4612° E</div>
        <div style={{ color: '#12A4DC' }}>ELEV +142.8m</div>
      </div>

      {/* Bottom-Left Drafting Ruler & Grid Scale */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '18%',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontFamily: 'var(--font-heading)',
          fontSize: '0.6rem',
          letterSpacing: '2px',
          color: 'rgba(38, 54, 111, 0.35)',
          zIndex: 3,
        }}
      >
        <span>GRID: 64px [1:500]</span>
        <span style={{ width: '30px', height: '1px', backgroundColor: 'rgba(38, 54, 111, 0.2)' }} />
        <span style={{ color: '#12A4DC' }}>DATUM: WGS84</span>
      </div>

      {/* Bottom-Right Corner Target Brackets */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          right: '3%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '3px',
          fontFamily: 'var(--font-heading)',
          fontSize: '0.62rem',
          letterSpacing: '2px',
          color: 'rgba(38, 54, 111, 0.38)',
          zIndex: 3,
        }}
      >
        <span style={{ color: '#26366F', fontWeight: 700 }}>[ AXIS REF: 1440 × 900 ]</span>
        <span style={{ color: '#12A4DC' }}>SEC 02 // DOSSIER ACTIVE</span>
      </div>
    </div>
  );
}
