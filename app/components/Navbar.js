"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <Link href="/">
          <img
            src="/Blue Moon logo.jpeg"
            alt="BlueMoon Properties"
            style={{
              height: '54px',
              width: 'auto',
              objectFit: 'contain',
              mixBlendMode: 'multiply',
              display: 'block',
            }}
          />
        </Link>
      </div>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link href="/">Home</Link>
        <Link href="/about">About Us</Link>
        <Link href="/properties">Properties</Link>
        <Link href="/why-bluemoon">Why BlueMoon</Link>
        <Link href="/gallery">Gallery</Link>
        <Link href="/contact">Contact Us</Link>
      </div>
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>
    </nav>
  );
}
