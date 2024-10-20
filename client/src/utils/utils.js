export const truncateDate = (date) => {
  const res = new Date(date)
  return res.toLocaleDateString('en-SE')
}
