'use client';

import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, X, MessageSquare, Phone, User, Building, ShieldCheck, Loader2 } from 'lucide-react';

export default function QuickEnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interest: 'Bulk Land Banks (5 to 200+ Acres)',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Listen for global custom events to open popup from any button (e.g. navbar "ENQUIRE NOW")
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-quick-enquiry', handleOpen);
    return () => window.removeEventListener('open-quick-enquiry', handleOpen);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your Name and WhatsApp / Phone Number.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to dispatch enquiry. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Your enquiry could not be sent. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      interest: 'Bulk Land Banks (5 to 200+ Acres)',
      message: '',
    });
  };

  return (
    <aside
      id="quick-enquiry-widget"
      aria-label="Quick Property Enquiry"
      style={{
        position: 'fixed',
        bottom: '96px', // Sits cleanly above the circular WhatsApp floating button
        right: '28px',
        zIndex: 99998,
        fontFamily: 'var(--font-body), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* ── Trigger Pill Button (Visible when popup is closed) ── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          id="btn-open-enquiry-popup"
          title="Open Quick Enquiry Form"
          style={{
            backgroundColor: '#222f80',
            color: '#FFFFFF',
            border: '1.5px solid rgba(18, 164, 220, 0.45)',
            borderRadius: '50px',
            padding: '10px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(34, 47, 128, 0.35), 0 2px 8px rgba(0,0,0,0.12)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.82rem',
            fontWeight: 800,
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
          }}
          className="hover:scale-105 hover:bg-[#1b2668]"
        >
          <span
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '10px',
              height: '10px',
            }}
          >
            <span
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: '#25D366',
                opacity: 0.75,
                animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
              }}
            />
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#25D366',
              }}
            />
          </span>
          <MessageSquare size={16} style={{ color: '#12A4DC' }} />
          <span>Quick Enquiry</span>
        </button>
      )}

      {/* ── Popup Card (Docked on Right Side) ── */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-popup-title"
          style={{
            width: '360px',
            maxWidth: 'calc(100vw - 36px)',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            boxShadow: '0 24px 60px rgba(34, 47, 128, 0.3), 0 4px 16px rgba(0, 0, 0, 0.1)',
            border: '2px solid rgba(18, 164, 220, 0.35)',
            overflow: 'hidden',
            animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: '#222f80',
              padding: '16px 20px',
              color: '#FFFFFF',
              position: 'relative',
              borderBottom: '2px solid #D2143A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(18, 164, 220, 0.4)',
                }}
              >
                <MessageSquare size={18} style={{ color: '#12A4DC' }} />
              </div>
              <div>
                <h3
                  id="enquiry-popup-title"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    letterSpacing: '1px',
                    margin: 0,
                    color: '#FFFFFF',
                    textTransform: 'uppercase',
                  }}
                >
                  Quick Property Enquiry
                </h3>
                <div
                  style={{
                    fontSize: '0.74rem',
                    color: '#12A4DC',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '2px',
                    fontWeight: 600,
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#25D366',
                    }}
                  />
                  <span>Direct WhatsApp Dispatch Desk</span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Enquiry Form"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.75)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '6px',
                transition: 'all 0.2s ease',
              }}
              className="hover:text-white hover:bg-white/10"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form Content / Success Screen */}
          <div style={{ padding: '20px', maxHeight: '70vh', overflowY: 'auto' }}>
            {submitted ? (
              /* Success State */
              <div
                style={{
                  textAlign: 'center',
                  padding: '16px 8px',
                  animation: 'fadeIn 0.3s ease',
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(37, 211, 102, 0.15)',
                    color: '#25D366',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto',
                    border: '2px solid rgba(37, 211, 102, 0.3)',
                  }}
                >
                  <CheckCircle2 size={34} />
                </div>

                <h4
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    color: '#222f80',
                    margin: '0 0 8px 0',
                    textTransform: 'uppercase',
                  }}
                >
                  Enquiry Dispatched!
                </h4>

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: '#475569',
                    lineHeight: 1.5,
                    marginBottom: '16px',
                  }}
                >
                  Thank you, <strong>{formData.name}</strong>. Your message was routed directly to our WhatsApp Desk (<span style={{ color: '#222f80', fontWeight: 700 }}>+91 98494 42929</span>). A consultant will reply to your WhatsApp shortly.
                </p>

                <div
                  style={{
                    backgroundColor: '#F8FAFC',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid rgba(18, 164, 220, 0.2)',
                    fontSize: '0.8rem',
                    color: '#64748B',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    justifyContent: 'center',
                  }}
                >
                  <ShieldCheck size={16} style={{ color: '#12A4DC' }} />
                  <span>No apps opened • 100% Secure & Confidential</span>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={handleReset}
                    style={{
                      flex: 1,
                      backgroundColor: 'transparent',
                      border: '1.5px solid #222f80',
                      color: '#222f80',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontFamily: 'var(--font-heading)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Send Another
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    style={{
                      flex: 1,
                      backgroundColor: '#222f80',
                      border: 'none',
                      color: '#FFFFFF',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontFamily: 'var(--font-heading)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              /* Input Form */
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {errorMsg && (
                  <div
                    style={{
                      backgroundColor: 'rgba(210, 20, 58, 0.08)',
                      border: '1px solid rgba(210, 20, 58, 0.3)',
                      color: '#D2143A',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                    }}
                  >
                    {errorMsg}
                  </div>
                )}

                {/* Name */}
                <div>
                  <label
                    htmlFor="enquiry-name"
                    style={{
                      display: 'block',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#222f80',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: '6px',
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    Full Name <span style={{ color: '#D2143A' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User
                      size={16}
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#94A3B8',
                      }}
                    />
                    <input
                      id="enquiry-name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 12px 10px 38px',
                        border: '1.5px solid #E2E8F0',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        color: '#1E293B',
                        outline: 'none',
                        transition: 'border-color 0.2s ease',
                      }}
                      className="focus:border-[#12A4DC]"
                    />
                  </div>
                </div>

                {/* WhatsApp Phone */}
                <div>
                  <label
                    htmlFor="enquiry-phone"
                    style={{
                      display: 'block',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#222f80',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: '6px',
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    WhatsApp / Phone Number <span style={{ color: '#D2143A' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone
                      size={16}
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#94A3B8',
                      }}
                    />
                    <input
                      id="enquiry-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91 98494 42929"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 12px 10px 38px',
                        border: '1.5px solid #E2E8F0',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        color: '#1E293B',
                        outline: 'none',
                        transition: 'border-color 0.2s ease',
                      }}
                      className="focus:border-[#12A4DC]"
                    />
                  </div>
                </div>

                {/* Property Category */}
                <div>
                  <label
                    htmlFor="enquiry-interest"
                    style={{
                      display: 'block',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#222f80',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: '6px',
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    Interested Property
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Building
                      size={16}
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#94A3B8',
                      }}
                    />
                    <select
                      id="enquiry-interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 12px 10px 38px',
                        border: '1.5px solid #E2E8F0',
                        borderRadius: '8px',
                        fontSize: '0.88rem',
                        color: '#1E293B',
                        outline: 'none',
                        backgroundColor: '#FFFFFF',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="Bulk Land Banks (5 to 200+ Acres)">Bulk Land Banks (5 to 200+ Acres)</option>
                      <option value="Ultra Luxury Sovereign Villas">Ultra Luxury Sovereign Villas</option>
                      <option value="Prime Commercial Hubs & Plots">Prime Commercial Hubs & Plots</option>
                      <option value="RERA Approved Gated Layouts">RERA Approved Gated Layouts</option>
                      <option value="Farmland & Strategic Corridors">Farmland & Strategic Corridors</option>
                      <option value="NRI Remote Purchase Concierge">NRI Remote Purchase Concierge</option>
                    </select>
                  </div>
                </div>

                {/* Message (Optional) */}
                <div>
                  <label
                    htmlFor="enquiry-message"
                    style={{
                      display: 'block',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#222f80',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: '6px',
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    Requirement / Notes <span style={{ color: '#94A3B8', fontWeight: 500 }}>(Optional)</span>
                  </label>
                  <textarea
                    id="enquiry-message"
                    name="message"
                    rows={2}
                    placeholder="e.g. Looking for 10 acres near Kompally / RRR corridor"
                    value={formData.message}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '10px 12px',
                      border: '1.5px solid #E2E8F0',
                      borderRadius: '8px',
                      fontSize: '0.86rem',
                      color: '#1E293B',
                      outline: 'none',
                      resize: 'none',
                      transition: 'border-color 0.2s ease',
                      fontFamily: 'inherit',
                    }}
                    className="focus:border-[#12A4DC]"
                  />
                </div>

                {/* Note about direct WhatsApp dispatch */}
                <div
                  style={{
                    fontSize: '0.74rem',
                    color: '#64748B',
                    lineHeight: 1.4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#F8FAFC',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <span style={{ color: '#25D366', fontSize: '0.9rem' }}>●</span>
                  <span>Direct delivery to BlueMoon WhatsApp without opening the app.</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  id="btn-submit-quick-enquiry"
                  style={{
                    backgroundColor: '#D2143A', // BlueMoon Signature Crimson Red
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '13px 20px',
                    fontSize: '0.84rem',
                    fontWeight: 800,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-heading)',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 6px 18px rgba(210, 20, 58, 0.35)',
                    transition: 'all 0.25s ease',
                    opacity: loading ? 0.75 : 1,
                  }}
                  className="hover:bg-[#b01030] hover:scale-102"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Transmitting To WhatsApp...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Send Message To WhatsApp</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
