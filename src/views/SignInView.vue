<script setup lang="ts">
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify';
import { Icon } from '@iconify/vue';

const router = useRouter()

const isSubmitting = ref(false)
const formData = ref({
    email: '',
    password: ''
})
const auth = getAuth()
const signIn = () => {
    isSubmitting.value = true
    signInWithEmailAndPassword(auth, formData.value.email, formData.value.password)
        .then(() => {
            isSubmitting.value = false
            router.push('/')
        })
        .catch(error => {
            isSubmitting.value = false
            const errorMessage = error.code.split("/")[1].replaceAll("-", ' ')
            toast.error(errorMessage)
        });
}
</script>

<template>
    <main class="min-h-screen bg-gray-100 text-gray-900 flex justify-center items-center">
        <div class="max-w-md bg-white shadow sm:rounded-lg flex-1 py-10 px-5">
            <img @click="() => router.push('/')" src="https://www.svgrepo.com/show/433968/weather.svg"
                class="h-20 mx-auto cursor-pointer" />
            <div class="mt-10 flex flex-col items-center">
                <h1 class="text-2xl xl:text-3xl font-extrabold">
                    Sign In
                </h1>
                <div class="w-full flex-1 mt-5">
                    <div class="flex justify-center mb-10">
                        <p class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium">
                            Use your credentials to continue
                        </p>
                    </div>
                    <form @submit.prevent="signIn" class="mx-auto max-w-xs">
                        <input :disabled="isSubmitting"
                            class="w-full px-5 py-4 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="email" placeholder="Email" v-model="formData.email" required autocomplete="username" />
                        <input :disabled="isSubmitting"
                            class="w-full px-5 py-4 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                            type="password" placeholder="Password" v-model="formData.password" required
                            autocomplete="current-password" />
                        <button type="submit" :disabled="isSubmitting"
                            class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                            :class="{ 'bg-gray-500': isSubmitting }">
                            <Icon icon="svg-spinners:8-dots-rotate" :style="{ fontSize: '25px' }" v-if="isSubmitting" />
                            <Icon icon="ic:round-login" :style="{ fontSize: '25px' }" v-if="!isSubmitting" />
                            <span class="ml-3">
                                Sign In
                            </span>
                        </button>
                    </form>
                    <div class="flex justify-center mt-5">
                        <p class="text-xs">Don't have an account ?</p><router-link to="/sign-up"
                            class="underline text-indigo-700 ml-1 text-xs"> Sign Up
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
