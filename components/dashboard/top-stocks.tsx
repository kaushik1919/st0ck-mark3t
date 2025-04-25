"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"
import Link from "next/link"

// Mock data for top stocks
const topGainers = [
  { symbol: "AAPL", name: "Apple Inc.", price: 189.84, change: 2.45, percentChange: 1.31 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 417.88, change: 3.22, percentChange: 0.78 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 881.86, change: 23.45, percentChange: 2.73 },
]

const topLosers = [
  { symbol: "META", name: "Meta Platforms", price: 474.99, change: -8.56, percentChange: -1.77 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 168.29, change: -4.21, percentChange: -2.44 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 178.87, change: -2.13, percentChange: -1.18 },
]

export function TopStocks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Movers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-primary">Top Gainers</h3>
            <div className="space-y-4">
              {topGainers.map((stock) => (
                <StockCard key={stock.symbol} stock={stock} isPositive={true} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-primary">Top Losers</h3>
            <div className="space-y-4">
              {topLosers.map((stock) => (
                <StockCard key={stock.symbol} stock={stock} isPositive={false} />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StockCard({
  stock,
  isPositive,
}: {
  stock: {
    symbol: string
    name: string
    price: number
    change: number
    percentChange: number
  }
  isPositive: boolean
}) {
  return (
    <Link href={`/stocks/${stock.symbol}`} className="block">
      <div className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold">{stock.symbol}</span>
            <span className="text-sm text-muted-foreground">{stock.name}</span>
          </div>
          <div className="text-lg font-semibold">
            ${stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
        <div className={`flex flex-col items-end ${isPositive ? "text-green-500" : "text-red-500"}`}>
          <div className="flex items-center">
            {isPositive ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
            <span>${Math.abs(stock.change).toFixed(2)}</span>
          </div>
          <div className="text-sm">
            {isPositive ? "+" : ""}
            {stock.percentChange.toFixed(2)}%
          </div>
        </div>
      </div>
    </Link>
  )
}
