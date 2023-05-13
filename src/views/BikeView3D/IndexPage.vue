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


// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

camera.position.set(325, 140, -220);
controls.update();


const planeGeometry = new THREE.PlaneGeometry( 6000, 6000 );                    // Podłoga
const planeMaterial = new THREE.MeshStandardMaterial( {color: 0x000000, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
scene.add( plane );
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;


// const gridHelper = new THREE.GridHelper( 60 );
// scene.add( gridHelper );


const sphereGeometry = new THREE.SphereGeometry( 4 );
const sphereMaterial = new THREE.MeshStandardMaterial( {color: 0x0000ff, wireframe: false} );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
scene.add( sphere );

sphere.position.set(10, 10, 0);
sphere.castShadow = true;


const ambientLight = new THREE.AmbientLight( 0xffffff, 0.001 );

scene.add( ambientLight );

const spotLight = new THREE.SpotLight( 0x478C6C, 1 );
spotLight.position.set( 224, 300, 200 );
scene.add( spotLight );
spotLight.castShadow = true;
spotLight.angle = Math.PI / 4;

const sLightHelper = new THREE.SpotLightHelper( spotLight );
// scene.add( sLightHelper );


const spotLight2 = new THREE.SpotLight( 0xE48C56, 0.3 );
spotLight2.position.set( -300, 270, -72 );
scene.add( spotLight2 );
spotLight2.castShadow = true;
spotLight2.angle = Math.PI / 4;

const sLightHelper2 = new THREE.SpotLightHelper( spotLight2 );
// scene.add( sLightHelper2 );




scene.fog = new THREE.Fog( 0x222222, 0.1, 1000 );




const assetLoader = new GLTFLoader();

assetLoader.load(
    bikeUrl.href,
    (gltf) => {
        console.log(gltf);
        const bikeModel = gltf.scene;
        scene.add(bikeModel);
        bikeModel.position.set(0, 0, 0);
        animate();
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        console.log('An error occured: ', error);
    }
);


const options = {
    sphereColor: "#ffea00",
    wireframe: false,
    speed: 0.03,
    angle: Math.PI / 4,
    prenumbra: 0.5,
    intensity: 0.7,
};


const mousePosition = new THREE.Vector2();

window.addEventListener('click', (event) => {
    mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

const rayCaster = new THREE.Raycaster();

const sphereID = sphere.id;


let step = 0;

function animate(time) {

    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step))+ 4;

    spotLight.angle = options.angle;
    spotLight.penumbra = options.prenumbra;
    spotLight.intensity = options.intensity;

    sLightHelper.update();


    rayCaster.setFromCamera(mousePosition, camera);

    const intersects = rayCaster.intersectObjects(scene.children);
    // console.log(intersects);

    for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.id === sphereID) {
            if (intersects[i].object.material.color.getHex() === 0x000000)
                intersects[i].object.material.color.set("#000000");
            else
                intersects[i].object.material.color.set("#ffffff");
        } 
        
    }

    renderer.render (scene, camera);
    
    
    // if (camera.position.hasChanged)
    console.log(camera.position);
}
 

renderer.setAnimationLoop(animate);

</script>