"use client"

import { ArrowDown, ArrowUp, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock search results
const mockSearchResults = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 189.84,
    change: 2.45,
    percentChange: 1.31,
    marketCap: "2.97T",
    sector: "Technology",
    industry: "Consumer Electronics",
  },
  {
    symbol: "AAPL.L",
    name: "Apple Inc. (London)",
    price: 152.67,
    change: 1.98,
    percentChange: 1.28,
    marketCap: "2.97T",
    sector: "Technology",
    industry: "Consumer Electronics",
  },
  {
    symbol: "AAPL.MX",
    name: "Apple Inc. (Mexico)",
    price: 3245.67,
    change: -12.45,
    percentChange: -0.38,
    marketCap: "2.97T",
    sector: "Technology",
    industry: "Consumer Electronics",
  },
  {
    symbol: "APPL.VI",
    name: "Apple Hospitality REIT Inc.",
    price: 16.78,
    change: -0.22,
    percentChange: -1.29,
    marketCap: "3.84B",
    sector: "Real Estate",
    industry: "REIT",
  },
]

export function StockSearchResults({ query }: { query: string }) {
  // Filter results based on query (in a real app, this would be done on the server)
  const results = mockSearchResults.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
      stock.name.toLowerCase().includes(query.toLowerCase()),
  )

  if (results.length === 0) {
    return (
      <div className="mt-6 rounded-lg border p-6 text-center">
        <h3 className="mb-2 text-lg font-semibold">No results found</h3>
        <p className="text-muted-foreground">
          We couldn't find any stocks matching "{query}". Try a different search term.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Search Results</h3>
        <p className="text-sm text-muted-foreground">
          Found {results.length} results for "{query}"
        </p>
      </div>

      <div className="space-y-3">
        {results.map((stock) => (
          <SearchResultCard key={stock.symbol} stock={stock} />
        ))}
      </div>
    </div>
  )
}

function SearchResultCard({
  stock,
}: {
  stock: {
    symbol: string
    name: string
    price: number
    change: number
    percentChange: number
    marketCap: string
    sector: string
    industry: string
  }
}) {
  const isPositive = stock.change >= 0

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href={`/stocks/${stock.symbol}`} className="text-lg font-bold hover:text-primary">
              {stock.symbol}
            </Link>
            <Badge variant="outline" className="text-xs">
              {stock.marketCap}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{stock.name}</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              {stock.sector}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {stock.industry}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-lg font-medium">
              ${stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className={`flex items-center justify-end text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {isPositive ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
              <span>
                {isPositive ? "+" : ""}
                {stock.change.toFixed(2)} ({isPositive ? "+" : ""}
                {stock.percentChange.toFixed(2)}%)
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-9 px-3">
              <Plus className="mr-1 h-4 w-4" />
              Add to Watchlist
            </Button>
            <Button size="sm" className="h-9 px-3" asChild>
              <Link href={`/stocks/${stock.symbol}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
