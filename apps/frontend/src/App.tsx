import { useEffect, useState } from 'react'
import './App.css'
import { getCustomerList } from './api/customers'
import { getPurchaseFrequency, getCustomerPurchaseList } from './api/purchase'
import Chart from './components/Chart/index'
import { RangeByPriceCount } from './types/purchase'

function App() {
  const [customers, setCustomers] = useState()
  const [purchaseFrequency, setPurchaseFrequency] = useState<RangeByPriceCount[]>()
  const [customerPurchaseInfo, setCustomerPurchaseInfo] = useState()

  const fetchCustomerInfo = async () => {
    try {
      const customerInfo = await getCustomerList()
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

  const fetchCustomerPurchaseInfo = async (id: number) => {
    try {
      const customerPurchaseInfo = await getCustomerPurchaseList(id)
      setCustomerPurchaseInfo(customerPurchaseInfo)
    } catch (error) {
      const errors = error as Error
      console.log(errors?.message || '알 수 없는 문제가 발생했습니다. 다시 시도해 주세요.')
    }
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
      <div>고객 테이블</div>
    </>
  )
}

export default App
