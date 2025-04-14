"use client"

import React from "react"
import {
  Dialog as MuiDialog,
  type DialogProps as MuiDialogProps,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material"

// Dialog
export interface DialogProps extends MuiDialogProps {
  onOpenChange?: (open: boolean) => void
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ children, open, onOpenChange, ...props }, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-object-type
    const handleClose = (_: {}, reason: "backdropClick" | "escapeKeyDown") => {
      if (onOpenChange) {
        onOpenChange(false)
      }
    }

    return (
      <MuiDialog ref={ref} open={open || false} onClose={handleClose} {...props}>
        {children}
      </MuiDialog>
    )
  },
)
Dialog.displayName = "Dialog"

// DialogTrigger
export interface DialogTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

export const DialogTrigger = React.forwardRef<HTMLDivElement, DialogTriggerProps>(({ children, asChild }, ref) => {
  // Este componente é apenas para compatibilidade com a API shadcn/ui
  // No MUI, o trigger é geralmente um botão que controla o estado do Dialog
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children)
  }
  return <div ref={ref}>{children}</div>
})
DialogTrigger.displayName = "DialogTrigger"

// DialogContent
export interface DialogContentProps {
  children: React.ReactNode
  className?: string
}

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(({ children, ...props }, ref) => {
  return (
    <MuiDialogContent ref={ref} {...props}>
      {children}
    </MuiDialogContent>
  )
})
DialogContent.displayName = "DialogContent"

// DialogHeader
export interface DialogHeaderProps {
  children: React.ReactNode
  className?: string
}

export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  )
})
DialogHeader.displayName = "DialogHeader"

// DialogTitle
export interface DialogTitleProps {
  children: React.ReactNode
}

export const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(({ children, ...props }, ref) => {
  return (
    <MuiDialogTitle ref={ref} {...props}>
      {children}
    </MuiDialogTitle>
  )
})
DialogTitle.displayName = "DialogTitle"

// DialogDescription
export interface DialogDescriptionProps {
  children: React.ReactNode
}

export const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ children, ...props }, ref) => {
    return (
      <DialogContentText ref={ref} {...props}>
        {children}
      </DialogContentText>
    )
  },
)
DialogDescription.displayName = "DialogDescription"

// DialogFooter
export interface DialogFooterProps {
  children: React.ReactNode
  className?: string
}

export const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(({ children, ...props }, ref) => {
  return (
    <DialogActions ref={ref} {...props}>
      {children}
    </DialogActions>
  )
})
DialogFooter.displayName = "DialogFooter"
