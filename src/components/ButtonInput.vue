<template>
    <div
        class="rounded-full overflow-hidden flex w-full items-center justify-between bg-transparent border-2 border-dark-gray h-[52px] focus:text-secondary focus:border-secondary focus:outline-none focus:ring-0">
        <input
            class="px-5 w-full rounded-full h-full text-dark-gray focus:outline-none focus:ring-0 bg-transparent border-0"
            :type="type" :placeholder="placeholder" @input="onInput" :value="content" :inputmode="inputMode" :max="max"
            :min="min">
        <span class="flex items-center justify-center text-lg w-fit text-dark-gray shrink-0 px-3 h-full">{{ postfix
        }}</span>
    </div>
</template>
<script setup lang="ts">
import { ref, defineEmits, onUpdated } from 'vue'

const emits = defineEmits(['update:modelValue'])

const props = defineProps({
    modelValue: null,
    type: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
    },
    inputMode: null,
    postfix: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: 'secondary'
    },
    max: {
        type: Number,
        default: 100
    },
    min: {
        type: Number,
        default: 0
    },
})


const content = ref<string | number>(props.modelValue)
onUpdated(() => {
    content.value = props.modelValue
})

const onInput = (e: Event) => {
    content.value = (e.target as HTMLInputElement).value
    emits('update:modelValue', content.value)
}
</script>