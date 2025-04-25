import { createClient } from "@supabase/supabase-js"

// Create a singleton instance of the Supabase client for client-side usage
let clientInstance: ReturnType<typeof createClient> | null = null

export function getClientSupabaseClient() {
  if (clientInstance) return clientInstance

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables:", {
      url: supabaseUrl,
      key: supabaseAnonKey ? "present" : "missing"
    })
    throw new Error("Missing Supabase environment variables")
  }

  try {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        emailConfirm: false
      }
    })
    return clientInstance
  } catch (error) {
    console.error("Error creating Supabase client:", error)
    throw error
  }
}

// Create a Supabase client for server-side usage
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing Supabase server environment variables")
    throw new Error("Missing Supabase server environment variables")
  }

  return createClient(supabaseUrl, supabaseServiceKey)
} 