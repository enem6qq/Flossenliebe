import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// ——— Fisch-Geometrie ————————————————————————————————————————————————
// Prozedural erzeugter Körper (gestreckte Kugel mit Verjüngung zum Schwanz) plus Flossen.
// Der Kopf zeigt nach +Z, damit Object3D.lookAt() die Schwimmrichtung setzen kann.

export type FishKind = "frontosa" | "neon" | "angel";

function finShape(points: [number, number][]) {
  const s = new THREE.Shape();
  s.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) s.lineTo(points[i][0], points[i][1]);
  s.closePath();
  const g = new THREE.ShapeGeometry(s, 4);
  const count = g.attributes.position.count;
  g.setAttribute("aFin", new THREE.BufferAttribute(new Float32Array(count).fill(1), 1));
  return g;
}

export function createFishGeometry(kind: FishKind) {
  const body = new THREE.SphereGeometry(1, 40, 24);
  const pos = body.attributes.position as THREE.BufferAttribute;
  const hump = kind === "frontosa" ? 0.22 : 0;
  const height = kind === "angel" ? 0.78 : kind === "neon" ? 0.46 : 0.6;
  const width = kind === "neon" ? 0.2 : 0.24;
  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i);
    let y = pos.getY(i);
    let z = pos.getZ(i);
    const taper = x < 0 ? 1 + x * 0.66 : 1 - x * x * 0.12;
    y *= height * taper;
    z *= width * taper;
    if (y > 0) y += hump * Math.exp(-((x - 0.5) ** 2) / 0.06) * (y / (height + 0.001));
    if (kind === "frontosa" && x > 0.55) x -= (x - 0.55) * 0.25 * (1 - Math.abs(y));
    pos.setXYZ(i, x, y, z);
  }
  body.computeVertexNormals();
  body.setAttribute("aFin", new THREE.BufferAttribute(new Float32Array(pos.count).fill(0), 1));

  const parts: THREE.BufferGeometry[] = [body];
  if (kind === "angel") {
    parts.push(finShape([[-0.85, 0], [-1.45, 0.4], [-1.32, 0], [-1.45, -0.4]]));
    parts.push(finShape([[-0.4, 0.45], [-1.1, 1.6], [0.05, 0.62]]));
    parts.push(finShape([[-0.4, -0.45], [-1.1, -1.6], [0.05, -0.62]]));
  } else {
    parts.push(finShape([[-0.86, 0], [-1.55, 0.46], [-1.38, 0], [-1.55, -0.46]]));
    parts.push(
      finShape([
        [-0.75, 0.2],
        [-0.55, 0.56],
        [-0.1, 0.72],
        [0.32, 0.6],
        [0.3, 0.42],
        [-0.7, 0.14],
      ]),
    );
    parts.push(
      finShape([
        [-0.72, -0.16],
        [-0.48, -0.48],
        [-0.12, -0.46],
        [-0.06, -0.32],
      ]),
    );
  }
  const merged = mergeGeometries(parts, false)!;
  merged.rotateY(-Math.PI / 2); // +X (Kopf) → +Z
  parts.forEach((p) => p.dispose());
  return merged;
}

const PATTERN = { frontosa: 0, neon: 1, angel: 2 } as const;

