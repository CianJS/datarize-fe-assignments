import { Customer } from '../../types/customer'
import { Table, Header, HeaderRow, Body, Row, HeaderCell, Cell } from '@table-library/react-table-library/table'

import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'
import { useState } from 'react'
interface ChartProps {
  data: Customer[]
  onSelect: (item: Customer) => void
}

function CustomerDetailTable({ data, onSelect }: ChartProps) {
  const [selectedCustomerId, setSelectedCustomerId] = useState<number>()
  const theme = useTheme({
    ...getTheme(),
    Row: `
      &.clickable {
        cursor: pointer;
        color: #757575;
      }
      &.selected {
        background-color: #888888;
        color: #ffffff;
      }
    `,
  })

  const onSelectedRow = (item: Customer) => {
    onSelect(item)
    setSelectedCustomerId(item.id)
  }

  return (
    <Table data={{ nodes: data }} theme={theme}>
      {(tableList: Customer[]) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell>고객ID</HeaderCell>
              <HeaderCell>고객명</HeaderCell>
              <HeaderCell>총 구매 횟수</HeaderCell>
              <HeaderCell>총 구매 금액</HeaderCell>
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item) => (
              <Row
                className={selectedCustomerId === item.id ? 'selected' : ''}
                key={`${item.id}_${item.name}`}
                item={item}
                onClick={() => onSelectedRow(item)}
              >
                <Cell>{item.id}</Cell>
                <Cell>{item.name}</Cell>
                <Cell>{item.count}</Cell>
                <Cell>{item.totalAmount}</Cell>
              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
  )
}

export default CustomerDetailTable
