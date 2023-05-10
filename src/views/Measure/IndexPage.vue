<template>
    <ion-page>
        <ion-content :fullscreen="true" class="relative">
            <video class="hidden" ref="video" style="position: absolute; z-index: -1;"></video>

            <canvas class="absolute inset-0 w-full my-auto pd-15" ref="canvas"></canvas>

            <div class="flex  justify-center gap-1 w-full pt-12 px-10">
                <div class=" inset-0 w-full flex">
                    <div ref="shoulderHeight"> </div>
                </div>
                <div class=" inset-0 w-full flex">
                    <div ref="footLength"> </div>
                </div>
                <div class=" inset-0 w-full flex">
                    <div ref="armLength"> </div>
                </div>
            </div>

            <div class="flex items-center justify-center pt-3 px-10">
                <div class=" inset-0 w-full flex">
                    <div ref="thighLength"> </div>
                </div>
                <div class=" inset-0 w-full flex">
                    <div ref="shankLength"> </div>
                </div>
                <div class=" inset-0 w-full flex">
                    <div ref="inseamLength"> </div>
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
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import { ref, onMounted } from "vue";
import useMediapipe from '@/composables/useMediapipe';
import { Camera } from '@mediapipe/camera_utils';
import { ArrowUturnLeftIcon, PhotoIcon } from '@heroicons/vue/24/outline';
import { refreshOutline, stopwatchOutline, flashOutline } from 'ionicons/icons';
import { globalCalcMediaPipe } from '@/functions/mediapipeCalculatedHumanParams';
import {
    useIonRouter,
    createAnimation,
    AnimationBuilder
} from '@ionic/vue';

import { User } from '@/entity/User';
import AppDataSource from '@/data-sources/SqliteDataSource';
import { getUserFromDatabase } from '@/helpers/helpersDataBase'

const userRepository = AppDataSource.getRepository(User);

const video = ref<HTMLVideoElement>();
const canvas = ref<HTMLCanvasElement>();
const camera = ref<Camera>();
const shoulderHeight = ref<HTMLDivElement>();
const footLength = ref<HTMLDivElement>();
const armLength = ref<HTMLDivElement>();
const shankLength = ref<HTMLDivElement>();
const thighLength = ref<HTMLDivElement>();
const inseamLength = ref<HTMLDivElement>();

type Landmark = {
    x: number;
    y: number;
    z: number;
    visibility: number;
};

let measuringProgress = 0;
let shoulderHeightResult = 0.0, footLengthResult = 0.0, armLengthResult = 0.0, shankLengthResult = 0.0, thighLengthResult = 0.0, inseamLengthResult = 0.0;
const shoulderHeightTable = new Array(60);
const footLengthTable = new Array(60);
const armLengthTable = new Array(60);
const shankLengthTable = new Array(60);
const thighLengthTable = new Array(60);
const inseamLengthTable = new Array(60);

onMounted(async () => {
    if (video.value === undefined || canvas.value === undefined) {
        return;
    }

    setupMediaPipe(video.value, canvas.value);
});


