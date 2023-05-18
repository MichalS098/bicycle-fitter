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
import { threeDScene } from '@/classes/threeDScene';

const threeDS = new threeDScene();

threeDS._renderer.setAnimationFrame(threeDS.animate);

threeDS.drawLinesBetweenPoints(threeDS._bikeModelPoints.saddle, threeDS._bikeModelPoints.handleBar);
// threeDS.createSetAnimations();




</script>