"use client"

import React, { useState } from "react"
import {
  Select as MuiSelect,
  type SelectProps as MuiSelectProps,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material"
import { styled } from "@mui/material/styles"

export interface SelectProps extends Omit<MuiSelectProps, "value" | "onChange"> {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  label?: string
  helperText?: string
  error?: boolean
}

const StyledFormControl = styled(FormControl)(() => ({
  minWidth: 120,
}))

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ value, onValueChange, placeholder, label, helperText, error, children, ...props }, ref) => {
    const [open, setOpen] = useState(false)

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      if (onValueChange) {
        onValueChange(event.target.value as string)
      }
    }

    const labelId = label ? `${label.replace(/\s+/g, "-").toLowerCase()}-label` : undefined

    return (
      <StyledFormControl fullWidth error={error} ref={ref}>
        {label && <InputLabel id={labelId}>{label}</InputLabel>}
        <MuiSelect
          labelId={labelId}
          value={value || ""}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={handleChange as any}
          displayEmpty={!!placeholder}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          label={label}
          {...props}
        >
          {placeholder && (
            <MenuItem value="" disabled>
              {placeholder}
            </MenuItem>
          )}
          {children}
        </MuiSelect>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </StyledFormControl>
    )
  },
)

Select.displayName = "Select"

export interface SelectItemProps {
  value: string
  children: React.ReactNode
  disabled?: boolean
}

export const SelectItem = React.forwardRef<HTMLLIElement, SelectItemProps>(
  ({ value, children, disabled, ...props }, ref) => {
    return (
      <MenuItem value={value} disabled={disabled} ref={ref} {...props}>
        {children}
      </MenuItem>
    )
  },
)

SelectItem.displayName = "SelectItem"

export interface SelectTriggerProps {
  children: React.ReactNode
  className?: string
}

export const SelectTrigger = React.forwardRef<HTMLDivElement, SelectTriggerProps>(({ children, ...props }, ref) => {
  // Este componente é apenas para compatibilidade com a API shadcn/ui
  // No MUI, o trigger é parte do Select
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  )
})

SelectTrigger.displayName = "SelectTrigger"

export interface SelectValueProps {
  placeholder?: string
}

export const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(({ placeholder }, ref) => {
  // Este componente é apenas para compatibilidade com a API shadcn/ui
  // No MUI, o value é parte do Select
  return <span ref={ref}>{placeholder}</span>
})

SelectValue.displayName = "SelectValue"

export interface SelectContentProps {
  children: React.ReactNode
}

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(({ children }, ref) => {
  // Este componente é apenas para compatibilidade com a API shadcn/ui
  // No MUI, o content é parte do Select
  return <div ref={ref}>{children}</div>
})

SelectContent.displayName = "SelectContent"
