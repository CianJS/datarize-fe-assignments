import { Customer } from '../../types/customer'
import { Table, Header, HeaderRow, Body, Row, HeaderCell, Cell } from '@table-library/react-table-library/table'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'

interface ChartProps {
  data: Customer[]
  onSelect: (item: Customer) => void
}

function CustomerDetailTable({ data, onSelect }: ChartProps) {
  const theme = useTheme(getTheme())

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
              <Row key={`${item.id}_${item.name}`} item={item} onClick={() => onSelect(item)}>
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
