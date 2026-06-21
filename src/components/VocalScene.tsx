"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Torus, Cylinder } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// 진폭(0~1)에 반응해 맥동하는 사운드 오브. 루틴 진행 중 활성 색으로 빛난다.
function PulseOrb({ active, color }: { active: boolean; color: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const base = useMemo(() => new THREE.Color(color), [color]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mesh.current) {
      const pulse = active ? 1 + Math.sin(t * 4) * 0.12 + Math.sin(t * 7) * 0.05 : 1 + Math.sin(t * 1.5) * 0.04;
      mesh.current.scale.setScalar(pulse);
      mesh.current.rotation.y = t * 0.25;
      mesh.current.rotation.x = Math.sin(t * 0.4) * 0.2;
    }
    if (mat.current) {
      mat.current.emissiveIntensity = active ? 0.6 + Math.sin(t * 5) * 0.25 : 0.3;
    }
  });

  return (
    <Icosahedron ref={mesh} args={[1.15, 2]}>
      <meshStandardMaterial
        ref={mat}
        color={base}
        emissive={base}
        emissiveIntensity={0.35}
        roughness={0.25}
        metalness={0.4}
        flatShading
      />
    </Icosahedron>
  );
}

// 떠다니는 3D 마이크
function Mic({ color }: { color: string }) {
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      <group position={[2.4, 1.3, -1]} rotation={[0.3, 0.4, 0.2]} scale={0.5}>
        <Icosahedron args={[0.55, 1]} position={[0, 0.9, 0]}>
          <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.3} wireframe />
        </Icosahedron>
        <Cylinder args={[0.18, 0.18, 1.4, 16]} position={[0, -0.2, 0]}>
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.35} />
        </Cylinder>
      </group>
    </Float>
  );
}

// 회전하는 사운드 링들
function Rings({ color, active }: { color: string; active: boolean }) {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (g.current) {
      g.current.rotation.z = s.clock.elapsedTime * (active ? 0.5 : 0.18);
      g.current.rotation.x = 1.2 + Math.sin(s.clock.elapsedTime * 0.3) * 0.1;
    }
  });
  return (
    <group ref={g}>
      {[1.9, 2.4, 2.9].map((r, i) => (
        <Torus key={i} args={[r, 0.012, 8, 80]}>
          <meshBasicMaterial color={color} transparent opacity={0.18 + i * 0.04} />
        </Torus>
      ))}
    </group>
  );
}

export default function VocalScene({ active = false, color = "#a78bfa" }: { active?: boolean; color?: string }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={120} color={color} />
      <pointLight position={[-5, -3, 2]} intensity={60} color="#22d3ee" />
      <PulseOrb active={active} color={color} />
      <Rings color={color} active={active} />
      <Mic color={color} />
    </Canvas>
  );
}
