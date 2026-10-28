"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { causticsGLSL, createFishGeometry, createFishMaterial, type FishKind } from "./materials";

// Gemeinsame Zeit-Uniform, damit alle Shader synchron laufen.
export function useSharedTime(speed = 1) {
  const u = useMemo(() => ({ uTime: { value: 0 } }), []);
  useFrame((_, dt) => {
    u.uTime.value += Math.min(dt, 0.05) * speed;
  });
  return u;
}

const rand = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

// ——— Fische auf Bahnen ————————————————————————————————————————————————
type Swimmer = { r: number; k: number; y: number; w: number; o: number; bob: number; s: number; cx: number; cz: number };

export function Fishes({
  kind,
  count,
  area = [5, 1.6, 2.5],
  center = [0, 1, 0],
  scale = 0.5,
  speed = 0.18,
  seed = 7,
  time,
}: {
  kind: FishKind;
  count: number;
  area?: [number, number, number];
  center?: [number, number, number];
  scale?: number;
  speed?: number;
  seed?: number;
  time: { uTime: { value: number } };
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => {
    const g = createFishGeometry(kind);
    const r = rand(seed + 3);
    g.setAttribute("aPhase", new THREE.InstancedBufferAttribute(new Float32Array(count).map(() => r() * 6.28), 1));
    return g;
  }, [kind, count, seed]);
  const material = useMemo(() => createFishMaterial(kind, time), [kind, time]);
  const fish = useMemo<Swimmer[]>(() => {
    const r = rand(seed);
    return Array.from({ length: count }, () => ({
      r: area[0] * (0.45 + r() * 0.55),
      k: area[2] / area[0] * (0.6 + r() * 0.4),
      y: center[1] + (r() - 0.5) * area[1],
      w: speed * (0.7 + r() * 0.6) * (r() > 0.5 ? 1 : -1),
      o: r() * Math.PI * 2,
      bob: 0.15 + r() * 0.25,
      s: scale * (0.8 + r() * 0.4),
      cx: center[0] + (r() - 0.5) * 1.2,
      cz: center[2] + (r() - 0.5) * 0.8,
    }));
  }, [count, seed, area, center, scale, speed]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const next = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

  useFrame(() => {
    const m = ref.current;
    if (!m) return;
    const t = time.uTime.value;
    fish.forEach((f, i) => {
      const a = f.o + f.w * t;
      const a2 = a + Math.sign(f.w) * 0.02;
      dummy.position.set(f.cx + Math.cos(a) * f.r, f.y + Math.sin(a * 2 + f.o) * f.bob, f.cz + Math.sin(a) * f.r * f.k);
      next.set(f.cx + Math.cos(a2) * f.r, f.y + Math.sin(a2 * 2 + f.o) * f.bob, f.cz + Math.sin(a2) * f.r * f.k);
      dummy.lookAt(next);
      dummy.scale.setScalar(f.s);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={ref} args={[geometry, material, count]} frustumCulled={false} />;
}

// ——— Schwarm (z. B. Neonsalmler) ——————————————————————————————————————
export function School({
  count = 40,
  center = [0, 1.4, -1],
  radius = [4, 0.8, 2],
  scale = 0.13,
  speed = 0.22,
  spread = 1,
  seed = 11,
  time,
}: {
  count?: number;
  center?: [number, number, number];
  radius?: [number, number, number];
  scale?: number;
  speed?: number;
  spread?: number;
  seed?: number;
  time: { uTime: { value: number } };
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => {
    const g = createFishGeometry("neon");
    const r = rand(seed + 5);
    g.setAttribute("aPhase", new THREE.InstancedBufferAttribute(new Float32Array(count).map(() => r() * 6.28), 1));
    return g;
  }, [count, seed]);
  const material = useMemo(() => createFishMaterial("neon", time), [time]);
  const offsets = useMemo(() => {
    const r = rand(seed);
    return Array.from({ length: count }, () => ({
      v: new THREE.Vector3((r() - 0.5) * 1.6 * spread, (r() - 0.5) * 0.6 * spread, (r() - 0.5) * 1.1 * spread),
      p: r() * 6.28,
      s: 0.8 + r() * 0.4,
      lag: r() * 0.35,
    }));
  }, [count, seed, spread]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const a = useMemo(() => new THREE.Vector3(), []);
  const b = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

  const leader = (t: number, out: THREE.Vector3) =>
    out.set(
      center[0] + Math.sin(t * speed) * radius[0],
      center[1] + Math.sin(t * speed * 1.7 + 1) * radius[1],
      center[2] + Math.sin(t * speed * 0.9 + 2) * radius[2],
    );

  useFrame(() => {
    const m = ref.current;
    if (!m) return;
    const t = time.uTime.value;
    offsets.forEach((o, i) => {
      const tt = t - o.lag * 3;
      leader(tt, a);
      leader(tt + 0.05, b);
      const wob = Math.sin(t * 1.3 + o.p) * 0.12 * spread;
      const dz = Math.cos(t + o.p) * 0.1 * spread;
      dummy.position.copy(a).add(o.v);
      dummy.position.y += wob;
      dummy.position.z += dz;
      b.add(o.v);
      b.y += wob;
      b.z += dz;
      dummy.lookAt(b);
      dummy.scale.setScalar(scale * o.s);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={ref} args={[geometry, material, count]} frustumCulled={false} />;
}

// ——— Wasserpflanzen (Vallisnerien-Bänder) ————————————————————————————————
export function Plants({
  clumps,
  bladesPerClump = 14,
  height = [1.4, 3.2],
  spread = [0.7, 0.5],
  sway = 1,
  width = 1,
  seed = 3,
  time,
}: {
  clumps: [number, number, number][];
  bladesPerClump?: number;
  height?: [number, number];
  spread?: [number, number];
  sway?: number;
  width?: number;
  seed?: number;
  time: { uTime: { value: number } };
}) {
  const count = clumps.length * bladesPerClump;
  const ref = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(0.09, 1, 1, 14);
    g.translate(0, 0.5, 0);
    // Spitze schmaler
    const p = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const y = p.getY(i);
      p.setX(i, p.getX(i) * (1 - y * 0.75));
    }
    return g;
  }, []);
  const material = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, roughness: 0.6 });
    m.onBeforeCompile = (s) => {
      s.uniforms.uTime = time.uTime;
      s.uniforms.uSway = { value: sway };
      s.vertexShader = s.vertexShader
        .replace("#include <common>", "#include <common>\nuniform float uTime; uniform float uSway; varying float vH;")
        .replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
          vec2 ip = instanceMatrix[3].xz;
          float h = position.y;
          float sway = sin(uTime * 0.9 + ip.x * 1.7 + ip.y * 1.3) * 0.32 + sin(uTime * 2.1 + ip.x * 4.0) * 0.06;
          transformed.x += sway * h * h * uSway;
          transformed.z += cos(uTime * 0.7 + ip.y * 2.0) * 0.12 * h * h * uSway;
          vH = h;`,
        );
      s.fragmentShader = s.fragmentShader
        .replace("#include <common>", "#include <common>\nvarying float vH;")
        .replace(
          "vec4 diffuseColor = vec4( diffuse, opacity );",
          "vec4 diffuseColor = vec4( mix(diffuse * 0.35, diffuse * 1.15, smoothstep(0.0, 1.0, vH)), opacity );",
        );
    };
    m.customProgramCacheKey = () => "plant";
    return m;
  }, [time, sway]);

  useEffect(() => {
    const m = ref.current;
    if (!m) return;
    const r = rand(seed);
    const d = new THREE.Object3D();
    const c = new THREE.Color();
    let i = 0;
    clumps.forEach(([x, y, z]) => {
      for (let b = 0; b < bladesPerClump; b++) {
        d.position.set(x + (r() - 0.5) * spread[0], y, z + (r() - 0.5) * spread[1]);
        d.rotation.set((r() - 0.5) * 0.25 * sway, r() * Math.PI, (r() - 0.5) * 0.3 * sway);
        d.scale.set((1 + r() * 0.6) * width, height[0] + r() * (height[1] - height[0]), 1);
        d.updateMatrix();
        m.setMatrixAt(i, d.matrix);
        c.set(r() > 0.45 ? "#4ca83d" : "#2f7a2c").offsetHSL((r() - 0.5) * 0.04, 0, (r() - 0.5) * 0.08);
        m.setColorAt(i, c);
        i++;
      }
    });
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [clumps, bladesPerClump, height, seed, spread, sway, width]);

  return <instancedMesh ref={ref} args={[geometry, material, count]} frustumCulled={false} />;
}

// ——— Steine wie im Logo ——————————————————————————————————————————————
export function Rocks({ items, seed = 21 }: { items: [number, number, number, number][]; seed?: number }) {
  const geos = useMemo(() => {
    const r = rand(seed);
    return items.map(() => {
      const g = new THREE.IcosahedronGeometry(1, 1);
      const p = g.attributes.position as THREE.BufferAttribute;
      const map = new Map<string, number>();
      for (let i = 0; i < p.count; i++) {
        const key = `${p.getX(i).toFixed(3)},${p.getY(i).toFixed(3)},${p.getZ(i).toFixed(3)}`;
        if (!map.has(key)) map.set(key, 0.78 + r() * 0.35);
        const f = map.get(key)!;
        p.setXYZ(i, p.getX(i) * f, p.getY(i) * f * 0.72, p.getZ(i) * f);
      }
      g.computeVertexNormals();
      return g;
    });
  }, [items, seed]);
  const shades = ["#7d8287", "#6a6f74", "#8c9196", "#5d6267"];
  return (
    <group>
      {items.map(([x, y, z, s], i) => (
        <mesh key={i} geometry={geos[i]} position={[x, y, z]} scale={s} rotation={[0, i * 1.3, 0]}>
          <meshStandardMaterial color={shades[i % shades.length]} roughness={0.9} flatShading />
        </mesh>
      ))}
    </group>
  );
}

// ——— Luftblasen ——————————————————————————————————————————————————————
export function Bubbles({
  count = 60,
  sources = [[-2.5, 0, -1]],
  top = 6,
  seed = 5,
  time,
}: {
  count?: number;
  sources?: [number, number, number][];
  top?: number;
  seed?: number;
  time: { uTime: { value: number } };
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const data = useMemo(() => {
    const r = rand(seed);
    return Array.from({ length: count }, (_, i) => ({
      src: sources[i % sources.length],
      off: r() * top,
      speed: 0.5 + r() * 0.7,
      size: 0.025 + r() * 0.06,
      p: r() * 6.28,
      spread: 0.05 + r() * 0.25,
    }));
  }, [count, sources, top, seed]);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        vertexShader: /* glsl */ `
          varying vec3 vN; varying vec3 vV;
          void main(){
            vec4 mv = modelViewMatrix * instanceMatrix * vec4(position,1.0);
            vN = normalize(normalMatrix * mat3(instanceMatrix) * normal);
            vV = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: /* glsl */ `
          varying vec3 vN; varying vec3 vV;
          void main(){
            float f = 1.0 - abs(dot(normalize(vN), normalize(vV)));
            float rim = pow(f, 2.2);
            float spec = smoothstep(0.92, 1.0, dot(normalize(vN), normalize(vec3(-0.4,0.6,0.7))));
            gl_FragColor = vec4(vec3(0.85,0.95,1.0), rim * 0.85 + spec * 0.9 + 0.04);
          }`,
      }),
    [],
  );
  const geometry = useMemo(() => new THREE.SphereGeometry(1, 16, 12), []);
  const d = useMemo(() => new THREE.Object3D(), []);
  useFrame(() => {
    const m = ref.current;
    if (!m) return;
    const t = time.uTime.value;
    data.forEach((b, i) => {
      const y = (b.off + t * b.speed) % top;
      d.position.set(b.src[0] + Math.sin(t * 2 + b.p + y) * b.spread * (y / top + 0.2), b.src[1] + y, b.src[2] + Math.cos(t * 1.7 + b.p) * b.spread * 0.6);
      d.scale.setScalar(b.size * (0.6 + (y / top) * 0.6));
      d.updateMatrix();
      m.setMatrixAt(i, d.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });
  return <instancedMesh ref={ref} args={[geometry, material, count]} frustumCulled={false} />;
}

// ——— Sandboden mit Kaustik ————————————————————————————————————————————
export function SandFloor({
  size = [40, 24],
  y = 0,
  color = "#cbb994",
  time,
}: {
  size?: [number, number];
  y?: number;
  color?: string;
  time: { uTime: { value: number } };
}) {
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(size[0], size[1], 120, 72);
    g.rotateX(-Math.PI / 2);
    const p = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const z = p.getZ(i);
      p.setY(i, Math.sin(x * 0.6 + z * 0.3) * 0.08 + Math.sin(x * 1.7 - z * 1.1) * 0.03 + Math.max(0, -z - 3) * 0.12);
    }
    g.computeVertexNormals();
    return g;
  }, [size]);
  const material = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({ color, roughness: 1 });
    m.onBeforeCompile = (s) => {
      s.uniforms.uTime = time.uTime;
      s.vertexShader = s.vertexShader
        .replace("#include <common>", "#include <common>\nvarying vec3 vWPos;")
        .replace("#include <worldpos_vertex>", "#include <worldpos_vertex>\nvWPos = (modelMatrix * vec4(transformed,1.0)).xyz;");
      s.fragmentShader = s.fragmentShader
        .replace("#include <common>", `#include <common>\nuniform float uTime; varying vec3 vWPos;\n${causticsGLSL}`)
        .replace(
          "#include <emissivemap_fragment>",
          `#include <emissivemap_fragment>
          float cs = caustic(vWPos.xz * 0.11, uTime * 0.35);
          totalEmissiveRadiance += vec3(0.55, 0.85, 1.0) * cs * 0.9;`,
        );
    };
    m.customProgramCacheKey = () => "sand";
    return m;
  }, [color, time]);
  return <mesh geometry={geometry} material={material} position={[0, y, 0]} />;
}

// ——— Lichtstrahlen von oben ———————————————————————————————————————————
export function LightRays({ count = 6, seed = 2, time }: { count?: number; seed?: number; time: { uTime: { value: number } } }) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        uniforms: { uTime: time.uTime },
        vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: /* glsl */ `
          uniform float uTime; varying vec2 vUv;
          void main(){
            float edge = smoothstep(0.0, 0.5, vUv.x) * smoothstep(1.0, 0.5, vUv.x);
            float fade = smoothstep(0.0, 0.9, vUv.y);
            float flick = 0.6 + 0.4 * sin(uTime * 0.6 + vUv.x * 3.0);
            gl_FragColor = vec4(vec3(0.6, 0.85, 1.0), edge * fade * 0.11 * flick);
          }`,
      }),
    [time],
  );
  const rays = useMemo(() => {
    const r = rand(seed);
    return Array.from({ length: count }, () => ({
      x: (r() - 0.5) * 14,
      z: -2 - r() * 5,
      w: 0.6 + r() * 1.6,
      rot: (r() - 0.5) * 0.25 - 0.18,
    }));
  }, [count, seed]);
  return (
    <group>
      {rays.map((ray, i) => (
        <mesh key={i} material={material} position={[ray.x, 4, ray.z]} rotation={[0, 0, ray.rot]}>
          <planeGeometry args={[ray.w, 12]} />
        </mesh>
      ))}
    </group>
  );
}

// ——— Hintergrund-Kuppel mit Tiefenverlauf ——————————————————————————————
export function WaterDome({ top = "#2a86c8", bottom = "#03101f" }: { top?: string; bottom?: string }) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: { uTop: { value: new THREE.Color(top) }, uBottom: { value: new THREE.Color(bottom) } },
        vertexShader: `varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `uniform vec3 uTop; uniform vec3 uBottom; varying vec3 vP;
          void main(){ float h = normalize(vP).y; vec3 c = mix(uBottom, uTop, smoothstep(-0.25, 0.75, h)); gl_FragColor = vec4(c,1.0); }`,
      }),
    [top, bottom],
  );
  return (
    <mesh material={material} renderOrder={-1}>
      <sphereGeometry args={[60, 32, 16]} />
    </mesh>
  );
}
