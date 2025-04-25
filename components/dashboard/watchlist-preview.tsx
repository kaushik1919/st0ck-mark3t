"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown, LineChart, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const watchlistStocks = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 175.50,
    change: "+2.35%",
    isPositive: true,
    volume: "45.2M"
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 315.25,
    change: "-1.15%",
    isPositive: false,
    volume: "32.8M"
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 142.75,
    change: "+3.42%",
    isPositive: true,
    volume: "18.5M"
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 178.87,
    change: "+1.28%",
    isPositive: true,
    volume: "25.3M"
  },
  {
    symbol: "META",
    name: "Meta Platforms Inc.",
    price: 485.96,
    change: "-0.85%",
    isPositive: false,
    volume: "15.7M"
  }
]

export function WatchlistPreview() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your Watchlist</CardTitle>
        <Button variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Stock
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {watchlistStocks.map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <LineChart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{stock.symbol}</div>
                  <div className="text-sm text-muted-foreground">{stock.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-medium">${stock.price.toFixed(2)}</div>
                  <div className={`flex items-center text-sm ${stock.isPositive ? "text-green-600" : "text-red-600"}`}>
                    {stock.isPositive ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
                    {stock.change}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Volume</div>
                  <div className="text-sm font-medium">{stock.volume}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
