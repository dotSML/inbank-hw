<script lang="ts">
export default {
  name: 'SelectInputField',
  props: {
    modelValue: {
      type: [String, Number],
      required: true,
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
    options: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  methods: {
    handleInput(event) {
      this.$emit('update:modelValue', event.target.value)
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
  <div class="flex relative min-w-0 w-full">
    <label for="input" :class="`${className} fieldLabel`">{{ label }}</label>
    <select
      @change="handleInput"
      class="field"
      :placeholder="placeholder"
      :value="modelValue"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style>
.field {
  width: 100%;
  appearance: none;
  min-width: 0;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #60378b;
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
}
</style>
