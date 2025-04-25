import { createServerSupabaseClient } from "@/lib/supabase"

export type Profile = {
  id: string
  full_name: string | null
  avatar_url: string | null
  risk_tolerance: string
  investment_style: string
  preferred_sectors: string[]
  notification_settings: {
    email: boolean
    push: boolean
    price_alerts: boolean
  }
  theme: string
  created_at: string
  updated_at: string
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) {
    console.error("Error fetching profile:", error)
    return null
  }

  return data
}

export async function updateProfile(userId: string, profile: Partial<Profile>): Promise<Profile | null> {
  const supabase = createServerSupabaseClient()

  // Add updated_at timestamp
  const updatedProfile = {
    ...profile,
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase.from("profiles").update(updatedProfile).eq("id", userId).select().single()

  if (error) {
    console.error("Error updating profile:", error)
    return null
  }

  return data
}

export async function createProfile(profile: Partial<Profile>): Promise<Profile | null> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("profiles").insert([profile]).select().single()

  if (error) {
    console.error("Error creating profile:", error)
    return null
  }

  return data
}
