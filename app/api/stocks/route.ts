import { NextResponse } from "next/server"

// Mock stock data
const stocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 189.84, change: 2.45, percentChange: 1.31 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 417.88, change: 3.22, percentChange: 0.78 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 881.86, change: 23.45, percentChange: 2.73 },
  { symbol: "META", name: "Meta Platforms", price: 474.99, change: -8.56, percentChange: -1.77 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 168.29, change: -4.21, percentChange: -2.44 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 178.87, change: -2.13, percentChange: -1.18 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 156.37, change: -1.23, percentChange: -0.78 },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", price: 198.47, change: 1.23, percentChange: 0.62 },
  { symbol: "JNJ", name: "Johnson & Johnson", price: 147.89, change: -1.23, percentChange: -0.83 },
  { symbol: "WMT", name: "Walmart Inc.", price: 60.12, change: 0.45, percentChange: 0.75 },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get("symbol")
  const query = searchParams.get("query")

  // Return a specific stock by symbol
  if (symbol) {
    const stock = stocks.find((s) => s.symbol === symbol)
    if (!stock) {
      return NextResponse.json({ error: "Stock not found" }, { status: 404 })
    }
    return NextResponse.json(stock)
  }

  // Search stocks by query
  if (query) {
    const filteredStocks = stocks.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
        stock.name.toLowerCase().includes(query.toLowerCase()),
    )
    return NextResponse.json(filteredStocks)
  }

  // Return all stocks
  return NextResponse.json(stocks)
}
