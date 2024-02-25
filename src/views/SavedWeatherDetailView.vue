<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue';
import { onMounted, ref } from 'vue';
import { useMemoize } from '@vueuse/core';
import type { WeatherResponseType } from '@/types';
import axios from 'axios';
import { useRouter } from 'vue-router';
import WeatherDetail from '@/components/WeatherDetail.vue';
import WeatherHighlight from '@/components/WeatherHighlight.vue';

const router = useRouter()
const weatherData = ref()
const getWeatherByLatLon = useMemoize(
    async (lat: string, lon: string): Promise<WeatherResponseType> => axios.get(
        `${import.meta.env.VITE_OPEN_WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`)
        .then(({ data }) => data))

onMounted(async () => {
    const lat = router.currentRoute.value.params.lat as string
    const lon = router.currentRoute.value.params.lon as string
    const weatherInfo = await getWeatherByLatLon(lat, lon)
    weatherData.value = weatherInfo
})
</script>
<template>
    <HeaderComponent />
    <main class="w-full max-w-2xl mx-auto py-3">
        <div v-if="weatherData" class="flex flex-col gap-2">
            <WeatherDetail :weather-data="weatherData" />
            <WeatherHighlight :weather-data="weatherData" />
        </div>
    </main>
</template>