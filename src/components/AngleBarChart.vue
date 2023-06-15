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
                    <!-- <span class="absolute left-0 top-[110%] text-xs text-gray-500">
                        130°
                    </span>
                    <span class="absolute right-0 top-[110%] text-xs text-gray-500">
                        165°
                    </span> -->

                    <div :style="{
                        left: angleToPercent(kneeAngleMax, 50, 175) + '%',
                    }" class="top-[110%] absolute">
                        <svg class="w-3 h-3 text-gray-300" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <polygon points="0,100 50,0 100,100" stroke="currentColor" stroke-width="10"
                                fill="transparent" />
                        </svg>
                        <span class="absolute top-6 left-0 text-[10px] leading-[10px] text-gray-300 mt-[-10px]">
                            {{ kneeAngleMax }}°
                        </span>
                    </div>


                    <div :style="{
                        left: angleToPercent(kneeAngleMin, 50, 175) + '%',
                    }" class="top-[110%] absolute">
                        <svg class="w-3 h-3 text-gray-300" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <polygon points="0,100 50,0 100,100" stroke="currentColor" stroke-width="10"
                                fill="transparent" />
                        </svg>
                        <span class="absolute top-6 left-0 text-[10px] leading-[10px] text-gray-300 mt-[-10px]">
                            {{ kneeAngleMin }}°
                        </span>
                    </div>
                    <div :style="{
                        left: leftOfGoodKneeAngle + '%',
                        width: weigthOfGoodKneeAngle + '%'
                    }"  class="absolute left-0 w-0 top-0 bottom-0 h-full bg-[#C1B015] rounded-[5px]">
                        <div :style="{
                        left: leftOfOptimalKneeAngle + '%',
                        width: weigthOfOptimalKneeAngle + '%'
                    }" class="absolute left-0 w-0 top-0 bottom-0 h-full bg-[#287853] rounded-[5px]">

                        </div>
                    </div>
                </div>
            </li>
            <li class="gap-3 bg-neutral-900 p-3 rounded-[15px] grid grid-cols-12 h-[64px]">
                <h3 class="text-xs col-span-3">
                    Torso angle
                </h3>
                <div class="col-span-9 bg-[#7B1919] w-full h-[20px] relative rounded-[5px]">
                    <!-- <span class="absolute left-0 top-[110%] text-xs text-gray-500">
                        0°
                    </span>
                    <span class="absolute right-0 top-[110%] text-xs text-gray-500">
                        180°
                    </span> -->

                    <div :style="{
                        left: angleToPercent(torsoAngleMax, 5, 80) + '%',
                    }" class="top-[110%] absolute">
                        <svg class="w-3 h-3 text-gray-300" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <polygon points="0,100 50,0 100,100" stroke="currentColor" stroke-width="10"
                                fill="transparent" />
                        </svg>
                        <span class="absolute top-6 left-0 text-[10px] leading-[10px] text-gray-300 mt-[-10px]">
                            {{ torsoAngleMax }}°
                        </span>
                    </div>


                    <div :style="{
                        left: angleToPercent(torsoAngleMin, 5, 80) + '%',
                    }" class="top-[110%] absolute">
                        <svg class="w-3 h-3 text-gray-300" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <polygon points="0,100 50,0 100,100" stroke="currentColor" stroke-width="10"
                                fill="transparent" />
                        </svg>
                        <span class="absolute top-6 left-0 text-[10px] leading-[10px] text-gray-300 mt-[-10px]">
                            {{ torsoAngleMin }}°
                        </span>
                    </div>

                    <div :style="{
                        left: leftOfGoodTorsoAngle + '%',
                        width: weigthOfGoodTorsoAngle + '%'
                    }"  class="absolute left-0 w-0 top-0 bottom-0 h-full bg-[#C1B015] rounded-[5px]">
                        <div :style="{
                        left: leftOfOptimalTorsoAngle + '%',
                        width: weigthOfOptimalTorsoAngle + '%'
                    }" class="absolute left-0 w-0 top-0 bottom-0 h-full bg-[#287853] rounded-[5px]">

                        </div>
                    </div>
                </div>
            </li>
            <li class="gap-3 bg-neutral-900 p-3 rounded-[15px] grid grid-cols-12 h-[64px]">
                <h3 class="text-xs col-span-3">
                    Bicep angle
                </h3>
                <div class="col-span-9 bg-[#7B1919] w-full h-[20px] relative rounded-[5px]">
                    <!-- <span class="absolute left-0 top-[110%] text-xs text-gray-500">
                        0°
                    </span>
                    <span class="absolute right-0 top-[110%] text-xs text-gray-500">
                        180°
                    </span> -->


                    <div :style="{
                        left: angleToPercent(torsoBicepAngleMax, 130, 180) + '%',
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
                        left: angleToPercent(torsoBicepAngleMin, 130, 180) + '%',
                    }" class="top-[110%] absolute">
                        <svg class="w-3 h-3 text-gray-300" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <polygon points="0,100 50,0 100,100" stroke="currentColor" stroke-width="10"
                                fill="transparent" />
                        </svg>
                        <span class="absolute top-6 left-0 text-[10px] leading-[10px] text-gray-300 mt-[-10px]">
                            {{ torsoBicepAngleMin }}°
                        </span>
                    </div>

                    <div :style="{
                        left: leftOfGoodTorsoBicepAngle + '%',
                        width: weigthOfGoodTorsoBicepAngle + '%'
                    }"  class="absolute left-0 w-0 top-0 bottom-0 h-full bg-[#C1B015] rounded-[5px]">
                        <div :style="{
                        left: leftOfOptimalTorsoBicepAngle + '%',
                        width: weigthOfOptimalTorsoBicepAngle + '%'
                    }" class="absolute left-0 w-0 top-0 bottom-0 h-full bg-[#287853] rounded-[5px]">

                        </div>
                    </div>
                </div>
            </li>
            <li class="gap-3 bg-neutral-900 p-3 rounded-[15px] grid grid-cols-12 h-[64px]">
                <h3 class="text-xs col-span-3">
                    Foot angle
                </h3>
                <div class="col-span-9 bg-[#7B1919] w-full h-[20px] relative rounded-[5px]">
                    <!-- <span class="absolute left-0 top-[110%] text-xs text-gray-500">
                        0°
                    </span>
                    <span class="absolute right-0 top-[110%] text-xs text-gray-500">
                        180°
                    </span> -->

                    <div :style="{
                        left: angleToPercent(footAngleMax, 130, 180) + '%',
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
                        left: angleToPercent(footAngleMin, 130, 180) + '%',
                    }" class="top-[110%] absolute">
                        <svg class="w-3 h-3 text-gray-300" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <polygon points="0,100 50,0 100,100" stroke="currentColor" stroke-width="10"
                                fill="transparent" />
                        </svg>
                        <span class="absolute top-6 left-0 text-[10px] leading-[10px] text-gray-300 mt-[-10px]">
                            {{ torsoBicepAngleMin }}°
                        </span>
                    </div>

                    <div :style="{
                        left: leftOfGoodFootAngle + '%',
                        width: weigthOfGoodFootAngle + '%'
                    }"  class="absolute left-0 w-0 top-0 bottom-0 h-full bg-[#C1B015] rounded-[5px]">
                        <div :style="{
                        left: leftOfOptimalFootAngle + '%',
                        width: weigthOfOptimalFootAngle + '%'
                    }" class="absolute left-0 w-0 top-0 bottom-0 h-full bg-[#287853] rounded-[5px]">

                        </div>
                    </div>
                </div>
            </li>

            <li class="gap-3 bg-neutral-900 p-3 rounded-[15px] grid grid-cols-12 h-[64px]">
                <h3 class="text-xs col-span-3">
                    Arm angle
                </h3>
                <div class="col-span-9 bg-[#7B1919] w-full h-[20px] relative rounded-[5px]">
                    <!-- <span class="absolute left-0 top-[110%] text-xs text-gray-500">
                        0°
                    </span>
                    <span class="absolute right-0 top-[110%] text-xs text-gray-500">
                        180°
                    </span> -->

                    <div :style="{
                        left: angleToPercent(footAngleMax, 130, 180) + '%',
                    }" class="top-[110%] absolute">
                        <svg class="w-3 h-3 text-gray-300" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <polygon points="0,100 50,0 100,100" stroke="currentColor" stroke-width="10"
                                fill="transparent" />
                        </svg>
                        <span class="absolute top-6 left-0 text-[10px] leading-[10px] text-gray-300 mt-[-10px]">
                            {{ footAngleMax }}°
                        </span>
                    </div>


                    <div :style="{
                        left: angleToPercent(footAngleMin, 130, 180) + '%',
                    }" class="top-[110%] absolute">
                        <svg class="w-3 h-3 text-gray-300" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <polygon points="0,100 50,0 100,100" stroke="currentColor" stroke-width="10"
                                fill="transparent" />
                        </svg>
                        <span class="absolute top-6 left-0 text-[10px] leading-[10px] text-gray-300 mt-[-10px]">
                            {{ footAngleMin }}°
                        </span>
                    </div>

                    <div :style="{
                        left: leftOfGoodFootAngle + '%',
                        width: weigthOfGoodFootAngle + '%'
                    }"  class="absolute left-0 w-0 top-0 bottom-0 h-full bg-[#C1B015] rounded-[5px]">
                        <div :style="{
                        left: leftOfOptimalFootAngle + '%',
                        width: weigthOfOptimalFootAngle + '%'
                    }" class="absolute left-0 w-0 top-0 bottom-0 h-full bg-[#287853] rounded-[5px]">

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



//Optmial is green colour
const weigthOfOptimalKneeAngle = 68 //Percent
const leftOfOptimalKneeAngle = 16 //Percet

//Good is yellow colour
const weigthOfGoodKneeAngle = 76 //Percent
const leftOfGoodKneeAngle = 12 //Percent

const kneeAngleMax = 155// degree
const kneeAngleMin = 70// degree


//Optmial is green colour
const weigthOfOptimalTorsoAngle = 47 //Percent
const leftOfOptimalTorsoAngle = 27 //Percet

//Good is yellow colour
const weigthOfGoodTorsoAngle = 75 //Percent
const leftOfGoodTorsoAngle = 13 //Percent

const torsoAngleMax = 60// degree
const torsoAngleMin = 25// degree



//Optmial is green colour
const weigthOfOptimalTorsoBicepAngle = 40 //Percent
const leftOfOptimalTorsoBicepAngle = 35 //Percet

//Good is yellow colour
const weigthOfGoodTorsoBicepAngle = 60 //Percent
const leftOfGoodTorsoBicepAngle = 20 //Percent

const torsoBicepAngleMax = 150; // degree
const torsoBicepAngleMin = 160; // degree



//Optmial is green colour
const weigthOfOptimalFootAngle = 68 //Percent
const leftOfOptimalFootAngle = 16 //Percet

//Good is yellow colour
const weigthOfGoodFootAngle = 76 //Percent
const leftOfGoodFootAngle = 12 //Percent

const footAngleMax = 155 // degree
const footAngleMin = 70 // degree

/*From Data Base 

In PDF this name it Foot Angle 
 footFloorAngleMax!: number 7- 30 
    @Column()
    footFloorAngleMin!: number


    In PDF this name it Knee Angle   min is 70 max 155
    @Column()
    thighShankAngleMax!: number
    @Column()
    thighShankAngleMin!: number

    In PDF this name it Torso Angle  depends with type bike and level ride
    @Column()
    torsoFloorAngleMax!: number
    @Column()
    torsoFloorAngleMin!: number

    In PDF this name it Shoulder Angle  For Elite around 90 
    @Column()
    torsoBicepAngleMax!: number
    @Column()
    torsoBicepAngleMin!: number

    In PDF this name it Arm Angle(there is Bicep Angle)  Optimal is 150 to 160 degress
    @Column()
    bicepForearmAngleMax!: number
    @Column()
    bicepForearmAngleMin!: number
*/
const angleToPercent = (angle: number, min: number, max: number) => {
    return (angle - min) / (max - min) * 100;
}

/*onMounted(async () => {


});*/

</script>