<template>
    <apexchart class="w-full" type="line" :options="chartOptions" :series="chartSeries"></apexchart>
</template>
<script setup lang="ts">
import { ref } from 'vue'

// chart series of measured angles during bike fit
const chartSeries = ref<any[]>([{
    name: 'Bicep angles',
    data: [0, 0.5, 0.7, 0.9, 1, 0.9, 0.7, 0.5, 0, -0.5, -0.7, -0.9, -1, -0.9, -0.7, -0.5, 0]
}, {
    name: 'Knee angles',
    // faster and phased sinus
    data: [0.6, 0.8, 1, 0.8, 0.6, 0.4, 0.2, 0, -0.2, -0.4, -0.6, -0.8, -1, -0.8, -0.6, -0.4, -0.2]
}])

const chartOptions = ref<any>({
    chart: {
        type: 'line',
        height: 350
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2
    },
    xaxis: {
        categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17']
    },
    yaxis: {
        title: {
            text: 'Angle (°)'
        }
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
            formatter: function (val: number) {
                return val + "°"
            }
        }
    }
})

</script>