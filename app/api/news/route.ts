import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const symbol = searchParams.get("symbol")
    const limit = parseInt(searchParams.get("limit") || "5")

    // Mock news data
    const mockNews = [
      {
        title: "Tech Giant Reports Strong Q1 Earnings",
        url: "https://example.com/news/1",
        time_published: "20240220T093000",
        summary: "The company reported better-than-expected earnings, driven by strong sales in their core products.",
        source: "Financial Times",
        tickers: [
          {
            symbol: "AAPL",
            sentiment_score: 0.85,
            sentiment_label: "Bullish"
          }
        ]
      },
      {
        title: "Market Analysts Predict Growth in Tech Sector",
        url: "https://example.com/news/2",
        time_published: "20240220T103000",
        summary: "Leading analysts forecast continued growth in the technology sector despite market volatility.",
        source: "Bloomberg",
        tickers: [
          {
            symbol: "AAPL",
            sentiment_score: 0.75,
            sentiment_label: "Bullish"
          }
        ]
      },
      {
        title: "New Product Launch Expected to Boost Revenue",
        url: "https://example.com/news/3",
        time_published: "20240220T113000",
        summary: "The company's upcoming product launch is generating significant buzz among consumers and investors.",
        source: "CNBC",
        tickers: [
          {
            symbol: "AAPL",
            sentiment_score: 0.92,
            sentiment_label: "Bullish"
          }
        ]
      },
      {
        title: "Supply Chain Issues Impact Production",
        url: "https://example.com/news/4",
        time_published: "20240220T123000",
        summary: "Recent supply chain disruptions may affect production timelines for key products.",
        source: "Wall Street Journal",
        tickers: [
          {
            symbol: "AAPL",
            sentiment_score: -0.35,
            sentiment_label: "Bearish"
          }
        ]
      },
      {
        title: "Partnership Announcement with Major Tech Firm",
        url: "https://example.com/news/5",
        time_published: "20240220T133000",
        summary: "Strategic partnership expected to drive innovation and market expansion.",
        source: "Reuters",
        tickers: [
          {
            symbol: "AAPL",
            sentiment_score: 0.68,
            sentiment_label: "Bullish"
          }
        ]
      }
    ]

    // Filter by symbol if provided
    const filteredNews = symbol 
      ? mockNews.filter(item => 
          item.tickers.some(ticker => ticker.symbol === symbol)
        )
      : mockNews

    // Apply limit
    const limitedNews = filteredNews.slice(0, limit)

    return NextResponse.json({ data: limitedNews })
  } catch (error) {
    console.error("News API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    )
  }
}
