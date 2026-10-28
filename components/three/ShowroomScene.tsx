"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { drawBackdrop } from "@/lib/backdrop";

export type ShowroomFocus = "gesamt" | "werbeplatte" | "raumobjekt";

const VIEWS: Record<ShowroomFocus, { pos: [number, number, number]; target: [number, number, number] }> = {
  gesamt: { pos: [0.7, 1.55, 3.3], target: [-0.1, 1.05, -1.1] },
  werbeplatte: { pos: [-1.25, 1.85, 1.4], target: [-1.25, 1.85, -1.5] },
  raumobjekt: { pos: [2.3, 1.45, 1.6], target: [0.95, 0.75, -0.9] },
};

function useCanvasTexture(draw: (c: HTMLCanvasElement) => void | Promise<void>, w: number, h: number, deps: unknown[]) {
  const [tex, setTex] = useState<THREE.CanvasTexture | null>(null);
  useEffect(() => {
    let alive = true;
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    Promise.resolve(draw(c)).then(() => {
      if (!alive) return;
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
      setTex(t);
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  useEffect(() => () => tex?.dispose(), [tex]);
  return tex;
}

// Werbeplatte: Alu-Verbund 1300 × 700 × 4 mm, Weiß Uni, Folienbeschriftung mit Logo
function Werbeplatte() {
  const tex = useCanvasTexture(
    (c) =>
      new Promise<void>((resolve) => {
        const ctx = c.getContext("2d")!;
        ctx.fillStyle = "#fbfcfd";
        ctx.fillRect(0, 0, c.width, c.height);
        const img = new Image();
        img.onload = () => {
          const w = c.width * 0.9;
          const h = (w * 774) / 1930;
          ctx.drawImage(img, (c.width - w) / 2, (c.height - h) / 2 - c.height * 0.02, w, h);
          resolve();
        };
        img.onerror = () => resolve();
        img.src = "/brand/flossenliebe-logo.svg";
      }),
    2048,
    1103,
    [],
  );
  return (
    <group position={[-1.25, 1.85, -1.47]}>
      <mesh castShadow>
        <boxGeometry args={[1.3, 0.7, 0.004]} />
        <meshStandardMaterial attach="material-0" color="#c9ced3" metalness={0.8} roughness={0.3} />
        <meshStandardMaterial attach="material-1" color="#c9ced3" metalness={0.8} roughness={0.3} />
        <meshStandardMaterial attach="material-2" color="#c9ced3" metalness={0.8} roughness={0.3} />
        <meshStandardMaterial attach="material-3" color="#c9ced3" metalness={0.8} roughness={0.3} />
        <meshPhysicalMaterial key={tex ? "t" : "n"} attach="material-4" map={tex ?? undefined} color={tex ? "#ffffff" : "#fbfcfd"} roughness={0.18} clearcoat={1} clearcoatRoughness={0.08} />
        <meshStandardMaterial attach="material-5" color="#9aa1a7" />
      </mesh>
      {/* Abstandshalter */}
      {[
        [-0.6, 0.3],
        [0.6, 0.3],
        [-0.6, -0.3],
        [0.6, -0.3],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.006]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.012, 20]} />
          <meshStandardMaterial color="#d7dde2" metalness={1} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

// 3D-Raumobjekt: Lowboard (Weiß, grüne Laistechnik oben) + eingelassene Plexiglasplatte + LED
function Raumobjekt({ led }: { led: boolean }) {
  const top = useCanvasTexture((c) => drawBackdrop(c, "lais", ["#f6f8f8", "#3f9a36"], 9), 2048, 512, []);
  const back = useCanvasTexture((c) => drawBackdrop(c, "pflanzen", ["#1d5a28", "#8fd16d"], 4), 1024, 512, []);
  const front = useCanvasTexture((c) => drawBackdrop(c, "tropfen", ["#0b2e5e", "#ffffff"], 12, { transparentDrops: false }), 1024, 512, []);
  const frontAlpha = useCanvasTexture(
    (c) => {
      // Alpha: Tropfenkerne transparent, damit das Grün der Rückseite durchscheint
      drawBackdrop(c, "tropfen", ["#0b2e5e", "#ffffff"], 12, { transparentDrops: true });
      const ctx = c.getContext("2d")!;
      const data = ctx.getImageData(0, 0, c.width, c.height);
      for (let i = 0; i < data.data.length; i += 4) {
        const a = data.data[i + 3];
        data.data[i] = data.data[i + 1] = data.data[i + 2] = a < 10 ? 40 : 255;
        data.data[i + 3] = 255;
      }
      ctx.putImageData(data, 0, 0);
    },
    1024,
    512,
    [],
  );
  const glow = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    if (glow.current) glow.current.intensity = led ? 1.3 + Math.sin(clock.elapsedTime * 1.5) * 0.1 : 0;
  });

  const L = 1.8;
  const H = 0.5;
  const D = 0.45;
  return (
    <group position={[0.95, 0, -0.95]}>
      {/* Korpus */}
      <mesh position={[0, H / 2 + 0.06, 0]} castShadow receiveShadow>
        <boxGeometry args={[L, H, D]} />
        <meshStandardMaterial attach="material-0" color="#f7f9f9" roughness={0.35} />
        <meshStandardMaterial attach="material-1" color="#f7f9f9" roughness={0.35} />
        <meshPhysicalMaterial key={top ? "t" : "n"} attach="material-2" map={top ?? undefined} color="#ffffff" roughness={0.25} clearcoat={0.8} />
        <meshStandardMaterial attach="material-3" color="#f7f9f9" />
        <meshStandardMaterial attach="material-4" color="#f7f9f9" roughness={0.35} />
        <meshStandardMaterial attach="material-5" color="#f7f9f9" />
      </mesh>
      {/* Schubladenfugen */}
      {[-L / 4, L / 4].map((x) => (
        <mesh key={x} position={[x, H / 2 + 0.06, D / 2 + 0.001]}>
          <planeGeometry args={[0.004, H * 0.9]} />
          <meshBasicMaterial color="#d3dadf" />
        </mesh>
      ))}
      {[-L / 2 + L / 8, -L / 8 + 0.0, L / 8, L / 2 - L / 8].map((x) => (
        <mesh key={x} position={[x * 0.98, H * 0.78 + 0.06, D / 2 + 0.008]}>
          <boxGeometry args={[0.16, 0.012, 0.012]} />
          <meshStandardMaterial color="#c4ccd2" metalness={0.9} roughness={0.25} />
        </mesh>
      ))}
      {/* Füße */}
      {[
        [-L / 2 + 0.08, D / 2 - 0.08],
        [L / 2 - 0.08, D / 2 - 0.08],
        [-L / 2 + 0.08, -D / 2 + 0.08],
        [L / 2 - 0.08, -D / 2 + 0.08],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.03, z]}>
          <cylinderGeometry args={[0.018, 0.014, 0.06, 16]} />
          <meshStandardMaterial color="#2a2f35" />
        </mesh>
      ))}

      {/* Eingelassene Plexiglasplatte (zweischichtig gestaltet) */}
      <group position={[0, H + 0.06 + 0.32, -0.02]}>
        <mesh position={[0, 0, -0.004]}>
          <planeGeometry args={[1.2, 0.64]} />
          <meshStandardMaterial key={back ? "t" : "n"} map={back ?? undefined} emissive="#ffffff" emissiveMap={back ?? undefined} emissiveIntensity={led ? 0.55 : 0.05} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0.004]}>
          <planeGeometry args={[1.2, 0.64]} />
          <meshStandardMaterial
            key={front && frontAlpha ? "t" : "n"}
            map={front ?? undefined}
            alphaMap={frontAlpha ?? undefined}
            transparent
            emissive="#ffffff"
            emissiveMap={front ?? undefined}
            emissiveIntensity={led ? 0.35 : 0.02}
            roughness={0.15}
          />
        </mesh>
        <mesh>
          <boxGeometry args={[1.21, 0.65, 0.012]} />
          <meshPhysicalMaterial color="#ffffff" transparent opacity={0.12} roughness={0.02} clearcoat={1} depthWrite={false} />
        </mesh>
        {/* Schlitz + LED-Leiste */}
        <mesh position={[0, -0.325, 0]}>
          <boxGeometry args={[1.26, 0.02, 0.05]} />
          <meshStandardMaterial color="#1b2733" />
        </mesh>
        <mesh position={[0, -0.31, 0.012]}>
          <boxGeometry args={[1.18, 0.008, 0.008]} />
          <meshBasicMaterial color={led ? "#dff6ff" : "#5c6670"} toneMapped={false} />
        </mesh>
        <pointLight ref={glow} position={[0, -0.15, 0.25]} distance={2.2} color="#bfe9ff" />
      </group>
    </group>
  );
}

