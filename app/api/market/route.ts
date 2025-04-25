import { NextResponse } from "next/server"

// Mock market data
const marketIndices = {
  sp500: {
    name: "S&P 500",
    value: 4927.11,
    change: 18.56,
    percentChange: 0.38,
    data: [
      { date: "2023-04-01", value: 4200 },
      { date: "2023-05-01", value: 4250 },
      { date: "2023-06-01", value: 4300 },
      { date: "2023-07-01", value: 4350 },
      { date: "2023-08-01", value: 4400 },
      { date: "2023-09-01", value: 4450 },
      { date: "2023-10-01", value: 4500 },
      { date: "2023-11-01", value: 4550 },
      { date: "2023-12-01", value: 4600 },
      { date: "2024-01-01", value: 4650 },
      { date: "2024-02-01", value: 4700 },
      { date: "2024-03-01", value: 4750 },
      { date: "2024-04-01", value: 4800 },
    ],
  },
  dowjones: {
    name: "Dow Jones",
    value: 38239.66,
    change: -45.89,
    percentChange: -0.12,
    data: [
      { date: "2023-04-01", value: 34000 },
      { date: "2023-05-01", value: 34200 },
      { date: "2023-06-01", value: 34500 },
      { date: "2023-07-01", value: 34700 },
      { date: "2023-08-01", value: 34900 },
      { date: "2023-09-01", value: 35100 },
      { date: "2023-10-01", value: 35300 },
      { date: "2023-11-01", value: 35500 },
      { date: "2023-12-01", value: 35700 },
      { date: "2024-01-01", value: 35900 },
      { date: "2024-02-01", value: 36100 },
      { date: "2024-03-01", value: 36300 },
      { date: "2024-04-01", value: 36500 },
    ],
  },
  nasdaq: {
    name: "Nasdaq",
    value: 15927.9,
    change: 88.32,
    percentChange: 0.56,
    data: [
      { date: "2023-04-01", value: 14000 },
      { date: "2023-05-01", value: 14200 },
      { date: "2023-06-01", value: 14500 },
      { date: "2023-07-01", value: 14700 },
      { date: "2023-08-01", value: 14900 },
      { date: "2023-09-01", value: 15100 },
      { date: "2023-10-01", value: 15300 },
      { date: "2023-11-01", value: 15500 },
      { date: "2023-12-01", value: 15700 },
      { date: "2024-01-01", value: 15900 },
      { date: "2024-02-01", value: 16100 },
      { date: "2024-03-01", value: 16300 },
      { date: "2024-04-01", value: 16500 },
    ],
  },
  russell2000: {
    name: "Russell 2000",
    value: 2063.37,
    change: 4.32,
    percentChange: 0.21,
    data: [
      { date: "2023-04-01", value: 1800 },
      { date: "2023-05-01", value: 1820 },
      { date: "2023-06-01", value: 1840 },
      { date: "2023-07-01", value: 1860 },
      { date: "2023-08-01", value: 1880 },
      { date: "2023-09-01", value: 1900 },
      { date: "2023-10-01", value: 1920 },
      { date: "2023-11-01", value: 1940 },
      { date: "2023-12-01", value: 1960 },
      { date: "2024-01-01", value: 1980 },
      { date: "2024-02-01", value: 2000 },
      { date: "2024-03-01", value: 2020 },
      { date: "2024-04-01", value: 2040 },
    ],
  },
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const index = searchParams.get("index")

  // Return a specific index
  if (index && index in marketIndices) {
    return NextResponse.json(marketIndices[index as keyof typeof marketIndices])
  }

  // Return all indices
  return NextResponse.json(marketIndices)
}
