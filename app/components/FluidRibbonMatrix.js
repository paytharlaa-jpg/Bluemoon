'use client';

import React, { useEffect, useRef } from 'react';

/**
 * FluidRibbonMatrix Component
 * 
 * Renders an animated 3D volumetric fluid ribbon weaving in and out of an architectural box frame.
 * Directly inspired by the chromatic 3D fluid ribbon motion graphics reference.
 * 
 * Features:
 * - Volumetric 3D extruded ribbon with smooth Catmull-Rom spline interpolation.
 * - Dynamic color transitions: Ice White -> Sky Blue (#12A4DC) -> Royal Navy (#26366F) -> Magenta/Red (#D2143A).
 * - Multi-pass depth rendering: Segments weave behind and burst in front of the box frame.
 * - Interactive cursor parallax with smooth lerped momentum.
 * - Retina / HiDPI canvas calibration at 60 FPS.
 * - IntersectionObserver to pause rendering when scrolled out of view.
 */
export default function FluidRibbonMatrix({
  className = '',
  speed = 0.55,
  interactive = true,
  opacity = 0.92,
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

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const handleMouseMove = (e) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
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

    // Catmull-Rom Spline Helper
    function getSplinePoint(points, t) {
      const n = points.length - 1;
      const p = t * n;
      const i = Math.floor(p);
      const u = p - i;

      const p0 = points[Math.max(0, i - 1)];
      const p1 = points[i];
      const p2 = points[Math.min(n, i + 1)];
      const p3 = points[Math.min(n, i + 2)];

      const u2 = u * u;
      const u3 = u2 * u;

      const x = 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * u + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * u2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * u3);
      const y = 0.5 * ((2 * p1.y) + (-p0.y + p2.y) * u + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * u2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * u3);
      const z = 0.5 * ((2 * p1.z) + (-p0.z + p2.z) * u + (2 * p0.z - 5 * p1.z + 4 * p2.z - p3.z) * u2 + (-p0.z + 3 * p1.z - 3 * p2.z + p3.z) * u3);

      // Color interpolation
      const r = p1.color[0] + (p2.color[0] - p1.color[0]) * u;
      const g = p1.color[1] + (p2.color[1] - p1.color[1]) * u;
      const b = p1.color[2] + (p2.color[2] - p1.color[2]) * u;

      return { x, y, z, color: [Math.round(r), Math.round(g), Math.round(b)] };
    }

    const render = (now) => {
      animFrameRef.current = requestAnimationFrame(render);

      if (!isVisibleRef.current || width === 0 || height === 0) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      simTime += dt * speed;

      // Smooth mouse lerp
      const mouse = mouseRef.current;
      mouse.currentX += (mouse.targetX - mouse.currentX) * 0.05;
      mouse.currentY += (mouse.targetY - mouse.currentY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Box coordinates (margins: 35px from edges)
      const boxPadX = Math.max(25, width * 0.035);
      const boxPadY = Math.max(25, height * 0.04);
      const box = {
        x: boxPadX,
        y: boxPadY,
        w: width - boxPadX * 2,
        h: height - boxPadY * 2,
      };

      // Dynamic 3D Control points that undulate and twist
      // The trajectory matches the reference image:
      // Loop 1: Enters from top-left, curves down inside the box
      // Loop 2: Swells up towards center-right in 3D
      // Loop 3: Sweeps around right edge of the box and plunges into trough
      // Loop 4: Plunges forward & bursts OUT OVER the bottom-left box border in front!
      const mx = mouse.currentX * 45;
      const my = mouse.currentY * 35;

      const pts = [
        // 0: Originates OUTSIDE the section/box at top-left
        {
          x: 15 + Math.sin(simTime * 0.7) * 22 + mx * 0.3,
          y: 12 + Math.cos(simTime * 0.5) * 18 + my * 0.3,
          z: -75 + Math.sin(simTime * 0.6) * 25,
          color: [248, 252, 255], // Ice White
        },
        // 1: Sweeps from outside directly into the box interior
        {
          x: width * 0.22 + Math.cos(simTime * 0.6) * 20 + mx * 0.5,
          y: height * 0.20 + Math.sin(simTime * 0.8) * 22 + my * 0.5,
          z: -15 + Math.cos(simTime * 0.7) * 20,
          color: [186, 230, 253], // Pale Sky Blue
        },
        // 2: Upper center crest (Sky Blue) weaving under currency selectors & title
        {
          x: width * 0.45 + Math.sin(simTime * 0.85) * 28 + mx * 0.7,
          y: height * 0.25 + Math.cos(simTime * 0.7) * 22 + my * 0.6,
          z: 40 + Math.sin(simTime * 0.8) * 28,
          color: [18, 164, 220], // Sky Blue (#12A4DC)
        },
        // 3: Center sweep (Navy Blue) through the arbitrage slider content
        {
          x: width * 0.70 + Math.cos(simTime * 0.5) * 25 + mx * 0.8,
          y: height * 0.35 + Math.sin(simTime * 0.65) * 26 + my * 0.7,
          z: -10 + Math.cos(simTime * 0.55) * 22,
          color: [38, 54, 111], // Royal Navy (#26366F)
        },
        // 4: Right curl inside the card
        {
          x: width * 0.84 + Math.sin(simTime * 0.6) * 22 + mx * 0.6,
          y: height * 0.52 + Math.cos(simTime * 0.75) * 25 + my * 0.6,
          z: -65 + Math.sin(simTime * 0.65) * 25,
          color: [79, 70, 229], // Deep Indigo
        },
        // 5: Lower return weaving beneath live output cards (Vivid Magenta)
        {
          x: width * 0.60 + Math.cos(simTime * 0.7) * 28 + mx * 0.7,
          y: height * 0.64 + Math.sin(simTime * 0.55) * 22 + my * 0.7,
          z: 60 + Math.cos(simTime * 0.7) * 32,
          color: [192, 38, 211], // Vivid Magenta
        },
        // 6: Forward crest swelling in 3D under KPI telemetry
        {
          x: width * 0.36 + Math.sin(simTime * 0.8) * 26 + mx * 0.9,
          y: height * 0.72 + Math.cos(simTime * 0.65) * 20 + my * 0.8,
          z: 125 + Math.sin(simTime * 0.85) * 35,
          color: [210, 20, 58], // Premium Red (#D2143A)
        },
        // 7: Sweeping towards lower-left
        {
          x: width * 0.22 + Math.cos(simTime * 0.55) * 22 + mx * 1.0,
          y: height * 0.86 + Math.sin(simTime * 0.7) * 25 + my * 0.9,
          z: 165 + Math.cos(simTime * 0.6) * 30,
          color: [18, 164, 220], // Cyan / Blue
        },
        // 8: Gentle exit / terminal loop
        {
          x: width * 0.12 + Math.sin(simTime * 0.65) * 20 + mx * 1.1,
          y: height * 0.98 + Math.cos(simTime * 0.8) * 22 + my * 1.0,
          z: 200 + Math.sin(simTime * 0.7) * 25,
          color: [2, 132, 199], // Deep Cobalt
        },
      ];

      // Sample ~420 points along the spline
      const steps = 420;
      const samples = [];
      const fov = 650;

      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const pt = getSplinePoint(pts, t);

        // Perspective scale & depth
        const scale = fov / (fov + pt.z);
        // Vary radius across spline: wider in focal sweeps, tapered at tips
        const baseRadius = (width * 0.048 + Math.sin(t * Math.PI) * (width * 0.022));
        const radius = Math.max(16, baseRadius * scale);

        samples.push({
          x: pt.x,
          y: pt.y,
          z: pt.z,
          scale,
          radius,
          color: pt.color,
          t,
        });
      }

      // Helper to render volumetric ribbon slice
      const drawRibbonSlice = (s, alphaMultiplier = 1) => {
        const [r, g, b] = s.color;
        // Soft volumetric radial gradient for each disc along path
        const grad = ctx.createRadialGradient(
          s.x - s.radius * 0.25,
          s.y - s.radius * 0.25,
          s.radius * 0.1,
          s.x,
          s.y,
          s.radius
        );

        const coreAlpha = Math.min(0.42, 0.30 * (s.scale * 0.9)) * alphaMultiplier * opacity;
        const edgeAlpha = 0;

        grad.addColorStop(0, `rgba(${Math.min(255, r + 50)}, ${Math.min(255, g + 50)}, ${Math.min(255, b + 50)}, ${coreAlpha * 1.25})`);
        grad.addColorStop(0.55, `rgba(${r}, ${g}, ${b}, ${coreAlpha})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${edgeAlpha})`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      };

      // ─── 3D DEPTH SORTING & RENDERING (NO OUTLINE) ───
      // Sort all sampled slices from furthest (back) to closest (front) for genuine 3D perspective
      const sortedSamples = [...samples].sort((a, b) => a.z - b.z);

      for (let i = 0; i < sortedSamples.length; i++) {
        drawRibbonSlice(sortedSamples[i], 1.05);
      }

      // ─── FINE SILK STREAMLINES (Volumetric ribbon surface texture) ───
      ctx.save();
      const strandOffsets = [-0.35, -0.15, 0.1, 0.3];
      for (let st = 0; st < strandOffsets.length; st++) {
        const off = strandOffsets[st];
        ctx.beginPath();
        for (let i = 0; i < samples.length; i += 3) {
          const s = samples[i];
          const px = s.x + Math.sin(s.t * Math.PI * 4) * (s.radius * off * 0.45);
          const py = s.y + Math.cos(s.t * Math.PI * 4) * (s.radius * off * 0.45);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.20 + st * 0.05})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }
      ctx.restore();
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
  }, [speed, interactive, opacity]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        top: '-70px',
        bottom: '-60px',
        left: '-80px',
        right: '-80px',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'visible', // Allows motion design to enter seamlessly from outside into the box
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
