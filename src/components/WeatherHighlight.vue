<script setup lang="ts">
import type { WeatherResponseType } from '@/types';
import { computed } from 'vue';
import { getTime } from '@/utils';

const props = defineProps<{
    weatherData: WeatherResponseType
}>()

const timezone = computed(() => props.weatherData?.timezone)

const sunriseTime = computed(() => {
    return getTime(props.weatherData?.sys?.sunrise - timezone.value)
})

const sunsetTime = computed(() => {
    return getTime(props.weatherData?.sys?.sunset + timezone.value)
})

</script>
<template>
    <div class="w-full max-w-2xl mx-auto border bg-gray-50 shadow-sm rounded-md py-5 px-3">
        <h1 class="text-sm font-bold">
            Weather Highlights
        </h1>
        <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
            <div class="bg-slate-800 shadow-sm p-4 rounded-md flex flex-col justify-between">
                <p class="text-white text-xs font-medium">
                    Wind
                </p>
                <img src="../assets/icons/wind.svg" class="mt-5 h-auto w-32 mx-auto">
                <div class="flex justify-between items-center my-2">
                    <div class="flex items-baseline">
                        <p class="text-white font-bold text-lg">{{ weatherData.wind.speed }}</p>
                        <p class="text-white text-sm ml-1">m/s</p>
                    </div>
                    <div class="flex items-baseline">
                        <p class="text-white font-bold text-lg">{{ weatherData.wind.deg }}</p>
                        <p class="text-white text-sm ml-1">deg</p>
                    </div>
                </div>
            </div>
            <div class="bg-slate-800 shadow-sm p-4 rounded-md flex flex-col justify-between">
                <p class="text-white text-xm font-medium">
                    Pressure
                </p>
                <img src="../assets/icons/pressure.svg" class="mt-5 mx-auto h-auto w-32">
                <div class="flex justify-center items-center my-2">
                    <div class="flex items-baseline">
                        <p class="text-white font-bold text-lg">{{ weatherData.main.pressure }}</p>
                        <p class="text-white text-sm ml-1">mm</p>
                    </div>
                </div>
            </div>
            <div class="bg-slate-800 shadow-sm p-4 rounded-md flex flex-col justify-between">
                <p class="text-white text-sm font-medium">
                    Sunrise & Sunset
                </p>
                <img src="../assets/icons/sun.svg" class="mt-5 mx-auto h-auto w-32">
                <div class="flex justify-between items-center my-2">
                    <div class="flex flex-col">
                        <p class="font-medium text-md text-yellow-400">Sunrise</p>
                        <p class="text-white font-bold text-xs">{{ sunriseTime }}</p>
                    </div>
                    <div class="flex flex-col">
                        <p class="font-medium text-md text-yellow-400">Sunset</p>
                        <p class="text-white font-bold text-xs">{{ sunsetTime }}</p>
                    </div>
                </div>
            </div>
            <div class="bg-slate-800 shadow-sm p-4 rounded-md flex flex-col justify-between">
                <p class="text-white text-sm font-medium">
                    Temperature
                </p>
                <img src="../assets/icons/temperature.svg" class="mt-5 mx-auto h-auto w-32">
                <div class="flex justify-between items-center my-2">
                    <div class="flex flex-col">
                        <p class="font-medium text-md text-yellow-400">Min</p>
                        <p class="text-white font-bold text-md">{{ weatherData.main.temp_min }}&deg;c</p>
                    </div>
                    <div class="flex flex-col">
                        <p class="font-medium text-md text-yellow-400">Max</p>
                        <p class="text-white font-bold text-md">{{ weatherData.main.temp_max }}&deg;c</p>
                    </div>
                </div>
            </div>
            <div class="bg-slate-800 shadow-sm p-4 rounded-md flex flex-col justify-between">
                <p class="text-white text-sm font-medium">
                    Feels Like
                </p>
                <img src="../assets/icons/feels_like.svg" class="mt-5 mx-auto h-auto w-32">
                <div class="flex justify-center items-center my-2">
                    <div class="flex flex-col items-center">
                        <p class="text-white font-bold text-md">{{ weatherData.main.feels_like }}&deg;c</p>
                        <p class="text-gray-400 text-xs mt-1 text-center">How Hot or cold it really feels like</p>
                    </div>
                </div>
            </div>
            <div class="bg-slate-800 shadow-sm p-4 rounded-md flex flex-col justify-between">
                <p class="text-white text-sm font-medium">
                    Cloudiness
                </p>
                <img src="../assets/icons/clouds.svg" class="mt-5 mx-auto h-auto w-32">
                <div class="flex justify-center items-center my-2">
                    <div class="flex flex-col items-center">
                        <p class="text-white font-bold text-md">{{ weatherData.clouds.all }}%</p>
                        <p class="text-gray-400 text-xs mt-1 text-center">The sky fraction obscured by clouds</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-1 grid grid-cols-1 gap-1 sm:grid-cols-2">
            <div class="bg-slate-800 shadow-sm p-4 rounded-md flex items-center">
                <img src="../assets/icons/compass.svg" class="h-auto min-w-20">
                <div class="flex flex-col items-start gap-3">
                    <div class="flex flex-col items-start">
                        <p class="text-white font-bold text-md">Longitude: {{ weatherData.coord.lon }}</p>
                        <p class="text-gray-400 text-xs mt-1">Longitude measures distance east or west of the prime
                            meridian.
                        </p>
                    </div>
                    <div class="flex flex-col items-start">
                        <p class="text-white font-bold text-md">Latitude: {{ weatherData.coord.lat }}</p>
                        <p class="text-gray-400 text-xs mt-1">Latitude lines start at the equator (0 degrees latitude) and
                            run east and west, parallel to the equator.
                        </p>
                    </div>
                </div>
            </div>
            <div class="bg-slate-800 shadow-sm p-4 rounded-md flex items-center">
                <img src="../assets/icons/humidity.svg" class="h-auto min-w-20">
                <div class="flex flex-col items-start">
                    <p class="text-white font-bold text-md">Humidity: {{ weatherData.main.humidity }}%</p>
                    <p class="text-gray-400 text-xs mt-1">Humidity is the concentration of water vapor present in the air.
                        Water vapor, the gaseous state of water, is generally invisible to the human eye.The same amount of
                        water vapor results in higher relative humidity in cool air than warm air.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>