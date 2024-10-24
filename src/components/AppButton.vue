<template>
  <button
    @click="handleClick"
    :class="`rounded-[100px] py-3 px-6 ${buttonClass} ${fullWidth ? 'w-full' : ''}  disabled:bg-greyLighter disabled:text-greyLight disabled:cursor-not-allowed active:bg-violetDarker`"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  handleClick: {
    type: Function as PropType<(event: MouseEvent) => void>,
    default: () => {},
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const buttonClass = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-violetDark text-accentDark text-md py-2 px-4 rounded'
    case 'cta':
      return 'bg-neutralDark text-accentDark text-md py-2 px-4 '
    case 'cta-violet':
      return 'bg-violetDark text-accentDark text-md py-2 px-4 '
    default:
      return ''
  }
})
</script>
