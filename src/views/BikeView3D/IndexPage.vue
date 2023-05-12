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


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor("#222222");
renderer.shadowMap.enabled = true;


document.body.appendChild( renderer.domElement );

const scene = new THREE. Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );


const controls = new OrbitControls( camera, renderer.domElement );


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(-75, 32, 50);
controls.update();


const planeGeometry = new THREE.PlaneGeometry( 60, 60 );                    // Podłoga
const planeMaterial = new THREE.MeshStandardMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
scene.add( plane );
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;


const gridHelper = new THREE.GridHelper( 60 );
scene.add( gridHelper );


const sphereGeometry = new THREE.SphereGeometry( 4 );
const sphereMaterial = new THREE.MeshStandardMaterial( {color: 0x0000ff, wireframe: false} );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
scene.add( sphere );

sphere.position.set(10, 10, 0);
sphere.castShadow = true;


const ambientLight = new THREE.AmbientLight( 0x333333, 0.5 );

scene.add( ambientLight );

const spotLight = new THREE.SpotLight( 0x478C6C, 0.8 );
spotLight.position.set( 20, 35, 20 );
scene.add( spotLight );
spotLight.castShadow = true;
spotLight.angle = Math.PI / 4;

const sLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( sLightHelper );



// const gui = new dat.GUI();

const options = {
    sphereColor: "#ffea00",
    wireframe: false,
    speed: 0.03,
    angle: Math.PI / 4,
    prenumbra: 0.1,
    intensity: 1,
};

// var loader = new GLTFLoader();

// loader.load(
//     'scene.gltf',
// '@/../resources/3d_models/city_bike/scene.gltf',
// "@/../resources/images/person-on-bike.png"
//     function ( gltf ) {
//         scene.add( gltf.scene );
//         animate();
//     },
//     function ( xhr ) {
//         console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
//     },
//     function ( error ) {
//         console.log( 'An error happened' );
//     }
// );



let step = 0;

function animate(time) {

    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step))+ 4;

    spotLight.angle = options.angle;
    spotLight.penumbra = options.prenumbra;
    spotLight.intensity = options.intensity;

    sLightHelper.update();

    renderer.render (scene, camera);
    
    
    // if (camera.position.hasChanged)
    // console.log(camera.position);
}
 

renderer.setAnimationLoop(animate);

</script>