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

var particleCount = 1800,
  particles = new THREE.Geometry(),
  pMaterial = new THREE.ParticleBasicMaterial({
    color: 0xffffff,
    size: 20,
  });

// now create the individual particles
for (var p = 0; p < particleCount; p++) {
  // create a particle with random
  // position values, -250 -> 250
  var pX = Math.random() * 500 - 250,
    pY = Math.random() * 500 - 250,
    pZ = Math.random() * 500 - 250,
    particle = new THREE.Vertex(new THREE.Vector3(pX, pY, pZ));

  // add it to the geometry
  particles.vertices.push(particle);
}

// create the particle system
var particleSystem = new THREE.ParticleSystem(particles, pMaterial);

// add it to the scene
scene.addChild(particleSystem);

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
