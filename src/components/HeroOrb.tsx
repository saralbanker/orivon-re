import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

function Orb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.25;
    ref.current.rotation.x += delta * 0.08;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.4}>
      <mesh ref={ref} scale={1.6}>
        <icosahedronGeometry args={[1, 24]} />
        <MeshDistortMaterial
          color="#22d3ee"
          emissive="#0891b2"
          emissiveIntensity={0.6}
          distort={0.45}
          speed={2.2}
          roughness={0.15}
          metalness={0.85}
          clearcoat={1}
        />
      </mesh>
    </Float>
  );
}

function Halo() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.4;
    ref.current.rotation.x += delta * 0.15;
  });
  return (
    <mesh ref={ref} scale={2.4}>
      <torusGeometry args={[1, 0.012, 16, 200]} />
      <meshBasicMaterial color="#67e8f9" transparent opacity={0.6} />
    </mesh>
  );
}

export const HeroOrb = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl" />
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
        className="!absolute inset-0"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#22d3ee" />
          <pointLight position={[-5, -3, -5]} intensity={1.5} color="#a855f7" />
          <Orb />
          <Halo />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

/** Smaller persistent rotating accent for non-home pages */
export const RotatingAccent = ({ className = "" }: { className?: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame;
  return (
    <div
      className={`pointer-events-none fixed top-1/2 -translate-y-1/2 right-[-80px] z-[1] hidden lg:block w-[260px] h-[260px] opacity-50 ${className}`}
      aria-hidden="true"
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[3, 3, 3]} intensity={1.5} color="#22d3ee" />
          <Float speed={1} rotationIntensity={1.2} floatIntensity={0.8}>
            <mesh ref={ref} scale={1.2}>
              <torusKnotGeometry args={[0.7, 0.18, 128, 16]} />
              <MeshDistortMaterial
                color="#22d3ee"
                emissive="#0e7490"
                emissiveIntensity={0.4}
                distort={0.25}
                speed={1.5}
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
};