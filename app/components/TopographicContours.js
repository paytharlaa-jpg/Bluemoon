'use client';

import React from 'react';

/**
 * TopographicContours Component
 * 
 * Renders subtle architectural contour elevation lines, geodetic grid coordinates,
 * and delicate mapping crosshairs behind the 4 Pillars section.
 */
export default function TopographicContours({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {/* Delicate Architectural Contour Curves */}
      <svg
        style={{
          position: 'absolute',
          top: '-5%',
          left: '-5%',
          width: '110%',
          height: '110%',
          opacity: 0.85,
        }}
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="contourGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#12A4DC" stopOpacity="0.04" />
            <stop offset="50%" stopColor="#12A4DC" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#26366F" stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id="contourNavy" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#26366F" stopOpacity="0.02" />
            <stop offset="60%" stopColor="#26366F" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#12A4DC" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {/* Contour Level 1 */}
        <path
          d="M-50,220 C320,160 580,310 920,240 C1180,180 1350,300 1520,260"
          stroke="url(#contourGold)"
          strokeWidth="1.2"
          strokeDasharray="4 8"
        />

        {/* Contour Level 2 */}
        <path
          d="M-80,380 C260,320 540,460 880,370 C1200,290 1380,440 1550,390"
          stroke="url(#contourNavy)"
          strokeWidth="1.4"
        />

        {/* Contour Level 3 */}
        <path
          d="M-40,540 C340,480 620,620 980,510 C1240,420 1420,580 1540,530"
          stroke="url(#contourGold)"
          strokeWidth="1.2"
        />

        {/* Contour Level 4 */}
        <path
          d="M-60,700 C280,640 590,780 940,680 C1190,610 1370,740 1560,710"
          stroke="url(#contourNavy)"
          strokeWidth="1.2"
          strokeDasharray="6 10"
        />

        {/* Contour Level 5 */}
        <path
          d="M-30,820 C380,770 680,880 1050,790 C1280,720 1440,840 1580,800"
          stroke="url(#contourGold)"
          strokeWidth="1"
        />

        {/* Geodetic Grid Crosshairs */}
        <g stroke="rgba(18, 164, 220, 0.35)" strokeWidth="1">
          {/* Crosshair 1 (Top-Left) */}
          <line x1="140" y1="120" x2="160" y2="120" />
          <line x1="150" y1="110" x2="150" y2="130" />

          {/* Crosshair 2 (Mid-Right) */}
          <line x1="1280" y1="460" x2="1300" y2="460" />
          <line x1="1290" y1="450" x2="1290" y2="470" />

          {/* Crosshair 3 (Bottom-Center) */}
          <line x1="710" y1="780" x2="730" y2="780" />
          <line x1="720" y1="770" x2="720" y2="790" />
        </g>
      </svg>

      {/* Editorial Cadastre Coordinates & Telemetry */}
      <div
        style={{
          position: 'absolute',
          top: '35px',
          left: '40px',
          fontFamily: 'monospace',
          fontSize: '0.68rem',
          letterSpacing: '2px',
          color: 'rgba(38, 54, 111, 0.40)',
          textTransform: 'uppercase',
        }}
      >
        <span>GEODETIC SURVEY REF // BM-SOV-4P</span>
        <br />
        <span style={{ color: 'rgba(18, 164, 220, 0.75)' }}>17°23&apos;44&quot;N 78°28&apos;29&quot;E · ELEV 542M MSL</span>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '30px',
          right: '40px',
          fontFamily: 'monospace',
          fontSize: '0.66rem',
          letterSpacing: '2px',
          color: 'rgba(38, 54, 111, 0.35)',
          textAlign: 'right',
          textTransform: 'uppercase',
        }}
      >
        <span>HYDERABAD SOVEREIGN LAND RESERVES</span>
        <br />
        <span style={{ color: 'rgba(18, 164, 220, 0.65)' }}>GLOBAL CAPITAL CORRIDOR // VERIFIED TITLE</span>
      </div>
    </div>
  );
}
