<script setup lang="ts">
import { getAuth, onAuthStateChanged, signOut, type Auth } from 'firebase/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue';

const router = useRouter()

const isUserLoggeddIn = ref(false)
let auth: Auth;
onMounted(async () => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isUserLoggeddIn.value = true
    } else {
      isUserLoggeddIn.value = false
    }
  })
})

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/")
  })
}

const currentPath = router.currentRoute.value.path

</script>
<template>
  <header class="sticky top-0 z-100 bg-white border-b">
    <nav class="flex items-center justify-between p-2">
      <div class="flex flex-1">
        <a href="/">
          <img src="https://www.svgrepo.com/show/433968/weather.svg" alt="logo" class="h-10 cursor-pointer" />
        </a>
      </div>
      <div class="flex flex-1 justify-end">
        <div class="flex gap-2">
          <button @click="() => router.push('/sign-in')" v-if="!isUserLoggeddIn"
            class="flex items-center justify-center text-xs font-semibold text-gray-900 bg-gray-50 p-2 ring-1 rounded-md ring-gray-900/10 hover:ring-gray-900/20">
            <Icon icon="ic:round-login" :style="{ fontSize: '20px' }" />
            <span class="ml-1">
              Sign In
            </span>
          </button>
          <button @click="handleSignOut" v-if="isUserLoggeddIn"
            class="flex items-center justify-center text-xs font-semibold text-white bg-red-500 p-2 ring-1 rounded-md ring-gray-50 hover:ring-gray-900/20">
            <Icon icon="ic:round-logout" :style="{ fontSize: '20px' }" />
            <span class="ml-1">Sign Out</span>
          </button>
          <button @click="() => router.push('/profile')"
            v-if="isUserLoggeddIn && currentPath === '/' || currentPath.includes('/profile/')"
            class="flex items-center text-xs font-semibold text-gray-900 bg-gray-50 p-2 ring-1 rounded-md ring-gray-900/10 hover:ring-gray-900/20">
            <Icon icon="ic:baseline-person-pin" :style="{ fontSize: '20px' }" />
            <span class="ml-1">Profile</span>
          </button>
          <button @click="() => router.push('/')" v-if="isUserLoggeddIn && currentPath === '/profile'"
            class="flex items-center text-xs font-semibold text-gray-900 bg-gray-50 p-2 ring-1 rounded-md ring-gray-900/10 hover:ring-gray-900/20">
            <Icon icon="ic:round-home" :style="{ fontSize: '20px' }" />
            <span class="ml-1">Home</span>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>