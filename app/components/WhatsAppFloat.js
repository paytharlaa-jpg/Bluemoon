'use client';

import React, { useState } from 'react';

export default function WhatsAppFloat() {
  const [isHovered, setIsHovered] = useState(false);

  // BlueMoon Properties Owner WhatsApp contact number
  const phoneNumber = '919849442929';
  const prefilledMessage = encodeURIComponent(
    'Hello BlueMoon Properties, I would like to book a consultant for property guidance.'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${prefilledMessage}`;

  return (
    <aside
      id="whatsapp-floating-action"
      aria-label="Contact BlueMoon Properties on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      {/* Interactive Tooltip Callout */}
      <div
        style={{
          backgroundColor: '#222f80',
          color: '#FFFFFF',
          padding: '8px 14px',
          borderRadius: '8px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(18, 164, 220, 0.4)',
          fontFamily: 'var(--font-heading)',
          fontSize: '0.78rem',
          fontWeight: 700,
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateX(0)' : 'translateX(10px)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#25D366',
            boxShadow: '0 0 8px #25D366',
          }}
        />
        Book A Consultant
      </div>

      {/* Pulsing Ripple Ring */}
      <div
        style={{
          position: 'relative',
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          className="whatsapp-radar-pulse"
          style={{
            position: 'absolute',
            inset: '-6px',
            borderRadius: '50%',
            backgroundColor: 'rgba(37, 211, 102, 0.4)',
            pointerEvents: 'none',
          }}
        />

        {/* Floating WhatsApp Action Anchor Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          title="Chat on WhatsApp with BlueMoon Owner - Book a Consultant"
          id="btn-whatsapp-consultant"
          style={{
            position: 'relative',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#25D366',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isHovered
              ? '0 12px 32px rgba(37, 211, 102, 0.6), 0 4px 12px rgba(0, 0, 0, 0.2)'
              : '0 8px 24px rgba(37, 211, 102, 0.42), 0 2px 8px rgba(0, 0, 0, 0.15)',
            transform: isHovered ? 'scale(1.1) translateY(-2px)' : 'scale(1) translateY(0)',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            textDecoration: 'none',
            zIndex: 2,
          }}
        >
          {/* Official WhatsApp Vector Logo */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.403 5.638A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.2 4.488L3 21l4.646-1.219a8.936 8.936 0 0 0 4.405 1.156h.004c4.948 0 8.978-4.028 8.98-8.979 0-2.399-.933-4.656-2.632-6.32zM12.054 19.42h-.003a7.434 7.434 0 0 1-3.791-1.037l-.272-.161-2.816.738.752-2.744-.177-.282a7.427 7.427 0 0 1-1.139-3.957c.002-4.108 3.345-7.451 7.456-7.451 1.99 0 3.86.776 5.267 2.184a7.404 7.404 0 0 1 2.181 5.27c-.002 4.109-3.346 7.452-7.458 7.452zm4.09-5.586c-.225-.113-1.328-.656-1.534-.731-.205-.075-.355-.112-.505.113-.15.225-.58.731-.711.881-.131.15-.262.169-.487.056-.225-.113-.949-.35-1.808-1.115-.668-.596-1.12-1.332-1.251-1.557-.131-.225-.014-.347.098-.459.102-.102.225-.262.338-.393.112-.132.15-.225.225-.375.075-.15.037-.282-.019-.394-.056-.113-.506-1.219-.694-1.67-.182-.439-.367-.38-.505-.387l-.43-.007c-.15 0-.394.056-.6.281-.206.225-.788.769-.788 1.875 0 1.106.806 2.175.918 2.325.113.15 1.587 2.423 3.844 3.399.537.232.956.37 1.283.474.54.172 1.03.148 1.418.09.433-.065 1.328-.544 1.516-1.069.188-.525.188-.975.131-1.069-.056-.094-.206-.15-.431-.263z"
              fill="#FFFFFF"
            />
          </svg>
        </a>
      </div>
    </aside>
  );
}
