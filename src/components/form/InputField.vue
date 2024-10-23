<template>
  <div class="flex relative min-w-0">
    <label v-if="!!label" for="input" class="floatingFieldLabel">{{
      label
    }}</label>
    <input
      :class="[
        'field',
        className,
        variant === 'secondary' && !errorMessage ? 'secondaryField' : '',
        errorMessage ? 'error' : '',
      ]"
      :value="inputValue"
      :type="type"
      :placeholder="placeholder"
      :step="step"
      :pattern="type === 'number' || type === 'tel' ? '[0-9]*' : ''"
      :inputmode="type === 'number' || type === 'tel' ? 'numeric' : 'text'"
      @input="handleInput"
      @blur="handleBlur"
    />
    <!-- <p v-if="errorMessage" class="text-red-500 text-xs mt-1">
      {{ errorMessage }}
    </p> -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String],
    required: true,
  },
  validationError: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'primary',
  },
  type: {
    type: String,
    default: 'text',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  className: {
    type: String,
    default: '',
  },
  max: {
    type: Number,
    default: null,
  },
  min: {
    type: Number,
    default: null,
  },
  step: {
    type: Number,
    default: 1,
  },
  validate: {
    type: Function,
    default: null,
  },
  required: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'update:validationError'])

const inputValue = ref(props.modelValue)
const errorMessage = ref(props.validationError)
const touched = ref(false)

watch(
  () => props.modelValue,
  newValue => {
    inputValue.value = newValue
  },
)

watch(
  () => props.validationError,
  newValue => {
    errorMessage.value = newValue
  },
)

const handleBlur = () => {
  touched.value = true
  if (!inputValue.value.trim() && props.required) {
    errorMessage.value = 'This field is required'
    emit('update:validationError', 'This field is required')
  }
}

const handleInput = (event: Event) => {
  let value = (event.target as HTMLInputElement).value

  if (props.validate) {
    const validationError = props.validate(value)
    if (validationError) {
      errorMessage.value = validationError
      emit('update:validationError', validationError)
    } else {
      errorMessage.value = ''
      emit('update:validationError', '')
    }
  } else {
    // Clear any existing validation errors if no validate function is provided
    errorMessage.value = ''
    emit('update:validationError', '')
  }

  if (props.type === 'number') {
    if (props.max !== null && Number(value) > Number(props.max)) {
      value = props.max.toString()
    }
    if (props.min !== null && Number(value) < Number(props.min)) {
      value = props.min.toString()
    }
  }

  inputValue.value = value
  emit('update:modelValue', value)
}
</script>

<style scoped>
.error {
  border: 1px solid #eb5757 !important;
  color: #eb5757 !important;
}

.error::placeholder {
  color: #eb5757 !important;
}

.secondaryField {
  border: 1px solid #dedede !important;
}

.field {
  appearance: none;
  min-width: 0;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #60378b;
  width: 100%;
  box-sizing: border-box;
  -moz-appearance: textfield;
}

.field::-webkit-outer-spin-button,
.field::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.field::placeholder {
  color: '#9C9C9C';
}

.floatingFieldLabel {
  position: absolute;
  transform: translateY(-50%);
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  left: 8px;
  background: #fff;
  border-radius: 12px 12px 0 0;
  color: #60378b;
  z-index: 10;
}
</style>
