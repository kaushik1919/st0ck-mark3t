"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, BookOpen, Home, LineChart, LogOut, Newspaper, Search, Settings, User2 } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/use-auth"

export function AppSidebar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  const mainNavItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: Home,
    },
    {
      title: "Explore",
      href: "/explore",
      icon: Search,
    },
    {
      title: "Watchlist",
      href: "/watchlist",
      icon: LineChart,
    },
    {
      title: "Portfolio",
      href: "/portfolio",
      icon: BarChart3,
    },
    {
      title: "Learn",
      href: "/learn",
      icon: BookOpen,
    },
    {
      title: "News",
      href: "/news",
      icon: Newspaper,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="font-bold text-primary-foreground">SS</span>
          </div>
          <h1 className="text-xl font-bold gold-gradient">StockSage</h1>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon className={pathname === item.href ? "text-primary" : ""} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate">{user.name || "User"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User2 className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex flex-col gap-2">
            <Button asChild variant="default" className="w-full">
              <Link href="/auth/login">Log in</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/auth/signup">Sign up</Link>
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
