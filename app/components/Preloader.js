'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    // Simulate loading time for the luxury reveal
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = '';
    }, 2500);
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#ffffff', // Changed to white to match logo background seamlessly
            zIndex: 10000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'var(--primary-blue)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 1, ease: 'easeOut' } }}
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8 } }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ marginBottom: '2rem' }}>
              <img 
                src="/Blue_Moon_logo-removebg-preview.png" 
                alt="BlueMoon Properties Logo" 
                style={{ 
                  width: '320px', 
                  maxWidth: '85vw', 
                  height: 'auto', 
                  objectFit: 'contain',
                }} 
              />
            </div>
            <div style={{ width: '200px', height: '2px', backgroundColor: 'rgba(38, 54, 111, 0.1)', overflow: 'hidden', margin: '0 auto' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%', transition: { duration: 2, ease: 'easeInOut' } }}
                style={{ height: '100%', backgroundColor: 'var(--sky-blue)' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
