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

const scene = new THREE.Scene();

scene.background = new THREE.Color(0xffffff); // Replace 0xffffff with your desired color

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();


const loader = new GLTFLoader();

loader.load(
    'scene.gltf',
    // '@/../resources/3d_models/city_bike/scene.gltf',
    // "@/../resources/images/person-on-bike.png"
    
    function ( gltf ) {
        scene.add( gltf.scene );
        animate();
    },
    
    function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    
    function ( error ) {
        console.log( 'An error happened' );
    }
);


function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x = .5;
    cube.rotation.y = 1;
    controls.update();
    renderer.render(scene, camera);
}

animate();
</script>