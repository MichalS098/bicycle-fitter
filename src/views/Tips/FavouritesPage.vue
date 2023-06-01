<template>
    <bikefitter-page title="Favourites">
        <div class="w-full grid grid-cols-2 gap-[10px]">
            <div v-for="tip in tips" :key="tip.id">
                <tip-card :tip="tip" />
            </div>
        </div>
    </bikefitter-page>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Tip } from '@/entity/Tip';
import TipCard from '@/components/TipCard.vue';
import BikefitterPage from '@/components/BikefitterPage.vue';
import { onIonViewDidEnter } from '@ionic/vue';

const tips = ref<Tip[]>([]);

onMounted(async () => {
    tips.value = await Tip.findBy({ favourite: true });
});

onIonViewDidEnter(async () => {
    tips.value = await Tip.findBy({ favourite: true });
});
</script>