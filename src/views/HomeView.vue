<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main>
    <nav>
      <router-link to="/"> Home </router-link> |
      <router-link to="/sign-up"> Sign Up </router-link> |
      <router-link to="/sign-in"> Login </router-link> |
    </nav>
    <p class="text-2xl xl:text-3xl font-extrabold">This is a Homepage</p>
    <router-view />
  </main>
</template>
