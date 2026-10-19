'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  ShieldCheck, 
  Award, 
  Compass, 
  Users, 
  Building2, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  MessageSquare,
  FileText,
  Calendar,
  Sparkles,
  Phone
} from 'lucide-react';

export default function AboutPage() {
  const containerRef = useRef(null);

  // Smooth scroll tracking for top progress indicator & parallax
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const section2Ref = useRef(null);
  const { scrollYProgress: section2Progress } = useScroll({
    target: section2Ref,
    offset: ['start end', 'end start']
  });

  const imgScale = useTransform(section2Progress, [0, 0.5, 1], [1.12, 1, 0.96]);
  const imgY = useTransform(section2Progress, [0, 1], ['-20px', '20px']);

  const milestones = [
    {
      year: '2002',
      title: 'Foundational Genesis in Banswada',
      desc: 'Established in 2002 with a sacred commitment to ethical land transactions, clear agricultural demarcations, and trusted community stewardship across Banswada & Kamareddy.',
    },
    {
      year: '2016',
      title: 'Hyderabad Growth Corridor Expansion',
      desc: 'Ventured into Greater Hyderabad’s thriving North Corridor (Kompally, Medchal) developing high-value gated layouts with modern infrastructure and blacktop avenues.',
    },
    {
      year: '2020',
      title: 'Official TS RERA Accreditation',
      desc: 'Secured official Telangana Real Estate Regulatory Authority certification (TS RERA NO: A02200004138), setting new industry benchmarks in absolute transparency.',
    },
    {
      year: '2023',
      title: 'Ultra-Luxury Villas & Sovereign Land Banks',
      desc: 'Launched bespoke luxury residential villa estates, commercial plazas, and multi-acre sovereign institutional land banking portfolios across ORR & RRR zones.',
    },
    {
      year: '2026+',
      title: 'Global NRI Custodianship & Sustainable Townships',
      desc: 'Pioneering remote global investor wealth management, eco-centric master communities, and cutting-edge digital escrow transparency for clients across 12 countries.',
    },
  ];

  const pillars = [
    {
      icon: <ShieldCheck size={28} style={{ color: '#12A4DC' }} />,
      title: 'Zero Litigation Guarantee',
      desc: 'Every single square yard undergoes 30-year forensic legal scrutiny by senior High Court advocates, verifying encumbrance-free ownership and crystal clear titles.',
    },
    {
      icon: <Compass size={28} style={{ color: '#D2143A' }} />,
      title: 'Growth Corridor Foresight',
      desc: 'We position capital ahead of major government master plans, aligning our land banks with the Regional Ring Road (RRR), ORR junctions, and rapid transit arterials.',
    },
    {
      icon: <Users size={28} style={{ color: '#12A4DC' }} />,
      title: 'Fiduciary NRI Custodianship',
      desc: 'Dedicated concierge services for overseas investors — live drone surveys, power-of-attorney execution, physical boundary protection, and end-to-end repatriation advice.',
    },
  ];

  return (
    <main 
      ref={containerRef}
      style={{ 
        backgroundColor: '#FFFFFF', 
        color: '#222f80', 
        minHeight: '100vh', 
        paddingTop: '92px',
        overflow: 'hidden'
      }}
    >
      {/* ── Fixed Reading Scroll Progress Bar ── */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #D2143A 0%, #12A4DC 100%)',
          transformOrigin: '0%',
          zIndex: 999999,
        }}
      />

      {/* ══════════════════════════════════════════════════════════════════════════
          SECTION 1: HERO & VISIONARY LEGACY (BRIGHT THEME)
         ══════════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(3.5rem, 6vw, 6.5rem) 5% clamp(3rem, 5vw, 5rem) 5%',
          background: 'radial-gradient(circle at 50% 0%, #F0F7FF 0%, #FFFFFF 75%)',
          borderBottom: '1px solid rgba(18, 164, 220, 0.15)',
        }}
      >
        {/* Subtle architectural grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(18, 164, 220, 0.15) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            opacity: 0.6,
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb & RERA Badges */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '1.8rem' }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                backgroundColor: '#FFFFFF',
                borderRadius: '30px',
                border: '1px solid rgba(34, 47, 128, 0.12)',
                fontSize: '0.82rem',
                color: '#475569',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '1px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              }}
            >
              <Link href="/" style={{ color: '#12A4DC', textDecoration: 'none', fontWeight: 700 }}>HOME</Link>
              <span>/</span>
              <span style={{ color: '#222f80', fontWeight: 800 }}>ABOUT US</span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                backgroundColor: 'rgba(210, 20, 58, 0.06)',
                borderRadius: '30px',
                border: '1.5px solid #D2143A',
                fontSize: '0.82rem',
                fontWeight: 800,
                color: '#D2143A',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '1px',
                boxShadow: '0 2px 8px rgba(210, 20, 58, 0.08)',
              }}
            >
              <ShieldCheck size={16} style={{ color: '#D2143A' }} />
              <span>TS RERA NO: A02200004138</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ maxWidth: '960px' }}
          >
            <div
              style={{
                color: '#D2143A',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.88rem',
                fontWeight: 800,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '0.8rem',
              }}
            >
              HERITAGE OF TRUST • GREATER HYDERABAD & TELANGANA
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.3rem, 5.2vw, 4rem)',
                fontWeight: 900,
                letterSpacing: '1px',
                lineHeight: 1.15,
                color: '#222f80',
                margin: '0 0 1.5rem 0',
                textTransform: 'uppercase',
              }}
            >
              The Sovereign Standard In <span style={{ color: '#12A4DC' }}>Real Estate</span> Excellence
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                lineHeight: 1.75,
                color: '#334155',
                margin: '0 0 2.5rem 0',
                maxWidth: '850px',
                fontWeight: 400,
              }}
            >
              Blue Moon Properties is Telangana’s foremost corporate real estate consultancy and development firm.
              Anchored in deep ethical roots in Banswada and expanded across the rapid growth corridors of Greater Hyderabad,
              we safeguard, build, and multiply generational wealth for discerning families and global investors.
            </p>
          </motion.div>

          {/* 4 Trust Metric Cards with Scroll Animation & Bright Hover */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
              marginTop: '1.5rem',
            }}
          >
            {[
              { num: '20+', label: 'Years of Trust & Precision', sub: 'Established 2002 in Telangana', color: '#12A4DC' },
              { num: '200+', label: 'Acres Delivered & Banked', sub: 'High-appreciation strategic tracts', color: '#D2143A' },
              { num: '300+', label: 'HNI & NRI Families Guided', sub: 'Across USA, UK, UAE & India', color: '#12A4DC' },
              { num: '100%', label: 'Clear Title Guarantee', sub: 'TS RERA Registered & Certified', color: '#222f80' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, boxShadow: '0 16px 36px rgba(18, 164, 220, 0.15)' }}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(18, 164, 220, 0.2)',
                  borderTop: `4px solid ${stat.color}`,
                  borderRadius: '12px',
                  padding: '24px 20px',
                  boxShadow: '0 6px 20px rgba(34, 47, 128, 0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
                    fontWeight: 900,
                    color: stat.color,
                    lineHeight: 1,
                    marginBottom: '8px',
                  }}
                >
                  {stat.num}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.94rem',
                    fontWeight: 800,
                    color: '#222f80',
                    letterSpacing: '0.5px',
                    marginBottom: '4px',
                  }}
                >
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.84rem', color: '#64748B' }}>
                  {stat.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════════
          SECTION 2: LEADERSHIP, MISSION & PHILOSOPHY (BRIGHT THEME)
         ══════════════════════════════════════════════════════════════════════════ */}
      <section
        ref={section2Ref}
        style={{
          padding: 'clamp(4.5rem, 7vw, 7.5rem) 5%',
          backgroundColor: '#F8FAFC',
          position: 'relative',
          borderBottom: '1px solid rgba(18, 164, 220, 0.12)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Visual Vignette with Parallax on Scroll */}
          <motion.div 
            style={{ position: 'relative' }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '2px solid rgba(18, 164, 220, 0.2)',
                boxShadow: '0 20px 50px rgba(34, 47, 128, 0.1)',
                backgroundColor: '#FFFFFF',
              }}
            >
              <motion.img
                src="/beyond-property-legacy.jpg"
                alt="Blue Moon Heritage and Corporate Excellence"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                  minHeight: '420px',
                  scale: imgScale,
                  y: imgY,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(34, 47, 128, 0.85) 100%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                }}
              >
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(18, 164, 220, 0.3)',
                    borderRadius: '10px',
                    padding: '18px 22px',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <p
                    style={{
                      fontStyle: 'italic',
                      fontSize: '0.94rem',
                      lineHeight: 1.55,
                      color: '#222f80',
                      margin: '0 0 8px 0',
                      fontWeight: 600,
                    }}
                  >
                    “Land is not a commodity; it is the physical foundation upon which families build freedom, prestige, and generational security.”
                  </p>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      color: '#D2143A',
                      letterSpacing: '1px',
                    }}
                  >
                    BLUE MOON EXECUTIVE COUNCIL
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Mission, Vision & 3 Core Tenets */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <div
              style={{
                color: '#D2143A',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.88rem',
                fontWeight: 800,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '0.8rem',
              }}
            >
              OUR MISSION & PHILOSOPHY
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.9rem, 3.4vw, 3rem)',
                fontWeight: 800,
                lineHeight: 1.25,
                color: '#222f80',
                margin: '0 0 1.5rem 0',
              }}
            >
              Guiding Critical Decisions With Complete Clarity
            </h2>

            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: '#475569',
                marginBottom: '2rem',
              }}
            >
              Every property journey comes with immense financial and emotional weight. Blue Moon was founded to eliminate ambiguity in real estate through forensic due diligence, proactive client consultation, and uncompromised post-purchase custodianship.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {pillars.map((pillar, pIdx) => (
                <motion.div
                  key={pIdx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: pIdx * 0.1 }}
                  whileHover={{ x: 6 }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(18, 164, 220, 0.16)',
                    borderRadius: '12px',
                    padding: '20px 22px',
                    boxShadow: '0 4px 18px rgba(34, 47, 128, 0.04)',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <div 
                    style={{ 
                      flexShrink: 0, 
                      marginTop: '2px',
                      backgroundColor: 'rgba(18, 164, 220, 0.08)',
                      padding: '10px',
                      borderRadius: '10px',
                    }}
                  >
                    {pillar.icon}
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.05rem',
                        fontWeight: 800,
                        color: '#222f80',
                        letterSpacing: '0.5px',
                        marginBottom: '6px',
                      }}
                    >
                      {pillar.title}
                    </h4>
                    <p
                      style={{
                        fontSize: '0.92rem',
                        lineHeight: 1.6,
                        color: '#64748B',
                        margin: 0,
                      }}
                    >
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════════
          SECTION 3: MILESTONE TIMELINE & BROCHURE DOWNLOAD (BRIGHT THEME)
         ══════════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4.5rem, 7vw, 7.5rem) 5%',
          backgroundColor: '#FFFFFF',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 4rem auto' }}>
            <div
              style={{
                color: '#12A4DC',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.88rem',
                fontWeight: 800,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '0.8rem',
              }}
            >
              15-YEAR CHRONOLOGY OF INTEGRITY
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.9rem, 3.5vw, 3rem)',
                fontWeight: 800,
                color: '#222f80',
                margin: '0 0 1.2rem 0',
              }}
            >
              Milestones of Unwavering Excellence
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#64748B', lineHeight: 1.7 }}>
              Over two decades (20+ years since 2002) of transforming raw land potential into protected wealth, prestigious communities, and certified title deeds across Telangana.
            </p>
          </div>

          {/* Connected Scroll Timeline Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '5rem',
            }}
          >
            {milestones.map((item, mIdx) => (
              <motion.div
                key={mIdx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: mIdx * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 16px 36px rgba(34, 47, 128, 0.1)' }}
                style={{
                  backgroundColor: '#F8FAFC',
                  border: '1px solid rgba(18, 164, 220, 0.2)',
                  borderTop: '4px solid #D2143A',
                  borderRadius: '14px',
                  padding: '28px 24px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 6px 20px rgba(34, 47, 128, 0.05)',
                  transition: 'all 0.3s ease',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: 'rgba(18, 164, 220, 0.1)',
                      padding: '4px 14px',
                      borderRadius: '20px',
                      color: '#12A4DC',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      letterSpacing: '1px',
                      marginBottom: '16px',
                    }}
                  >
                    <Calendar size={14} />
                    <span>{item.year}</span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      color: '#222f80',
                      marginBottom: '12px',
                      lineHeight: 1.35,
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.92rem',
                      lineHeight: 1.65,
                      color: '#475569',
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* VIP Action / Brochure Box in Bright Royal Blue / Alabaster */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundColor: '#222f80',
              borderRadius: '20px',
              border: '2px solid #12A4DC',
              padding: 'clamp(2.5rem, 5vw, 4rem)',
              boxShadow: '0 24px 60px rgba(34, 47, 128, 0.25)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '30px',
            }}
          >
            <div style={{ maxWidth: '680px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#D2143A',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  letterSpacing: '1.5px',
                  marginBottom: '10px',
                  backgroundColor: 'rgba(210, 20, 58, 0.15)',
                  padding: '4px 12px',
                  borderRadius: '20px',
                }}
              >
                <Sparkles size={16} />
                <span>OFFICIAL CORPORATE DOSSIER</span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  margin: '0 0 12px 0',
                  lineHeight: 1.25,
                }}
              >
                Download The Blue Moon Corporate Brochure
              </h3>
              <p style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.65, margin: 0 }}>
                Gain comprehensive insights into our active RERA developments, investment yield forecasts, and land banking opportunities across Greater Hyderabad.
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <a
                href="/Brochures/Corporate Brochure.pdf"
                download="BlueMoon_Corporate_Brochure.pdf"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#D2143A',
                  color: '#FFFFFF',
                  padding: '14px 28px',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(210, 20, 58, 0.35)',
                  transition: 'all 0.25s ease',
                }}
                className="hover:scale-105 hover:bg-[#b01030]"
              >
                <Download size={18} />
                <span>Download Brochure (PDF)</span>
              </a>

              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#FFFFFF',
                  color: '#222f80',
                  padding: '14px 28px',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.25s ease',
                }}
                className="hover:bg-[#12A4DC] hover:text-[#FFFFFF]"
              >
                <span>Book Consultation</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
