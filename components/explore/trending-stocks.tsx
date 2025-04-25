"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDown, ArrowUp, TrendingUp } from "lucide-react"
import Link from "next/link"

// Mock data for trending stocks
const mostActive = [
  { symbol: "AAPL", name: "Apple Inc.", price: 189.84, change: 2.45, percentChange: 1.31, volume: "78.5M" },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 417.88, change: 3.22, percentChange: 0.78, volume: "25.2M" },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 881.86, change: 23.45, percentChange: 2.73, volume: "45.7M" },
  { symbol: "TSLA", name: "Tesla Inc.", price: 168.29, change: -4.21, percentChange: -2.44, volume: "112.3M" },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 178.87, change: -2.13, percentChange: -1.18, volume: "35.8M" },
]

const topGainers = [
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 881.86, change: 23.45, percentChange: 2.73, volume: "45.7M" },
  { symbol: "AMD", name: "Advanced Micro Devices", price: 152.37, change: 5.67, percentChange: 3.87, volume: "32.1M" },
  { symbol: "INTC", name: "Intel Corporation", price: 35.21, change: 1.23, percentChange: 3.62, volume: "28.9M" },
  { symbol: "AAPL", name: "Apple Inc.", price: 189.84, change: 2.45, percentChange: 1.31, volume: "78.5M" },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 417.88, change: 3.22, percentChange: 0.78, volume: "25.2M" },
]

const topLosers = [
  { symbol: "TSLA", name: "Tesla Inc.", price: 168.29, change: -4.21, percentChange: -2.44, volume: "112.3M" },
  { symbol: "META", name: "Meta Platforms", price: 474.99, change: -8.56, percentChange: -1.77, volume: "18.6M" },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 178.87, change: -2.13, percentChange: -1.18, volume: "35.8M" },
  { symbol: "NFLX", name: "Netflix Inc.", price: 602.75, change: -5.89, percentChange: -0.97, volume: "5.3M" },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 156.37, change: -1.23, percentChange: -0.78, volume: "22.7M" },
]

export function TrendingStocks() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <TrendingUp className="mr-2 h-5 w-5 text-primary" />
        <CardTitle>Trending Stocks</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="most-active">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="most-active" className="flex-1">
              Most Active
            </TabsTrigger>
            <TabsTrigger value="top-gainers" className="flex-1">
              Top Gainers
            </TabsTrigger>
            <TabsTrigger value="top-losers" className="flex-1">
              Top Losers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="most-active">
            <div className="space-y-1">
              {mostActive.map((stock) => (
                <TrendingStockRow key={stock.symbol} stock={stock} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="top-gainers">
            <div className="space-y-1">
              {topGainers.map((stock) => (
                <TrendingStockRow key={stock.symbol} stock={stock} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="top-losers">
            <div className="space-y-1">
              {topLosers.map((stock) => (
                <TrendingStockRow key={stock.symbol} stock={stock} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function TrendingStockRow({
  stock,
}: {
  stock: {
    symbol: string
    name: string
    price: number
    change: number
    percentChange: number
    volume: string
  }
}) {
  const isPositive = stock.change >= 0

  return (
    <Link href={`/stocks/${stock.symbol}`} className="block">
      <div className="grid grid-cols-12 items-center gap-2 rounded-md p-2 transition-colors hover:bg-muted/50">
        <div className="col-span-3 md:col-span-2">
          <div className="font-medium">{stock.symbol}</div>
        </div>
        <div className="col-span-4 hidden md:block">
          <div className="truncate text-sm text-muted-foreground">{stock.name}</div>
        </div>
        <div className="col-span-3 md:col-span-2">
          <div className="text-right font-medium">
            ${stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
        <div className="col-span-3 md:col-span-2">
          <div className={`flex items-center justify-end text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {isPositive ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
            <span>
              {isPositive ? "+" : ""}
              {stock.percentChange.toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="col-span-3 md:col-span-2">
          <div className="text-right text-sm text-muted-foreground">{stock.volume}</div>
        </div>
      </div>
    </Link>
  )
}
