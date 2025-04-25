import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function NewsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest Market News</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Card key={item} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">
                Tech Giant Reports Strong Q1 Earnings
              </CardTitle>
              <div className="text-sm text-gray-500">Financial Times • 2 hours ago</div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                The company reported better-than-expected earnings, driven by strong sales in their core products.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-green-600 font-medium">Bullish</span>
                <Button variant="outline" size="sm">
                  Read More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 