import { createServerSupabaseClient } from "@/lib/supabase"

export type Portfolio = {
  id: string
  user_id: string
  name: string
  created_at: string
  updated_at: string
}

export type PortfolioPosition = {
  id: string
  portfolio_id: string
  symbol: string
  quantity: number
  average_price: number
  created_at: string
  updated_at: string
}

export type Transaction = {
  id: string
  portfolio_id: string
  symbol: string
  transaction_type: "buy" | "sell"
  quantity: number
  price: number
  total_amount: number
  transaction_date: string
  notes: string | null
}

export type PortfolioWithPositions = Portfolio & {
  positions: PortfolioPosition[]
}

export async function getUserPortfolios(userId: string): Promise<Portfolio[]> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching portfolios:", error)
    return []
  }

  return data || []
}

export async function getPortfolioWithPositions(portfolioId: string): Promise<PortfolioWithPositions | null> {
  const supabase = createServerSupabaseClient()

  // First get the portfolio
  const { data: portfolio, error: portfolioError } = await supabase
    .from("portfolios")
    .select("*")
    .eq("id", portfolioId)
    .single()

  if (portfolioError) {
    console.error("Error fetching portfolio:", portfolioError)
    return null
  }

  // Then get the positions
  const { data: positions, error: positionsError } = await supabase
    .from("portfolio_positions")
    .select("*")
    .eq("portfolio_id", portfolioId)

  if (positionsError) {
    console.error("Error fetching portfolio positions:", positionsError)
    return null
  }

  return {
    ...portfolio,
    positions: positions || [],
  }
}

export async function createPortfolio(userId: string, name: string): Promise<Portfolio | null> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("portfolios")
    .insert([{ user_id: userId, name }])
    .select()
    .single()

  if (error) {
    console.error("Error creating portfolio:", error)
    return null
  }

  return data
}

export async function addTransaction(transaction: Omit<Transaction, "id">): Promise<Transaction | null> {
  const supabase = createServerSupabaseClient()

  // First add the transaction
  const { data: newTransaction, error: transactionError } = await supabase
    .from("transactions")
    .insert([transaction])
    .select()
    .single()

  if (transactionError) {
    console.error("Error adding transaction:", transactionError)
    return null
  }

  // Then update the portfolio position
  const { data: existingPosition, error: positionError } = await supabase
    .from("portfolio_positions")
    .select("*")
    .eq("portfolio_id", transaction.portfolio_id)
    .eq("symbol", transaction.symbol)
    .single()

  if (positionError && positionError.code !== "PGRST116") {
    // PGRST116 is "no rows returned"
    console.error("Error checking existing position:", positionError)
    return null
  }

  // Calculate new position
  if (existingPosition) {
    // Update existing position
    const newQuantity =
      transaction.transaction_type === "buy"
        ? existingPosition.quantity + transaction.quantity
        : existingPosition.quantity - transaction.quantity

    // If selling all shares, remove the position
    if (newQuantity <= 0) {
      await supabase.from("portfolio_positions").delete().eq("id", existingPosition.id)
    } else {
      // Otherwise update the position with new average price
      const newTotalValue =
        existingPosition.quantity * existingPosition.average_price +
        (transaction.transaction_type === "buy" ? transaction.total_amount : -transaction.total_amount)

      await supabase
        .from("portfolio_positions")
        .update({
          quantity: newQuantity,
          average_price: newTotalValue / newQuantity,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingPosition.id)
    }
  } else if (transaction.transaction_type === "buy") {
    // Create new position if buying
    await supabase.from("portfolio_positions").insert([
      {
        portfolio_id: transaction.portfolio_id,
        symbol: transaction.symbol,
        quantity: transaction.quantity,
        average_price: transaction.price,
      },
    ])
  }

  return newTransaction
}

export async function getPortfolioTransactions(portfolioId: string, limit = 20, offset = 0): Promise<Transaction[]> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("portfolio_id", portfolioId)
    .order("transaction_date", { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error("Error fetching transactions:", error)
    return []
  }

  return data || []
}
