<template>
  <div class="p-6 md:p-10">
    <div class="flex w-full justify-between">
      <h1 class="text-xl mb-4 text-accentDark font-medium">Personal details</h1>
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
        v-model="formFields.firstName.value"
        v-model:validation-error="formFields.firstName.validationError"
        variant="secondary"
        type="text"
        placeholder="First name"
        :required="formFields.firstName.required"
      />
      <InputField
        v-model="formFields.lastName.value"
        v-model:validation-error="formFields.lastName.validationError"
        type="text"
        variant="secondary"
        placeholder="Last name"
        :required="formFields.lastName.required"
      />
      <InputField
        v-model="formFields.phone.value"
        v-model:validation-error="formFields.phone.validationError"
        type="tel"
        variant="secondary"
        :required="formFields.phone.required"
        :validate="formFields.phone.validate"
        placeholder="Mobile number"
      />
      <InputField
        v-model="formFields.email.value"
        v-model:validation-error="formFields.email.validationError"
        type="email"
        :required="formFields.email.required"
        :validate="formFields.email.validate"
        variant="secondary"
        placeholder="Email"
      />

      <InputField
        v-model="formFields.monthlyIncome.value"
        v-model:validation-error="formFields.monthlyIncome.validationError"
        type="number"
        :min="0"
        placeholder="Monthly income"
        variant="secondary"
        :validate="formFields.monthlyIncome.validate"
        :required="formFields.monthlyIncome.required"
      />
    </div>
    <AppButton
      :handleClick="handleSubmit"
      :disabled="loanStore.isProcessing"
      :fullWidth="true"
      >{{ `${loanStore.isProcessing ? 'Loading...' : 'Submit'}` }}</AppButton
    >
  </div>
</template>

<script setup lang="ts">
import type { ModalState } from '@/services/modal.service'
import { inject } from 'vue'
import InputField from '../form/InputField.vue'
import AppButton from '../AppButton.vue'
import { useLoanStore } from '@/stores/loan.store'
import { processLoanApplication } from '@/services/loan.service'
import { useRouter } from 'vue-router'
import { useForm } from '../form/useForm'
import Decimal from 'decimal.js'

const modal = inject<ModalState>('modal')
const loanStore = useLoanStore()
const router = useRouter()

const fields = {
  firstName: {
    value: '',
    validationError: '',
    required: true,
  },
  lastName: {
    value: '',
    validationError: '',
    required: true,
  },
  phone: {
    value: '',
    validationError: '',
    required: true,
    validate: (val: string) => {
      if (val.length !== 7 && val.length !== 8) {
        return 'Mobile number must be 7 or 8 digits long'
      }
      if (!val.startsWith('55')) {
        return 'Mobile number should start with 55'
      }
    },
  },
  email: {
    value: '',
    validationError: '',
    required: true,
    validate: (val: string) => {
      if (!val.includes('@')) {
        return 'Email must contain @'
      }
    },
  },
  monthlyIncome: {
    value: '',
    validationError: '',
    required: true,
    validate: (val: string) => {
      if (new Decimal(val).lessThan(100)) {
        return 'Monthly income must be at least 100'
      }
    },
  },
}

const { formFields, hasValidationErrors, validateForm } = useForm(fields)

const handleSubmit = async () => {
  validateForm()

  if (hasValidationErrors.value) {
    console.log('Form has validation errors:', formFields.value)
  } else {
    console.log('Form is valid:', formFields.value)
    loanStore.saveApplicantInfo({
      applicantFirstName: formFields.value.firstName.value,
      applicantLastName: formFields.value.lastName.value,
      applicantPhone: formFields.value.phone.value,
      applicantEmail: formFields.value.email.value,
      applicantMonthlyIncome: Number(formFields.value.monthlyIncome.value),
    })

    await requestLoan()
  }
}

const requestLoan = async () => {
  loanStore.setIsProcessing(true)
  const applicationOutcome = (await processLoanApplication(
    loanStore.$state,
  )) as boolean

  loanStore.setApprovalStatus(applicationOutcome)
  loanStore.setIsProcessing(false)

  modal?.close()
  router.push(applicationOutcome ? '/positive-decision' : '/negative-decision')
}
</script>
