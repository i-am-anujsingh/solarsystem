import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
let solarsystem;
let mixer;
const loader = new GLTFLoader();
let scrollY = 0;
let isSelected = false;
let isDragable = false;
let autoRotate = true;
let previousMouseX = 1;
let previousMouseY = 1;
let deltaX = -1;
let deltaY = 1;
let model;
let fov = 1;

if (window.location.href.includes("Mercury.html")) { model = "../assets/mercury.glb"; fov = 50; }
// else if(window.location.href.includes("Venus.html")) { model = "../assets/venus.glb"; fov=1; }
// else if(window.location.href.includes("Earth.html")) { model = "../assets/earth.glb"; fov=1; }
else if (window.location.href.includes("Mars.html")) { model = "../assets/mars.glb"; fov = 15; }
else if (window.location.href.includes("Jupiter.html")) { model = "../assets/jupiter.glb"; fov = 10; }
else if (window.location.href.includes("Saturn.html")) { model = "../assets/saturn.glb"; fov = 10; }
else if (window.location.href.includes("Uranus.html")) { model = "../assets/uranus.glb"; fov = 1; deltaX=2; deltaY =0;}
else if (window.location.href.includes("Neptune.html")) { model = "../assets/neptune.glb"; fov = 60; }
else if (window.location.href.includes("Sun.html")) { model = "../assets/sun.glb"; fov = 60; }

const camera = new THREE.PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    1,
    100
);
camera.position.z = 100;

loader.load(
    model,
    function (gltf) {
        solarsystem = gltf.scene;
        solarsystem.position.y = 0;
        solarsystem.position.x = 0;
        scene.add(solarsystem);
        mixer = new THREE.AnimationMixer(solarsystem);
        mixer.clipAction(gltf.animations[0]).play();
    },
    function (xhr) {
        let p = (xhr.loaded / xhr.total * 100) + "% loaded"
    },
    function (error) {
        console.error("Error loading model:", error);
    }
);

const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector(".container3d").appendChild(renderer.domElement);
renderer.outputColorSpace = THREE.SRGBColorSpace;
// LIGHT
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 0.1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

const hemiLight = new THREE.HemisphereLight(0x000, 0xffffff, 2);
scene.add(hemiLight);


// RENDER LOOP
const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if (mixer) mixer.update(0.006);

    if (autoRotate && solarsystem) {
        solarsystem.rotation.y += (-deltaX * Math.PI - solarsystem.rotation.y) * 0.002;
        solarsystem.rotation.x += (-deltaY * Math.PI / 4 - solarsystem.rotation.x) * 0.002;
    }
    camera.position.z = 60 - scrollY * 0.01;

};
reRender3D();

document.addEventListener("dblclick", () => {
    isSelected = !isSelected;
});

document.addEventListener("mousedown", (e) => {
    if (isSelected) {
        isDragable = true;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
    }
});

document.addEventListener("mousemove", (e) => {
    if (isDragable && isSelected) {
        deltaX = e.clientX - previousMouseX;
        deltaY = e.clientY - previousMouseY;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
    }
});