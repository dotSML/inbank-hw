<script setup lang="ts">
import AppModal from './components/modal/AppModal.vue'
import { useModal } from './services/modal.service'
import { provide } from 'vue'

const modal = useModal()
provide('modal', modal)
</script>

<template>
  <header class="flex py-4 px-8">
    <img class="w-32" src="./assets/logo.svg" alt="InBank logo" />
  </header>
  <RouterView />
  <AppModal />
</template>
