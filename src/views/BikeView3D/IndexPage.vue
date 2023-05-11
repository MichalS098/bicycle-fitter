<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>My first Three.js app with Orbit Controls</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <div id="threejs-container" class="w-full h-full"></div>
        </ion-content>
    </ion-page>
</template>
  
<script>

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Create a scene
const scene = new THREE.Scene();

scene.background = new THREE.Color(0xffffff); // Replace 0xffffff with your desired color


// Create a box geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Create a material
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// Combine the geometry and material to create a mesh
const cube = new THREE.Mesh(geometry, material);

// Add the cube to the scene
scene.add(cube);

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer();

// Set the size of the renderer
renderer.setSize(window.innerWidth, window.innerHeight);

// Add the renderer to the DOM
document.body.appendChild(renderer.domElement);

// Create orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Create a GLTF loader
const loader = new GLTFLoader();

// Load a GLTF resource
loader.load(
    // resource URL
    'scene.gltf',
    // '@/../resources/3d_models/city_bike/scene.gltf',
    // "@/../resources/images/person-on-bike.png"
    // called when the resource is loaded
    function ( gltf ) {
        // Add the model to the scene
        scene.add( gltf.scene );

        // Start the animation
        animate();
    },
    // called while loading is progressing
    function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    function ( error ) {
        console.log( 'An error happened' );
    }
);





// Create the animation
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x = .5;
    cube.rotation.y = 1;
    controls.update();
    renderer.render(scene, camera);
}

// Start the animation
animate();
</script>
  
<style scoped>
/* You can use Tailwind CSS classes directly in your Vue components */
.w-full {
    width: 100%;
}

.h-full {
    height: 100%;
}
</style>
