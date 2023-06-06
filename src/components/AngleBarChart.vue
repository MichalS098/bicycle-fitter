<template>
    <div class="p-5 flex flex-col gap-3 bg-neutral-800 rounded-[30px]">
        <h3 class="text-lg font-bold">
            Last session
        </h3>
        <ul class="flex flex-col gap-3">
            <li class="gap-3 bg-neutral-900 p-3 rounded-[15px] grid grid-cols-12 h-[58px]">
                <h3 class="text-xs col-span-3">
                    Knee angle
                </h3>
                <div class="col-span-9 bg-[#7B1919] w-full h-[20px] relative rounded-[5px]">
                    <div class="absolute left-[10%] w-[40%] top-0 bottom-0 h-full bg-[#C1B015] rounded-[5px]">
                        <div class="absolute left-[10%] w-[40%] top-0 bottom-0 h-full bg-[#287853] rounded-[5px]">

                        </div>
                    </div>
                </div>
            </li>
            <li class="gap-3 bg-neutral-900 p-3 rounded-[15px] grid grid-cols-12 h-[58px]">
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
            <li class="gap-3 bg-neutral-900 p-3 rounded-[15px] grid grid-cols-12 h-[58px]">
                <h3 class="text-xs col-span-3">
                    Bicep angle
                </h3>
                <div class="col-span-9 bg-[#7B1919] w-full h-[20px] relative rounded-[5px]">
                    <div class="absolute left-[10%] w-[40%] top-0 bottom-0 h-full bg-[#C1B015] rounded-[5px]">
                        <div class="absolute left-[10%] w-[40%] top-0 bottom-0 h-full bg-[#287853] rounded-[5px]">

                        </div>
                    </div>
                </div>
            </li>
            <li class="gap-3 bg-neutral-900 p-3 rounded-[15px] grid grid-cols-12 h-[58px]">
                <h3 class="text-xs col-span-3">
                    Foot angle
                </h3>
                <div class="col-span-9 bg-[#7B1919] w-full h-[20px] relative rounded-[5px]">
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

const angles = {

}
// const props = defineProps({
//     angles: Angles,
// });
</script>