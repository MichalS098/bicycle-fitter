<template>
    <div>
        <input class="rounded-full bg-transparent border-2
                       border-dark-gray text-dark-gray h-[52px] px-5
                       focus:text-secondary focus:border-secondary
                       focus:outline-none focus:ring-0" :type="type" :placeholder="placeholder" :value="input"
            @input="onInput" />
    </div>
</template>
<script setup lang="ts">
import { ref, defineEmits } from 'vue'


const emits = defineEmits(['update:modelValue'])

const props = defineProps({
    type: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
    },
    value: {
        type: String,
        default: ''
    }
})

const input = ref<string>(props.value)

const onInput = (e: Event) => {
    emits('update:modelValue', input.value);
}
</script>