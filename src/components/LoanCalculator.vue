<script setup lang="ts">
import InputField from './form/InputField.vue'
import SelectInputField from './form/SelectInputField.vue'
import Slider from './AppSlider.vue'
import Button from './AppButton.vue'
import VerticalDivider from './VerticalDivider.vue'
import { computed, inject, ref } from 'vue'
import Decimal from 'decimal.js'
import CalculatorModalContent from './modal/CalculatorModalContent.vue'
import type { ModalState } from '@/services/modal.service'
import { useLoanStore } from '@/stores/loan.store'

const loanStore = useLoanStore()

const minAmount = 300
const maxAmount = 7200

const minMonths = 2
const maxMonths = 72

const amountValue = ref(minAmount)
const monthsValue = ref(minMonths)

const modal = inject<ModalState>('modal')

const startApplication = () => {
  loanStore.saveLoanInfo({
    loanAmount: amountValue.value,
    loanTerm: monthsValue.value,
    monthlyPayment: new Decimal(monthlyPayment.value || 0).toNumber(),
  })
  modal?.open(CalculatorModalContent)
}

const getMonthsOptions = () => {
  const options = []
  for (let i = minMonths; i <= maxMonths; i++) {
    options.push({ value: i, label: `${i} months` })
  }
  return options
}

const monthlyPayment = computed(() => {
  const amount = amountValue.value
  const months = monthsValue.value

  if (
    new Decimal(amount).lessThan(minAmount) ||
    new Decimal(amount).greaterThan(maxAmount)
  ) {
    return null
  }

  return Decimal.div(amount, months).toFixed(2)
})
</script>

<template>
  <div
    id="calculator"
    class="flex flex-col lg:flex-row bg-violet items-center justify-center px-4 py-10 md:py-0 md:px-10 gap-4 md:gap-0 text-accentDark"
  >
    <div class="flex flex-col w-full basis-[50%] md:p-10 gap-2 md:gap-0">
      <h2
        class="font-bitter color-darkAccent md:text-center italic md:px-16 md:py-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl xl:leading-[4.5rem]"
      >
        Calculate your monthly payment
      </h2>
      <p class="md:text-center text-accentDark">
        Estimate your monthly payments based on the chosen loan amount and time
        period.
      </p>
    </div>
    <VerticalDivider />
    <div
      class="flex basis-[50%] w-full items-center justify-center md:py-20 md:px-10"
    >
      <div class="flex flex-col w-full gap-6">
        <div class="flex w-full justify-between items-center gap-6">
          <div class="flex w-full basis-[70%]">
            <Slider
              v-model="amountValue"
              :min="minAmount"
              :max="maxAmount"
              :step="100"
              maxFormatted="7,200"
              affix="€"
            />
          </div>
          <div class="flex w-full basis-[30%] min-w-28">
            <InputField
              v-model="amountValue"
              type="number"
              label="Amount"
              :min="0"
              :max="maxAmount"
            />
          </div>
        </div>

        <div class="flex justify-center items-center gap-6">
          <div class="basis-[70%]">
            <Slider
              v-model="monthsValue"
              :min="minMonths"
              :max="maxMonths"
              :step="1"
              affix="months"
            />
          </div>
          <div class="flex basis-[30%] w-full min-w-28">
            <SelectInputField
              v-model="monthsValue"
              label="Period"
              :options="getMonthsOptions()"
            />
          </div>
        </div>
        <div class="flex flex-col items-center justify-center">
          <h5 class="text-center text-md mb-2">Monthly payment</h5>
          <h2 class="font-bitter text-[34px] md:text-5xl mb-6">
            {{ monthlyPayment ? `${monthlyPayment} €` : '-' }}
          </h2>
          <Button :onclick="startApplication" variant="cta-violet"
            >Apply now</Button
          >
          <p class="text-xs mt-6">
            The calculation is approximate and may differ from the conditions
            offered to you. Please submit a loan application to receive a
            personal offer. Financial services are provided by AS Inbank
            Finance.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
