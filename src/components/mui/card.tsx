import React from "react"
import {
  Card as MuiCard,
  type CardProps as MuiCardProps,
  CardContent as MuiCardContent,
  type CardContentProps as MuiCardContentProps,
  CardHeader as MuiCardHeader,
  type CardHeaderProps as MuiCardHeaderProps,
  CardActions as MuiCardActions,
  type CardActionsProps as MuiCardActionsProps,
  Typography,
} from "@mui/material"

// Card
export interface CardProps extends MuiCardProps {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ children, ...props }, ref) => {
  return (
    <MuiCard ref={ref} {...props}>
      {children}
    </MuiCard>
  )
})
Card.displayName = "Card"

// CardHeader
export interface CardHeaderProps extends MuiCardHeaderProps {
  className?: string
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => {
  return <MuiCardHeader ref={ref} className={className} {...props} />
})
CardHeader.displayName = "CardHeader"

// CardTitle
export interface CardTitleProps {
  children: React.ReactNode
  className?: string
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Typography variant="h6" component="h3" ref={ref} className={className} {...props}>
        {children}
      </Typography>
    )
  },
)
CardTitle.displayName = "CardTitle"

// CardDescription
export interface CardDescriptionProps {
  children: React.ReactNode
  className?: string
}

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Typography variant="body2" color="text.secondary" ref={ref} className={className} {...props}>
        {children}
      </Typography>
    )
  },
)
CardDescription.displayName = "CardDescription"

// CardContent
export interface CardContentProps extends MuiCardContentProps {
  className?: string
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => {
  return <MuiCardContent ref={ref} className={className} {...props} />
})
CardContent.displayName = "CardContent"

// CardFooter
export interface CardFooterProps extends MuiCardActionsProps {
  className?: string
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ className, ...props }, ref) => {
  return <MuiCardActions ref={ref} className={className} {...props} />
})
CardFooter.displayName = "CardFooter"
