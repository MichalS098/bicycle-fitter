<template>
    <ion-page>
        <ion-content class="ion-padding" :fullscreen="true">
            <div class="flex flex-col justify-between gap-6 xxs:gap-12 pt-12">
                <div class="px-3 xxs:px-6 pt-3 xxs:pt-6">
                    <h1 class="text-5xl xxs:text-6xl">
                        Tips
                    </h1>
                </div>
                <div class="w-full">
                    <h3 class="text-2xl xxs:text-3xl px-3 xxs:px-6">
                        Crucial in b-fitting
                    </h3>
                    <swiper>
                        <swiper-slide v-for="tip in tips" :key="tip.id">
                            <tip-card :tip="tip" />
                        </swiper-slide>
                    </swiper>
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
import TipCard from '@/components/TipCard.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SpaceForTabBarMenu from '@/components/SpaceForTabBarMenu.vue';

const tips = ref<Tip[]>([]);

onMounted(async () => {
    tips.value = await Tip.find();
});
</script>