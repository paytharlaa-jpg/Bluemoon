'use client';

import React, { useEffect, useRef } from 'react';

/**
 * ParticleWaveBackground Component
 * 
 * Renders an animated 3D particle wave / undulating dotted ribbon mesh on HTML5 Canvas.
 * Inspired by architectural kinetic installations and generative wave motion graphics.
 * 
 * Features:
 * - 3D parametric ribbon with sinusoidal undulation and twisting Möbius-style folds.
 * - Razor-sharp Retina/HiDPI rendering via devicePixelRatio.
 * - Depth-sorted particle rendering with realistic perspective scaling & alpha fade.
 * - Smooth interactive cursor parallax response with lerped physics.
 * - IntersectionObserver to pause rendering when out of viewport for optimal performance.
 */
export default function ParticleWaveBackground({
  className = '',
  dotColor = '30, 41, 59', // Deep architectural slate / charcoal (RGB)
  accentColor = '38, 54, 111', // Blue Moon primary navy
  dotCountX = 85, // Number of dots along the wave length
  dotCountY = 34, // Number of parallel strands across ribbon width
  speed = 0.42, // Wave propagation speed
  interactive = true,
  opacity = 0.85,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const isVisibleRef = useRef(true);

  // Mouse interaction state (lerped)
  const mouseRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Handle high-DPI sizing
    const handleResize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // Pause animation when scrolled away
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Mouse movement listener
    const handleMouseMove = (e) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
      mouseRef.current.targetX = Math.max(-0.5, Math.min(0.5, x));
      mouseRef.current.targetY = Math.max(-0.5, Math.min(0.5, y));
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    // Animation Loop
    let lastTime = performance.now();
    let simTime = 0;

    // Particle memory pool to prevent garbage collection pauses
    const totalParticles = dotCountX * dotCountY;
    const particles = new Array(totalParticles);
    for (let i = 0; i < totalParticles; i++) {
      particles[i] = { x: 0, y: 0, z: 0, radius: 1, alpha: 1, scale: 1, isAccent: false };
    }

    const render = (now) => {
      animFrameRef.current = requestAnimationFrame(render);

      if (!isVisibleRef.current) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      simTime += dt * speed;

      // Smooth mouse lerp
      const mouse = mouseRef.current;
      mouse.currentX += (mouse.targetX - mouse.currentX) * 0.06;
      mouse.currentY += (mouse.targetY - mouse.currentY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const fov = 680;
      const camZ = 340;
      let particleIndex = 0;

      for (let c = 0; c < dotCountX; c++) {
        const u = c / (dotCountX - 1); // 0 to 1 along wave length

        // 1. Primary spine trajectory (harmonic sinusoidal curves)
        const wave1 = Math.sin(u * Math.PI * 2.15 - simTime * 1.1);
        const wave2 = Math.cos(u * Math.PI * 4.3 + simTime * 0.7) * 0.32;
        const wave3 = Math.sin(u * Math.PI * 1.1 - simTime * 0.4) * 0.22;
        const spineY = height * 0.51 + (wave1 + wave2 + wave3) * (height * 0.22);

        // 2. Variable ribbon width with pinch near the central twist
        const pinch = Math.exp(-Math.pow((u - 0.32) * 4.2, 2)) * 0.38;
        const ribbonWidth = (height * 0.36) * (1.05 - pinch);

        // 3. 3D Twist angle (creates the folded ribbon / edge-on turn seen in the reference)
        const twistBase = Math.sin(u * Math.PI * 2.35 - simTime * 0.95) * 1.38;
        const twistSec = Math.cos(u * Math.PI * 1.45 + simTime * 0.55) * 0.42;
        const twistAngle = twistBase + twistSec + mouse.currentX * 0.45;

        // Base X position spanning slightly beyond viewport edges
        const xBase = -width * 0.06 + u * width * 1.12;

        for (let r = 0; r < dotCountY; r++) {
          const v = (r / (dotCountY - 1)) * 2 - 1; // -1 to 1 across ribbon
          const distAcross = v * ribbonWidth * 0.5;

          // Subtle harmonic surface ripple
          const ripple = Math.sin(u * 9.2 + v * 3.6 - simTime * 2.4) * 11 * (1 - Math.abs(v) * 0.35);

          // 3D coordinates relative to spine
          const yOffset = (distAcross + ripple) * Math.cos(twistAngle);
          const zOffset =
            (distAcross + ripple) * Math.sin(twistAngle) +
            Math.sin(u * Math.PI * 2.2 - simTime * 1.2) * 48;

          // 3D perspective projection
          const zTotal = camZ + zOffset;
          const scale = fov / (fov + zTotal);

          // Projected 2D coordinates
          const projX = xBase + zOffset * 0.13 * Math.sin(twistAngle) + mouse.currentX * 25 * scale;
          const projY = spineY + yOffset * scale + mouse.currentY * 35 * scale;

          // Dot sizing (closer = larger, distant = finer)
          const radius = Math.max(0.65, 1.85 * scale);

          // Depth-based alpha fade (edges fade gently, closest dots are crisp)
          const edgeFade = Math.sin(u * Math.PI);
          const depthAlpha = Math.min(0.9, Math.max(0.12, (scale - 0.48) * 1.5));
          const alpha = depthAlpha * (0.35 + 0.65 * Math.pow(edgeFade, 0.4));

          const p = particles[particleIndex++];
          p.x = projX;
          p.y = projY;
          p.z = zOffset;
          p.radius = radius;
          p.alpha = alpha;
          p.scale = scale;
          // Subtle accent on every 7th longitudinal strand near the focal crest
          p.isAccent = r % 7 === 0 && scale > 1.05;
        }
      }

      // 4. Sort particles by Z-depth (back-to-front) for authentic 3D occlusion
      particles.sort((a, b) => a.z - b.z);

      // 5. Draw particles
      for (let i = 0; i < totalParticles; i++) {
        const p = particles[i];
        if (p.alpha <= 0.01) continue;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        const finalColor = p.isAccent ? accentColor : dotColor;
        ctx.fillStyle = `rgba(${finalColor}, ${p.alpha * opacity})`;
        ctx.fill();
      }
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [dotColor, accentColor, dotCountX, dotCountY, speed, interactive, opacity]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
