"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <Link href="/">
          <img
            src="/Blue_Moon_logo-removebg-preview.png"
            alt="BlueMoon Properties"
            style={{
              height: '52px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </Link>
      </div>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link href="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
        <Link href="/properties" onClick={() => setMenuOpen(false)}>Properties</Link>
        <Link href="/why-bluemoon" onClick={() => setMenuOpen(false)}>Why BlueMoon</Link>
        <Link href="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
      </div>
      <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>
    </nav>
  );
}
