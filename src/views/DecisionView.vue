<script setup lang="ts">
import { shallowRef } from 'vue'
import DecisionResult from '../components/DecisionResult.vue'
const props = defineProps({})
const data = shallowRef({
  applicantFirstName: 'Mike',
  applicantLastName: 'Smith',
  applicantMobileNumber: '1234567890',
  applicantEmail: 'mikey@sdf.com',
  applicantMonthlyIncome: 1000,
  loanAmount: 2500,
  loanTerm: 48,
  monthlyPayment: 144.84,
  approved: false,
})
</script>

<template>
  <div class="flex items-center justify-center text-accentDark md:p-10 w-full">
    <div
      v-if="data.approved"
      class="box w-full flex-col items-center lg:flex-row gap-10 lg:gap-0 pb-10"
    >
      <div class="illustration">
        <img
          class="lg:absolute h-full w-full object-contain lg:left-[10%] xl:left-[16%] scale-[95%] xl:scale-[90%]"
          src="../assets/decision-illustration.png"
          alt="Decision illustration"
        />
      </div>
      <div class="flex justify-center items-center w-full lg:basis-[50%]">
        <DecisionResult
          :approved="false"
          :data="{
            applicantFirstName: 'Mike',
            applicantLastName: 'Smith',
            applicantMobileNumber: '1234567890',
            applicantEmail: 'mike@mikey.com',
            applicantMonthlyIncome: 1000,
            loanAmount: 2500,
            loanTerm: 48,
            monthlyPayment: 144.84,
          }"
        />
      </div>
    </div>
    <div class="negBox" v-else>
      <DecisionResult :approved="data.approved" :data="data" />
    </div>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  min-width: 78vw;
  box-shadow: 0px 0px 40px 0px #0000000a;
  border-radius: 20px;
  height: calc(100vh - 77px);

  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 40px;
  }

  @media screen and (max-width: 768px) {
    padding: 20px;
  }
}

.illustration {
  display: flex;
  width: 100%;
  align-self: stretch;
  flex-basis: 50%;
  background-color: #f0f0ea;
  position: relative;
  border-radius: 20px 0 0 20px;
  border: 4px solid #fff;
  border-right: none;

  @media screen and (max-width: 1024px) {
    flex-basis: unset;
    align-self: unset;
    width: 75%;
    border-radius: 42%;
    border: none;
    padding: 15%;

    img {
      display: flex;
      height: 100%;
      width: 100%;
    }
  }
}

.negBox {
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 40px 0px #0000000a;
  border-radius: 20px;

  @media screen and (max-width: 768px) {
    padding: 20px;
  }
}
</style>
