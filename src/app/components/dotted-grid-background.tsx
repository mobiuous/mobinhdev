"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./theme-context";

export default function DottedGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const gridSize = 30;
    const perspective = 0.5;
    const dotSize = 1;
    const rippleSpeed = 0.003;
    const rippleAmplitude = 15;

    let animationTime = 0;
    let animationFrameId: number;

    const animate = () => {
      animationTime += rippleSpeed;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startY = canvas.height * 0.2;
      const endY = canvas.height;
      const centerX = canvas.width / 2;

      for (let y = startY; y < endY; y += gridSize) {
        const depthFactor = (y - startY) / (endY - startY);
        const scale = perspective + (1 - perspective) * depthFactor;
        const rowWidth = canvas.width * scale;
        const spacing = gridSize * scale;

        for (let x = -rowWidth; x < rowWidth * 2; x += spacing) {
          const worldX = centerX + x;
          
          if (worldX < -50 || worldX > canvas.width + 50) continue;

          const time = animationTime * 50;
          const normalizedX = (worldX - centerX) / canvas.width;
          const normalizedY = (y - startY) / (endY - startY);
          
          const wave1 = Math.sin(normalizedX * 6 + normalizedY * 3 + time * 0.1) * 0.8;
          const wave2 = Math.sin(normalizedX * 12 - normalizedY * 2.5 + time * 0.2) * 0.6;
          const wave3 = Math.sin(normalizedX * 24 + normalizedY * 4 + time * 0.32) * 0.4;
          const wave4 = Math.sin(normalizedX * 32 - normalizedY * 6 + time * 0.45) * 0.3;
          
          const combinedWave = wave1 + wave2 + wave3 + wave4;
          
          const oceanWave = combinedWave > 0 
            ? Math.pow(combinedWave, 0.5) // peaks
            : -Math.pow(Math.abs(combinedWave), 1.6); // troughs
          
          const rippleOffset = oceanWave * rippleAmplitude * (1 - depthFactor);

          const finalY = y + rippleOffset;
          
          const baseOpacity = 0.1 + depthFactor * 0.7;
          const waveIntensity = Math.abs(oceanWave);
          const opacity = Math.min(baseOpacity + waveIntensity * 0.5, 1.0) * 0.67;

          ctx.save();
          ctx.globalAlpha = opacity;

          ctx.fillStyle = theme === 'light' ? '#000000' : '#FFFFFF';
          
          ctx.beginPath();
          ctx.arc(worldX, finalY, (theme === 'light' ? dotSize * 1.3 : dotSize) * scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
}