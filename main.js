import './style.css'
import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
// camera.position.setX(-3);

renderer.render( scene, camera );

// Donuts

// const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
// const material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } );
// const torus = new THREE.Mesh( geometry, material );
// scene.add( torus );

const geometry = new THREE.TorusKnotGeometry( 12, 1.3, 86, 3, 5, 16 );
const material = new THREE.MeshStandardMaterial( { color: 0xffff00 } );
const torusKnot = new THREE.Mesh( geometry, material );

scene.add( torusKnot );

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20);

const ambientLight = new THREE.AmbientLight(0xaaa)
ambientLight.position.set(-20,-20,-20);

scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(50, 10)
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addRandSpots(){
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const spot = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(50));

  spot.position.set(x,y,z);
  scene.add(spot)
}

function animate(){
  requestAnimationFrame( animate );
  // torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.001;
  torusKnot.rotation.z += 0.001;

  controls.update();
  renderer.render( scene, camera );
}

animate();
Array(100).fill().forEach(addRandSpots);

const spaceTexture = new THREE.TextureLoader().load('wp7002713.jpg');
scene.background = spaceTexture;