import { Suspense } from "react"
import type { Metadata } from "next"
import { ArrowDown, ArrowUp, Bell, LineChart, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketOverview } from "@/components/dashboard/market-overview"
import { TopStocks } from "@/components/dashboard/top-stocks"
import { RecentNews } from "@/components/dashboard/recent-news"
import { StockRecommendations } from "@/components/dashboard/stock-recommendations"
import { WatchlistPreview } from "@/components/dashboard/watchlist-preview"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Dashboard | StockSage",
  description: "Your stock market dashboard",
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Market overview and personalized insights</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Bell className="mr-2 h-4 w-4" />
              Alerts
            </Button>
            <Button size="sm">
              <Zap className="mr-2 h-4 w-4" />
              Quick Trade
            </Button>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MarketSummaryCard title="S&P 500" value="4,927.11" change="+0.38%" isPositive={true} />
          <MarketSummaryCard title="Dow Jones" value="38,239.66" change="-0.12%" isPositive={false} />
          <MarketSummaryCard title="Nasdaq" value="15,927.90" change="+0.56%" isPositive={true} />
          <MarketSummaryCard title="Russell 2000" value="2,063.37" change="+0.21%" isPositive={true} />
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Market Overview</TabsTrigger>
            <TabsTrigger value="recommendations">Stock Recommendations</TabsTrigger>
            <TabsTrigger value="news">Latest News</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Suspense fallback={<MarketOverviewSkeleton />}>
              <MarketOverview />
            </Suspense>
            <div className="grid gap-4 md:grid-cols-2">
              <Suspense fallback={<WatchlistSkeleton />}>
                <WatchlistPreview />
              </Suspense>
              <Suspense fallback={<TopStocksSkeleton />}>
                <TopStocks />
              </Suspense>
            </div>
          </TabsContent>
          <TabsContent value="recommendations" className="space-y-4">
            <Suspense fallback={<RecommendationsSkeleton />}>
              <StockRecommendations />
            </Suspense>
          </TabsContent>
          <TabsContent value="news" className="space-y-4">
            <Suspense fallback={<NewsSkeleton />}>
              <RecentNews />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function MarketSummaryCard({
  title,
  value,
  change,
  isPositive,
}: {
  title: string
  value: string
  change: string
  isPositive: boolean
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <LineChart className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`flex items-center text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
          {isPositive ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
          {change}
        </div>
      </CardContent>
    </Card>
  )
}

function MarketOverviewSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[300px] w-full" />
      </CardContent>
    </Card>
  )
}

function TopStocksSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-40" />
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
      </CardContent>
    </Card>
  )
}

function RecommendationsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-40" />
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
      </CardContent>
    </Card>
  )
}

function NewsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-40" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
        </div>
      </CardContent>
    </Card>
  )
}

function WatchlistSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-40" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
