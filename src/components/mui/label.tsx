import React from "react"
import { FormLabel, type FormLabelProps } from "@mui/material"
import { styled } from "@mui/material/styles"

export interface LabelProps extends FormLabelProps {
  htmlFor?: string
}

const StyledLabel = styled(FormLabel)(({ theme }) => ({
  fontSize: "0.875rem",
  fontWeight: 500,
  marginBottom: theme.spacing(1),
  display: "block",
}))

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ children, ...props }, ref) => {
  return (
    <StyledLabel ref={ref} {...props}>
      {children}
    </StyledLabel>
  )
})

Label.displayName = "Label"
