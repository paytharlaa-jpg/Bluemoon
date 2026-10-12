'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Box } from 'lucide-react';
import FuturisticBackground from './FuturisticBackground';

// Luxurious editorial deceleration curve: buttery smooth, calm, and majestic
const ARBOR_EASE = [0.22, 1, 0.36, 1];

/**
 * Character-by-character reveal (Eyebrow tag) matching Belgrade Arbor's .preheading1 animation
 * Slow, calm letter-by-letter unrolling
 */
function ArborCharReveal({ text, active, delay = 0, style, stagger = 0.04, duration = 0.95 }) {
  const chars = text.split('');
  return (
    <span style={{ ...style, display: 'inline-flex', flexWrap: 'wrap' }}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: '1.4rem', filter: 'blur(5px)' }}
          animate={
            active
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: '-1.2rem', filter: 'blur(4px)' }
          }
          transition={{
            duration,
            delay: active ? delay + i * stagger : 0,
            ease: ARBOR_EASE,
          }}
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
            willChange: 'transform, opacity, filter',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

/**
 * Word-by-word reveal (Heading) matching Belgrade Arbor's .heading1 / .heading2 animation
 * Slow, majestic word-by-word rising entrance with soft blur-to-focus clearance
 */
function ArborHeadingReveal({ text, active, delay = 0.25, style, stagger = 0.08, duration = 1.25 }) {
  const words = text.split(' ');
  return (
    <h2 style={{ ...style, display: 'block' }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            marginRight: '0.34em',
            whiteSpace: 'nowrap',
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: '2.5rem', filter: 'blur(6px)' }}
            animate={
              active
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: '-1.5rem', filter: 'blur(5px)' }
            }
            transition={{
              duration,
              delay: active ? delay + i * stagger : 0,
              ease: ARBOR_EASE,
            }}
            style={{
              display: 'inline-block',
              willChange: 'transform, opacity, filter',
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

/**
 * Word-by-word reveal (Paragraph) matching Belgrade Arbor's .paragraph1 animation
 * Slow, floating text drift where each word dissolves softly into place
 */
function ArborWordReveal({ text, active, delay = 0.55, style, stagger = 0.045, duration = 1.2 }) {
  const words = text.split(' ');
  return (
    <p style={{ ...style, display: 'block' }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            marginRight: '0.3em',
            whiteSpace: 'nowrap',
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: '2rem', filter: 'blur(5px)' }}
            animate={
              active
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: '-1.2rem', filter: 'blur(4px)' }
            }
            transition={{
              duration,
              delay: active ? delay + i * stagger : 0,
              ease: ARBOR_EASE,
            }}
            style={{
              display: 'inline-block',
              willChange: 'transform, opacity, filter',
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </p>
  );
}

/**
 * Dual-layer magnetic rolling CTA button matching Belgrade Arbor's .button1Wrap / .button2Wrap
 * Enters slowly and gracefully once the headline and copy have begun unrolling
 */
function ArborButton({ href = '#portfolio', active, delay = 0.95, label = 'EXPLORE IN 3D' }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: '2.2rem', filter: 'blur(5px)' }}
      animate={
        active
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: '-1.2rem', filter: 'blur(4px)' }
      }
      transition={{
        duration: 1.05,
        delay: active ? delay : 0,
        ease: ARBOR_EASE,
      }}
      style={{ display: 'inline-block' }}
    >
      <a
        href={href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '999px',
          border: '1.5px solid #26366F',
          backgroundColor: 'transparent',
          padding: '11px 26px',
          cursor: 'pointer',
          textDecoration: 'none',
          boxShadow: isHovered
            ? '0 10px 28px rgba(38, 54, 111, 0.22)'
            : '0 2px 8px rgba(38, 54, 111, 0.05)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {/* Background fill on hover (scales up from bottom) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#26366F',
            transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
            transformOrigin: 'bottom',
            transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 1,
          }}
        />

        {/* Text clipping frame */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            overflow: 'hidden',
            height: '17px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Primary Text Layer (slides up on hover) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transform: isHovered ? 'translateY(-140%)' : 'translateY(0%)',
              opacity: isHovered ? 0 : 1,
              transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.75rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: '#26366F',
              whiteSpace: 'nowrap',
            }}
          >
            <span>{label}</span>
            <Box size={14} color="#12A4DC" />
          </div>

          {/* Secondary Text Layer (slides in from bottom on hover) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transform: isHovered ? 'translateY(0%)' : 'translateY(140%)',
              opacity: isHovered ? 1 : 0,
              transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.75rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: '#FFFFFF',
              whiteSpace: 'nowrap',
            }}
          >
            <span>{label}</span>
            <Box size={14} color="#FFFFFF" />
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export default function ArchitecturalDesign() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const imageClusterRef = useRef(null);

  const [deltaX, setDeltaX] = useState(-560);
  const [currentSlideId, setCurrentSlideId] = useState('01');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Pinned scroll tracking across the 320vh sticky track
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Track viewport visibility of the section
  const isInView = useInView(stageRef, { amount: 0.15 });
  const [slideOneActive, setSlideOneActive] = useState(false);
  const [slideTwoActive, setSlideTwoActive] = useState(false);

  // Synchronize Slide 1 & Slide 2 active state with scroll progression
  useEffect(() => {
    const updateActiveSlides = (prog) => {
      if (!isInView) {
        setSlideOneActive(false);
        setSlideTwoActive(false);
        return;
      }
      if (prog < 0.38) {
        setSlideOneActive(true);
        setSlideTwoActive(false);
      } else if (prog >= 0.44) {
        setSlideOneActive(false);
        setSlideTwoActive(true);
      } else {
        // Between slides: transition gap
        setSlideOneActive(false);
        setSlideTwoActive(false);
      }
    };

    updateActiveSlides(scrollYProgress.get());
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      updateActiveSlides(latest);
    });
    return () => unsubscribe();
  }, [scrollYProgress, isInView]);

  // Calculate dynamic travel distance from right edge to left edge
  useEffect(() => {
    const updateDimensions = () => {
      if (stageRef.current && imageClusterRef.current) {
        const stageW = stageRef.current.offsetWidth;
        const imgW = imageClusterRef.current.offsetWidth;
        setDeltaX(-(stageW - imgW));
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Update active slide counter based on scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest >= 0.48) {
        setCurrentSlideId('02');
      } else {
        setCurrentSlideId('01');
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Gentle 3D mouse tilt
  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  // Interactive click on progress bar to smooth scroll to that phase
  const scrollToSlide = (slideNum) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const sectionTop = rect.top + scrollTop;
    const totalScrollable = sectionRef.current.offsetHeight - window.innerHeight;
    const targetY = slideNum === 1 ? sectionTop : sectionTop + totalScrollable * 0.82;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  // ── Motion Transforms ──

  // 0. Opening entrance zoom-out and blur fade as Section 2 arrives into view
  const imageEntranceScale = useTransform(scrollYProgress, [0, 0.16], [1.25, 1.0]);
  const imageEntranceOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1.0]);
  const imageEntranceBlur = useTransform(scrollYProgress, [0, 0.16], ['blur(12px)', 'blur(0px)']);

  // 1. Image cluster travels smoothly from right to left
  const imageX = useTransform(scrollYProgress, [0.18, 0.76], [0, deltaX]);

  // Subtle 3D perspective turn as images sweep across
  const travelRotateY = useTransform(scrollYProgress, [0.18, 0.47, 0.76], ['0deg', '-3deg', '0deg']);

  // Shape 1 (main vertical polygon):
  // In Slide 1 (Right cluster): shifted right (+130px)
  // In Slide 2 (Left cluster): anchored at far left edge (0px)
  const shapeOneX = useTransform(scrollYProgress, [0.18, 0.76], ['130px', '0px']);

  // Shape 2 (secondary pebble polygon):
  // In Slide 1 (Right cluster): sits at lower-left (x: 0px, y: 165px)
  // In Slide 2 (Left cluster): sits at upper-right (x: 245px, y: 0px) as in reference screenshot
  const shapeTwoX = useTransform(scrollYProgress, [0.18, 0.76], ['0px', '245px']);
  const shapeTwoY = useTransform(scrollYProgress, [0.18, 0.76], ['165px', '0px']);

  // 3. Image crossfade (slowly change in fade while traveling)
  const imageSetOneOpacity = useTransform(scrollYProgress, [0.26, 0.50], [1, 0]);
  const imageSetTwoOpacity = useTransform(scrollYProgress, [0.36, 0.60], [0, 1]);

  // 4. Progress bar animated segment widths and colors
  const segOneWidth = useTransform(scrollYProgress, [0.24, 0.52], ['48px', '22px']);
  const segTwoWidth = useTransform(scrollYProgress, [0.24, 0.52], ['22px', '48px']);
  const segOneBg = useTransform(scrollYProgress, [0.24, 0.52], ['#26366F', 'rgba(38, 54, 111, 0.18)']);
  const segTwoBg = useTransform(scrollYProgress, [0.24, 0.52], ['rgba(38, 54, 111, 0.18)', '#26366F']);

  return (
    <div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        height: '320vh', // Generous sticky scroll track so section stays pinned until scrolling is finished
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* ── Sticky 100vh Viewport: Pinned while scrolling ── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          color: '#26366F',
          padding: '3rem 5%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* ── Futuristic Motion Graphics Background (Boxed CAD Grid, 3D Wireframe Cubes, Lasers) ── */}
        <FuturisticBackground mousePos={mousePos} />
        {/* ── Background Architectural Watermark Label ── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '2.5rem',
            left: '5%',
            fontSize: '0.72rem',
            letterSpacing: '3px',
            fontFamily: 'var(--font-heading)',
            color: 'rgba(38, 54, 111, 0.25)',
            textTransform: 'uppercase',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 10,
          }}
        >
          02 // ARCHITECTURAL DOSSIER
        </div>

        {/* ── Honors / Awwwards Ribbon on Far Right Edge ── */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: '#26366F',
            color: '#FFFFFF',
            padding: '16px 9px',
            borderTopLeftRadius: '6px',
            borderBottomLeftRadius: '6px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            zIndex: 30,
            boxShadow: '0 8px 25px rgba(38, 54, 111, 0.15)',
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              color: '#12A4DC',
            }}
          >
            W.
          </span>
          <span
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontSize: '0.68rem',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              fontWeight: '700',
              fontFamily: 'var(--font-heading)',
              color: '#FFFFFF',
            }}
          >
            Honors
          </span>
        </div>

        {/* ── Main Stage Container ── */}
        <div
          ref={stageRef}
          style={{
            maxWidth: '1440px',
            width: '100%',
            height: '490px',
            position: 'relative',
            zIndex: 5,
          }}
        >
          {/* ══════════════════════════════════════════════════════════════════════
              SLIDE 1 TEXT (LEFT SIDE) — Belgrade Arbor Kinetic Editorial Text Opening
             ══════════════════════════════════════════════════════════════════════ */}
          <motion.div
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              y: '-50%',
              width: 'min(480px, 42vw)',
              pointerEvents: slideOneActive ? 'auto' : 'none',
              zIndex: 15,
            }}
            animate={{
              opacity: slideOneActive ? 1 : 0,
              x: slideOneActive ? 0 : -25,
            }}
            transition={{ duration: 0.85, ease: ARBOR_EASE }}
          >
            {/* Eyebrow Tag: Red rule expands + Chars stagger in slowly */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '1rem',
              }}
            >
              <motion.span
                initial={{ scaleX: 0, opacity: 0 }}
                animate={slideOneActive ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.9, ease: ARBOR_EASE }}
                style={{
                  width: '24px',
                  height: '2px',
                  backgroundColor: '#D2143A',
                  transformOrigin: 'left',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              <ArborCharReveal
                text="ARCHITECTURAL DESIGN"
                active={slideOneActive}
                delay={0.1}
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: '#12A4DC',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                }}
              />
            </div>

            {/* Heading in Trajan Pro Bold: Words rise up slowly with soft blur clearance */}
            <ArborHeadingReveal
              text="ICONIC CANOPY FACADE"
              active={slideOneActive}
              delay={0.28}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.5rem, 2.2vw, 2.1rem)',
                lineHeight: 1.22,
                color: '#26366F',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                marginBottom: '0.85rem',
              }}
            />

            {/* Supporting Text in Times New Roman: Words drift slowly into place */}
            <ArborWordReveal
              text="The visual identity of BlueMoon is defined by an elegant facade inspired by natural canopy forms, a symbol of growth, balance, and longevity."
              active={slideOneActive}
              delay={0.6}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1rem, 1.15vw, 1.15rem)',
                lineHeight: 1.55,
                color: 'rgba(38, 54, 111, 0.82)',
                marginBottom: '2rem',
                maxWidth: '440px',
              }}
            />

            {/* Dual-Layer Magnetic Rolling Button */}
            <ArborButton
              href="#portfolio"
              active={slideOneActive}
              delay={0.95}
              label="EXPLORE IN 3D"
            />
          </motion.div>

          {/* ══════════════════════════════════════════════════════════════════════
              SLIDE 2 TEXT (RIGHT SIDE) — Belgrade Arbor Kinetic Editorial Text Opening
             ══════════════════════════════════════════════════════════════════════ */}
          <motion.div
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              y: '-50%',
              width: 'min(500px, 44vw)',
              pointerEvents: slideTwoActive ? 'auto' : 'none',
              zIndex: 15,
            }}
            animate={{
              opacity: slideTwoActive ? 1 : 0,
              x: slideTwoActive ? 0 : 25,
            }}
            transition={{ duration: 0.85, ease: ARBOR_EASE }}
          >
            {/* Eyebrow Tag: Red rule expands + Chars stagger in slowly */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '1rem',
              }}
            >
              <motion.span
                initial={{ scaleX: 0, opacity: 0 }}
                animate={slideTwoActive ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.9, ease: ARBOR_EASE }}
                style={{
                  width: '24px',
                  height: '2px',
                  backgroundColor: '#D2143A',
                  transformOrigin: 'left',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              <ArborCharReveal
                text="URBAN ECOSYSTEM"
                active={slideTwoActive}
                delay={0.1}
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: '#12A4DC',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                }}
              />
            </div>

            {/* Heading in Trajan Pro Bold: Words rise up slowly with soft blur clearance */}
            <ArborHeadingReveal
              text="CURATED URBAN LIVING"
              active={slideTwoActive}
              delay={0.28}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.5rem, 2.2vw, 2.1rem)',
                lineHeight: 1.22,
                color: '#26366F',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                marginBottom: '0.85rem',
              }}
            />

            {/* Supporting Text in Times New Roman: Words drift slowly into place */}
            <ArborWordReveal
              text="BlueMoon isn't just another addition to the skyline; it's a curated urban ecosystem that evolves with the rhythm of the city."
              active={slideTwoActive}
              delay={0.6}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1rem, 1.15vw, 1.15rem)',
                lineHeight: 1.55,
                color: 'rgba(38, 54, 111, 0.82)',
                marginBottom: '2rem',
                maxWidth: '460px',
              }}
            />

            {/* Dual-Layer Magnetic Rolling Button */}
            <ArborButton
              href="#portfolio"
              active={slideTwoActive}
              delay={0.95}
              label="EXPLORE IN 3D"
            />
          </motion.div>

          {/* ══════════════════════════════════════════════════════════════════════
              IMAGE CLUSTER (GLIDES FROM RIGHT TO LEFT WHILE CROSSFADING IMAGES)
             ══════════════════════════════════════════════════════════════════════ */}
          <motion.div
            ref={imageClusterRef}
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              y: '-50%',
              x: imageX,
              rotateY: travelRotateY,
              scale: imageEntranceScale,
              opacity: imageEntranceOpacity,
              filter: imageEntranceBlur,
              transformOrigin: 'center center',
              width: 'min(580px, 48vw)',
              height: '500px',
              perspective: '1200px',
              zIndex: 20,
            }}
            animate={{
              rotateX: -mousePos.y * 4,
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            {/* ── Main Large Shape 1 (Left-anchored in Slide 2) ── */}
            <motion.div
              style={{
                position: 'absolute',
                left: '0%',
                top: '0%',
                width: '74%',
                height: '100%',
                x: shapeOneX,
                zIndex: 2,
                filter: 'drop-shadow(0 18px 32px rgba(38, 54, 111, 0.16))',
              }}
            >
              <svg
                viewBox="0 0 612 824"
                style={{
                  width: '100%',
                  height: '100%',
                  overflow: 'visible',
                  display: 'block',
                }}
              >
                <defs>
                  <clipPath id="intro-mask-one">
                    <path d="M553.198 0.001L189.96 2.33C163.484 2.5 140.431 20.448 133.781 46.07L1.881 554.296C-5.394 582.328 8.974 611.457 35.647 622.752L499.834 819.32C537.355 835.208 579.21 808.786 580.992 768.087L611.943 60.966C613.404 27.588 586.616 -0.213 553.198 0.001Z" />
                  </clipPath>
                </defs>

                {/* Slide 1 Image: Commercial building facade */}
                <motion.g style={{ opacity: imageSetOneOpacity }}>
                  <image
                    href="/commercial.jpg"
                    xlinkHref="/commercial.jpg"
                    width="612"
                    height="824"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#intro-mask-one)"
                  />
                </motion.g>

                {/* Slide 2 Image: Luxury interior living room (fades in) */}
                <motion.g style={{ opacity: imageSetTwoOpacity }}>
                  <image
                    href="/flats.jpg"
                    xlinkHref="/flats.jpg"
                    width="612"
                    height="824"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#intro-mask-one)"
                  />
                </motion.g>
              </svg>
            </motion.div>

            {/* ── Secondary Shape 2 (Overlapping Upper-Right in Slide 2) ── */}
            <motion.div
              style={{
                position: 'absolute',
                left: '0%',
                top: '10%',
                width: '58%',
                height: '56%',
                x: shapeTwoX,
                y: shapeTwoY,
                zIndex: 3,
                filter: 'drop-shadow(0 16px 28px rgba(38, 54, 111, 0.2))',
              }}
            >
              <svg
                viewBox="0 0 563 730"
                style={{
                  width: '100%',
                  height: '100%',
                  overflow: 'visible',
                  display: 'block',
                }}
              >
                <defs>
                  <clipPath id="intro-mask-two">
                    <path d="M0.001 662.73L0 67.279C0 23.734 40.716 -8.329 82.997 1.921L291.561 52.479C311.134 57.224 327.547 70.507 336.282 88.67L556.309 546.185C575.299 585.673 552.085 632.5 509.182 641.246L80.593 728.624C38.955 737.112 0.001 705.263 0.001 662.73Z" />
                  </clipPath>
                </defs>

                {/* Slide 1 Pebble Image: Hero architecture */}
                <motion.g style={{ opacity: imageSetOneOpacity }}>
                  <image
                    href="/hero.jpg"
                    xlinkHref="/hero.jpg"
                    width="563"
                    height="730"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#intro-mask-two)"
                  />
                </motion.g>

                {/* Slide 2 Pebble Image: Conference / dining room (fades in) */}
                <motion.g style={{ opacity: imageSetTwoOpacity }}>
                  <image
                    href="/villas.jpg"
                    xlinkHref="/villas.jpg"
                    width="563"
                    height="730"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#intro-mask-two)"
                  />
                </motion.g>
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Bottom Interactive Progress Slider (Pinned at Bottom-Left) ── */}
        <div
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '5%',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            zIndex: 30,
          }}
        >
          {/* Active Number Indicator with Belgrade Arbor blur-to-focus flip */}
          <div
            style={{
              position: 'relative',
              minWidth: '22px',
              height: '18px',
              overflow: 'hidden',
            }}
          >
            <motion.span
              key={currentSlideId}
              initial={{ y: '0.8rem', opacity: 0, filter: 'blur(4px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.35, ease: ARBOR_EASE }}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                fontFamily: 'var(--font-heading)',
                color: '#26366F',
                fontWeight: 700,
                fontSize: '0.88rem',
                letterSpacing: '1px',
                display: 'inline-block',
              }}
            >
              {currentSlideId}
            </motion.span>
          </div>

          {/* Clickable and scroll-synchronized track bars */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            <motion.button
              onClick={() => scrollToSlide(1)}
              aria-label="Go to Slide 01"
              style={{
                width: segOneWidth,
                backgroundColor: segOneBg,
                height: '3px',
                borderRadius: '2px',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'background-color 0.3s ease',
              }}
            />
            <motion.button
              onClick={() => scrollToSlide(2)}
              aria-label="Go to Slide 02"
              style={{
                width: segTwoWidth,
                backgroundColor: segTwoBg,
                height: '3px',
                borderRadius: '2px',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'background-color 0.3s ease',
              }}
            />
          </div>

          <span
            style={{
              fontFamily: 'var(--font-body)',
              color: 'rgba(38, 54, 111, 0.45)',
              fontSize: '0.92rem',
              letterSpacing: '1px',
            }}
          >
            02
          </span>
        </div>
      </div>
    </div>
  );
}
