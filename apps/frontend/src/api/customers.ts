export const getCustomerList = async () => {
  const res = await fetch('http://localhost:4000/api/customers')
  const data = await res.json()
  return data
}
