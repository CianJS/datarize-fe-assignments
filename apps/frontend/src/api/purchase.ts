export const getPurchaseFrequency = async () => {
  const res = await fetch('http://localhost:4000/api/purchase-frequency')
  const data = await res.json()
  return data
}

export const getCustomerPurchaseList = async (id: number) => {
  const res = await fetch(`http://localhost:4000/api/customer/${id}/purchases`)
  const data = await res.json()
  return data
}
