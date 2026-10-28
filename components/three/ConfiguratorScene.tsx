"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { drawBackdrop, type BackdropConfig } from "@/lib/backdrop";
import { Bubbles, Fishes, Plants, Rocks, School, useSharedTime } from "./Underwater";

const U = 1 / 50; // 50 cm = 1 Einheit

function Backdrop({ config, w, h, z }: { config: BackdropConfig; w: number; h: number; z: number }) {
  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = Math.max(256, Math.round((1024 * config.height) / config.width));
    drawBackdrop(c, config.style, config.colors, config.seed);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }, [config.style, config.colors, config.seed, config.width, config.height]);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <group position={[0, 0, z]}>
      <mesh position={[0, h / 2, 0]}>
        <boxGeometry args={[w, h, (config.thickness / 10) * U * 4]} />
        <meshStandardMaterial
          attach="material-4"
          map={texture}
          emissive="#ffffff"
          emissiveMap={texture}
          emissiveIntensity={config.led ? 0.75 : 0.05}
          roughness={0.25}
        />
        <meshStandardMaterial attach="material-0" color="#cfe3ec" transparent opacity={0.6} />
        <meshStandardMaterial attach="material-1" color="#cfe3ec" transparent opacity={0.6} />
        <meshStandardMaterial attach="material-2" color="#cfe3ec" transparent opacity={0.6} />
        <meshStandardMaterial attach="material-3" color="#cfe3ec" transparent opacity={0.6} />
        <meshStandardMaterial attach="material-5" color="#dfe9ef" />
      </mesh>
      {config.led && (
        <>
          <mesh position={[0, 0.015, 0.03]}>
            <boxGeometry args={[w * 0.98, 0.02, 0.02]} />
            <meshBasicMaterial color="#e8fbff" toneMapped={false} />
          </mesh>
          <pointLight position={[0, h * 0.3, 0.4]} intensity={3} distance={h * 3 + 2} color="#bfe9ff" />
        </>
      )}
    </group>
  );
}

