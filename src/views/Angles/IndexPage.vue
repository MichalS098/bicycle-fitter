<template>
    <ion-page>
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

        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonContent, IonIcon, IonProgressBar } from '@ionic/vue';
import { ref, onMounted, Transition } from "vue";
import useMediapipe from '@/composables/useMediapipe';
import { Camera } from '@mediapipe/camera_utils';
import { alertCircleOutline, hourglassOutline } from 'ionicons/icons';
import { getBodyAnglesFromMediapipeResults, BodyAnglesFromMediapipe, getBodyParamsMedian } from '@/functions/mediapipeCalculatedHumanParams';
import { useIonRouter } from '@ionic/vue';
import { getUserFromDatabase } from '@/helpers/helpersDataBase'
import { areAllBodyPointsVisible } from '@/helpers/mediapipeHelpers';
import MeasureFinishedModal from './MeasureFinishedModal.vue';

const router = useIonRouter();
const video = ref<HTMLVideoElement>();
const canvas = ref<HTMLCanvasElement>();
const camera = ref<Camera>();

const bodyAngles = ref<BodyAnglesFromMediapipe>({
    footFloorAngle: 0,
    thighShankAngle: 0,
    torsoFloorAngle: 0,
    torsoBicepAngle: 0,
    bicepForearmAngle: 0,
    crankAngle: 0
});
const bodyAnglesArray: BodyAnglesFromMediapipe[] = new Array(60);

const measuringDone = ref(false);
const allBodyPointsVisible = ref(false);
const measuringProgress = ref(0);


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
            if (areAllBodyPointsVisible(results.poseLandmarks)) {
                if (measuringProgress.value > 60){
                    measuringDone.value = true
                    camera.value?.stop()
                } else {
                    bodyAnglesArray[measuringProgress.value] = getBodyAnglesFromMediapipeResults(results)
                }
                measuringProgress.value++
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