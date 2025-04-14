import React from "react"
import { TextField, type TextFieldProps } from "@mui/material"
import { styled } from "@mui/material/styles"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TextareaProps extends Omit<TextFieldProps, "variant"> {
  // Adicionar propriedades específicas do shadcn/ui se necessário
}

const StyledTextarea = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius,
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
  },
}))

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ ...props }, ref) => {
  return <StyledTextarea variant="outlined" fullWidth multiline rows={4} inputRef={ref} {...props} />
})

Textarea.displayName = "Textarea"
