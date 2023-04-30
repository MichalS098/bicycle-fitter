<template>
    <ion-page>
        <ion-content class="ion-padding" :fullscreen="true">
            <div class="flex flex-col justify-between gap-6 xxs:gap-12">
                <div class="px-3 xxs:px-6 pt-3 xxs:pt-6">
                    <div class="w-full flex justify-end">
                        <!-- TODO: temporary avatar -->
                        <button @click="() => router.navigate('/pages/profile', 'none')">
                            <svg class="rounded-full w-12 h-12" viewBox="0 0 80 80" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="80" height="80"><title>Amelia Earhart</title><mask id="mask__bauhaus" maskUnits="userSpaceOnUse" x="0" y="0" width="80" height="80"><rect width="80" height="80" rx="160" fill="#FFFFFF"></rect></mask><g mask="url(#mask__bauhaus)"><rect width="80" height="80" fill="#85c2a5"></rect><rect x="10" y="30" width="80" height="80" fill="#658ca9" transform="translate(-2 -2) rotate(288 40 40)"></rect><circle cx="40" cy="40" fill="#ac89c8" r="16" transform="translate(12 -12)"></circle><line x1="0" y1="40" x2="80" y2="40" stroke-width="2" stroke="#27455c" transform="translate(16 -16) rotate(216 40 40)"></line></g></svg>                    
                        </button>
                    </div>
                    <h2 class="text-5xl xxs:text-6xl">
                        My
                        <br>
                        Bikes
                    </h2>
                </div>
                <div class="flex flex-col justify-between gap-3 xxs:gap-6">
                    <bike-card v-for="bike in user?.bikes" :key="bike.id" :bike="bike" />
                    <new-bike-card />
                </div>
            </div>
            <div class="h-[6rem] xs:h-[7rem] bg-transparent"></div>
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import {
    IonPage, IonContent, useIonRouter
} from '@ionic/vue';
import { User } from '@/entity/User';
import { onMounted, ref } from 'vue';
import BikeCard from '@/components/BikeCard.vue';
import NewBikeCard from '@/components/NewBikeCard.vue';

const router = useIonRouter();
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
  