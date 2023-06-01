<template>
    <bikefitter-page title="Tips">
        <div class="w-full flex flex-col gap-5">
            <div v-for="category in tipCategories" :key="category.id">
                <h2 class="fitter-h2 px-2 xxs:px-3 pb-3">
                    {{ category.name }}
                </h2>
                <tips-swiper :tips="category.tips" />
            </div>
        </div>
    </bikefitter-page>
</template>
  
<script setup lang="ts">
import BikefitterPage from '@/components/BikefitterPage.vue';
import { onMounted, ref } from 'vue';
import { Category } from '@/entity/Category';
import TipsSwiper from '@/components/TipsSwiper.vue';
import { onIonViewDidEnter } from '@ionic/vue';

const tipCategories = ref<Category[]>([]);

onMounted(async () => {
    tipCategories.value = await Category.find({
        relations: {
            tips: true
        },
    });
});

onIonViewDidEnter(async () => {
    tipCategories.value = await Category.find({
        relations: {
            tips: true
        },
    });
});
</script>