<template>
  <div class="p-6 md:p-10">
    <div class="flex w-full justify-between">
      <h1 class="text-xl mb-4 text-text font-medium">Personal details</h1>
      <img
        src="../../assets/cross.svg"
        @click="modal?.close()"
        class="h-4 w-4 cursor-pointer"
      />
    </div>
    <div
      class="flex flex-col w-full justify-center gap-4 mb-6"
      id="calculatorForm"
    >
      <InputField
        v-model="formData.firstName.value"
        v-model:validation-error="formData.firstName.validationError"
        variant="secondary"
        type="text"
        placeholder="First name"
        :required="true"
      />
      <InputField
        v-model="formData.lastName.value"
        v-model:validation-error="formData.lastName.validationError"
        type="text"
        variant="secondary"
        placeholder="Last name"
        :required="true"
      />
      <InputField
        v-model="formData.mobileNumber.value"
        v-model:validation-error="formData.mobileNumber.validationError"
        type="tel"
        variant="secondary"
        :required="true"
        :validate="
          (val: string) => {
            if (val.length !== 7 && val.length !== 8) {
              return 'Mobile number must be 7 or 8 digits long'
            }

            if (!val.startsWith('55')) {
              return 'Mobile number should start with 55'
            }
          }
        "
        placeholder="Mobile number"
      />
      <InputField
        v-model="formData.email.value"
        v-model:validation-error="formData.email.validationError"
        type="email"
        :required="true"
        :validate="
          (val: string) => {
            if (!val.includes('@')) {
              return 'Email must contain @'
            }
          }
        "
        variant="secondary"
        placeholder="Email"
      />

      <InputField
        v-model="formData.monthlyIncome.value"
        v-model:validation-error="formData.monthlyIncome.validationError"
        type="number"
        :min="100"
        placeholder="Monthly income"
        variant="secondary"
        :required="true"
      />
    </div>
    <AppButton :handleClick="handleSubmit" :fullWidth="true">Submit</AppButton>
  </div>
</template>

<script setup lang="ts">
import type { ModalState } from '@/services/modal.service'
import { computed, inject, shallowRef } from 'vue'
import InputField from '../form/InputField.vue'
import AppButton from '../AppButton.vue'

const modal = inject<ModalState>('modal')

const formData = shallowRef({
  firstName: { value: '', validationError: '' },
  lastName: { value: '', validationError: '' },
  mobileNumber: { value: '', validationError: '' },
  email: { value: '', validationError: '' },
  monthlyIncome: { value: '', validationError: '' },
})

const hasValidationErrors = computed(() => {
  return Object.values(formData.value).some(
    field => field.validationError && field.validationError.length > 0,
  )
})

const handleSubmit = () => {
  const inputs = document.querySelectorAll('#calculatorForm input')

  inputs.forEach(input => {
    console.log('INPUT - ', input)
    //@ts-expect-error lol
    input.blur()
  })

  console.log('Inputs:', inputs)

  if (hasValidationErrors.value) {
    console.log('Form has validation errors:', formData.value)
  } else {
    console.log('Form is valid:', formData.value)
    // Proceed with form submission
  }
}
</script>
