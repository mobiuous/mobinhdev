"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text3D, useTexture, Points, PointMaterial, Center } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useLenis } from "@/lib/lenis";
import { useMousePosition } from "@/lib/mouse";
import { randomGaussian } from "@/lib/math";
import { HolographicShaderOverride } from "@/lib/shaders/holographic_rainbow";
import { calculateRepulsion } from "@/lib/three";
import * as THREE from "three";

function ParticlesField() {
  const ref = useRef<THREE.Points>(null);
  const mouse = useMousePosition();
  
  const particlesCount = useMemo(() => {
    const isMobile = window.innerWidth <= 768;
    return isMobile ? 800 : 1500;
  }, []);

  const { positions, colors, speeds } = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 4);
    const speeds = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      const i4 = i * 4;
      
      positions[i3] = randomGaussian(0, 15);     // x
      positions[i3 + 1] = randomGaussian(0, 10); // y  
      positions[i3 + 2] = Math.random() * -40 - 10; // z
      
      speeds[i] = Math.random() * 0.1 + 0.03;
      
      colors[i4] = 1;     // r
      colors[i4 + 1] = 1; // g
      colors[i4 + 2] = 1; // b
      colors[i4 + 3] = 0; // a
    }
    
    return { positions, colors, speeds };
  }, [particlesCount]);

  useFrame(({ camera }) => {
    if (!ref.current) return;
    
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    const colors = ref.current.geometry.attributes.color.array as Float32Array;
    
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      const i4 = i * 4;
      
      const [repulsionX, repulsionY] = calculateRepulsion(
        positions[i3],
        positions[i3 + 1],
        positions[i3 + 2],
        mouse.x,
        mouse.y,
        camera as THREE.PerspectiveCamera,
      );
      
      positions[i3 + 2] += speeds[i];
      positions[i3] += repulsionX;
      positions[i3 + 1] += repulsionY;
      
      // Fade in particles
      if (colors[i4 + 3] < 1) {
        colors[i4 + 3] = Math.min(colors[i4 + 3] + 0.01, 1);
      }
      
      // Reset when out of bounds
      if (positions[i3 + 2] > 0) {
        positions[i3] = randomGaussian(0, 15);
        positions[i3 + 1] = randomGaussian(0, 10);
        positions[i3 + 2] = -40;
        colors[i4 + 3] = 0;
      }
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.geometry.attributes.color.needsUpdate = true;
  });

  const texture = useTexture("/img/circle.png");

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 4]}
        />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={0.08}
        transparent
        vertexColors
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function HolographicText() {
  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const mouse = useMousePosition();
  const { size } = useThree();
  
  useFrame((state) => {
    if (!ref.current) return;
    
    // Anchor text to middle point
    if (ref.current.geometry && !ref.current.userData.centered) {
      ref.current.geometry.center();
      ref.current.userData.centered = true;
    }
    
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile && mouse.x !== null && mouse.y !== null) {
      const xNorm = (mouse.x / size.width) * 2 - 1;
      const yNorm = -(mouse.y / size.height) * 2 + 1;
      ref.current.rotation.y = xNorm * 0.1;
      ref.current.rotation.x = yNorm * -0.1;
    } else if (isMobile) {
      const time = state.clock.getElapsedTime();
      ref.current.rotation.y = Math.sin(time * 0.5) * 0.1;
      ref.current.rotation.x = Math.cos(time * 0.4) * 0.05;
    }
  });

  return (
      <Text3D
        ref={ref}
        font="/three_fonts/Lexend_Giga_Regular.json"
        size={3}
        height={0.5}
        position={[0, 0, window.innerWidth <= 768 ? -50 : -25]}
        bevelEnabled
        bevelSize={0.05}
        bevelThickness={0.2}
        curveSegments={12}
        bevelSegments={5}
      >
        mobin h.
        <meshBasicMaterial 
          ref={materialRef}
          color="white" 
          onBeforeCompile={(shader) => {
            if (materialRef.current) {
              HolographicShaderOverride(materialRef.current, shader);
            }
          }} 
        />
      </Text3D>
  );
}

function Background() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 256;
    
    const context = canvas.getContext('2d')!;
    const gradient = context.createLinearGradient(0, 0, 0, 256);
    
    gradient.addColorStop(0, '#111112');
    gradient.addColorStop(0.5, '#27273b');
    gradient.addColorStop(1, '#111112');
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, 1, 256);
    
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  return (
    <mesh scale={[2000, 2000, 2000]}>
      <sphereGeometry args={[1, 32, 15]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

export default function Legend() {
  const lenis = useLenis();
  
  const scrollToMain = () => {
    const mainSection = document.getElementById('main-content');
    
    if (mainSection && lenis) {
      lenis.scrollTo(mainSection, {
        offset: 0,
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    }
  };

  return (
    <div className="w-full h-screen relative">
      <Canvas
        camera={{
          fov: 75,
          position: [0, 0, 0],
          near: 0.1,
          far: 4000
        }}
      >
        <Suspense fallback={null}>
          <Background />
          <ParticlesField />
          <HolographicText />
          
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1.1} />
          <directionalLight position={[-5, 2, -5]} intensity={1.3} />
          <directionalLight position={[0, 5, -30]} intensity={2} color="#88ccff" />
          
          <EffectComposer>
            <Bloom intensity={0.4} radius={0.75} luminanceThreshold={0.3} />
            <Vignette offset={0.2} darkness={0.9} />
          </EffectComposer>
        </Suspense>
      </Canvas>
      
      {/* Button to scroll to main content */}
      <button
        onClick={scrollToMain}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300 animate-bounce cursor-pointer"
        aria-label="Scroll to main content"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 14l-7 7-7-7" />
          <path d="M19 6l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
}