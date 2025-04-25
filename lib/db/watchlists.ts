import { createServerSupabaseClient } from "@/lib/supabase"

export type Watchlist = {
  id: string
  user_id: string
  name: string
  created_at: string
  updated_at: string
}

export type WatchlistItem = {
  id: string
  watchlist_id: string
  symbol: string
  added_at: string
}

export type WatchlistWithItems = Watchlist & {
  items: WatchlistItem[]
}

export async function getUserWatchlists(userId: string): Promise<Watchlist[]> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("watchlists")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching watchlists:", error)
    return []
  }

  return data || []
}

export async function getWatchlistWithItems(watchlistId: string): Promise<WatchlistWithItems | null> {
  const supabase = createServerSupabaseClient()

  // First get the watchlist
  const { data: watchlist, error: watchlistError } = await supabase
    .from("watchlists")
    .select("*")
    .eq("id", watchlistId)
    .single()

  if (watchlistError) {
    console.error("Error fetching watchlist:", watchlistError)
    return null
  }

  // Then get the items
  const { data: items, error: itemsError } = await supabase
    .from("watchlist_items")
    .select("*")
    .eq("watchlist_id", watchlistId)

  if (itemsError) {
    console.error("Error fetching watchlist items:", itemsError)
    return null
  }

  return {
    ...watchlist,
    items: items || [],
  }
}

export async function createWatchlist(userId: string, name: string): Promise<Watchlist | null> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("watchlists")
    .insert([{ user_id: userId, name }])
    .select()
    .single()

  if (error) {
    console.error("Error creating watchlist:", error)
    return null
  }

  return data
}

export async function addToWatchlist(watchlistId: string, symbol: string): Promise<WatchlistItem | null> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("watchlist_items")
    .insert([{ watchlist_id: watchlistId, symbol }])
    .select()
    .single()

  if (error) {
    console.error("Error adding to watchlist:", error)
    return null
  }

  return data
}

export async function removeFromWatchlist(watchlistId: string, symbol: string): Promise<boolean> {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("watchlist_items").delete().eq("watchlist_id", watchlistId).eq("symbol", symbol)

  if (error) {
    console.error("Error removing from watchlist:", error)
    return false
  }

  return true
}
