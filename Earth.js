
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/loaders/GLTFLoader.js";

let scrollY = 0;
let mouseX = 0;
let mouseY = 0;
let isSelected = false;
let isDragable = false;
let autoRotate = true;

let previousMouseX = 1;
let previousMouseY = 1;
// let camPositioning = 0;
let deltaX = 1;
let deltaY = 0;


const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    10
);
camera.position.z = 10;

const scene = new THREE.Scene();

let spiderMan;
let mixer;
const loader = new GLTFLoader();

loader.load(
    "./assets/earth.glb", // FIXED PATH
    function (gltf) {
        spiderMan = gltf.scene;
        spiderMan.position.y = -10;
        spiderMan.position.x = 0;
        // spiderMan.rotation.x = -Math.PI / 6; // FIXED
        scene.add(spiderMan);
        // console.log(gltf.animations[0]);
        mixer = new THREE.AnimationMixer(spiderMan);
        mixer.clipAction(gltf.animations[0]).play();
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + "% loaded");
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
const ambientLight = new THREE.AmbientLight(0xffffff, 2); // FIXED SPELLING
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 2.5);
topLight.position.set(500, 500, 500);
scene.add(topLight);

// RENDER LOOP
const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if (mixer) mixer.update(0.006);

    if (autoRotate && spiderMan) {
        spiderMan.rotation.y += (-deltaX * Math.PI - spiderMan.rotation.y) * 0.002;
        spiderMan.rotation.x += (-deltaY * Math.PI / 4 - spiderMan.rotation.x) * 0.002;
    }


    camera.position.z = 60 + scrollY * 0.01;

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

window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
    // camera.position.z -+ 1 
});