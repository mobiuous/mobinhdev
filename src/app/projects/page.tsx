"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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
  {
    id: 4,
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
  [-3.9, 0.6, 0],
  [0, 1.7, 0.1],
  [3.9, 0.1, 0.5],
  [0.1, -1.9, 0.9],
];

const mobileCubePositions: [number, number, number][] = [
  [0, 6, 0],
  [0, 2.1, 0.1],
  [0, -2.1, 0.5],
  [0, -6.6, 0.5],
];

const cubeColors = ["#bc5644", "#b2ce75", "#d7db99"];
const cubeSize = 1.65;

function getMobileCubePosition(index: number): [number, number, number] {
  return mobileCubePositions[index] ?? [0, -5.4 - (index - 3) * 1.8, 0.5];
}

interface ProjectCubeProps {
  project: (typeof projects)[number];
  index: number;
  origin: [number, number, number];
  mobileLayout: boolean;
  selected: boolean;
  hasSelection: boolean;
  onSelect: () => void;
}

function ProjectCube({ project, index, origin, mobileLayout, selected, hasSelection, onSelect }: ProjectCubeProps) {
  const cubeRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  useFrame(({ clock }) => {
    if (!cubeRef.current) return;

    const time = clock.getElapsedTime();
    const targetPosition = selected
      ? new THREE.Vector3(0, 0, 0)
      : new THREE.Vector3(origin[0], origin[1], origin[2] - (hasSelection ? 6 : 0));
    const targetScale = selected ? (mobileLayout ? 2.8 : 2.2) : mobileLayout ? 1.3 : 1;

    cubeRef.current.position.lerp(targetPosition, 0.08);
    cubeRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);

    if (!selected) {
      const targetQuaternion = new THREE.Quaternion();
      targetQuaternion.setFromEuler(new THREE.Euler(time * (0.16 + index * 0.025), time * (0.22 + index * 0.035), 0));

      cubeRef.current.position.y += Math.sin(time * 1.2 + index) * 0.02;
      cubeRef.current.quaternion.slerp(targetQuaternion, 0.08);
    } else {
      const targetQuaternion = new THREE.Quaternion();

      cubeRef.current.quaternion.slerp(targetQuaternion, 0.08);
    }

    camera.lookAt(0, 0, 0);
  });

  return (
    <mesh ref={cubeRef} position={origin} castShadow onClick={(event) => { event.stopPropagation(); onSelect(); }}>
      <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
      <meshStandardMaterial
        color={cubeColors[index % cubeColors.length]}
        emissive={cubeColors[index % cubeColors.length]}
        emissiveIntensity={selected ? 0.25 : 0.06}
        roughness={0.3}
        metalness={0.2}
      />
    </mesh>
  );
}

interface ProjectsSceneProps {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

function ProjectsScene({ selectedId, onSelect }: ProjectsSceneProps) {
  const hasSelection = selectedId !== null;
  const { camera, size } = useThree();
  const perspectiveCamera = camera as THREE.PerspectiveCamera;

  const aspect = size.width / size.height;
  const mobileLayout = aspect < 1.5;
  const targetFov = mobileLayout ? 50 : 45;
  const mobilePositions = projects.map((_, index) => getMobileCubePosition(index));
  const mobileVerticalExtent = Math.max(...mobilePositions.map(([, y]) => Math.abs(y))) + cubeSize;
  const targetZ = mobileLayout
    ? Math.max(8, mobileVerticalExtent / Math.tan(THREE.MathUtils.degToRad(targetFov / 2)) + 0.35)
    : 8;

  perspectiveCamera.fov = targetFov;
  perspectiveCamera.position.z = targetZ;
  perspectiveCamera.updateProjectionMatrix();

  return (
    <group ref={null}>
      {projects.map((project, index) => (
        <ProjectCube
          key={project.id}
          project={project}
          index={index}
          origin={(mobileLayout ? getMobileCubePosition(index) : cubePositions[index])}
          mobileLayout={mobileLayout}
          selected={selectedId === project.id}
          hasSelection={hasSelection}
          onSelect={() => onSelect(project.id)}
        />
      ))}
    </group>
  );
}

export default function ProjectsPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

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

          <div className="relative mt-12 h-[90dvh] min-h-[36rem] w-screen overflow-hidden rounded-[2rem]">
            <Canvas
              camera={{ position: [0, 1.2, 8] }}
              onPointerMissed={() => setSelectedId(null)}
              shadows
              dpr={[1, 2]}
              fallback={<div className="flex h-full items-center justify-center text-sm text-primary/70">3D preview unavailable</div>}
            >
              <ambientLight intensity={1.2} />
              <directionalLight castShadow intensity={2.2} position={[4, 6, 5]} />
              <pointLight intensity={12} distance={12} color="#bc5644" position={[-4, 1, 3]} />
              <ProjectsScene
                selectedId={selectedId}
                onSelect={(id) => {
                  setSelectedId((currentId) => (currentId === id ? null : id));
                }}
              />
            </Canvas>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}