import { useEffect, useRef } from "react";
import * as THREE from "three";

const EARTH_TEXTURE  = "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg";
const EARTH_BUMP     = "https://unpkg.com/three-globe/example/img/earth-topology.png";
const EARTH_SPECULAR = "https://unpkg.com/three-globe/example/img/earth-water.png";
const EARTH_CLOUDS   = "https://unpkg.com/three-globe/example/img/earth-clouds.png";
const EARTH_NIGHT    = "https://unpkg.com/three-globe/example/img/earth-night.jpg";

const AtmosphereVert = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const AtmosphereFrag = `
  varying vec3 vNormal;
  uniform float uIntensity;
  void main() {
    float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
    gl_FragColor = vec4(0.15, 0.55, 1.0, 1.0) * intensity * uIntensity;
  }
`;

function latLonToVec3(lat: number, lon: number, r = 1.0): THREE.Vector3 {
  const phi   = (90 - lat)  * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta)
  );
}

function buildArcPoints(a: THREE.Vector3, b: THREE.Vector3, segments = 80, lift = 0.3): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = new THREE.Vector3().lerpVectors(a, b, t).normalize();
    pts.push(p.multiplyScalar(1 + lift * Math.sin(Math.PI * t)));
  }
  return pts;
}

function makeGlowCanvas(r: number, g: number, b: number, size = 64): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const grad = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
  grad.addColorStop(0,   `rgba(${r},${g},${b},1)`);
  grad.addColorStop(0.35,`rgba(${r},${g},${b},0.6)`);
  grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return c;
}

function makeSprite(r: number, g: number, b: number, scale: number): THREE.Sprite {
  const mat = new THREE.SpriteMaterial({
    map: new THREE.CanvasTexture(makeGlowCanvas(r, g, b)),
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });
  const s = new THREE.Sprite(mat);
  s.scale.setScalar(scale);
  return s;
}

const NODES = [
  { lat: 90,    lon: 0     }, // North Pole — beacon origin
  { lat: 40.7,  lon: -74.0 }, // New York
  { lat: 51.5,  lon: -0.1  }, // London
  { lat: 48.8,  lon: 2.3   }, // Paris
  { lat: 52.5,  lon: 13.4  }, // Berlin
  { lat: 55.7,  lon: 37.6  }, // Moscow
  { lat: 35.6,  lon: 139.7 }, // Tokyo
  { lat: 31.2,  lon: 121.5 }, // Shanghai
  { lat: 22.3,  lon: 114.2 }, // Hong Kong
  { lat: 1.3,   lon: 103.8 }, // Singapore
  { lat: -33.9, lon: 151.2 }, // Sydney
  { lat: 28.6,  lon: 77.2  }, // Delhi
  { lat: 19.1,  lon: 72.9  }, // Mumbai
  { lat: -23.5, lon: -46.6 }, // São Paulo
  { lat: 6.5,   lon: 3.4   }, // Lagos
  { lat: -1.3,  lon: 36.8  }, // Nairobi
  { lat: 30.0,  lon: 31.2  }, // Cairo
  { lat: 37.6,  lon: 127.0 }, // Seoul
  { lat: 14.6,  lon: 121.0 }, // Manila
  { lat: 25.2,  lon: 55.3  }, // Dubai
  { lat: 41.0,  lon: 29.0  }, // Istanbul
  { lat: 43.7,  lon: -79.4 }, // Toronto
  { lat: 34.0,  lon: -118.2}, // Los Angeles
  { lat: 47.6,  lon: -122.3}, // Seattle
  { lat: -33.9, lon: -70.7 }, // Santiago
];

// Cinematic phases
const PHASE_SILHOUETTE  = 0; // 0–1.5s  dark earth, stars appear
const PHASE_BEACON      = 1; // 1.5–3s  north pole pulse
const PHASE_ILLUMINATE  = 2; // 3–5s    earth lights up, atmosphere grows
const PHASE_ARCS_GROW   = 3; // 5–10s   arcs spawn with increasing density
const PHASE_LIVE        = 4; // 10s+    full interactive loop

