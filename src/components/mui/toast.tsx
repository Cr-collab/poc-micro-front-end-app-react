"use client"

import React from "react"
import { Snackbar, type SnackbarProps, Alert, type AlertProps, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

// Toast (Snackbar no MUI)
export interface ToastProps extends Omit<SnackbarProps, "open"> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  variant?: "default" | "destructive"
  title?: string
  description?: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledSnackbar = styled(Snackbar)(() => ({
  "& .MuiAlert-root": {
    width: "100%",
  },
}))

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ open, onOpenChange, variant = "default", title, description, children, ...props }, ref) => {
    const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") return
      if (onOpenChange) {
        onOpenChange(false)
      }
    }

    const severity: AlertProps["severity"] = variant === "destructive" ? "error" : "success"

    return (
      <StyledSnackbar
        ref={ref}
        open={open}
        onClose={handleClose}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        {...props}
      >
        <Alert severity={severity} onClose={handleClose}>
          {title && <Typography variant="subtitle2">{title}</Typography>}
          {description && <Typography variant="body2">{description}</Typography>}
          {children}
        </Alert>
      </StyledSnackbar>
    )
  },
)

Toast.displayName = "Toast"

// Toaster (Provider para os toasts)
export interface ToasterProps {
  children?: React.ReactNode
}

export const Toaster: React.FC<ToasterProps> = ({ children }) => {
  // No MUI, não há um provider específico para toasts
  // Este componente é apenas para compatibilidade com a API shadcn/ui
  return <>{children}</>
}

// Hook para usar o toast
export interface UseToastOptions {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
}

export interface UseToastReturn {
  toast: (options: UseToastOptions) => void
  dismiss: (toastId?: string) => void
}

// Estado global para os toasts
const toastState = {
  open: false,
  options: {} as UseToastOptions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setOpen: (_: boolean) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setOptions: (_: UseToastOptions) => {},
}


// Componente para renderizar os toasts
export const ToastViewport: React.FC = () => {
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState<UseToastOptions>({})

  // Sincroniza com o estado global
  React.useEffect(() => {
    toastState.open = open
    toastState.options = options
    toastState.setOpen = setOpen
    toastState.setOptions = setOptions
  }, [open, options])

  return (
    <Toast
      open={open}
      onOpenChange={setOpen}
      title={options.title}
      description={options.description}
      variant={options.variant}
      autoHideDuration={options.duration || 6000}
    />
  )
}
