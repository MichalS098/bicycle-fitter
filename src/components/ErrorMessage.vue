<template>
    <transition name="fade">
        <p v-if="message !== ''" class="text-red-500 text-sm">
            {{ message }}
        </p>
    </transition>
</template>
<script setup lang="ts">
defineProps({
    message: {
        type: String,
        default: '',
    },
});
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
}
</style>