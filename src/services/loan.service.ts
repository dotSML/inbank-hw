import type { LoanApplication } from '@/interfaces/loan-application.interface'
import Decimal from 'decimal.js'

export const processLoanApplication = async (data: LoanApplication) => {
  // This is a mock API call that returns a promise
  return new Promise(resolve => {
    setTimeout(() => {
      if (new Decimal(data.applicantMonthlyIncome).lessThan(1000)) {
        resolve(false)
      } else {
        resolve(true)
      }
      resolve(true)
    }, 2000)
  })
}
