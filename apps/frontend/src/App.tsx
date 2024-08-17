import { useEffect, useState } from 'react'
import { getCustomerList, CustomerOption } from './api/customers'
import { getPurchaseFrequency, getCustomerPurchaseInfo } from './api/purchase'
import { CustomerTable, Chart, DateSelection } from './components'
import { RangeByPriceCount, DateFromTo } from './types/purchase'
import { Customer, CustomerPurchaseInfo } from './types/customer'
import { CustomerDetailTable } from './components/index'
import { dateToStringFormat } from './utils/format'
import './App.css'

function App() {
  const [customers, setCustomers] = useState<Customer[]>()
  const [purchaseFrequency, setPurchaseFrequency] = useState<RangeByPriceCount[]>()
  const [customerPurchaseInfo, setCustomerPurchaseInfo] = useState<CustomerPurchaseInfo[]>()
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>()
  const [fromToDates, setFromToDates] = useState<DateFromTo>({
    from: new Date('2024-07-01'),
    to: new Date('2024-07-31'),
  })

  const fetchCustomerInfo = async (options?: CustomerOption) => {
    try {
      const customerInfo = await getCustomerList(options)
      setCustomers(customerInfo)
    } catch (error) {
      const errors = error as Error
      console.log(errors?.message || '알 수 없는 문제가 발생했습니다. 다시 시도해 주세요.')
    }
  }

  const fetchPurchaseFrequency = async (options?: DateFromTo) => {
    try {
      const purchaseFrequencyInfo = await getPurchaseFrequency(
        options && {
          from: dateToStringFormat(options.from),
          to: dateToStringFormat(options.to),
        },
      )
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

  const onChangeDate = (data: DateFromTo) => {
    setFromToDates(data)
    fetchPurchaseFrequency(data)
  }

  useEffect(() => {
    fetchCustomerInfo()
    fetchPurchaseFrequency(fromToDates)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div>
        <div className="date-picker-wrapper">
          <DateSelection data={fromToDates} onChange={onChangeDate} />
        </div>
        {purchaseFrequency && <Chart data={purchaseFrequency} />}
      </div>
      <br />
      <div>
        {customers && <CustomerTable data={customers} onSelect={onShowCustomerDetail} />}
        {customerPurchaseInfo && [
          <hr key="hr_1" />,
          selectedCustomer && <h2 key="h2_2">{selectedCustomer.name} 고객님의 상세 구매 내역</h2>,
          <CustomerDetailTable key="customer-detail-table" data={customerPurchaseInfo} onSelect={() => {}} />,
        ]}
      </div>
    </>
  )
}

export default App
