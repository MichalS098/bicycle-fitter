<template>
    <div>
        <instruction-modal 
            :show="instructionFirst"                 
            prev-button-text="" 
            next-button-text="Next"
            @next-button-action="instructionFirst=false; instructionSecond=true;"                
            title="Measure your body" 
            image="../../assets/images/instructions/instruction-measure.png" 
            content="Now with your phone camera we will
            measure your body for perfect bike fit.
            You can take the measurement by putting 
            the phone on a tripod or leaning it against 
            a bookshelf." 
        />
        <instruction-modal 
            :show="instructionSecond"            
            prev-button-text="Back" 
            next-button-text="Next"
            @next-button-action="instructionSecond=false; instructionThird=true;"
            @prev-button-action="instructionSecond=false; instructionFirst=true;"
            title="Fit in camera frame" 
            image="../../assets/images/instructions/instruction-woman.png" 
            content="In order for the app to measure your body correctly we ask that you fit all the way into the camera frame."
            />
        <instruction-modal 
            :show="instructionThird"                
            prev-button-text="Postpone it"
            next-button-text="Measure me"
            @next-button-action="instructionThird=false;"
            @prev-button-action="skipMeasure()"
            title="Your safety comes first"
            image="../../assets/images/instructions/instruction-woman-2.png" 
            content="The most important thing is your safety, 
                so if you are not in the right place now 
                to take the measurement, postpone it 
                until later. Our app won't go anywhere."
        />
    </div>
</template>
<script lang="ts" setup>
import InstructionModal from '@/components/InstructionModal.vue';
import { ref } from 'vue';

const emit = defineEmits(["skipMeasure"]);

const instructionFirst = ref<boolean>(true);
const instructionSecond = ref<boolean>(false);
const instructionThird = ref<boolean>(false);

const skipMeasure = () => {
    emit("skipMeasure");
}
</script>