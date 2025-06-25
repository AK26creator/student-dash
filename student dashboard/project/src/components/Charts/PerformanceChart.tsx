import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

interface PerformanceChartProps {
  type: 'bar' | 'doughnut'
  data: any
  title: string
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ type, data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: type === 'bar' ? {
      y: {
        beginAtZero: true,
        max: 100,
      },
    } : undefined,
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="h-80">
        {type === 'bar' ? (
          <Bar data={data} options={options} />
        ) : (
          <Doughnut data={data} options={options} />
        )}
      </div>
    </div>
  )
}

export default PerformanceChart