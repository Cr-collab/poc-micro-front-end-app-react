import React from "react"
import { TextField, type TextFieldProps } from "@mui/material"
import { styled } from "@mui/material/styles"

export interface InputProps extends Omit<TextFieldProps, "variant"> {
  // Adicionar propriedades específicas do shadcn/ui se necessário
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius,
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
  },
  "& .MuiInputBase-input": {
    padding: "10px 14px",
  },
}))

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  return <StyledTextField variant="outlined" fullWidth size="small" inputRef={ref} {...props} />
})

Input.displayName = "Input"
