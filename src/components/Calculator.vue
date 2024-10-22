<script setup lang="ts">
import InputField from './form/InputField.vue'
import SelectInputField from './form/SelectInputField.vue'
import Slider from './Slider.vue'
import VerticalDivider from './VerticalDivider.vue'
import { ref } from 'vue'

const minAmount = 300
const maxAmount = 7200

const minMonths = 2
const maxMonths = 72

const amountValue = ref(minAmount)
const monthsValue = ref(minMonths)

const getMonthsOptions = () => {
  const options = []
  for (let i = minMonths; i <= maxMonths; i++) {
    options.push({ value: i, label: `${i} months` })
  }
  return options
}
</script>

<template>
  <div class="flex flex-col md:flex-row bg-violet px-10 py-20">
    <div class="flex flex-col p-10 w-1/2">
      <h2
        class="font-bitter text-subheading color-darkAccent text-center italic leading-[4.5rem] px-16 py-4 md:text-6xl xl:text-7xl"
      >
        Calculate your monthly payment
      </h2>
      <p class="text-center">
        Estimate your monthly payments based on the chosen loan amount and time
        period.
      </p>
    </div>
    <VerticalDivider />
    <div
      class="flex basis-[50%] w-full items-center justify-center py-20 px-10"
    >
      <div class="flex flex-col w-full gap-6">
        <div class="flex justify-center items-center gap-6">
          <div class="flex min-w-[70%]">
            <Slider
              v-model="amountValue"
              :min="minAmount"
              :max="maxAmount"
              :step="100"
              maxFormatted="7,200"
              affix="€"
            />
          </div>
          <div class="flex w-[30%]">
            <InputField
              v-model="amountValue"
              type="number"
              label="Amount"
              affix="EUR"
            />
          </div>
        </div>
        <div class="flex justify-center items-center gap-6">
          <div class="flex min-w-[70%]">
            <Slider
              v-model="monthsValue"
              :min="minMonths"
              :max="maxMonths"
              :step="1"
              affix="months"
            />
          </div>
          <div class="flex w-full">
            <SelectInputField
              v-model="monthsValue"
              label="Period"
              :options="getMonthsOptions()"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
