'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars, OrbitControls, Ring } from '@react-three/drei';
import * as THREE from 'three';

function HolographicGlobe() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.1;
    }
  });

  return (
    <group>
      {/* Core sphere */}
      <Sphere ref={meshRef} args={[1.4, 64, 64]}>
        <MeshDistortMaterial
          color="#00f5ff"
          wireframe={false}
          transparent
          opacity={0.08}
          distort={0.3}
          speed={1.5}
          roughness={0}
          metalness={0.9}
        />
      </Sphere>

      {/* Wireframe layer */}
      <Sphere ref={wireRef} args={[1.42, 24, 24]}>
        <meshBasicMaterial color="#00f5ff" wireframe transparent opacity={0.12} />
      </Sphere>

      {/* Outer glow ring */}
      <Ring args={[1.6, 1.62, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.3} side={THREE.DoubleSide} />
      </Ring>
      <Ring args={[1.9, 1.92, 64]} rotation={[Math.PI / 3, 0.2, 0]}>
        <meshBasicMaterial color="#b300ff" transparent opacity={0.2} side={THREE.DoubleSide} />
      </Ring>

      {/* Orbiting dot */}
      <Float speed={3} rotationIntensity={0} floatIntensity={0}>
        <group rotation={[0, 0, Math.PI / 6]}>
          <mesh position={[2.0, 0, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#00f5ff" />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function FloatingParticles() {
  const count = 120;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  const particlesRef = useRef<THREE.Points>(null!);
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#00f5ff" size={0.03} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function HeroGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#00f5ff" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#b300ff" />

      <Stars radius={80} depth={50} count={2000} factor={3} saturation={0} fade />

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <HolographicGlobe />
      </Float>

      <FloatingParticles />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
}
