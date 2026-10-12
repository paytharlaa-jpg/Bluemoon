'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  DollarSign,
  ShieldCheck,
  TrendingUp,
  Clock,
  PhoneCall,
  Video,
  FileCheck,
  Plane,
  Building2,
  Lock,
  ArrowUpRight,
  CheckCircle2,
  Send,
  MessageSquare,
} from 'lucide-react';
import FluidRibbonMatrix from './FluidRibbonMatrix';
import RemoteOwnershipPillars from './RemoteOwnershipPillars';

const BRAND = {
  primaryBlue: '#26366F',
  skyBlue: '#12A4DC',
  premiumRed: '#D2143A',
  white: '#FFFFFF',
  offWhite: '#F8FAFD',
};

// Global Currencies and conversion rates against INR (approx baseline)
const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rateToInr: 86.5, flag: '🇺🇸', hub: 'New York / SF' },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham', rateToInr: 23.55, flag: '🇦🇪', hub: 'Dubai / Abu Dhabi' },
  { code: 'GBP', symbol: '£', name: 'British Pound', rateToInr: 109.8, flag: '🇬🇧', hub: 'London' },
  { code: 'EUR', symbol: '€', name: 'Euro', rateToInr: 92.4, flag: '🇪🇺', hub: 'Frankfurt / Paris' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rateToInr: 64.2, flag: '🇸🇬', hub: 'Singapore' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rateToInr: 60.5, flag: '🇨🇦', hub: 'Toronto / Vancouver' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rateToInr: 54.8, flag: '🇦🇺', hub: 'Sydney / Melbourne' },
];

// Global Desks with real-time timezone offsets
const GLOBAL_DESKS = [
  { city: 'NEW YORK', country: 'USA (EST)', offset: -4, status: 'Active Desk', phone: '+1 (800) BLUEMOON' },
  { city: 'LONDON', country: 'UK (GMT)', offset: 1, status: 'Active Desk', phone: '+44 20 7946 0912' },
  { city: 'DUBAI', country: 'UAE (GST)', offset: 4, status: 'Primary Hub', phone: '+971 4 312 8900' },
  { city: 'SINGAPORE', country: 'SGP (SGT)', offset: 8, status: 'APAC Hub', phone: '+65 6789 2300' },
  { city: 'SYDNEY', country: 'AUS (AEST)', offset: 10, status: 'Active Desk', phone: '+61 2 9876 5432' },
];

// 4 Pillars of NRI White-Glove Concierge
const NRI_PILLARS = [
  {
    num: '01',
    title: '100% REMOTE DIGITAL REGISTRATION',
    subtitle: 'Zero Physical Travel Required',
    desc: 'Execute full asset acquisition from your living room overseas. We facilitate Power of Attorney (PoA) validation via Indian Embassies, virtual KYC, biometric registry appointments, and original registered deeds couriered via secure diplomatic vault pouch.',
    icon: Plane,
    points: [
      'Indian Consulate / Embassy PoA Adjudication Assistance',
      'Virtual Notarization & Secure Cloud KYC Vault',
      'Original Registered Sale Deed Delivered via Tracked Courier',
      'Dedicated High-Court Legal Counsel Representing Buyer',
    ],
  },
  {
    num: '02',
    title: 'FEMA & REPATRIATION CERTAINTY',
    subtitle: 'NRE / NRO Seamless Flow',
    desc: '100% compliant with RBI Master Directions and FEMA guidelines. Complete capital repatriation certainty for future asset sales, automated Form 15CA/15CB tax clearances, and double taxation treaty (DTAA) optimization for maximum net returns.',
    icon: ShieldCheck,
    points: [
      'Repatriable NRE Account Investment Routing',
      'Seamless Capital Repatriation Back to Foreign Bank Accounts',
      'Pre-Arranged 15CA & 15CB CA Certification Protocols',
      'Zero Hidden Surcharges or Currency Remittance Penalties',
    ],
  },
  {
    num: '03',
    title: 'AERIAL DRONE TELEMETRY AUDITS',
    subtitle: 'Quarterly 4K Timestamped Surveillance',
    desc: 'Never wonder about on-ground progress. Receive quarterly high-definition drone surveys, 360-degree boundary inspection scans, and milestone progression telemetry pushed directly to your private Blue Moon Sovereign Investor Portal.',
    icon: Building2,
    points: [
      'Quarterly 4K Aerial Drone Surveillance Pushed to Portal',
      'Precision Geo-Tagged Timestamped Boundary Photos',
      'Live Video Walkthroughs with Lead Project Directors',
      '24/7 RFID Guarded Enclave Boundary Protection Guarantee',
    ],
  },
  {
    num: '04',
    title: 'LIFECYCLE ASSET WEALTH DESK',
    subtitle: 'Leasing, Maintenance & Exit Liquidity',
    desc: 'We protect and grow your capital across the entire holding cycle. Our dedicated Wealth Desk handles annual property tax payments, compound fence upkeep, corporate tenant acquisition, and high-yield secondary market liquidation.',
    icon: TrendingUp,
    points: [
      'Complete Property Tax & Municipal Records Administration',
      'Corporate Tenant Acquisition for Commercials & Villas',
      'Secondary Market Resale Liquidity Desk with 0% Brokerage',
      'Quarterly Capital Appreciation & Yield Statement Reports',
    ],
  },
];

