import React from "react"
import { Button as MuiButton, type ButtonProps as MuiButtonProps } from "@mui/material"
import { styled } from "@mui/material/styles"

export interface ButtonProps extends Omit<MuiButtonProps, "variant"> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

// Styled components para diferentes variantes
const DefaultButton = styled(MuiButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}))

const DestructiveButton = styled(MuiButton)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.error.dark,
  },
}))

const OutlineButton = styled(MuiButton)(({ theme }) => ({
  backgroundColor: "transparent",
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}))

const SecondaryButton = styled(MuiButton)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
}))

const GhostButton = styled(MuiButton)(({ theme }) => ({
  backgroundColor: "transparent",
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}))

const LinkButton = styled(MuiButton)(({ theme }) => ({
  backgroundColor: "transparent",
  color: theme.palette.primary.main,
  padding: 0,
  "&:hover": {
    backgroundColor: "transparent",
    textDecoration: "underline",
  },
}))

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", asChild, children, ...props }, ref) => {
    // Mapear tamanhos para equivalentes MUI
    const muiSize = size === "sm" ? "small" : size === "lg" ? "large" : "medium"

    // Se asChild for true, apenas renderizar os filhos (comportamento similar ao Radix)
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, { ...props, ref })
    }

    // Renderizar o botão com base na variante
    switch (variant) {
      case "destructive":
        return (
          <DestructiveButton ref={ref} size={muiSize} {...props}>
            {children}
          </DestructiveButton>
        )
      case "outline":
        return (
          <OutlineButton ref={ref} size={muiSize} variant="outlined" {...props}>
            {children}
          </OutlineButton>
        )
      case "secondary":
        return (
          <SecondaryButton ref={ref} size={muiSize} {...props}>
            {children}
          </SecondaryButton>
        )
      case "ghost":
        return (
          <GhostButton ref={ref} size={muiSize} {...props}>
            {children}
          </GhostButton>
        )
      case "link":
        return (
          <LinkButton ref={ref} size={muiSize} {...props}>
            {children}
          </LinkButton>
        )
      default:
        return (
          <DefaultButton ref={ref} size={muiSize} variant="contained" {...props}>
            {children}
          </DefaultButton>
        )
    }
  },
)

Button.displayName = "Button"
