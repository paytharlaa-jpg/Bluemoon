'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const ASSETS = {
  sky: '/assets/sky-clouds.png',
  heroHouse: '/assets/hero-house.png',
  cloudStrip: '/assets/cloud-strip.png',
};

export default function HeroSection() {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Track scroll through the section container
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Butter-smooth, critically damped spring physics for responsive cinematic motion
  const p = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 26,
    mass: 0.35,
    restDelta: 0.0001,
  });

  // ── 1. Sky & Atmosphere Parallax ──
  const skyY = useTransform(p, [0, 1], ['0%', '15%']);
  const skyScale = useTransform(p, [0, 1], [1.02, 1.15]);

  // ── 2. Ambient Moving Clouds in Hero Section ──
  const midCloudY = useTransform(p, [0, 0.6, 1], ['0%', '-15%', '-30%']);
  const midCloudOpacity = useTransform(p, [0, 0.65, 0.85], [0.75, 0.65, 0]);

  // ── 3. Headline & Branding Copy ──
  // Desktop: Fades as house ascends
  // Mobile: Stays visible with crisp natural readability
  const desktopCopyY = useTransform(p, [0, 0.35], ['0%', '-45%']);
  const copyY = isMobile ? '0%' : desktopCopyY;

  const desktopCopyOpacity = useTransform(p, [0, 0.24], [1, 0]);
  const copyOpacity = isMobile ? 1 : desktopCopyOpacity;

  const copyScale = useTransform(p, [0, 0.35], [1, 0.95]);

  // ── 4. Hero House: Grounded and centered on mobile, ascends on desktop ──
  const desktopVillaY = useTransform(p, [0, 0.52, 1], ['65%', '0%', '-8%']);
  const villaY = isMobile ? '0%' : desktopVillaY;

  const desktopVillaScale = useTransform(p, [0, 0.52, 1], [0.86, 1.06, 1.14]);
  const villaScale = isMobile ? 1 : desktopVillaScale;

  const villaOpacity = useTransform(p, [0, 0.82, 0.96], [1, 1, 0.3]);

  // ── 5. Downside Clouds: Rise from the bottom and COVER the hero section on desktop ──
  const backCloudY = useTransform(p, [0.38, 0.78, 1], ['115%', '10%', '-50%']);
  const backCloudOpacity = useTransform(p, [0.38, 0.55, 1], [0.25, 0.85, 1]);

  const frontCloudY = useTransform(p, [0.42, 0.82, 1], ['118%', '-5%', '-65%']);
  const frontCloudScale = useTransform(p, [0.42, 0.82, 1], [1.02, 1.25, 1.45]);
  const frontCloudOpacity = useTransform(p, [0.42, 0.58, 1], [0.4, 0.95, 1]);

  // Final 100% pure white seamless hand-off veil into Section 2 (desktop)
  const veilOpacity = useTransform(p, [0.88, 0.98], [0, 1]);

  return (
    <section
      id="home"
      ref={ref}
      aria-label="BlueMoon Properties introduction"
      style={{
        position: 'relative',
        width: '100%',
        height: isMobile ? '100svh' : '300vh', // Mobile: 100svh natural view; Desktop: 300vh cinematic runway
        backgroundColor: '#e6f3fa',
      }}
    >
      {/* Pinned Viewport Container (Sticky on desktop, natural smooth scroll on mobile) */}
      <div
        style={{
          position: isMobile ? 'relative' : 'sticky',
          top: 0,
          left: 0,
          height: isMobile ? '100svh' : '100vh',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: '#d8ebf7',
        }}
      >
        {/* ── Layer 1: Sky & Atmospheric Gradient ── */}
        <motion.div
          style={{ y: skyY, scale: skyScale }}
          className="absolute inset-0"
          style={{
            position: 'absolute',
            inset: 0,
            y: skyY,
            scale: skyScale,
            zIndex: 1,
          }}
        >
          <img
            src={ASSETS.sky}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 30%',
              display: 'block',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(216, 235, 247, 0.1) 40%, rgba(255, 255, 255, 0.6) 85%, #FFFFFF 100%)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>

        {/* ── Layer 2: Moving Clouds in the Hero Section (Horizontal Drift) ── */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 5,
            pointerEvents: 'none',
            y: midCloudY,
            opacity: midCloudOpacity,
          }}
        >
          {/* Upper drifting cloud band */}
          <div style={{ position: 'absolute', left: 0, right: 0, top: '10vh' }}>
            <img
              src={ASSETS.cloudStrip}
              alt=""
              loading="lazy"
              className="animate-cloud-drift"
              style={{
                '--drift-duration': '34s',
                width: '160%',
                marginLeft: '-30%',
                maxWidth: 'none',
                opacity: 0.65,
                filter: 'blur(0.5px)',
              }}
            />
          </div>

          {/* Mid-altitude drifting cloud band (flipped horizontal for natural variance) */}
          <div style={{ position: 'absolute', left: 0, right: 0, top: '44vh' }}>
            <img
              src={ASSETS.cloudStrip}
              alt=""
              loading="lazy"
              className="animate-cloud-drift"
              style={{
                '--drift-duration': '48s',
                width: '190%',
                marginLeft: '-45%',
                maxWidth: 'none',
                opacity: 0.45,
                transform: 'scaleX(-1)',
              }}
            />
          </div>
        </motion.div>

        {/* ── Layer 3: Hero Headline & Branding ── */}
        <motion.div
          style={{
            position: 'relative',
            zIndex: 15,
            y: copyY,
            opacity: copyOpacity,
            scale: copyScale,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            paddingTop: isMobile ? '82px' : 'clamp(8rem, 13.5vh, 10.5rem)',
            paddingLeft: '1.2rem',
            paddingRight: '1.2rem',
            pointerEvents: 'none',
          }}
        >
          {/* 1. Brand Monogram Pill: BLUEMOON PROPERTIES • SINCE 2002 */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-panel"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: isMobile ? '8px' : '14px',
              padding: isMobile ? '7px 18px' : '11px 30px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1.5px solid rgba(255, 255, 255, 0.95)',
              boxShadow: '0 12px 38px rgba(38, 54, 111, 0.1), 0 2px 8px rgba(0, 0, 0, 0.04)',
              marginBottom: isMobile ? '0.45rem' : '1rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-heading, "Trajan Pro Bold", "Cinzel", serif)',
                fontSize: isMobile ? 'clamp(0.78rem, 2.8vw, 0.95rem)' : 'clamp(0.92rem, 1.25vw, 1.14rem)',
                fontWeight: 800,
                letterSpacing: isMobile ? '0.14em' : '0.24em',
                color: '#222f80',
                textTransform: 'uppercase',
              }}
            >
              BLUEMOON PROPERTIES
            </span>
            <span
              style={{
                display: 'inline-block',
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: 'var(--sky-blue, #12A4DC)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-body, "Plus Jakarta Sans", sans-serif)',
                fontSize: isMobile ? 'clamp(0.74rem, 2.5vw, 0.88rem)' : 'clamp(0.85rem, 1.1vw, 1.02rem)',
                fontWeight: 700,
                letterSpacing: isMobile ? '0.14em' : '0.22em',
                color: '#12A4DC',
                textTransform: 'uppercase',
              }}
            >
              SINCE 2002
            </span>
          </motion.div>

          {/* 2. Main Visionary Headline: "Beyond Property. A Legacy of Trust." */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.2rem',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'var(--font-heading, "Trajan Pro Bold", "Cinzel", serif)',
                fontWeight: 800,
                fontSize: isMobile ? 'clamp(1.75rem, 6.2vw, 2.2rem)' : 'clamp(2.3rem, 5.5vw, 4.8rem)',
                lineHeight: 1.06,
                letterSpacing: isMobile ? '1px' : 'clamp(1px, 0.35vw, 3px)',
                color: '#222f80',
                margin: 0,
                textShadow: '0 4px 30px rgba(255, 255, 255, 0.92), 0 2px 10px rgba(38, 54, 111, 0.12)',
              }}
            >
              Beyond Property.
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'var(--font-heading, "Trajan Pro Bold", "Cinzel", serif)',
                fontWeight: 700,
                fontSize: isMobile ? 'clamp(1.65rem, 5.8vw, 2.05rem)' : 'clamp(2rem, 5vw, 4.2rem)',
                lineHeight: 1.08,
                letterSpacing: isMobile ? '1px' : 'clamp(1px, 0.35vw, 3px)',
                background: 'linear-gradient(135deg, #222f80 0%, #12A4DC 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0,
                filter: 'drop-shadow(0 4px 20px rgba(255, 255, 255, 0.8))',
              }}
            >
              A Legacy of Trust.
            </motion.h2>
          </div>

          {/* 3. Delicate Architectural Hairline Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65, ease: 'easeOut' }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              width: '180px',
              margin: isMobile ? '0.35rem auto' : '0.85rem auto 0.75rem',
            }}
          >
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(38, 54, 111, 0.3))' }} />
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#12A4DC' }} />
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(38, 54, 111, 0.3))' }} />
          </motion.div>

          {/* 4. Signature Pillar Motto: "OUR IDENTITY IS YOUR TRUST" */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.75 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isMobile ? '5px 18px' : '6px 24px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.92)',
              boxShadow: '0 6px 24px rgba(38, 54, 111, 0.08)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-heading, "Trajan Pro Bold", "Cinzel", serif)',
                fontSize: isMobile ? 'clamp(0.7rem, 2.5vw, 0.85rem)' : 'clamp(0.82rem, 1.2vw, 1.12rem)',
                fontWeight: 800,
                letterSpacing: isMobile ? '2px' : 'clamp(3px, 0.6vw, 6px)',
                color: '#222f80',
                textTransform: 'uppercase',
                margin: 0,
                textShadow: '0 1px 8px rgba(255, 255, 255, 0.95)',
              }}
            >
              OUR IDENTITY IS YOUR TRUST
            </p>
          </motion.div>
        </motion.div>

        {/* ── Layer 4: The Hero House (Stays down at start, rises into center on scroll) ── */}
        <motion.div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            y: villaY,
            scale: villaScale,
            opacity: villaOpacity,
            transformOrigin: 'bottom center',
            pointerEvents: 'none',
          }}
        >
          <img
            src={ASSETS.heroHouse}
            alt="Modern luxury estate emerging above the clouds"
            style={{
              display: 'block',
              margin: '0 auto',
              width: isMobile ? 'min(440px, 94%)' : 'min(1500px, 126%)',
              maxWidth: 'none',
              filter: 'drop-shadow(0 20px 50px rgba(0, 0, 0, 0.28))',
            }}
          />
        </motion.div>

        {/* ── Layer 5: Downside Clouds (Cover the hero section completely as you scroll more on desktop) ── */}
        {/* 5A: Back rising cloud mist */}
        <motion.div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: '-12vh',
            zIndex: 25,
            y: backCloudY,
            opacity: isMobile ? 0 : backCloudOpacity,
            pointerEvents: 'none',
            transformOrigin: 'bottom center',
          }}
        >
          <img
            src={ASSETS.cloudStrip}
            alt=""
            loading="lazy"
            className="animate-cloud-drift"
            style={{
              '--drift-duration': '32s',
              width: '180%',
              marginLeft: '-40%',
              maxWidth: 'none',
              objectPosition: 'center bottom',
              transform: 'scaleX(-1)',
            }}
          />
        </motion.div>

        {/* 5B: Main foreground rising cloud bank + solid white cloud deck beneath */}
        <motion.div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: '-15vh',
            zIndex: 30,
            y: frontCloudY,
            scale: frontCloudScale,
            opacity: isMobile ? 0 : frontCloudOpacity,
            pointerEvents: 'none',
            transformOrigin: 'bottom center',
          }}
        >
          <img
            src={ASSETS.cloudStrip}
            alt=""
            style={{
              width: '100%',
              maxWidth: 'none',
              objectPosition: 'center bottom',
              display: 'block',
            }}
          />
          {/* Billowing pure white fog body extending below the clouds to completely cover the screen */}
          <div
            style={{
              width: '100%',
              height: '140vh',
              backgroundColor: '#FFFFFF',
              marginTop: '-2px',
            }}
          />
        </motion.div>

        {/* ── Layer 6: Final Seamless Hand-Off Veil into Section 2 ── */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 40,
            backgroundColor: '#FFFFFF',
            opacity: isMobile ? 0 : veilOpacity,
            pointerEvents: 'none',
          }}
        />
        
        {/* Bottom soft gradient bleed to guarantee zero gap */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '80px',
            background: 'linear-gradient(to top, #FFFFFF 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)',
            zIndex: 42,
            pointerEvents: 'none',
          }}
        />
      </div>
    </section>
  );
}
