"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { getClientSupabaseClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

type User = {
  id: string
  email?: string
  name?: string
  image?: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = getClientSupabaseClient()

  // Check for session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Error getting session:", error)
          setLoading(false)
          return
        }

        if (session) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single()

          setUser({
            id: session.user.id,
            email: session.user.email,
            name: profile?.full_name || session.user.email?.split("@")[0] || "User",
            image: profile?.avatar_url || undefined,
          })
        }
      } catch (error) {
        console.error("Error checking session:", error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        try {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single()

          setUser({
            id: session.user.id,
            email: session.user.email,
            name: profile?.full_name || session.user.email?.split("@")[0] || "User",
            image: profile?.avatar_url || undefined,
          })
        } catch (error) {
          console.error("Error fetching profile:", error)
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null)
      }

      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        if (error.message === "Email not confirmed") {
          toast({
            title: "Email not confirmed",
            description: "Please check your email for a confirmation link before signing in.",
            variant: "destructive",
          })
          return
        }
        throw error
      }

      if (data.session) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.session.user.id)
          .single()

        setUser({
          id: data.session.user.id,
          email: data.session.user.email,
          name: profile?.full_name || data.session.user.email?.split("@")[0] || "User",
          image: profile?.avatar_url || undefined,
        })

        toast({
          title: "Success",
          description: "You have successfully logged in",
        })

        router.push("/")
      }
    } catch (error: any) {
      console.error("Sign in error:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to sign in",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
          emailRedirectTo: `${window.location.origin}/auth/login`,
        },
      })

      if (error) throw error

      if (data.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .upsert([
            {
              id: data.user.id,
              full_name: name,
              email: email,
              updated_at: new Date().toISOString(),
            },
          ])
          .select()

        if (profileError) {
          console.error("Profile creation error:", profileError)
        }

        toast({
          title: "Success",
          description: "Please check your email for a confirmation link to complete your registration.",
        })

        router.push("/auth/login")
      }
    } catch (error: any) {
      console.error("Sign up error:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      router.push("/auth/login")
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  return <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
