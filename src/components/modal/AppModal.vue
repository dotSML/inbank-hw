<template>
  <div
    v-if="modal?.isOpen"
    class="fixed inset-0 flex items-end md:items-center justify-center z-50"
  >
    <div
      class="absolute inset-0 bg-black opacity-50"
      @click="modal?.close"
    ></div>
    <div
      class="bg-white shadow-lg z-10 rounded-tl-3xl rounded-tr-3xl w-screen md:w-[33.75rem] md:rounded-3xl"
    >
      <component :is="modal?.content"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ModalState } from '@/services/modal.service'
import { inject } from 'vue'

const modal = inject<ModalState>('modal')
</script>
