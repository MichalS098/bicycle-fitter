<template>
    <div>
        <input
            class="rounded-full bg-transparent border-2 border-dark-gray text-dark-gray h-[52px] px-5 focus:text-secondary focus:border-secondary focus:outline-none focus:ring-0"
            :type="type" :placeholder="placeholder" @input="onInput" :value="content" />
    </div>
</template>
<script setup lang="ts">
import { ref, defineEmits } from 'vue'

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
})

const content = ref<string | number>(props.modelValue)

const onInput = (e: Event) => {
    content.value = (e.target as HTMLInputElement).value
    emits('update:modelValue', content.value)
}
</script>