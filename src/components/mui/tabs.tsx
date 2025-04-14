"use client"

import React from "react"
import { Tabs as MuiTabs, type TabsProps as MuiTabsProps, Tab, type TabProps, Box } from "@mui/material"

// Tabs
export interface TabsProps extends Omit<MuiTabsProps, "value" | "onChange"> {
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ value, onValueChange, defaultValue, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || "")

    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
      setInternalValue(newValue)
      if (onValueChange) {
        onValueChange(newValue)
      }
    }

    const currentValue = value !== undefined ? value : internalValue

    return (
      <MuiTabs ref={ref} value={currentValue} onChange={handleChange} {...props}>
        {children}
      </MuiTabs>
    )
  },
)
Tabs.displayName = "Tabs"

// TabsList
export interface TabsListProps {
  children: React.ReactNode
  className?: string
}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(({ children, ...props }, ref) => {
  // No MUI, a lista de tabs é parte do componente Tabs
  // Este componente é apenas para compatibilidade com a API shadcn/ui
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  )
})
TabsList.displayName = "TabsList"

// TabsTrigger
export interface TabsTriggerProps extends Omit<TabProps, "value"> {
  value: string
  children: React.ReactNode
}

export const TabsTrigger = React.forwardRef<HTMLDivElement, TabsTriggerProps>(({ value, children, ...props }, ref) => {
  return <Tab ref={ref} value={value} label={children} {...props} />
})
TabsTrigger.displayName = "TabsTrigger"

// TabsContent
export interface TabsContentProps {
  value: string
  children: React.ReactNode
  className?: string
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(({ value, children, ...props }, ref) => {
  const tabContext = React.useContext(
    // @ts-ignore - MUI internal API
    React.createContext<{ value: string } | null>(null),
  )

  const isActive = tabContext?.value === value

  if (!isActive) return null

  return (
    <Box ref={ref} role="tabpanel" hidden={!isActive} {...props}>
      {children}
    </Box>
  )
})
TabsContent.displayName = "TabsContent"