const setupMediaPipe = (video: HTMLVideoElement, canvas: HTMLCanvasElement) => {
    const { pose, drawResults } = useMediapipe();

    pose.onResults((results) => {
        drawResults(results, canvas);

        if (results.poseLandmarks !== undefined) {

            if (areAllBodyPointsVisible(results.poseLandmarks)) {   // check if all body points are visible

                if (measuringProgress > 60) {

                    shoulderHeightResult = median(shoulderHeightTable);
                    footLengthResult = median(footLengthTable);
                    armLengthResult = median(armLengthTable);
                    shankLengthResult = median(shankLengthTable);
                    thighLengthResult = median(thighLengthTable);
                    inseamLengthResult = median(inseamLengthTable);

                    measureDone();
                } else {
                    const [shoulderHeightTemp, footLengthTemp, armLengthTemp, shankLengthTemp, thighLengthTemp, inseamLengthTemp] = globalCalcMediaPipe(results);
                    // just for displaying tmp values
                    // ignore the errors, it's just for testing and these elements are always defined
                    shoulderHeight.value.innerHTML = shoulderHeightTemp.toFixed(3);
                    shoulderHeight.value.style.color = 'white';
                    shoulderHeight.value.style.fontSize = '1rem';

                    footLength.value.innerHTML = footLengthTemp.toFixed(3);
                    footLength.value.style.color = 'white';
                    footLength.value.style.fontSize = '1rem';

                    armLength.value.innerHTML = armLengthTemp.toFixed(3);
                    armLength.value.style.color = 'white';
                    armLength.value.style.fontSize = '1rem';

                    shankLength.value.innerHTML = shankLengthTemp.toFixed(3);
                    shankLength.value.style.color = 'white';
                    shankLength.value.style.fontSize = '1rem';

                    thighLength.value.innerHTML = thighLengthTemp.toFixed(3);
                    thighLength.value.style.color = 'white';
                    thighLength.value.style.fontSize = '1rem';

                    inseamLength.value.innerHTML = inseamLengthTemp.toFixed(3);
                    inseamLength.value.style.color = 'white';
                    inseamLength.value.style.fontSize = '1rem';

                    shoulderHeightTable[measuringProgress] = shoulderHeightTemp;
                    footLengthTable[measuringProgress] = footLengthTemp;
                    armLengthTable[measuringProgress] = armLengthTemp;
                    shankLengthTable[measuringProgress] = shankLengthTemp;
                    thighLengthTable[measuringProgress] = thighLengthTemp;
                    inseamLengthTable[measuringProgress] = inseamLengthTemp;
                }
                measuringProgress++;
            } else {
                console.log("Some body points are not visible.");
            }
        } else {
            measuringProgress = 0;
        }
    }
    );

    function median(arr: number[]): number {
        // Sort the array in ascending order
        const sortedArr = arr.slice().sort((a, b) => a - b);
        const middleIndex = Math.floor(sortedArr.length / 2);

        // If the array has an odd number of elements, return the middle value
        if (sortedArr.length % 2 !== 0) {
            return sortedArr[middleIndex];
        }

        // If the array has an even number of elements, return the average of the two middle values
        const middleValue1 = sortedArr[middleIndex - 1];
        const middleValue2 = sortedArr[middleIndex];
        return (middleValue1 + middleValue2) / 2;
    }

    const areAllBodyPointsVisible = (landmarks: Landmark[]) => {
        const visibilityThreshold = 0.5;

        for (let i = 0; i < landmarks.length; i++)
            if (landmarks[i].visibility < visibilityThreshold)
                return false;
        return true;
    }

    const router = useIonRouter();
    const measureDone = async () => {

        shoulderHeight.value.innerHTML = shoulderHeightResult.toFixed(3);
        shoulderHeight.value.style.color = 'green';

        footLength.value.innerHTML = footLengthResult.toFixed(3);
        footLength.value.style.color = 'green';

        armLength.value.innerHTML = armLengthResult.toFixed(3);
        armLength.value.style.color = 'green';

        shankLength.value.innerHTML = shankLengthResult.toFixed(3);
        shankLength.value.style.color = 'green';

        thighLength.value.innerHTML = thighLengthResult.toFixed(3);
        thighLength.value.style.color = 'green';

        inseamLength.value.innerHTML = inseamLengthResult.toFixed(3);
        inseamLength.value.style.color = 'green';


        const user = await getUserFromDatabase();

        if (user != null) {
            user.shoulderHeight = shoulderHeightResult;
            user.armLength = armLengthResult;
            user.shankLength = shankLengthResult;
            user.thighLength = thighLengthResult;
            user.inseamLength = inseamLengthResult;
            await userRepository.save(user);
        }

        const allUser = await userRepository.find();
        console.log("All User from the db after measuring: ", allUser);

        router.navigate('/pages/home', 'none', 'replace');
    }

    new Camera(video, {
        onFrame: async () => {
            await pose.send({ image: video });
        }
    }).start();
}
</script>