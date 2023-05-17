import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as TWEEN from '@tweenjs/tween.js';


export class threeDScene {

    private _bikeUrl: URL =  new URL('/resources/3d_models/city_bike/bicycle.glb', import.meta.url);

    
    private _scene!: THREE.Scene;
    private _camera!:   THREE.PerspectiveCamera;
    private _controls!: OrbitControls;
    _renderer: THREE.WebGLRenderer;

    
    private _defaultCameraPosition: THREE.Vector3 =  new THREE.Vector3(290, 70, -170);
    private _defaultCameraLookAt:   THREE.Vector3 =  new THREE.Vector3(40, 30, -0.7);


    _bikeModelPoints = {
        saddle:         new THREE.Vector3(-27, 78, -0.7),
        handleBar:      new THREE.Vector3(36, 76, -0.7),
        handleBarGrip:  new THREE.Vector3(45, 81, -0.7),
        frontWheelHub:  new THREE.Vector3(63, 16, -0.7),
        backWheelHub:   new THREE.Vector3(-49, 16, -0.7),
        crankMiddle:    new THREE.Vector3(-2, 12, -0.7),
        frontPedal:     new THREE.Vector3(11, 0.7, 8),
        backPedal:      new THREE.Vector3(-16, 22, -9)
    };


    constructor() {
        
        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setSize( window.innerWidth, window.innerHeight );
        this._renderer.setClearColor("#111111");
        this._renderer.shadowMap.enabled = true;
        this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        document.body.appendChild( this._renderer.domElement );             // TO JEST DO ZMIANY ŻEBY SCENA NIE BYŁA NA GÓRZE STRONY 

        this.cameraSetup();
        this.lightSetup();
        this.addObjectsToScene();
        this.createAnimations();
    }

    cameraSetup() {

        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 2000 );

        this._camera.position.set(this._defaultCameraPosition.x, this._defaultCameraPosition.y, this._defaultCameraPosition.z);
        this._camera.lookAt(this._defaultCameraLookAt.x, this._defaultCameraLookAt.y, this._defaultCameraLookAt.z);

        this._controls = new OrbitControls( this._camera, this._renderer.domElement );
        this._controls.target.set(this._defaultCameraLookAt.x, this._defaultCameraLookAt.y, this._defaultCameraLookAt.z);
        this._controls.update();

