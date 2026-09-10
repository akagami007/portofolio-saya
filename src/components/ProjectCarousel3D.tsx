"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls, Image } from "@react-three/drei";
import * as THREE from "three";

// Suppress the THREE.Clock deprecation warning which comes from @react-three/fiber
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("THREE.Clock: This module has been deprecated")) {
      return;
    }
    originalWarn(...args);
  };
}

const projects = [
  { id: 1, title: "E-Commerce", desc: "Next.js & Stripe", image: "/projects/1.jpg", github: "https://github.com/" },
  { id: 2, title: "QA Manual & Automation", desc: "Playwright, Cypress & Katalon", image: "/projects/2.jpg", github: "https://github.com/" },
  { id: 3, title: "CMS OpenTrip", desc: "Next.js & Postgresql", image: "/projects/3.jpg", github: "https://github.com/" },
  { id: 4, title: "OpenTrip", desc: "Next.js & Express", image: "/projects/4.jpg", github: "https://github.com/" },
  { id: 5, title: "Kilau Kebaya", desc: "Next.js, Laravel, & Postgresql", image: "/projects/5.jpg", github: "https://github.com/" },
  { id: 6, title: "Coffeshop", desc: "Next.js & TailwindCSS", image: "/projects/6.jpg", github: "https://github.com/akagami007/kopi-kita.git" },
];

function Carousel() {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 3.5;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002; // Auto rotate slowly
    }
  });

  return (
    <group ref={groupRef}>
      {projects.map((project, i) => {
        const angle = (i / projects.length) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        return (
          <group key={project.id} position={[x, 0, z]} rotation={[0, angle, 0]}>
            <Image
              url={project.image}
              transparent
              opacity={0.9}
              scale={[3.2, 1.8]} // 16:9 aspect ratio
            />
            {/* Dark overlay for text readability */}
            <mesh position={[0, -0.7, 0.01]}>
              <planeGeometry args={[3.2, 0.8]} />
              <meshBasicMaterial color="#000000" transparent opacity={0.6} />
            </mesh>
            <Text
              position={[0, -0.5, 0.02]}
              fontSize={0.2}
              color="white"
              anchorX="center"
              anchorY="middle"
              textAlign="center"
              maxWidth={3}
            >
              {project.title}
            </Text>
            <Text
              position={[0, -0.75, 0.02]}
              fontSize={0.12}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
              textAlign="center"
              maxWidth={3}
            >
              {project.desc}
            </Text>
            <Text
              position={[0, -0.95, 0.02]}
              fontSize={0.12}
              color="#3b82f6"
              anchorX="center"
              anchorY="middle"
              textAlign="center"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.github, "_blank");
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "auto";
              }}
            >
              GitHub ↗
            </Text>
          </group>
        );
      })}
    </group>
  );
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#ffffff" wireframe />
    </mesh>
  );
}

export default function ProjectCarousel3D() {
  return (
    <div className="w-full h-[600px] cursor-grab active:cursor-grabbing relative">
      <Canvas camera={{ position: [0, 1, 7], fov: 50 }}>
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0000ff" />
          <Carousel />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableDamping 
            dampingFactor={0.05}
            maxPolarAngle={Math.PI / 2 + 0.1}
            minPolarAngle={Math.PI / 2 - 0.1}
          />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-4 left-0 right-0 text-center text-gray-400 text-sm pointer-events-none">
        ← Drag to rotate gallery →
      </div>
    </div>
  );
}
