"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { createPortal } from "react-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls, Image, useCursor } from "@react-three/drei";
import * as THREE from "three";
import { useLanguage } from "@/context/LanguageContext";

export interface Project {
  id: number;
  title: string;
  desc: string;
  image: string;
  github: string;
  longDesc: string;
  tags: string[];
}

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



function Carousel({ onSelect }: { onSelect: (project: Project) => void }) {
  const { t } = useLanguage();
  const projectsData = (t.projects?.items || []) as Project[];
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const isHoveredRef = useRef(false);
  const radius = 3.5;

  // Use drei's declarative cursor management
  useCursor(hovered, 'pointer', 'auto');

  useFrame((state, delta) => {
    if (groupRef.current && !isHoveredRef.current) {
      // 0.2 rad/s rotation, normalized to time delta so it runs at the same speed on 60hz vs 144hz monitors
      groupRef.current.rotation.y += 0.2 * delta;
    }
  });

  return (
    <group ref={groupRef}>
      {projectsData.map((project, i) => {
        const angle = (i / projectsData.length) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        return (
          <group
            key={project.id}
            position={[x, 0, z]}
            rotation={[0, angle, 0]}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered(true);
              isHoveredRef.current = true;
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHovered(false);
              isHoveredRef.current = false;
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
          >
            <Image
              url={project.image}
              transparent
              opacity={0.9}
              scale={[3.2, 1.8]} // 16:9 aspect ratio
            />
            {/* Dark overlay for text readability */}
            <mesh position={[0, -0.5, 0.01]}>
              <planeGeometry args={[3.2, 0.3]} />
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <div className="w-full h-[600px] relative cursor-auto">
      <Canvas camera={{ position: [0, 1, 7], fov: 50 }}>
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0000ff" />
          <Carousel onSelect={setSelectedProject} />

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
      <div className="absolute bottom-4 left-0 right-0 text-center text-gray-500 dark:text-gray-400 text-sm pointer-events-none transition-colors">
        {t.projects.dragHint}
      </div>

      {/* Modal Overlay */}
      {selectedProject && mounted && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/20 dark:bg-black/60 backdrop-blur-md transition-all duration-300">
          {/* Modal Container */}
          <div
            className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-2xl max-w-2xl w-full shadow-2xl relative overflow-hidden transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image Area / Gradient */}
            <div className="h-32 bg-gradient-to-br from-blue-100 dark:from-blue-900/40 via-blue-50 dark:via-blue-800/20 to-white dark:to-black w-full absolute top-0 left-0 -z-10 border-b border-gray-100 dark:border-white/5 transition-colors"></div>

            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-black/50 hover:bg-gray-200 dark:hover:bg-black/80 rounded-full p-2 transition-all backdrop-blur-sm"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>

            <div className="p-8 pt-12">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wider uppercase transition-colors">{selectedProject.desc}</span>
              </div>

              <h3 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white tracking-tight transition-colors">{selectedProject.title}</h3>

              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed font-light transition-colors">
                {selectedProject.longDesc}
              </p>

              <div className="mb-8">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 transition-colors">{t.projects.technologies}</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags?.map((tag: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-sm text-gray-600 dark:text-gray-300 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-white/10 transition-colors">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] dark:shadow-[0_0_20px_rgba(37,99,235,0.3)] transform hover:-translate-y-0.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                  {t.projects.viewRepo}
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
