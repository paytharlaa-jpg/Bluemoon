'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue, cubicBezier } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PropertyShowcase from './components/PropertyShowcase';
import CustomerReviews from './components/CustomerReviews';
import ExplodedPlotView from './components/ExplodedPlotView';
import NRIInvestmentSection from './components/NRIInvestmentSection';
import HeronIntroSection from './components/HeronIntroSection';
import HeroSection from './components/HeroSection';

const premiumEase = [0.76, 0, 0.24, 1];

export default function Home() {
  const heritageRef = useRef(null);

  return (
    <main style={{ backgroundColor: '#fff' }}>
      
      {/* 1. Cinematic Parallax Hero Section */}
      <HeroSection />

      {/* 2. Architectural Guidance & Property Advisory Section (Heron Intro Section) */}
      <section id="about" style={{ position: 'relative', zIndex: 20, backgroundColor: '#FFFFFF' }}>
        <HeronIntroSection />
      </section>

      {/* 3. Customer Reviews Section — Auto Scrolling Left to Right (Replacing bluemoon // core 02) */}
      <section 
        id="reviews"
        style={{ 
          position: 'relative', 
          zIndex: 10, 
          marginTop: '-2px',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
        }}
      >
        <CustomerReviews />
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
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 4% clamp(4rem, 8vw, 10rem) 4%', backgroundColor: 'var(--dark-bg)', position: 'relative' }}>
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
              style={{ flex: '1 1 min(100%, 500px)', padding: 'clamp(2.5rem, 5vw, 6rem) clamp(1.4rem, 4vw, 4rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', color: '#fff', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                Download Our Corporate Brochure
              </h2>
              <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--sky-blue)', marginBottom: '2rem' }}></div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
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
                  padding: '1.1rem 2.2rem',
                  borderRadius: '50px',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.88rem',
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
            
            <div style={{ flex: '1 1 min(100%, 380px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(2rem, 4vw, 4rem)' }}>
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
