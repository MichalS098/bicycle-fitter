<template>
    <swiper :breakpoints="swiperBreakpoints">
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
    310: {
        slidesPerView: 1.7,
        spaceBetween: 20
    },
    320: {
        slidesPerView: 1.9,
        spaceBetween: 20
    },
    350: {
        slidesPerView: 2,
        spaceBetween: 20
    },
    375: {
        slidesPerView: 2.15,
        spaceBetween: 20
    },
    390: {
        slidesPerView: 2.3,
        spaceBetween: 20
    },
    420: {
        slidesPerView: 2.5,
        spaceBetween: 20
    }
};
</script>