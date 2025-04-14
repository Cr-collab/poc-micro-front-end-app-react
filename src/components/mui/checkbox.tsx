"use client"

import React from "react"
import {
  Checkbox as MuiCheckbox,
  type CheckboxProps as MuiCheckboxProps,
  FormControlLabel,
  type FormControlLabelProps,
} from "@mui/material"
import { styled } from "@mui/material/styles"

export interface CheckboxProps extends Omit<MuiCheckboxProps, "checked"> {
  checked?: boolean | "indeterminate"
  onCheckedChange?: (checked: boolean | "indeterminate") => void
  label?: string
  labelProps?: Omit<FormControlLabelProps, "control" | "label">
}

const StyledCheckbox = styled(MuiCheckbox)(({ theme }) => ({
  color: theme.palette.text.secondary,
  "&.Mui-checked": {
    color: theme.palette.primary.main,
  },
}))

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, onCheckedChange, label, labelProps, ...props }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onCheckedChange) {
        onCheckedChange(event.target.checked)
      }
    }

    const checkbox = (
      <StyledCheckbox
        checked={checked === "indeterminate" ? false : checked}
        indeterminate={checked === "indeterminate"}
        onChange={handleChange}
        {...props}
      />
    )

    if (label) {
      return <FormControlLabel control={checkbox} label={label} {...labelProps} />
    }

    return checkbox
  },
)

Checkbox.displayName = "Checkbox"
