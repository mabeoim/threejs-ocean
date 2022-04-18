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

const geometry = new three.TorusGeometry(10, 3, 16, 100);
const material = new three.MeshBasicMaterial({
  color: 0xff6347,
});
const torus = new three.Mesh(geometry, material);

scene.add(torus);

const pointLight = new three.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const lightHelper = new three.PointLightHelper(pointLight);

const gridHelper = new three.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStart() {
  const geometry = new three.SphereGeometry(0.25, 24, 24);
  const material = new three.MeshStandardMaterial({ color: 0xffffff });
  const star = new three.Mesh(geometry, material);
}

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  controls.update();
  renderer.render(scene, camera);
}

animate();
