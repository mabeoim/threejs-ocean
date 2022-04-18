import "./style.css";
import * as three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const rSpread = (range) => three.MathUtils.randFloatSpread(range);
const random = (low, high) => three.MathUtils.randFloat(low, high);

const scene = new three.Scene();

const camera = new three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new three.WebGLRenderer({
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
const pointLight = new three.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new three.AmbientLight(0xffffff);
scene.add(ambientLight);

// const controls = new OrbitControls(camera, renderer.domElement);

const bubbles = [];

function addBubble(x, y, z) {
  const geometry = new three.SphereGeometry(1, 24, 24);

  const material = new three.MeshStandardMaterial({
    color: 0x077478,
    envMap: "reflection",
    opacity: 0.4,
    transparent: true,
  });
  const bubble = new three.Mesh(geometry, material);

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

const spaceTexture = new three.TextureLoader().load("sea.png");
scene.background = spaceTexture;

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
function updateCamera(ev) {
  console.log("scroll");
  // camera.position.x = 10 - window.scrollY / 500.0;
  camera.position.y = 10 - window.scrollY / 5;
}

window.addEventListener("scroll", updateCamera);
