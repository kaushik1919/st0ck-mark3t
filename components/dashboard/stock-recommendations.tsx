"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown } from "lucide-react"

const recommendedStocks = [
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    currentPrice: 875.28,
    change: "+4.35%",
    isPositive: true,
    reason: "Strong AI chip demand and gaming sector growth",
    targetPrice: 950.00,
    upside: "+8.53%"
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    currentPrice: 172.63,
    change: "-2.15%",
    isPositive: false,
    reason: "Recent price drop presents buying opportunity",
    targetPrice: 210.00,
    upside: "+21.65%"
  },
  {
    symbol: "AMD",
    name: "Advanced Micro Devices",
    currentPrice: 164.53,
    change: "+3.12%",
    isPositive: true,
    reason: "Expanding market share in data center processors",
    targetPrice: 185.00,
    upside: "+12.44%"
  }
]

export function StockRecommendations() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {recommendedStocks.map((stock) => (
        <Card key={stock.symbol} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{stock.symbol}</CardTitle>
                <p className="text-sm text-muted-foreground">{stock.name}</p>
              </div>
              <div className={`flex items-center ${stock.isPositive ? "text-green-600" : "text-red-600"}`}>
                {stock.isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                <span className="ml-1">{stock.change}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-2xl font-bold">${stock.currentPrice.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Current Price</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-green-600">{stock.upside}</p>
                <p className="text-sm text-muted-foreground">Upside Potential</p>
              </div>
              <div>
                <p className="text-sm">{stock.reason}</p>
              </div>
              <Button className="w-full">View Details</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
