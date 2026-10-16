'use client';

/**
 * ExplodedPlotView Component — Earthy & Natural 3D Architectural Edition
 * Design Direction: Light Warm Ivory Theme | 3D Isometric Folders | Cinematic Spring Transitions
 * Strict Three-State Interaction:
 * STATE 1: All 5 dimensional folders in a balanced horizontal row on wide screens.
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
  Building,
} from 'lucide-react';
import { InteractiveFolder } from './InteractiveFolder';
import ParticleWaveBackground from './ParticleWaveBackground';

const BRAND = {
  primaryBlue: '#26366F',
  skyBlue: '#12A4DC',
  premiumRed: '#D2143A',
  warmIvory: '#FFFFFF',
  ivoryParchment: '#FFFFFF',
  warmStone: '#26366F',
  warmStoneBorder: 'rgba(38, 54, 111, 0.15)',
  white: '#FFFFFF',
};

// ─── Source of Truth: 5 Architectural Blueprint Portfolios ─────────────────────
const PLOT_LAYERS = [
  {
    id: 'layer-villas',
    index: 1,
    folderLabel: 'ULTRA VILLAS',
    color: '#26366F', // Sovereign Primary Blue
    name: 'ULTRA LUXURY VILLAS & PRIVATE MANSIONS',
    elevationLabel: 'SECTOR 01 // PALATIAL ARCHITECTURAL RESIDENCES',
    depth: 'G+2 MANSION',
    status: 'BESPOKE ESTATES',
    icon: Sparkles,
    leftImage: '/5%20properties/ultra%20luxury%20villas.jpg',
    rightImage: '/villas.jpg',
    leftCaption: 'ARCHITECTURAL CAD BLUEPRINT // HEATED LAP POOL // MARBLE ATRIUM // 17°24\'08"N 78°19\'36"E',
    rightCaption: '8,500 SQ.FT PALATIAL RESIDENCE // SUBTERRANEAN CAR VAULT // PRIVATE ELEVATOR',
    desc: 'The crowning achievement of residential grandeur. Palatial individual estates designed with double-height marble lobbies, private heated infinity lap pools, zen reflection courtyards, private elevators, and subterranean car galleries.',
    metrics: [
      { label: 'PALATIAL SCALE', value: '8,500 SQ.FT', desc: 'Customizable G+2 Estate Footprint' },
      { label: 'PRIVATE RETREAT', value: 'INFINITY POOL', desc: 'Temperature-Controlled Lap Pool' },
      { label: 'ACOUSTIC SHIELD', value: 'P-3 ISOLATION', desc: 'Triple-Glazed Noise & Climate Damping' },
      { label: 'PROJECTED ALPHA', value: '17.6% YoY', desc: 'Prestige Valley Enclave Appreciation' },
    ],
    guarantees: [
      '100% Freehold ownership with individual title deeds and geo-cadastral demarcation',
      'Engineered with seismic-resilient RCC shear core and platinum-grade Italian fittings',
      '24/7 dedicated white-glove concierge and multi-tier biometric security matrix',
    ],
  },
  {
    id: 'layer-apartments',
    index: 2,
    folderLabel: 'APARTMENTS',
    color: '#12A4DC', // Sky Blue
    name: 'LUXURY HIGH-RISE APARTMENTS & PENTHOUSES',
    elevationLabel: 'SECTOR 02 // 55-FLOOR VERTICAL SANCTUARIES',
    depth: '+180M SKYLINE',
    status: 'SKY RESIDENCES',
    icon: Building,
    leftImage: '/5%20properties/luxury%20apartments.jpg',
    rightImage: '/flats.jpg',
    leftCaption: 'STRUCTURAL CAD SCHEMATICS // 55 FLOORS // WRAP-AROUND SKYLINE TERRACES',
    rightCaption: 'SKY INFINITY POOL // PRIVATE ELEVATOR LOBBY // 3,800 SQ.FT DESIGNER SUITE',
    desc: 'Ascending high above the metropolis, these vertical sanctuaries merge monumental structural beauty with the serenity of a private estate. Wrap-around panoramic terraces, acoustic sound isolation, and dedicated private sky lounges.',
    metrics: [
      { label: 'TOWER ELEVATION', value: '55 FLOORS', desc: 'Aerodynamic Wind-Tunnel Tested Core' },
      { label: 'SUITE SCALE', value: '3,800 SQ.FT', desc: 'Panoramic Skyline Residences' },
      { label: 'HOSPITALITY', value: '5★ CONCIERGE', desc: 'Round-the-Clock Valet & Attendant' },
      { label: 'PROJECTED YIELD', value: '8.4% NET', desc: 'High-Demand Sovereign Rental Return' },
    ],
    guarantees: [
      'IGBC Platinum green building certification with advanced energy conservation',
      'Private access-controlled high-speed elevators opening straight into individual foyers',
      'Advanced acoustic decoupling between party walls ensuring pin-drop silence',
    ],
  },
  {
    id: 'layer-plots',
    index: 3,
    folderLabel: 'OPEN PLOTS',
    color: '#26366F', // Sovereign Primary Blue
    name: 'HMDA & RERA CLEAR GATED OPEN PLOTS',
    elevationLabel: 'SECTOR 03 // MASTER-PLANNED CANVAS ESTATES',
    depth: 'CANVAS 0.0M',
    status: '100% CLEAR TITLE',
    icon: Compass,
    leftImage: '/5%20properties/open%20plots.jpg',
    rightImage: '/plots.jpg',
    leftCaption: 'CADASTRAL LAYOUT BLUEPRINT // 60-FT BOULEVARDS // HMDA & RERA SANCTIONED',
    rightCaption: '100% VASTU COMPLIANT // VIRGIN RED LOAM // 24/7 GATED ECO-COMMUNITY',
    desc: 'An immaculate canvas for your bespoke architectural dream. Situated within secure, low-density gated eco-communities featuring wide tree-lined boulevards, underground utility grids, and private country clubs.',
    metrics: [
      { label: 'PLOTTED PARCELS', value: '600+ SQ.YDS', desc: 'Engineered Vastu-Compliant Footprints' },
      { label: 'STATUTORY SANCTION', value: '100% HMDA', desc: 'Full RERA Sanctioned Master Layout' },
      { label: 'BOULEVARD WIDTH', value: '60 FT ROADS', desc: 'Underground Power & Fiber Grids' },
      { label: 'ANNUAL ALPHA', value: '19.2% YoY', desc: 'Aerotropolis Corridor Appreciation' },
    ],
    guarantees: [
      '30-Year unbroken chain of ownership verified by Senior High Court Advocates',
      'Immediate spot registration with precision GPS geo-coordinates stamped on deed',
      'Pre-approved by premier institutional banks for up to 75% plot financing',
    ],
  },
  {
    id: 'layer-commercial',
    index: 4,
    folderLabel: 'COMMERCIAL',
    color: '#12A4DC', // Sky Blue
    name: 'GRADE-A COMMERCIAL LANDMARKS & CORPORATE HUBS',
    elevationLabel: 'SECTOR 04 // PRIME FINANCIAL DISTRICT',
    depth: 'GRADE-A ASSET',
    status: 'CORPORATE CORE',
    icon: Zap,
    leftImage: '/5%20properties/commercial.jpg',
    rightImage: '/architectural-tower-drawing.jpg',
    leftCaption: 'COMMERCIAL CAD BLUEPRINT // COLUMN-FREE FLOOR PLATES // PLATINUM LEED',
    rightCaption: 'FLAGSHIP ENTERPRISE HUB // DOUBLE-HEIGHT LOBBY // SMART BMS TELEMETRY',
    desc: "Architectural marvels engineered for international enterprise. Column-free floor plates, integrated smart BMS telemetry, biophilic sky terraces, and platinum-grade connectivity anchoring Hyderabad's prime financial corridors.",
    metrics: [
      { label: 'DELIVERED SCALE', value: '2.8M+ SQ.FT', desc: 'Anchoring Premier Tech Corridors' },
      { label: 'ECO STANDARD', value: 'LEED PLATINUM', desc: 'Zero Carbon Footprint Engineering' },
      { label: 'TENANT ROSTER', value: 'AAA GRADE', desc: 'Multinational Corporate Headquarters' },
      { label: 'NET YIELD', value: '11.8% NET', desc: 'Predictable Institutional Cash Flow' },
    ],
    guarantees: [
      'Pre-leased institutional grade spaces with blue-chip global tenants',
      'Dual redundant electrical grids with 100% backup and rooftop solar telemetry',
      'Smart BMS automation monitoring real-time indoor air quality, thermal load, and security',
    ],
  },
  {
    id: 'layer-bulkland',
    index: 5,
    folderLabel: 'BULK LAND',
    color: '#D2143A', // Palatial Crimson Red
    name: 'STRATEGIC BULK LAND PARCELS & INFRASTRUCTURE TRACTS',
    elevationLabel: 'AXIS 05 // HIGH-VELOCITY GROWTH AXES',
    depth: '10+ ACRES SOVEREIGN',
    status: 'LAND RESERVES',
    icon: FileCheck2,
    leftImage: '/5%20properties/bulk%20land.jpg',
    rightImage: '/lands.jpg',
    leftCaption: 'GIS CADASTRAL SURVEY // HIGHWAY CORRIDOR ACCESS // 100% LEGAL TITLE',
    rightCaption: 'STRATEGIC LAND BANK // MASTER-PLAN ZONED // HIGH-VALUATION HORIZON ALPHA',
    desc: 'Pristine, strategically accumulated land tracts spanning high-velocity growth axes. Meticulously cleared with 100% legal sovereignty, these generational tracts anchor upcoming master-planned commercial and residential townships.',
    metrics: [
      { label: 'TRACT SCALE', value: '10 - 100+ ACRES', desc: 'Contiguous Sovereign Land Banks' },
      { label: 'CORRIDOR ACCESS', value: '150 FT FRONT', desc: 'Direct National Highway & ORR Access' },
      { label: 'TITLE SECURITY', value: '100% CLEAR', desc: 'Certified Zero-Encumbrance Audit' },
      { label: 'HORIZON EXPANSION', value: '3.4X ALPHA', desc: '5-Year Sovereign Value Multiplier' },
    ],
    guarantees: [
      'Highway frontage with instant registration and complete title clearance',
      'Master-plan zoned for mixed-use, township, or high-value commercial deployment',
      'Comprehensive physical GPS demarcation with permanent RCC boundary monuments',
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
          backgroundColor: '#26366F',
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
            background: 'linear-gradient(to top, rgba(38, 54, 111, 0.95) 0%, transparent 60%)',
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
            {layer.folderLabel} // CAD
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
            borderTop: '1px solid rgba(38, 54, 111, 0.12)',
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
          backgroundColor: '#26366F',
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
            background: 'linear-gradient(to top, rgba(38, 54, 111, 0.95) 0%, transparent 60%)',
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
          <span style={{ fontSize: '6px', fontFamily: 'monospace', color: BRAND.skyBlue, fontWeight: 700 }}>
            CLEAR
          </span>
        </div>

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#FFFFFF' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '6.5px', fontWeight: 800, opacity: 0.95 }}>
            {layer.folderLabel} // ARCH
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
              THE 5 ARCHITECTURAL BLUEPRINTS
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
              color: 'rgba(38, 54, 111, 0.85)',
              maxWidth: '680px',
              margin: '0 auto 8px auto',
              lineHeight: 1.5,
              fontWeight: 500,
            }}
          >
            Five master portfolios engineered with architectural precision and sovereign trust.
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
            Every dimension designed for generational legacy and institutional security.
          </motion.span>
        </motion.div>

        {/* ── STATE 1 & STATE 2: FIVE 3D ISOMETRIC FOLDERS (Staggered Entry Cascade on Scroll) ── */}
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
                    1. CAD BLUEPRINT
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
                    3. ARCHITECTURAL ELEVATION
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
                    backgroundColor: '#26366F',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '14px',
                    boxSizing: 'border-box',
                    border: selectedCard === 'left'
                      ? `2.5px solid ${activeLayer.color}`
                      : '1px solid rgba(38, 54, 111, 0.2)',
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
                      background: 'linear-gradient(to top, rgba(38, 54, 111, 0.92) 0%, transparent 60%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Top Badge */}
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <span
                      style={{
                        backgroundColor: 'rgba(38, 54, 111, 0.90)',
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

                  {/* Bottom Image Caption */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      backgroundColor: '#FFFFFF',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: `1px solid ${BRAND.warmStoneBorder}`,
                      color: BRAND.primaryBlue,
                      fontFamily: 'monospace',
                      fontSize: '0.68rem',
                      lineHeight: 1.35,
                      boxShadow: '0 4px 12px rgba(38, 54, 111, 0.1)',
                    }}
                  >
                    <span style={{ color: activeLayer.color, fontWeight: 700, display: 'block', marginBottom: '2px' }}>
                      PORTFOLIO 0{activeLayer.index} // BLUEPRINT CAD
                    </span>
                    <span style={{ color: 'rgba(38, 54, 111, 0.85)' }}>{activeLayer.leftCaption}</span>
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
                        color: 'rgba(38, 54, 111, 0.85)',
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
                              backgroundColor: '#FFFFFF',
                              borderRadius: '8px',
                              border: `1px solid ${BRAND.warmStoneBorder}`,
                            }}
                          >
                            <span
                              style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '0.58rem',
                                color: BRAND.skyBlue,
                                display: 'block',
                                marginBottom: '2px',
                                fontWeight: 700,
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
                              color: 'rgba(38, 54, 111, 0.85)',
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
                    backgroundColor: '#26366F',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '14px',
                    boxSizing: 'border-box',
                    border: selectedCard === 'right'
                      ? `2.5px solid ${activeLayer.color}`
                      : '1px solid rgba(38, 54, 111, 0.2)',
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
                      background: 'linear-gradient(to top, rgba(38, 54, 111, 0.92) 0%, transparent 60%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Top Badge */}
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <span
                      style={{
                        backgroundColor: 'rgba(38, 54, 111, 0.90)',
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

                  {/* Bottom Image Caption */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      backgroundColor: '#FFFFFF',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: `1px solid ${BRAND.warmStoneBorder}`,
                      color: BRAND.primaryBlue,
                      fontFamily: 'monospace',
                      fontSize: '0.68rem',
                      lineHeight: 1.35,
                      boxShadow: '0 4px 12px rgba(38, 54, 111, 0.1)',
                    }}
                  >
                    <span style={{ color: activeLayer.color, fontWeight: 700, display: 'block', marginBottom: '2px' }}>
                      PORTFOLIO 0{activeLayer.index} // ARCHITECTURAL ELEVATION
                    </span>
                    <span style={{ color: 'rgba(38, 54, 111, 0.85)' }}>{activeLayer.rightCaption}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global CSS for 6-in-a-Row Wide Screen Layout & Mobile Responsive Stacking */}
      <style jsx global>{`
        /* Wide Desktop Screen (>= 1100px): Balanced 5-Folder Horizontal Row */
        .blueprint-folders-row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
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
