'use client';

/**
 * ExplodedPlotView Component — Earthy & Natural 3D Architectural Edition
 * Design Direction: Light Warm Ivory Theme | 3D Isometric Folders | Cinematic Spring Transitions
 * Strict Three-State Interaction:
 * STATE 1: All 6 dimensional folders in a balanced horizontal row on wide screens.
 * STATE 2: Clicked folder opens with 3 small floating preview cards (Left image, Center content, Right image).
 * STATE 3: Full-screen 3-column detail presentation (Left image, Center complete dossier, Right image).
 */

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileCheck2,
  Droplets,
  Layers,
  Zap,
  Compass,
  Sun,
  X,
  CheckCircle2,
  ArrowRight,
  Maximize2,
  Sparkles,
} from 'lucide-react';
import { InteractiveFolder } from './InteractiveFolder';
import ParticleWaveBackground from './ParticleWaveBackground';

const BRAND = {
  primaryBlue: '#26366F',
  skyBlue: '#12A4DC',
  premiumRed: '#D2143A',
  warmIvory: '#F7F3EB',
  ivoryParchment: '#FAF8F5',
  warmStone: '#6E6254',
  warmStoneBorder: '#E5DFD3',
  white: '#FFFFFF',
};

// ─── Source of Truth: 6 Architectural Blueprint Layers ─────────────────────────
const PLOT_LAYERS = [
  {
    id: 'layer-bedrock',
    index: 1,
    folderLabel: 'BEDROCK',
    color: '#D97706', // Amber Gold
    name: 'HMDA & RERA CLEAR FREEHOLD TITLE',
    elevationLabel: 'FOUNDATION BEDROCK // LEGAL CORE',
    depth: 'FOUNDATION BEDROCK',
    status: 'ABSOLUTE TITLE PURITY',
    icon: FileCheck2,
    leftImage: '/plots.jpg',
    rightImage: '/lands.jpg',
    leftCaption: 'BLUEPRINT CAD-DEMARCATION // 17°26\'44"N 78°22\'18"E // HMDA SANCTIONED BOUNDARY',
    rightCaption: 'SOVEREIGN REVENUE SEARCH // HIGH COURT VERIFIED // SPOT REGISTRATION',
    desc: '100% unencumbered, clear freehold ownership. 30-year unbroken chain search report verified by Senior High Court Advocates. Ready for immediate spot registration at the sub-registrar office.',
    metrics: [
      { label: 'STATUTORY SANCTION', value: 'HMDA / RERA', desc: '100% Sanctioned Master Layout' },
      { label: 'TITLE LITIGATION RISK', value: '0.00%', desc: '30-Year High Court Certified Search' },
      { label: 'REGISTRATION SPEED', value: 'IMMEDIATE', desc: 'Spot Sub-Registrar Stamped' },
      { label: 'BANK LOAN GRADE', value: 'AAA GRADE', desc: 'SBI, HDFC, ICICI Approved (75%)' },
    ],
    guarantees: [
      '30-Year unbroken chain of ownership with clean digital revenue passbooks',
      'Immediate spot registration with precision GPS geo-coordinates stamped on deed',
      'Pre-approved by premier institutional banks for up to 75% plot financing',
    ],
  },
  {
    id: 'layer-aquifer',
    index: 2,
    folderLabel: 'AQUIFER',
    color: '#0284C7', // Sky Azure
    name: 'GROUNDWATER HYDROLOGY & RECHARGE',
    elevationLabel: '-18.0 METERS // SUBTERRANEAN AQUIFER',
    depth: '-18.0 METERS',
    status: 'WATER SECURITY',
    icon: Droplets,
    leftImage: '/plots.jpg',
    rightImage: '/lands.jpg',
    leftCaption: 'HYDROLOGY CORE // -18.0M SUBTERRANEAN STREAM // PERENNIAL RECHARGE',
    rightCaption: 'RAINWATER HARVESTING SHAFTS // 1.8M LITERS NET-POSITIVE ECOLOGICAL BALANCE',
    desc: 'Abundant natural subterranean perennial sweet water table. Deep ecological rainwater percolation pits engineered every 100 meters across the enclave to ensure self-sustaining water security.',
    metrics: [
      { label: 'WATER TABLE DEPTH', value: '45 - 60 FT', desc: 'Perennial Sweet Aquifer Table' },
      { label: 'POTABILITY INDEX', value: 'TDS 240 PPM', desc: 'Naturally Sweet Potable Water' },
      { label: 'HARVESTING PITS', value: 'EVERY 100M', desc: 'Deep Percolation Shafts' },
      { label: 'ANNUAL RECHARGE', value: '1.8M LITERS', desc: 'Net-Positive Ecological Water Balance' },
    ],
    guarantees: [
      'Natural subterranean sweet aquifer stream feeding round-the-year well water',
      'Scientific rainwater harvesting shafts replenishing the groundwater table',
      'Central overhead reservoir guaranteeing 24/7 hydrostatic tap pressure',
    ],
  },
  {
    id: 'layer-strata',
    index: 3,
    folderLabel: 'STRATA',
    color: '#10B981', // Emerald Green
    name: 'CERTIFIED LOAD-BEARING STRATA',
    elevationLabel: '-4.0 METERS // GEOTECHNICAL BED',
    depth: '-4.0 METERS',
    status: 'SOIL ENGINEERING',
    icon: Layers,
    leftImage: '/plots.jpg',
    rightImage: '/lands.jpg',
    leftCaption: 'GEOTECHNICAL CORE SAMPLES // 285 kN/m² HEAVY BEARING CAPACITY',
    rightCaption: 'VIRGIN RED GRAVEL LOAM // 98% PROCTOR DENSITY // ZERO SUBSIDENCE',
    desc: 'Laboratory-certified high-density virgin red gravel loam. Rigorously tested Safe Bearing Capacity (SBC) engineered for heavy multi-story luxury villas with zero settlement risk.',
    metrics: [
      { label: 'SAFE BEARING CAPACITY', value: '285 kN/m²', desc: 'Lab-Certified Heavy SBC' },
      { label: 'STRATUM PROFILE', value: 'RED LOAM', desc: 'Non-Alluvial Virgin High Ground' },
      { label: 'SETTLEMENT RISK', value: '0.00%', desc: 'Zero Subsidence & Zero Marshy Fill' },
      { label: 'COMPACTION INDEX', value: '98% PROCTOR', desc: 'Engineered Foundation Bed' },
    ],
    guarantees: [
      'Certified soil core test reports provided with every plot deed',
      'Virgin elevated land: Zero industrial waste, zero marshy backfilling',
      'Seismic Zone II compliance: Highest structural stability in the Deccan Plateau',
    ],
  },
  {
    id: 'layer-utilities',
    index: 4,
    folderLabel: 'UTILITIES',
    color: '#D2143A', // Palatial Crimson Red
    name: 'CONCEALED SMART UTILITY TRENCHES',
    elevationLabel: '-1.5 METERS // SUB-SURFACE MATRIX',
    depth: '-1.5 METERS',
    status: 'UNDERGROUND NETWORK',
    icon: Zap,
    leftImage: '/plots.jpg',
    rightImage: '/lands.jpg',
    leftCaption: 'UNDER-CURB RCC BOX DRAINS // 11KV ARMORED CABLING // CONCEALED GRID',
    rightCaption: 'DUAL FIBER OPTIC DUCTS // HDPE PRESSURIZED WATER FEEDER MATRIX',
    desc: '100% concealed underground utility matrix—zero dangling overhead cables, zero roadside open sewers, and pre-installed individual plot connection chambers for plug-and-play villa construction.',
    metrics: [
      { label: 'ELECTRICAL GRID', value: '11KV ARMORED', desc: 'Zero Overhead Cables (Concealed)' },
      { label: 'HIGH-SPEED TELECOM', value: 'DUAL DUCTS', desc: 'Pre-Laid Fiber To Every Boundary' },
      { label: 'WATER FEEDER', value: 'HDPE MATRIX', desc: 'Direct Potable High-Pressure Supply' },
      { label: 'STORMWATER CHANNELS', value: 'RCC BOX DRAINS', desc: 'Under-Curb Anti-Flood Channels' },
    ],
    guarantees: [
      '100% underground power transmission with armored distribution transformers',
      'High-density HDPE water pipelines pre-tapped directly into each individual plot',
      'Under-curb concealed RCC stormwater drains preventing road waterlogging',
    ],
  },
  {
    id: 'layer-surface',
    index: 5,
    folderLabel: 'SURFACE',
    color: '#26366F', // Sovereign Navy Blue
    name: 'SURFACE INFRASTRUCTURE & AVENUES',
    elevationLabel: '0.0M SURFACE // TERRAIN LEVEL',
    depth: '0.0M SURFACE',
    status: 'GATED MASTER-PLANNED',
    icon: Compass,
    leftImage: '/plots.jpg',
    rightImage: '/lands.jpg',
    leftCaption: '40-60 FT HEAVY-DUTY BITUMEN AVENUES // POLISHED GRANITE KERBSTONES',
    rightCaption: '8 FT COMPOUND PERIMETER WALL // SOLAR FENCING // RFID BIOMETRIC ENTRY',
    desc: 'Precision-graded 40–60 ft heavy bitumen/concrete avenues, polished granite kerbs, pedestrian walkways, RFID biometric perimeter fencing, and intelligent automated streetscaping.',
    metrics: [
      { label: 'AVENUE WIDTH', value: '40 - 60 FT', desc: 'Heavy-Duty Concrete & Bitumen Boulevards' },
      { label: 'PLOT BOUNDARY', value: 'PRE-CAST RCC', desc: 'Permanent Cadastral Demarcation' },
      { label: 'SECURITY PERIMETER', value: '8 FT WALL', desc: 'Solar Fencing + RFID Entry' },
      { label: 'SIDEWALK INFRA', value: 'GRANITE KERB', desc: 'Dedicated Pedestrian Avenues' },
    ],
    guarantees: [
      '100% Cardinal Vastu alignment (East & North-facing prime orientations)',
      'Intelligent solar LED streetlamps with automated dusk-to-dawn telemetry',
      '24/7 monitored CCTV surveillance grid with automated number-plate recognition',
    ],
  },
  {
    id: 'layer-sky',
    index: 6,
    folderLabel: 'SOLAR SKY',
    color: '#F59E0B', // Solar Gold
    name: 'SOVEREIGN SKY & SOLAR RIGHTS',
    elevationLabel: '+15.0M ATMOSPHERE // ATMOSPHERIC CORRIDOR',
    depth: '+15.0M ATMOSPHERE',
    status: 'ELEVATION ZONING',
    icon: Sun,
    leftImage: '/plots.jpg',
    rightImage: '/lands.jpg',
    leftCaption: 'UNRESTRICTED VERTICAL SKY RIGHTS // ZERO HIGH-TENSION HAZARDS',
    rightCaption: 'YEAR-ROUND CLEAN SOLAR PV HARVEST // 38 AQI PRISTINE MICROCLIMATE',
    desc: 'Unrestricted vertical elevation rights, 100% unshaded year-round solar light absorption, pollution-free microclimate, and native tree plantation canopy cooling.',
    metrics: [
      { label: 'AIR QUALITY INDEX', value: '38 AQI', desc: 'Pristine Forest Green Zone' },
      { label: 'SOLAR EXPOSURE', value: '5.4 kWh/m²', desc: 'Year-Round Clean Solar Energy' },
      { label: 'ZONING CLEARANCE', value: 'G+3 FLOORS', desc: 'Unrestricted Freehold Vertical Rights' },
      { label: 'HT LINE HAZARD', value: '0.00% HAZARD', desc: 'Zero High-Tension Electromagnetic Lines' },
    ],
    guarantees: [
      'Unrestricted solar and natural daylight absorption rights for rooftop solar PV',
      'Zero overhead high-tension power cables or electromagnetic corridor hazards',
      'Avenue canopy microclimate cooling with native avenue tree plantations',
    ],
  },
];

