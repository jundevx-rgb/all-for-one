'use client';

import { useRef, useEffect } from 'react';

export interface NoiseBgProps {
  opacity?: number;
  speed?: number;
  scale?: number;
  color?: string;
  className?: string;
}

/**
 * NoiseBg — Animated grain/noise texture background.
 * Generates random pixel noise via ImageData manipulation.
 * Lightweight alternative to WebGL-based noise effects.
 *
 * Usage:
 *   <NoiseBg opacity={0.05} speed={0.1} />
 */
export function NoiseBg({
  opacity = 0.05,
  speed = 0.1,
  scale = 1,
  className = '',
}: NoiseBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth / scale);
      canvas.height = Math.floor(window.innerHeight / scale);
    };
    resize();
    window.addEventListener('resize', resize);

    let frameCount = 0;
    const animate = () => {
      frameCount++;
      if (frameCount % Math.max(1, Math.floor(1 / speed)) === 0) {
        const imgData = ctx.createImageData(canvas.width, canvas.height);
        for (let i = 0; i < imgData.data.length; i += 4) {
          const val = Math.random() * 255;
          imgData.data[i] = val;
          imgData.data[i + 1] = val;
          imgData.data[i + 2] = val;
          imgData.data[i + 3] = opacity * 255;
        }
        ctx.putImageData(imgData, 0, 0);
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [opacity, speed, scale]);

  return <canvas ref={canvasRef} className={className} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity }} />;
}