export default function NRIInvestmentSection() {
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
  const [foreignAmount, setForeignAmount] = useState(150000); // Foreign currency amount
  const [consultationSubmitted, setConsultationSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'United States',
    assetClass: 'Open Plots & Land Reserves',
  });

  // Calculate equivalent INR in Crores
  const inrTotal = foreignAmount * selectedCurrency.rateToInr;
  const inrCrores = (inrTotal / 10000000).toFixed(2);

  // 5-Year Hyderabad Growth Projection (compounding ~16.8% YoY)
  const fiveYearGrowthRate = 1.168;
  const projectedInr5Yr = (inrTotal * Math.pow(fiveYearGrowthRate, 5) / 10000000).toFixed(2);
  const projectedForeign5Yr = (foreignAmount * Math.pow(fiveYearGrowthRate, 5)).toLocaleString('en-US', {
    maximumFractionDigits: 0,
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setConsultationSubmitted(true);
    setTimeout(() => {
      setConsultationSubmitted(false);
      setFormData({ fullName: '', email: '', phone: '', country: 'United States', assetClass: 'Open Plots & Land Reserves' });
    }, 5000);
  };

  return (
    <section
      id="nri-investors"
      style={{
        position: 'relative',
        padding: '7rem 5%',
        backgroundColor: BRAND.white,
        color: BRAND.primaryBlue,
        overflow: 'hidden',
        borderTop: '1px solid rgba(38, 54, 111, 0.1)',
      }}
    >
      {/* Background Decorative Rings */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(18, 164, 220, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(210, 20, 58, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* ── Section Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 18px',
              backgroundColor: 'rgba(18, 164, 220, 0.08)',
              border: '1px solid rgba(18, 164, 220, 0.25)',
              borderRadius: '50px',
              marginBottom: '1.2rem',
            }}
          >
            <Globe size={14} color={BRAND.skyBlue} />
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.74rem',
                letterSpacing: '3px',
                color: BRAND.primaryBlue,
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              GLOBAL WEALTH DESK // SOVEREIGN DIASPORA PROGRAM
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              color: BRAND.primaryBlue,
              letterSpacing: '1px',
              lineHeight: 1.15,
              margin: '0 auto 1.4rem auto',
              maxWidth: '1050px',
            }}
          >
            NRI & INTERNATIONAL INVESTORS <br />
            <span style={{ color: BRAND.skyBlue }}>SOVEREIGN CAPITAL CONCIERGE</span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)',
              color: 'rgba(38, 54, 111, 0.75)',
              maxWidth: '820px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Engineered exclusively for Non-Resident Indians and global citizens seeking
            institutional-grade land reserves and luxury assets in Hyderabad with 100% remote legal execution,
            FEMA repatriation certainty, and currency arbitrage gains.
          </p>
        </div>

        {/* ── Global Desk Active Clocks Strip (Moving Right to Left in Loop) ── */}
        <div
          style={{
            marginBottom: '4.5rem',
            position: 'relative',
            width: '100%',
          }}
        >
          {/* Subtle Live Badge Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '1.2rem',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 14px',
                borderRadius: '20px',
                backgroundColor: 'rgba(38, 54, 111, 0.05)',
                border: '1px solid rgba(38, 54, 111, 0.1)',
                fontFamily: 'monospace',
                fontSize: '0.74rem',
                fontWeight: 700,
                color: BRAND.primaryBlue,
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)',
                  display: 'inline-block',
                }}
              />
              Global Sovereign Concierge Desks // Live Relays
            </span>
          </div>

          {/* Marquee Scroller (Moving Right to Left in Loop) */}
          <div className="nri-desk-ticker-container">
            <div className="nri-desk-ticker-track">
              {[...GLOBAL_DESKS, ...GLOBAL_DESKS, ...GLOBAL_DESKS, ...GLOBAL_DESKS].map((desk, idx) => (
                <div key={idx} className="nri-desk-card">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.92rem',
                        fontWeight: 900,
                        color: BRAND.primaryBlue,
                        letterSpacing: '0.5px',
                      }}
                    >
                      {desk.city}
                    </span>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        backgroundColor:
                          desk.status.includes('Primary')
                            ? 'rgba(18, 164, 220, 0.12)'
                            : 'rgba(16, 185, 129, 0.12)',
                        color: desk.status.includes('Primary') ? '#0284C7' : '#059669',
                        fontFamily: 'monospace',
                        fontSize: '0.66rem',
                        fontWeight: 700,
                      }}
                    >
                      ● {desk.status}
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: 'rgba(38, 54, 111, 0.65)',
                      marginBottom: '10px',
                      fontWeight: 500,
                    }}
                  >
                    {desk.country}
                  </div>

                  <a
                    href={`tel:${desk.phone.replace(/[^+\d]/g, '')}`}
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: BRAND.skyBlue,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      textDecoration: 'none',
                    }}
                    title={`Call ${desk.city} Desk`}
                  >
                    <PhoneCall size={12} />
                    {desk.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Interactive Multi-Currency Arbitrage Calculator with Borderless 3D Fluid Ribbon ── */}
        <div
          style={{
            position: 'relative',
            backgroundColor: 'rgba(249, 251, 254, 0.78)',
            backdropFilter: 'blur(16px)',
            borderRadius: '28px',
            padding: '3rem',
            border: 'none', // Outline removed as requested
            boxShadow: '0 24px 70px rgba(38, 54, 111, 0.07)',
            marginBottom: '5rem',
            overflow: 'visible',
          }}
        >
          {/* 3D Volumetric Fluid Ribbon (Flowing from Outside the Section into the Box Content) */}
          <FluidRibbonMatrix speed={0.54} opacity={0.92} interactive={true} />

          <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '2rem',
              borderBottom: '1px solid rgba(38, 54, 111, 0.1)',
              paddingBottom: '1.5rem',
            }}
          >
            <div>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.72rem',
                  letterSpacing: '2px',
                  color: BRAND.skyBlue,
                  fontWeight: 700,
                }}
              >
                LIVE WEALTH ARBITRAGE SIMULATOR
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.8rem',
                  color: BRAND.primaryBlue,
                  margin: 0,
                }}
              >
                CROSS-BORDER CURRENCY YIELD MATRIX
              </h3>
            </div>

            {/* Currency Switcher */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {CURRENCIES.map((curr) => {
                const isSelected = curr.code === selectedCurrency.code;
                return (
                  <button
                    key={curr.code}
                    onClick={() => setSelectedCurrency(curr)}
                    style={{
                      cursor: 'pointer',
                      padding: '6px 14px',
                      borderRadius: '30px',
                      border: isSelected ? `2px solid ${BRAND.skyBlue}` : '1px solid rgba(38, 54, 111, 0.15)',
                      backgroundColor: isSelected ? BRAND.primaryBlue : BRAND.white,
                      color: isSelected ? BRAND.white : BRAND.primaryBlue,
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      transition: 'all 0.2s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                    className="hover:scale-105"
                  >
                    <span>{curr.flag}</span>
                    <span>{curr.code}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '2.5rem',
              alignItems: 'center',
            }}
          >
            {/* Input Slider */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.8rem',
                  letterSpacing: '1.5px',
                  color: BRAND.primaryBlue,
                  fontWeight: 700,
                  marginBottom: '10px',
                }}
              >
                PROPOSED CAPITAL ALLOCATION:
              </label>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '10px',
                  marginBottom: '1.2rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2.8rem',
                    fontWeight: 900,
                    color: BRAND.primaryBlue,
                  }}
                >
                  {selectedCurrency.symbol} {foreignAmount.toLocaleString('en-US')}
                </span>
                <span style={{ fontSize: '0.9rem', color: BRAND.skyBlue, fontFamily: 'monospace', fontWeight: 700 }}>
                  ({selectedCurrency.code})
                </span>
              </div>

              <input
                type="range"
                min="50000"
                max="1000000"
                step="25000"
                value={foreignAmount}
                onChange={(e) => setForeignAmount(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: BRAND.skyBlue,
                  cursor: 'pointer',
                  height: '8px',
                  marginBottom: '1rem',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'monospace',
                  fontSize: '0.74rem',
                  color: 'rgba(38, 54, 111, 0.6)',
                }}
              >
                <span>MIN: {selectedCurrency.symbol} 50,000</span>
                <span>MID: {selectedCurrency.symbol} 500,000</span>
                <span>MAX: {selectedCurrency.symbol} 1,000,000+</span>
              </div>
            </div>

            {/* Live Computed Telemetry Output Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '14px',
              }}
            >
              <div
                style={{
                  padding: '1.4rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.88)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(38, 54, 111, 0.12)',
                  boxShadow: '0 8px 24px rgba(38, 54, 111, 0.04)',
                }}
              >
                <span style={{ display: 'block', fontSize: '0.66rem', fontFamily: 'var(--font-heading)', letterSpacing: '1.5px', color: 'rgba(38, 54, 111, 0.6)', marginBottom: '4px' }}>
                  EQUIVALENT DOMESTIC CAPITAL
                </span>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.9rem', fontWeight: 900, color: BRAND.primaryBlue }}>
                  ₹{inrCrores} CR
                </div>
                <span style={{ fontSize: '0.72rem', color: BRAND.skyBlue, fontFamily: 'monospace' }}>
                  @ ₹{selectedCurrency.rateToInr} / {selectedCurrency.code}
                </span>
              </div>

              <div
                style={{
                  padding: '1.4rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.88)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  boxShadow: '0 8px 24px rgba(16, 185, 129, 0.08)',
                }}
              >
                <span style={{ display: 'block', fontSize: '0.66rem', fontFamily: 'var(--font-heading)', letterSpacing: '1.5px', color: '#059669', marginBottom: '4px' }}>
                  PROJECTED 5-YR PORTFOLIO VALUE
                </span>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.9rem', fontWeight: 900, color: '#059669' }}>
                  ₹{projectedInr5Yr} CR
                </div>
                <span style={{ fontSize: '0.72rem', color: BRAND.primaryBlue, fontFamily: 'monospace', fontWeight: 700 }}>
                  ≈ {selectedCurrency.symbol} {projectedForeign5Yr}
                </span>
              </div>

              <div
                style={{
                  padding: '1.4rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.88)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(210, 20, 58, 0.2)',
                  boxShadow: '0 8px 24px rgba(210, 20, 58, 0.06)',
                }}
              >
                <span style={{ display: 'block', fontSize: '0.66rem', fontFamily: 'var(--font-heading)', letterSpacing: '1.5px', color: BRAND.premiumRed, marginBottom: '4px' }}>
                  ANNUAL COMPOUND GROWTH (CAGR)
                </span>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.9rem', fontWeight: 900, color: BRAND.premiumRed }}>
                  +16.8% YoY
                </div>
                <span style={{ fontSize: '0.72rem', color: 'rgba(38, 54, 111, 0.7)', fontFamily: 'monospace' }}>
                  Hyderabad High-Growth Corridor
                </span>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* ── 4 Pillars of Remote Ownership — $100K Cinematic Experience ── */}
        <RemoteOwnershipPillars />

        {/* ── Virtual Consultation Booking Form & Global Priority Desk ── */}
        <div
          style={{
            backgroundColor: BRAND.primaryBlue,
            borderRadius: '28px',
            padding: 'clamp(2rem, 5vw, 4rem)',
            color: BRAND.white,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: '3rem',
            alignItems: 'center',
            boxShadow: '0 30px 90px rgba(38, 54, 111, 0.35)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Glows */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-30%',
              left: '-20%',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(18, 164, 220, 0.25) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div>
            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.74rem',
                letterSpacing: '3px',
                color: BRAND.skyBlue,
                fontWeight: 700,
                marginBottom: '1rem',
              }}
            >
              VIP DIASPORA PRIORITY CONCIERGE
            </span>

            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
                color: BRAND.white,
                lineHeight: 1.15,
                margin: '0 0 1.2rem 0',
              }}
            >
              SCHEDULE A 1-ON-1 <br />
              VIRTUAL SOVEREIGN BRIEFING
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.05rem',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '2rem',
              }}
            >
              Connect directly via Zoom or encrypted Google Meet with our Global Director of NRI Investments.
              Receive customized legal dossiers, drone walkthroughs, and bespoke currency remittance blueprints.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Video size={18} color={BRAND.skyBlue} />
                <span style={{ fontSize: '0.92rem', fontFamily: 'var(--font-body)' }}>
                  Confidential 1-on-1 Zoom / Video Presentation
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Lock size={18} color={BRAND.skyBlue} />
                <span style={{ fontSize: '0.92rem', fontFamily: 'var(--font-body)' }}>
                  Complete Non-Disclosure & Legal Title Transparency
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MessageSquare size={18} color={BRAND.skyBlue} />
                <span style={{ fontSize: '0.92rem', fontFamily: 'var(--font-body)' }}>
                  Direct WhatsApp Access to Managing Partners
                </span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(16px)',
              borderRadius: '20px',
              padding: '2.4rem 2rem',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            {consultationSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '2rem 1rem' }}
              >
                <CheckCircle2 size={48} color={BRAND.skyBlue} style={{ margin: '0 auto 1.2rem auto' }} />
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: BRAND.white, marginBottom: '8px' }}>
                  BRIEFING SCHEDULED
                </h4>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                  Thank you. Our Global Diaspora Director will contact you within 4 business hours via WhatsApp/email with your secure video consultation link.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontFamily: 'var(--font-heading)', letterSpacing: '1px', marginBottom: '6px' }}>
                    YOUR FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: BRAND.white,
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontFamily: 'var(--font-heading)', letterSpacing: '1px', marginBottom: '6px' }}>
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: BRAND.white,
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.95rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontFamily: 'var(--font-heading)', letterSpacing: '1px', marginBottom: '6px' }}>
                      WHATSAPP NUMBER *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: BRAND.white,
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.95rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontFamily: 'var(--font-heading)', letterSpacing: '1px', marginBottom: '6px' }}>
                      COUNTRY OF RESIDENCE *
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        backgroundColor: '#1E2C5B',
                        color: BRAND.white,
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    >
                      <option value="United States">United States</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontFamily: 'var(--font-heading)', letterSpacing: '1px', marginBottom: '6px' }}>
                      PREFERRED ASSET CLASS *
                    </label>
                    <select
                      value={formData.assetClass}
                      onChange={(e) => setFormData({ ...formData, assetClass: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        backgroundColor: '#1E2C5B',
                        color: BRAND.white,
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    >
                      <option value="Open Plots & Land Reserves">Open Plots & Land Reserves</option>
                      <option value="Commercial Landmarks">Commercial Landmarks</option>
                      <option value="Ultra Villas & Estates">Ultra Villas & Estates</option>
                      <option value="Luxury Sky Flats">Luxury Sky Flats</option>
                      <option value="Complete Portfolio Allocation">Complete Portfolio Allocation</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    cursor: 'pointer',
                    marginTop: '10px',
                    padding: '1rem 2rem',
                    borderRadius: '50px',
                    border: 'none',
                    backgroundColor: BRAND.premiumRed,
                    color: BRAND.white,
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.86rem',
                    letterSpacing: '2px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 10px 30px rgba(210, 20, 58, 0.4)',
                    transition: 'all 0.3s ease',
                  }}
                  className="hover:scale-105"
                >
                  <span>REQUEST PRIORITY NRI DOSSIER</span>
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
