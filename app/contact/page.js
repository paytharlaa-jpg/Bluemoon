'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  MessageCircle, 
  Send, 
  Globe2, 
  Building2, 
  HelpCircle, 
  ChevronDown, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'Ultra Luxury Villas',
    mode: 'In-Person Office Meeting (Kompally)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  // Top reading scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'How does Blue Moon support remote property purchases for NRIs in the USA, UK, or Gulf?',
      a: 'We offer a turnkey NRI concierge service. We handle 30-year forensic legal scrutiny, high-resolution live drone telemetry of the land, execution of Power of Attorney (PoA) as per Indian Embassy / Consular guidelines, and live video-linked registration. You receive original registered title deeds via insured international courier.',
    },
    {
      q: 'What official legal certifications and TS RERA documentation are provided?',
      a: 'Blue Moon is an officially accredited firm under Telangana Real Estate Regulatory Authority (TS RERA NO: A02200004138). Prior to any token commitment, you are provided with 30-year link documents, Pahani / Khasra revenue extracts, latest Encumbrance Certificate (EC), and a certified title opinion by a senior High Court advocate.',
    },
    {
      q: 'How does Blue Moon ensure physical boundary protection and prevent encroachments?',
      a: 'Every property sold undergoes GPS/GIS coordinate tagging. We install reinforced RCC cornerstones, perimeter chain-link or stone masonry fencing, and display prominent ownership signboards. For bulk land parcels, we conduct quarterly drone inspections and provide video status reports to owners.',
    },
    {
      q: 'Can Blue Moon coordinate private escorted site visits for my family or legal representatives in Hyderabad?',
      a: 'Yes. Our executive concierge team arranges door-to-door luxury transport for your family members, local chartered accountants, or legal advocates. An experienced senior partner accompanies them to inspect the physical layout, approach roads, and surrounding infrastructure.',
    },
    {
      q: 'What is the taxation and repatriation framework for foreign investors purchasing in Telangana?',
      a: 'NRI investments in residential and commercial properties in India are governed by RBI FEMA regulations. Funds can be remitted through normal banking channels via NRE / NRO accounts. Our advisory desk coordinates with specialized chartered accountants to ensure seamless compliance and full repatriation eligibility upon future resale.',
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
          SECTION 1: HERO & VIP CONSULTATION BOOKING SUITE (BRIGHT THEME)
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
              <span style={{ color: '#222f80', fontWeight: 800 }}>CONTACT US</span>
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

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(2.5rem, 5vw, 4.5rem)',
              alignItems: 'start',
            }}
          >
            {/* Left Column: Heading & Quick Dialers */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
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
                DIRECT PRINCIPAL DIALOGUE
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
                Connect With <span style={{ color: '#12A4DC' }}>Senior Leadership</span>
              </h1>

              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                  lineHeight: 1.75,
                  color: '#334155',
                  margin: '0 0 2.5rem 0',
                }}
              >
                We respect your time and the magnitude of your investment decisions. Submit your consultation request or connect immediately with our senior partners via phone or WhatsApp.
              </p>

              {/* Direct Partner Dialing Cards (Bright White with Hover Lift) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '2.5rem' }}>
                <a
                  href="tel:+919849442929"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid rgba(210, 20, 58, 0.25)',
                    borderLeft: '5px solid #D2143A',
                    borderRadius: '12px',
                    padding: '18px 22px',
                    textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(34, 47, 128, 0.05)',
                    transition: 'all 0.25s ease',
                  }}
                  className="hover:scale-102 hover:shadow-lg"
                >
                  <div
                    style={{
                      backgroundColor: 'rgba(210, 20, 58, 0.1)',
                      padding: '14px',
                      borderRadius: '50%',
                      color: '#D2143A',
                    }}
                  >
                    <Phone size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                      Managing Partner Direct Line
                    </div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 900, color: '#222f80' }}>
                      +91 9849 44 2929
                    </div>
                  </div>
                </a>

                <a
                  href="tel:+919553442929"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid rgba(18, 164, 220, 0.25)',
                    borderLeft: '5px solid #12A4DC',
                    borderRadius: '12px',
                    padding: '18px 22px',
                    textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(34, 47, 128, 0.05)',
                    transition: 'all 0.25s ease',
                  }}
                  className="hover:scale-102 hover:shadow-lg"
                >
                  <div
                    style={{
                      backgroundColor: 'rgba(18, 164, 220, 0.1)',
                      padding: '14px',
                      borderRadius: '50%',
                      color: '#12A4DC',
                    }}
                  >
                    <Phone size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                      Executive Advisory Desk
                    </div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 900, color: '#222f80' }}>
                      +91 9553 44 2929
                    </div>
                  </div>
                </a>

                <a
                  href="https://wa.me/919849442929?text=Hello%20Blue%20Moon%20Properties,%20I%20would%20like%20to%20book%20a%20private%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    backgroundColor: '#25D366',
                    color: '#061024',
                    padding: '16px 24px',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(37, 211, 102, 0.3)',
                    transition: 'all 0.25s ease',
                  }}
                  className="hover:scale-102"
                >
                  <MessageCircle size={20} />
                  <span>Instant WhatsApp Direct Chat</span>
                </a>
              </div>
            </motion.div>

            {/* Right Column: Interactive Consultation Booking Form (Bright White with Cyan Border) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '2px solid rgba(18, 164, 220, 0.3)',
                padding: 'clamp(2rem, 4vw, 3rem)',
                boxShadow: '0 20px 60px rgba(34, 47, 128, 0.08)',
              }}
            >
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div
                    style={{
                      width: '68px',
                      height: '68px',
                      backgroundColor: 'rgba(37, 211, 102, 0.15)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem auto',
                      color: '#25D366',
                    }}
                  >
                    <CheckCircle2 size={38} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: '#222f80', marginBottom: '10px' }}>
                    Consultation Request Received
                  </h3>
                  <p style={{ fontSize: '0.96rem', color: '#475569', lineHeight: 1.6, marginBottom: '2rem' }}>
                    Thank you. A senior partner will contact you directly within 2 business hours via your preferred communication channel.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    style={{
                      backgroundColor: '#12A4DC',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '12px 26px',
                      borderRadius: '6px',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ color: '#D2143A', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1.5px', marginBottom: '4px' }}>
                      SCHEDULE APPOINTMENT
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: 900, color: '#222f80', margin: 0 }}>
                      Request A Confidential Consultation
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#222f80', marginBottom: '6px' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Ramesh K."
                        style={{
                          width: '100%',
                          backgroundColor: '#F8FAFC',
                          border: '1.5px solid rgba(34, 47, 128, 0.15)',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          color: '#222f80',
                          fontSize: '0.94rem',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#222f80', marginBottom: '6px' }}>
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 or +1 (USA)"
                          style={{
                            width: '100%',
                            backgroundColor: '#F8FAFC',
                            border: '1.5px solid rgba(34, 47, 128, 0.15)',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            color: '#222f80',
                            fontSize: '0.94rem',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#222f80', marginBottom: '6px' }}>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@email.com"
                          style={{
                            width: '100%',
                            backgroundColor: '#F8FAFC',
                            border: '1.5px solid rgba(34, 47, 128, 0.15)',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            color: '#222f80',
                            fontSize: '0.94rem',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#222f80', marginBottom: '6px' }}>
                        Asset Class of Interest
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        style={{
                          width: '100%',
                          backgroundColor: '#F8FAFC',
                          border: '1.5px solid rgba(34, 47, 128, 0.15)',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          color: '#222f80',
                          fontSize: '0.94rem',
                          outline: 'none',
                          fontWeight: 600,
                        }}
                      >
                        <option value="Ultra Luxury Villas">Ultra Luxury Villas</option>
                        <option value="Luxury Apartments">Luxury Apartments</option>
                        <option value="Open Plots & Layouts">Open Plots & Layouts</option>
                        <option value="Commercial Hubs">Commercial Hubs & Plazas</option>
                        <option value="Bulk Land Parcels">Bulk Land Parcels & Holdings</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#222f80', marginBottom: '6px' }}>
                        Preferred Consultation Mode
                      </label>
                      <select
                        value={formData.mode}
                        onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                        style={{
                          width: '100%',
                          backgroundColor: '#F8FAFC',
                          border: '1.5px solid rgba(34, 47, 128, 0.15)',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          color: '#222f80',
                          fontSize: '0.94rem',
                          outline: 'none',
                          fontWeight: 600,
                        }}
                      >
                        <option value="In-Person Office Meeting (Kompally)">In-Person Meeting: Kompally HQ Office</option>
                        <option value="In-Person Office Meeting (Banswada)">In-Person Meeting: Banswada Regional Office</option>
                        <option value="Escorted Luxury Site Tour">Escorted Luxury Site Inspection</option>
                        <option value="Virtual Video Call (USA/UK/Gulf NRI)">Virtual Video Consultation (NRI Special)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#222f80', marginBottom: '6px' }}>
                        Special Requirements or Message
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Provide details regarding preferred location, budget bracket, or acreage..."
                        style={{
                          width: '100%',
                          backgroundColor: '#F8FAFC',
                          border: '1.5px solid rgba(34, 47, 128, 0.15)',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          color: '#222f80',
                          fontSize: '0.94rem',
                          outline: 'none',
                          resize: 'vertical',
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      style={{
                        backgroundColor: '#D2143A',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '16px',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 6px 20px rgba(210, 20, 58, 0.35)',
                        transition: 'all 0.25s ease',
                      }}
                      className="hover:scale-102 hover:bg-[#b01030]"
                    >
                      <Send size={16} />
                      <span>Submit VIP Consultation Request</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════════
          SECTION 2: OFFICE DESTINATIONS & INTERACTIVE MAP (BRIGHT THEME)
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
                color: '#12A4DC',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.88rem',
                fontWeight: 800,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '0.8rem',
              }}
            >
              PHYSICAL PRESENCE IN TELANGANA
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
              Our Strategic Corporate Offices
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#64748B', lineHeight: 1.7 }}>
              Visit our headquarters in Greater Hyderabad or our regional branch in Banswada to review title documents, master plans, and physical survey dossiers.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              marginBottom: '3rem',
            }}
          >
            {/* Office 1: Hyderabad */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, boxShadow: '0 16px 36px rgba(34, 47, 128, 0.08)' }}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid rgba(210, 20, 58, 0.25)',
                borderTop: '5px solid #D2143A',
                borderRadius: '16px',
                padding: '32px 28px',
                boxShadow: '0 4px 18px rgba(34, 47, 128, 0.04)',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ backgroundColor: 'rgba(210, 20, 58, 0.1)', padding: '12px', borderRadius: '10px', color: '#D2143A' }}>
                  <Building2 size={24} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 900, color: '#222f80', margin: 0 }}>
                  Hyderabad Corporate HQ
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.94rem', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <MapPin size={18} style={{ color: '#12A4DC', flexShrink: 0, marginTop: '2px' }} />
                  <div>Kompally, Greater Hyderabad, Telangana, India</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Phone size={18} style={{ color: '#12A4DC', flexShrink: 0 }} />
                  <div>+91 9849 44 2929 | +91 9553 44 2929</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Mail size={18} style={{ color: '#12A4DC', flexShrink: 0 }} />
                  <div>bluemoonbanswada@gmail.com</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Clock size={18} style={{ color: '#12A4DC', flexShrink: 0 }} />
                  <div>Mon – Sat: 9:00 AM – 7:30 PM | Sun: By Appt.</div>
                </div>
              </div>
            </motion.div>

            {/* Office 2: Banswada */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -6, boxShadow: '0 16px 36px rgba(34, 47, 128, 0.08)' }}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid rgba(18, 164, 220, 0.25)',
                borderTop: '5px solid #12A4DC',
                borderRadius: '16px',
                padding: '32px 28px',
                boxShadow: '0 4px 18px rgba(34, 47, 128, 0.04)',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ backgroundColor: 'rgba(18, 164, 220, 0.1)', padding: '12px', borderRadius: '10px', color: '#12A4DC' }}>
                  <Building2 size={24} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 900, color: '#222f80', margin: 0 }}>
                  Banswada Regional Office
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.94rem', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <MapPin size={18} style={{ color: '#D2143A', flexShrink: 0, marginTop: '2px' }} />
                  <div>Banswada, Kamareddy District, Telangana, India</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Phone size={18} style={{ color: '#D2143A', flexShrink: 0 }} />
                  <div>+91 9849 44 2929 | +91 9553 44 2929</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Mail size={18} style={{ color: '#D2143A', flexShrink: 0 }} />
                  <div>bluemoonbanswada@gmail.com</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldCheck size={18} style={{ color: '#D2143A', flexShrink: 0 }} />
                  <div>TS RERA Accredited Partner: A02200004138</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════════
          SECTION 3: GLOBAL NRI & INVESTOR FAQ ACCORDION (BRIGHT THEME)
         ══════════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4.5rem, 7vw, 7.5rem) 5%',
          backgroundColor: '#FFFFFF',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
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
              INVESTOR CLARITY
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
              Frequently Addressed Investor Questions
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#64748B', lineHeight: 1.7 }}>
              Key legal, operational, and repatriation protocols regarding property acquisitions with Blue Moon Properties.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  style={{
                    backgroundColor: isOpen ? '#F0F7FF' : '#F8FAFC',
                    border: isOpen ? '1.5px solid #12A4DC' : '1px solid rgba(34, 47, 128, 0.1)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? -1 : idx)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'transparent',
                      border: 'none',
                      color: '#222f80',
                      textAlign: 'left',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={20}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                        color: isOpen ? '#12A4DC' : '#64748B',
                        flexShrink: 0,
                      }}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          padding: '0 24px 24px 24px',
                          fontSize: '0.94rem',
                          lineHeight: 1.7,
                          color: '#475569',
                          borderTop: '1px solid rgba(18, 164, 220, 0.15)',
                          paddingTop: '16px',
                        }}
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
