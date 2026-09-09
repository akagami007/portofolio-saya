"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const projects = [
  { id: 1, title: "E-Commerce\nPlatform", color: "#1e3a8a", desc: "Next.js & Stripe" },
  { id: 2, title: "QA Automation\nSuite", color: "#064e3b", desc: "Playwright" },
  { id: 3, title: "Realtime\nChat App", color: "#4c1d95", desc: "Socket.io" },
  { id: 4, title: "DevOps\nDashboard", color: "#78350f", desc: "Docker & K8s" },
  { id: 5, title: "Fintech\nMobile App", color: "#831843", desc: "React Native" },
  { id: 6, title: "AI Image\nGenerator", color: "#083344", desc: "OpenAI API" },
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
            <mesh>
              <planeGeometry args={[2, 2.5]} />
              <meshStandardMaterial 
                color={project.color} 
                side={THREE.DoubleSide} 
                roughness={0.2} 
                metalness={0.5} 
              />
            </mesh>
            <Text
              position={[0, 0.4, 0.01]}
              fontSize={0.25}
              color="white"
              anchorX="center"
              anchorY="middle"
              textAlign="center"
              maxWidth={1.8}
              font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
            >
              {project.title}
            </Text>
            <Text
              position={[0, -0.4, 0.01]}
              fontSize={0.15}
              color="#cbd5e1"
              anchorX="center"
              anchorY="middle"
              textAlign="center"
              maxWidth={1.8}
              font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
            >
              {project.desc}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

export default function ProjectCarousel3D() {
  return (
    <div className="w-full h-[600px] cursor-grab active:cursor-grabbing relative">
      <Canvas camera={{ position: [0, 1, 7], fov: 50 }}>
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
      </Canvas>
      <div className="absolute bottom-4 left-0 right-0 text-center text-gray-400 text-sm pointer-events-none">
        ← Drag to rotate gallery →
      </div>
    </div>
  );
}
