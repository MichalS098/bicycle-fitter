<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/pages/profile" color="secondary"></ion-back-button>
                </ion-buttons>
                <ion-title color="secondary">
                    Measurements
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" :fullscreen="true">
            <div class="flex flex-col justify-between gap-6 xxs:gap-12">
                <div class="w-full flex flex-col gap-6">
                    <h2 class="fitter-h2 px-2 xxs:px-3">
                        Your measurements
                    </h2>
                    <ion-list>
                        <ion-item>
                            <ion-input type="number" label="Shank Length" label-placement="stacked" :clear-input="true"
                                placeholder="Enter your shank length" error-text="Please enter a valid shank length"
                                required step="0.01" min="0" max="250" :value="user?.shankLength"
                                @ionInput="updateUserModel('shankLength', $event.target.value)">
                            </ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-input type="number" label="Thigh Length" label-placement="stacked" :clear-input="true"
                                placeholder="Enter your thigh length" error-text="Please enter a valid thigh length"
                                required step="0.01" min="0" max="250" :value="user?.thighLength"
                                @ionInput="updateUserModel('thighLength', $event.target.value)">
                            </ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-input type="number" label="Shoe Size" label-placement="stacked" :clear-input="true"
                                placeholder="Enter your shoe size" error-text="Please enter a valid shoe size" required
                                step="0.01" min="0" max="250" :value="user?.shoeSize"
                                @ionInput="updateUserModel('shoeSize', $event.target.value)">
                            </ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-input type="number" label="Inseam Length" label-placement="stacked" :clear-input="true"
                                placeholder="Enter your inseam length" error-text="Please enter a valid inseam length"
                                required step="0.01" min="0" max="250" :value="user?.inseamLength"
                                @ionInput="updateUserModel('inseamLength', $event.target.value)">
                            </ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-input type="number" label="Shoulder Height" label-placement="stacked" :clear-input="true"
                                placeholder="Enter your shoulder height" error-text="Please enter a valid shoulder height"
                                required step="0.01" min="0" max="250" :value="user?.shoulderHeight"
                                @ionInput="updateUserModel('shoulderHeight', $event.target.value)">
                            </ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-input type="number" label="Arm Length" label-placement="stacked" :clear-input="true"
                                placeholder="Enter your arm length" error-text="Please enter a valid arm length" required
                                step="0.01" min="0" max="250" :value="user?.armLength"
                                @ionInput="updateUserModel('armLength', $event.target.value)">
                            </ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-input type="number" label="Overall Height" label-placement="stacked" :clear-input="true"
                                placeholder="Enter your overall height" error-text="Please enter a valid overall height"
                                required step="0.01" min="0" max="250" :value="user?.overallHeight"
                                @ionInput="updateUserModel('overallHeight', $event.target.value)">
                            </ion-input>
                        </ion-item>
                    </ion-list>
                    <ion-button expand="block" color="light" @click="saveChanges">
                        Save
                    </ion-button>
                    <ion-toast :is-open="savingSuccess" message="Your changes have been saved" :duration="3000"
                        @didDismiss="savingSuccess = false"></ion-toast>
                </div>
            </div>
            <space-for-tab-bar-menu />
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import {
    IonPage, IonContent, IonList, IonItem, IonInput, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonToast
} from '@ionic/vue';
import SpaceForTabBarMenu from '@/components/SpaceForTabBarMenu.vue';
import { onMounted, ref } from 'vue';
import { getUserFromDatabase } from '@/helpers/helpersDataBase';
import { User } from '@/entity/User';

const user = ref<User>();
const savingSuccess = ref(false);
onMounted(async () => {
    user.value = await getUserFromDatabase();
});

const updateUserModel = (key: string, value: any) => {
    (user.value as any)[key] = Number(value);
}

const saveChanges = async () => {
    await user.value?.save();
    console.log(user.value);
    savingSuccess.value = true;
}
</script>

<style scoped>
ion-content::part(background) {
    background-image: linear-gradient(to top right, var(--tw-gradient-stops));
    --tw-gradient-from: var(--ion-color-secondary-shade) var(--tw-gradient-from-position);
    --tw-gradient-from-position: ;
    --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-from-position);
    --tw-gradient-to-position: ;
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
    --tw-gradient-to: var(--ion-color-secondary) var(--tw-gradient-to-position);
    --tw-gradient-to-position:
}

ion-list {
    --ion-item-background: transparent;
}

ion-input {
    --color: var(--ion-color-white);
    --highlight-color-focused: transparent;
}
</style>
