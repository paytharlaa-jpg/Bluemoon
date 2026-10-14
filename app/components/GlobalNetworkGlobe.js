'use client';

import React, { useEffect, useRef } from 'react';

/**
 * GlobalNetworkGlobe Component
 * 
 * An ultra-luxurious, lightweight 3D orthographic wireframe globe visualization.
 * Features:
 * - Latitude and longitude rings in champagne gold & cyan.
 * - Rotating diaspora hub nodes (Hyderabad, London, New York, Dubai, Singapore, Sydney).
 * - Great Circle connection arcs with glowing pulses.
 * - Inclined celestial orbital rings with travelling photons.
 * - Subtle cursor parallax & 60 FPS requestAnimationFrame loop.
 * - Retina DPR scaling and IntersectionObserver auto-pausing.
 */

const DIASPORA_NODES = [
  { name: 'Hyderabad', lat: 17.385, lon: 78.4867, isHub: true },
  { name: 'London', lat: 51.5074, lon: -0.1278, isHub: false },
  { name: 'New York', lat: 40.7128, lon: -74.006, isHub: false },
  { name: 'Dubai', lat: 25.2048, lon: 55.2708, isHub: false },
  { name: 'Singapore', lat: 1.3521, lon: 103.8198, isHub: false },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093, isHub: false },
];

