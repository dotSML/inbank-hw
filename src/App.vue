<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header class="flex py-4 px-8">
    <img class="w-32" src="./assets/logo.svg" alt="InBank logo" />
  </header>

  <RouterView />
</template>
