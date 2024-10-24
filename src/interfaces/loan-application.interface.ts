export interface LoanApplication {
  applicantFirstName: string
  applicantLastName: string
  applicantEmail: string
  applicantPhone: string
  applicantMonthlyIncome: number
  loanAmount: number
  loanTerm: number
  monthlyPayment: number
  approved: boolean
}
