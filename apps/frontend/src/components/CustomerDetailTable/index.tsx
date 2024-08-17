import { CustomerPurchaseInfo } from '../../types/customer'
import { Table, Header, HeaderRow, Body, Row, HeaderCell, Cell } from '@table-library/react-table-library/table'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'

interface ChartProps {
  data: CustomerPurchaseInfo[]
  onSelect: (item: CustomerPurchaseInfo) => void
}

function CustomerDetailTable({ data, onSelect }: ChartProps) {
  const theme = useTheme(getTheme())

  return (
    <Table data={{ nodes: data }} theme={theme}>
      {(tableList: CustomerPurchaseInfo[]) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell>등록일</HeaderCell>
              <HeaderCell>남은 수량</HeaderCell>
              <HeaderCell>상품명</HeaderCell>
              <HeaderCell>상품 가격</HeaderCell>
              <HeaderCell>미리보기</HeaderCell>
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item) => (
              <Row
                key={`${item.date}_${item.price}`}
                item={{ id: `${item.date}_${item.price}`, ...item }}
                onClick={() => onSelect(item)}
              >
                <Cell>{item.date}</Cell>
                <Cell>{item.quantity}</Cell>
                <Cell>{item.product}</Cell>
                <Cell>{item.price.toLocaleString()}</Cell>
                <Cell>
                  <img src={item.imgSrc} alt={item.product} width={100} />
                </Cell>
              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
  )
}

export default CustomerDetailTable
