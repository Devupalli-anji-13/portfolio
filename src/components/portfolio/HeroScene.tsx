import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshTransmissionMaterial, Text } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const CYAN = "#00E5FF";
const VIOLET = "#8B5CF6";

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.6 + Math.random() * 2.4;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      arr[i * 3 + 2] = r * Math.cos(p);
    }
    return arr;
  }, [count]);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += Math.min(d, 0.05) * 0.04;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color={CYAN} transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Ring({ radius, tilt, speed, color }: { radius: number; tilt: [number, number, number]; speed: number; color: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.z += Math.min(d, 0.05) * speed;
  });
  return (
    <group rotation={tilt}>
      <group ref={ref}>
        <mesh>
          <torusGeometry args={[radius, 0.008, 8, 160]} />
          <meshBasicMaterial color={color} transparent opacity={0.55} />
        </mesh>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
        </mesh>
      </group>
    </group>
  );
}

function Core({ mobile }: { mobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  useFrame((state, raw) => {
    const d = Math.min(raw, 0.05);
    if (inner.current) {
      inner.current.rotation.x += d * 0.3;
      inner.current.rotation.y += d * 0.45;
    }
    if (group.current) {
      const k = 1 - Math.exp(-3 * d);
      group.current.rotation.y += (state.pointer.x * 0.5 - group.current.rotation.y) * k;
      group.current.rotation.x += (-state.pointer.y * 0.3 - group.current.rotation.x) * k;
    }
  });
  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh>
          <sphereGeometry args={[1.35, 64, 64]} />
          {mobile ? (
            <meshPhysicalMaterial transmission={1} roughness={0.05} thickness={1} ior={1.4} color="#cfefff" />
          ) : (
            <MeshTransmissionMaterial
              samples={4}
              resolution={256}
              thickness={0.8}
              roughness={0.05}
              chromaticAberration={0.25}
              anisotropy={0.2}
              ior={1.35}
              color="#d8f6ff"
              backside
            />
          )}
        </mesh>
        <mesh ref={inner}>
          <icosahedronGeometry args={[0.62, 0]} />
          <meshStandardMaterial color="#9aa4b2" metalness={1} roughness={0.18} />
        </mesh>
        <mesh scale={0.66}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.25} />
        </mesh>
        <Text position={[-1.9, 1.1, 0.4]} fontSize={0.22} color={CYAN} anchorX="center">{"</>"}</Text>
        <Text position={[1.95, -0.9, 0.3]} fontSize={0.2} color={VIOLET} anchorX="center">{"{ }"}</Text>
        <Text position={[1.6, 1.5, -0.4]} fontSize={0.14} color="#9CA3AF" anchorX="center">def build():</Text>
      </Float>
      <Ring radius={2.0} tilt={[1.2, 0.2, 0]} speed={0.5} color={CYAN} />
      <Ring radius={2.35} tilt={[1.9, -0.5, 0.3]} speed={-0.35} color={VIOLET} />
      <Ring radius={2.7} tilt={[0.6, 0.9, 0]} speed={0.2} color={CYAN} />
    </group>
  );
}

export default function HeroScene() {
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <Canvas dpr={[1, mobile ? 1.5 : 2]} camera={{ position: [0, 0, 6.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 3, 4]} intensity={40} color={CYAN} />
      <pointLight position={[-4, -2, 2]} intensity={30} color={VIOLET} />
      <directionalLight position={[0, 5, 5]} intensity={1.2} />
      <Environment resolution={128}>
        <Lightformer intensity={3} color={CYAN} position={[3, 2, 3]} scale={[4, 4, 1]} />
        <Lightformer intensity={2} color={VIOLET} position={[-4, -1, 2]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} />
        <Lightformer intensity={1.5} position={[0, 5, -3]} scale={[10, 2, 1]} />
      </Environment>
      <Core mobile={mobile} />
      <Particles count={mobile ? 250 : 700} />
    </Canvas>
  );
}
