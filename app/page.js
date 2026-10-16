'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue, cubicBezier } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PropertyShowcase from './components/PropertyShowcase';
import ArchitecturalDesign from './components/ArchitecturalDesign';
import ExplodedPlotView from './components/ExplodedPlotView';
import NRIInvestmentSection from './components/NRIInvestmentSection';
import HeronIntroSection from './components/HeronIntroSection';

const CloudTransition = ({ scrollProgress }) => {
  // Ultra-responsive, buttery-smooth physics spring (critically damped, zero jitter/lag)
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.12,
    restDelta: 0.0001,
  });

  // ── Rising Clouds Trajectory: Coming from Section 2 upwards into Hero Section ──
  // At progress 0: Clouds rest down at Section 2 boundary (peeking only slightly along bottom horizon).
  // As user scrolls: Clouds dynamically surge upwards from Section 2 into the Hero section,
  // blanketing the video, headline, and button in a sea of pure white clouds.
  // At progress 1.0: Whole hero is engulfed, seamlessly revealing Section 2.

  // Layer 1: Leading High Background Cloud
  const backCloudY = useTransform(smoothProgress, [0, 0.5, 1.0], ['40px', '-180px', '-450px']);
  const backCloudScale = useTransform(smoothProgress, [0, 0.5, 1.0], [1.02, 1.18, 1.3]);
  const backCloudOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1.0], [0.65, 1.0, 1.0, 0.4]);

  // Layer 2: Left Wing Flanking Cloud (inward rolling drift)
  const leftCloudY = useTransform(smoothProgress, [0, 0.5, 1.0], ['40px', '-160px', '-420px']);
  const leftCloudX = useTransform(smoothProgress, [0, 0.5, 1.0], ['-4vw', '0vw', '4vw']);
  const leftCloudScale = useTransform(smoothProgress, [0, 0.5, 1.0], [1.02, 1.2, 1.32]);
  const leftCloudOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1.0], [0.7, 1.0, 1.0, 0.4]);

  // Layer 3: Right Wing Flanking Cloud (inward rolling drift, flipped)
  const rightCloudY = useTransform(smoothProgress, [0, 0.5, 1.0], ['40px', '-160px', '-420px']);
  const rightCloudX = useTransform(smoothProgress, [0, 0.5, 1.0], ['4vw', '0vw', '-4vw']);
  const rightCloudScale = useTransform(smoothProgress, [0, 0.5, 1.0], [1.02, 1.2, 1.32]);
  const rightCloudOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1.0], [0.7, 1.0, 1.0, 0.4]);

  // Layer 4: Grand Foreground Billowing Cloud (Center Apex)
  const frontCloudY = useTransform(smoothProgress, [0, 0.5, 1.0], ['50px', '-180px', '-460px']);
  const frontCloudScale = useTransform(smoothProgress, [0, 0.5, 1.0], [1.02, 1.22, 1.36]);
  const frontCloudOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1.0], [0.75, 1.0, 1.0, 0.4]);

  // Layer 5: Base Overlap Cloud (Seals lower boundary)
  const baseCloudY = useTransform(smoothProgress, [0, 0.5, 1.0], ['30px', '-130px', '-340px']);
  const baseCloudScale = useTransform(smoothProgress, [0, 0.5, 1.0], [1.02, 1.15, 1.25]);
  const baseCloudOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1.0], [0.8, 1.0, 1.0, 0.4]);

  // Layer 6: Solid White Rising Cloud Deck (Ensures 100% opaque white coverage beneath clouds)
  const fogDeckY = useTransform(smoothProgress, [0, 0.5, 1.0], ['140px', '-120px', '-360px']);
  const fogDeckOpacity = useTransform(smoothProgress, [0, 0.2, 0.7, 1.0], [0.25, 0.95, 1.0, 0.4]);

  // Layer 7: Radiant Sunlight Atmospheric Bloom
  const glowY = useTransform(smoothProgress, [0, 0.5, 1.0], ['40px', '-140px', '-360px']);
  const glowScale = useTransform(smoothProgress, [0, 0.5, 1.0], [1.0, 1.25, 1.45]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1.0], [0.15, 0.9, 0.9, 0.2]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
        overflow: 'hidden',
      }}
    >
      {/* ── 1. Pure White Rising Fog Deck (bridges Section 2 upwards into Hero video) ── */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '-250px',
          left: 0,
          width: '100%',
          height: 'calc(60vh + 250px)',
          background: 'linear-gradient(to top, #FFFFFF 0%, #FFFFFF 35%, rgba(255, 255, 255, 0.9) 60%, rgba(255, 255, 255, 0.3) 80%, transparent 100%)',
          y: fogDeckY,
          opacity: fogDeckOpacity,
          zIndex: 1,
          willChange: 'transform, opacity',
          pointerEvents: 'none',
        }}
      />

      {/* ── 2. Atmospheric Sunlight Radiance & Sky Blue Backlight ── */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '-60px',
          left: '50%',
          width: '100vw',
          maxWidth: '1700px',
          height: '360px',
          x: '-50%',
          y: glowY,
          scale: glowScale,
          opacity: glowOpacity,
          background: 'radial-gradient(ellipse 85% 65% at 50% 60%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.92) 42%, rgba(18, 164, 220, 0.22) 72%, transparent 100%)',
          zIndex: 2,
          willChange: 'transform, opacity',
          pointerEvents: 'none',
        }}
      />

      {/* ── 3. High Leading Cloud (Moved down to fill horizon seamlessly) ── */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '-120px',
          left: '50%',
          width: '90vw',
          minWidth: '900px',
          maxWidth: '1600px',
          height: '420px',
          x: '-50%',
          y: backCloudY,
          scale: backCloudScale,
          opacity: backCloudOpacity,
          zIndex: 3,
          willChange: 'transform, opacity',
          pointerEvents: 'none',
        }}
      >
        <img
          src="/clouds.png"
          alt=""
          loading="eager"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom center',
            display: 'block',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      </motion.div>

      {/* ── 4. Left Flanking Wing Cloud (Rolls inward across screen) ── */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '-120px',
          left: '-10%',
          width: '75vw',
          minWidth: '750px',
          maxWidth: '1400px',
          height: '400px',
          x: leftCloudX,
          y: leftCloudY,
          scale: leftCloudScale,
          opacity: leftCloudOpacity,
          zIndex: 4,
          willChange: 'transform, opacity',
          pointerEvents: 'none',
        }}
      >
        <img
          src="/clouds.png"
          alt=""
          loading="eager"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom center',
            display: 'block',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      </motion.div>

      {/* ── 5. Right Flanking Wing Cloud (Flipped, rolls inward across screen) ── */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '-120px',
          right: '-10%',
          width: '75vw',
          minWidth: '750px',
          maxWidth: '1400px',
          height: '400px',
          x: rightCloudX,
          y: rightCloudY,
          scale: rightCloudScale,
          opacity: rightCloudOpacity,
          zIndex: 4,
          willChange: 'transform, opacity',
          pointerEvents: 'none',
        }}
      >
        <img
          src="/clouds.png"
          alt=""
          loading="eager"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom center',
            display: 'block',
            transform: 'scaleX(-1)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      </motion.div>

      {/* ── 6. Grand Foreground Cloud Crest (Center Apex Billow) ── */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '-130px',
          left: '50%',
          width: '100vw',
          minWidth: '950px',
          maxWidth: '1750px',
          height: '440px',
          x: '-50%',
          y: frontCloudY,
          scale: frontCloudScale,
          opacity: frontCloudOpacity,
          zIndex: 5,
          willChange: 'transform, opacity',
          pointerEvents: 'none',
        }}
      >
        <img
          src="/clouds.png"
          alt=""
          loading="eager"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom center',
            display: 'block',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      </motion.div>

      {/* ── 7. Base Overlap Cloud Bank (Seals bottom horizon) ── */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '-90px',
          left: '50%',
          width: '110vw',
          maxWidth: '1800px',
          height: '360px',
          x: '-50%',
          y: baseCloudY,
          scale: baseCloudScale,
          opacity: baseCloudOpacity,
          zIndex: 6,
          willChange: 'transform, opacity',
          pointerEvents: 'none',
        }}
      >
        <img
          src="/clouds.png"
          alt=""
          loading="eager"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom center',
            display: 'block',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      </motion.div>

      {/* ── 8. Solid Pure White Base Horizon Fill (Completely eliminates any gap into Section 2) ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '180px',
          background: 'linear-gradient(to top, #FFFFFF 0%, #FFFFFF 35%, rgba(255, 255, 255, 0.95) 60%, transparent 100%)',
          zIndex: 7,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default function Home() {
  const heroRef = useRef(null);
  const heritageRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Smooth out hero parallax transforms
  const smoothHeroScroll = useSpring(heroScroll, {
    stiffness: 90,
    damping: 26,
    mass: 0.5,
    restDelta: 0.0005,
  });

  const heroY = useTransform(smoothHeroScroll, [0, 1], ['0%', '40%']);
  const heroOpacity = useTransform(smoothHeroScroll, [0, 0.8], [1, 0]);
  const heroScale = useTransform(smoothHeroScroll, [0, 1], [1, 1.08]);

  // Interactive Negative Mask Cursor Tracking with ultra-smooth spring physics
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  const springX = useSpring(mouseX, { stiffness: 450, damping: 32, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 32, mass: 0.1 });

  const handleHeroMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    if (!isHeroHovered) setIsHeroHovered(true);
  };

  const handleHeroMouseLeave = () => {
    setIsHeroHovered(false);
  };

  const handleHeroTouchMove = (e) => {
    if (!heroRef.current || !e.touches || !e.touches[0]) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set(e.touches[0].clientX - rect.left);
    mouseY.set(e.touches[0].clientY - rect.top);
    setIsHeroHovered(true);
  };

  const line1 = ["OUR", "IDENTITY"];
  const line2 = ["IS", "YOUR", "TRUST"];
  
  // Custom easing for premium feel
  const premiumEase = [0.76, 0, 0.24, 1];

  return (
    <main style={{ backgroundColor: '#fff' }}>
      
      {/* 1. Cinematic Hero Section */}
      <section 
        id="home"
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        onTouchStart={handleHeroTouchMove}
        onTouchMove={handleHeroTouchMove}
        onTouchEnd={handleHeroMouseLeave}
        style={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: 'var(--dark-bg)',
          cursor: 'default',
        }}
      >
        {/* Cinematic video background */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '120%',
            y: heroY,
            zIndex: 1,
          }}
        >
          <video
            autoPlay
            muted
            playsInline
            poster="/hero.jpg"
            onEnded={(e) => e.target.pause()}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.55)',
              display: 'block',
            }}
          >
            <source src="/hero.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        {/* Cinematic dark vignette overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
          pointerEvents: 'none',
        }} />

        {/* ── Interactive Negative Mask Spotlight (Refined Mouse Point Lens) ── */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 'clamp(64px, 8vw, 80px)',
            height: 'clamp(64px, 8vw, 80px)',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            mixBlendMode: 'difference',
            pointerEvents: 'none',
            zIndex: 12,
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
            scale: isHeroHovered ? 1 : 0,
            opacity: isHeroHovered ? 1 : 0,
            transition: 'scale 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.85)',
          }}
        />

        {/* ── Precision Outer Reticle Ring ── */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 'clamp(80px, 10vw, 98px)',
            height: 'clamp(80px, 10vw, 98px)',
            borderRadius: '50%',
            border: '1.5px solid rgba(255, 255, 255, 0.85)',
            mixBlendMode: 'difference',
            pointerEvents: 'none',
            zIndex: 13,
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
            scale: isHeroHovered ? 1 : 0,
            opacity: isHeroHovered ? 1 : 0,
            transition: 'scale 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease',
          }}
        />

        {/* ── Center Reticle Pinpoint Dot ── */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            mixBlendMode: 'difference',
            pointerEvents: 'none',
            zIndex: 14,
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
            scale: isHeroHovered ? 1 : 0,
            opacity: isHeroHovered ? 1 : 0,
          }}
        />

        <motion.div 
          style={{ 
            position: 'relative', 
            zIndex: 3, 
            textAlign: 'center',
            opacity: heroOpacity,
            scale: heroScale,
            paddingTop: 'clamp(5.5rem, 11vh, 7.5rem)',
            width: '100%',
            maxWidth: '1440px',
            margin: '0 auto',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
          }}
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 1 }}
            style={{ 
              color: 'var(--sky-blue)', 
              letterSpacing: 'clamp(6px, 1.2vw, 12px)', 
              fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)',
              marginBottom: '1.8rem',
              fontFamily: 'var(--font-heading)',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              textTransform: 'uppercase'
            }}
          >
            BlueMoon Properties
          </motion.p>
          
          {/* Main Headline: "OUR IDENTITY IS YOUR TRUST" with Negative Mask interaction */}
          <h1 style={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(0.2rem, 1vw, 0.8rem)',
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.3rem, 6.2vw, 6.5rem)',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            lineHeight: 1.05,
            letterSpacing: 'clamp(2px, 0.4vw, 6px)',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            userSelect: 'none',
            padding: '0 0.5rem',
          }}>
            {/* Line 1: OUR IDENTITY */}
            <div style={{ display: 'flex', gap: 'clamp(0.6vw, 1.6vw, 2.4vw)', justifyContent: 'center', overflow: 'hidden' }}>
              {line1.map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ 
                    delay: 2.8 + (index * 0.14), 
                    duration: 1.2, 
                    ease: premiumEase 
                  }}
                  style={{ display: 'inline-block' }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Line 2: IS YOUR TRUST */}
            <div style={{ display: 'flex', gap: 'clamp(0.6vw, 1.6vw, 2.4vw)', justifyContent: 'center', overflow: 'hidden' }}>
              {line2.map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ 
                    delay: 3.1 + (index * 0.14), 
                    duration: 1.2, 
                    ease: premiumEase 
                  }}
                  style={{ display: 'inline-block' }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.6, duration: 1.5 }}
            style={{ marginTop: 'clamp(2.8rem, 5vw, 4.5rem)' }}
          >
            <Link href="/portfolio" style={{
              color: '#fff',
              borderBottom: '1px solid rgba(255,255,255,0.3)',
              paddingBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              fontSize: '0.9rem',
              transition: 'all 0.4s ease',
            }}
            className="hover:border-white hover:text-white"
            >
              Explore Portfolio
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Volumetric Cloud Transition: Contained inside Hero bottom boundary, rises on scroll, zero bleed into Section 2 ── */}
        <CloudTransition scrollProgress={heroScroll} />
      </section>

      {/* 2. Architectural Guidance & Property Advisory Section (Heron Intro Section) */}
      <section id="about" style={{ position: 'relative', zIndex: 20, backgroundColor: '#FFFFFF' }}>
        <HeronIntroSection />
      </section>

      {/* 3. Architectural Design Section — Why BlueMoon */}
      <section 
        id="why-us"
        ref={heritageRef}
        style={{ 
          position: 'relative', 
          zIndex: 10, 
          marginTop: '-2px',
          overflow: 'visible',
          backgroundColor: '#FFFFFF',
        }}
      >
        <ArchitecturalDesign />
      </section>

      {/* 4. Billion Dollar Property Showcase (Sticky Scroll Parallax) */}
      <div id="properties">
        <PropertyShowcase />
      </div>

      {/* 5. Architectural Blueprint (5 Master Portfolios Deconstructed 3D Isometric Dossiers) */}
      <div id="gallery">
        <ExplodedPlotView />
      </div>

      {/* 5. NRI & International Investors (Global Diaspora Sovereign Wealth Desk) */}
      <NRIInvestmentSection />

      {/* 6. Brochure Download Section (Billion Dollar Design) */}
      <section style={{ padding: '5rem 5% 10rem 5%', backgroundColor: 'var(--dark-bg)', position: 'relative' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0, 0, 0, 0.5)' }}>
          {/* Background Image Parallax effect */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <Image src="/hero.jpg" alt="Brochure Background" fill style={{ objectFit: 'cover' }} />
          </div>
          
          {/* Frosted Glass Overlay */}
          <div style={{ position: 'relative', zIndex: 2, background: 'linear-gradient(135deg, rgba(38, 54, 111, 0.92) 0%, rgba(38, 54, 111, 0.98) 100%)', backdropFilter: 'blur(10px)', display: 'flex', flexWrap: 'wrap' }}>
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: premiumEase }}
              style={{ flex: '1 1 500px', padding: '6rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: '#fff', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                Download Our Corporate Brochure
              </h2>
              <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--sky-blue)', marginBottom: '2rem' }}></div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '3rem' }}>
                Discover our legacy of trust. Explore an exclusive portfolio of premium residential and commercial opportunities, detailed floor plans, and investment insights in our comprehensive digital brochure.
              </p>
              
              <a 
                href="/Brochures/Corporate%20Brochure.pdf" 
                download="BlueMoon_Corporate_Brochure.pdf" 
                target="_blank"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '15px',
                  backgroundColor: 'var(--premium-red)',
                  color: '#fff',
                  padding: '1.2rem 2.5rem',
                  borderRadius: '50px',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  boxShadow: '0 10px 30px rgba(210, 20, 58, 0.3)',
                  transition: 'all 0.4s ease',
                  alignSelf: 'flex-start'
                }}
                className="hover:scale-105 clickable group"
                onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 15px 40px rgba(210, 20, 58, 0.5)'}
                onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 10px 30px rgba(210, 20, 58, 0.3)'}
              >
                Download PDF
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s' }} className="group-hover:translate-y-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </a>
            </motion.div>
            
            <div style={{ flex: '1 1 400px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem' }}>
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2, ease: premiumEase }}
                style={{ 
                  width: '100%', 
                  maxWidth: '320px', 
                  aspectRatio: '1 / 1.4', 
                  backgroundColor: '#fff', 
                  borderRadius: '10px', 
                  boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Mock Brochure Cover inside the 3D box */}
                <Image src="/hero.jpg" alt="Brochure Cover" fill style={{ objectFit: 'cover', opacity: 0.9 }} />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(38,54,111,0.2), rgba(38,54,111,0.95))', display: 'flex', flexDirection: 'column', padding: '2.5rem', color: '#fff' }}>
                  <img src="/Blue_Moon_logo-removebg-preview.png" alt="Logo" style={{ width: '150px', filter: 'brightness(0) invert(1)', marginBottom: 'auto' }} />
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', lineHeight: 1.1 }}>Corporate<br/>Brochure</h3>
                    <div style={{ width: '40px', height: '2px', backgroundColor: 'var(--premium-red)', marginTop: '1rem', marginBottom: '1rem' }}></div>
                    <p style={{ color: 'var(--sky-blue)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px' }}>2026 Edition</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
