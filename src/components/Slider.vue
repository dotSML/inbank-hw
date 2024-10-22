<template>
  <div class="flex flex-col w-full">
    <div class="slideContainer">
      <input
        type="range"
        v-model="sliderValue"
        :min="min"
        :max="max"
        :step="step"
        @input="updateValue"
        class="slider"
        ref="slider"
        :style="{ background: sliderBackground }"
      />
      <div
        class="custom-thumb"
        :style="thumbPosition"
        @mousedown="startDrag"
        @touchstart="startDrag"
        ref="thumb"
      >
        <div class="custom-thumb-images flex justify-center items-center gap-1">
          <img src="../assets/arrow-left.svg" alt="Arrow left" />
          <img
            src="../assets/arrow-left.svg"
            alt="Arrow right"
            class="rotate-180"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-between">
      <p class="text-accentDark opacity-60 text-sm">{{ `${min} ${affix}` }}</p>
      <p class="text-accentDark opacity-60 text-sm">
        {{ `${maxFormatted || max} ${affix}` }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.slideContainer {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  height: 52px;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  background: #e9e9e9; /* Grey */
  outline: none;
  border-radius: 4px;
  position: relative;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.slider::-moz-range-thumb {
  -moz-appearance: none;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.custom-thumb {
  position: absolute;
  display: flex;
  align-items: center;
  min-height: 36px;
  max-height: 36px;
  min-width: 52px;
  max-width: 52px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #aa93ff;
  padding: 13px 16px;
  border-radius: 100px;
  cursor: pointer;
}

.custom-thumb-images img {
  min-height: 10px;
  min-width: 8px;
}
</style>

<script lang="ts">
export default {
  name: 'CustomSlider',
  props: {
    modelValue: {
      type: [Number, String],
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    value: {
      type: Number,
      default: undefined,
    },
    affix: {
      type: String,
      default: '',
    },
    maxFormatted: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      sliderValue: this.modelValue || this.min,
      isDragging: false,
      sliderTrackWidth: 0,
      thumbWidth: 0,
      resizeObserver: null,
    }
  },
  computed: {
    thumbPosition() {
      const percentage = (this.sliderValue - this.min) / (this.max - this.min)
      const leftPx =
        percentage * (this.sliderTrackWidth - this.thumbWidth) +
        this.thumbWidth / 2
      return {
        left: `${leftPx}px`,
        transform: 'translate(-50%, -50%)',
      }
    },

    sliderBackground() {
      const percentage =
        ((this.sliderValue - this.min) / (this.max - this.min)) * 100
      return `linear-gradient(to right, #21093A 0%, #21093A ${percentage}%, #e9e9e9 ${percentage}%, #e9e9e9 100%)`
    },
  },
  emits: ['update:modelValue'],
  methods: {
    updateValue() {
      this.$emit('update:modelValue', this.sliderValue)
    },
    startDrag(event) {
      event.preventDefault()
      this.isDragging = true
      document.addEventListener('mousemove', this.handleDrag)
      document.addEventListener('mouseup', this.stopDrag)
      document.addEventListener('touchmove', this.handleDrag)
      document.addEventListener('touchend', this.stopDrag)
    },
    handleDrag(event) {
      if (!this.isDragging) return
      let clientX = event.clientX
      if (event.touches && event.touches.length > 0) {
        clientX = event.touches[0].clientX
      }
      const slider = this.$refs.slider
      const rect = slider.getBoundingClientRect()
      const offsetX = clientX - rect.left
      let percentage = offsetX / rect.width
      percentage = Math.min(Math.max(percentage, 0), 1)

      let newValue = this.min + percentage * (this.max - this.min)

      newValue =
        this.min + Math.round((newValue - this.min) / this.step) * this.step

      newValue = Math.min(Math.max(newValue, this.min), this.max)

      this.sliderValue = newValue
      this.updateValue()
    },
    stopDrag() {
      this.isDragging = false
      document.removeEventListener('mousemove', this.handleDrag)
      document.removeEventListener('mouseup', this.stopDrag)
      document.removeEventListener('touchmove', this.handleDrag)
      document.removeEventListener('touchend', this.stopDrag)
    },
    updateSliderTrackWidth() {
      this.$nextTick(() => {
        const slider = this.$refs.slider
        if (slider) {
          this.sliderTrackWidth = slider.offsetWidth + 1 // weird bug fix
        }
        const thumb = this.$refs.thumb
        if (thumb) {
          const style = window.getComputedStyle(thumb)
          this.thumbWidth =
            thumb.offsetWidth +
            parseFloat(style.marginLeft) +
            parseFloat(style.marginRight)
        }
      })
    },
  },
  mounted() {
    this.updateSliderTrackWidth()

    this.resizeObserver = new ResizeObserver(() => {
      this.updateSliderTrackWidth()
    })

    if (this.$refs.slider) {
      this.resizeObserver.observe(this.$refs.slider)
    }
  },
  beforeUnmount() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
    }
  },
  watch: {
    modelValue(newValue) {
      if (Number(newValue) < Number(this.min)) {
        this.sliderValue = this.min
      } else if (Number(newValue) > Number(this.max)) {
        this.sliderValue = this.max
      } else {
        this.sliderValue = newValue
      }
    },
  },
}
</script>
