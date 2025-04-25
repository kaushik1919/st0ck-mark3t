import { createServerSupabaseClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

// Mock recommendations data
const mockRecommendations = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 189.84,
    percentChange: 1.31,
    recommendation: "Buy",
    reason: "Strong product lineup and services growth",
    aiConfidence: 85,
    tags: ["Technology", "Consumer Electronics"],
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 417.88,
    percentChange: 0.78,
    recommendation: "Strong Buy",
    reason: "Cloud growth and AI integration",
    aiConfidence: 92,
    tags: ["Technology", "Cloud", "AI"],
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 178.87,
    percentChange: -1.18,
    recommendation: "Buy",
    reason: "E-commerce dominance and AWS growth",
    aiConfidence: 88,
    tags: ["E-commerce", "Cloud", "Technology"],
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  const supabase = createServerSupabaseClient()

  // Check if we have recent recommendations
  const { data, error } = await supabase
    .from("recommendations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // If we have recent recommendations, return them
  if (data && data.length > 0) {
    return NextResponse.json(data[0].recommendations)
  }

  // Otherwise, generate new recommendations
  try {
    // In a real app, we would use the AI SDK to generate recommendations
    // For now, we'll use mock data

    // Save recommendations to database
    const { data: newRecs, error: saveError } = await supabase
      .from("recommendations")
      .insert([
        {
          user_id: userId,
          recommendations: mockRecommendations,
        },
      ])
      .select()
      .single()

    if (saveError) {
      return NextResponse.json({ error: saveError.message }, { status: 500 })
    }

    return NextResponse.json(mockRecommendations)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