const PHASE_TIMES = [1.5, 3.0, 5.0, 10.0];

type ArcEntry = {
  line: THREE.Line;
  tubeMesh: THREE.Mesh;
  tubeMat: THREE.MeshBasicMaterial;
  points: THREE.Vector3[];
  progress: number;
  speed: number;
  alive: boolean;
  fadingOut: boolean;
  opacity: number;
  maxOpacity: number;
};

export default function GlobeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    let W = mount.clientWidth;
    let H = mount.clientHeight;

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = "block";
    renderer.domElement.style.opacity = "0";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 200);
    // Start far away, zoom in during intro
    camera.position.set(0, 0, 10.0);

    // ── Lights ────────────────────────────────────────────────
    const sun = new THREE.DirectionalLight(0xfff5e0, 3.5);
    sun.position.set(-4, 2, 4);
    scene.add(sun);
    scene.add(new THREE.AmbientLight(0x112244, 1.2));

    // ── Textures ──────────────────────────────────────────────
    const loader = new THREE.TextureLoader();
    const dayTex    = loader.load(EARTH_TEXTURE);
    const bumpTex   = loader.load(EARTH_BUMP);
    const specTex   = loader.load(EARTH_SPECULAR);
    const nightTex  = loader.load(EARTH_NIGHT);
    const cloudsTex = loader.load(EARTH_CLOUDS);

    // ── Earth ─────────────────────────────────────────────────
    const earthMat = new THREE.MeshPhongMaterial({
      color:             new THREE.Color(0x1a6b3a), // base color visible before texture loads
      map:               dayTex,
      bumpMap:           bumpTex,
      bumpScale:         0.06,
      specularMap:       specTex,
      specular:          new THREE.Color(0x336688),
      shininess:         30,
      emissiveMap:       nightTex,
      emissive:          new THREE.Color(0xffffff),
      emissiveIntensity: 0.35,
    });
    const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), earthMat);

    const cloudsMat = new THREE.MeshPhongMaterial({
      map: cloudsTex, transparent: true, opacity: 0.35, depthWrite: false,
    });
    const clouds = new THREE.Mesh(new THREE.SphereGeometry(1.008, 64, 64), cloudsMat);

    const atmMat = new THREE.ShaderMaterial({
      uniforms: {
        uIntensity: { value: 0.7 },
      },
      vertexShader: AtmosphereVert,
      fragmentShader: AtmosphereFrag,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(1.18, 64, 64), atmMat);

    const globe = new THREE.Group();
    globe.add(earth, clouds, atmosphere);
    globe.rotation.x = 0.25;
    globe.scale.setScalar(0.0); // starts invisible
    scene.add(globe);

    // ── Stars ─────────────────────────────────────────────────
    const starPos = new Float32Array(4000 * 3);
    for (let i = 0; i < starPos.length; i++) starPos[i] = (Math.random() - 0.5) * 400;
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff, size: 0.18, sizeAttenuation: true,
      transparent: true, opacity: 0,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    // ── Node vectors ──────────────────────────────────────────
    const nodeVecs = NODES.map(n => latLonToVec3(n.lat, n.lon, 1.01));

    // ── Node hotspot sprites (hidden initially) ───────────────
    const nodeSprites: THREE.Sprite[] = [];
    nodeVecs.forEach((v, i) => {
      // Outer glow
      const glow = makeSprite(80, 180, 255, i === 0 ? 0.18 : 0.07);
      glow.position.copy(v);
      glow.material.opacity = 0;
      globe.add(glow);
      // Core dot
      const core = makeSprite(200, 240, 255, i === 0 ? 0.04 : 0.022);
      core.position.copy(v);
      core.material.opacity = 0;
      globe.add(core);
      nodeSprites.push(glow, core);
    });

    // ── North Pole beacon ─────────────────────────────────────
    const poleVec = nodeVecs[0]; // index 0 = North Pole
    const beaconLight = new THREE.PointLight(0x44aaff, 0, 1.5);
    beaconLight.position.copy(poleVec).multiplyScalar(1.05).applyMatrix4(globe.matrixWorld);
    scene.add(beaconLight);

    const beaconSprite = makeSprite(100, 180, 255, 0.35);
    beaconSprite.position.copy(poleVec);
    beaconSprite.material.opacity = 0;
    globe.add(beaconSprite);

    // ── Arc pool — tube meshes for real thickness ─────────────
    const MAX_ARCS = 30;
    const ARC_SEGS = 80;
    const arcPool: ArcEntry[] = [];

    for (let i = 0; i < MAX_ARCS; i++) {
      // Use a Line2-style workaround: render as a thin flat quad ribbon
      // We use a standard Line but override with a custom wide-line approach
      // via a tube that we rebuild per arc on spawn
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(ARC_SEGS * 3), 3));
      const mat = new THREE.LineBasicMaterial({
        color: 0x33bbff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const line = new THREE.Line(geo, mat);

      // Tube mesh sits alongside the line for thickness
      const tubeMat = new THREE.MeshBasicMaterial({
        color: 0x44ccff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const tubeMesh = new THREE.Mesh(new THREE.BufferGeometry(), tubeMat);
      globe.add(line, tubeMesh);

      arcPool.push({
        line, points: [], progress: 0, speed: 0,
        alive: false, fadingOut: false, opacity: 0, maxOpacity: 0,
        tubeMesh, tubeMat,
      });
    }

    function buildTube(pts: THREE.Vector3[], upTo: number, radius = 0.0028): THREE.BufferGeometry {
      const slice = pts.slice(0, upTo + 1);
      if (slice.length < 2) return new THREE.BufferGeometry();
      const curve = new THREE.CatmullRomCurve3(slice);
      return new THREE.TubeGeometry(curve, Math.max(2, slice.length), radius, 6, false);
    }

    function spawnArc(fromIndex?: number) {
      const arc = arcPool.find(a => !a.alive);
      if (!arc) return;
      const ai = fromIndex ?? Math.floor(Math.random() * nodeVecs.length);
      let bi = Math.floor(Math.random() * nodeVecs.length);
      while (bi === ai) bi = Math.floor(Math.random() * nodeVecs.length);
      arc.points     = buildArcPoints(nodeVecs[ai], nodeVecs[bi], ARC_SEGS, 0.22 + Math.random() * 0.25);
      arc.progress   = 0;
      arc.speed      = 0.4 + Math.random() * 0.8;
      arc.alive      = true;
      arc.fadingOut  = false;
      arc.maxOpacity = 0.6 + Math.random() * 0.4;
      arc.opacity    = arc.maxOpacity;
      arc.line.geometry.setDrawRange(0, 0);
      (arc.line.material as THREE.LineBasicMaterial).opacity = 0;
      arc.tubeMat.opacity = 0;
    }

    let tubeRebuildTimer = 0;
    function updateArc(arc: ArcEntry, delta: number) {
      if (!arc.alive) return;
      const mat = arc.line.material as THREE.LineBasicMaterial;
      if (!arc.fadingOut) {
        arc.progress = Math.min(1, arc.progress + delta * arc.speed);
        const count = Math.floor(arc.progress * ARC_SEGS);
        // Update line geometry for the glow outline
        const pos = arc.line.geometry.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i <= count && i < arc.points.length; i++) {
          pos.setXYZ(i, arc.points[i].x, arc.points[i].y, arc.points[i].z);
        }
        pos.needsUpdate = true;
        arc.line.geometry.setDrawRange(0, count + 1);
        mat.opacity = arc.maxOpacity * 0.5; // line is the soft glow
        // Rebuild tube every ~4 frames for performance
        tubeRebuildTimer++;
        if (tubeRebuildTimer % 4 === 0 && count > 1) {
          arc.tubeMesh.geometry.dispose();
          arc.tubeMesh.geometry = buildTube(arc.points, count);
          arc.tubeMat.opacity = arc.maxOpacity;
        }
        if (arc.progress >= 1) arc.fadingOut = true;
      } else {
        arc.opacity -= delta * 0.55;
        const op = Math.max(0, arc.opacity);
        mat.opacity = op * 0.5;
        arc.tubeMat.opacity = op;
        if (arc.opacity <= 0) {
          arc.alive = false;
          arc.line.geometry.setDrawRange(0, 0);
          mat.opacity = 0;
          arc.tubeMat.opacity = 0;
          arc.tubeMesh.geometry.dispose();
          arc.tubeMesh.geometry = new THREE.BufferGeometry();
        }
      }
    }

    // ── Drag ──────────────────────────────────────────────────
    let isDragging = false;
    let prevX = 0, prevY = 0, velX = 0, velY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true; prevX = e.clientX; prevY = e.clientY;
      velX = 0; velY = 0;
      renderer.domElement.setPointerCapture(e.pointerId);
      renderer.domElement.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      velX = (e.clientX - prevX) * 0.007;
      velY = (e.clientY - prevY) * 0.007;
      globe.rotation.y += velX;
      globe.rotation.x = Math.max(-1.2, Math.min(1.2, globe.rotation.x + velY));
      prevX = e.clientX; prevY = e.clientY;
    };
    const onPointerUp = () => { isDragging = false; renderer.domElement.style.cursor = "grab"; };

    renderer.domElement.addEventListener("pointerdown",   onPointerDown);
    renderer.domElement.addEventListener("pointermove",   onPointerMove);
    renderer.domElement.addEventListener("pointerup",     onPointerUp);
    renderer.domElement.addEventListener("pointercancel", onPointerUp);
    renderer.domElement.style.cursor = "grab";

    // ── Resize ────────────────────────────────────────────────
    const onResize = () => {
      W = mount.clientWidth; H = mount.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener("resize", onResize);

    // ── Animate ───────────────────────────────────────────────
    let rafId: number;
    const clock = new THREE.Clock();
    const introStart = performance.now();
    let arcSpawnTimer = 0;
    let currentPhase = PHASE_SILHOUETTE;

    // helpers
    const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.min(1, Math.max(0, t));
    const invLerp = (a: number, b: number, v: number) => Math.min(1, Math.max(0, (v - a) / (b - a)));

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = (performance.now() - introStart) / 1000; // seconds

      // ── Determine phase ──
      if      (elapsed < PHASE_TIMES[0]) currentPhase = PHASE_SILHOUETTE;
      else if (elapsed < PHASE_TIMES[1]) currentPhase = PHASE_BEACON;
      else if (elapsed < PHASE_TIMES[2]) currentPhase = PHASE_ILLUMINATE;
      else if (elapsed < PHASE_TIMES[3]) currentPhase = PHASE_ARCS_GROW;
      else                               currentPhase = PHASE_LIVE;

      // ── PHASE 0: Silhouette — smooth pop-in from nothing ────
      if (currentPhase === PHASE_SILHOUETTE) {
        const t = invLerp(0, PHASE_TIMES[0], elapsed);
        const easeOut = 1 - Math.pow(1 - t, 3);
        renderer.domElement.style.opacity = String(Math.min(1, t * 3));
        globe.scale.setScalar(easeOut);
        camera.position.z = lerp(10.0, 3.4, easeOut);
        starMat.opacity = lerp(0, 0.55, t);
        globe.rotation.y += lerp(0.008, 0.003, t);
        // Spawn arcs immediately as globe appears
        arcSpawnTimer += delta;
        if (t > 0.15 && arcSpawnTimer > 0.22) { arcSpawnTimer = 0; spawnArc(); }
      }

      // ── PHASE 1: Beacon pulses from North Pole ──
      if (currentPhase === PHASE_BEACON) {
        const t = invLerp(PHASE_TIMES[0], PHASE_TIMES[1], elapsed);
        globe.scale.setScalar(1);
        camera.position.z = 3.4;
        starMat.opacity = 0.55;
        // Pulse the beacon
        const pulse = 0.5 + 0.5 * Math.sin(elapsed * 8);
        beaconSprite.material.opacity = lerp(0, 0.9, t) * (0.6 + 0.4 * pulse);
        beaconLight.intensity = lerp(0, 3.5, t) * (0.5 + 0.5 * pulse);
        // Update beacon world position as globe rotates
        const bwp = poleVec.clone().applyMatrix4(globe.matrixWorld);
        beaconLight.position.copy(bwp);
        globe.rotation.y += 0.003;
        // Spawn first arcs from pole
        if (t > 0.5) {
          arcSpawnTimer += delta;
          if (arcSpawnTimer > 0.6) { arcSpawnTimer = 0; spawnArc(0); }
        }
      }

      // ── PHASE 2: Earth illuminates, atmosphere grows ──
      if (currentPhase === PHASE_ILLUMINATE) {
        const t = invLerp(PHASE_TIMES[1], PHASE_TIMES[2], elapsed);
        nodeSprites.forEach(s => { s.material.opacity = lerp(0, 1, t); });
        beaconSprite.material.opacity = lerp(0.9, 0.3, t);
        beaconLight.intensity = lerp(3.5, 1.0, t);
        const bwp = poleVec.clone().applyMatrix4(globe.matrixWorld);
        beaconLight.position.copy(bwp);
        globe.rotation.y += 0.002;
        arcSpawnTimer += delta;
        if (arcSpawnTimer > 0.35) { arcSpawnTimer = 0; spawnArc(); }
      }

      // ── PHASE 3: Arc density increases ──
      if (currentPhase === PHASE_ARCS_GROW) {
        const t = invLerp(PHASE_TIMES[2], PHASE_TIMES[3], elapsed);
        // Spawn interval shrinks from 0.3s → 0.12s as density grows
        const spawnInterval = lerp(0.3, 0.12, t);
        arcSpawnTimer += delta;
        if (arcSpawnTimer > spawnInterval) { arcSpawnTimer = 0; spawnArc(); }
        globe.rotation.y += 0.0018;
        const bwp = poleVec.clone().applyMatrix4(globe.matrixWorld);
        beaconLight.position.copy(bwp);
      }

      // ── PHASE 4: Live — full interactive loop ──
      if (currentPhase === PHASE_LIVE) {
        arcSpawnTimer += delta;
        if (arcSpawnTimer > 0.18) { arcSpawnTimer = 0; spawnArc(); }
        if (!isDragging) {
          globe.rotation.y += 0.0015;
          velX *= 0.94; velY *= 0.94;
          globe.rotation.y += velX;
          globe.rotation.x = Math.max(-1.2, Math.min(1.2, globe.rotation.x + velY));
        }
        const bwp = poleVec.clone().applyMatrix4(globe.matrixWorld);
        beaconLight.position.copy(bwp);
      }

      // Clouds always drift slightly
      clouds.rotation.y += 0.00018;

      // Update arcs every phase
      arcPool.forEach(a => updateArc(a, delta));

      // Node hotspot pulse in live phase
      if (currentPhase === PHASE_LIVE) {
        const t = elapsed;
        nodeSprites.forEach((s, i) => {
          const base = i % 2 === 0 ? 0.85 : 0.7;
          s.material.opacity = base + 0.15 * Math.sin(t * 2.5 + i * 0.8);
        });
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("pointerdown",   onPointerDown);
      renderer.domElement.removeEventListener("pointermove",   onPointerMove);
      renderer.domElement.removeEventListener("pointerup",     onPointerUp);
      renderer.domElement.removeEventListener("pointercancel", onPointerUp);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute right-0 top-0 h-full w-full md:w-[58%]"
      style={{ zIndex: 1 }}
    />
  );
}
