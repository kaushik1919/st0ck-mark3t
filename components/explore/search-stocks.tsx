"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { StockSearchResults } from "@/components/explore/stock-search-results"

export function SearchStocks() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsSearching(true)

    // Simulate API call
    setTimeout(() => {
      setIsSearching(false)
      setHasSearched(true)
    }, 500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Stocks</CardTitle>
        <CardDescription>Search for stocks by company name or ticker symbol</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex w-full gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by company name or ticker (e.g., AAPL, Apple)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" disabled={isSearching || !query.trim()}>
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </form>

        {hasSearched && <StockSearchResults query={query} />}
      </CardContent>
    </Card>
  )
}
