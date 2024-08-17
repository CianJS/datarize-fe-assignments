export type CustomerOption = { sortBy: 'asc' | 'desc'; name: string }

export const getCustomerList = async (options?: CustomerOption) => {
  const queryParams = new URLSearchParams(options).toString()
  const res = await fetch(`http://localhost:4000/api/customers${queryParams ? `?${queryParams}` : ''}`)
  const data = await res.json()
  return data
}
