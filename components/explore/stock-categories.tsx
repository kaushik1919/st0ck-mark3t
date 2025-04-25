"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDown, ArrowUp, Cpu, DollarSign, Droplet, Pill, ShoppingBag, Wallet } from "lucide-react"
import Link from "next/link"

// Mock data for sector stocks
const technologyStocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 189.84, change: 2.45, percentChange: 1.31 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 417.88, change: 3.22, percentChange: 0.78 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 881.86, change: 23.45, percentChange: 2.73 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 156.37, change: -1.23, percentChange: -0.78 },
]

const financialStocks = [
  { symbol: "JPM", name: "JPMorgan Chase & Co.", price: 198.47, change: 1.23, percentChange: 0.62 },
  { symbol: "BAC", name: "Bank of America Corp.", price: 37.92, change: -0.45, percentChange: -1.17 },
  { symbol: "WFC", name: "Wells Fargo & Co.", price: 57.81, change: 0.32, percentChange: 0.56 },
  { symbol: "GS", name: "Goldman Sachs Group Inc.", price: 440.23, change: 2.78, percentChange: 0.63 },
]

const healthcareStocks = [
  { symbol: "JNJ", name: "Johnson & Johnson", price: 147.89, change: -1.23, percentChange: -0.83 },
  { symbol: "PFE", name: "Pfizer Inc.", price: 27.42, change: 0.18, percentChange: 0.66 },
  { symbol: "UNH", name: "UnitedHealth Group Inc.", price: 490.12, change: 3.45, percentChange: 0.71 },
  { symbol: "ABBV", name: "AbbVie Inc.", price: 162.37, change: -0.89, percentChange: -0.55 },
]

const consumerStocks = [
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 178.87, change: -2.13, percentChange: -1.18 },
  { symbol: "WMT", name: "Walmart Inc.", price: 60.12, change: 0.45, percentChange: 0.75 },
  { symbol: "HD", name: "Home Depot Inc.", price: 342.78, change: 1.23, percentChange: 0.36 },
  { symbol: "MCD", name: "McDonald's Corp.", price: 266.34, change: -1.45, percentChange: -0.54 },
]

const energyStocks = [
  { symbol: "XOM", name: "Exxon Mobil Corp.", price: 113.45, change: 0.78, percentChange: 0.69 },
  { symbol: "CVX", name: "Chevron Corp.", price: 155.23, change: 1.12, percentChange: 0.73 },
  { symbol: "COP", name: "ConocoPhillips", price: 114.67, change: -0.89, percentChange: -0.77 },
  { symbol: "SLB", name: "Schlumberger Ltd.", price: 47.89, change: -0.34, percentChange: -0.71 },
]

export function StockCategories() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stocks by Sector</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="technology">
          <TabsList className="mb-4 grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="technology" className="flex items-center gap-1">
              <Cpu className="h-4 w-4" />
              <span className="hidden sm:inline">Technology</span>
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Financial</span>
            </TabsTrigger>
            <TabsTrigger value="healthcare" className="flex items-center gap-1">
              <Pill className="h-4 w-4" />
              <span className="hidden sm:inline">Healthcare</span>
            </TabsTrigger>
            <TabsTrigger value="consumer" className="flex items-center gap-1">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Consumer</span>
            </TabsTrigger>
            <TabsTrigger value="energy" className="flex items-center gap-1">
              <Droplet className="h-4 w-4" />
              <span className="hidden sm:inline">Energy</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="technology">
            <SectorStockList
              stocks={technologyStocks}
              icon={<Cpu className="h-5 w-5 text-primary" />}
              title="Technology Stocks"
              description="Companies in the technology sector"
            />
          </TabsContent>

          <TabsContent value="financial">
            <SectorStockList
              stocks={financialStocks}
              icon={<Wallet className="h-5 w-5 text-primary" />}
              title="Financial Stocks"
              description="Banks, insurance, and financial services companies"
            />
          </TabsContent>

          <TabsContent value="healthcare">
            <SectorStockList
              stocks={healthcareStocks}
              icon={<Pill className="h-5 w-5 text-primary" />}
              title="Healthcare Stocks"
              description="Pharmaceutical, biotech, and healthcare companies"
            />
          </TabsContent>

          <TabsContent value="consumer">
            <SectorStockList
              stocks={consumerStocks}
              icon={<ShoppingBag className="h-5 w-5 text-primary" />}
              title="Consumer Stocks"
              description="Retail, food, and consumer goods companies"
            />
          </TabsContent>

          <TabsContent value="energy">
            <SectorStockList
              stocks={energyStocks}
              icon={<Droplet className="h-5 w-5 text-primary" />}
              title="Energy Stocks"
              description="Oil, gas, and energy companies"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function SectorStockList({
  stocks,
  icon,
  title,
  description,
}: {
  stocks: {
    symbol: string
    name: string
    price: number
    change: number
    percentChange: number
  }[]
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="space-y-1">
        {stocks.map((stock) => (
          <Link key={stock.symbol} href={`/stocks/${stock.symbol}`} className="block">
            <div className="grid grid-cols-12 items-center gap-2 rounded-md p-2 transition-colors hover:bg-muted/50">
              <div className="col-span-3 md:col-span-2">
                <div className="font-medium">{stock.symbol}</div>
              </div>
              <div className="col-span-4 hidden md:block">
                <div className="truncate text-sm text-muted-foreground">{stock.name}</div>
              </div>
              <div className="col-span-5 md:col-span-4">
                <div className="text-right font-medium">
                  ${stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              <div className="col-span-4 md:col-span-2">
                <div
                  className={`flex items-center justify-end text-sm ${stock.percentChange >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {stock.percentChange >= 0 ? (
                    <ArrowUp className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowDown className="mr-1 h-3 w-3" />
                  )}
                  <span>
                    {stock.percentChange >= 0 ? "+" : ""}
                    {stock.percentChange.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
