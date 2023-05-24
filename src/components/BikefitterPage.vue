<template>
    <ion-page>
        <ion-header :translucent="true" class="bikefitter-header">             
            <div>
            </div>
        </ion-header>
        <ion-content class="ion-padding" :fullscreen="true">
            <div class="flex flex-col justify-between gap-6 xxs:gap-12">
                <div class="px-3 xxs:px-6 pt-3">
                    <h1 class="fitter-h1">
                        <slot name="title">{{ props.title }}</slot>
                    </h1>
                </div>
                <slot></slot>
                <space-for-tab-bar-menu />
            </div>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import SpaceForTabBarMenu from '@/components/SpaceForTabBarMenu.vue';
import { IonPage, IonContent, IonHeader, IonToolbar } from '@ionic/vue';

const props = defineProps({
    title: {
        type: String,
        required: false,
        default: ''
    }
});
</script>
<style scoped>
ion-toolbar {
    --background: transparent;
    --border-color: transparent;
}

ion-header {
    --background: transparent;
    --border-color: transparent;
    padding-top: var(--ion-safe-area-top, 0);
}
</style>