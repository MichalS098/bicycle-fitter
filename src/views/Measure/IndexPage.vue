<template>
    <ion-page>
        <ion-header :translucent="true" class="bikefitter-header">
            <!-- DO NOT REMOVE THIS DIV -->
            <div>
            </div>
        </ion-header>
        <ion-content :fullscreen="true" class="relative">
            <video playsinline="true" muted="true" loop="true" class="hidden" ref="video"
                style="position: absolute; z-index: -1;"></video>
            <canvas class="absolute inset-0 w-full my-auto pd-15" ref="canvas"></canvas>

            <transition>
                <div v-show="!allBodyPointsVisible"
                    class="absolute top-6 left-3 right-3 rounded-2xl bg-[#1f1f1f] border-gray-900 p-3 flex gap-3 items-start shadow-lg overflow-hidden">
                    <ion-icon :icon="alertCircleOutline" class="text-red-400 h-12 w-12 shrink-0"></ion-icon>
                    <div class="flex flex-col gap-3">
                        <h2 class="text-red-400 text-xl font-bold">
                            Some body points <br> are not visible.
                        </h2>
                        <p class="text-sm">
                            Please, make sure that you are in a well lit room and that your whole body is visible.
                        </p>
                    </div>
                </div>
            </transition>

            <transition name="fade-from-down">
                <div v-show="allBodyPointsVisible"
                    class="absolute bottom-6 left-3 right-3 rounded-2xl bg-secondary border-gray-900 p-3 flex gap-3 items-start shadow-lg overflow-hidden">
                    <ion-icon :icon="hourglassOutline" class="text-white h-12 w-12 shrink-0"></ion-icon>
                    <div class="flex flex-col gap-3 w-full">
                        <h2 class="text-white text-xl font-bold">
                            Measuring in progress...
                        </h2>
                        <ion-progress-bar :value="measuringProgress / 60" class="w-full" color="light"></ion-progress-bar>
                    </div>
                </div>
            </transition>

            <!-- TODO: THIS IS A DEBUG FEATURE, REMOVE IN PRODUCTION-->
            <button class=" absolute bottom-0 right-0 text-lg" @click="skip()">SKIP</button>

            <measure-finished-modal :isOpen="showMeasureFinishedModal" @close="goToTheApp()" :bodyParams="bodyParams" />
            

        </ion-content>
    </ion-page>
</template>
  
<script lang="ts" setup>
import { IonPage, IonContent, IonHeader, IonIcon, IonProgressBar } from '@ionic/vue';
import { ref, onMounted, Transition } from "vue";
import useMediapipe from '@/composables/useMediapipe';
import { Camera } from '@mediapipe/camera_utils';
import { alertCircleOutline, hourglassOutline } from 'ionicons/icons';
import { getBodyParamsFromMediapipeResultsWithCorrect, BodyParamsFromMediapipe, getBodyParamsMedian } from '@/functions/mediapipeCalculatedHumanParams';
import { useIonRouter } from '@ionic/vue';
import { getUserFromDatabase } from '@/helpers/helpersDataBase'
import { areAllBodyPointsVisible } from '@/helpers/mediapipeHelpers';
import MeasureFinishedModal from './MeasureFinishedModal.vue';

import { Platforms } from '@ionic/vue';
import { Plugins } from '@capacitor/core';

const { Filesystem, Permissions } = Plugins;


const router = useIonRouter();
const video = ref<HTMLVideoElement>();
const canvas = ref<HTMLCanvasElement>();
const camera = ref<Camera>();

const bodyParams = ref<BodyParamsFromMediapipe>({
    shoulderHeight: 0,
    footLength: 0,
    armLength: 0,
    shankLength: 0,
    thighLength: 0,
    inseamLength: 0,
});
const bodyParamsArray: BodyParamsFromMediapipe[] = new Array(60);

const measuringDone = ref(false);
const showMeasureFinishedModal = ref(false);
const allBodyPointsVisible = ref(false);
const measuringProgress = ref(0);

let overallHeight: number;

const measureDone = async () => {
    camera.value?.stop();
    measuringDone.value = true;
    showMeasureFinishedModal.value = true;

    const user = await getUserFromDatabase();
    if (user != null) {
        user.shoulderHeight = parseFloat((bodyParams.value.shoulderHeight * 100).toFixed(1));
        user.armLength = parseFloat((bodyParams.value.armLength * 100).toFixed(1));
        user.shankLength = parseFloat((bodyParams.value.shankLength * 100).toFixed(1));
        user.thighLength = parseFloat((bodyParams.value.thighLength * 100).toFixed(1));
        user.inseamLength = parseFloat((bodyParams.value.inseamLength * 100).toFixed(1));
        await user.save();
    }
}

function goToTheApp() {
    showMeasureFinishedModal.value = false;
    router.replace('/pages/home');
}

function skip() {
    camera.value?.stop()
    bodyParams.value = {
        shoulderHeight: 150,
        footLength: 40,
        armLength: 80,
        shankLength: 50,
        thighLength: 50,
        inseamLength: 40,
    }
    measureDone()
}

onMounted(async () => {
    if (video.value === undefined || canvas.value === undefined) {
        return;
    }

    const user = await getUserFromDatabase();
    if (user != null) {
        overallHeight = user.overallHeight;
    }
    setupMediaPipe(video.value, canvas.value);
});

const setupMediaPipe = (video: HTMLVideoElement, canvas: HTMLCanvasElement) => {
    const { pose, drawResults } = useMediapipe();
    pose.onResults((results) => {
        drawResults(results, canvas, 'none');
        // third argument - which landmarks should be excluded from rendering.

        if (results.poseLandmarks !== undefined) {
            if (areAllBodyPointsVisible(results.poseLandmarks)) {
                allBodyPointsVisible.value = true;
                if (measuringProgress.value > 60) {
                    bodyParams.value = getBodyParamsMedian(bodyParamsArray);
                    measureDone();
                } else {
                    const bodyParams = getBodyParamsFromMediapipeResultsWithCorrect(results, overallHeight);
                    bodyParamsArray[measuringProgress.value] = bodyParams;
                }
                measuringProgress.value++;
            } else {
                allBodyPointsVisible.value = false;
                measuringProgress.value = 0;
            }
        } else {
            allBodyPointsVisible.value = false;
            measuringProgress.value = 0;
        }
    }
    );

    camera.value = new Camera(video, {
        onFrame: async () => {
            await pose.send({ image: video });
        }
    })

    camera.value?.start();
}

</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.fade-from-down-enter-active,
.fade-from-down-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-from-down-enter-from,
.fade-from-down-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

.fade-from-down-enter-to,
.fade-from-down-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>