        this._controls.addEventListener('change', () => { 
            if (this._camera.position.y < 0)      this._camera.position.y =    0; 
            if (this._camera.position.y > 400)    this._camera.position.y =  400;
            if (this._camera.position.x < -400)   this._camera.position.x = -400;
            if (this._camera.position.x > 400)    this._camera.position.x =  400;
            if (this._camera.position.z < -400)   this._camera.position.z = -400;
            if (this._camera.position.z > 400)    this._camera.position.z =  400;
        });
    }

    lightSetup() {
    
        const ambientLight = new THREE.AmbientLight( 0xffffff, 0.2 );
        this._scene.add( ambientLight );
        
        const spotLight = new THREE.SpotLight( 0x478C6C, 1 );
        spotLight.position.set( 224, 300, 200 );
        this._scene.add( spotLight );
        spotLight.castShadow = true;
        spotLight.angle = Math.PI / 4;
        spotLight.penumbra = 0.5;
        spotLight.intensity = 0.8;
        
        const spotLight2 = new THREE.SpotLight( 0xE48C56, 0.7 );
        spotLight2.position.set( -300, 270, -72 );
        this._scene.add( spotLight2 );
        spotLight2.castShadow = true;
        spotLight2.angle = Math.PI / 4;
        spotLight2.penumbra = 0.5;
        spotLight2.intensity = 1;
        
        const spotLight3 = new THREE.SpotLight( 0xffffff, 1 );
        spotLight3.position.set( 100, 300, 50 );
        this._scene.add( spotLight3 );
        spotLight3.castShadow = true;
        spotLight3.angle = Math.PI / 4;
        spotLight3.penumbra = 0.5;
        spotLight3.intensity = 0.7;
        
        const spotLight4 = new THREE.SpotLight( 0xffffff, 1 );
        spotLight4.position.set( this._camera.position.x, this._camera.position.y, this._camera.position.z );
        this._scene.add( spotLight4 );
        spotLight4.angle = Math.PI / 4;
        spotLight4.penumbra = 0.5;
        spotLight4.intensity = 0.7;
        
        this._scene.fog = new THREE.Fog( 0x111111, 0.1, 1000 );
    }


    addObjectsToScene() {

        const planeGeometry = new THREE.PlaneGeometry( 6000, 6000 );
        const planeMaterial = new THREE.MeshStandardMaterial( {color: 0x000000} );
        const plane = new THREE.Mesh( planeGeometry, planeMaterial );
        this._scene.add( plane );
        plane.position.set(0, -20, 0);
        plane.rotation.x = -Math.PI / 2;
        plane.receiveShadow = true;
        
        
        const assetLoader = new GLTFLoader();
        
        assetLoader.load(  // Bike model
        this._bikeUrl.href,
            (gltf) => {
                const bikeModel = gltf.scene;
                gltf.scene.traverse(function(node: THREE.Object3D) {        // for shadow casting
                    if (node instanceof THREE.Mesh) { 
                        node.castShadow = true;
                        if (node.material.type !== 'MeshBasicMaterial') 
                            node.material.transparent = false;
                    }
                });
                this._scene.add(bikeModel);
                bikeModel.position.set(0, -20, 0);
                this.animate();
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
                console.log('An error occured: ', error);
            }
        );
    }

    createCameraPositionTween(camera: { position: THREE.Vector3; }, fromPoint: THREE.Vector3, toPoint: THREE.Vector3, duration: number | undefined, easing: ((amount: number) => number) | undefined) {
        const midPoint = new THREE.Vector3().addVectors(fromPoint, toPoint).multiplyScalar(0.5);
        const dir = new THREE.Vector3().subVectors(camera.position, midPoint);
        const lineDir = new THREE.Vector3().subVectors(toPoint, fromPoint).normalize();
        const normal = new THREE.Vector3().crossVectors(lineDir, dir).cross(lineDir).normalize();
        const newCameraPosition = new THREE.Vector3().addVectors(midPoint, normal.multiplyScalar(dir.length() * 0.7));
    
        return new TWEEN.Tween(camera.position)
            .to(newCameraPosition, duration)
            .easing(easing)
            .onComplete(() => {
                camera.position.set(newCameraPosition.x, newCameraPosition.y, newCameraPosition.z);
                console.log('camera position tween complete')
            });
    }

    createCameraLookAtTween(camera: { lookAt: (arg0: THREE.Vector3) => void; }, startLookAt: { x: any; y: any; z: any; }, fromPoint: THREE.Vector3, toPoint: THREE.Vector3, duration: number | undefined, easing: ((amount: number) => number) | undefined) {
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
                this._controls.target.set(endLookAt.x, endLookAt.y, endLookAt.z);
                this._controls.update();
            });
    }

    createAnimations() {

        const easing = TWEEN.Easing.Exponential.InOut;

        const tween1 = this.createCameraPositionTween(
            this._camera, 
            this._bikeModelPoints.saddle, 
            this._bikeModelPoints.handleBar, 
            2000,   
            easing);

        const lookAtTween1 = this.createCameraLookAtTween(
            this._camera,                    
            this._defaultCameraLookAt,                 
            this._bikeModelPoints.saddle,           
            this._bikeModelPoints.handleBar,                                           
            2000,                                        
            easing);

        const tween2 = this.createCameraPositionTween(    
            this._camera,             
            this._bikeModelPoints.saddle,        
            this._bikeModelPoints.crankMiddle,                                     
            1500, 
            easing);

        const lookAtTween2 = this.createCameraLookAtTween(
            this._camera,                 
            new THREE.Vector3().addVectors(this._bikeModelPoints.saddle, this._bikeModelPoints.handleBar).multiplyScalar(0.5),                 
            this._bikeModelPoints.saddle,           
            this._bikeModelPoints.crankMiddle,                                          
            1500,                                 
            easing);
        
        const tween3 = this.createCameraPositionTween(
            this._camera,                                           
            this._bikeModelPoints.handleBar,                                           
            this._bikeModelPoints.frontWheelHub,                                           
            1500,                                           
            easing);

        const lookAtTween3 = this.createCameraLookAtTween(
            this._camera,                                               
            new THREE.Vector3().addVectors(this._bikeModelPoints.saddle, this._bikeModelPoints.crankMiddle).multiplyScalar(0.5),                                               
            this._bikeModelPoints.handleBar,                                               
            this._bikeModelPoints.frontWheelHub,                                                
            1500,                                               
            easing);

        tween1.chain(tween2.chain(tween3));
        lookAtTween1.chain(lookAtTween2.chain(lookAtTween3));
        
        tween1.start();
        lookAtTween1.start();
    }

    // drawLinesBetweenPoints() {
    // }

    // createAnimation(camera, startPoint, endPoint, duration, easing) {
    // }


    animate(time?: number) {

        requestAnimationFrame(this.animate.bind(this));
        TWEEN.update(time);
    
        this._renderer.render(this._scene, this._camera);
        // console.log("position: ", camera.position);
    }
}