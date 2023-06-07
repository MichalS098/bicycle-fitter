<template>
    <ion-modal :is-open="props.show" :backdrop-dismiss="false">
        <ion-content :fullscreen="true" class="overflow-y-auto">
            <div class="flex flex-col justify-between h-full">
                <div class="flex flex-col gap-3 p-6">
                    <h1 class="text-5xl leading-[48px] font-bold text-black">
                        {{ title }}
                    </h1>
                    <ion-img :src="props.image" class="tip-ion-img"></ion-img>
                    <p class="text-lg text-gray-900">
                        {{ content }}
                    </p>
                </div>
                <div class="px-6 pb-6">
                    <ion-toolbar>
                        <ion-buttons slot="start">
                            <ion-button class="font-bold text-lg" color="dark" @click="prevButtonAction()">
                                {{ props.prevButtonText }}
                            </ion-button>
                        </ion-buttons>
                        <ion-buttons slot="end">
                            <ion-button class="font-bold text-lg" color="primary" @click="nextButtonAction()">
                                {{ props.nextButtonText }}
                            </ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </div>
            </div>
        </ion-content>
    </ion-modal>
</template>
<script setup lang="ts">
import { IonButton, IonButtons, IonModal, IonToolbar, IonImg, IonContent, IonFooter, IonIcon } from "@ionic/vue";
const props = defineProps({
    show: Boolean,
    title: String,
    image: String,
    content: String,
    prevButtonText: String,
    nextButtonText: String
});

const emit = defineEmits(["close", "nextButtonAction", "prevButtonAction"]);

const close = () => {
    emit("close");
};

const nextButtonAction = () => {
    emit("nextButtonAction");
};

const prevButtonAction = () => {
    emit("prevButtonAction");
};
</script>
<style scoped>
ion-modal {
    --width: 90%;
    --min-width: 250px;
    --height: 80%;
    --min-height: 450px;
    --border-radius: 30px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
    --background: #fff;
}

ion-content {
    --background: #fff;
    overflow-y: auto;
}

ion-toolbar {
    --background: #fff;
}
</style>