<script setup lang="ts">
import Slider from './Slider.vue'
import VerticalDivider from './VerticalDivider.vue'
const model = defineModel()
console.log(model)
</script>

<template>
  <div class="flex flex-col md:flex-row bg-violet px-10 py-20">
    <div class="flex flex-col p-10 w-1/2">
      <h2
        class="font-bitter text-subheading color-darkAccent text-center italic leading-[4.5rem] px-16 py-4 md:text-6xl xl:text-7xl"
      >
        Calculate your monthly payment
      </h2>
      <p class="text-center">
        Estimate your monthly payments based on the chosen loan amount and time
        period.
      </p>
    </div>
    <VerticalDivider />
    <div class="flex w-1/2">
      Calculator part

      <div style="width: 500px">
        <Slider
          @onValue="console.log($event)"
          :min="300"
          :max="7200"
          :step="500"
        />
      </div>
    </div>
  </div>
</template>
