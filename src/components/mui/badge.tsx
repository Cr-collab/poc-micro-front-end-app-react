import React from "react"
import { Badge as MuiBadge, type BadgeProps as MuiBadgeProps } from "@mui/material"
import { styled } from "@mui/material/styles"

export interface BadgeProps extends Omit<MuiBadgeProps, "variant"> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"
}

const StyledBadge = styled(MuiBadge, {
  shouldForwardProp: (prop) => prop !== "variant",
})<{ variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" }>(({ theme, variant }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    ...(variant === "default" && {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    }),
    ...(variant === "secondary" && {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    }),
    ...(variant === "destructive" && {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText,
    }),
    ...(variant === "outline" && {
      backgroundColor: "transparent",
      color: theme.palette.text.primary,
      border: `1px solid ${theme.palette.divider}`,
    }),
    ...(variant === "success" && {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.success.contrastText,
    }),
    ...(variant === "warning" && {
      backgroundColor: theme.palette.warning.main,
      color: theme.palette.warning.contrastText,
    }),
  },
}))

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", children, ...props }, ref) => {
    return (
      <StyledBadge ref={ref} variant={variant} {...props}>
        {children}
      </StyledBadge>
    )
  },
)

Badge.displayName = "Badge"
