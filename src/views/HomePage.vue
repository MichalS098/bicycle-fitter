<template>
    <bikefitter-page>
        <template #title>
            My
            <br>
            Bikes
        </template>
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 xxs:gap-6">            
            <bike-card v-for="bike in user?.bikes" :key="bike.id" :bike="bike" />
            <new-bike-card />
        </div>
    </bikefitter-page>
</template>
  
<script setup lang="ts">
import { User } from '@/entity/User';
import { onMounted, ref } from 'vue';
import BikeCard from '@/components/BikeCard.vue';
import NewBikeCard from '@/components/NewBikeCard.vue';
import BikefitterPage from '@/components/BikefitterPage.vue';

const user = ref<User | null>(null);
onMounted(async () => {
    user.value = await User.findOne({
        where: {
            id: 1
        },
        relations: {
            bikes: true
        }
    });
});
</script>
  