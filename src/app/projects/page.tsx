"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import BaseLayout from "../components/base-layout";
import DottedGridBackground from "../components/dotted-grid-background";

const projects = [
  {
    id: 1,
    title: "Cloudboard",
    summary: "An online whiteboard application where users can collaborate in real-time, built with scalability in mind.",
    details:
      `An online whiteboard application built with Spring Boot and deployed with Azure Kubernetes Service. Leveraged web sockets and Redis pub/sub for real-time updates, achieving latencies as low as 10ms during testing.
       
       Focused on high availability by using caching with Redis. Implemented Grafana dashboards to monitor performance and identify bottlenecks, reducing avg. response latency by 20ms.`,
    tags: ["Next.js", "Tailwind", "UI"],
    externalLinks: [
      {link: "https://www.github.com/mobiuous/cloudboard", label: "GitHub Repo"},
      {link: "https://www.github.com/mobiuous/cloudboard", label: "Live Demo"},
    ]
  },
  {
    id: 2,
    title: "Project Two",
    summary: "Another example card to show how the list will feel in practice.",
    details:
      "Expand this card to reveal more placeholder content such as architecture notes, screenshots, or links.",
    tags: ["React", "TypeScript", "Animation"],
    externalLinks: [
      {link: "https://www.github.com/mobiuous/cloudboard", label: "GitHub Repo"},
      {link: "https://www.github.com/mobiuous/cloudboard", label: "Live Demo"},
    ]
  },
  {
    id: 3,
    title: "Project Three",
    summary: "A third item to make the vertical list feel more complete.",
    details:
      "You can swap these placeholders with real project information once you are ready.",
    tags: ["Node.js", "API", "Cloud"],
    externalLinks: [
      {link: "https://www.github.com/mobiuous/cloudboard", label: "GitHub Repo"},
      {link: "https://www.github.com/mobiuous/cloudboard", label: "Live Demo"},
    ]
  },
];

const cubePositions: [number, number, number][] = [
  [-3.5, -0.2, 0],
  [0, 0.6, 0.1],
  [3.3, -0.5, 0.5],
];

const cubeColors = ["#bc5644", "#b2ce75", "#d7db99"];

interface ProjectCubeProps {
  project: (typeof projects)[number];
  index: number;
  selected: boolean;
  onSelect: () => void;
}

function ProjectCube({ project, index, selected, onSelect }: ProjectCubeProps) {
  const cubeRef = useRef<THREE.Mesh>(null);
  const basePosition = cubePositions[index];

  useFrame(({ clock }) => {
    if (!cubeRef.current) return;

    const time = clock.getElapsedTime();
    cubeRef.current.position.y = basePosition[1] + Math.sin(time * 1.2 + index) * 0.18;
    cubeRef.current.rotation.x = time * (0.16 + index * 0.025);
    cubeRef.current.rotation.y = time * (0.22 + index * 0.035);
  });

  return (
    <group position={basePosition}>
      <mesh ref={cubeRef} castShadow onClick={onSelect}>
        <boxGeometry args={[1.65, 1.65, 1.65]} />
        <meshStandardMaterial
          color={cubeColors[index]}
          emissive={cubeColors[index]}
          emissiveIntensity={selected ? 0.25 : 0.06}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      <Html center position={[0, 1.2, 0]} distanceFactor={8}>
        <button
          type="button"
          onClick={onSelect}
          className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm transition ${
            selected
              ? "border-secondary bg-accent text-primary"
              : "border-primary/20 slight-accent text-primary"
          }`}
        >
          {project.title}
        </button>
      </Html>
    </group>
  );
}

interface ProjectsSceneProps {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

function ProjectsScene({ selectedId, onSelect }: ProjectsSceneProps) {
  const sceneRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.22) * 0.12;
    }
  });

  return (
    <group ref={sceneRef}>
      {projects.map((project, index) => (
        <ProjectCube
          key={project.id}
          project={project}
          index={index}
          selected={selectedId === project.id}
          onSelect={() => onSelect(project.id)}
        />
      ))}
    </group>
  );
}

export default function ProjectsPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const selectedProject = projects.find((project) => project.id === expandedId) ?? projects[0];

  return (
    <BaseLayout>
      <DottedGridBackground fixed={true} />

      <div className="min-h-screen overflow-hidden px-4 pb-32 pt-36 sm:px-6 sm:pt-44">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <h1
            className={`text-3xl mt-4 font-light uppercase tracking-[0.2em] text-secondary`}
            style={{ animation: "fade-in 1s ease-in-out" }}
          >
            Projects
          </h1>

          <div className="mt-12 h-[28rem] w-full overflow-hidden rounded-[2rem] sm:h-[34rem]">
            <Canvas
              camera={{ position: [0, 1.2, 8], fov: 42 }}
              shadows
              dpr={[1, 2]}
              fallback={<div className="flex h-full items-center justify-center text-sm text-primary/70">3D preview unavailable</div>}
            >
              <ambientLight intensity={1.2} />
              <directionalLight castShadow intensity={2.2} position={[4, 6, 5]} />
              <pointLight intensity={12} distance={12} color="#bc5644" position={[-4, 1, 3]} />
              <ProjectsScene selectedId={expandedId} onSelect={setExpandedId} />
            </Canvas>
          </div>

          <section className="mt-8 w-full max-w-xl border-l-2 border-secondary px-5 py-1" aria-live="polite">
            <p className="text-xs uppercase tracking-[0.25em] text-secondary">Current project</p>
            <h2 className="mt-3 text-2xl font-semibold text-primary">{selectedProject.title}</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-primary/70">{selectedProject.details}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {selectedProject.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-primary/15 px-3 py-1 text-xs text-primary/70">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </BaseLayout>
  );
}