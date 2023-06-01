<template>
    <ion-page>
        <div class="h-screen w-screen bg-black relative">
            <div id="threejs-container" class="w-full h-full"></div>

            <div class="absolute top-0 left-0 right-0 w-full px-6 py-6 xxs:py-12 xs:py-24 z-[10] flex justify-between">
                <div>
                    <h1 class="text-4xl xs:text-5xl text-white font-bold">
                        {{ bike?.brand ?? 'No brand' }}
                    </h1>
                    <h2 class="text-base xs:text-lg text-white">
                        {{ bike?.model ?? 'No model' }}
                    </h2>
                </div>
                <x-mark-icon class="w-8 h-8 text-white" @click="goToHome" />
            </div>
<!-- 
            <div class="absolute top-0 left-0 right-0 w-full px-6 py-6 xxs:py-12 xs:py-24 z-[10] flex justify-between">
                
            </div> -->

            <ion-modal ref="modal" :is-open="showModal" :breakpoints="[0.25, 1]" :initial-breakpoint="0.25"
                :backdrop-dismiss="true" :backdrop-breakpoint="1" :swipe-to-close="true" :keyboard-close="true"
                :showBackdrop="true" :animated="true" @ionBreakpointDidChange="ionBreakpointChange()">
                <ion-content class="ion-padding">
                    <ion-toolbar>
                        <ion-buttons slot="end">
                            <ion-button @click="minimizeModal()" color="primary" mode="ios" :class="{
                                'opacity-0': isModalMinimized,
                                'opacity-100': !isModalMinimized,
                                'transition-opacity': true
                            }">
                                Close
                            </ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                    <div class="flex flex-col gap-6">
                        <div class="w-full flex items-center justify-between gap-6">
                            <button
                                class="rounded-2xl bg-neutral-700 shadow-lg flex flex-col items-center justify-center gap-[1px] p-2 aspect-square w-full">
                                <HeartIcon class="w-8 h-8 text-white" />
                                <span class="text-xs text-white">Test</span>
                            </button>
                            <button @click="prevButtonClicked"
                                class="rounded-2xl bg-neutral-700 shadow-lg flex flex-col items-center justify-center gap-[1px] p-2 aspect-square w-full">
                                <BackwardIcon class="w-8 h-8 text-white" />
                                <span class="text-xs text-white">Prev</span>
                            </button>
                            <button @click="playButtonClicked"
                                class="rounded-2xl bg-neutral-700 shadow-lg flex flex-col items-center justify-center gap-[1px] p-2 aspect-square w-full">
                                <PlayIcon class="w-8 h-8 text-white" />
                                <span class="text-xs text-white">Play</span>
                            </button>
                            <button @click="nextButtonClicked"
                                class="rounded-2xl bg-neutral-700 shadow-lg flex flex-col items-center justify-center gap-[1px] p-2 aspect-square w-full">
                                <ForwardIcon class="w-8 h-8 text-white" />
                                <span class="text-xs text-white">Next</span>
                            </button>
                        </div>
                        <div>
                            <h2 class="fitter-h2 mt-3 mb-6 text-white">
                                Tips for you
                            </h2>
                            <tips-swiper :tips="tips" />
                        </div>
                        <div>
                            <h2 class="fitter-h2 mt-3 mb-6 text-white">
                                Your bike fit
                            </h2>
                            <apexchart class="w-full" type="line" :options="chartOptions" :series="chartSeries"></apexchart>
                        </div>
                    </div>
                </ion-content>
            </ion-modal>
        </div>
    </ion-page>
</template>
  
<script lang="ts" setup>
import {
    IonPage, useIonRouter, IonModal, IonContent, IonButton, IonButtons, IonToolbar
} from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { BackwardIcon, ForwardIcon, HeartIcon, PlayIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { Bike } from '@/entity/Bike';
import { Tip } from '@/entity/Tip';
import { useRoute } from 'vue-router';
import TipsSwiper from '@/components/TipsSwiper.vue';
import { threeDScene } from '@/classes/threeDScene';

// get router params props
const route = useRoute();
const bike_id = Number(route.params.id);
const bike = ref<Bike | null>();
const tips = ref<Tip[]>([]);
const showModal = ref<boolean>(true);

const router = useIonRouter();

const threeDS = new threeDScene;

const goToHome = () => {
    showModal.value = false;
    router.navigate('/pages/home', 'none', 'replace');
};

onMounted(async () => {
    bike.value = await Bike.findOneBy({
        id: bike_id
    })
    tips.value = await Tip.find();

    threeDS.init('#threejs-container');
    showModal.value = true;
});

const modal = ref<typeof IonModal>();
const isModalMinimized = ref<boolean>(true);

const minimizeModal = () => {
    if (modal.value) {
        modal.value.$el.setCurrentBreakpoint(0.25);
    }
}

const ionBreakpointChange = () => {
    if (modal.value?.$el.currentBreakpoint == 1) {
        isModalMinimized.value = false;
    } else {
        isModalMinimized.value = true;
    }
}


const animationIndex = ref<number>(-1);


function prevButtonClicked() {
    if (animationIndex.value == 0) animationIndex.value = 3;
    else animationIndex.value--;
    threeDS.createNextAnimation(animationIndex.value, 1.5);
}


function playButtonClicked() {      // Execute this when you close the window with bike param info
    threeDS.createDefaultCameraPozAnimation();
}


function nextButtonClicked() {
    if (animationIndex.value == 3) animationIndex.value = 0;
    else animationIndex.value++;
    threeDS.createNextAnimation(animationIndex.value, 1.5);
}


// chart series of measured angles during bike fit
const chartSeries = ref<any[]>([{
    name: 'Bicep angles',
    data: [0, 0.5, 0.7, 0.9, 1, 0.9, 0.7, 0.5, 0, -0.5, -0.7, -0.9, -1, -0.9, -0.7, -0.5, 0]
}, {
    name: 'Knee angles',
    // faster and phased sinus
    data: [0.6, 0.8, 1, 0.8, 0.6, 0.4, 0.2, 0, -0.2, -0.4, -0.6, -0.8, -1, -0.8, -0.6, -0.4, -0.2]
}])

const chartOptions = ref<any>({
    chart: {
        type: 'line',
        height: 350
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2
    },
    xaxis: {
        categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17']
    },
    yaxis: {
        title: {
            text: 'Angle (°)'
        }
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
            formatter: function (val: number) {
                return val + "°"
            }
        }
    }
})


</script>


<style  scoped>
ion-toolbar {
    --background: transparent;
}
</style>