<script setup lang="ts">
import AppButton from '../components/AppButton.vue'
import LoanCalculator from '../components/LoanCalculator.vue'
</script>

<template>
  <main>
    <div class="flex pt-4 px-8 pb-20 gap-6 flex-col-reverse md:flex-row">
      <div
        class="flex justify-center items-center py-20 px-10 bg-beige w-full md:w-[43%] rounded-[100px] lg:rounded-[200px] self-stretch"
      >
        <div
          class="flex flex-col items-center justify-center gap-4 text-accentDark"
        >
          <span class="font-medium">Mini loan</span>
          <h2
            class="text-3xl md:text-4xl lg:text-6xl xl:text-7xl text-center font-bitter italic"
          >
            Take charge of unexpected costs
          </h2>
          <p class="text-center">
            Finance unforeseen expenses with Inbank. A quick and easy
            application process with an instant credit decision.
          </p>
          <a href="#calculator">
            <AppButton variant="cta">Apply now</AppButton>
          </a>
        </div>
      </div>
      <div
        class="w-full md:w-[57%] rounded-[100px] lg:rounded-[200px] overflow-hidden h-auto"
      >
        <img
          src="../assets/home-img.png"
          alt="Home image"
          class="object-cover max-w-full h-full"
        />
      </div>
    </div>
    <LoanCalculator />
  </main>
</template>
