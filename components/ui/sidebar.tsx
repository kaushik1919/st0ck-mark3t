"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Sidebar context
type SidebarContextType = {
  expanded: boolean
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
  toggleExpanded: () => void
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

function useSidebarContext() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("Sidebar components must be used within a SidebarProvider")
  }
  return context
}

// Sidebar provider
interface SidebarProviderProps {
  children: React.ReactNode
  defaultExpanded?: boolean
}

export function SidebarProvider({ children, defaultExpanded = true }: SidebarProviderProps) {
  const [expanded, setExpanded] = React.useState(defaultExpanded)

  const toggleExpanded = React.useCallback(() => {
    setExpanded((prev) => !prev)
  }, [])

  return <SidebarContext.Provider value={{ expanded, setExpanded, toggleExpanded }}>{children}</SidebarContext.Provider>
}

// Sidebar component
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Sidebar({ children, className, ...props }: SidebarProps) {
  const { expanded } = useSidebarContext()

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-sidebar-background text-sidebar-foreground transition-all duration-300",
        expanded ? "w-64" : "w-16",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Sidebar header
interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function SidebarHeader({ children, className, ...props }: SidebarHeaderProps) {
  return (
    <div className={cn("flex h-14 items-center border-b border-sidebar-border px-4", className)} {...props}>
      {children}
    </div>
  )
}

// Sidebar content
interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function SidebarContent({ children, className, ...props }: SidebarContentProps) {
  return (
    <div className={cn("flex-1 overflow-auto p-2", className)} {...props}>
      {children}
    </div>
  )
}

// Sidebar footer
interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function SidebarFooter({ children, className, ...props }: SidebarFooterProps) {
  return (
    <div className={cn("border-t border-sidebar-border p-2", className)} {...props}>
      {children}
    </div>
  )
}

// Sidebar group
interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function SidebarGroup({ children, className, ...props }: SidebarGroupProps) {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  )
}

// Sidebar group label
interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function SidebarGroupLabel({ children, className, ...props }: SidebarGroupLabelProps) {
  const { expanded } = useSidebarContext()

  if (!expanded) {
    return null
  }

  return (
    <div className={cn("mb-1 px-2 text-xs font-medium text-sidebar-foreground/60", className)} {...props}>
      {children}
    </div>
  )
}

// Sidebar group content
interface SidebarGroupContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function SidebarGroupContent({ children, className, ...props }: SidebarGroupContentProps) {
  return (
    <div className={cn("space-y-1", className)} {...props}>
      {children}
    </div>
  )
}

// Sidebar menu
interface SidebarMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode
}

export function SidebarMenu({ children, className, ...props }: SidebarMenuProps) {
  return (
    <ul className={cn("space-y-1", className)} {...props}>
      {children}
    </ul>
  )
}

// Sidebar menu item
interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode
}

export function SidebarMenuItem({ children, className, ...props }: SidebarMenuItemProps) {
  return (
    <li className={cn("", className)} {...props}>
      {children}
    </li>
  )
}

// Sidebar menu button
interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  isActive?: boolean
  tooltip?: string
  asChild?: boolean
}

export function SidebarMenuButton({
  children,
  className,
  isActive = false,
  tooltip,
  asChild = false,
  ...props
}: SidebarMenuButtonProps) {
  const { expanded } = useSidebarContext()

  if (asChild) {
    // When asChild is true, we need to clone the child element and pass props to it
    const child = React.Children.only(children) as React.ReactElement

    return React.cloneElement(child, {
      className: cn(
        "flex w-full items-center rounded-md px-2 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
        expanded ? "justify-start" : "justify-center",
        child.props.className,
        className,
      ),
      title: !expanded ? tooltip : undefined,
      ...props,
    })
  }

  return (
    <button
      className={cn(
        "flex w-full items-center rounded-md px-2 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
        expanded ? "justify-start" : "justify-center",
        className,
      )}
      title={!expanded ? tooltip : undefined}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === "span" && !expanded) {
            return null
          }
          return child
        }
        return child
      })}
    </button>
  )
}
