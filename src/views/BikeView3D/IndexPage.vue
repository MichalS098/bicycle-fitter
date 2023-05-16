<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Bike view</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <div id="threejs-container" class="w-full h-full"></div>
        </ion-content>
        <button class="absolute top-0 right-0 p-2 xxs:p-4" @click="goToHome">X</button>
    </ion-page>
</template>

<script>

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as TWEEN from '@tweenjs/tween.js';

const bikeUrl = new URL('/resources/3d_models/city_bike/bicycle.glb', import.meta.url);


const orbitControlsAnabled = true;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor("#222222");
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild( renderer.domElement );

const scene = new THREE. Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 2000 );
if (orbitControlsAnabled) {
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.update();
}
// const controls = new OrbitControls( camera, renderer.domElement );


const defaultCameraPosition = new THREE.Vector3(290, 70, -170);
const defaultCameraLookAt = new THREE.Vector3(40, 30, -0.7);


camera.position.set(defaultCameraPosition.x, defaultCameraPosition.y, defaultCameraPosition.z);


// controls.update();
camera.lookAt(defaultCameraLookAt.x, defaultCameraLookAt.y, defaultCameraLookAt.z);

const planeGeometry = new THREE.PlaneGeometry( 6000, 6000 );
const planeMaterial = new THREE.MeshStandardMaterial( {color: 0x000000} );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
scene.add( plane );
plane.position.set(0, -20, 0);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;


const ambientLight = new THREE.AmbientLight( 0xffffff, 0.001 );

scene.add( ambientLight );

const spotLight = new THREE.SpotLight( 0x478C6C, 1 );
spotLight.position.set( 224, 300, 200 );
scene.add( spotLight );
spotLight.castShadow = true;
spotLight.angle = Math.PI / 4;
spotLight.penumbra = 0.5;
spotLight.intensity = 0.8;


const spotLight2 = new THREE.SpotLight( 0xE48C56, 0.7 );
spotLight2.position.set( -300, 270, -72 );
scene.add( spotLight2 );
spotLight2.castShadow = true;
spotLight2.angle = Math.PI / 4;
spotLight.penumbra = 0.5;
spotLight.intensity = 1;


const ambientLight3 = new THREE.AmbientLight( 0xffffff, 0.001 );

scene.add( ambientLight3 );

const spotLight3 = new THREE.SpotLight( 0xffffff, 1 );
spotLight3.position.set( 100, 300, 50 );
scene.add( spotLight3 );
spotLight3.castShadow = true;
spotLight3.angle = Math.PI / 4;
spotLight3.penumbra = 0.5;
spotLight3.intensity = 0.7;

scene.fog = new THREE.Fog( 0x222222, 0.1, 1000 );


const assetLoader = new GLTFLoader();

assetLoader.load(
    bikeUrl.href,
    (gltf) => {

        const bikeModel = gltf.scene;
        gltf.scene.traverse(function(node) {        // for shadow casting
        if (node.isMesh) { 
            node.castShadow = true;
            if (node.material.type !== 'MeshBasicMaterial') 
                node.material.transparent = false;
        }
        });
        scene.add(bikeModel);
        bikeModel.position.set(0, -20, 0);
        animate();
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        console.log('An error occured: ', error);
    }
);


// Bike model points

const saddle = new THREE.Vector3(-28, 78, -0.7);
const handleBar = new THREE.Vector3(36, 76, -0.7);
const handleBarGrip = new THREE.Vector3(36, 76, -0.7);
const frontWheelHub = new THREE.Vector3(63, 16, -0.7);
const backWheelHub = new THREE.Vector3(-49, 16, -0.7);
const crankMiddle = new THREE.Vector3(-2, 12, -0.7);
const frontPedal = new THREE.Vector3(11, 0.7, 8);
const backPedal = new THREE.Vector3(-16, 22, -9);


const points = [saddle, handleBar, handleBarGrip, frontWheelHub, backWheelHub, crankMiddle, frontPedal, backPedal];
const spheres = [];
const sphereGeometry = new THREE.SphereGeometry(5, 10, 10);
const sphereMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, wireframe: true});

points.forEach((point) => {
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    sphere.position.set(point.x, point.y, point.z);
    spheres.push(sphere);
});


// animations:

// const frontBrake = new THREE.Vector3(325, 140, -220);
// const rearBrake = new THREE.Vector3(14, 80, -290);

// const tween = new TWEEN.Tween(frontBrake).to(defaultCameraPosition, 3000);

// tween.onUpdate(function() {
//     camera.position.copy(frontBrake);
// });

// tween.start();
const raycaster = new THREE.Raycaster();
const mousePosition = new THREE.Vector2();

window.addEventListener('click', (event) => {
    mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mousePosition, camera);

    const intersects = raycaster.intersectObjects(spheres);

    if (intersects.length > 0)
        camera.lookAt(intersects[0].object.position);
    else 
        camera.lookAt(defaultCameraLookAt.x, defaultCameraLookAt.y, defaultCameraLookAt.z);
});

const rayCaster = new THREE.Raycaster();

function animate(time) {

    rayCaster.setFromCamera(mousePosition, camera);

    // requestAnimationFrame(animate);
    // TWEEN.update(time);

    renderer.render (scene, camera);
    // console.log(camera.position);
}

renderer.setAnimationLoop(animate);

</script>