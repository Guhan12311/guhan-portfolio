'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const TECH_ITEMS = [
  { label: 'React', color: '#61dafb', pos: [2.5, 1, 0] as [number,number,number] },
  { label: 'Python', color: '#3776ab', pos: [-2.5, 0.5, 0.5] as [number,number,number] },
  { label: 'Next.js', color: '#ffffff', pos: [0, 2.2, 0] as [number,number,number] },
  { label: 'TypeScript', color: '#3178c6', pos: [2.5, -1, 0.5] as [number,number,number] },
  { label: 'FastAPI', color: '#009688', pos: [-2, -1.5, 0] as [number,number,number] },
  { label: 'MongoDB', color: '#47a248', pos: [0.5, -2.2, 0] as [number,number,number] },
  { label: 'LangChain', color: '#1c3c3c', pos: [-1, 2, 0.5] as [number,number,number] },
  { label: 'OpenAI', color: '#74aa9c', pos: [1.5, 0.5, -1] as [number,number,number] },
  { label: 'Docker', color: '#2496ed', pos: [-2, 1.5, -0.5] as [number,number,number] },
  { label: 'Gemini', color: '#8e24aa', pos: [0, -0.5, 2] as [number,number,number] },
];

function TechNode({ label, color, pos }: { label: string; color: string; pos: [number,number,number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={1.5 + Math.random()} floatIntensity={0.3} rotationIntensity={0.2}>
      <group position={pos}>
        <mesh ref={meshRef}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.85}
          />
        </mesh>
        <Text
          position={[0, -0.5, 0]}
          fontSize={0.18}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/SpaceMono-Regular.ttf"
        >
          {label}
        </Text>
        {/* Glow */}
        <pointLight color={color} intensity={0.5} distance={1.5} />
      </group>
    </Float>
  );
}

function CenterCore() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.4;
      ref.current.rotation.x = clock.getElapsedTime() * 0.2;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.6, 1]} />
      <meshStandardMaterial
        color="#00f5ff"
        emissive="#00f5ff"
        emissiveIntensity={0.4}
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

export default function TechStack3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#00f5ff" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#b300ff" />

      <CenterCore />

      {TECH_ITEMS.map(item => (
        <TechNode key={item.label} {...item} />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1}
      />
    </Canvas>
  );
}
