'use client';

import { useRef, useEffect } from 'react';

export interface GradientBgProps {
  colors?: string[];
  speed?: number;
  className?: string;
}

/**
 * GradientBg — Animated gradient canvas background.
 * Uses sin/cos waves to create smooth, flowing color transitions.
 * GPU-accelerated via Canvas 2D + requestAnimationFrame.
 *
 * Usage:
 *   <GradientBg colors={['#6366f1', '#ec4899', '#f97316']} speed={0.002} />
 */
export function GradientBg({
  colors = ['#6366f1', '#ec4899', '#f97316'],
  speed = 0.002,
  className = '',
}: GradientBgProps) {
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

    const animate = () => {
      timeRef.current += speed;
      const t = timeRef.current;
      const w = canvas.width;
      const h = canvas.height;

      const gradient = ctx.createLinearGradient(0, 0, w, h);
      for (let i = 0; i < colors.length; i++) {
        const offset = (i / (colors.length - 1)) * 0.8 + Math.sin(t + i) * 0.1;
        gradient.addColorStop(Math.max(0, Math.min(1, offset)), colors[i]);
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [colors, speed]);

  return <canvas ref={canvasRef} className={className} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />;
}
