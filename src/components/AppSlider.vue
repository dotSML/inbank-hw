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

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({
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
  affix: {
    type: String,
    default: '',
  },
  maxFormatted: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const sliderValue = ref(Number(props.modelValue) || props.min)
const isDragging = ref(false)
const sliderTrackWidth = ref(0)
const thumbWidth = ref(0)

const slider = ref(null)
const thumb = ref(null)

const thumbPosition = computed(() => {
  const percentage = (sliderValue.value - props.min) / (props.max - props.min)
  const leftPx =
    percentage * (sliderTrackWidth.value - thumbWidth.value) +
    thumbWidth.value / 2
  return {
    left: `${leftPx}px`,
    transform: 'translate(-50%, -50%)',
  }
})

const sliderBackground = computed(() => {
  const percentage =
    ((sliderValue.value - props.min) / (props.max - props.min)) * 100
  return `linear-gradient(to right, #21093A 0%, #21093A ${percentage}%, #e9e9e9 ${percentage}%, #e9e9e9 100%)`
})

const updateValue = () => {
  emit('update:modelValue', sliderValue.value)
}

const startDrag = (event: MouseEvent | TouchEvent) => {
  event.preventDefault()
  isDragging.value = true
  document.addEventListener('mousemove', handleDrag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', handleDrag)
  document.addEventListener('touchend', stopDrag)
}

const handleDrag = (event: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return

  let clientX = (event as MouseEvent).clientX
  if ('touches' in event && event.touches.length > 0) {
    clientX = event.touches[0].clientX
  }

  const rect = (slider.value as unknown as HTMLElement).getBoundingClientRect()
  const offsetX = clientX - rect.left
  let percentage = offsetX / rect.width
  percentage = Math.min(Math.max(percentage, 0), 1)

  let newValue = props.min + percentage * (props.max - props.min)
  newValue =
    props.min + Math.round((newValue - props.min) / props.step) * props.step
  newValue = Math.min(Math.max(newValue, props.min), props.max)

  sliderValue.value = newValue
  updateValue()
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', handleDrag)
  document.removeEventListener('touchend', stopDrag)
}

const updateSliderTrackWidth = () => {
  nextTick(() => {
    const sliderElement = slider.value as unknown as HTMLElement
    if (sliderElement) {
      sliderTrackWidth.value = sliderElement.offsetWidth + 1 // fix a weird visual bug
    }
    const thumbElement = thumb.value as unknown as HTMLElement
    if (thumbElement) {
      const style = window.getComputedStyle(thumbElement)
      thumbWidth.value =
        thumbElement.offsetWidth +
        parseFloat(style.marginLeft) +
        parseFloat(style.marginRight)
    }
  })
}

watch(
  () => props.modelValue,
  newValue => {
    if (Number(newValue) < props.min) {
      sliderValue.value = props.min
    } else if (Number(newValue) > props.max) {
      sliderValue.value = props.max
    } else {
      sliderValue.value = Number(newValue)
    }
  },
)

onMounted(() => {
  updateSliderTrackWidth()

  const resizeObserver = new ResizeObserver(() => {
    updateSliderTrackWidth()
  })

  if (slider.value) {
    resizeObserver.observe(slider.value)
  }

  onBeforeUnmount(() => {
    resizeObserver.disconnect()
  })
})
</script>
