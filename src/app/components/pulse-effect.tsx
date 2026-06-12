"use client"

import { useEffect, useRef } from "react";

interface Pulse {
    id: number;
    x: number;
    y: number;
    startTime: number;
}

export function PulseEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pulsesRef = useRef<Pulse[]>([]);
  const animationRef = useRef<number>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const pulse: Pulse = {
        id: Date.now() + Math.random(),
        x: event.clientX,
        y: event.clientY,
        startTime: performance.now(),
      };

      pulsesRef.current.push(pulse);
      createPulseElement(pulse);
    };

    const createPulseElement = (pulse: Pulse) => {
      if (!containerRef.current) return;

      const element = document.createElement("div");
      element.className = "pulse-click";
      element.style.cssText = `
        left: ${pulse.x - 10}px;
        top: ${pulse.y - 10}px;
      `;

      containerRef.current.appendChild(element);

      setTimeout(() => {
        if (containerRef.current?.contains(element)) {
          containerRef.current.removeChild(element);
        }
      }, 800);
    };

    document.addEventListener("mousedown", handleClick);

    const animate = () => {
      const now = performance.now();
      pulsesRef.current = pulsesRef.current.filter(
        pulse => now - pulse.startTime < 800
      );
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.removeEventListener("mousedown", handleClick);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return <div ref={containerRef} className="pulse-container" />;
}