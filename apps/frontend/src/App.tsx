import { useEffect, useState } from 'react'
import './App.css'
import { getCustomerList, CustomerOption } from './api/customers'
import { getPurchaseFrequency, getCustomerPurchaseInfo } from './api/purchase'
import { CustomerTable, Chart } from './components'
import { RangeByPriceCount } from './types/purchase'
import { Customer } from './types/customer'
import { CustomerDetailTable } from './components/index'

function App() {
  const [customers, setCustomers] = useState<Customer[]>()
  const [purchaseFrequency, setPurchaseFrequency] = useState<RangeByPriceCount[]>()
  const [customerPurchaseInfo, setCustomerPurchaseInfo] = useState()

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
      <div>
        {customers && <CustomerTable data={customers} onSelect={onShowCustomerDetail} />}
        {customerPurchaseInfo && <CustomerDetailTable data={customerPurchaseInfo} onSelect={() => {}} />}
      </div>
    </>
  )
}

export default App
