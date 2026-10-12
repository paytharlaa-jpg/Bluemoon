'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const canvasRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let points = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      // Add new point at current mouse position
      points.push({ x: e.clientX, y: e.clientY, age: 0 });
    };

    window.addEventListener('mousemove', onMouseMove);

    const maxAge = 35; // How many frames the trail lasts

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update ages and remove old points
      points = points.filter(p => {
        p.age += 1;
        return p.age < maxAge;
      });

      if (points.length > 1) {
        // Draw segments to control opacity and thickness based on age
        for (let i = 1; i < points.length; i++) {
          const p1 = points[i - 1];
          const p2 = points[i];
          
          // Calculate progress from 0 (tail) to 1 (head)
          const progress = 1 - (p2.age / maxAge); 
          
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          
          // Sky Blue glowing line
          ctx.strokeStyle = `rgba(18, 164, 220, ${progress})`; 
          // Gets slightly thinner at the tail
          ctx.lineWidth = Math.max(0.5, progress * 2.5); 
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          
          // Add glow effect
          ctx.shadowBlur = 12 * progress;
          ctx.shadowColor = `rgba(18, 164, 220, ${progress * 0.8})`;
          
          ctx.stroke();
        }
      }

      requestAnimationFrame(animate);
    };

    const animFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}
