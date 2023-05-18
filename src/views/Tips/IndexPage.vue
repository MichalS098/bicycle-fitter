<template>
    <ion-page>
        <ion-content class="ion-padding" :fullscreen="true">
            <div class="flex flex-col justify-between gap-6 xxs:gap-12">
                <div class="px-3 xxs:px-6 pt-3 xxs:pt-6">
                    <h1 class="fitter-h1">
                        Tips
                    </h1>
                </div>
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
import TipsSwiper from '@/components/TipsSwiper.vue';
import SpaceForTabBarMenu from '@/components/SpaceForTabBarMenu.vue';

const tips = ref<Tip[]>([]);

onMounted(async () => {
    // // CREATING NEW TIPS FOR WEB TESTING
    // for (let i = 0; i < 3; i++) {
    //     const tip = new Tip();
    //     tip.title = 'Test';
    //     tip.description = 'Test';
    //     tip.color = 'primary';
    //     tip.featured_image_path = 'https://picsum.photos/seed/picsum/200/300';        
    //     await tip.save();
    // }

    tips.value = await Tip.find();
});
</script>