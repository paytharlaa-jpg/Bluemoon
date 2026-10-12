'use client';

import { motion, useScroll, useTransform, useSpring, cubicBezier } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PropertyShowcase from './components/PropertyShowcase';
import ArchitecturalDesign from './components/ArchitecturalDesign';
import ExplodedPlotView from './components/ExplodedPlotView';
import NRIInvestmentSection from './components/NRIInvestmentSection';

const CloudTransition = ({ scrollProgress }) => {
  // Physics-based spring smoothing: transforms discrete mouse-wheel notches into fluid 60/120fps continuous motion
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.5,
    restDelta: 0.0005,
  });

  // Rising upside into the hero section with smooth parallax drift and gentle scale expansion
  const leftY = useTransform(smoothProgress, [0, 0.7, 1.0], ['0px', '-22vh', '-30vh']);
  const leftScale = useTransform(smoothProgress, [0, 0.7, 1.0], [1.0, 1.28, 1.38]);
  const leftOpacity = useTransform(smoothProgress, [0, 0.15, 0.75, 0.95], [0.85, 1.0, 0.9, 0]);

  const middleY = useTransform(smoothProgress, [0, 0.7, 1.0], ['0px', '-28vh', '-36vh']);
  const middleScale = useTransform(smoothProgress, [0, 0.7, 1.0], [1.0, 1.35, 1.45]);
  const middleOpacity = useTransform(smoothProgress, [0, 0.15, 0.75, 0.95], [0.9, 1.0, 0.95, 0]);

  const rightY = useTransform(smoothProgress, [0, 0.7, 1.0], ['0px', '-22vh', '-30vh']);
  const rightScale = useTransform(smoothProgress, [0, 0.7, 1.0], [1.0, 1.28, 1.38]);
  const rightOpacity = useTransform(smoothProgress, [0, 0.15, 0.75, 0.95], [0.85, 1.0, 0.9, 0]);

  // Glowing white light & atmospheric bloom (rendered with GPU radial gradients, zero blur recalculation!)
  const glowY = useTransform(smoothProgress, [0, 0.7, 1.0], ['0px', '-26vh', '-34vh']);
  const glowScale = useTransform(smoothProgress, [0, 0.7, 1.0], [1.0, 1.45, 1.6]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.25, 0.75, 0.95], [0.5, 1.0, 0.95, 0]);

  const fogY = useTransform(smoothProgress, [0, 0.7, 1.0], ['0px', '-26vh', '-34vh']);
  const fogOpacity = useTransform(smoothProgress, [0, 0.3, 0.75, 0.95], [0.35, 1.0, 0.9, 0]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: '-150px',
        left: 0,
        width: '100%',
        height: '500px',
        pointerEvents: 'none',
        zIndex: 30,
        overflow: 'visible',
      }}
    >
      {/* ── Glowing White Light Transition (GPU-accelerated radial gradients, 0ms blur raster lag) ── */}

      {/* 1. Rising white atmospheric wash behind clouds */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-35%',
          left: 0,
          width: '100%',
          height: '170%',
          background: 'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.85) 45%, rgba(18, 164, 220, 0.18) 70%, transparent 100%)',
          y: fogY,
          opacity: fogOpacity,
          zIndex: 1,
          willChange: 'transform, opacity',
          transform: 'translate3d(0, 0, 0)',
          pointerEvents: 'none',
        }}
      />

      {/* 2. Core Glowing White Bloom (GPU fragment shader bloom, no costly blur filter) */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '85vw',
          maxWidth: '1400px',
          height: '400px',
          x: '-50%',
          y: glowY,
          scale: glowScale,
          opacity: glowOpacity,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 25%, rgba(255, 255, 255, 0.7) 50%, rgba(18, 164, 220, 0.22) 72%, transparent 85%)',
          zIndex: 2,
          willChange: 'transform, opacity',
          transform: 'translate3d(0, 0, 0)',
          pointerEvents: 'none',
        }}
      />

      {/* 3. Radiant Horizontal Light Beam across seam */}
      <motion.div
        style={{
          position: 'absolute',
          top: '45%',
          left: '-10%',
          width: '120%',
          height: '220px',
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 35%, rgba(18,164,220,0.25) 65%, transparent 100%)',
          y: glowY,
          opacity: glowOpacity,
          zIndex: 2,
          willChange: 'transform, opacity',
          transform: 'translate3d(0, 0, 0)',
          pointerEvents: 'none',
        }}
      />

      {/* ── 3 Clouds (GPU Hardware Accelerated, zero drop-shadow re-rasterization) ── */}

      {/* Middle Cloud: Center Cloud */}
      <motion.div
        style={{
          position: 'absolute',
          left: '50%',
          top: '0',
          width: '72vw',
          minWidth: '750px',
          maxWidth: '1400px',
          height: '540px',
          x: '-50%',
          y: middleY,
          scale: middleScale,
          opacity: middleOpacity,
          zIndex: 4,
          willChange: 'transform, opacity',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
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
            display: 'block',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      </motion.div>

      {/* Left Side: One Cloud */}
      <motion.div
        style={{
          position: 'absolute',
          left: '-6%',
          top: '30px',
          width: '62vw',
          minWidth: '650px',
          maxWidth: '1200px',
          height: '480px',
          y: leftY,
          scale: leftScale,
          opacity: leftOpacity,
          zIndex: 5,
          willChange: 'transform, opacity',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
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
            display: 'block',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      </motion.div>

      {/* Right Side: One Cloud */}
      <motion.div
        style={{
          position: 'absolute',
          right: '-6%',
          top: '30px',
          width: '62vw',
          minWidth: '650px',
          maxWidth: '1200px',
          height: '480px',
          y: rightY,
          scale: rightScale,
          opacity: rightOpacity,
          zIndex: 5,
          willChange: 'transform, opacity',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
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
            display: 'block',
            transform: 'scaleX(-1)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      </motion.div>
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

  const title = "REDEFINING LUXURY".split(" ");
  
  // Custom easing for premium feel
  const premiumEase = [0.76, 0, 0.24, 1];

  return (
    <main style={{ backgroundColor: '#fff' }}>
      
      {/* 1. Cinematic Hero Section */}
      <section 
        ref={heroRef}
        style={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: 'var(--dark-bg)'
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

        <motion.div 
          style={{ 
            position: 'relative', 
            zIndex: 3, 
            textAlign: 'center',
            opacity: heroOpacity,
            scale: heroScale,
            paddingTop: '5rem'
          }}
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 1 }}
            style={{ 
              color: 'var(--sky-blue)', 
              letterSpacing: '10px', 
              fontSize: '1rem',
              marginBottom: '2rem',
              fontFamily: 'var(--font-heading)',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              textTransform: 'uppercase'
            }}
          >
            BlueMoon Properties
          </motion.p>
          
          <h1 style={{ 
            display: 'flex', 
            gap: '2vw', 
            justifyContent: 'center',
            overflow: 'hidden',
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(3rem, 8vw, 8rem)',
            color: '#fff',
            textTransform: 'uppercase',
            lineHeight: 1.1,
            textShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            {title.map((word, index) => (
              <motion.span
                key={index}
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ 
                  delay: 2.8 + (index * 0.15), 
                  duration: 1.2, 
                  ease: premiumEase 
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 1.5 }}
            style={{ marginTop: '5rem' }}
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
      </section>

      {/* 2. Architectural Design Section — 2 Organic Shaped Images, Editorial Layout, 3D Button & Slider */}
      <section 
        ref={heritageRef}
        style={{ 
          position: 'relative', 
          zIndex: 10, 
          marginTop: '-2px',
          overflow: 'visible',
          backgroundColor: '#FFFFFF',
        }}
      >
        <CloudTransition scrollProgress={heroScroll} />
        <ArchitecturalDesign />
      </section>

      {/* 3. Billion Dollar Property Showcase (Sticky Scroll Parallax) */}
      <PropertyShowcase />

      {/* 4. Exploded View of an Open Plot (Deconstructed Axonometric Blueprint) */}
      <ExplodedPlotView />

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
          <div style={{ position: 'relative', zIndex: 2, background: 'linear-gradient(135deg, rgba(38, 54, 111, 0.9) 0%, rgba(10, 14, 28, 0.95) 100%)', backdropFilter: 'blur(10px)', display: 'flex', flexWrap: 'wrap' }}>
            
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
                  <img src="/Blue Moon logo.jpeg" alt="Logo" style={{ width: '140px', mixBlendMode: 'screen', filter: 'brightness(0) invert(1)', marginBottom: 'auto' }} />
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
