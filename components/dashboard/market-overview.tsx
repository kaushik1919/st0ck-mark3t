"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const generateRandomData = () => {
  const data = []
  let value = 100
  for (let i = 0; i < 30; i++) {
    value += (Math.random() - 0.5) * 10
    data.push(value)
  }
  return data
}

const labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)

const data = {
  labels,
  datasets: [
    {
      label: "S&P 500",
      data: generateRandomData(),
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
    {
      label: "NASDAQ",
      data: generateRandomData(),
      borderColor: "rgb(53, 162, 235)",
      tension: 0.1,
    },
  ],
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: false,
    },
  },
}

export function MarketOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Line options={options} data={data} />
        </div>
      </CardContent>
    </Card>
  )
}
