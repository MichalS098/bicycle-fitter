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
    </ion-page>
</template>
  
<script>

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const bikeUrl = new URL('/resources/3d_models/city_bike/bicycle.glb', import.meta.url);


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor("#222222");
renderer.shadowMap.enabled = true;

document.body.appendChild( renderer.domElement );

const scene = new THREE. Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 2000 );
const controls = new OrbitControls( camera, renderer.domElement );


camera.position.set(325, 140, -220);
controls.update();


const planeGeometry = new THREE.PlaneGeometry( 6000, 6000 );
const planeMaterial = new THREE.MeshStandardMaterial( {color: 0x000000} );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
scene.add( plane );
plane.position.set(0, -20, 0);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;


const sphereGeometry = new THREE.SphereGeometry( 15, 10, 10 );
const sphereMaterial = new THREE.MeshStandardMaterial( {color: 0xffffff, wireframe: true} );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
scene.add( sphere );

sphere.position.set(-28, 80, 0);
// sphere.castShadow = true;


const ambientLight = new THREE.AmbientLight( 0xffffff, 0.001 );

scene.add( ambientLight );

const spotLight = new THREE.SpotLight( 0x478C6C, 1 );
spotLight.position.set( 224, 300, 200 );
scene.add( spotLight );
spotLight.castShadow = true;
spotLight.angle = Math.PI / 4;
spotLight.penumbra = 0.5;
spotLight.intensity = 0.7;

const sLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( sLightHelper );


const spotLight2 = new THREE.SpotLight( 0xE48C56, 0.3 );
spotLight2.position.set( -300, 270, -72 );
scene.add( spotLight2 );
spotLight2.castShadow = true;
spotLight2.angle = Math.PI / 4;
spotLight.penumbra = 0.5;
spotLight.intensity = 0.7;

const sLightHelper2 = new THREE.SpotLightHelper( spotLight2 );
scene.add( sLightHelper2 );

// TODO: Dodać kolejne światła, jasne z góry, ciemniejsze kontrowe względem kamery i dostosować aktualne światła

scene.fog = new THREE.Fog( 0x222222, 0.1, 1000 );


const assetLoader = new GLTFLoader();

assetLoader.load(
    bikeUrl.href,
    (gltf) => {
        const bikeModel = gltf.scene;
        scene.add(bikeModel);
        bikeModel.position.set(0, -20, 0);
        bikeModel.castShadow = true;            // TODO: Ustawić cień roweru
        animate();
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        console.log('An error occured: ', error);
    }
);


const mousePosition = new THREE.Vector2();

window.addEventListener('click', (event) => {
    mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

const rayCaster = new THREE.Raycaster();

const sphereID = sphere.id;


function animate(time) {

    rayCaster.setFromCamera(mousePosition, camera);

    const intersects = rayCaster.intersectObjects(scene.children);

    for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.id === sphereID) {
            intersects[i].object.material.color.set("#000000");
        } 
    }
    
    renderer.render (scene, camera);
    // console.log(camera.position);
}
 

renderer.setAnimationLoop(animate);

</script>