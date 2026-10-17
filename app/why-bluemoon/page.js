'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Compass, 
  Search, 
  BookOpen, 
  FileCheck, 
  Zap, 
  Quote, 
  Star, 
  Phone, 
  MessageCircle, 
  ArrowRight,
  MapPin,
  Lock,
  Eye,
  Award,
  Sparkles
} from 'lucide-react';

export default function WhyBluemoonPage() {
  const [activePillar, setActivePillar] = useState(0);

  // Top reading scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const pillars = [
    {
      id: 'observe',
      step: '01',
      title: 'Observe',
      tagline: 'Deep Market Forensics & Satellite Topography',
      desc: 'Before any property enters our portfolio, our geospatial analysis team maps every detail. We inspect 30-year revenue records, high-resolution drone topography, hydrological soil stability, and alignment with Telangana’s Regional Ring Road (RRR) and Master Plan 2031.',
      deliverables: ['30-Year Revenue Lineage (Pahani, Khasra, 1B)', 'Drone 3D Topographic Contour Mapping', 'Government Master Plan Arterial Corridors', 'Hydrological & Environmental Clearance'],
      image: '/why-us-observe.jpg',
    },
    {
      id: 'learn',
      step: '02',
      title: 'Learn',
      tagline: 'Client Wealth Horizons & Family Legacy Goals',
      desc: 'Every investor possesses unique capital horizons. We engage in confidential consultations to understand your wealth objectives — whether you seek high-liquidity capital appreciation, generational agricultural estate preservation, or immediate recurring commercial yields.',
      deliverables: ['Custom Capital Appreciation Horizon Modeling', 'Taxation & NRI Repatriation Structuring', 'Generational Estate Succession Planning', 'Risk Mitigation & Liquidity Stress Tests'],
      image: '/why-us-learn.jpg',
    },
    {
      id: 'advise',
      step: '03',
      title: 'Advise',
      tagline: 'Bespoke Dossier & Transparent Feasibility',
      desc: 'We present fully transparent investment dossiers. No vague promises, no inflated appreciation projections. You receive certified title verification reports from senior High Court advocates, complete infrastructural timelines, and comparative pricing analysis.',
      deliverables: ['Senior High Court Legal Opinion Document', 'Comparative Micro-Market Price Valuations', 'Infrastructure Velocity Milestones', 'Complete Transparent Fee Breakdown'],
      image: '/why-us-advise.jpg',
    },
    {
      id: 'act',
      step: '04',
      title: 'Act',
      tagline: 'Seamless Execution & Perpetual Asset Protection',
      desc: 'From official TS RERA-compliant registry to physical boundary demarcation with reinforced cornerstones and 24/7 security watch, we handle every detail. For remote NRIs, we provide live video streaming of registry and continuous drone monitoring.',
      deliverables: ['Official Sub-Registrar Office Registry Execution', 'Physical Cornerstone Demarcation & Fencing', 'Power of Attorney & Escrow Support for NRIs', 'Quarterly Drone Surveillance & Asset Monitoring'],
      image: '/why-us-act.jpg',
    },
  ];

  const comparison = [
    {
      feature: 'Title Verification Depth',
      bluemoon: '30-Year Forensic Revenue Lineage Scrutiny by High Court Advocates',
      others: 'Superficial 3-year checks or verbal assurances',
    },
    {
      feature: 'TS RERA Accreditation',
      bluemoon: 'Fully Registered & Compliant (TS RERA NO: A02200004138)',
      others: 'Often unregistered brokers operating informally',
    },
    {
      feature: 'Litigation Guarantee',
      bluemoon: '100% Zero-Litigation Certificate with indemnity backing',
      others: 'No legal protection against future boundary disputes',
    },
    {
      feature: 'Fee Structure Transparency',
      bluemoon: 'Zero Hidden Markups; direct developer pricing & transparent terms',
      others: 'Artificially inflated rates with hidden broker cuts',
    },
    {
      feature: 'Remote NRI Custodianship',
      bluemoon: 'Dedicated Power of Attorney, live drone telemetry & physical security',
      others: 'Relationship terminates immediately upon sale execution',
    },
  ];

  const testimonials = [
    {
      name: 'Dr. Venkat Rao K.',
      role: 'Interventional Cardiologist',
      loc: 'Dallas, Texas (USA)',
      text: 'Purchasing 15 acres of land while living 9,000 miles away in Dallas felt daunting. Blue Moon took complete custody of legal scrutiny, boundary fencing, and registry execution. Their transparency is peerless.',
      project: 'Bulk Land Banking & Plotted Estate',
    },
    {
      name: 'Rajesh & Sravani Reddy',
      role: 'Tech Executive & Architect',
      loc: 'San Jose, California (USA)',
      text: 'The Celestial Crest villa in Kompally exceeded our highest architectural standards. The double-height foyer, cantilever master suite, and RERA transparency gave us absolute confidence.',
      project: 'Ultra Luxury Triplex Villa',
    },
    {
      name: 'Mohd. Abdul Qadeer',
      role: 'Managing Director, Gulf Logistics',
      loc: 'Dubai, UAE',
      text: 'Blue Moon’s 4-pillar methodology (Observe, Learn, Advise, Act) is how institutional real estate should be run. Their commercial plaza investment now yields steady rental returns with clear documentation.',
      project: 'Commercial Business Hub Plaza',
    },
  ];

  return (
    <main 
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
          SECTION 1: THE BLUE MOON STANDARD & LEGAL SANCTITY (BRIGHT THEME)
         ══════════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(3.5rem, 6vw, 6.5rem) 5% clamp(3rem, 5vw, 5rem) 5%',
          background: 'radial-gradient(circle at 50% 0%, #F0F7FF 0%, #FFFFFF 75%)',
          borderBottom: '1px solid rgba(18, 164, 220, 0.15)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Breadcrumb & RERA tag */}
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
              <span style={{ color: '#222f80', fontWeight: 800 }}>WHY BLUEMOON</span>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: '960px', marginBottom: '3.5rem' }}
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
              FIDUCIARY RESPONSIBILITY & RERA ACCREDITATION
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.3rem, 5.2vw, 4rem)',
                fontWeight: 900,
                letterSpacing: '1px',
                lineHeight: 1.15,
                color: '#222f80',
                margin: '0 0 1.2rem 0',
                textTransform: 'uppercase',
              }}
            >
              The Uncompromising Standard of <span style={{ color: '#12A4DC' }}>Legal Sanctity</span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                lineHeight: 1.75,
                color: '#334155',
                margin: 0,
              }}
            >
              In an industry too often characterized by ambiguity, Blue Moon Properties stands as a bastion of verified clarity.
              Every acquisition is shielded by forensic legal scrutiny, TS RERA compliance, and an uncompromising commitment to client wealth protection.
            </p>
          </motion.div>

          {/* Comparison Matrix Table (Bright Theme) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '2px solid rgba(18, 164, 220, 0.25)',
              overflow: 'hidden',
              boxShadow: '0 16px 45px rgba(34, 47, 128, 0.08)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 2fr 1.6fr',
                backgroundColor: '#F0F7FF',
                padding: '20px 24px',
                borderBottom: '2px solid rgba(18, 164, 220, 0.3)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.88rem',
                fontWeight: 800,
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              <div style={{ color: '#222f80' }}>Core Parameter</div>
              <div style={{ color: '#D2143A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} style={{ color: '#D2143A' }} />
                <span>The Blue Moon Guarantee</span>
              </div>
              <div style={{ color: '#64748B' }}>Conventional Real Estate</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {comparison.map((row, rIdx) => (
                <div
                  key={rIdx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 2fr 1.6fr',
                    padding: '20px 24px',
                    borderBottom: rIdx !== comparison.length - 1 ? '1px solid rgba(34, 47, 128, 0.08)' : 'none',
                    backgroundColor: rIdx % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.94rem', color: '#222f80' }}>
                    {row.feature}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={18} style={{ color: '#12A4DC', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.94rem', color: '#222f80', fontWeight: 600, lineHeight: 1.5 }}>
                      {row.bluemoon}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <XCircle size={18} style={{ color: '#D2143A', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.5 }}>
                      {row.others}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════════
          SECTION 2: 4-PILLAR METHODOLOGY: OBSERVE, LEARN, ADVISE, ACT (BRIGHT THEME)
         ══════════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4.5rem, 7vw, 7.5rem) 5%',
          backgroundColor: '#F8FAFC',
          position: 'relative',
          borderBottom: '1px solid rgba(18, 164, 220, 0.12)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem auto' }}>
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
              PROPRIETARY HERON ADVISORY CYCLE
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
              Observe. Learn. Advise. Act.
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#64748B', lineHeight: 1.7 }}>
              Inspired by the Heron’s supreme patience, razor-sharp focus, and decisive action — our four-stage advisory cycle guides every property transaction from inception to perpetual protection.
            </p>
          </div>

          {/* Interactive 4-Stage Pill Navigator (Bright White & Red/Cyan) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '14px',
              marginBottom: '3rem',
            }}
          >
            {pillars.map((p, idx) => {
              const isSelected = activePillar === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActivePillar(idx)}
                  style={{
                    backgroundColor: isSelected ? '#12A4DC' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#222f80',
                    border: isSelected ? '1.5px solid #12A4DC' : '1.5px solid rgba(34, 47, 128, 0.12)',
                    borderRadius: '12px',
                    padding: '18px 22px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: isSelected ? '0 8px 25px rgba(18, 164, 220, 0.35)' : '0 4px 15px rgba(0, 0, 0, 0.03)',
                  }}
                  className={!isSelected ? 'hover:bg-slate-50' : ''}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      letterSpacing: '1px',
                      opacity: isSelected ? 0.95 : 0.6,
                      marginBottom: '4px',
                    }}
                  >
                    STAGE {p.step}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.15rem',
                      fontWeight: 900,
                      letterSpacing: '0.5px',
                    }}
                  >
                    {p.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Card Showcase (Bright Porcelain & Cyan/Red Accents) */}
          <motion.div
            key={activePillar}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '2px solid rgba(18, 164, 220, 0.25)',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              boxShadow: '0 20px 60px rgba(34, 47, 128, 0.08)',
            }}
          >
            {/* Left Content */}
            <div style={{ padding: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(18, 164, 220, 0.1)',
                  color: '#12A4DC',
                  padding: '4px 14px',
                  borderRadius: '20px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  letterSpacing: '1px',
                  marginBottom: '1rem',
                }}
              >
                STAGE {pillars[activePillar].step} OF 04
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.7rem, 2.8vw, 2.5rem)',
                  fontWeight: 900,
                  color: '#222f80',
                  margin: '0 0 0.8rem 0',
                }}
              >
                {pillars[activePillar].title}: {pillars[activePillar].tagline}
              </h3>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: '#475569', marginBottom: '2rem' }}>
                {pillars[activePillar].desc}
              </p>

              <div style={{ marginBottom: '2.5rem' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.84rem',
                    fontWeight: 800,
                    color: '#D2143A',
                    letterSpacing: '1.2px',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                  }}
                >
                  Key Advisory Deliverables
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                  {pillars[activePillar].deliverables.map((item, dIdx) => (
                    <div key={dIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={16} style={{ color: '#12A4DC', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.92rem', color: '#222f80', fontWeight: 600 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                <a
                  href="https://wa.me/919849442929?text=Hello%20Blue%20Moon,%20I%20would%20like%20to%20learn%20more%20about%20your%20Methodology%20and%20Advisory."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#D2143A',
                    color: '#FFFFFF',
                    padding: '14px 28px',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(210, 20, 58, 0.35)',
                    transition: 'all 0.25s ease',
                  }}
                  className="hover:scale-105"
                >
                  <MessageCircle size={16} />
                  <span>Consult An Advisor</span>
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div
              style={{
                minHeight: '340px',
                backgroundImage: `url('${pillars[activePillar].image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.2) 60%, rgba(34, 47, 128, 0.3) 100%)',
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════════
          SECTION 3: CLIENT VOICES & LEADERSHIP CONSULTATION (BRIGHT THEME)
         ══════════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4.5rem, 7vw, 7.5rem) 5%',
          backgroundColor: '#FFFFFF',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem auto' }}>
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
              TRUSTED ACROSS 12 COUNTRIES
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
              Voices of Global Investors & Families
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#64748B', lineHeight: 1.7 }}>
              Listen to the experiences of overseas non-resident Indians and corporate leaders who trusted Blue Moon for their most critical property acquisitions in Telangana.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              marginBottom: '4.5rem',
            }}
          >
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, boxShadow: '0 16px 36px rgba(34, 47, 128, 0.08)' }}
                style={{
                  backgroundColor: '#F8FAFC',
                  border: '1.5px solid rgba(18, 164, 220, 0.2)',
                  borderTop: '4px solid #12A4DC',
                  borderRadius: '14px',
                  padding: '30px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 18px rgba(34, 47, 128, 0.04)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={16} fill="#D2143A" color="#D2143A" />
                    ))}
                  </div>

                  <p
                    style={{
                      fontStyle: 'italic',
                      fontSize: '0.98rem',
                      lineHeight: 1.7,
                      color: '#334155',
                      marginBottom: '1.5rem',
                    }}
                  >
                    “{t.text}”
                  </p>
                </div>

                <div style={{ borderTop: '1px solid rgba(34, 47, 128, 0.08)', paddingTop: '16px' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.05rem', color: '#222f80' }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#12A4DC', fontWeight: 600, marginBottom: '2px' }}>
                    {t.role}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#64748B' }}>
                    <MapPin size={13} />
                    <span>{t.loc} • {t.project}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Direct Leadership Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundColor: '#222f80',
              borderRadius: '20px',
              border: '2px solid #D2143A',
              padding: 'clamp(2.5rem, 5vw, 4rem)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '30px',
              boxShadow: '0 24px 60px rgba(34, 47, 128, 0.25)',
            }}
          >
            <div style={{ maxWidth: '680px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: '#12A4DC',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                DIRECT PRINCIPAL ACCESS
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  margin: '0 0 10px 0',
                }}
              >
                Speak Directly With Blue Moon Senior Partners
              </h3>
              <p style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.65, margin: 0 }}>
                We believe high-stakes real estate warrants direct dialogue with the decision-makers. No intermediate call center agents.
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <a
                href="tel:+919849442929"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#D2143A',
                  color: '#FFFFFF',
                  padding: '14px 28px',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(210, 20, 58, 0.4)',
                  transition: 'all 0.25s ease',
                }}
                className="hover:scale-105"
              >
                <Phone size={17} />
                <span>+91 9849 44 2929</span>
              </a>

              <a
                href="https://wa.me/919553442929?text=Hello%20Managing%20Partner,%20I%20would%20like%20a%20direct%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#FFFFFF',
                  color: '#222f80',
                  padding: '14px 28px',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.25s ease',
                }}
                className="hover:bg-[#12A4DC] hover:text-[#FFFFFF]"
              >
                <MessageCircle size={17} />
                <span>WhatsApp Senior Partner</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
