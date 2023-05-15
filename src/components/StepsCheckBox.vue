<template>
    <ion-button expand="block" shape="round" :color="checked ? color : 'medium'" mode="ios" fill="outline" type="button"
        class="radio-wizard-button" @click="toggleSelection">
        {{ label }}
    </ion-button>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => [],
    },
    label: {
        type: String,
        default: '',
    },
    value: {
        type: Object,
        required: true,
    },
    color: {
        type: String,
        default: 'secondary',
    },
});

const emits = defineEmits(['update:modelValue']);

const checked = computed(() => props.modelValue.some(item => (item as { id: string }).id === (props.value as { id: string }).id));

const toggleSelection = () => {
    const updatedValue = [...props.modelValue]; // create a copy of modelValue
    const item = props.value as { id: string; value: boolean | number };

    const itemIndex = updatedValue.findIndex(i => (i as { id: string }).id === item.id);

    if (itemIndex !== -1) {
        updatedValue.splice(itemIndex, 1); // remove the item
    } else {
        updatedValue.push(item); // add the item
    }

    emits('update:modelValue', updatedValue); // update the modelValue
}
/*const toggleSelection = () => {
    emits('update:modelValue', props.value);
}*/

/*const toggleSelection = () => {
    const updatedValue = [...props.modelValue]; // create a copy of modelValue
    const item = props.value as { id: string; value: boolean | number };

    const itemIndex = updatedValue.findIndex(i => (i as { id: string }).id === item.id);

    if (itemIndex !== -1) {
        const existingItem = updatedValue[itemIndex] as { [key: string]: boolean | number };

        if (typeof existingItem.value === 'boolean' && typeof item.value === 'boolean') {
            existingItem.value = existingItem.value === item.value ? !item.value : item.value;
        } else if (typeof existingItem.value === 'number' && typeof item.value === 'number') {
            existingItem.value = existingItem.value === item.value ? (item.value === 0 ? 1 : 0) : item.value;
        }

        updatedValue[itemIndex] = existingItem;
    }

    emits('update:modelValue', updatedValue);
}*/

/*const toggleSelection = () => {
    emits('update:modelValue', props.value);
}*/
</script>

<style>
.radio-wizard-button {
    --border-width: 2px;
    font-weight: 600;
}
</style>

