<template>
    <ion-page>
        <ion-content :fullscreen="true" class="relative">
            <video class="hidden" ref="video"></video>
            <canvas class="absolute inset-0 w-full my-auto" ref="canvas"></canvas>

            <div class="absolute inset-0 w-full flex items-start justify-end p-6">
                <div ref="shoulderHeight">
                </div>
                <div ref="footLength">
                </div>
                <div ref="armLength">
                </div>
            </div>

            <div class="absolute bottom-0 left-0 w-full p-4 flex items-center justify-center flex-col gap-1">
                <div class="flex items-center justify-evenly w-full">
                    <ion-button fill="clear" size="large">
                        <ArrowUturnLeftIcon class="w-6 h-6 text-white" />
                    </ion-button>
                    <button class="rounded-full w-16 h-16 p-1 bg-white flex items-center justify-center">
                        <div class="w-full h-full bg-[#E48C56] rounded-full">
                        </div>
                    </button>
                    <ion-button fill="clear" size="large">
                        <PhotoIcon class="w-6 h-6 text-white" />
                    </ion-button>
                </div>
                <div class="flex items-center justify-center gap-1 w-full">
                    <ion-button fill="clear" size="large">
                        <ion-icon class="text-white" :icon="flashOutline"></ion-icon>
                    </ion-button>
                    <ion-button fill="clear" size="large">
                        <ion-icon class="text-white" :icon="refreshOutline"></ion-icon>
                    </ion-button>
                    <ion-button fill="clear" size="large">
                        <ion-icon class="text-white" :icon="stopwatchOutline"></ion-icon>
                    </ion-button>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts" setup>
import {
    IonPage,
    IonContent,
    IonIcon
} from '@ionic/vue';
import { ref, onMounted } from "vue";
import useMediapipe from '@/composables/useMediapipe';
import { Camera } from '@mediapipe/camera_utils';
import {
    ArrowUturnLeftIcon,
    PhotoIcon,
} from '@heroicons/vue/24/outline';
import { refreshOutline, stopwatchOutline, flashOutline } from 'ionicons/icons';
import { globalCalcMediaPipe } from '@/functions/mediapipeCalculatedHumanParams';

const video = ref<HTMLVideoElement>();
const canvas = ref<HTMLCanvasElement>();
const camera = ref<Camera>();
const shoulderHeight = ref<HTMLDivElement>();
const footLength = ref<HTMLDivElement>();
const armLength = ref<HTMLDivElement>();
const shankLength = ref<HTMLDivElement>();
const thighLength = ref<HTMLDivElement>();
const inseamLength = ref<HTMLDivElement>();


onMounted(async () => {
    if (video.value === undefined || canvas.value === undefined) {
        return;
    }

    // 
    
    setupMediaPipe(video.value, canvas.value);
});


const setupMediaPipe = (video: HTMLVideoElement, canvas: HTMLCanvasElement) => {
    const { pose, drawResults } = useMediapipe();

    pose.onResults((results) => {
        // zapisac do jakiejs tabeli
        // tutaj obliczyc srednia

        // jesli wszystkie punkty nie sa widoczne to niech
        // apka wyswietli jakas informacje na ekranie 

        // showInfoNotVisible.value = true;


        drawResults(results, canvas);
         let [shoulderHeightResult, footLengthResult, armLengthResult, shankLengthTemp, thighLengthTemp, inseamLengthTemp] = globalCalcMediaPipe(results);
         if (shoulderHeight.value !== undefined) {
            shoulderHeight.value.innerHTML = shoulderHeightResult.toString();
            shoulderHeight.value.style.color = 'white';
            shoulderHeight.value.style.fontSize = '2rem';
         }

        if (footLength.value !== undefined) {
            footLength.value.innerHTML = footLengthResult.toString();
            footLength.value.style.color = 'white';
            footLength.value.style.fontSize = '2rem';
         }

         if (armLength.value !== undefined) {
            armLength.value.innerHTML = armLengthResult.toString();
            armLength.value.style.color = 'white';
            armLength.value.style.fontSize = '2rem';
         }

         if (shankLength.value !== undefined) {
            shankLength.value.innerHTML = shoulderHeightResult.toString();
            shankLength.value.style.color = 'white';
            shankLength.value.style.fontSize = '2rem';
         }

        if (thighLength.value !== undefined) {
            thighLength.value.innerHTML = footLengthResult.toString();
            thighLength.value.style.color = 'white';
            thighLength.value.style.fontSize = '2rem';
         }

         if (inseamLength.value !== undefined) {
            inseamLength.value.innerHTML = armLengthResult.toString();
            inseamLength.value.style.color = 'white';
            inseamLength.value.style.fontSize = '2rem';
         }
    });

    new Camera(video, {
        onFrame: async () => {            
            await pose.send({ image: video });
        }
    }).start();
}
</script>