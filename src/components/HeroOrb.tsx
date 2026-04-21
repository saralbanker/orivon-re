import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * Crystal Obsidian — sharp, faceted, low-poly gem with a deep cyan/violet
 * inner glow. Lightweight (no env map, no clearcoat) so it renders fast on
 * any device.
 */
function Crystal() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.35;
    ref.current.rotation.x = Math.sin(performance.now() * 0.0004) * 0.2;
  });

  // Build a sharp, irregular crystal by deforming an octahedron's vertices
  const geometry = useMemo(() => {
    const g = new THREE.OctahedronGeometry(1.1, 1);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      // stretch vertically + asymmetric facets
      const sy = y > 0 ? 1.55 : 0.85;
      const noise = 1 + (Math.sin(x * 4) + Math.cos(z * 5)) * 0.04;
      pos.setXYZ(i, x * 0.9 * noise, y * sy, z * 0.9 * noise);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.2}>
      <group ref={ref} scale={1.35}>
        {/* Core crystal */}
        <mesh geometry={geometry} castShadow>
          <meshPhysicalMaterial
            color="#0b1230"
            emissive="#22d3ee"
            emissiveIntensity={0.35}
            metalness={0.6}
            roughness={0.15}
            transmission={0.55}
            thickness={1.4}
            ior={1.6}
            attenuationColor="#67e8f9"
            attenuationDistance={1.2}
            flatShading
          />
        </mesh>
        {/* Faceted wireframe overlay for that obsidian edge sparkle */}
        <mesh geometry={geometry} scale={1.001}>
          <meshBasicMaterial color="#67e8f9" wireframe transparent opacity={0.35} />
        </mesh>
      </group>
    </Float>
  );
}

function Halo() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.3;
    ref.current.rotation.x += delta * 0.1;
  });
  return (
    <mesh ref={ref} scale={2.6}>
      <torusGeometry args={[1, 0.008, 12, 160]} />
      <meshBasicMaterial color="#67e8f9" transparent opacity={0.5} />
    </mesh>
  );
}

export const HeroOrb = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute inset-8 rounded-full bg-secondary/15 blur-3xl" />
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="!absolute inset-0"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.45} />
          <pointLight position={[4, 5, 4]} intensity={2.4} color="#22d3ee" />
          <pointLight position={[-4, -3, -4]} intensity={1.6} color="#a855f7" />
          <pointLight position={[0, -5, 2]} intensity={0.9} color="#67e8f9" />
          <Crystal />
          <Halo />
        </Suspense>
      </Canvas>
    </div>
  );
};