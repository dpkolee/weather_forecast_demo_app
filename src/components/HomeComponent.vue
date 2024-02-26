<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useMemoize } from '@vueuse/core'
import axios from 'axios';
import WeatherDetail from '@/components/WeatherDetail.vue';
import WeatherHighlight from '@/components/WeatherHighlight.vue';
import { toast } from 'vue3-toastify';
import { Icon } from '@iconify/vue';
import type { WeatherResponseType } from '@/types';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import { getAuth } from 'firebase/auth';

const props = defineProps<{
    isUserLoggeddIn: boolean
}>()

const location = ref('')
const weatherData = ref<WeatherResponseType | null>(null);
const isLoading = ref(true)

const getWeatherByLocation = useMemoize(
    async (location: string): Promise<WeatherResponseType> => axios.get(
        `${import.meta.env.VITE_OPEN_WEATHER_BASE_URL}/weather?q=${location}&units=metric&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`)
        .then(({ data }) => data))

const getWeatherByLatLon = useMemoize(
    async (lat: number, lon: number): Promise<WeatherResponseType> => axios.get(
        `${import.meta.env.VITE_OPEN_WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`)
        .then(({ data }) => data))

const search = async (e: KeyboardEvent) => {
    if (e.key == "Enter") {
        try {
            const weatherInfo = await getWeatherByLocation(location.value)
            weatherData.value = weatherInfo
        } catch (err: any) {
            toast.error(err.response.data.message)
        }

    }
}
const handleSearch = async () => {
    try {
        const weatherInfo = await getWeatherByLocation(location.value)
        weatherData.value = weatherInfo
    } catch (err: any) {
        toast.error(err.response.data.message)
    }

}
const loggedInUserId = getAuth().currentUser?.uid
const loggedInUserSavedData = ref()

const saveWeatherDataToFireBase = async () => {
    const filteredWeatherValue = [weatherData.value, ...loggedInUserSavedData.value?.savedWeathers ?? []].filter(
        (elem, index, arr) => index === arr.findIndex((t) => t.id === elem.id)
    );
    try {
        await setDoc(doc(db, "users", `user-${loggedInUserId}`), { savedWeathers: filteredWeatherValue }, {
            merge: true
        });
        toast.success("Weather info added successfully")
    } catch (e) {
        toast.error("Something went wrong please try again")
    }
}

const getLoggedInUserSavedData = async () => {
    const querySnapshot = await getDoc(doc(db, "users", `user-${loggedInUserId}`));
    if (querySnapshot.exists()) {
        loggedInUserSavedData.value = querySnapshot.data()
    }
}

onMounted(() => {
    if (props.isUserLoggeddIn) {
        getLoggedInUserSavedData()
    }

    const options = {
        enableHighAccuracy: true,
        maximumAge: 0
    }
    navigator.geolocation.getCurrentPosition(async (pos: GeolocationPosition) => {
        const crd = pos.coords
        const weatherInfo = await getWeatherByLatLon(crd.latitude, crd.longitude)
        weatherData.value = weatherInfo
        isLoading.value = false

    }, async () => {
        const weatherInfo = await getWeatherByLocation("kathmandu")
        weatherData.value = weatherInfo
        isLoading.value = false
    }, options)
})

</script>
<template>
    <div class="fixed w-full h-full flex justify-center items-center bg" v-if="isLoading">
        <Icon icon="svg-spinners:8-dots-rotate" :style="{ fontSize: '30px' }" />
    </div>
    <main class="pb-10" v-if="!isLoading">
        <div class="w-full max-w-2xl mx-auto">
            <div class="py-5 flex gap-2">
                <input @keyup="search" v-model="location" type="text"
                    class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter Location or city..." />
                <button @click="handleSearch"
                    class="flex items-center text-xs font-semibold text-gray-900 bg-gray-50 py-1 px-2 ring-1 rounded-md ring-gray-900/10 hover:ring-gray-900/20">
                    <Icon icon="ic:round-search" :style="{ fontSize: '20px' }" />
                    <span class="ml-1">Search</span>
                </button>
            </div>
            <div v-if="isUserLoggeddIn" class="flex justify-end pb-2">
                <button @click="saveWeatherDataToFireBase"
                    class="flex items-center text-xs font-semibold text-gray-900 bg-gray-50 p-2 ring-1 rounded-md ring-gray-900/10 hover:ring-gray-900/20">
                    <Icon icon="ic:round-save" :style="{ fontSize: '20px' }" />
                    <span class="ml-1">Save</span>
                </button>
            </div>
        </div>
        <div v-if="weatherData" class="flex flex-col gap-2">
            <WeatherDetail :weather-data="weatherData" />
            <WeatherHighlight :weather-data="weatherData" />
        </div>
    </main>
</template>