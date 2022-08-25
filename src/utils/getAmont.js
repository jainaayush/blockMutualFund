export const getAmount = ( amount ) => {
  return (parseInt(amount.replace("$","")))
}