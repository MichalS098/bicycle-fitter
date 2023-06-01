<template>
    <bikefitter-page :background-color="tip?.color" :without-title="true" :without-tab-bar="true">
        <div>
            <ion-buttons slot="start">
                <ion-back-button default-href="/pages/tips" color="light"></ion-back-button>
            </ion-buttons>
            <div class="flex flex-col gap-4 pt-4">
                <ion-img :src="tip?.featured_image_path" class="tip-showpage-img"></ion-img>
                <h2 class="fitter-h2">
                    {{ tip?.title }}
                </h2>
                <button @click="toggleLike()" type="button" class="ml-auto">
                    <transition name="fade">
                        <HeartSolidIcon v-if="tip?.favourite" class="w-8 h-8 text-white shrink-0" />
                        <HeartIcon v-else class="w-8 h-8 text-white shrink-0" />
                    </transition>
                </button>
            </div>
        </div>

        <div class="prose">
            {{ tip?.content }}
        </div>
    </bikefitter-page>
</template>
  
<script setup lang="ts">
import BikefitterPage from '@/components/BikefitterPage.vue';
import { onMounted, ref } from 'vue';
import { Tip } from '@/entity/Tip';
import { useRoute } from 'vue-router';
import { IonImg, IonBackButton, IonButtons } from '@ionic/vue';
import { HeartIcon as HeartSolidIcon } from '@heroicons/vue/24/solid';
import { HeartIcon } from '@heroicons/vue/24/outline';

const route = useRoute();
const tip_id = Number(route.params.id);
const tip = ref<Tip | null>();

onMounted(async () => {
    tip.value = await Tip.findOneBy({
        id: tip_id
    });
});

const toggleLike = async () => {
    if (tip.value) {
        tip.value.favourite = !tip.value.favourite;
        await tip.value.save();
    }
}
</script>

<style scoped>
.tip-showpage-img::part(image) {
    object-fit: cover;
    width: 100%;
    border-radius: 10px;
    aspect-ratio: 1.6;
}

.fade-enter-active {
    transition: opacity 0.5s ease;
}

.fade-leave-active {
    transition: none;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>