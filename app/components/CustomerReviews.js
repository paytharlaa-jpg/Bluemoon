'use client';

import React from 'react';
import { Star, ShieldCheck, Quote, CheckCircle2 } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Dr. Vikramaditya Reddy',
    role: 'Chief Cardiologist',
    location: 'Dallas, Texas, USA',
    flag: '🇺🇸',
    category: '25-Acre RRR Land Bank',
    rating: 5,
    accent: '#222f80',
    review:
      'Purchasing 25 acres along the Regional Ring Road while sitting in Texas seemed daunting until I engaged BlueMoon. Their live drone surveys, 30-year forensic legal scrutiny, and consular PoA assistance made the transaction effortless. Exceptional integrity.',
  },
  {
    id: 2,
    name: 'Sneha & Rajesh Agarwal',
    role: 'VP Finance & Tech Director',
    location: 'London, United Kingdom',
    flag: '🇬🇧',
    category: 'Ultra Luxury Sovereign Villa',
    rating: 5,
    accent: '#D2143A',
    review:
      'We wanted a generational home in Hyderabad for our annual visits. BlueMoon delivered our 5-BHK luxury villa with immaculate construction quality, manicured landscaping, and zero timeline delay. Their post-purchase custodianship is unmatched.',
  },
  {
    id: 3,
    name: 'Mohammed Tariq Al-Mansoor',
    role: 'Managing Director, DIFC',
    location: 'Dubai, UAE',
    flag: '🇦🇪',
    category: 'Institutional Commercial Plot (12,000 Sq. Yds)',
    rating: 5,
    accent: '#12A4DC',
    review:
      'As an institutional investor from the UAE, legal clarity and land demarcation are non-negotiable. BlueMoon provided certified High Court title opinions and physical perimeter fencing with RCC cornerstones. Outstanding fiduciary service.',
  },
  {
    id: 4,
    name: 'Venkatraman Krishnan',
    role: 'Senior Enterprise Architect',
    location: 'San Jose, California, USA',
    flag: '🇺🇸',
    category: 'Managed Farmland & Eco-Retreat (5 Acres)',
    rating: 5,
    accent: '#222f80',
    review:
      'Being away from India for 18 years, finding reliable land custodians was hard. BlueMoon guided us to fertile, high-yield red soil farmland with drip irrigation and security. Their transparent documentation gave us absolute peace of mind.',
  },
  {
    id: 5,
    name: 'Ananya & Siddharth Roy',
    role: 'Co-Founders, FinTech Group',
    location: 'Bengaluru & Hyderabad, India',
    flag: '🇮🇳',
    category: 'Commercial Hub (Outer Ring Road Corridor)',
    rating: 5,
    accent: '#D2143A',
    review:
      'BlueMoon secured a strategic high-visibility corridor for our upcoming tech campus near the ORR. Their foresighted market intelligence saved us nearly 20% compared to secondary market rates. Truly premier corporate advisory.',
  },
  {
    id: 6,
    name: 'Brigadier K. S. Rao (Retd.)',
    role: 'Veteran Officer & Advisory Trustee',
    location: 'Hyderabad, India',
    flag: '🇮🇳',
    category: 'RERA Gated Community Layout',
    rating: 5,
    accent: '#12A4DC',
    review:
      'Integrity and discipline are what I value most. BlueMoon’s TS RERA accreditation and total transparency in layout sanctions, 60-ft blacktop avenues, and instant registration made my retirement plot investment completely stress-free.',
  },
  {
    id: 7,
    name: 'Lakshmi & Pradeep Nambiar',
    role: 'Executive Directors, Logistics Corp',
    location: 'Singapore',
    flag: '🇸🇬',
    category: 'High-Appreciation Growth Tract (10 Acres)',
    rating: 5,
    accent: '#222f80',
    review:
      'The BlueMoon team executed our entire land acquisition seamlessly via video conference and embassy PoA. In just 2 years, our corridor parcel has appreciated by 42%. They are the undisputed gold standard for NRI investors in Telangana.',
  },
  {
    id: 8,
    name: 'Rameshwar Goud Patlolla',
    role: 'Managing Partner, Agro-Industries',
    location: 'Kamareddy & Nizamabad, India',
    flag: '🇮🇳',
    category: 'Contiguous Industrial Land Parcel (40 Acres)',
    rating: 5,
    accent: '#D2143A',
    review:
      'Consolidating 40 contiguous acres without title conflicts requires deep grassroots trust and legal vetting. BlueMoon has been our family’s primary land partner since their inception in 2002. You can trust them with your eyes closed.',
  },
  {
    id: 9,
    name: 'Dr. Priya & Rohit Mehta',
    role: 'Specialist Consultants',
    location: 'Melbourne, Australia',
    flag: '🇦🇺',
    category: 'Signature Luxury Villa Plot',
    rating: 5,
    accent: '#12A4DC',
    review:
      'Every link document was scanned, timestamped, and accompanied by senior legal vetting before we transferred any token advance. BlueMoon is redefining luxury real estate advisory with genuine transparency, ethics, and care.',
  },
  {
    id: 10,
    name: 'Harpreet Singh Chawla',
    role: 'Managing Director, Supply Chain Fleet',
    location: 'New Delhi, India',
    flag: '🇮🇳',
    category: 'Logistics & Warehousing Hub (15 Acres)',
    rating: 5,
    accent: '#222f80',
    review:
      'High-speed connectivity to the National Highway, 150-ft frontage, and 100% undisputed revenue records. BlueMoon delivered on every promise within the exact committed timeline. Their execution is world-class.',
  },
];

