<script setup lang="ts">
import { capitalizeFirstLetter } from '@/utils';
import type { WeatherResponseType } from '@/types';
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const props = defineProps<{
    weatherData: WeatherResponseType
}>()

const today = new Date().toLocaleString('en-EN', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })
const router = useRouter()
const path = router.currentRoute.value.path
const src = ref('')
onMounted(() => {
    src.value = `./icons/${props.weatherData?.weather[0].description}.png`
})
</script>
<template>
    <div
        class="w-full max-w-2xl mx-auto border bg-gray-50 shadow-sm rounded-md p-5 flex flex-row justify-between items-start">
        <div>
            <div class="flex items-center">
                <h1 class="text-3xl xl:text-5xl font-extrabold">
                    {{ Math.round(weatherData?.main?.temp ?? 0) }}
                </h1>
                <Icon icon="meteocons:thermometer-celsius" :style="{ fontSize: '80px' }" />
            </div>
            <div class="flex gap-2 items-center mt-1">
                <Icon icon="fluent:my-location-20-filled" :style="{ fontSize: '20px' }" />
                <p class="text-sm">{{ weatherData?.name }}</p>
            </div>
            <div class="flex gap-2 items-center mt-1">
                <Icon icon="fluent:weather-partly-cloudy-day-20-filled" :style="{ fontSize: '20px' }" />
                <p class="text-sm">{{
                    capitalizeFirstLetter(weatherData?.weather[0].description)
                }}</p>
            </div>
            <div class="flex gap-2 items-center mt-1">
                <Icon icon="fluent:calendar-20-filled" :style="{ fontSize: '20px' }" />
                <p class="text-sm">{{ today }}</p>
            </div>
        </div>
        <img :src="src" class="h-auto w-28" alt="weather condition icon" v-if="path === '/'" />
    </div>
</template>