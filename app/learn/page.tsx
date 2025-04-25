import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const learningResources = [
  {
    title: "Stock Market Basics",
    description: "Learn the fundamentals of stock market investing, including key terms and concepts.",
    level: "Beginner",
    duration: "30 min"
  },
  {
    title: "Technical Analysis",
    description: "Understand charts, patterns, and indicators used in technical analysis.",
    level: "Intermediate",
    duration: "45 min"
  },
  {
    title: "Fundamental Analysis",
    description: "Learn how to analyze company financials and make informed investment decisions.",
    level: "Advanced",
    duration: "60 min"
  },
  {
    title: "Risk Management",
    description: "Discover strategies to protect your investments and manage portfolio risk.",
    level: "Intermediate",
    duration: "40 min"
  }
]

export default function LearnPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Learning Resources</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {learningResources.map((resource, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{resource.title}</CardTitle>
              <div className="flex gap-2 text-sm text-gray-500">
                <span>{resource.level}</span>
                <span>•</span>
                <span>{resource.duration}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <Button>Start Learning</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 