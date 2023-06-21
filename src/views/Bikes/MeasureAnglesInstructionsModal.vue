<template>
    <div>
        <instruction-modal :show="instructionFirst" prev-button-text="" next-button-text="Next"
            @next-button-action="instructionFirst = false; instructionSecond = true;" 
            title="Measure your angles on bike"
            image="../../assets/images/instructions/instruction-measure.png" 
            content="Now with your phone camera we will 
                    measure your angles in knee, torso etc.
                    This analiysis will give you useful 
                    information for bike fitting." />

        <instruction-modal :show="instructionSecond" prev-button-text="Back" next-button-text="Next"
            @next-button-action="instructionSecond = false; instructionThird = true;"
            @prev-button-action="instructionSecond = false; instructionFirst = true;" 
            title="Set up your bike"
            image="../../assets/images/instructions/instruction-woman.png"
            content="You can set up your bike on a holter 
                    or if you dont have one we suggest 
                    lean your bike against a wall or tree 
                    and spin the pedals backwards." />

        <instruction-modal :show="instructionThird" prev-button-text="Back" next-button-text="Next"
            @next-button-action="instructionThird = false; instructionFourth = true;"
            @prev-button-action="instructionThird = false; instructionSecond = true;" 
            title="Start measure on your bike"
            image="../../assets/images/instructions/instruction-woman.png"
            content="When the app sees your entire body it will 
                    start counting down a 15 second timer. 
                    During this time, get safely on your bike 
                    and start pedaling. The app will notify you 
                    when the measurements are complete." />

        <instruction-modal :show="instructionFourth" prev-button-text="Cancel" next-button-text="Measure me"
            @next-button-action="instructionFourth = false;" @prev-button-action="cancelMeasure()"
            title="Your safety comes first" 
            image="../../assets/images/instructions/instruction-woman-2.png" 
            content="The most important thing is your safety, 
                    so if you are not in the right place now 
                    to take the measurement, postpone it 
                    until later. Our app won't go anywhere." />
    </div>
</template>
<script lang="ts" setup>
import InstructionModal from '@/components/InstructionModal.vue';
import { ref } from 'vue';

const emit = defineEmits(["cancelMeasure"]);

const instructionFirst = ref<boolean>(true);
const instructionSecond = ref<boolean>(false);
const instructionThird = ref<boolean>(false);
const instructionFourth = ref<boolean>(false);

const cancelMeasure = () => {
    instructionFirst.value = false;
    instructionSecond.value = false;
    instructionThird.value = false;
    instructionFourth.value = false;
    emit("cancelMeasure");
}
</script>