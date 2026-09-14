"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, RoundedBox, Environment, ContactShadows, useCursor } from "@react-three/drei";
import * as THREE from "three";

const socials = [
  {
    id: "linkedin",
    name: "LinkedIn",
    symbol: "in",
    url: "https://www.linkedin.com/in/stefan-cornelius-9b2916a1/", // User can update this
    color: "#0077b5",
    emissive: "#003b5c"
  },
  {
    id: "github",
    name: "GitHub",
    symbol: "git",
    url: "https://github.com/akagami007",
    color: "#333333",
    emissive: "#111111"
  },
  {
    id: "email",
    name: "Email",
    symbol: "@",
    url: "mailto:stefancorneliusjr@gmail.com",
    color: "#ea4335",
    emissive: "#822218"
  },
  {
    id: "phone",
    name: "Phone",
    symbol: "📞",
    url: "tel:+6282323572250",
    color: "#25d366",
    emissive: "#126c33"
  }
];

function SocialIcon({
  position,
  data,
  index
}: {
  position: [number, number, number],
  data: typeof socials[0],
  index: number
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Clean, declarative cursor management
  useCursor(hovered, 'pointer', 'auto');

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating and rotation based on time and index offset
      const t = state.clock.getElapsedTime();

      // Target rotation and scale
      const targetRotationY = hovered ? Math.sin(t * 2) * 0.2 : Math.sin(t * 0.5 + index) * 0.3;
      const targetRotationX = hovered ? -0.1 : Math.cos(t * 0.3 + index) * 0.2;
      const targetScale = hovered ? 1.2 : 1.0;

      // Smoothly interpolate
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.1);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.1);

      const currentScale = meshRef.current.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.15);
      meshRef.current.scale.set(newScale, newScale, newScale);
    }
  });

  const handleClick = () => {
    window.open(data.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1} floatingRange={[-0.1, 0.1]}>
      <group position={position}>
        <mesh
          ref={meshRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHovered(false);
          }}
          onClick={handleClick}
        >
          {/* 3D Coin/Box shape for the icon */}
          <RoundedBox args={[2, 2, 0.4]} radius={0.4} smoothness={4}>
            <meshPhysicalMaterial
              color={hovered ? data.color : "#222222"}
              emissive={hovered ? data.emissive : "#000000"}
              emissiveIntensity={hovered ? 0.5 : 0}
              roughness={0.1}
              metalness={0.8}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </RoundedBox>

          {/* Symbol Text */}
          <Text
            position={[0, 0, 0.21]}
            fontSize={0.8}
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={hovered ? 0 : 0.02}
            outlineColor="#000000"
          >
            {data.symbol}
          </Text>

          {/* Label Text below the icon */}
          <Text
            position={[0, -1.6, 0]}
            fontSize={0.3}
            color={hovered ? "white" : "#888888"}
            anchorX="center"
            anchorY="middle"
          >
            {data.name}
          </Text>
        </mesh>
      </group>
    </Float>
  );
}

export default function SocialLinks3D() {
  const spacing = 3.5;
  const totalWidth = (socials.length - 1) * spacing;
  const startX = -totalWidth / 2;

  return (
    <div className="w-full h-[400px] relative">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, 10]} intensity={1} color="#00ffff" />
        <pointLight position={[10, -10, 10]} intensity={1} color="#ff00ff" />

        <Environment preset="city" />

        {socials.map((social, index) => (
          <SocialIcon
            key={social.id}
            data={social}
            index={index}
            position={[startX + index * spacing, 0, 0]}
          />
        ))}

        {/* Shadow plane at the bottom */}
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.4}
          scale={20}
          blur={2}
          far={4}
          color="#000000"
        />
      </Canvas>
    </div>
  );
}
