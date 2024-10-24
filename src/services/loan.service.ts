import type { LoanApplication } from '@/interfaces/loan-application.interface'

export const processLoanApplication = async (data: LoanApplication) => {
  // This is a mock API call that returns a promise
  return new Promise(resolve => {
    setTimeout(() => {
      if (data.applicantMonthlyIncome < 1000) {
        resolve(false)
      } else {
        resolve(true)
      }
      resolve(true)
    }, 2000)
  })
}
