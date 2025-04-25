import type { Metadata } from "next"
import { SearchStocks } from "@/components/explore/search-stocks"
import { StockCategories } from "@/components/explore/stock-categories"
import { TrendingStocks } from "@/components/explore/trending-stocks"

export const metadata: Metadata = {
  title: "Explore | StockSage",
  description: "Explore stocks and market trends",
}

export default function ExplorePage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col gap-6">
        <header>
          <h1 className="text-3xl font-bold">Explore</h1>
          <p className="text-muted-foreground">Discover stocks and market trends</p>
        </header>

        <SearchStocks />

        <TrendingStocks />

        <StockCategories />
      </div>
    </div>
  )
}