function Spot() {
  const target = useMemo(() => {
    const o = new THREE.Object3D();
    o.position.set(-1.25, 1.85, -1.5);
    o.updateMatrixWorld();
    return o;
  }, []);
  return <spotLight position={[-1.25, 3.6, 0.2]} angle={0.45} penumbra={0.7} intensity={14} target={target} />;
}

function Room() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial color="#d9d4ca" roughness={0.85} />
      </mesh>
      <mesh position={[0, 2, -1.5]} receiveShadow>
        <planeGeometry args={[14, 4]} />
        <meshStandardMaterial color="#eef2f4" roughness={0.95} />
      </mesh>
      {/* Akzentfläche im Logo-Blau */}
      <mesh position={[-1.25, 1.85, -1.495]}>
        <planeGeometry args={[1.9, 1.15]} />
        <meshStandardMaterial color="#0b2e5e" roughness={0.9} />
      </mesh>
      <mesh position={[-5.5, 2, 2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial color="#e6ecef" />
      </mesh>
    </group>
  );
}

function Rig({ focus }: { focus: ShowroomFocus }) {
  const controls = useThree((s) => s.controls) as unknown as OrbitControlsImpl | null;
  const { camera } = useThree();
  const anim = useRef(1);
  const from = useRef({ pos: new THREE.Vector3(), target: new THREE.Vector3() });
  useEffect(() => {
    from.current.pos.copy(camera.position);
    if (controls) from.current.target.copy(controls.target);
    anim.current = 0;
  }, [focus, camera, controls]);
  useFrame((_, dt) => {
    if (anim.current >= 1 || !controls) return;
    anim.current = Math.min(1, anim.current + dt / 1.4);
    const e = 1 - Math.pow(1 - anim.current, 3);
    const v = VIEWS[focus];
    camera.position.lerpVectors(from.current.pos, new THREE.Vector3(...v.pos), e);
    controls.target.lerpVectors(from.current.target, new THREE.Vector3(...v.target), e);
    controls.update();
  });
  return null;
}

