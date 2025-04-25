"use client"

import type * as React from "react"
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
  XAxis,
  YAxis,
} from "recharts"
import { cn } from "@/lib/utils"

// Chart container
interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function ChartContainer({ children, className, ...props }: ChartContainerProps) {
  return (
    <div className={cn("h-full w-full", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
}

// Chart component
interface ChartProps {
  children: React.ReactNode
}

export function Chart({ children }: ChartProps) {
  return <ComposedChart margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>{children}</ComposedChart>
}

// Chart tooltip
interface ChartTooltipProps {
  content?: React.ReactNode | ((props: TooltipProps<any, any>) => React.ReactNode)
  className?: string
}

export function ChartTooltip({ content, className }: ChartTooltipProps) {
  return <Tooltip content={content} wrapperClassName={className} />
}

// Chart tooltip content
interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function ChartTooltipContent({ children, className, ...props }: ChartTooltipContentProps) {
  return (
    <div className={cn("rounded-lg border bg-background p-2 shadow-md", className)} {...props}>
      {children}
    </div>
  )
}

// Chart grid
interface ChartGridProps {
  strokeDasharray?: string
  vertical?: boolean
  horizontal?: boolean
  className?: string
}

export function ChartGrid({ strokeDasharray = "3 3", vertical = true, horizontal = true, className }: ChartGridProps) {
  return (
    <CartesianGrid
      strokeDasharray={strokeDasharray}
      vertical={vertical}
      horizontal={horizontal}
      className={cn("stroke-muted", className)}
    />
  )
}

// Chart line
interface ChartLineProps {
  dataKey: string
  name?: string
  stroke?: string
  strokeWidth?: number
  dot?: boolean | object
  activeDot?: boolean | object
  type?:
    | "basis"
    | "basisClosed"
    | "basisOpen"
    | "linear"
    | "linearClosed"
    | "natural"
    | "monotoneX"
    | "monotoneY"
    | "monotone"
    | "step"
    | "stepBefore"
    | "stepAfter"
  connectNulls?: boolean
  className?: string
}

export function ChartLine({
  dataKey,
  name,
  stroke,
  strokeWidth = 2,
  dot = false,
  activeDot = { r: 4 },
  type = "monotone",
  connectNulls = true,
  className,
  ...props
}: ChartLineProps) {
  return (
    <Line
      dataKey={dataKey}
      name={name}
      stroke={stroke}
      strokeWidth={strokeWidth}
      dot={dot}
      activeDot={activeDot}
      type={type}
      connectNulls={connectNulls}
      className={className}
      {...props}
    />
  )
}

// Chart area
interface ChartAreaProps {
  dataKey: string
  name?: string
  stroke?: string
  fill?: string
  fillOpacity?: number
  strokeWidth?: number
  type?:
    | "basis"
    | "basisClosed"
    | "basisOpen"
    | "linear"
    | "linearClosed"
    | "natural"
    | "monotoneX"
    | "monotoneY"
    | "monotone"
    | "step"
    | "stepBefore"
    | "stepAfter"
  connectNulls?: boolean
  className?: string
}

export function ChartArea({
  dataKey,
  name,
  stroke,
  fill,
  fillOpacity = 0.2,
  strokeWidth = 2,
  type = "monotone",
  connectNulls = true,
  className,
  ...props
}: ChartAreaProps) {
  return (
    <Area
      dataKey={dataKey}
      name={name}
      stroke={stroke}
      fill={fill}
      fillOpacity={fillOpacity}
      strokeWidth={strokeWidth}
      type={type}
      connectNulls={connectNulls}
      className={className}
      {...props}
    />
  )
}

// Chart bar
interface ChartBarProps {
  dataKey: string
  name?: string
  fill?: string
  fillOpacity?: number
  stroke?: string
  strokeWidth?: number
  radius?: number | [number, number, number, number]
  className?: string
}

export function ChartBar({
  dataKey,
  name,
  fill,
  fillOpacity = 1,
  stroke,
  strokeWidth = 0,
  radius = 4,
  className,
  ...props
}: ChartBarProps) {
  return (
    <Bar
      dataKey={dataKey}
      name={name}
      fill={fill}
      fillOpacity={fillOpacity}
      stroke={stroke}
      strokeWidth={strokeWidth}
      radius={radius}
      className={className}
      {...props}
    />
  )
}

// Chart X axis
interface ChartXAxisProps {
  dataKey: string
  name?: string
  axisLine?: boolean
  tickLine?: boolean
  tick?: boolean | React.ReactNode | ((props: any) => React.ReactNode)
  tickFormatter?: (value: any) => string
  className?: string
}

export function ChartXAxis({
  dataKey,
  name,
  axisLine = false,
  tickLine = false,
  tick = true,
  tickFormatter,
  className,
  ...props
}: ChartXAxisProps) {
  return (
    <XAxis
      dataKey={dataKey}
      name={name}
      axisLine={axisLine}
      tickLine={tickLine}
      tick={tick}
      tickFormatter={tickFormatter}
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

// Chart Y axis
interface ChartYAxisProps {
  name?: string
  axisLine?: boolean
  tickLine?: boolean
  tick?: boolean | React.ReactNode | ((props: any) => React.ReactNode)
  tickFormatter?: (value: any) => string
  className?: string
}

export function ChartYAxis({
  name,
  axisLine = false,
  tickLine = false,
  tick = true,
  tickFormatter,
  className,
  ...props
}: ChartYAxisProps) {
  return (
    <YAxis
      name={name}
      axisLine={axisLine}
      tickLine={tickLine}
      tick={tick}
      tickFormatter={tickFormatter}
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

// Chart legend
interface ChartLegendProps {
  align?: "left" | "center" | "right"
  verticalAlign?: "top" | "middle" | "bottom"
  layout?: "horizontal" | "vertical"
  iconType?: "line" | "square" | "rect" | "circle" | "cross" | "diamond" | "star" | "triangle" | "wye" | "none"
  iconSize?: number
  className?: string
}

export function ChartLegend({
  align = "right",
  verticalAlign = "top",
  layout = "horizontal",
  iconType = "circle",
  iconSize = 10,
  className,
  ...props
}: ChartLegendProps) {
  return (
    <Legend
      align={align}
      verticalAlign={verticalAlign}
      layout={layout}
      iconType={iconType}
      iconSize={iconSize}
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

// Chart legend item
interface ChartLegendItemProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  color: string
}

export function ChartLegendItem({ name, color, className, ...props }: ChartLegendItemProps) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-xs text-muted-foreground">{name}</span>
    </div>
  )
}
