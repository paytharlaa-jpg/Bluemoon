'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Building2, Users, Images, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      id="contact"
      style={{
        backgroundColor: '#0A1C3F', // Royal Navy Blue matching screenshot & main navbar
        borderTop: '3px solid #D2143A', // Crimson red accent line at the very top of footer
        color: '#FFFFFF',
        fontFamily: 'var(--font-body), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '4.5rem 5% 2rem 5%',
        position: 'relative',
        zIndex: 10,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '1380px',
          margin: '0 auto',
        }}
      >
        {/* ── 4 Main Footer Columns ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: 'clamp(2rem, 3.5vw, 4rem)',
            alignItems: 'start',
          }}
        >
          {/* Column 1: Brand Logo & Mission */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '10px 18px',
                  borderRadius: '6px',
                  border: '1.5px solid rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  marginBottom: '1.3rem',
                  transition: 'transform 0.25s ease',
                }}
                className="hover:scale-102"
              >
                <img
                  src="/Blue_Moon_logo-removebg-preview.png"
                  alt="BlueMoon Properties"
                  style={{
                    width: '180px',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </Link>

            <p
              style={{
                color: '#FFFFFF',
                fontSize: '0.96rem',
                fontWeight: 600,
                letterSpacing: '0.3px',
                margin: '0 0 0.5rem 0',
                lineHeight: 1.4,
              }}
            >
              Building Trust. Creating Value.
            </p>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.72)',
                fontSize: '0.88rem',
                margin: 0,
                lineHeight: 1.6,
                maxWidth: '280px',
              }}
            >
              Premium real-estate opportunities and professional guidance.
            </p>
          </div>

          {/* Column 2: EXPLORE (With Icons as Requested!) */}
          <div>
            <h4
              style={{
                color: '#FFFFFF',
                fontSize: '0.96rem',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                margin: '0 0 1.4rem 0',
                fontFamily: 'var(--font-heading)',
              }}
            >
              EXPLORE
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <li>
                <Link
                  href="/"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontSize: '0.92rem',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                  }}
                  className="hover:text-[#00A3E0] hover:translate-x-1"
                >
                  <Home size={15} style={{ color: '#00A3E0', flexShrink: 0 }} />
                  <span>Home</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/properties"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontSize: '0.92rem',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                  }}
                  className="hover:text-[#00A3E0] hover:translate-x-1"
                >
                  <Building2 size={15} style={{ color: '#00A3E0', flexShrink: 0 }} />
                  <span>Properties</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontSize: '0.92rem',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                  }}
                  className="hover:text-[#00A3E0] hover:translate-x-1"
                >
                  <Users size={15} style={{ color: '#00A3E0', flexShrink: 0 }} />
                  <span>About Us</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/why-bluemoon"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontSize: '0.92rem',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                  }}
                  className="hover:text-[#00A3E0] hover:translate-x-1"
                >
                  <ShieldCheck size={15} style={{ color: '#00A3E0', flexShrink: 0 }} />
                  <span>Why Bluemoon</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/gallery"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontSize: '0.92rem',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                  }}
                  className="hover:text-[#00A3E0] hover:translate-x-1"
                >
                  <Images size={15} style={{ color: '#00A3E0', flexShrink: 0 }} />
                  <span>Gallery</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontSize: '0.92rem',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                  }}
                  className="hover:text-[#00A3E0] hover:translate-x-1"
                >
                  <Phone size={15} style={{ color: '#00A3E0', flexShrink: 0 }} />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: CONTACT */}
          <div>
            <h4
              style={{
                color: '#FFFFFF',
                fontSize: '0.96rem',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                margin: '0 0 1.4rem 0',
                fontFamily: 'var(--font-heading)',
              }}
            >
              CONTACT
            </h4>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                fontSize: '0.92rem',
              }}
            >
              {/* Location */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  color: '#FFFFFF',
                }}
              >
                <MapPin size={16} style={{ color: '#00A3E0', marginTop: '3px', flexShrink: 0 }} />
                <span>Kompally, Hyderabad</span>
              </div>

              {/* Phone 1 */}
              <a
                href="tel:+919849442929"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                className="hover:text-[#00A3E0]"
              >
                <Phone size={16} style={{ color: '#00A3E0', flexShrink: 0 }} />
                <span>+91 9849 44 2929</span>
              </a>

              {/* Phone 2 */}
              <a
                href="tel:+919553442929"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                className="hover:text-[#00A3E0]"
              >
                <Phone size={16} style={{ color: '#00A3E0', flexShrink: 0 }} />
                <span>+91 9553 44 2929</span>
              </a>

              {/* Email */}
              <a
                href="mailto:bluemoonbanswada@gmail.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  wordBreak: 'break-all',
                  transition: 'color 0.2s ease',
                }}
                className="hover:text-[#00A3E0]"
              >
                <Mail size={16} style={{ color: '#00A3E0', flexShrink: 0 }} />
                <span>bluemoonbanswada@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Column 4: CONNECT */}
          <div>
            <h4
              style={{
                color: '#FFFFFF',
                fontSize: '0.96rem',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                margin: '0 0 1.4rem 0',
                fontFamily: 'var(--font-heading)',
              }}
            >
              CONNECT
            </h4>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{ color: '#FFFFFF', display: 'flex', transition: 'all 0.2s ease' }}
                className="hover:text-[#00A3E0] hover:scale-115"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ color: '#FFFFFF', display: 'flex', transition: 'all 0.2s ease' }}
                className="hover:text-[#00A3E0] hover:scale-115"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{ color: '#FFFFFF', display: 'flex', transition: 'all 0.2s ease' }}
                className="hover:text-[#00A3E0] hover:scale-115"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                style={{ color: '#FFFFFF', display: 'flex', transition: 'all 0.2s ease' }}
                className="hover:text-[#00A3E0] hover:scale-115"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ── Divider Line Matching Screenshot ── */}
        <div
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.18)',
            margin: '3.5rem 0 1.6rem 0',
          }}
        />

        {/* ── Bottom Bar: Copyright Left, Highlighted Outline TS RERA Right ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          {/* Copyright & Legal */}
          <div
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.84rem',
              letterSpacing: '0.2px',
            }}
          >
            <span>&copy; 2026 BlueMoon Properties. All rights reserved. | </span>
            <Link href="#" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }} className="hover:text-white">
              Privacy Policy
            </Link>
            <span> | </span>
            <Link href="#" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }} className="hover:text-white">
              Terms of Service
            </Link>
          </div>

          {/* TS RERA NO: Highlighted with an authoritative outline as requested */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1.5px solid #D2143A', // Highlighted outline
              backgroundColor: 'rgba(210, 20, 58, 0.08)',
              padding: '6px 14px',
              borderRadius: '6px',
              boxShadow: '0 0 14px rgba(210, 20, 58, 0.25)',
              transition: 'all 0.3s ease',
            }}
            className="hover:scale-103"
          >
            <ShieldCheck size={16} style={{ color: '#D2143A', flexShrink: 0 }} />
            <span
              style={{
                color: '#D2143A',
                fontWeight: 800,
                fontSize: '0.86rem',
                letterSpacing: '0.8px',
                fontFamily: 'var(--font-heading)',
              }}
            >
              TS RERA NO: A02200004138
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
