"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Bubbles, Fishes, LightRays, Plants, Rocks, SandFloor, School, WaterDome, useSharedTime } from "./Underwater";

function CameraRig({ reduced }: { reduced: boolean }) {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 1.3, 0), []);
  const scrollY = useRef(0);
  useEffect(() => {
    const on = () => (scrollY.current = window.scrollY);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useFrame((_, dt) => {
    const k = 1 - Math.pow(0.02, Math.min(dt, 0.05));
    const s = Math.min(scrollY.current / window.innerHeight, 1);
    const px = reduced ? 0 : pointer.x * 0.6;
    const py = reduced ? 0 : pointer.y * 0.3;
    camera.position.x += (px - camera.position.x) * k;
    camera.position.y += (1.7 + py - s * 1.1 - camera.position.y) * k;
    camera.position.z += (8.6 - s * 1.5 - camera.position.z) * k;
    camera.lookAt(target);
  });
  return null;
}

function Scene({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const time = useSharedTime(reduced ? 0.25 : 1);
  const clumps = useMemo<[number, number, number][]>(
    () => [
      [-6.5, 0, -3],
      [-5.2, 0, -2.2],
      [-4.3, 0, -3.6],
      [-3.0, 0, -4.2],
      [5.8, 0, -2.6],
      [4.6, 0, -3.8],
      [6.8, 0, -1.6],
      [3.2, 0, -4.6],
      [0.6, 0, -5.2],
      [-1.4, 0, -5.0],
      [1.9, 0, -0.8],
      [-2.2, 0, 0.8],
    ],
    [],
  );
  const rocks = useMemo<[number, number, number, number][]>(
    () => [
      [-3.6, 0.1, -1.2, 0.9],
      [-2.6, 0.05, -0.4, 0.55],
      [-4.4, 0.05, -0.2, 0.45],
      [3.8, 0.12, -1.4, 1.05],
      [4.9, 0.05, -0.5, 0.5],
      [2.7, 0.05, -0.2, 0.4],
      [0.4, 0.05, -3.2, 0.7],
      [-0.6, 0.02, 1.4, 0.3],
    ],
    [],
  );
  return (
    <>
      <WaterDome />
      <fogExp2 attach="fog" args={["#0a3a6a", 0.052]} />
      <ambientLight intensity={0.55} color="#9fd4ff" />
      <directionalLight position={[3, 10, 4]} intensity={2.2} color="#e8f6ff" />
      <directionalLight position={[-6, 3, -4]} intensity={0.6} color="#4ca83d" />
      <hemisphereLight args={["#8ed4f2", "#0b2e5e", 0.6]} />

      <SandFloor time={time} />
      <LightRays time={time} count={mobile ? 4 : 7} />
      <Rocks items={rocks} />
      <Plants clumps={mobile ? clumps.slice(0, 9) : clumps} bladesPerClump={mobile ? 10 : 15} time={time} />

      <Fishes kind="frontosa" count={mobile ? 3 : 5} area={[4.2, 1.4, 2.4]} center={[0, 1.7, -0.6]} scale={0.48} speed={0.13} time={time} />
      <Fishes kind="angel" count={2} area={[3.2, 0.6, 1.6]} center={[0.5, 2.6, -2.4]} scale={0.32} speed={0.1} seed={41} time={time} />
      <School count={mobile ? 26 : 46} center={[0.5, 2.4, -1.5]} radius={[4.5, 0.7, 1.6]} time={time} />
      {!mobile && <School count={22} center={[-1, 1.2, 0.6]} radius={[3.2, 0.4, 1.2]} speed={0.27} seed={77} time={time} />}

      <Bubbles
        count={mobile ? 40 : 70}
        sources={[
          [-3.7, 0.4, -1.3],
          [4.2, 0.3, -2.8],
        ]}
        top={7}
        time={time}
      />
      <CameraRig reduced={reduced} />
    </>
  );
}

export default function AquariumScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setMobile(window.innerWidth < 768);
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, mobile ? 1.5 : 1.75]}
        camera={{ position: [0, 1.7, 8.6], fov: mobile ? 62 : 45, near: 0.1, far: 120 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
      >
        <Scene reduced={reduced} mobile={mobile} />
      </Canvas>
    </div>
  );
}
