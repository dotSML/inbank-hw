import type { LoanApplication } from '@/interfaces/loan-application.interface'
import { defineStore } from 'pinia'

export const useLoanStore = defineStore({
  id: 'loan',
  state: () => ({
    applicantFirstName: '',
    applicantLastName: '',
    applicantEmail: '',
    applicantPhone: '',
    applicantMonthlyIncome: 0,
    monthlyPayment: 0,
    loanAmount: 0,
    loanTerm: 0,
    approved: false,
    isProcessing: false,
  }),
  actions: {
    saveApplicantInfo(
      data: Omit<
        LoanApplication,
        'loanAmount' | 'loanTerm' | 'approved' | 'monthlyPayment'
      >,
    ) {
      this.applicantFirstName = data.applicantFirstName
      this.applicantLastName = data.applicantLastName
      this.applicantEmail = data.applicantEmail
      this.applicantPhone = data.applicantPhone
      this.applicantMonthlyIncome = data.applicantMonthlyIncome
    },

    saveLoanInfo(
      data: Pick<LoanApplication, 'loanAmount' | 'loanTerm' | 'monthlyPayment'>,
    ) {
      this.loanAmount = data.loanAmount
      this.loanTerm = data.loanTerm
      this.monthlyPayment = data.monthlyPayment
    },

    setApprovalStatus(status: boolean) {
      this.approved = status
    },

    setIsProcessing(status: boolean) {
      this.isProcessing = status
    },
  },
})
