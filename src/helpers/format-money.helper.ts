export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    useGrouping: true,
    minimumFractionDigits: amount % 1 !== 0 ? 2 : 0,
    maximumFractionDigits: 2,
  })
    .format(amount)
    .replace(/,/g, ' ')
}
