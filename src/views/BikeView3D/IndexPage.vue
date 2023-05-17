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

// import { getBodyParamsFromMediapipeResults, BodyParamsFromMediapipe, getBodyParamsMedian } from '@/functions/mediapipeCalculatedHumanParams';
import { threeDScene } from '@/classes/threeDScene';


const threeDS = new threeDScene();

threeDS._renderer.setAnimationFrame(threeDS.animate);





</script>