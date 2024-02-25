<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue';
import { db } from '@/firebase/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { onMounted, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { capitalizeFirstLetter } from '@/utils';
import { useRouter } from 'vue-router';

const router = useRouter()
const savedWeatherData = ref()
onMounted(async () => {
    const loggedInUserId = getAuth().currentUser?.uid
    const querySnapshot = await getDoc(doc(db, "users", `user-${loggedInUserId}`));
    if (querySnapshot.exists()) {
        savedWeatherData.value = querySnapshot.data()
    }
})

</script>
<template>
    <HeaderComponent />
    <main class="w-full max-w-2xl mx-auto py-3">
        <h1 class="text-md font-bold">
            Saved Locations
        </h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3" v-if="savedWeatherData">
            <div v-for="data in savedWeatherData.savedWeathers"
                @click="() => router.push({ path: `/profile/${data.name}/${data.coord.lat}/${data.coord.lon}` })"
                class="w-full max-w-2xl mx-auto border bg-gray-50 shadow-sm rounded-md p-5 flex flex-col items-start cursor-pointer hover:shadow-md"
                :key="data.id">
                <div class="flex items-center">
                    <h1 class="text-3xl xl:text-5xl font-extrabold">
                        {{ Math.round(data?.main?.temp ?? 0) }}
                    </h1>
                    <Icon icon="meteocons:thermometer-celsius" :style="{ fontSize: '50px' }" />
                </div>
                <div class="flex justify-center w-full">
                    <img :src="`./icons/${data?.weather[0]?.description}.png`" class="h-auto w-28"
                        alt="weather condition icon" />
                </div>
                <div class="flex gap-2 items-center mt-5">
                    <Icon icon="fluent:my-location-20-filled" :style="{ fontSize: '20px' }" />
                    <p class="text-sm">
                        {{ data?.name }}
                    </p>
                </div>
                <div class="flex gap-2 items-center mt-1">
                    <Icon icon="fluent:weather-partly-cloudy-day-20-filled" :style="{ fontSize: '20px' }" />
                    <p class="text-sm">
                        {{
                            capitalizeFirstLetter(data?.weather[0]?.description)
                        }}
                    </p>
                </div>

            </div>
        </div>
    </main>
</template>