<template>
  <div class="ascii-wrapper" ref="asciiContainer">
    <pre ref="asciiPre" class="ascii-pre"></pre>
    <!-- unsichtbares Canvas für Three.js -->
    <canvas ref="glCanvas" style="display: none;"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const asciiContainer = ref<HTMLElement | null>(null);
const asciiPre = ref<HTMLPreElement | null>(null);
const glCanvas = ref<HTMLCanvasElement | null>(null);

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let mixer: THREE.AnimationMixer | null = null;
let clock = new THREE.Clock();
let renderTarget: THREE.WebGLRenderTarget;
let bustModel: THREE.Group;
let animationId: number;

// ASCII‐Palette: Leerzeichen ganz vorne, dann von dunkel nach hell
const ASCII_CHARS = [' ', '@', '#', 'S', '%', '?', '*', '+', ';', ':', ',', '.'];

/**
 * 1) Szene und Kamera initialisieren.
 */
function initScene(containerWidth: number, containerHeight: number) {
  scene = new THREE.Scene();

  // Kamera so positionieren, dass der Marble‐Bust gut sichtbar ist
  camera = new THREE.PerspectiveCamera(45, containerWidth / containerHeight, 0.1, 1000);
  camera.position.set(0, 1.5, 3);
  camera.lookAt(0.3, 0, 1.1);

  // Renderer auf dem versteckten Canvas, mit alpha:true für Transparenz
  renderer = new THREE.WebGLRenderer({
    canvas: glCanvas.value!,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(containerWidth, containerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  // Hintergrund durchsichtig
  renderer.setClearColor(0x000000, 0);

  // Einfaches Lighting: Hemisphere + Directional
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(5, 10, 7.5);
  scene.add(dirLight);

  const ambLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambLight);

  // RenderTarget auf niedrige Auflösung setzen (hier 128×128)
  const BASE_SIZE = 128;
  const aspect = containerWidth / containerHeight; // z. B. 300/200 = 1.5
  let RT_WIDTH  = BASE_SIZE;
  let RT_HEIGHT = Math.round(BASE_SIZE / aspect);
  renderTarget = new THREE.WebGLRenderTarget(RT_WIDTH, RT_HEIGHT);
}

/**
 * 2) Marble‐Bust-Modell per GLTFLoader laden und in Szene packen.
 */
function loadGLTFModel(url: string) {
  const loader = new GLTFLoader();
  loader.load(
      url,
      (gltf) => {
        bustModel = gltf.scene;
        // Das Modell etwas größer skalieren, falls nötig
        bustModel.scale.set(1.2, 1.2, 1.2);
        bustModel.position.set(0, 0, 0);

        const box = new THREE.Box3().setFromObject(bustModel);
        const center = new THREE.Vector3();
        box.getCenter(center); // center = Mittelpunkt in lokalen Koordinaten

        // 3) Model so verschieben, dass sein Zentrum bei (0,0,0) liegt
        bustModel.position.sub(center);

        scene.add(bustModel);

        // Wenn Animationsclips vorhanden sind
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(bustModel);
          gltf.animations.forEach((clip) => {
            mixer!.clipAction(clip).play();
          });
        }
      },
      undefined,
      (error) => {
        console.error('Fehler beim Laden des Modells:', error);
      }
  );
}

/**
 * 3) ASCII‐Rendering: Szene in RenderTarget rendern, Pixel auslesen, in ASCII umwandeln.
 */
function renderAscii() {
  if (!asciiPre.value) return;

  // 1) Szene in das Low‐Res RenderTarget rendern
  renderer.setRenderTarget(renderTarget);
  renderer.render(scene, camera);
  renderer.setRenderTarget(null);

  // 2) Pixel aus RenderTarget auslesen
  const width = renderTarget.width;
  const height = renderTarget.height;
  const pixelBuffer = new Uint8Array(width * height * 4);
  renderer.readRenderTargetPixels(renderTarget, 0, 0, width, height, pixelBuffer);

  // 3) Graustufen → ASCII‐Mapping
  let ascii = '';
  for (let y = 0; y < height; y++) {
    const yFlipped = height - 1 - y;
    for (let x = 0; x < width; x++) {
      const idx = (yFlipped * width + x) * 4;
      const r = pixelBuffer[idx];
      const g = pixelBuffer[idx + 1];
      const b = pixelBuffer[idx + 2];
      // Einfacher Grauwert
      const gray = (r + g + b) / 3;
      // Mapping in [0 .. ASCII_CHARS.length-1]
      const charIndex = Math.floor((gray / 255) * (ASCII_CHARS.length - 1));
      ascii += ASCII_CHARS[charIndex];
    }
    ascii += '\n';
  }

  // 4) In <pre> schreiben
  asciiPre.value.textContent = ascii;
}

/**
 * 4) Animationsschleife: Modell rotieren, ggf. Animationen abspielen, ASCII rendern.
 */
function animateAscii() {
  // a) Rotations‐Animation des Bust (um Y‐Achse)
  if (bustModel) {
    bustModel.rotation.y += 0.01;
  }
  // b) Falls Animationsclips vorliegen
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);

  // c) ASCII‐Render
  renderAscii();

  // d) nächsten Frame anfordern
  animationId = requestAnimationFrame(animateAscii);
}

onMounted(() => {
  if (!asciiContainer.value) return;

  // Container‐Größe abfragen
  const rect = asciiContainer.value.getBoundingClientRect();
  initScene(rect.width, rect.height);

  // Three.js-Canvas (glCanvas) in DOM hängen
  asciiContainer.value.appendChild(renderer.domElement);

  // Marble‐Bust‐Modell laden (public/…/bust.gltf oder .glb)
  loadGLTFModel('/models/marble-bust/marble-bust.gltf');

  // Animationsschleife starten
  animateAscii();

  // Auf Resize reagieren: Kamera und Renderer anpassen
  window.addEventListener('resize', () => {
    if (!asciiContainer.value) return;
    const newRect = asciiContainer.value.getBoundingClientRect();
    camera.aspect = newRect.width / newRect.height;
    camera.updateProjectionMatrix();
    renderer.setSize(newRect.width, newRect.height);
    // RenderTarget bleibt Low‐Res (128×128), daher nicht anpassen
  });
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
  renderer.dispose();
  renderTarget.dispose();
  if (mixer) mixer.uncacheRoot(mixer.getRoot());
  scene.traverse((child) => {
    if ((child as THREE.Mesh).geometry) (child as THREE.Mesh).geometry.dispose();
    if ((child as THREE.Mesh).material) {
      const mat = (child as THREE.Mesh).material;
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
      else mat.dispose();
    }
  });
});
</script>

<style scoped>
.ascii-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: transparent; /* Container durchsichtig halten */
}

/* <pre> nimmt die gesamte Fläche ein, Monospace‐Font, eng gestaucht */
.ascii-pre {
  font-family: monospace;
  line-height: 5px; /* je nach Container‐Höhe anpassen */
  white-space: pre;
  margin: 0;
  width: 100%;
  height: 100%;
  color: #eee;           /* ASCII‐Zeichen in Hellgrau */
  background-color: transparent;
  overflow: hidden;
}

/* Das Drei-Canvas (glCanvas) bleibt unsichtbar */
canvas {
  display: none;
}
</style>
