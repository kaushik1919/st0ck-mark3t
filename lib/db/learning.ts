import { createServerSupabaseClient } from "@/lib/supabase"

export type LearningResource = {
  id: string
  title: string
  description: string | null
  content: string | null
  resource_type: "article" | "video" | "glossary"
  difficulty_level: "beginner" | "intermediate" | "advanced"
  tags: string[]
  created_at: string
  updated_at: string
}

export async function getLearningResources(
  type?: LearningResource["resource_type"],
  level?: LearningResource["difficulty_level"],
  limit = 20,
  offset = 0,
): Promise<LearningResource[]> {
  const supabase = createServerSupabaseClient()

  let query = supabase.from("learning_resources").select("*").order("created_at", { ascending: false })

  if (type) {
    query = query.eq("resource_type", type)
  }

  if (level) {
    query = query.eq("difficulty_level", level)
  }

  const { data, error } = await query.range(offset, offset + limit - 1)

  if (error) {
    console.error("Error fetching learning resources:", error)
    return []
  }

  return data || []
}

export async function getLearningResourceById(id: string): Promise<LearningResource | null> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("learning_resources").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching learning resource:", error)
    return null
  }

  return data
}