function Tank({ config }: { config: BackdropConfig }) {
  const time = useSharedTime(1);
  const w = config.width * U;
  const h = config.height * U;
  const d = config.depth * U;
  const g = 0.012;
  const cabinetH = 0.75 * 1.4;

  const glass = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#e9f7ff",
        transparent: true,
        opacity: 0.16,
        roughness: 0.04,
        metalness: 0,
        clearcoat: 1,
        envMapIntensity: 1.4,
        depthWrite: false,
      }),
    [],
  );
  useEffect(() => () => glass.dispose(), [glass]);

  const clumps = useMemo<[number, number, number][]>(
    () =>
      [-0.36, -0.26, -0.12, 0.18, 0.3, 0.38].map((f, i) => [f * w, 0, -d * (0.22 + (i % 2) * 0.08)]),
    [w, d],
  );
  const rocks = useMemo<[number, number, number, number][]>(
    () => [
      [-w * 0.22, 0.04, -d * 0.1, Math.min(h, d) * 0.22],
      [-w * 0.1, 0.02, d * 0.08, Math.min(h, d) * 0.12],
      [w * 0.28, 0.04, -d * 0.05, Math.min(h, d) * 0.18],
    ],
    [w, h, d],
  );

  return (
    <group position={[0, cabinetH, 0]}>
      {/* Unterschrank */}
      <mesh position={[0, -cabinetH / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w + 0.06, cabinetH, d + 0.06]} />
        <meshStandardMaterial color="#f6f8f9" roughness={0.5} />
      </mesh>
      <mesh position={[0, -cabinetH / 2, d / 2 + 0.031]}>
        <planeGeometry args={[0.004, cabinetH * 0.86]} />
        <meshBasicMaterial color="#c9d3da" />
      </mesh>
      {/* Bodengrund */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[w - g * 2, 0.1, d - g * 2]} />
        <meshStandardMaterial color="#d6c49a" roughness={1} />
      </mesh>
      {/* Wasser */}
      <mesh position={[0, (h - 0.06) / 2, 0]}>
        <boxGeometry args={[w - g * 2, h - 0.06, d - g * 2]} />
        <meshPhysicalMaterial color="#7fd0f2" transparent opacity={0.13} roughness={0.1} depthWrite={false} />
      </mesh>
      {/* Glasscheiben */}
      <mesh position={[0, h / 2, d / 2]} material={glass}>
        <boxGeometry args={[w, h, g]} />
      </mesh>
      <mesh position={[0, h / 2, -d / 2]} material={glass}>
        <boxGeometry args={[w, h, g]} />
      </mesh>
      <mesh position={[-w / 2, h / 2, 0]} material={glass}>
        <boxGeometry args={[g, h, d]} />
      </mesh>
      <mesh position={[w / 2, h / 2, 0]} material={glass}>
        <boxGeometry args={[g, h, d]} />
      </mesh>
      {/* Silikonkanten */}
      {[
        [-w / 2, d / 2],
        [w / 2, d / 2],
        [-w / 2, -d / 2],
        [w / 2, -d / 2],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, h / 2, z]}>
          <boxGeometry args={[0.012, h, 0.012]} />
          <meshStandardMaterial color="#1b2733" />
        </mesh>
      ))}

      <group position={[0, 0.1, 0]}>
        <Rocks items={rocks} />
        <Plants clumps={clumps} bladesPerClump={9} height={[h * 0.4, h * 0.78]} spread={[w * 0.1, d * 0.12]} sway={0.35} width={0.55} time={time} />
        <School count={16} center={[0, h * 0.55, 0]} radius={[w * 0.26, h * 0.12, d * 0.12]} spread={Math.min(w, d * 2) * 0.16} scale={0.032} time={time} />
        <Fishes
          kind="frontosa"
          count={config.width >= 100 ? 2 : 1}
          area={[w * 0.26, h * 0.12, d * 0.15]}
          center={[0, h * 0.45, 0]}
          scale={0.085 * Math.min(1.6, h * 1.4)}
          speed={0.2}
          time={time}
        />
        <Bubbles count={18} sources={[[w * 0.32, 0, -d * 0.2]]} top={h - 0.2} time={time} />
      </group>

      <Backdrop config={config} w={w} h={h} z={-d / 2 - 0.03} />

      {/* Abdeckung / Licht */}
      <mesh position={[0, h + 0.02, 0]}>
        <boxGeometry args={[w * 0.92, 0.025, 0.12]} />
        <meshStandardMaterial color="#0b2e5e" metalness={0.4} roughness={0.4} />
      </mesh>
    </group>
  );
}

export default function ConfiguratorScene({ config }: { config: BackdropConfig }) {
  const w = config.width * U;
  const dist = Math.max(3.4, w * 1.55 + 1.2);
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [dist * 0.35, 1.9, dist], fov: 38 }}
      gl={{ antialias: true, preserveDrawingBuffer: false }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
      }}
    >
      <color attach="background" args={["#e9f0f4"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 6, 4]} intensity={1.6} castShadow />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} position={[0, 5, 2]} scale={[8, 2, 1]} rotation={[Math.PI / 2, 0, 0]} />
        <Lightformer form="rect" intensity={1.5} position={[-5, 2, 1]} scale={[3, 6, 1]} rotation={[0, Math.PI / 2, 0]} />
        <Lightformer form="rect" intensity={1.5} position={[5, 2, 1]} scale={[3, 6, 1]} rotation={[0, -Math.PI / 2, 0]} />
        <Lightformer form="ring" color="#8ed4f2" intensity={1} position={[0, 2, -5]} scale={3} />
      </Environment>
      <Tank config={config} />
      <ContactShadows position={[0, 0, 0]} opacity={0.35} scale={w + 4} blur={2.4} far={2} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <circleGeometry args={[12, 48]} />
        <meshStandardMaterial color="#e3ebf0" roughness={1} />
      </mesh>
      <OrbitControls
        target={[0, 1.05 + (config.height * U) / 2, 0]}
        enablePan={false}
        minDistance={2}
        maxDistance={dist * 1.6}
        minPolarAngle={Math.PI * 0.18}
        maxPolarAngle={Math.PI * 0.52}
        minAzimuthAngle={-Math.PI * 0.6}
        maxAzimuthAngle={Math.PI * 0.6}
        enableDamping
      />
    </Canvas>
  );
}
