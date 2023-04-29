<template>
    <ion-button expand="block" shape="round" :color="checked ? color : 'medium'" mode="ios" fill="outline" type="button"
        class="radio-wizard-button" @click="$emit('update:modelValue', value)">
        {{ label }}
    </ion-button>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: null,
    label: {
        type: String,
        default: '',
    },
    value: {
        type: String,
        default: '',
    },
    color: {
        type: String,
        default: 'secondary',
    },
});

const emits = defineEmits(['update:modelValue']);
const checked = computed(() => props.modelValue === props.value);
</script>

<style>
.radio-wizard-button {
    --border-width: 2px;
    font-weight: 600;
}
</style>