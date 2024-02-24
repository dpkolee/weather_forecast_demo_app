<script setup lang="ts">
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { RouterLink, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify';

const router = useRouter()

const isSubmitting = ref(false)
const formData = ref({
    email: '',
    password: '',
    confirmPasword: ''
})
const auth = getAuth()

const signUp = () => {
    if (formData.value.password === formData.value.confirmPasword) {
        isSubmitting.value = true
        createUserWithEmailAndPassword(auth, formData.value.email, formData.value.password)
            .then(() => {
                isSubmitting.value = false
                router.push('/')
            })
            .catch(error => {
                isSubmitting.value = false
                const errorMessage = error.code.split("/")[1].replaceAll("-", ' ')
                toast.error(errorMessage)
            });
    } else {
        toast.error("Password did not match. Please try again");
    }

}

</script>

<template>
    <main class="min-h-screen bg-gray-100 text-gray-900 flex justify-center items-center">
        <div class="max-w-md bg-white shadow sm:rounded-lg flex-1 py-10 px-5">
            <img @click="() => router.push('/')" src="https://www.svgrepo.com/show/433968/weather.svg"
                class="h-20 mx-auto cursor-pointer" />
            <div class="mt-10 flex flex-col items-center">
                <h1 class="text-2xl xl:text-3xl font-extrabold">
                    Sign up
                </h1>
                <div class="w-full flex-1 mt-5">
                    <div class="flex justify-center mb-10">
                        <p class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium">
                            Create your account in weather app
                        </p>
                    </div>
                    <form @submit.prevent="signUp" class="mx-auto max-w-xs">
                        <input :disabled="isSubmitting"
                            class="w-full px-5 py-4 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="email" placeholder="Email" v-model="formData.email" required />
                        <input :disabled="isSubmitting"
                            class="w-full px-5 py-4 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                            type="password" placeholder="Password" v-model="formData.password" required />
                        <input :disabled="isSubmitting"
                            class="w-full px-5 py-4 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                            type="password" placeholder="Confirm Password" v-model="formData.confirmPasword" required />
                        <button type="submit" :disabled="isSubmitting"
                            class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                            :class="{ 'bg-gray-500': isSubmitting }">
                            <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span class="ml-3">
                                Sign Up
                            </span>
                        </button>
                    </form>
                    <div class="flex justify-center mt-5">
                        <p class="text-xs">Already have an account ?</p><router-link to="/sign-in"
                            class="underline text-indigo-700 ml-1 text-xs"> Sign In
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>