<template>
    <swiper :slides-per-view="2.1" :space-between="10" :breakpoints="swiperBreakpoints">
        <swiper-slide v-for="tip in tips" :key="tip.id">
            <tip-card :tip="tip" />
        </swiper-slide>
    </swiper>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Tip } from '@/entity/Tip';
import TipCard from '@/components/TipCard.vue';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import { PropType } from 'vue';

const props = defineProps({
    tips: {
        type: Array as PropType<Tip[]>,
        required: true
    }
});

const swiperBreakpoints = {
    375: {
        slidesPerView: 2.1,
        spaceBetween: 10
    },
    390: {
        slidesPerView: 2.1,
        spaceBetween: 10
    },
    420: {
        slidesPerView: 2.3,
        spaceBetween: 10
    },
};
</script>