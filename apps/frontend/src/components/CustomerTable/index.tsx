import { Customer } from '../../types/customer'
import { Table, Header, HeaderRow, Body, Row, HeaderCell, Cell } from '@table-library/react-table-library/table'

import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'
import { HeaderCellSort, useSort } from '@table-library/react-table-library/sort'
import { ChangeEvent, useState } from 'react'

interface CustomerDetailTableProps {
  data: Customer[]
  onSelect: (item: Customer) => void
}

function CustomerDetailTable({ data, onSelect }: CustomerDetailTableProps) {
  const theme = useTheme({
    ...getTheme(),
    Table: `
      margin: 12px auto;
    `,
    HeaderRow: `
      &.center th {
        color: #141414;
        text-align: center;
      }
    `,
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
  const sort = useSort(
    { nodes: data },
    {
      onChange: () => {},
    },
    {
      // required라서 미사용인 값들도 추가해놓음
      sortFns: {
        NAME: (array) => array.sort(),
        TOTALAMOUNT: (array) => array.sort(),
        COUNT: (array) => array.sort((a, b) => a.count - b.count),
      },
    },
  )
  const [selectedCustomerId, setSelectedCustomerId] = useState<number>()
  const [search, setSearch] = useState<string>('')

  const onSelectedRow = (item: Customer) => {
    onSelect(item)
    setSelectedCustomerId(item.id)
  }

  const handleSearch = (event: ChangeEvent) => {
    const inputElement = event.target as HTMLInputElement
    setSearch(inputElement.value)
  }

  return (
    <>
      <label htmlFor="search">
        고객명으로 검색:&nbsp;
        <input id="search" type="text" value={search} onChange={handleSearch} />
      </label>

      <br />

      <Table
        data={{ nodes: data.filter((item) => (search ? item.name.search(search) > -1 : true)) }}
        sort={sort}
        theme={theme}
      >
        {(tableList: Customer[]) => (
          <>
            <Header>
              <HeaderRow className="center">
                <HeaderCell>고객ID</HeaderCell>
                <HeaderCell>고객명</HeaderCell>
                <HeaderCellSort sortKey="COUNT">총 구매 횟수</HeaderCellSort>
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
    </>
  )
}

export default CustomerDetailTable
