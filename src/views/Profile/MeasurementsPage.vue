<template>
    <bikefitter-page title="Measures" :without-title="true" :without-tab-bar="true" :background-color="'secondary'">
        <div>
            <ion-buttons slot="start">
                <ion-back-button default-href="/pages/tips" color="light"></ion-back-button>
            </ion-buttons>

            <div class="pt-3">
                <h1 class="fitter-h1">
                    Measures
                </h1>
            </div>

            <ion-card color="secondary">
                <ion-card-header>
                    <ion-card-title>General</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-list lines="none" :inset="false">
                        <ion-item color="secondary">
                            <ion-chip class="font-bold text-base" id="shoeSize">
                                Shoe Size: {{ user?.shoeSize }} {{ user?.unitSystem === 'metric' ? 'cm' : 'in' }}
                            </ion-chip>
                            <ion-alert trigger="shoeSize" header="Enter your shoe size"
                                message="Shoe size is the length of your foot" :buttons="userButtons"
                                :inputs="userInputs.shoeSize">
                            </ion-alert>
                        </ion-item>

                        <ion-item color="secondary">
                            <ion-chip class="font-bold text-base" id="shoulderHeight">
                                Shoulder Height: {{ user?.shoulderHeight }} {{ user?.unitSystem === 'metric' ? 'cm' : 'in'
                                }}
                            </ion-chip>
                            <ion-alert trigger="shoulderHeight" header="Enter your shoulder height"
                                message="Shoulder height is the distance from the top of your hip to the top of your shoulder"
                                :buttons="userButtons" :inputs="userInputs.shoulderHeight">
                            </ion-alert>
                        </ion-item>
                        <ion-item color="secondary">
                            <ion-chip class="font-bold text-base" id="overallHeight">
                                Overall Height: {{ user?.overallHeight }} {{ user?.unitSystem === 'metric' ? 'cm' : 'in' }}
                            </ion-chip>
                            <ion-alert trigger="overallHeight" header="Enter your overall height"
                                message="Overall height is the distance from the bottom of your foot to the top of your head"
                                :buttons="userButtons" :inputs="userInputs.overallHeight">
                            </ion-alert>
                        </ion-item>
                    </ion-list>
                </ion-card-content>
            </ion-card>

            <ion-card color="secondary">
                <ion-card-header>
                    <ion-card-title>Leg</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-list lines="none" :inset="false">
                        <ion-item color="secondary">
                            <ion-chip class="font-bold text-base" id="shankLength">
                                Shank Length: {{ user?.shankLength }} {{ user?.unitSystem === 'metric' ? 'cm' : 'in' }}
                            </ion-chip>
                            <ion-alert trigger="shankLength" header="Enter your shank length"
                                message="Shank length is the distance from the bottom of your foot to the top of your knee cap"
                                :buttons="userButtons" :inputs="userInputs.shankLength">
                            </ion-alert>
                        </ion-item>
                        <ion-item color="secondary">
                            <ion-chip class="font-bold text-base" id="thighLength">
                                Thigh Length: {{ user?.thighLength }} {{ user?.unitSystem === 'metric' ? 'cm' : 'in' }}
                            </ion-chip>
                            <ion-alert trigger="thighLength" header="Enter your thigh length"
                                message="Thigh length is the distance from the top of your knee cap to the top of your hip"
                                :buttons="userButtons" :inputs="userInputs.thighLength">
                            </ion-alert>
                        </ion-item>
                        <ion-item color="secondary">
                            <ion-chip class="font-bold text-base" id="inseamLength">
                                Inseam Length: {{ user?.inseamLength }} {{ user?.unitSystem === 'metric' ? 'cm' : 'in' }}
                            </ion-chip>
                            <ion-alert trigger="inseamLength" header="Enter your inseam length"
                                message="Inseam length is the distance from the bottom of your foot to the top of your hip measured along the inside of your leg"
                                :buttons="userButtons" :inputs="userInputs.inseamLength">
                            </ion-alert>
                        </ion-item>
                    </ion-list>
                </ion-card-content>
            </ion-card>

            <ion-card color="secondary">
                <ion-card-header>
                    <ion-card-title>Arm</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-list lines="none" :inset="false">
                        <ion-item color="secondary">
                            <ion-chip class="font-bold text-base" id="armLength">
                                Arm Length: {{ user?.armLength }} {{ user?.unitSystem === 'metric' ? 'cm' : 'in' }}
                            </ion-chip>
                            <ion-alert trigger="armLength" header="Enter your arm length"
                                message="Arm length is the distance from the top of your shoulder to the tip of your middle finger"
                                :buttons="userButtons" :inputs="userInputs.armLength">
                            </ion-alert>
                        </ion-item>
                    </ion-list>
                </ion-card-content>
            </ion-card>


            <ion-button expand="block" color="light" @click="saveChanges" class="mt-6">
                Save
            </ion-button>
            <ion-toast position="top" :is-open="savingSuccess" message="Your changes have been saved" :duration="3000"
                @didDismiss="savingSuccess = false"></ion-toast>
        </div>
    </bikefitter-page>