export default function ExplodedPlotView() {
  // STATE MANAGEMENT (Strict 3-State Architecture)
  const [openFolderId, setOpenFolderId] = useState(null); // string | null (State 1 vs State 2)
  const [selectedCard, setSelectedCard] = useState(null); // 'left' | 'center' | 'right' | null
  const [isDetailOpen, setIsDetailOpen] = useState(false); // boolean (State 3 active)

  // Active layer object
  const activeLayer = PLOT_LAYERS.find((l) => l.id === openFolderId) || PLOT_LAYERS[0];

  // Keyboard navigation: Escape key closes State 3 -> State 2, or State 2 -> State 1
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isDetailOpen) {
          setIsDetailOpen(false); // Return from State 3 to State 2
        } else if (openFolderId !== null) {
          setOpenFolderId(null); // Return from State 2 to State 1
          setSelectedCard(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDetailOpen, openFolderId]);

  // Click on Folder in State 1 or State 2
  const handleFolderClick = (layerId) => {
    if (openFolderId === layerId) {
      // Toggle closed back to State 1
      setOpenFolderId(null);
      setSelectedCard(null);
      setIsDetailOpen(false);
    } else {
      // Transitions to State 2 for that layer
      setOpenFolderId(layerId);
      setSelectedCard(null);
      setIsDetailOpen(false);
    }
  };

  // Click on any of the 3 Small Cards in State 2 -> Transitions to State 3
  const handleCardClick = (cardIndex) => {
    const cardTypes = ['left', 'center', 'right'];
    const type = cardTypes[cardIndex] || 'center';
    setSelectedCard(type);
    setIsDetailOpen(true);
  };

  // Close State 3 -> Returns strictly to State 2 (keeps folder open with 3 cards)
  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  // Close State 2 -> Returns strictly to State 1
  const handleCloseFolder = () => {
    setOpenFolderId(null);
    setSelectedCard(null);
  };

  // ── Constructing the 3 Small Cards for a specific layer in State 2 ────────────
  const buildSmallCardsForLayer = (layer) => {
    // Card 0 (CARD 1): LEFT IMAGE CARD (Compact Preview: ~96px x 72px)
    const card0LeftImage = (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          backgroundColor: '#0F172A',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '5px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          borderRadius: '7px',
        }}
      >
        <Image
          src={layer.leftImage}
          alt={`${layer.folderLabel} CAD Blueprint`}
          fill
          sizes="120px"
          style={{ objectFit: 'cover', opacity: 0.82 }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              padding: '1px 4px',
              borderRadius: '3px',
              backgroundColor: 'rgba(0,0,0,0.75)',
              color: layer.color,
              fontFamily: 'monospace',
              fontSize: '6.5px',
              fontWeight: 800,
            }}
          >
            CAD
          </span>
          <span style={{ fontSize: '6px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.9)', fontWeight: 700 }}>
            {layer.depth}
          </span>
        </div>

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#FFFFFF' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '6.5px', fontWeight: 800, opacity: 0.95 }}>
            /plots.jpg
          </span>
          <Maximize2 size={8} style={{ color: layer.color }} />
        </div>
      </div>
    );

    // Card 1 (CARD 2): CENTER ABOUT CONTENT CARD (Compact Document Preview: ~114px x 82px)
    const card1CenterContent = (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '6px 7px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          borderRadius: '7px',
          userSelect: 'none',
        }}
      >
        {/* Top: Tier badge + Status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '3px' }}>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '6px',
              fontWeight: 800,
              padding: '1px 4px',
              borderRadius: '3px',
              backgroundColor: `${layer.color}15`,
              color: layer.color,
              letterSpacing: '0.4px',
            }}
          >
            TIER 0{layer.index}
          </span>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '6px',
              fontWeight: 700,
              color: '#64748B',
              textTransform: 'uppercase',
              maxWidth: '60px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {layer.status}
          </span>
        </div>

        {/* Center: Title strictly clamped */}
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '7.2px',
            fontWeight: 800,
            color: BRAND.primaryBlue,
            lineHeight: 1.25,
            textTransform: 'uppercase',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            maxHeight: '19px',
          }}
        >
          {layer.name}
        </div>

        {/* Bottom: Depth + Click to Expand */}
        <div
          style={{
            paddingTop: '3px',
            borderTop: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'monospace',
            fontSize: '6px',
          }}
        >
          <span
            style={{
              color: layer.color,
              fontWeight: 700,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '60px',
            }}
          >
            {layer.depth}
          </span>
          <span style={{ color: BRAND.primaryBlue, fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
            VIEW <ArrowRight size={6} />
          </span>
        </div>
      </div>
    );

    // Card 2 (CARD 3): RIGHT IMAGE CARD (Compact Preview: ~96px x 72px)
    const card2RightImage = (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          backgroundColor: '#0F172A',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '5px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          borderRadius: '7px',
        }}
      >
        <Image
          src={layer.rightImage}
          alt={`${layer.folderLabel} Territory`}
          fill
          sizes="120px"
          style={{ objectFit: 'cover', opacity: 0.82 }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              padding: '1px 4px',
              borderRadius: '3px',
              backgroundColor: 'rgba(0,0,0,0.75)',
              color: layer.color,
              fontFamily: 'monospace',
              fontSize: '6.5px',
              fontWeight: 800,
            }}
          >
            SURVEY
          </span>
          <span style={{ fontSize: '6px', fontFamily: 'monospace', color: '#34D399', fontWeight: 700 }}>
            CLEAR
          </span>
        </div>

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#FFFFFF' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '6.5px', fontWeight: 800, opacity: 0.95 }}>
            /lands.jpg
          </span>
          <Maximize2 size={8} style={{ color: layer.color }} />
        </div>
      </div>
    );

    return [card0LeftImage, card1CenterContent, card2RightImage];
  };

  return (
    <section
      id="exploded-plot-view"
      style={{
        position: 'relative',
        backgroundColor: BRAND.warmIvory,
        padding: '5.5rem 4vw 6.5rem 4vw',
        borderTop: `1px solid ${BRAND.warmStoneBorder}`,
        borderBottom: `1px solid ${BRAND.warmStoneBorder}`,
        overflow: 'hidden',
      }}
    >
      {/* ── Subtle Earthy Topographic & Contour Grid ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `
            radial-gradient(circle at 50% 12%, rgba(255, 255, 255, 0.85) 0%, rgba(247, 243, 235, 0.3) 65%, transparent 100%),
            linear-gradient(to right, rgba(165, 145, 120, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(165, 145, 120, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 42px 42px, 42px 42px',
          opacity: 0.8,
          zIndex: 0,
        }}
      />

      {/* ── 3D Dotted Particle Wave Motion Graphics (Inspired by Architectural Kinetic Wave) ── */}
      <ParticleWaveBackground
        dotColor="30, 41, 59"
        accentColor="38, 54, 111"
        dotCountX={90}
        dotCountY={36}
        speed={0.45}
        opacity={0.82}
        interactive={true}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* ── Section Header Entry Animation (Earthy & Natural Architectural Styling) ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.08,
              },
            },
          }}
          style={{ textAlign: 'center', marginBottom: '3.8rem' }}
        >
          {/* Eyebrow */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { type: 'spring', damping: 20, stiffness: 220 },
              },
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 16px',
              borderRadius: '30px',
              backgroundColor: 'rgba(110, 98, 84, 0.08)',
              border: '1px solid rgba(110, 98, 84, 0.15)',
              marginBottom: '14px',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: activeLayer.color,
                boxShadow: `0 0 8px ${activeLayer.color}80`,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.72rem',
                letterSpacing: '3.2px',
                color: BRAND.warmStone,
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              THE 6 LAYERS OF A PREMIUM PLOT
            </span>
          </motion.div>

          {/* Main Title in Classical Architectural Serif */}
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 24, filter: 'blur(5px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { type: 'spring', damping: 22, stiffness: 190 },
              },
            }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.3rem, 4.2vw, 3.6rem)',
              color: BRAND.primaryBlue,
              margin: '0 0 12px 0',
              lineHeight: 1.12,
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            Architectural Blueprint
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
              color: '#52493E',
              maxWidth: '680px',
              margin: '0 auto 8px auto',
              lineHeight: 1.5,
              fontWeight: 500,
            }}
          >
            Every layer is engineered for a stronger tomorrow.
          </motion.p>

          {/* Supporting Text */}
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 0.8,
                y: 0,
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.76rem',
              letterSpacing: '1.5px',
              color: 'rgba(110, 98, 84, 0.8)',
              textTransform: 'uppercase',
              fontStyle: 'italic',
            }}
          >
            More than land. It&apos;s a foundation for your dreams.
          </motion.span>
        </motion.div>

        {/* ── STATE 1 & STATE 2: SIX 3D ISOMETRIC FOLDERS (Staggered Entry Cascade on Scroll) ── */}
        <motion.div
          className="blueprint-folders-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.09,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {PLOT_LAYERS.map((layer) => {
            const isThisFolderOpen = openFolderId === layer.id;
            const smallCards = buildSmallCardsForLayer(layer);
            const LayerIcon = layer.icon;

            return (
              <motion.div
                key={layer.id}
                className="blueprint-folder-unit"
                variants={{
                  hidden: { opacity: 0, y: 35, scale: 0.92 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: 'spring',
                      stiffness: 240,
                      damping: 20,
                      mass: 0.85,
                    },
                  },
                }}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  minHeight: '265px',
                  zIndex: isThisFolderOpen ? 35 : 2,
                  boxSizing: 'border-box',
                }}
              >
                {/* 1. 3D Dimensional Isometric Folder */}
                <InteractiveFolder
                  color={layer.color}
                  number={`0${layer.index}`}
                  label={layer.folderLabel}
                  icon={LayerIcon}
                  isOpen={isThisFolderOpen}
                  onToggle={() => handleFolderClick(layer.id)}
                  items={smallCards}
                  onCardClick={(cardIdx) => {
                    handleCardClick(cardIdx);
                  }}
                />

                {/* 2. Numbered Label & Depth Beneath Folder */}
                <div style={{ textAlign: 'center', marginTop: '10px', minHeight: '54px' }}>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      color: isThisFolderOpen ? layer.color : BRAND.primaryBlue,
                      letterSpacing: '0.9px',
                      textTransform: 'uppercase',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    0{layer.index}. {layer.folderLabel}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'monospace',
                      fontSize: '0.64rem',
                      color: 'rgba(110, 98, 84, 0.85)',
                      marginTop: '2px',
                    }}
                  >
                    {layer.depth}
                  </span>

                  {/* Close pill control shown only on open folder in State 2 */}
                  {isThisFolderOpen && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCloseFolder();
                      }}
                      style={{
                        cursor: 'pointer',
                        marginTop: '6px',
                        padding: '3px 10px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(38, 54, 111, 0.08)',
                        border: '1px solid rgba(38, 54, 111, 0.18)',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        color: BRAND.primaryBlue,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.2s ease',
                      }}
                      className="hover:scale-105"
                      title="Return to all closed folders (State 1)"
                    >
                      <X size={10} />
                      <span>CLOSE FOLDER</span>
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════
          STATE 3 — EXPANDED ARCHITECTURAL DETAIL VIEW (Light Warm Ivory Aesthetic)
          (Triggered ONLY when user clicks any of the 3 small cards in State 2)
         ══════════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isDetailOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleCloseDetail} // Click backdrop returns strictly to State 2
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(32, 28, 22, 0.82)',
              backdropFilter: 'blur(18px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(1rem, 2vw, 2.5rem)',
              boxSizing: 'border-box',
            }}
          >
            {/* The 3-Column Modal Container: Fills ~94% Width, 90% Height in Warm Ivory */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: 'min(94vw, 1420px)',
                height: 'min(90vh, 860px)',
                backgroundColor: BRAND.ivoryParchment,
                borderRadius: '24px',
                border: `1.5px solid rgba(195, 180, 160, 0.5)`,
                boxShadow: `0 35px 90px rgba(35, 28, 20, 0.4), 0 0 45px ${activeLayer.color}25`,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxSizing: 'border-box',
              }}
            >
              {/* Modal Top Header Bar with Column Tabs and Close Button */}
              <div
                style={{
                  padding: '0.85rem 1.6rem',
                  borderBottom: `1px solid ${BRAND.warmStoneBorder}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#FFFFFF',
                  flexShrink: 0,
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      backgroundColor: activeLayer.color,
                      color: BRAND.white,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.74rem',
                      fontWeight: 900,
                      letterSpacing: '1px',
                    }}
                  >
                    TIER 0{activeLayer.index} // {activeLayer.folderLabel}
                  </span>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '0.74rem',
                      color: BRAND.warmStone,
                    }}
                  >
                    {activeLayer.elevationLabel}
                  </span>
                </div>

                {/* 3-Column Indicator / Selector Tabs */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'rgba(110, 98, 84, 0.08)',
                    padding: '3px',
                    borderRadius: '20px',
                  }}
                >
                  <button
                    onClick={() => setSelectedCard('left')}
                    style={{
                      cursor: 'pointer',
                      border: 'none',
                      borderRadius: '16px',
                      padding: '4px 10px',
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      backgroundColor: selectedCard === 'left' ? activeLayer.color : 'transparent',
                      color: selectedCard === 'left' ? BRAND.white : BRAND.warmStone,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    1. CAD BLUEPRINT (/plots.jpg)
                  </button>
                  <button
                    onClick={() => setSelectedCard('center')}
                    style={{
                      cursor: 'pointer',
                      border: 'none',
                      borderRadius: '16px',
                      padding: '4px 10px',
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      backgroundColor: selectedCard === 'center' ? activeLayer.color : 'transparent',
                      color: selectedCard === 'center' ? BRAND.white : BRAND.warmStone,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    2. SPECIFICATIONS & GUARANTEES
                  </button>
                  <button
                    onClick={() => setSelectedCard('right')}
                    style={{
                      cursor: 'pointer',
                      border: 'none',
                      borderRadius: '16px',
                      padding: '4px 10px',
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      backgroundColor: selectedCard === 'right' ? activeLayer.color : 'transparent',
                      color: selectedCard === 'right' ? BRAND.white : BRAND.warmStone,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    3. SURVEY RECORD (/lands.jpg)
                  </button>
                </div>

                {/* Visible Close Button (Returns strictly to State 2) */}
                <button
                  onClick={handleCloseDetail}
                  style={{
                    cursor: 'pointer',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(110, 98, 84, 0.1)',
                    border: '1px solid rgba(110, 98, 84, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: BRAND.primaryBlue,
                    transition: 'all 0.2s ease',
                  }}
                  className="hover:scale-110"
                  title="Close expanded view (Return to State 2)"
                  aria-label="Close detail view"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body: EXACT THREE COLUMNS (Left 32%, Center 36%, Right 32%) */}
              <div
                className="exploded-state3-grid"
                style={{
                  flex: 1,
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 32fr) minmax(0, 36fr) minmax(0, 32fr)',
                  gap: '1.2rem',
                  padding: '1.4rem',
                  overflowY: 'auto',
                  boxSizing: 'border-box',
                  minHeight: 0,
                }}
              >
                {/* ── LEFT COLUMN: /plots.jpg IMAGE ── */}
                <div
                  onClick={() => setSelectedCard('left')}
                  style={{
                    position: 'relative',
                    height: '100%',
                    minHeight: '260px',
                    backgroundColor: '#0F172A',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '14px',
                    boxSizing: 'border-box',
                    border: selectedCard === 'left'
                      ? `2.5px solid ${activeLayer.color}`
                      : '1px solid rgba(110, 98, 84, 0.2)',
                    boxShadow: selectedCard === 'left'
                      ? `0 0 25px ${activeLayer.color}40`
                      : 'none',
                    transition: 'border 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer',
                  }}
                >
                  <Image
                    src={activeLayer.leftImage}
                    alt={`${activeLayer.folderLabel} Left Blueprint Image`}
                    fill
                    priority
                    sizes="(max-width: 900px) 100vw, 33vw"
                    style={{
                      objectFit: 'cover',
                      filter: 'brightness(0.88) contrast(1.06)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(15, 23, 42, 0.88) 0%, transparent 60%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Top Badge */}
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <span
                      style={{
                        backgroundColor: 'rgba(15, 23, 42, 0.88)',
                        border: `1px solid ${activeLayer.color}`,
                        color: BRAND.white,
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontFamily: 'monospace',
                        fontSize: '0.66rem',
                        fontWeight: 700,
                      }}
                    >
                      {selectedCard === 'left' ? '★ EXPANDED SELECTION // CAD PLOT' : 'CAD PLOT MATRIX'}
                    </span>
                  </div>

                  {/* Bottom Image Caption in Warm Ivory styling */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      backgroundColor: 'rgba(250, 248, 245, 0.94)',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: `1px solid ${BRAND.warmStoneBorder}`,
                      color: BRAND.primaryBlue,
                      fontFamily: 'monospace',
                      fontSize: '0.68rem',
                      lineHeight: 1.35,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    }}
                  >
                    <span style={{ color: activeLayer.color, fontWeight: 700, display: 'block', marginBottom: '2px' }}>
                      LAYER 0{activeLayer.index} // BLUEPRINT CAD (/plots.jpg)
                    </span>
                    <span style={{ color: '#4A4237' }}>{activeLayer.leftCaption}</span>
                  </div>
                </div>

                {/* ── CENTER COLUMN: ABOUT / COMPLETE DOSSIER CONTENT ── */}
                <div
                  onClick={() => setSelectedCard('center')}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '1.4rem 1.6rem',
                    overflowY: 'auto',
                    boxSizing: 'border-box',
                    border: selectedCard === 'center'
                      ? `2.5px solid ${activeLayer.color}`
                      : `1px solid ${BRAND.warmStoneBorder}`,
                    boxShadow: selectedCard === 'center'
                      ? `0 0 25px ${activeLayer.color}35`
                      : '0 4px 14px rgba(45, 35, 25, 0.05)',
                    transition: 'border 0.3s ease, box-shadow 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                >
                  <div>
                    {/* Status Badge & Depth */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span
                        style={{
                          backgroundColor: `${activeLayer.color}15`,
                          color: activeLayer.color,
                          border: `1px solid ${activeLayer.color}35`,
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.66rem',
                          fontWeight: 800,
                          letterSpacing: '1px',
                        }}
                      >
                        {activeLayer.status}
                      </span>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: BRAND.warmStone }}>
                        DEPTH: {activeLayer.depth}
                      </span>
                    </div>

                    {/* Full Layer Name in Refined Classical Heading */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.35rem',
                        fontWeight: 900,
                        color: BRAND.primaryBlue,
                        margin: '0 0 10px 0',
                        lineHeight: 1.15,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {activeLayer.name}
                    </h3>

                    {/* Complete Original Description */}
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.94rem',
                        color: '#423A30',
                        lineHeight: 1.6,
                        margin: '0 0 18px 0',
                      }}
                    >
                      {activeLayer.desc}
                    </p>

                    {/* Key Engineering Metrics: All 4 metrics in 2x2 grid */}
                    <div style={{ marginBottom: '16px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.68rem',
                          letterSpacing: '1.5px',
                          color: BRAND.primaryBlue,
                          fontWeight: 800,
                          display: 'block',
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                        }}
                      >
                        KEY ENGINEERING METRICS:
                      </span>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                        {activeLayer.metrics.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            style={{
                              padding: '8px 10px',
                              backgroundColor: '#FAF8F5',
                              borderRadius: '8px',
                              border: `1px solid ${BRAND.warmStoneBorder}`,
                            }}
                          >
                            <span
                              style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '0.58rem',
                                color: BRAND.warmStone,
                                display: 'block',
                                marginBottom: '2px',
                              }}
                            >
                              {m.label}
                            </span>
                            <div
                              style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '0.9rem',
                                fontWeight: 900,
                                color: BRAND.primaryBlue,
                                lineHeight: 1.1,
                              }}
                            >
                              {m.value}
                            </div>
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.68rem',
                                color: activeLayer.color,
                                fontWeight: 700,
                              }}
                            >
                              {m.desc}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Verified Statutory Guarantees: All 3 guarantees */}
                    <div style={{ marginBottom: '16px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.68rem',
                          letterSpacing: '1.5px',
                          color: BRAND.primaryBlue,
                          fontWeight: 800,
                          display: 'block',
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                        }}
                      >
                        VERIFIED STATUTORY GUARANTEES:
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {activeLayer.guarantees.map((g, gIdx) => (
                          <div
                            key={gIdx}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '8px',
                              fontSize: '0.78rem',
                              fontFamily: 'var(--font-body)',
                              color: '#3E362C',
                              lineHeight: 1.35,
                            }}
                          >
                            <CheckCircle2
                              size={14}
                              color={activeLayer.color}
                              style={{ flexShrink: 0, marginTop: '2px' }}
                            />
                            <span>{g}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action CTA Link */}
                  <div style={{ paddingTop: '8px' }}>
                    <a
                      href="/contact"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        width: '100%',
                        backgroundColor: BRAND.primaryBlue,
                        color: BRAND.white,
                        padding: '0.75rem 1.4rem',
                        borderRadius: '50px',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.76rem',
                        letterSpacing: '1.5px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 6px 18px rgba(38, 54, 111, 0.2)',
                      }}
                      className="hover:scale-102"
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = BRAND.premiumRed;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = BRAND.primaryBlue;
                      }}
                    >
                      <span>SCHEDULE ON-SITE TELEMETRY AUDIT</span>
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>

                {/* ── RIGHT COLUMN: /lands.jpg IMAGE ── */}
                <div
                  onClick={() => setSelectedCard('right')}
                  style={{
                    position: 'relative',
                    height: '100%',
                    minHeight: '260px',
                    backgroundColor: '#0F172A',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '14px',
                    boxSizing: 'border-box',
                    border: selectedCard === 'right'
                      ? `2.5px solid ${activeLayer.color}`
                      : '1px solid rgba(110, 98, 84, 0.2)',
                    boxShadow: selectedCard === 'right'
                      ? `0 0 25px ${activeLayer.color}40`
                      : 'none',
                    transition: 'border 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer',
                  }}
                >
                  <Image
                    src={activeLayer.rightImage}
                    alt={`${activeLayer.folderLabel} Right Territory Image`}
                    fill
                    priority
                    sizes="(max-width: 900px) 100vw, 33vw"
                    style={{
                      objectFit: 'cover',
                      filter: 'brightness(0.88) contrast(1.06)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(15, 23, 42, 0.88) 0%, transparent 60%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Top Badge */}
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <span
                      style={{
                        backgroundColor: 'rgba(15, 23, 42, 0.88)',
                        border: `1px solid ${activeLayer.color}`,
                        color: BRAND.white,
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontFamily: 'monospace',
                        fontSize: '0.66rem',
                        fontWeight: 700,
                      }}
                    >
                      {selectedCard === 'right' ? '★ EXPANDED SELECTION // SURVEY RECORD' : 'TERRITORY RECORD'}
                    </span>
                  </div>

                  {/* Bottom Image Caption in Warm Ivory styling */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      backgroundColor: 'rgba(250, 248, 245, 0.94)',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: `1px solid ${BRAND.warmStoneBorder}`,
                      color: BRAND.primaryBlue,
                      fontFamily: 'monospace',
                      fontSize: '0.68rem',
                      lineHeight: 1.35,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    }}
                  >
                    <span style={{ color: activeLayer.color, fontWeight: 700, display: 'block', marginBottom: '2px' }}>
                      LAYER 0{activeLayer.index} // SOVEREIGN SURVEY (/lands.jpg)
                    </span>
                    <span style={{ color: '#4A4237' }}>{activeLayer.rightCaption}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global CSS for 6-in-a-Row Wide Screen Layout & Mobile Responsive Stacking */}
      <style jsx global>{`
        /* Wide Desktop Screen (>= 1100px): Balanced 6-Folder Horizontal Row */
        .blueprint-folders-row {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1.2rem;
          max-width: 1400px;
          margin: 0 auto;
          padding: 1.5rem 0.5rem;
          justify-items: center;
          align-items: end;
        }

        /* Medium Desktop / Laptop (840px - 1099px): 3 Columns x 2 Rows */
        @media (max-width: 1099px) {
          .blueprint-folders-row {
            grid-template-columns: repeat(3, 1fr);
            gap: 3rem 1.5rem;
          }
        }

        /* Tablet (540px - 839px): 2 Columns x 3 Rows */
        @media (max-width: 839px) {
          .blueprint-folders-row {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem 1.2rem;
          }
        }

        /* Mobile (< 540px): 1 Column */
        @media (max-width: 539px) {
          .blueprint-folders-row {
            grid-template-columns: 1fr;
            gap: 2.2rem 1rem;
          }
        }

        /* State 3 Modal Mobile Responsiveness */
        @media (max-width: 960px) {
          .exploded-state3-grid {
            grid-template-columns: 1fr !important;
            height: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