export function createFishMaterial(kind: FishKind, uniforms: { uTime: { value: number } }) {
  const mat = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    roughness: 0.38,
    metalness: kind === "neon" ? 0.35 : 0.08,
  });
  const colors =
    kind === "frontosa"
      ? { base: "#eef5fa", a: "#2a8fd0", b: "#0d3f86" }
      : kind === "neon"
        ? { base: "#b9c7cf", a: "#19c3ff", b: "#ff2b3d" }
        : { base: "#e9eef0", a: "#1b232a", b: "#c9a96b" };
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = uniforms.uTime;
    shader.uniforms.uBase = { value: new THREE.Color(colors.base) };
    shader.uniforms.uA = { value: new THREE.Color(colors.a) };
    shader.uniforms.uB = { value: new THREE.Color(colors.b) };
    shader.uniforms.uSpeed = { value: kind === "neon" ? 14 : kind === "angel" ? 5 : 6 };
    shader.uniforms.uPattern = { value: PATTERN[kind] };

    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        `#include <common>
        uniform float uTime; uniform float uSpeed;
        attribute float aFin;
        attribute float aPhase;
        varying vec3 vFishPos; varying float vFin;`,
      )
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
        float bend = smoothstep(0.55, -1.6, position.z);
        transformed.x += sin(uTime * uSpeed + aPhase - position.z * 2.4) * 0.16 * bend;
        vFishPos = position; vFin = aFin;`,
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
        uniform vec3 uBase; uniform vec3 uA; uniform vec3 uB; uniform float uPattern;
        varying vec3 vFishPos; varying float vFin;`,
      )
      .replace(
        "vec4 diffuseColor = vec4( diffuse, opacity );",
        `vec3 c = uBase;
        float L = vFishPos.z; float H = vFishPos.y;
        if (uPattern < 0.5) {
          // Frontosa: blaue Querbinden, blaue Stirn
          float band = smoothstep(0.42, 0.5, abs(fract(L * 1.55 + 0.18) - 0.5) * 2.0);
          band *= step(-0.95, L) * step(L, 0.78);
          c = mix(uBase, uA, band);
          c = mix(c, uB, smoothstep(0.7, 1.0, L) * 0.55);
          c = mix(c, uA, vFin * 0.85);
        } else if (uPattern < 1.5) {
          // Neonsalmler: leuchtender Längsstreifen, rotes Hinterteil
          float stripe = smoothstep(0.03, 0.0, abs(H - 0.07)) + smoothstep(0.06, 0.02, abs(H - 0.07));
          c = mix(uBase, uA, clamp(stripe, 0.0, 1.0));
          float red = step(H, -0.02) * smoothstep(0.25, -0.15, L);
          c = mix(c, uB, red * (1.0 - vFin));
          c = mix(c, vec3(0.85), vFin * 0.6);
        } else {
          float band = step(0.82, fract(L * 1.1 + 0.3));
          c = mix(uBase, uA, band);
          c = mix(c, uB, smoothstep(0.6, 1.0, L) * 0.4);
        }
        c = mix(c, vec3(1.0), smoothstep(-0.05, -0.4, H) * 0.25 * (1.0 - vFin));
        float eye = length(vec2(L - 0.74, H - 0.1));
        c = mix(c, vec3(1.0), (1.0 - smoothstep(0.075, 0.085, eye)) * (1.0 - vFin));
        c = mix(c, vec3(0.02, 0.05, 0.1), (1.0 - smoothstep(0.045, 0.055, eye)) * (1.0 - vFin));
        vec4 diffuseColor = vec4( c, opacity );`,
      )
      .replace(
        "#include <emissivemap_fragment>",
        `#include <emissivemap_fragment>
        if (uPattern > 0.5 && uPattern < 1.5) {
          float glow = smoothstep(0.05, 0.0, abs(vFishPos.y - 0.07)) * (1.0 - vFin);
          totalEmissiveRadiance += uA * glow * 0.9;
        }`,
      );
  };
  mat.customProgramCacheKey = () => "fish-" + kind;
  return mat;
}

// ——— Kaustik (Lichtmuster am Boden) ———————————————————————————————————
export const causticsGLSL = /* glsl */ `
float caustic(vec2 uv, float t) {
  vec2 p = mod(uv * 6.28318, 6.28318) - 250.0;
  vec2 i = p;
  float c = 1.0;
  float inten = 0.005;
  for (int n = 0; n < 4; n++) {
    float tt = t * (1.0 - (3.5 / float(n + 1)));
    i = p + vec2(cos(tt - i.x) + sin(tt + i.y), sin(tt - i.y) + cos(tt + i.x));
    c += 1.0 / length(vec2(p.x / (sin(i.x + tt) / inten), p.y / (cos(i.y + tt) / inten)));
  }
  c /= 4.0;
  c = 1.17 - pow(c, 1.4);
  return pow(abs(c), 8.0);
}
`;
