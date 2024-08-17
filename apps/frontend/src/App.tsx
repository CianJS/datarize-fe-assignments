import { useEffect, useState } from 'react'
import { getCustomerList, CustomerOption } from './api/customers'
import { getPurchaseFrequency, getCustomerPurchaseInfo } from './api/purchase'
import { CustomerTable, Chart } from './components'
import { RangeByPriceCount } from './types/purchase'
import { Customer, CustomerPurchaseInfo } from './types/customer'
import { CustomerDetailTable } from './components/index'
import './App.css'

function App() {
  const [customers, setCustomers] = useState<Customer[]>()
  const [purchaseFrequency, setPurchaseFrequency] = useState<RangeByPriceCount[]>()
  const [customerPurchaseInfo, setCustomerPurchaseInfo] = useState<CustomerPurchaseInfo[]>()
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>()

  const fetchCustomerInfo = async (options?: CustomerOption) => {
    try {
      const customerInfo = await getCustomerList(options)
      setCustomers(customerInfo)
    } catch (error) {
      const errors = error as Error
      console.log(errors?.message || '알 수 없는 문제가 발생했습니다. 다시 시도해 주세요.')
    }
  }

  const fetchPurchaseFrequency = async () => {
    try {
      const purchaseFrequencyInfo = await getPurchaseFrequency()
      setPurchaseFrequency(purchaseFrequencyInfo)
    } catch (error) {
      const errors = error as Error
      console.log(errors?.message || '알 수 없는 문제가 발생했습니다. 다시 시도해 주세요.')
    }
  }

  const onShowCustomerDetail = async (item: Customer) => {
    const customerPurchaseInfo = await getCustomerPurchaseInfo(item.id)
    setSelectedCustomer(item)
    setCustomerPurchaseInfo(customerPurchaseInfo)
  }

  useEffect(() => {
    fetchCustomerInfo()
    fetchPurchaseFrequency()
  }, [])

  return (
    <>
      <div>
        <div>날짜필터 영역</div>
        {purchaseFrequency && <Chart data={purchaseFrequency} />}
      </div>
      <br />
      <div>
        {customers && <CustomerTable data={customers} onSelect={onShowCustomerDetail} />}
        {customerPurchaseInfo && [
          <hr />,
          selectedCustomer && <h2>{selectedCustomer.name} 고객님의 상세 구매 내역</h2>,
          <CustomerDetailTable data={customerPurchaseInfo} onSelect={() => {}} />,
        ]}
      </div>
    </>
  )
}

export default App
