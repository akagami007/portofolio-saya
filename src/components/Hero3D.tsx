"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Float, Sparkles, Icosahedron, Box, TorusKnot, Text } from "@react-three/drei";
import { Suspense } from "react";

export default function Hero3D() {
  return (
    <div className="w-full h-[60vh] md:h-[80vh] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-10, -10, -10]} intensity={1} color="#00ffff" />
          <pointLight position={[0, 0, 0]} intensity={2} color="#3b82f6" />
          
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <Sparkles count={150} scale={12} size={3} speed={0.4} opacity={0.4} color="#00ffff" />

          <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <group>
              {/* Outer Architecture / Network Wireframe */}
              <Icosahedron args={[2, 1]}>
                <meshStandardMaterial color="#00ffff" wireframe transparent opacity={0.3} />
              </Icosahedron>
              
              {/* Inner Core (Logic/Database) */}
              <Icosahedron args={[1.2, 1]}>
                <meshPhysicalMaterial 
                  color="#1e3a8a"
                  emissive="#0f172a"
                  roughness={0.1}
                  metalness={0.8}
                  clearcoat={1}
                  clearcoatRoughness={0.1}
                />
              </Icosahedron>

              {/* Floating Code Symbols */}
              <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.5} position={[-2.5, 1, 1]}>
                <Text fontSize={0.7} color="#4ade80" fontWeight="bold">{'</>'}</Text>
              </Float>
              <Float speed={3} rotationIntensity={0.5} floatIntensity={1} position={[2.5, -1, 1]}>
                <Text fontSize={0.7} color="#f472b6" fontWeight="bold">{'{ }'}</Text>
              </Float>
              <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2} position={[0, 2.5, 0]}>
                <Text fontSize={0.6} color="#a855f7" fontWeight="bold">{'[ ]'}</Text>
              </Float>

              {/* Orbiting Data Modules */}
              <Float speed={4} rotationIntensity={2} floatIntensity={1} position={[1.8, 1.5, -1]}>
                <Box args={[0.4, 0.4, 0.4]}>
                  <meshStandardMaterial color="#00ffff" wireframe />
                </Box>
              </Float>
              <Float speed={3} rotationIntensity={2} floatIntensity={1.5} position={[-1.8, -1.5, 0]}>
                <TorusKnot args={[0.2, 0.05, 64, 8]}>
                  <meshPhysicalMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
                </TorusKnot>
              </Float>
            </group>
          </Float>

          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={0.5} 
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