export default function GlobalNetworkGlobe({
  className = '',
  size = 460,
  speed = 0.45,
  interactive = true,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const isVisibleRef = useRef(true);

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

    let width = size;
    let height = size;
    let dpr = 1;

    const handleResize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = Math.min(rect.width || size, size);
      height = width; // square aspect ratio
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
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
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      mouseRef.current.targetX = Math.max(-1, Math.min(1, x));
      mouseRef.current.targetY = Math.max(-1, Math.min(1, y));
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    // 3D Spherical Projection Helper
    const project3D = (lat, lon, radius, rotY, tiltX) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + rotY) * (Math.PI / 180);

      const x = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.cos(theta);

      // Tilt around X-axis
      const cosT = Math.cos(tiltX);
      const sinT = Math.sin(tiltX);
      const yRot = y * cosT - z * sinT;
      const zRot = y * sinT + z * cosT;

      return { x, y: yRot, z: zRot };
    };

    // Animation Loop
    let lastTime = performance.now();
    let rotationAngle = 40;
    let pulseTime = 0;

    const render = (now) => {
      animFrameRef.current = requestAnimationFrame(render);
      if (!isVisibleRef.current || width === 0 || height === 0) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      rotationAngle += dt * 14 * speed;
      pulseTime += dt * 1.5;

      // Mouse lerping
      const mouse = mouseRef.current;
      mouse.currentX += (mouse.targetX - mouse.currentX) * 0.05;
      mouse.currentY += (mouse.targetY - mouse.currentY) * 0.05;

      const tiltX = 0.28 + mouse.currentY * 0.15;
      const tiltZ = mouse.currentX * 0.12;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const globeRadius = width * 0.36;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(tiltZ);

      // ─── AMBIENT ATMOSPHERIC BACK-GLOW ───
      const glowGrad = ctx.createRadialGradient(0, 0, globeRadius * 0.3, 0, 0, globeRadius * 1.45);
      glowGrad.addColorStop(0, 'rgba(18, 164, 220, 0.10)');
      glowGrad.addColorStop(0.55, 'rgba(38, 54, 111, 0.05)');
      glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, globeRadius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // ─── SPHERE SILHOUETTE OUTLINE ───
      ctx.strokeStyle = 'rgba(18, 164, 220, 0.32)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(0, 0, globeRadius, 0, Math.PI * 2);
      ctx.stroke();

      // ─── LATITUDE RINGS ───
      const latSteps = [-60, -40, -20, 0, 20, 40, 60];
      for (const lat of latSteps) {
        ctx.beginPath();
        let first = true;

        for (let lon = 0; lon <= 360; lon += 6) {
          const pt = project3D(lat, lon, globeRadius, rotationAngle, tiltX);
          if (first) {
            ctx.moveTo(pt.x, pt.y);
            first = false;
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.closePath();
        ctx.strokeStyle = lat === 0
          ? 'rgba(18, 164, 220, 0.45)' // Equator
          : 'rgba(38, 54, 111, 0.10)';
        ctx.lineWidth = lat === 0 ? 1.4 : 0.8;
        ctx.stroke();
      }

      // ─── LONGITUDE MERIDIANS ───
      for (let lon = 0; lon < 180; lon += 30) {
        ctx.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 5) {
          const pt = project3D(lat, lon, globeRadius, rotationAngle, tiltX);
          if (first) {
            ctx.moveTo(pt.x, pt.y);
            first = false;
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.strokeStyle = 'rgba(38, 54, 111, 0.08)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // ─── CELESTIAL ORBITAL RINGS ───
      // Ring 1: Sky Blue inclined orbit
      ctx.save();
      ctx.rotate(-0.35);
      ctx.beginPath();
      const ring1RadiusX = globeRadius * 1.28;
      const ring1RadiusY = globeRadius * 0.46;
      ctx.ellipse(0, 0, ring1RadiusX, ring1RadiusY, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(18, 164, 220, 0.40)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Orbiting Photon 1
      const photon1Angle = pulseTime * 0.8;
      const p1x = Math.cos(photon1Angle) * ring1RadiusX;
      const p1y = Math.sin(photon1Angle) * ring1RadiusY;
      ctx.fillStyle = '#12A4DC';
      ctx.beginPath();
      ctx.arc(p1x, p1y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(18, 164, 220, 0.35)';
      ctx.beginPath();
      ctx.arc(p1x, p1y, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Ring 2: Cyan equatorial outer ring
      ctx.save();
      ctx.rotate(0.42);
      ctx.beginPath();
      const ring2RadiusX = globeRadius * 1.18;
      const ring2RadiusY = globeRadius * 0.38;
      ctx.ellipse(0, 0, ring2RadiusX, ring2RadiusY, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(18, 164, 220, 0.28)';
      ctx.lineWidth = 0.9;
      ctx.stroke();

      // Orbiting Photon 2
      const photon2Angle = -pulseTime * 1.1 + Math.PI;
      const p2x = Math.cos(photon2Angle) * ring2RadiusX;
      const p2y = Math.sin(photon2Angle) * ring2RadiusY;
      ctx.fillStyle = '#12A4DC';
      ctx.beginPath();
      ctx.arc(p2x, p2y, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(18, 164, 220, 0.35)';
      ctx.beginPath();
      ctx.arc(p2x, p2y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ─── DIASPORA NODES & GREAT CIRCLE CONNECTION ARCS ───
      const projectedNodes = DIASPORA_NODES.map((node) => {
        const pt = project3D(node.lat, node.lon, globeRadius, rotationAngle, tiltX);
        return {
          ...node,
          x: pt.x,
          y: pt.y,
          z: pt.z,
          isFront: pt.z >= 0,
        };
      });

      const hubNode = projectedNodes.find((n) => n.isHub);

      // Draw Connection Arcs from Hyderabad to other nodes
      if (hubNode) {
        for (const target of projectedNodes) {
          if (target.isHub) continue;

          if (hubNode.z > -globeRadius * 0.5 || target.z > -globeRadius * 0.5) {
            ctx.beginPath();
            ctx.moveTo(hubNode.x, hubNode.y);

            const midX = (hubNode.x + target.x) / 2;
            const midY = (hubNode.y + target.y) / 2 - globeRadius * 0.18;

            ctx.quadraticCurveTo(midX, midY, target.x, target.y);

            const arcAlpha = Math.max(0.12, Math.min(0.55, (hubNode.z + target.z + globeRadius) / (globeRadius * 2.5)));
            ctx.strokeStyle = `rgba(18, 164, 220, ${arcAlpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Traveling signal pulse along arc
            const progress = (pulseTime * 0.6 + target.lon * 0.01) % 1;
            const t = progress;
            const px = (1 - t) * (1 - t) * hubNode.x + 2 * (1 - t) * t * midX + t * t * target.x;
            const py = (1 - t) * (1 - t) * hubNode.y + 2 * (1 - t) * t * midY + t * t * target.y;

            if (hubNode.isFront || target.isFront) {
              ctx.fillStyle = '#12A4DC';
              ctx.beginPath();
              ctx.arc(px, py, 2.2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // Draw Nodes (sorted by Z depth)
      const sortedNodes = [...projectedNodes].sort((a, b) => a.z - b.z);
      for (const node of sortedNodes) {
        const isFront = node.isFront;
        const alpha = isFront ? 1 : 0.25;
        const scale = (node.z + globeRadius * 1.5) / (globeRadius * 2.5);

        if (node.isHub) {
          // Hyderabad Primary Hub
          ctx.save();
          const haloSize = (8 + Math.sin(pulseTime * 3) * 2.5) * scale;
          ctx.fillStyle = `rgba(18, 164, 220, ${0.28 * alpha})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, haloSize, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = `rgba(18, 164, 220, ${0.8 * alpha})`;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 4.5 * scale, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = isFront ? '#D2143A' : '#12A4DC';
          ctx.beginPath();
          ctx.arc(node.x, node.y, 2.8 * scale, 0, Math.PI * 2);
          ctx.fill();

          if (isFront) {
            ctx.fillStyle = '#26366F';
            ctx.font = '700 8.5px "Inter", sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText('HYDERABAD [HUB]', node.x + 8, node.y - 4);
          }
          ctx.restore();
        } else {
          // Global Satellite Desk Nodes
          ctx.save();
          ctx.fillStyle = `rgba(18, 164, 220, ${0.85 * alpha})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 2.8 * scale, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = `rgba(255, 255, 255, ${0.9 * alpha})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();

          if (isFront) {
            ctx.fillStyle = 'rgba(38, 54, 111, 0.85)';
            ctx.font = '600 7.5px "Inter", sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(node.name.toUpperCase(), node.x + 6, node.y + 2);
          }
          ctx.restore();
        }
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
  }, [size, speed, interactive]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{
        position: 'relative',
        width: `${size}px`,
        maxWidth: '100%',
        aspectRatio: '1 / 1',
        pointerEvents: 'none',
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
