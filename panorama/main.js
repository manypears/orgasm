import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Place the camera inside the sphere
camera.position.set(0, 0, 0); 

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Enable tone mapping and control exposure
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.5;  // Adjust to control brightness

// Load the environment texture
const loader = new THREE.TextureLoader();
loader.load('/app_PR-4.jpg', function(texture) {
    const sphereGeometry = new THREE.SphereGeometry(100, 32, 32);
    
    // Use MeshBasicMaterial with double-sided rendering
    const sphereMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,  // Render texture on both sides
    });

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.scale.set(-1, 1, 1); // Invert the sphere to render from the inside
    scene.add(sphere);
});

// Set up orbit controls for looking around the scene
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

controls.maxPolarAngle = (3 * Math.PI) / 4;  // Limit the upwards look to 135 degrees
controls.minDistance = 0.1; // Allow the camera to be close to the center
controls.maxDistance = 1;   // Lock camera to the center of the sphere

// Set initial view direction by targeting a specific point in space
controls.target.set(1, 0, 0); // Set initial target (e.g., slightly to the right)
controls.update(); // Update the controls to apply the target

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update the controls
    renderer.render(scene, camera);
}

animate();
