import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, LabelList } from 'recharts'
import { RangeByPriceCount } from '../../types/purchase'

interface ChartProps {
  data: RangeByPriceCount[]
}

function Chart({ data }: ChartProps) {
  return (
    <BarChart width={730} height={250} data={data} margin={{ top: 5, left: 10, bottom: 25 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="range" label={{ value: '가격대', position: 'bottom' }} />
      <YAxis label={{ value: '구매량', angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8">
        <LabelList dataKey="range" position="top" />
      </Bar>
    </BarChart>
  )
}

export default Chart