export default function ShowroomScene({ focus, led }: { focus: ShowroomFocus; led: boolean }) {
  const v = useMemo(() => VIEWS.gesamt, []);
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: v.pos, fov: 42 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
      }}
    >
      <color attach="background" args={["#e9eef1"]} />
      <ambientLight intensity={led ? 0.6 : 0.9} />
      <hemisphereLight args={["#ffffff", "#d9d4ca", 0.6]} />
      <directionalLight position={[3, 5, 3]} intensity={led ? 0.9 : 1.6} castShadow shadow-mapSize={[1024, 1024]} />
      <Spot />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={2} position={[0, 4, 3]} scale={[8, 2, 1]} rotation={[Math.PI / 2, 0, 0]} />
        <Lightformer form="rect" intensity={1} position={[4, 2, 2]} scale={[2, 4, 1]} rotation={[0, -Math.PI / 2, 0]} />
      </Environment>
      <Room />
      <Werbeplatte />
      <Raumobjekt led={led} />
      <ContactShadows position={[0, 0.001, 0]} opacity={0.4} scale={10} blur={2.2} far={1.5} />
      <OrbitControls
        makeDefault
        target={v.target}
        enablePan={false}
        minDistance={1}
        maxDistance={7}
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.5}
        minAzimuthAngle={-Math.PI * 0.45}
        maxAzimuthAngle={Math.PI * 0.45}
        enableDamping
      />
      <Rig focus={focus} />
    </Canvas>
  );
}
