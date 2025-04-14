import React from "react";
import {
  Alert as MuiAlert,
  type AlertProps as MuiAlertProps,
  AlertTitle as MuiAlertTitle,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export interface AlertProps extends Omit<MuiAlertProps, "variant"> {
  variant?: "default" | "destructive";
}

const StyledAlert = styled(MuiAlert, {
  shouldForwardProp: (prop) => prop !== "variant",
})<{ variant?: "default" | "destructive" }>(({ theme, variant }) => ({
  borderRadius: theme.shape.borderRadius,
  ...(variant === "destructive" && {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.main,
    "& .MuiAlert-icon": {
      color: theme.palette.error.main,
    },
  }),
}));

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = "default", children, ...props }, ref) => {
    const muiSeverity =
      variant === "destructive" ? "error" : props.severity || "info";

    return (
      <StyledAlert
        ref={ref}
        severity={muiSeverity}
        {...props}
      >
        {children}
      </StyledAlert>
    );
  }
);
Alert.displayName = "Alert";

export interface AlertTitleProps {
  children: React.ReactNode;
}

export const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ children, ...props }, ref) => {
    return (
      <MuiAlertTitle ref={ref} {...props}>
        {children}
      </MuiAlertTitle>
    );
  }
);
AlertTitle.displayName = "AlertTitle";

export interface AlertDescriptionProps {
  children: React.ReactNode;
}

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  AlertDescriptionProps
>(({ children, ...props }, ref) => {
  return (
    <Typography variant="body2" component="div" ref={ref} {...props}>
      {children}
    </Typography>
  );
});
AlertDescription.displayName = "AlertDescription";
