<template>
  <button :class="`rounded-[100px] ${buttonClass}`">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'cta'].includes(value),
    },
  },
  computed: {
    buttonClass() {
      switch (this.variant) {
        case 'primary':
          return 'bg-violetDark text-accentDark font-bold py-2 px-4 rounded'
        case 'cta':
          return 'bg-neutralDark text-accentDark font-bold py-2 px-4 '
      }
    },
  },
}
</script>
