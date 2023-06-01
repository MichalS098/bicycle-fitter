<template>
    <bikefitter-page title="Tips">
        <div class="w-full">
            <h2 class="fitter-h2 px-2 xxs:px-3 pb-3">
                Crucial in b-fitting
            </h2>
            <tips-swiper :tips="tips" />
            <h2 class="fitter-h2 px-2 xxs:px-3 pb-3 pt-6">
                Crucial in b-fitting
            </h2>
            <tips-swiper :tips="tips" />
        </div>
    </bikefitter-page>
</template>
  
<script setup lang="ts">
import BikefitterPage from '@/components/BikefitterPage.vue';
import { onMounted, ref } from 'vue';
import { Tip } from '@/entity/Tip';
import TipsSwiper from '@/components/TipsSwiper.vue';
import { onIonViewDidEnter } from '@ionic/vue';

const tips = ref<Tip[]>([]);

onMounted(async () => {
    tips.value = await Tip.find();
});

onIonViewDidEnter(async () => {
    tips.value = await Tip.find();
});
</script>