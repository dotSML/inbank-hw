<script setup lang="ts">
import AppButton from './AppButton.vue'
import { formatMoney } from '@/helpers/format-money.helper'

const props = defineProps<{
  data: {
    applicantFirstName: string
    applicantLastName: string
    applicantPhone: string
    applicantEmail: string
    applicantMonthlyIncome: number
    loanAmount: number
    loanTerm: number
    monthlyPayment: number
    approved: boolean
  }
}>()
</script>

<template>
  <div
    v-if="data.approved"
    class="flex flex-col items-center justify-center w-full lg:py-28 lg:px-24 lg:pr-20"
  >
    <div class="flex flex-col items-center justify-center gap-2 w-full">
      <h1 class="text-3xl font-bitter">Good news!</h1>

      <p class="text-center mb-10">Your loan has been approved.</p>

      <div class="flex flex-col justify-center w-full mb-10">
        <div
          class="flex items-center border-accentDark border-t border-opacity-15 grow w-full py-4"
        >
          <p class="font-medium basis-[50%]">Loan amount</p>
          <p>{{ formatMoney(props.data.loanAmount) }} €</p>
        </div>
        <div
          class="flex items-center border-accentDark border-t border-opacity-15 grow w-full py-4"
        >
          <p class="font-medium basis-[50%]">Loan period</p>
          <p>{{ props.data.loanTerm }} months</p>
        </div>
        <div
          class="flex items-center border-accentDark border-y border-opacity-15 grow w-full py-4"
        >
          <p class="font-medium basis-[50%]">Monthly payment</p>
          <p>{{ formatMoney(props.data.monthlyPayment) }} €</p>
        </div>
      </div>
      <a href="/">
        <AppButton :full-width="true">Back to home page</AppButton>
      </a>
    </div>
  </div>
  <div
    v-else
    class="flex flex-col items-center justify-center md:py-28 w-full md:w-8/12 gap-8"
  >
    <div class="flex flex-col items-center justify-center gap-2 w-full">
      <h1 class="text-3xl font-bitter">
        Dear {{ props.data.applicantFirstName }}
      </h1>
      <p class="text-center">Unfortunately, your loan was denied.</p>
    </div>
    <div>
      <div
        class="border-accentDark border-y border-opacity-15 grow w-full py-4"
      >
        <p class="opacity-75 text-center">
          In addition to your income and expenses, a number of other factors
          play a role in loan decisions.
        </p>
      </div>
    </div>
    <a class="max-w-[300px] w-full" href="/">
      <AppButton :full-width="true">Exit</AppButton>
    </a>
  </div>
</template>
