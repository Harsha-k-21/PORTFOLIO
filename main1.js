// 3D Space Scene with Starry Background, Rotating Sun, and Scroll Animation
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 20);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x000000, 1);
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '-1';

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Stars
const starGeometry = new THREE.BufferGeometry();
const starVertices = [];
for (let i = 0; i < 5000; i++) {
    starVertices.push(
        (Math.random() - 0.5) * 400, 
        (Math.random() - 0.5) * 400, 
        (Math.random() - 0.5) * 400
    );
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2, transparent: true, opacity: 0.8 });
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffa500, 2);
directionalLight.position.set(-5, 5, 10);
scene.add(directionalLight);

// Animated Background Stars
function createAnimatedStars() {
    const animatedStars = new THREE.BufferGeometry();
    const animatedStarVertices = [];
    for (let i = 0; i < 500; i++) {
        animatedStarVertices.push(
            (Math.random() - 0.5) * 200, 
            (Math.random() - 0.5) * 200, 
            (Math.random() - 0.5) * 200
        );
    }
    animatedStars.setAttribute('position', new THREE.Float32BufferAttribute(animatedStarVertices, 3));
    const animatedStarMaterial = new THREE.PointsMaterial({ color: 0xffd700, size: 0.3, transparent: true, opacity: 0.9 });
    return new THREE.Points(animatedStars, animatedStarMaterial);
}
const animatedStars = createAnimatedStars();
scene.add(animatedStars);

// Sun at the Center
const sunTexture = new THREE.TextureLoader().load('sun.jpg'); // Ensure sun.jpg is in your project folder
const sunMaterial = new THREE.MeshStandardMaterial({ map: sunTexture, emissive: 0xffa500, emissiveIntensity: 2 });
const sunGeometry = new THREE.SphereGeometry(5, 64, 64);
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);
sun.position.set(0, 0, 0); // Center of the scene

// Scroll Animation - Moves Sun
function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    
    // Rotate the sun dynamically
    sun.rotation.y += 0.02;
    sun.rotation.x += 0.02;

    // Move the camera forward/backward based on scroll
    camera.position.z = 20 + t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
}

// Listen for scrolling
window.addEventListener('scroll', moveCamera);
moveCamera();

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the sun continuously
    sun.rotation.y += 0.005;
    sun.rotation.x += 0.005;

    // Rotate the stars for a better animated effect
    stars.rotation.y += 0.0005;
    stars.rotation.x += 0.0005;
    animatedStars.rotation.y += 0.002;
    animatedStars.rotation.x += 0.002;

    controls.update();
    renderer.render(scene, camera);
}
animate();

// Resize Handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
