<template>
    <ion-page>
        <ion-header :translucent="true" class="bikefitter-header">
            <!-- DO NOT REMOVE THIS DIV -->
            <div>
            </div>
        </ion-header>
        <ion-content class="ion-padding" :fullscreen="true" :color="props.backgroundColor">
            <div class="flex flex-col justify-between gap-6 xxs:gap-12">                
                <div v-if="!withoutTitle" class="px-3 xxs:px-6 pt-3">
                    <h1 class="fitter-h1">
                        <slot name="title">{{ props.title }}</slot>
                    </h1>
                </div>
                <slot></slot>
                <space-for-tab-bar-menu v-if="!withoutTabBar"></space-for-tab-bar-menu>
            </div>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import SpaceForTabBarMenu from '@/components/SpaceForTabBarMenu.vue';
import { IonPage, IonContent, IonHeader } from '@ionic/vue';

const props = defineProps({
    title: {
        type: String,
        required: false,
        default: ''
    },
    backgroundColor: {
        type: String,
        required: false,
        default: ''
    },
    withoutTitle: {
        type: Boolean,
        required: false,
        default: false,
    },
    withoutTabBar: {
        type: Boolean,
        required: false,
        default: false,
    },    
});
</script>
<style scoped>
ion-header {
    --background: transparent;
    --border-color: transparent;
    padding-top: var(--ion-safe-area-top, 0);
}
</style>