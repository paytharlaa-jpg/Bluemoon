'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header
      id="bluemoon-global-header"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 9999,
        transition: 'all 0.3s ease',
      }}
    >
      {/* ══════════════════════════════════════════════════════════════════════════
          1. HEADER UPSIDE (TOP CYAN BAR)
          Kompally, Hyderabad | Phones | Email | Social Icons | ENQUIRE NOW
          Rolls / slides upwards out of view on scroll, so ONLY the main header is visible
         ══════════════════════════════════════════════════════════════════════════ */}
      <div
        className="header-upside-bar"
        style={{
          width: '100%',
          backgroundColor: '#0088CC', // Vibrant Cyan Blue matching screenshot
          color: '#FFFFFF',
          fontSize: '0.82rem',
          fontWeight: 600,
          fontFamily: 'var(--font-body), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: scrolled ? '0px' : '38px',
          maxHeight: scrolled ? '0px' : '50px',
          opacity: scrolled ? 0 : 1,
          transform: scrolled ? 'translateY(-100%)' : 'translateY(0)',
          pointerEvents: scrolled ? 'none' : 'auto',
          overflow: 'hidden',
          transition: 'max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1), min-height 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'max-height, min-height, opacity, transform',
          boxSizing: 'border-box',
          paddingLeft: 'clamp(1rem, 3.5vw, 3rem)',
          paddingRight: '0px', // Red Enquire Now button flushes against right edge
        }}
      >
        {/* Left Side: Location, Phones & Email */}
        <div
          className="header-upside-left"
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'clamp(10px, 1.6vw, 22px)',
            paddingTop: '6px',
            paddingBottom: '6px',
          }}
        >
          {/* Location Pin */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#FFFFFF',
              letterSpacing: '0.3px',
            }}
          >
            <MapPin size={13} strokeWidth={2.5} style={{ flexShrink: 0 }} />
            <span>Kompally, Hyderabad</span>
          </div>

          {/* Primary Phone */}
          <a
            href="tel:+919849442929"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#FFFFFF',
              textDecoration: 'none',
              letterSpacing: '0.3px',
              transition: 'opacity 0.2s ease',
            }}
            className="hover:opacity-85"
            title="Call +91 9849 44 2929"
          >
            <Phone size={13} strokeWidth={2.5} style={{ flexShrink: 0 }} />
            <span>+91 9849 44 2929</span>
          </a>

          {/* Divider */}
          <span style={{ opacity: 0.65, fontWeight: 300, display: 'inline-block' }}>|</span>

          {/* Secondary Phone */}
          <a
            href="tel:+919553442929"
            style={{
              color: '#FFFFFF',
              textDecoration: 'none',
              letterSpacing: '0.3px',
              transition: 'opacity 0.2s ease',
            }}
            className="hover:opacity-85"
            title="Call +91 9553 44 2929"
          >
            +91 9553 44 2929
          </a>

          {/* Email */}
          <a
            href="mailto:bluemoonbanswada@gmail.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#FFFFFF',
              textDecoration: 'none',
              letterSpacing: '0.3px',
              transition: 'opacity 0.2s ease',
            }}
            className="hover:opacity-85 header-upside-email"
            title="Email BlueMoon Properties"
          >
            <Mail size={13} strokeWidth={2.5} style={{ flexShrink: 0 }} />
            <span>bluemoonbanswada@gmail.com</span>
          </a>
        </div>

        {/* Right Side: Social Media Icons + Red ENQUIRE NOW Button */}
        <div
          className="header-upside-right"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
          }}
        >
          {/* Social Icons */}
          <div
            className="header-upside-socials"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              paddingRight: '16px',
            }}
          >
            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/1QmfXQT6yF/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              style={{ color: '#FFFFFF', display: 'flex', transition: 'transform 0.2s ease, opacity 0.2s' }}
              className="hover:opacity-80 hover:scale-110"
            >
              <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/bluemoon_properties?cplk=NWthemwzcDRoaHYy&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{ color: '#FFFFFF', display: 'flex', transition: 'transform 0.2s ease, opacity 0.2s' }}
              className="hover:opacity-80 hover:scale-110"
            >
              <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/bluemoon-properties-b18b69382?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{ color: '#FFFFFF', display: 'flex', transition: 'transform 0.2s ease, opacity 0.2s' }}
              className="hover:opacity-80 hover:scale-110"
            >
              <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.761-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com/@bluemoonpropertieshyd?si=N_5BdfCL8W4PFu8c"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              style={{ color: '#FFFFFF', display: 'flex', transition: 'transform 0.2s ease, opacity 0.2s' }}
              className="hover:opacity-80 hover:scale-110"
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>

          {/* Solid Red ENQUIRE NOW Button (Exact match from Screenshot) */}
          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('open-quick-enquiry'));
              }
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#D2143A', // Solid Crimson Red
              color: '#FFFFFF',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '0 22px',
              minHeight: '38px',
              height: '38px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              whiteSpace: 'nowrap',
            }}
            className="hover:brightness-110"
          >
            ENQUIRE NOW
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════
          2. MAIN HEADER NAVBAR - EXACTLY AS IN SCREENSHOT
          Solid Navy Blue (#222f80) with 2px Red Bottom Border
          Logo Left | Bold Uppercase Serif Navigation Links Right
         ══════════════════════════════════════════════════════════════════════════ */}
      <nav
        style={{
          width: '100%',
          backgroundColor: '#222f80', // Corporate Deep Navy Blue matching screenshot
          borderBottom: '2px solid #D2143A', // Thin Red line along entire bottom
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
          padding: '0 clamp(1rem, 3.5vw, 3rem)',
          boxSizing: 'border-box',
          minHeight: '72px',
          height: '74px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Left: BlueMoon Properties Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'inline-block' }}>
            <img
              src="/bluemoon-header-logo.png"
              alt="BlueMoon Properties - Since 2002 - Our Identity Is Your Trust"
              style={{
                height: '52px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
                transition: 'transform 0.3s ease',
              }}
              className="hover:scale-102"
            />
          </Link>
        </div>

        {/* Right: Desktop Navigation Links (Bold, Uppercase, White text matching screenshot) */}
        <div
          className="header-desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(18px, 2.2vw, 36px)',
          }}
        >
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.94rem',
              fontWeight: 800,
              letterSpacing: '1.2px',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color 0.25s ease',
            }}
            className="hover:text-[#12A4DC]"
          >
            HOME
          </Link>

          <Link
            href="/about"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.94rem',
              fontWeight: 800,
              letterSpacing: '1.2px',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color 0.25s ease',
            }}
            className="hover:text-[#12A4DC]"
          >
            ABOUT US
          </Link>

          <Link
            href="/properties"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.94rem',
              fontWeight: 800,
              letterSpacing: '1.2px',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color 0.25s ease',
            }}
            className="hover:text-[#12A4DC]"
          >
            PROPERTIES
          </Link>

          <Link
            href="/why-bluemoon"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.94rem',
              fontWeight: 800,
              letterSpacing: '1.2px',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color 0.25s ease',
            }}
            className="hover:text-[#12A4DC]"
          >
            WHY BLUEMOON
          </Link>

          <Link
            href="/gallery"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.94rem',
              fontWeight: 800,
              letterSpacing: '1.2px',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color 0.25s ease',
            }}
            className="hover:text-[#12A4DC]"
          >
            GALLERY
          </Link>

          <Link
            href="/contact"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.94rem',
              fontWeight: 800,
              letterSpacing: '1.2px',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color 0.25s ease',
            }}
            className="hover:text-[#12A4DC]"
          >
            CONTACT US
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
          className="header-mobile-toggle"
          style={{
            display: 'none', // Controlled via CSS media query
            background: 'transparent',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            padding: '8px',
          }}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* ══════════════════════════════════════════════════════════════════════════
          3. MOBILE NAVIGATION DRAWER
         ══════════════════════════════════════════════════════════════════════════ */}
      {menuOpen && (
        <div
          className="header-mobile-drawer"
          style={{
            width: '100%',
            backgroundColor: '#222f80',
            borderBottom: '3px solid #D2143A',
            padding: '24px 20px 30px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
          }}
        >
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.05rem',
              fontWeight: 800,
              letterSpacing: '1.5px',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '8px 0',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            HOME
          </Link>

          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.05rem',
              fontWeight: 800,
              letterSpacing: '1.5px',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '8px 0',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            ABOUT US
          </Link>

          <Link
            href="/properties"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.05rem',
              fontWeight: 800,
              letterSpacing: '1.5px',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '8px 0',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            PROPERTIES
          </Link>

          <Link
            href="/why-bluemoon"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.05rem',
              fontWeight: 800,
              letterSpacing: '1.5px',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '8px 0',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            WHY BLUEMOON
          </Link>

          <Link
            href="/gallery"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.05rem',
              fontWeight: 800,
              letterSpacing: '1.5px',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '8px 0',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            GALLERY
          </Link>

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.05rem',
              fontWeight: 800,
              letterSpacing: '1.5px',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '8px 0',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            CONTACT US
          </Link>

          {/* Quick Enquire button inside drawer */}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('open-quick-enquiry'));
              }
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#D2143A',
              color: '#FFFFFF',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.9rem',
              fontWeight: 800,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '12px 20px',
              borderRadius: '6px',
              marginTop: '4px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(210, 20, 58, 0.4)',
            }}
          >
            ENQUIRE NOW
          </button>

          {/* Direct Phone Call Button */}
          <a
            href="tel:+919849442929"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: '#0088CC',
              color: '#FFFFFF',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              fontWeight: 700,
              textDecoration: 'none',
              padding: '11px 18px',
              borderRadius: '6px',
            }}
          >
            <Phone size={15} />
            <span>+91 9849 44 2929</span>
          </a>

          {/* Location & Secondary Phone */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.7)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={13} color="#0088CC" />
              <span>Kompally, Hyderabad</span>
            </div>
            <a href="tel:+919553442929" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', paddingLeft: '19px' }}>
              Alt: +91 9553 44 2929
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
