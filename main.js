import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const rSpread = (range) => THREE.MathUtils.randFloatSpread(range);
const random = (low, high) => THREE.MathUtils.randFloat(low, high);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(300);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}

renderer.render(scene, camera);
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// const controls = new OrbitControls(camera, renderer.domElement);
const spaceTexture = new THREE.TextureLoader().load("sea.png");
scene.background = spaceTexture;

const bubbles = [];

function addBubble(x, y, z) {
  const geometry = new THREE.SphereGeometry(1, 24, 24);

  const material = new THREE.MeshStandardMaterial({
    color: 0x077478,
    envMap: "reflection",
    opacity: 0.4,
    transparent: true,
  });
  const bubble = new THREE.Mesh(geometry, material);

  bubble.position.set(x, y, z);
  bubbles.push(bubble);
  scene.add(bubble);
}

const bubblesCount = 200;
Array(bubblesCount)
  .fill()
  .forEach(() =>
    addBubble(
      rSpread(window.innerWidth / 2),
      rSpread(window.innerHeight),
      rSpread(800)
    )
  );

function addParticle(x, y, z) {
  const geometry = new THREE.SphereGeometry(1, 24, 24);

  const material = new THREE.MeshStandardMaterial({
    color: 0x077478,
    envMap: "reflection",
    opacity: 0.4,
    transparent: true,
  });
  const particle = new THREE.Mesh(geometry, material);

  particle.position.set(x, y, z);
  // particles.push(particle);
  scene.add(particle);
}

const particles = 2000;
// Array(particles)
//   .fill()
//   .forEach(() => addParticle(rSpread(100), rSpread(100), rSpread(100)));
function animate() {
  requestAnimationFrame(animate);

  bubbles.forEach((bubble, index) => {
    bubble.position.y += 0.025;
    bubble.position.x += rSpread(0.05);
    if (bubble.position.y > window.innerHeight / 2) {
      bubbles.splice(index, 1);
      bubble.removeFromParent();
      addBubble(rSpread(800), random(-800, -600), rSpread(800));
    }
  });
  // controls.update();
  renderer.render(scene, camera);
}

animate();
