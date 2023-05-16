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
import { onMounted, ref } from "vue";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as TWEEN from '@tweenjs/tween.js';

const bikeUrl = new URL('/resources/3d_models/city_bike/bicycle.glb', import.meta.url);


const drawSpheres = false;
const touchInputs = false;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor("#111111");
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild( renderer.domElement );

const scene = new THREE. Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 2000 );

const defaultCameraPosition = new THREE.Vector3(290, 70, -170);
const defaultCameraLookAt = new THREE.Vector3(40, 30, -0.7);

camera.position.set(defaultCameraPosition.x, defaultCameraPosition.y, defaultCameraPosition.z);
camera.lookAt(defaultCameraLookAt.x, defaultCameraLookAt.y, defaultCameraLookAt.z);

const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set(defaultCameraLookAt.x, defaultCameraLookAt.y, defaultCameraLookAt.z);
controls.update();

controls.addEventListener('change', function() {
    if (camera.position.y < 0) { // if camera is beneath the ground
        camera.position.y = 0; // restrict it to ground level
    }
});


const planeGeometry = new THREE.PlaneGeometry( 6000, 6000 );
const planeMaterial = new THREE.MeshStandardMaterial( {color: 0x000000} );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
scene.add( plane );
plane.position.set(0, -20, 0);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;


const ambientLight = new THREE.AmbientLight( 0xffffff, 0.2 );

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

scene.fog = new THREE.Fog( 0x111111, 0.1, 1000 );


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

const bikeModelPoints = {
    saddle: new THREE.Vector3(-27, 78, -0.7),
    handleBar: new THREE.Vector3(36, 76, -0.7),
    handleBarGrip: new THREE.Vector3(45, 81, -0.7),
    frontWheelHub: new THREE.Vector3(63, 16, -0.7),
    backWheelHub: new THREE.Vector3(-49, 16, -0.7),
    crankMiddle: new THREE.Vector3(-2, 12, -0.7),
    frontPedal: new THREE.Vector3(11, 0.7, 8),
    backPedal: new THREE.Vector3(-16, 22, -9)
};

const spheres = [];

if (drawSpheres) {
    const sphereGeometry = new THREE.SphereGeometry(3, 10, 10);
    const sphereMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, wireframe: true});

    for (const key in bikeModelPoints) {
        const position = bikeModelPoints[key];

        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.copy(position);
        scene.add(sphere);
        spheres.push(sphere);
    }
}


// Animation

function createCameraPositionTween(camera, fromPoint, toPoint, duration, easing) {
    const midPoint = new THREE.Vector3().addVectors(fromPoint, toPoint).multiplyScalar(0.5);
    const dir = new THREE.Vector3().subVectors(camera.position, midPoint);
    const lineDir = new THREE.Vector3().subVectors(toPoint, fromPoint).normalize();
    const normal = new THREE.Vector3().crossVectors(lineDir, dir).cross(lineDir).normalize();
    const newCameraPosition = new THREE.Vector3().addVectors(midPoint, normal.multiplyScalar(dir.length()));

    return new TWEEN.Tween(camera.position)
        .to(newCameraPosition, duration)
        .easing(easing)
        .onComplete(() => {
            camera.position.set(newCameraPosition.x, newCameraPosition.y, newCameraPosition.z);
        });
}

function createCameraLookAtTween(camera, startLookAt, fromPoint, toPoint, duration, easing) {
    // const startLookAt = camera.getWorldDirection(new THREE.Vector3()).clone(); 
    const endLookAt = new THREE.Vector3().addVectors(fromPoint, toPoint).multiplyScalar(0.5);

    const tweenLookAt = {x: startLookAt.x, y: startLookAt.y, z: startLookAt.z};

    return new TWEEN.Tween(tweenLookAt)
        .to({x: endLookAt.x, y: endLookAt.y, z: endLookAt.z}, duration)
        .easing(easing)
        .onUpdate(() => {
        camera.lookAt(new THREE.Vector3(tweenLookAt.x, tweenLookAt.y, tweenLookAt.z));
        })
        .onComplete(() => {
            controls.target.set(endLookAt.x, endLookAt.y, endLookAt.z);
            controls.update();
        });
}

const tween1 = createCameraPositionTween(camera, bikeModelPoints.saddle, bikeModelPoints.handleBar, 2000, TWEEN.Easing.Quadratic.Out);
const lookAtTween1 = createCameraLookAtTween(camera, defaultCameraLookAt, bikeModelPoints.saddle, bikeModelPoints.handleBar, 2000, TWEEN.Easing.Quadratic.Out);
const tween2 = createCameraPositionTween(camera, bikeModelPoints.saddle, bikeModelPoints.crankMiddle, 1000, TWEEN.Easing.Quadratic.Out);
const lookAtTween2 = createCameraLookAtTween(camera, new THREE.Vector3().addVectors(bikeModelPoints.saddle, bikeModelPoints.handleBar).multiplyScalar(0.5), bikeModelPoints.saddle, bikeModelPoints.crankMiddle,  1000, TWEEN.Easing.Quadratic.Out);

tween1.chain(tween2);
lookAtTween1.chain(lookAtTween2);

tween1.start();
lookAtTween1.start();


// Inputs

const rayCaster = new THREE.Raycaster();
const mousePosition = new THREE.Vector2();


if (touchInputs) {

    window.addEventListener('click', (event) => {
        mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
        mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;

        rayCaster.setFromCamera(mousePosition, camera);

        const intersects = rayCaster.intersectObjects(spheres);

        if (intersects.length > 0)
            camera.lookAt(intersects[0].object.position);
        else 
            camera.lookAt(defaultCameraLookAt.x, defaultCameraLookAt.y, defaultCameraLookAt.z);
    });

    
}

function animate(time) {
    if (touchInputs)
        rayCaster.setFromCamera(mousePosition, camera);

    requestAnimationFrame(animate);
    TWEEN.update(time);

    renderer.render (scene, camera);
    // console.log("position: ", camera.position);
}

renderer.setAnimationFrame(animate);

</script>