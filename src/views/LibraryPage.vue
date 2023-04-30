<template>
    <ion-page>
        <ion-content class="ion-padding" :fullscreen="true">
            <div class="flex flex-col justify-between gap-6 xxs:gap-12">
                <div class="px-3 xxs:px-6 pt-3 xxs:pt-6">
                    <h2 class="mt-12 text-5xl xxs:text-6xl">
                        Tips
                    </h2>
                </div>

                <swiper :modules="modules" :autoplay="true" :keyboard="true" :pagination="true" :scrollbar="true" :zoom="true">
                    <swiper-slide>
                        <span class="text-white">test slajdu test</span> 
                    </swiper-slide>
                    <swiper-slide>
                        <span class="text-white">test slajdu test</span> 
                    </swiper-slide>
                    <swiper-slide>
                        <span class="text-white">test slajdu test</span> 
                    </swiper-slide>
                </swiper>
                <div class="grid grid-cols-2 gap-3">

                    <tip-card v-for="tip in tips" :key="tip.id" :tip="tip" />
                </div>
            </div>
            <div class="h-[6rem] xs:h-[7rem] bg-transparent"></div>
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

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import '@ionic/vue/css/ionic-swiper.css';
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

const modules = [Autoplay, Keyboard, Pagination, Scrollbar, Zoom];

const tips = ref<Tip[]>([]);

onMounted(async () => {
    tips.value = await Tip.find();
});
</script>