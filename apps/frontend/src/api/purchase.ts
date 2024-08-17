type PurchaseFrequencyOption = { from: string; to: string }

export const getPurchaseFrequency = async (options?: PurchaseFrequencyOption) => {
  const queryParams = new URLSearchParams(options).toString()
  const res = await fetch(`http://localhost:4000/api/purchase-frequency${queryParams ? `?${queryParams}` : ''}`)
  const data = await res.json()
  return data
}

export const getCustomerPurchaseInfo = async (id: number) => {
  const res = await fetch(`http://localhost:4000/api/customers/${id}/purchases`)
  const data = await res.json()
  return data
}
