import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <Link href="/">
            <img
              src="/Blue_Moon_logo-removebg-preview.png"
              alt="BlueMoon Properties"
              style={{
                width: '200px',
                height: 'auto',
                filter: 'brightness(0) invert(1)',
                marginBottom: '1.2rem',
                display: 'block',
              }}
            />
          </Link>
          <p className="footer-tagline">OUR IDENTITY IS YOUR TRUST</p>
          <p className="footer-established">Since 2002</p>
        </div>
        
        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/properties">Properties</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/contact">Contact Us</Link>
        </div>

        <div className="footer-contact">
          <h3>Get In Touch</h3>
          <p>Kompally, Hyderabad</p>
          <p>Email: info@bluemoonpropertieshyd.in</p>
          <p>Phone: +91 99999 99999</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 BlueMoon Properties. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
