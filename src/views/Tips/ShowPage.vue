<template>
    <ion-page>
        <ion-content class="ion-padding" :fullscreen="true">
            <div class="flex flex-col justify-between gap-6 xxs:gap-12 pt-12">
                <div class="px-3 xxs:px-6 pt-3 xxs:pt-6">
                    <h1 class="text-5xl xxs:text-6xl">
                        tip
                    </h1>
                </div>
                <div class="w-full">                    
                </div>
            </div>
            <space-for-tab-bar-menu /> 
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import {
    IonPage, IonContent
} from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { Tip } from '@/entity/Tip';
import SpaceForTabBarMenu from '@/components/SpaceForTabBarMenu.vue';

</script>