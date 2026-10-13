"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT US', href: '/about' },
  { label: 'PROPERTIES', href: '/properties' },
  { label: 'WHY BLUEMOON', href: '/why-bluemoon' },
  { label: 'GALLERY', href: '/gallery' },
  { label: 'CONTACT US', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <>
      <header
        role="banner"
        className={`navbar ${scrolled ? 'scrolled' : 'transparent-glass'}`}
      >
        {/* Brand Logo Container */}
        <div className="logo-container">
          <Link href="/" className="logo-link" aria-label="BlueMoon Properties Home">
            <div className={`logo-capsule ${scrolled ? 'scrolled' : ''}`}>
              <img
                src="/Blue Moon logo.jpeg"
                alt="BlueMoon Properties"
                className="logo-img"
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.label} className="nav-item">
                  <Link
                    href={item.href}
                    className={`nav-anchor ${isActive ? 'active' : ''} ${scrolled ? 'scrolled' : ''}`}
                  >
                    <span>{item.label}</span>
                    <span className={`nav-underline ${isActive ? 'active' : ''}`} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right CTA Container */}
        <div className="nav-actions">
          <Link
            href="/contact"
            className={`enquire-btn ${scrolled ? 'scrolled' : ''}`}
            aria-label="Enquire Now about Luxury Properties"
          >
            <span>ENQUIRE NOW</span>
            <ArrowUpRight size={15} className="enquire-icon" />
          </Link>

          {/* Accessible Mobile Menu Toggle Button */}
          <button
            type="button"
            className={`menu-toggle-btn ${menuOpen ? 'open' : ''} ${scrolled ? 'scrolled' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={menuOpen}
          >
            <span className="toggle-line line-1" />
            <span className="toggle-line line-2" />
            <span className="toggle-line line-3" />
          </button>
        </div>
      </header>

      {/* Fullscreen Luxury Mobile Navigation Drawer */}
      <div
        className={`mobile-drawer ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Mobile Navigation Menu"
      >
        {/* Ambient Glass Backdrop */}
        <div className="mobile-drawer-backdrop" onClick={() => setMenuOpen(false)} />

        <div className="mobile-drawer-content">
          {/* Top Bar inside Drawer */}
          <div className="mobile-drawer-header">
            <div className="logo-capsule-drawer">
              <img
                src="/Blue Moon logo.jpeg"
                alt="BlueMoon Properties"
                style={{ height: '44px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <button
              type="button"
              className="drawer-close-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close Navigation"
            >
              <span className="drawer-close-x">✕</span>
            </button>
          </div>

          {/* Navigation Links with Numbers */}
          <nav className="mobile-drawer-nav">
            <ul className="mobile-nav-list">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.label} className="mobile-nav-item">
                    <Link
                      href={item.href}
                      className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="mobile-nav-index">0{idx + 1}</span>
                      <span className="mobile-nav-label">{item.label}</span>
                      <ArrowUpRight size={18} className="mobile-nav-arrow" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Drawer CTA & Contact Card */}
          <div className="mobile-drawer-footer">
            <Link
              href="/contact"
              className="mobile-enquire-btn"
              onClick={() => setMenuOpen(false)}
            >
              <span>ENQUIRE NOW</span>
              <ArrowUpRight size={17} />
            </Link>

            <div className="mobile-contact-meta">
              <div className="contact-meta-item">
                <Phone size={14} color="#12A4DC" />
                <span>+91 98765 43210</span>
              </div>
              <div className="contact-meta-item">
                <Mail size={14} color="#12A4DC" />
                <span>invest@bluemoonproperties.com</span>
              </div>
              <div className="contact-meta-item">
                <MapPin size={14} color="#12A4DC" />
                <span>Bangalore, Karnataka, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