</template>
  
<script setup lang="ts">
import {
    IonButtons, IonBackButton, IonButton, IonToast, IonAlert, IonChip, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem
} from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { getUserFromDatabase } from '@/helpers/helpersDataBase';
import { User } from '@/entity/User';
import BikefitterPage from '@/components/BikefitterPage.vue';

const user = ref<User>();
const savingSuccess = ref(false);

const userButtons = [
    {
        text: 'Cancel',
        role: 'cancel',
    },
    {
        text: 'Save',
        role: 'confirm',
        handler: (data: any) => {
            const keys = Object.keys(data);
            const values = Object.values(data);
            const keyString = keys[0];
            let valueString = Number(values[0]);

            // validation
            if (valueString < 0) {
                valueString = 0;
            } else if (valueString > 250) {
                valueString = 250;
            }

            updateUserModel(keyString, valueString);
        }
    },
];

const userInputs = {
    shankLength: [
        {
            name: 'shankLength',
            type: 'number',
            placeholder: 'Enter your shank length',
            value: user.value?.shankLength,
            min: 0,
            max: 250,
            step: 0.01,
        }
    ],
    thighLength: [
        {
            name: 'thighLength',
            type: 'number',
            placeholder: 'Enter your thigh length',
            value: user.value?.thighLength,
            min: 0,
            max: 250,
            step: 0.01,
        }
    ],
    shoeSize: [
        {
            name: 'shoeSize',
            type: 'number',
            placeholder: 'Enter your shoe size',
            value: user.value?.shoeSize,
            min: 0,
            max: 250,
            step: 0.01,
        }
    ],
    inseamLength: [
        {
            name: 'inseamLength',
            type: 'number',
            placeholder: 'Enter your inseam length',
            value: user.value?.inseamLength,
            min: 0,
            max: 250,
            step: 0.01,
        }
    ],
    shoulderHeight: [
        {
            name: 'shoulderHeight',
            type: 'number',
            placeholder: 'Enter your shoulder height',
            value: user.value?.shoulderHeight,
            min: 0,
            max: 250,
            step: 0.01,
        }
    ],
    armLength: [
        {
            name: 'armLength',
            type: 'number',
            placeholder: 'Enter your arm length',
            value: user.value?.armLength,
            min: 0,
            max: 250,
            step: 0.01,
        }
    ],
    overallHeight: [
        {
            name: 'overallHeight',
            type: 'number',
            placeholder: 'Enter your overall height',
            value: user.value?.overallHeight,
            min: 0,
            max: 250,
            step: 0.01,
        }
    ],
};

onMounted(async () => {
    user.value = await getUserFromDatabase();
});

const updateUserModel = (key: string, value: any) => {
    (user.value as any)[key] = Number(value);
}

const saveChanges = async () => {
    await user.value?.save();
    savingSuccess.value = true;
}
</script>

<style scoped>
ion-card {
    --background: transparent;
    margin: 0px;
    box-shadow: none;
}

ion-card-content {
    padding-bottom: 0px;
}

ion-list {
    border: none;
    --background: transparent;
    background: transparent;
}
</style>