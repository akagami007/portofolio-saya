"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls, Image } from "@react-three/drei";
import * as THREE from "three";

const projects = [
  { id: 1, title: "E-Commerce", desc: "Next.js & Stripe", image: "/projects/1.jpg" },
  { id: 2, title: "QA Automation", desc: "Playwright", image: "/projects/2.jpg" },
  { id: 3, title: "Chat App", desc: "Socket.io", image: "/projects/3.jpg" },
  { id: 4, title: "DevOps", desc: "Docker & K8s", image: "/projects/4.jpg" },
  { id: 5, title: "Fintech App", desc: "React Native", image: "/projects/5.jpg" },
  { id: 6, title: "AI Generator", desc: "OpenAI API", image: "/projects/6.jpg" },
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
            <mesh position={[0, -0.6, 0.01]}>
              <planeGeometry args={[3.2, 0.6]} />
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
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#blue" />
          
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
