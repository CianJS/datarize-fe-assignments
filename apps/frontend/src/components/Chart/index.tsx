import styles from './index.module.css'

interface ChartProps {
  value: boolean
  onChange: (value: boolean) => void
}

function Chart(options: ChartProps) {
  return <div className={styles.wrapper}>{options.value}</div>
}

export default Chart
