import "./style.css";
import * as three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new three.TorusGeometry(10, 3, 64, 100);
const material = new three.MeshBasicMaterial({
  color: 0xff6347,
});
const torus = new three.Mesh(geometry, material);
scene.add(torus);

const pointLight = new three.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new three.AmbientLight(0xffffff);
scene.add(ambientLight);

// const lightHelper = new three.PointLightHelper(pointLight);

// const gridHelper = new three.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function animateStar(star) {
  star.position.y -= 1;
  console.log(this);
}

function addStar() {
  const geometry = new three.SphereGeometry(0.25, 24, 24);
  const material = new three.MeshStandardMaterial({
    color: 0x077478,
    // emissive: 0xff0000,
    // fog: true,
    envMap: "reflection",
    opacity: 0.2,
    transparent: true,
  });
  const star = new three.Mesh(geometry, material);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => three.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  star.position.y += 0.1;
  scene.add(star);
  requestAnimationFrame(animateStar.bind(star));
}

Array(1).fill().forEach(addStar);

const spaceTexture = new three.TextureLoader().load("sea.png");
scene.background = spaceTexture;

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  controls.update();
  renderer.render(scene, camera);
}

animate();
