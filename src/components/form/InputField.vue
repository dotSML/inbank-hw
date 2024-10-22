<script lang="ts">
export default {
  name: 'InputField',
  props: {
    modelValue: {
      type: [String, Number],
      required: true,
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
    affix: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      inputValue: this.modelValue,
    }
  },
  methods: {
    handleInput(event) {
      this.inputValue = event.target.value
      this.$emit('update:modelValue', this.inputValue)
    },
  },
  watch: {
    modelValue(newValue) {
      this.inputValue = newValue
    },
  },
}
</script>

<template>
  <div class="flex relative min-w-0">
    <label for="input" :class="`${className} fieldLabel`">{{ label }}</label>
    <div class="input-wrapper">
      <input
        class="field"
        :value="inputValue"
        :type="type"
        :placeholder="placeholder"
        @input="handleInput"
      />
      <span v-if="affix" class="affix">{{ affix }}</span>
    </div>
    <p v-if="errorMessage" class="text-red-500 text-xs mt-1">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>
.field {
  appearance: none;
  min-width: 0;
  border-radius: 8px;
  padding: 10px;
  padding-right: 40px; /* Add padding to the right to make space for the affix */
  background-color: #fff;
  border: 1px solid #60378b;
  width: 100%;
  box-sizing: border-box;
}
.field.input[type='number']::-webkit-outer-spin-button,
.field.input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.field.input[type='number'] {
  -moz-appearance: textfield;
}

.fieldLabel {
  position: absolute;
  transform: translateY(-50%);
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  left: 8px;
  background: #fff;
  border-radius: 12px 12px 0 0;
  color: #60378b;
  z-index: 1000;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.affix {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
  pointer-events: none;
}
</style>
