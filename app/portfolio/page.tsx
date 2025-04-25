import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const portfolioData = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 10,
    avgPrice: 150.25,
    currentPrice: 175.50,
    value: 1755.00,
    change: "+16.83%"
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    shares: 5,
    avgPrice: 280.75,
    currentPrice: 315.25,
    value: 1576.25,
    change: "+12.28%"
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    shares: 3,
    avgPrice: 125.50,
    currentPrice: 142.75,
    value: 428.25,
    change: "+13.74%"
  }
]

export default function PortfolioPage() {
  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0)
  const totalChange = "+14.28%"

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Portfolio</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
            <div className="text-green-600">{totalChange}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,759.50</div>
            <div className="text-gray-500">Initial investment</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Return</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+$1,000.00</div>
            <div className="text-gray-500">All time</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Shares</TableHead>
                <TableHead>Avg Price</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolioData.map((item) => (
                <TableRow key={item.symbol}>
                  <TableCell className="font-medium">{item.symbol}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.shares}</TableCell>
                  <TableCell>${item.avgPrice.toFixed(2)}</TableCell>
                  <TableCell>${item.currentPrice.toFixed(2)}</TableCell>
                  <TableCell>${item.value.toFixed(2)}</TableCell>
                  <TableCell className={item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                    {item.change}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 