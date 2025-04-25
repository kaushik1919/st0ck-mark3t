"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import Link from "next/link"

// Mock data for news
const newsItems = [
  {
    id: 1,
    title: "Fed Signals Potential Rate Cuts Later This Year",
    source: "Financial Times",
    url: "#",
    timestamp: "2024-04-14T14:30:00Z",
    sentiment: "neutral",
    categories: ["Economy", "Federal Reserve"],
  },
  {
    id: 2,
    title: "NVIDIA Unveils Next-Generation AI Chips, Stock Surges",
    source: "TechCrunch",
    url: "#",
    timestamp: "2024-04-14T10:15:00Z",
    sentiment: "positive",
    categories: ["Technology", "AI"],
  },
  {
    id: 3,
    title: "Oil Prices Drop Amid Global Supply Concerns",
    source: "Reuters",
    url: "#",
    timestamp: "2024-04-13T22:45:00Z",
    sentiment: "negative",
    categories: ["Commodities", "Energy"],
  },
  {
    id: 4,
    title: "Major Retailers Report Strong Q1 Earnings, Beating Expectations",
    source: "Bloomberg",
    url: "#",
    timestamp: "2024-04-13T16:20:00Z",
    sentiment: "positive",
    categories: ["Retail", "Earnings"],
  },
]

export function RecentNews() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Latest Market News</CardTitle>
        <Link href="/news" className="text-sm text-primary hover:underline">
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsItems.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function NewsCard({
  news,
}: {
  news: {
    id: number
    title: string
    source: string
    url: string
    timestamp: string
    sentiment: "positive" | "negative" | "neutral"
    categories: string[]
  }
}) {
  const timeAgo = getTimeAgo(new Date(news.timestamp))

  const sentimentColor = {
    positive: "bg-green-500/10 text-green-500",
    negative: "bg-red-500/10 text-red-500",
    neutral: "bg-blue-500/10 text-blue-500",
  }[news.sentiment]

  return (
    <Link href={news.url} className="block" target="_blank" rel="noopener noreferrer">
      <div className="flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:bg-muted/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={sentimentColor}>
              {news.sentiment.charAt(0).toUpperCase() + news.sentiment.slice(1)}
            </Badge>
            <span className="text-sm text-muted-foreground">{news.source}</span>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            {timeAgo}
          </div>
        </div>
        <h3 className="font-semibold">{news.title}</h3>
        <div className="flex flex-wrap gap-2">
          {news.categories.map((category) => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  )
}

function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return `${diffInDays} days ago`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `${diffInMonths} months ago`
  }

  const diffInYears = Math.floor(diffInMonths / 12)
  return `${diffInYears} years ago`
}
