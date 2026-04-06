// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/loaders/GLTFLoader.js";

// let planets = {
//     "object_5": "Mercury",
//     "object_8": "Venus",
//     "object_11": "Earth",
//     "object_14": "Mars",
//     "object_17": "Jupiter",
//     "object_20": "saturn",
//     "object_25": "Uranus",
//     "object_28": "Neptune",
//     "object_56": "Sun"
// }

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
    1000,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);
camera.position.z = 150;

const scene = new THREE.Scene();

let spiderMan;
let mixer;
const loader = new GLTFLoader();

loader.load(
    "./assets/solar_system_animation.glb", // FIXED PATH
    function (gltf) {
        spiderMan = gltf.scene;
        spiderMan.position.y = -3;
        spiderMan.position.x = 0;
        spiderMan.rotation.x = -Math.PI / 6; // FIXED
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
const ambientLight = new THREE.AmbientLight(0xeedb00, 2); // FIXED SPELLING
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xeedb00, 2.5);
topLight.position.set(500, 500, 500);
scene.add(topLight);

const hemiLight = new THREE.HemisphereLight(0xeedb00, 0xeedb00, 2);
scene.add(hemiLight);


// RENDER LOOP
const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if (mixer) mixer.update(0.006);

    if (autoRotate && spiderMan) {
        spiderMan.rotation.y += (-deltaX * Math.PI - spiderMan.rotation.y) * 0.002;
        spiderMan.rotation.x += (-deltaY * Math.PI / 4 - spiderMan.rotation.x) * 0.002;
    }

    // if (autoRotate && spiderMan) {
    //     spiderMan.rotation.y += (-Math.random() * 1* Math.PI - spiderMan.rotation.y) * 0.002;
    //     spiderMan.rotation.x += (-Math.random() * 1 * Math.PI / 4 - spiderMan.rotation.x) * 0.002;
    // }

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

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", (event) => {
    autoRotate = !autoRotate
    // convert mouse to normalized coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // shoot ray
    raycaster.setFromCamera(mouse, camera);

    // check intersections
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        const name = clickedObject.name.toLowerCase();

        if (name.includes("object_5")) {
            window.location.href = "Mercury.html";
        }
        else if (name.includes("object_8")) {
            window.location.href = "Venus.html";
        }
        else if (name.includes("object_11")) {
            window.location.href = "Earth.html";
        }
        else if (name.includes("object_14")) {
            window.location.href = "Mars.html";
        }
        else if (name.includes("object_17")) {
            window.location.href = "Jupiter.html";
        }
        else if (name.includes("object_20")) {
            window.location.href = "Saturn.html";
        }
        else if (name.includes("object_25")) {
            window.location.href = "Uranus.html";
        }
        else if (name.includes("object_28")) {
            window.location.href = "Neptune.html";
        }
        else if (name.includes("object_56")) {
            window.location.href = "Sun.html";
        }
        else {
            alert(name)
        }
    }
});