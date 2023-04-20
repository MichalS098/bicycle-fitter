<template>
    <ion-button expand="block" shape="round" :color="checked ? activeColor : 'medium'" mode="ios" fill="outline"
        type="button" class="radio-wizard-button">
        {{ label }}
    </ion-button>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';

const props = defineProps({
    checked: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
        default: '',
    },
    activeColor: {
        type: String,
        default: 'secondary',
    },
});
</script>

<style>
.radio-wizard-button {
    --border-width: 2px;
    font-weight: 600;
}
</style>