<script setup lang="ts">
import { useLoanStore } from '@/stores/loan.store'
import DecisionResult from '../components/DecisionResult.vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const loanStore = useLoanStore()
const router = useRouter()

onMounted(() => {
  if (!loanStore.applicantFirstName) {
    router.push('/')
  }
})
</script>

<template>
  <div class="flex items-center justify-center text-accentDark md:p-10 w-full">
    <div class="negBox">
      <DecisionResult :data="loanStore" />
    </div>
  </div>
</template>

<style scoped>
.negBox {
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 40px 0px #0000000a;
  border-radius: 20px;

  @media screen and (max-width: 1024px) {
    padding: 40px;
  }

  @media screen and (max-width: 768px) {
    min-height: 100vh;
    align-items: flex-start;
  }

  @media screen and (max-width: 640px) {
    padding: 20px 40px;
  }
}
</style>
