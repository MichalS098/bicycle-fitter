<template>
    <ion-page>
        <div class="h-screen w-screen bg-black relative">
            <!-- IMITATION OF THREE.JS -->
            <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                class="absolute top-0 left-0 w-full h-full z-0">
                <defs>
                    <radialGradient id="myGradient">
                        <stop offset="0%" stop-color="#E48C56" />
                        <stop offset="100%" stop-color="rgba(0, 0, 0, 0)" />
                    </radialGradient>
                </defs>
                <circle cx="8" cy="2" r="9" fill="url('#myGradient')" />
            </svg>

            <div class="absolute top-0 left-0 right-0 w-full px-6 pt-24 z-[10] flex justify-between">
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

            <div class="z-[20] px-3 py-4 bg-neutral-800 absolute bottom-0 left-0 right-0 w-full flex flex-col gap-6 transition-all duration-500 ease-in-out"
                @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" :class="{
                    'h-1/4 rounded-t-[30px]': !isExpanded,                    
                    'h-3/4 rounded-t-[30px]': isExpanded && !isFullyExpanded,
                    'h-full overflow-y-auto rounded-none': isFullyExpanded
                }">
                <div class="mx-auto w-[40px] h-[5px] rounded-full bg-neutral-700 shrink-0"></div>
                <div class="w-full flex items-center justify-between gap-6">
                    <button
                        class="rounded-2xl bg-neutral-700 shadow-lg flex flex-col items-center justify-center gap-[1px] p-2 aspect-square w-full">
                        <HeartIcon class="w-8 h-8 text-white" />
                        <span class="text-xs text-white">Test</span>
                    </button>
                    <button
                        class="rounded-2xl bg-neutral-700 shadow-lg flex flex-col items-center justify-center gap-[1px] p-2 aspect-square w-full">
                        <BackwardIcon class="w-8 h-8 text-white" />
                        <span class="text-xs text-white">Prev</span>
                    </button>
                    <button
                        class="rounded-2xl bg-neutral-700 shadow-lg flex flex-col items-center justify-center gap-[1px] p-2 aspect-square w-full">
                        <PlayIcon class="w-8 h-8 text-white" />
                        <span class="text-xs text-white">Play</span>
                    </button>
                    <button
                        class="rounded-2xl bg-neutral-700 shadow-lg flex flex-col items-center justify-center gap-[1px] p-2 aspect-square w-full">
                        <ForwardIcon class="w-8 h-8 text-white" />
                        <span class="text-xs text-white">Next</span>
                    </button>
                </div>


                <div>
                    <h2 class="fitter-h2 mt-3 mb-6">
                        Tips for you
                    </h2>
                    <tips-swiper :tips="tips" />                    
                </div>

                <div>
                    <h2 class="fitter-h2 mt-3 mb-6">
                        Your bike fit
                    </h2>

                    <apexchart class="w-full" type="line" :options="chartOptions" :series="chartSeries"></apexchart>
                </div>



            </div>
        </div>
        <!-- /IMITATION OF THREE.JS -->



        <!-- 
            <ul>
                <li>seatHeight: {{ bike?.seatHeight }}</li>
                <li>seatSetback: {{ bike?.seatSetback }}</li>
                <li>seatLength: {{ bike?.seatLength }}</li>
                <li>seatDrop: {{ bike?.seatDrop }}</li>
                <li>spacerHeight: {{ bike?.spacerHeight }}</li>
                <li>stemLength: {{ bike?.stemLength }}</li>
                <li>stemAngle: {{ bike?.stemAngle }}</li>
                <li>stackMin: {{ bike?.stackMin }}</li>
                <li>reachMin: {{ bike?.reachMin }}</li>
                <li>stackMax: {{ bike?.stackMax }}</li>
                <li>reachMax: {{ bike?.reachMax }}</li>
                <li>stack2ReachIndex1: {{ bike?.stack2ReachIndex1 }}</li>
                <li>stack2ReachIndex2: {{ bike?.stack2ReachIndex2 }}</li>
                <li>stack2ReachIndex3: {{ bike?.stack2ReachIndex3 }}</li>
            </ul>
        -->

    </ion-page>
</template>
  
<script lang="ts" setup>
import {
    IonPage, useIonRouter
} from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { BackwardIcon, ForwardIcon, HeartIcon, PlayIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { Bike } from '@/entity/Bike';
import { Tip } from '@/entity/Tip';
import { useRoute } from 'vue-router';
import TipsSwiper from '@/components/TipsSwiper.vue';

// get router params props
const route = useRoute();
const bike_id = Number(route.params.id);
const bike = ref<Bike | null>();
const tips = ref<Tip[]>([]);

const router = useIonRouter();

const goToHome = () => {
    router.navigate('/pages/home', 'none', 'replace');
};

onMounted(async () => {
    bike.value = await Bike.findOneBy({
        id: bike_id
    })
    tips.value = await Tip.find();

    // TODO: Remove this in production
    // if (!bike.value) {
    //     console.log('No bike found');    
    //     goToHome();        
    //     return;
    // }    
});


const startY = ref<number>(0)
const endY = ref<number>(0)
const isExpanded = ref<boolean>(false)
const isFullyExpanded = ref<boolean>(false)

function touchStart(e: TouchEvent) {
    console.log('touchStart');
    startY.value = e.touches[0].clientY;
}
function touchMove(e: TouchEvent) {
    console.log('touchMove');
    endY.value = e.touches[0].clientY;
}
function touchEnd() {
    console.log('touchEnd');
    const diffY = Number(endY.value) - Number(startY.value);

    if (!isFullyExpanded.value && !isExpanded.value && diffY < -100) {
        isExpanded.value = true;
        return;
    }

    if (!isFullyExpanded.value && isExpanded.value && diffY > 100) {
        isExpanded.value = false;
        return;
    }

    if (!isFullyExpanded.value && isExpanded.value && diffY < -100) {
        isFullyExpanded.value = true;
        return;
    }

    if (isFullyExpanded.value && isExpanded.value && diffY > 100 && startY.value < 100) {
        isFullyExpanded.value = false;
        isExpanded.value = false;
        return;
    }
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