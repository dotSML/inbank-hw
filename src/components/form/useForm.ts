import { ref, computed } from 'vue'

type ValidatorFunction = (value: string) => string | undefined

interface FormField {
  value: string
  validationError: string
  required?: boolean
  validate?: ValidatorFunction
}

interface FormFields {
  [key: string]: FormField
}

export function useForm(fields: FormFields) {
  const formFields = ref(fields)

  const hasValidationErrors = computed(() => {
    return Object.values(formFields.value).some(
      field => field.validationError && field.validationError.length > 0,
    )
  })

  const validateForm = () => {
    for (const field of Object.values(formFields.value)) {
      field.validationError = ''

      if (field.required && !field.value) {
        field.validationError = 'This field is required'
        continue
      }

      const validator = field.validate
      if (validator) {
        const error = validator(field.value)
        if (error) {
          field.validationError = error
        }
      }
    }
  }

  return {
    formFields,
    hasValidationErrors,
    validateForm,
  }
}
