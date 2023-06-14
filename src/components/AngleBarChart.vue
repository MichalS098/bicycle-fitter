<template>
    <div class="p-5 flex flex-col gap-3 bg-neutral-800 rounded-[30px]">
        <h3 class="text-lg font-bold">
            Last session
        </h3>
        <ul class="flex flex-col gap-3">
            <li class="gap-3 bg-neutral-900 p-3 rounded-[15px] grid grid-cols-12 h-[64px]">
                <h3 class="text-xs col-span-3">
                    Knee angle
                </h3>
                <div class="col-span-9 bg-[#7B1919] w-full h-[20px] relative rounded-[5px]">
                    <span class="absolute left-0 top-[110%] text-xs text-gray-500">
                        130°
                    </span>
                    <span class="absolute right-0 top-[110%] text-xs text-gray-500">
                        165°
                    </span>
                    <div class="absolute left-[10%] w-[40%] top-0 bottom-0 h-full bg-[#C1B015] rounded-[5px]">
                        <div class="absolute left-[10%] w-[40%] top-0 bottom-0 h-full bg-[#287853] rounded-[5px]">

                        </div>
                    </div>
                </div>
            </li>
            <li class="gap-3 bg-neutral-900 p-3 rounded-[15px] grid grid-cols-12 h-[64px]">
                <h3 class="text-xs col-span-3">
                    Torso angle
                </h3>
                <div class="col-span-9 bg-[#7B1919] w-full h-[20px] relative rounded-[5px]">
                    <span class="absolute left-0 top-[110%] text-xs text-gray-500">
                        0°
                    </span>
                    <span class="absolute right-0 top-[110%] text-xs text-gray-500">
                        180°
                    </span>
                    <div class="absolute left-[10%] w-[40%] top-0 bottom-0 h-full bg-[#C1B015] rounded-[5px]">
                        <div class="absolute left-[10%] w-[40%] top-0 bottom-0 h-full bg-[#287853] rounded-[5px]">

                        </div>
                    </div>
                </div>
            </li>
            <li class="gap-3 bg-neutral-900 p-3 rounded-[15px] grid grid-cols-12 h-[64px]">
                <h3 class="text-xs col-span-3">
                    Bicep angle
                </h3>
                <div class="col-span-9 bg-[#7B1919] w-full h-[20px] relative rounded-[5px]">
                    <span class="absolute left-0 top-[110%] text-xs text-gray-500">
                        0°
                    </span>
                    <span class="absolute right-0 top-[110%] text-xs text-gray-500">
                        180°
                    </span>


                    <div :style="{
                        left: angleToPercent(torsoBicepAngleMax, 0, 180) + '%',
                    }" class="top-[110%] absolute">
                        <svg class="w-3 h-3 text-gray-300" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <polygon points="0,100 50,0 100,100" stroke="currentColor" stroke-width="10"
                                fill="transparent" />
                        </svg>
                        <span class="absolute top-6 left-0 text-[10px] leading-[10px] text-gray-300 mt-[-10px]">
                            {{ torsoBicepAngleMax }}°
                        </span>
                    </div>


                    <div :style="{
                        left: angleToPercent(torsoBicepAngleMin, 0, 180) + '%',
                    }" class="top-[110%] absolute">
                        <svg class="w-3 h-3 text-gray-300" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <polygon points="0,100 50,0 100,100" stroke="currentColor" stroke-width="10"
                                fill="transparent" />
                        </svg>
                        <span class="absolute top-6 left-0 text-[10px] leading-[10px] text-gray-300 mt-[-10px]">
                            {{ torsoBicepAngleMin }}°
                        </span>
                    </div>

                    <div class="absolute left-[10%] w-[40%] top-0 bottom-0 h-full bg-[#C1B015] rounded-[5px]">
                        <div class="absolute left-[10%] w-[40%] top-0 bottom-0 h-full bg-[#287853] rounded-[5px]">

                        </div>
                    </div>
                </div>
            </li>
            <li class="gap-3 bg-neutral-900 p-3 rounded-[15px] grid grid-cols-12 h-[64px]">
                <h3 class="text-xs col-span-3">
                    Foot angle
                </h3>
                <div class="col-span-9 bg-[#7B1919] w-full h-[20px] relative rounded-[5px]">
                    <span class="absolute left-0 top-[110%] text-xs text-gray-500">
                        0°
                    </span>
                    <span class="absolute right-0 top-[110%] text-xs text-gray-500">
                        180°
                    </span>
                    <div class="absolute left-[10%] w-[40%] top-0 bottom-0 h-full bg-[#C1B015] rounded-[5px]">
                        <div class="absolute left-[10%] w-[40%] top-0 bottom-0 h-full bg-[#287853] rounded-[5px]">

                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script lang="ts" setup>
import { Angles } from '@/entity/Angles';
import { onMounted } from 'vue';

const props = defineProps<{
    angles: Angles;
}>();


const torsoBicepAngleMax = 180; // degree
const torsoBicepAngleMin = 45; // degree

const angleToPercent = (angle: number, min: number, max: number) => {
    return (angle - min) / (max - min) * 100;
}
</script>