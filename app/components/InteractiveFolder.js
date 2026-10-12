'use client';

/**
 * InteractiveFolder Component — Earthy & Natural 3D Isometric Architectural Edition
 * Features:
 * - 3D isometric dimensional folder silhouette with soft ambient ground shadow
 * - Top tab with bevel highlight and realistic interior depth plate
 * - Dual front flaps parting smoothly with spring-based cinematic motion
 * - Layer architectural icon & numbered label that fade out gracefully upon opening
 * - Staggered card emergence sequence (Center document lifts first, then Left/Right cards fan out)
 * - Mouse drift parallax on hover
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Helper to calculate darker rear interior plate
const darkenColor = (hex, percent) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color.split('').map((c) => c + c).join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

export function InteractiveFolder({
  color = '#26366F',
  number = '01',
  items = [],
  className = '',
  label = '',
  icon: IconComponent,
  isOpen = false,
  onToggle,
  onCardClick,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const maxVisibleItems = 3;
  const displayItems = items.slice(0, maxVisibleItems);
  while (displayItems.length < maxVisibleItems) {
    displayItems.push(null);
  }

  const folderBackColor = darkenColor(color, 0.22);

  // Mouse hover physics for cards drifting
  const handleMouseMove = (e, index) => {
    if (!isOpen) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.16;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.16;
    setMousePos({ x, y });
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setHoveredIndex(null);
  };

  // Dimensional Folder Geometry
  const folderWidth = 132;
  const folderHeight = 90;
  const tabWidth = 40;
  const tabHeight = 13;

  // Exact card dimensions:
  // Card 0: Left Image (~96px x 72px)
  // Card 1: Center Content (~114px x 82px)
  // Card 2: Right Image (~96px x 72px)
  const getCardDimensions = (index) => {
    if (index === 1) {
      return { width: '114px', height: '82px' };
    }
    return { width: '96px', height: '72px' };
  };

  // Card transform in local coordinate system
  const getCardAnimation = (index) => {
    if (!isOpen) {
      return {
        x: '-50%',
        y: 12,
        rotate: 0,
        opacity: 0,
        scale: 0.9,
      };
    }

    // Emerging floating arrangement
    // Card 0 (Left Image): angled left (-12°), offset left by -66px, lifted by -48px
    // Card 1 (Center Content): upright (0°), centered, lifted higher by -74px
    // Card 2 (Right Image): angled right (+12°), offset right by +66px, lifted by -48px
    const baseOffsets = [
      { xOffset: -66, y: -48, rotate: -12 },
      { xOffset: 0, y: -74, rotate: 0 },
      { xOffset: 66, y: -48, rotate: 12 },
    ];

    const target = baseOffsets[index] || { xOffset: 0, y: -50, rotate: 0 };
    const isHovered = hoveredIndex === index;

    const driftX = isHovered ? mousePos.x : 0;
    const driftY = isHovered ? mousePos.y : 0;

    return {
      x: `calc(-50% + ${target.xOffset + driftX}px)`,
      y: target.y + driftY,
      rotate: target.rotate,
      opacity: 1,
      scale: isHovered ? 1.07 : 1,
    };
  };

  // Cinematic staggered card opening transition
  const getCardTransition = (index) => {
    // Stagger sequence: Center document rises first (0.04s), then Left (0.11s) and Right (0.16s) fan out
    const openDelays = [0.11, 0.04, 0.16];
    return {
      type: 'spring',
      stiffness: 260,
      damping: 21,
      mass: 0.85,
      delay: isOpen ? openDelays[index] : 0,
    };
  };

  return (
    <div
      className={`interactive-folder-stage select-none ${className}`}
      style={{
        position: 'relative',
        width: '210px',
        height: '175px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        margin: '0 auto',
        overflow: 'visible',
      }}
    >
      {/* ── REALISTIC AMBIENT GROUND CONTACT SHADOW ── */}
      <motion.div
        animate={{
          scaleX: isOpen ? 1.25 : 1,
          scaleY: isOpen ? 1.3 : 1,
          opacity: isOpen ? 0.38 : 0.22,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 25 }}
        style={{
          position: 'absolute',
          bottom: '-6px',
          width: '130px',
          height: '16px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(45, 35, 25, 0.8) 0%, rgba(45, 35, 25, 0.25) 50%, transparent 75%)',
          filter: 'blur(5px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ── 3D ISOMETRIC CLICKABLE FOLDER CONTAINER ── */}
      <motion.div
        whileHover={{ y: isOpen ? 0 : -4 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{
          position: 'relative',
          width: `${folderWidth}px`,
          height: `${folderHeight}px`,
          cursor: 'pointer',
          zIndex: 5,
        }}
        onClick={() => {
          if (onToggle) {
            onToggle();
          }
        }}
        title={isOpen ? 'Click folder to close' : `Click to open ${label}`}
      >
        {/* ── 1. FOLDER REAR PLATE & TOP TAB (zIndex: 10) ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: folderBackColor,
            borderRadius: '0 10px 10px 10px',
            boxShadow: isOpen
              ? `0 18px 36px -4px ${color}45, 0 6px 14px rgba(45, 35, 25, 0.15)`
              : '0 6px 18px -2px rgba(45, 35, 25, 0.14)',
            zIndex: 10,
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {/* Top Folder Tab */}
          <div
            style={{
              position: 'absolute',
              bottom: '100%',
              left: 0,
              width: `${tabWidth}px`,
              height: `${tabHeight}px`,
              backgroundColor: folderBackColor,
              borderRadius: '6px 6px 0 0',
              borderTop: '1px solid rgba(255, 255, 255, 0.35)',
            }}
          />

          {/* Interior subtle grid lines */}
          <div
            style={{
              position: 'absolute',
              inset: '6px',
              border: '1px dashed rgba(255, 255, 255, 0.12)',
              borderRadius: '6px',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* ── 2. THREE SMALL FLOATING CARDS (Deliberate Stacking: Center = 28, Left/Right = 22, Hover = 45) ── */}
        {displayItems.map((item, i) => {
          const dims = getCardDimensions(i);
          const zIndexVal = hoveredIndex === i ? 45 : i === 1 ? 28 : 22;

          return (
            <motion.div
              key={i}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={handleMouseLeave}
              initial={{ x: '-50%', y: 12, rotate: 0, opacity: 0, scale: 0.9 }}
              animate={getCardAnimation(i)}
              transition={getCardTransition(i)}
              onClick={(e) => {
                e.stopPropagation(); // Never close folder on card click!
                if (isOpen && onCardClick) {
                  onCardClick(i);
                }
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                width: dims.width,
                height: dims.height,
                zIndex: zIndexVal,
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: isOpen ? 'pointer' : 'default',
                pointerEvents: isOpen ? 'auto' : 'none',
                boxShadow:
                  hoveredIndex === i
                    ? `0 18px 36px rgba(45, 35, 25, 0.28), 0 0 16px ${color}40`
                    : '0 8px 20px rgba(45, 35, 25, 0.16), 0 1px 3px rgba(0,0,0,0.08)',
                border:
                  i === 1
                    ? `1.5px solid ${color}`
                    : '2px solid #FFFFFF',
                backgroundColor: '#FFFFFF',
              }}
              title={isOpen ? 'Click to expand into full-screen 3-column detail view' : ''}
            >
              {item}
            </motion.div>
          );
        })}

        {/* ── 3. FOLDER FRONT FLAP — LEFT HALF (zIndex: 25) ── */}
        <motion.div
          animate={{
            skewX: isOpen ? 13 : 0,
            scaleY: isOpen ? 0.62 : 1,
            rotateX: isOpen ? 14 : 0,
            translateY: isOpen ? 4 : 0,
          }}
          transition={{ type: 'spring', stiffness: 270, damping: 22 }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 25,
            transformOrigin: 'bottom',
            pointerEvents: 'none',
            backgroundColor: color,
            backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.03) 50%, rgba(0,0,0,0.18) 100%)',
            borderRadius: '4px 10px 10px 10px',
            clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
            boxShadow: 'inset 0 1.5px 0.5px rgba(255, 255, 255, 0.45)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.22)',
          }}
        />

        {/* ── 4. FOLDER FRONT FLAP — RIGHT HALF (zIndex: 25) ── */}
        <motion.div
          animate={{
            skewX: isOpen ? -13 : 0,
            scaleY: isOpen ? 0.62 : 1,
            rotateX: isOpen ? 14 : 0,
            translateY: isOpen ? 4 : 0,
          }}
          transition={{ type: 'spring', stiffness: 270, damping: 22 }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 25,
            transformOrigin: 'bottom',
            pointerEvents: 'none',
            backgroundColor: color,
            backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.03) 50%, rgba(0,0,0,0.18) 100%)',
            borderRadius: '4px 10px 10px 10px',
            clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
            boxShadow: 'inset 0 1.5px 0.5px rgba(255, 255, 255, 0.45)',
            borderRight: '1px solid rgba(255, 255, 255, 0.3)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.22)',
          }}
        >
          {/* Closed Folder Label & Architectural Layer Icon (Smooth exit upon opening) */}
          {label && (
            <motion.div
              animate={{
                opacity: isOpen ? 0 : 1,
                scale: isOpen ? 0.75 : 1,
                y: isOpen ? 6 : 0,
              }}
              transition={{ duration: 0.18 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                color: '#FFFFFF',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              {IconComponent && (
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  }}
                >
                  <IconComponent size={13} color="#FFFFFF" strokeWidth={2.2} />
                </div>
              )}
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '9.5px',
                  fontWeight: 800,
                  letterSpacing: '1.2px',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)',
                }}
              >
                {label}
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default InteractiveFolder;
