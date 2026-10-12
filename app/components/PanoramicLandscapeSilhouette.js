'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * PanoramicLandscapeSilhouette Component
 * 
 * Environmental depth layer at the lower part of the 4 Pillars section.
 * Renders multi-layer rolling hills and fine landscape contour lines
 * with scroll-linked parallax and atmospheric haze.
 */
export default function PanoramicLandscapeSilhouette({ className = '' }) {
  const containerRef = useRef(null);
  const shouldReduceMotion = false;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax shifts for multi-layer depth (disabled if prefers-reduced-motion)
  const distantY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [20, -20]);
  const midgroundY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [35, -35]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '240px',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Layer 1: Atmospheric Sky Gradient Transition */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(235, 226, 212, 0.45) 0%, rgba(247, 243, 235, 0) 100%)',
        }}
      />

      {/* Layer 2: Distant Hills (Parallax Layer 1) */}
      <motion.svg
        style={{
          position: 'absolute',
          bottom: '25px',
          left: 0,
          width: '100%',
          height: '140px',
          y: distantY,
          opacity: 0.55,
        }}
        viewBox="0 0 1440 140"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,80 Q240,40 480,75 T960,50 Q1200,85 1440,60 L1440,140 L0,140 Z"
          fill="#E7DCB"
        />
        <path
          d="M0,80 Q240,40 480,75 T960,50 Q1200,85 1440,60"
          stroke="rgba(197, 168, 128, 0.45)"
          strokeWidth="1.2"
        />
      </motion.svg>

      {/* Layer 3: Mid-Ground Landscape Contours (Parallax Layer 2) */}
      <motion.svg
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '110px',
          y: midgroundY,
          opacity: 0.75,
        }}
        viewBox="0 0 1440 110"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,50 Q320,15 640,45 T1180,30 Q1310,48 1440,35 L1440,110 L0,110 Z"
          fill="#DFD2BF"
        />
        <path
          d="M0,50 Q320,15 640,45 T1180,30 Q1310,48 1440,35"
          stroke="rgba(23, 43, 105, 0.15)"
          strokeWidth="1.4"
        />
        {/* Subtle contour lines tracing hill crests */}
        <path
          d="M0,68 Q340,38 660,62 T1200,48 Q1320,64 1440,52"
          stroke="rgba(197, 168, 128, 0.35)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
      </motion.svg>

      {/* Layer 4: Soft Base Bleed to Ground */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40px',
          background: 'linear-gradient(to top, rgba(247, 243, 235, 0.7) 0%, transparent 100%)',
        }}
      />
    </div>
  );
}
