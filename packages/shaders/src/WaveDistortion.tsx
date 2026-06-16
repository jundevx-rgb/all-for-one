'use client';

import { useRef, useEffect } from 'react';

export interface WaveDistortionProps {
  amplitude?: number;
  frequency?: number;
  speed?: number;
  color?: string;
  opacity?: number;
  className?: string;
}

/**
 * WaveDistortion — Layered sine wave canvas effect.
 * Multiple waves at different frequencies create a complex distortion pattern.
 * Ideal for hero section backgrounds or decorative dividers.
 *
 * Usage:
 *   <WaveDistortion amplitude={50} frequency={0.02} speed={0.03} color="#6366f1" opacity={0.3} />
 */
export function WaveDistortion({
  amplitude = 50,
  frequency = 0.02,
  speed = 0.03,
  color = '#6366f1',
  opacity = 0.3,
  className = '',
}: WaveDistortionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const waveLayers = [
      { freq: frequency, amp: amplitude, speed: speed },
      { freq: frequency * 2.3, amp: amplitude * 0.6, speed: speed * 0.7 },
      { freq: frequency * 0.4, amp: amplitude * 0.4, speed: speed * 1.3 },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = timeRef.current;
      const w = canvas.width;
      const h = canvas.height;

      for (const layer of waveLayers) {
        ctx.beginPath();
        ctx.moveTo(0, h / 2);

        for (let x = 0; x <= w; x += 2) {
          const y = h / 2 + Math.sin(x * layer.freq + t * layer.speed) * layer.amp +
            Math.sin(x * layer.freq * 1.7 + t * layer.speed * 0.8) * layer.amp * 0.3;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fillStyle = color + Math.round(opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      }

      timeRef.current += 0.016;
      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [amplitude, frequency, speed, color, opacity]);

  return <canvas ref={canvasRef} className={className} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />;
}
