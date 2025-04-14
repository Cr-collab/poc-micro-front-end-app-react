"use client";

import React, { useState, useRef } from "react";
import {
  Menu,
  MenuItem,
  Button,
  Divider,
  Typography,
  Box,
  type MenuProps,
  type MenuItemProps,
  styled,
} from "@mui/material";

// Styled components para manter a aparência consistente
const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: theme.shape.borderRadius,
    minWidth: 180,
    boxShadow: theme.shadows[3],
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: "0.875rem",
  padding: "8px 16px",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.action.selected,
    "&:hover": {
      backgroundColor: theme.palette.action.selected,
    },
  },
}));

// DropdownMenu (container principal)
export interface DropdownMenuProps {
  children: React.ReactNode;
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const triggerRef = useRef<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Clonar os filhos para passar as props necessárias
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === DropdownMenuTrigger) {
        return React.cloneElement(child, {
          onClick: handleOpen,
          ref: triggerRef,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
      }
      if (child.type === DropdownMenuContent) {
        return React.cloneElement(child, {
          anchorEl,
          open,
          onClose: handleClose,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
      }
      return child;
    }
    return child;
  });

  return <>{childrenWithProps}</>;
}

// DropdownMenuTrigger
export interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const DropdownMenuTrigger = React.forwardRef<
  HTMLElement,
  DropdownMenuTriggerProps
>(({ children, asChild, onClick }, ref) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick,
      ref,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  }

  return (
    <Button
      ref={ref as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      variant="text"
      size="small"
      sx={{ minWidth: "auto" }}
    >
      {children}
    </Button>
  );
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

// DropdownMenuContent
export interface DropdownMenuContentProps extends Omit<MenuProps, "children"> {
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
  className?: string;
}

export function DropdownMenuContent({
  children,
  align = "center",
  sideOffset = 4,
  alignOffset = 0,
  className,
  ...props
}: DropdownMenuContentProps) {
  // Mapear o alinhamento para as props do MUI
  const anchorOrigin = {
    vertical: "bottom" as const,
    horizontal:
      align === "start"
        ? ("left" as const)
        : align === "end"
        ? ("right" as const)
        : ("center" as const),
  };

  const transformOrigin = {
    vertical: "top" as const,
    horizontal:
      align === "start"
        ? ("left" as const)
        : align === "end"
        ? ("right" as const)
        : ("center" as const),
  };

  return (
    <StyledMenu
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      {...props}
      sx={{
        mt: sideOffset / 8, // Convertendo para o sistema de espaçamento do MUI
        ml: alignOffset / 8,
        ...props.sx,
      }}
      className={className}
    >
      {children}
    </StyledMenu>
  );
}

// DropdownMenuItem
export interface DropdownMenuItemProps extends Omit<MenuItemProps, "onClick"> {
  children: React.ReactNode;
  inset?: boolean;
  className?: string;
}

export function DropdownMenuItem({
  children,
  inset,
  className,
  ...props
}: DropdownMenuItemProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClick = (_: React.MouseEvent<HTMLElement>) => {};

  return (
    <StyledMenuItem
      onClick={handleClick}
      {...props}
      sx={{
        pl: inset ? 6 : undefined,
        ...props.sx,
      }}
      className={className}
    >
      {children}
    </StyledMenuItem>
  );
}

// DropdownMenuLabel
export interface DropdownMenuLabelProps {
  children: React.ReactNode;
  inset?: boolean;
  className?: string;
}

export function DropdownMenuLabel({
  children,
  inset,
  className,
}: DropdownMenuLabelProps) {
  return (
    <Box
      sx={{
        padding: "6px 12px",
        fontSize: "0.75rem",
        fontWeight: 500,
        color: "text.secondary",
        pl: inset ? 6 : undefined,
      }}
      className={className}
    >
      <Typography variant="caption" fontWeight="medium" color="text.secondary">
        {children}
      </Typography>
    </Box>
  );
}

// DropdownMenuSeparator
export interface DropdownMenuSeparatorProps {
  className?: string;
}

export function DropdownMenuSeparator({
  className,
}: DropdownMenuSeparatorProps) {
  return <Divider className={className} />;
}

// Exportar todos os componentes
