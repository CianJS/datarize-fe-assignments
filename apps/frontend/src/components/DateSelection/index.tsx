import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { DateFromTo } from '../../types/purchase'

import 'react-datepicker/dist/react-datepicker.css'
import styles from './index.module.css'

interface DateSelectionProps {
  data: DateFromTo
  onChange: (data: DateFromTo) => void
}

function DateSelection({ data, onChange }: DateSelectionProps) {
  const [fromDate, setFromDate] = useState(data.from)
  const [toDate, setToDate] = useState(data.to)

  const onChangeDateInfo = (date: Date, type: 'from' | 'to') => {
    if (type === 'from') {
      setFromDate(date)
      onChange({ ...data, from: date })
      return
    }
    setToDate(date)
    onChange({ ...data, to: date })
  }

  return (
    <div className={styles.datePickers}>
      <DatePicker selected={fromDate} onChange={(date) => date && onChangeDateInfo(date, 'from')} maxDate={toDate} />
      <span>-</span>
      <DatePicker selected={toDate} onChange={(date) => date && onChangeDateInfo(date, 'to')} minDate={fromDate} />
    </div>
  )
}

export default DateSelection
