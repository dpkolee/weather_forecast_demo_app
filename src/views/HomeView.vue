<script setup lang="ts">
import { getAuth, onAuthStateChanged, type Auth } from 'firebase/auth';
import { onMounted, ref } from 'vue';
import HomeComponent from '@/components/HomeComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

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
</script>

<template>
  <div class="bg-white">
    <HeaderComponent />
    <HomeComponent :is-user-loggedd-in="isUserLoggeddIn" />
  </div>
</template>
