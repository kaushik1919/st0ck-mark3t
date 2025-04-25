import { createServerSupabaseClient } from "@/lib/supabase"

export type Recommendation = {
  id: string
  user_id: string
  recommendations: {
    symbol: string
    name: string
    price: number
    percentChange: number
    recommendation: "Strong Buy" | "Buy" | "Hold" | "Sell" | "Strong Sell"
    reason: string
    aiConfidence: number
    tags: string[]
  }[]
  created_at: string
}

export async function getUserRecommendations(userId: string): Promise<Recommendation | null> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("recommendations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (error) {
    if (error.code === "PGRST116") {
      // No rows returned
      return null
    }
    console.error("Error fetching recommendations:", error)
    return null
  }

  return data
}

export async function saveRecommendations(
  userId: string,
  recommendations: Recommendation["recommendations"],
): Promise<Recommendation | null> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("recommendations")
    .insert([
      {
        user_id: userId,
        recommendations,
      },
    ])
    .select()
    .single()

  if (error) {
    console.error("Error saving recommendations:", error)
    return null
  }

  return data
}
