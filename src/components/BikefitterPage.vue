<template>
    <ion-page>
        <ion-content class="ion-padding" :fullscreen="true">
            <div class="flex flex-col justify-between gap-6 xxs:gap-12">
                <div class="px-3 xxs:px-6 pt-6 xxs:pt-12 xs:pt-24">
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
import { IonPage, IonContent } from '@ionic/vue';

const props = defineProps({
    title: {
        type: String,
        required: false,
        default: ''
    }
});
</script>