export default function CustomerReviews() {
  // Duplicate array 2 times to ensure a mathematically exact 50% loop from left to right
  const marqueeItems = [...REVIEWS, ...REVIEWS];

  return (
    <section
      id="reviews"
      aria-label="Customer Reviews and Testimonials"
      style={{
        position: 'relative',
        backgroundColor: '#FFFFFF',
        color: '#222f80',
        padding: 'clamp(3.5rem, 6vw, 6rem) 0 clamp(4rem, 7vw, 7rem) 0',
        overflow: 'hidden',
        borderTop: '1px solid rgba(18, 164, 220, 0.15)',
        borderBottom: '1px solid rgba(18, 164, 220, 0.15)',
      }}
    >
      {/* Background Subtle Luxury Ambience */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage:
            'radial-gradient(circle at 10% 20%, rgba(18, 164, 220, 0.04) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(34, 47, 128, 0.05) 0%, transparent 45%)',
        }}
      />

      <div
        style={{
          maxWidth: '1380px',
          margin: '0 auto',
          padding: '0 5%',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Section Header Tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(34, 47, 128, 0.06)',
            border: '1.5px solid rgba(18, 164, 220, 0.3)',
            borderRadius: '50px',
            padding: '8px 20px',
            marginBottom: '1.2rem',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#D2143A',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '2px',
              color: '#222f80',
              textTransform: 'uppercase',
            }}
          >
            CLIENT REVIEWS // VERIFIED FIDUCIARY TRACK RECORD
          </span>
        </div>

        {/* Main Section Title */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 3.6vw, 3.2rem)',
            fontWeight: 800,
            color: '#222f80',
            letterSpacing: '0.5px',
            margin: '0 0 1rem 0',
            textTransform: 'uppercase',
            lineHeight: 1.2,
          }}
        >
          TRUSTED BY 300+ HNI &amp; NRI FAMILIES
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
            color: '#475569',
            maxWidth: '780px',
            margin: '0 auto 2.5rem auto',
            lineHeight: 1.6,
          }}
        >
          Explore authentic experiences from our distinguished diaspora investors, corporate leaders, and land banking partners across the USA, UK, UAE, and India.
        </p>

        {/* Trust Badges Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '3.5rem',
          }}
        >
          {/* Star Rating Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#F8FAFC',
              border: '1px solid rgba(18, 164, 220, 0.25)',
              padding: '8px 18px',
              borderRadius: '8px',
            }}
          >
            <div style={{ display: 'flex', color: '#F59E0B' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#F59E0B" />
              ))}
            </div>
            <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#222f80' }}>
              4.98 / 5.0 RATING
            </span>
          </div>

          {/* TS RERA Certified Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#F8FAFC',
              border: '1px solid rgba(18, 164, 220, 0.25)',
              padding: '8px 18px',
              borderRadius: '8px',
            }}
          >
            <ShieldCheck size={18} style={{ color: '#12A4DC' }} />
            <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#222f80' }}>
              TS RERA NO: A02200004138
            </span>
          </div>

          {/* 100% Clear Title Guarantee */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#F8FAFC',
              border: '1px solid rgba(18, 164, 220, 0.25)',
              padding: '8px 18px',
              borderRadius: '8px',
            }}
          >
            <CheckCircle2 size={18} style={{ color: '#25D366' }} />
            <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#222f80' }}>
              100% CLEAR TITLE GUARANTEE
            </span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════
          INFINITE CONTINUOUS AUTO-SCROLLING TICKER: LEFT SIDE TO RIGHT SIDE
          Slow, continuous, without stopping (infinite loop)
         ══════════════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          padding: '12px 0 24px 0',
          maskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
      >
        <div
          className="reviews-infinite-scroll"
          style={{
            display: 'flex',
            gap: '26px',
            width: 'max-content',
            willChange: 'transform',
          }}
        >
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              style={{
                width: 'min(360px, 86vw)',
                maxWidth: '88vw',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1.5px solid rgba(18, 164, 220, 0.22)',
                borderTop: `4px solid ${item.accent}`,
                padding: '28px 24px',
                boxShadow: '0 10px 30px rgba(34, 47, 128, 0.06), 0 2px 6px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexShrink: 0,
                boxSizing: 'border-box',
                position: 'relative',
              }}
            >
              <div>
                {/* Card Top Row: Star Rating + Verified Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '14px',
                  }}
                >
                  <div style={{ display: 'flex', gap: '3px', color: '#F59E0B' }}>
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="#F59E0B" />
                    ))}
                  </div>

                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      backgroundColor: 'rgba(37, 211, 102, 0.1)',
                      color: '#15803D',
                      border: '1px solid rgba(37, 211, 102, 0.3)',
                      borderRadius: '50px',
                      padding: '3px 10px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.3px',
                      textTransform: 'uppercase',
                    }}
                  >
                    <CheckCircle2 size={12} style={{ color: '#16A34A' }} />
                    Verified Buyer
                  </span>
                </div>

                {/* Property Category Pill */}
                <div
                  style={{
                    backgroundColor: '#F1F5F9',
                    border: '1px solid rgba(18, 164, 220, 0.18)',
                    borderRadius: '6px',
                    padding: '5px 10px',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    color: item.accent,
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                    display: 'inline-block',
                  }}
                >
                  {item.category}
                </div>

                {/* Review Text */}
                <div style={{ position: 'relative', marginBottom: '20px' }}>
                  <Quote
                    size={28}
                    style={{
                      color: 'rgba(18, 164, 220, 0.18)',
                      position: 'absolute',
                      top: '-10px',
                      left: '-6px',
                      zIndex: 0,
                    }}
                  />
                  <p
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      fontSize: '0.94rem',
                      color: '#334155',
                      lineHeight: 1.68,
                      fontStyle: 'italic',
                      margin: 0,
                    }}
                  >
                    &ldquo;{item.review}&rdquo;
                  </p>
                </div>
              </div>

              {/* Client Profile Footer */}
              <div
                style={{
                  borderTop: '1px solid rgba(34, 47, 128, 0.08)',
                  paddingTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                {/* Client Avatar / Initials */}
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: item.accent,
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.86rem',
                    fontWeight: 800,
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(34, 47, 128, 0.2)',
                  }}
                >
                  {item.name
                    .replace('Dr. ', '')
                    .replace('Brigadier ', '')
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>

                {/* Name, Role & Location */}
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.96rem',
                      fontWeight: 800,
                      color: '#222f80',
                      letterSpacing: '0.3px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.name}
                  </div>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginTop: '2px',
                    }}
                  >
                    <span>{item.flag}</span>
                    <span
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.role} • {item.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global CSS for the infinite marquee scrolling from left to right */}
      <style jsx>{`
        @keyframes scrollLeftToRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .reviews-infinite-scroll {
          animation: scrollLeftToRight 65s linear infinite;
        }

        /* Subtle deceleration on mobile touch without stopping */
        @media (max-width: 768px) {
          .reviews-infinite-scroll {
            animation-duration: 50s;
          }
        }
      `}</style>
    </section>
  );
}
