<template>
    <ion-button expand="block" shape="round" :color="modelValue ? color : 'medium'" mode="ios" fill="outline" type="button"
        class="radio-wizard-button" @click="$emit('update:modelValue', !modelValue)">
        {{ label }}
    </ion-button>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
        default: '',
    },
    color: {
        type: String,
        default: 'secondary',
    }
});

const emits = defineEmits(['update:modelValue']);
</script>

<style>
.radio-wizard-button {
    --border-width: 2px;
    font-weight: 600;
}
</style>