import React from "react"
import {
  Table as MuiTable,
  type TableProps as MuiTableProps,
  TableHead as MuiTableHead,
  type TableHeadProps as MuiTableHeadProps,
  TableBody as MuiTableBody,
  type TableBodyProps as MuiTableBodyProps,
  TableRow as MuiTableRow,
  type TableRowProps as MuiTableRowProps,
  TableCell as MuiTableCell,
  type TableCellProps as MuiTableCellProps,
  Paper,
} from "@mui/material"

// Table
export interface TableProps extends MuiTableProps {}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(({ children, ...props }, ref) => {
  return (
    <Paper elevation={0} variant="outlined">
      <MuiTable ref={ref} {...props}>
        {children}
      </MuiTable>
    </Paper>
  )
})
Table.displayName = "Table"

// TableHeader
export interface TableHeaderProps extends MuiTableHeadProps {}

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ children, ...props }, ref) => {
    return (
      <MuiTableHead ref={ref} {...props}>
        {children}
      </MuiTableHead>
    )
  },
)
TableHeader.displayName = "TableHeader"

// TableBody
export interface TableBodyProps extends MuiTableBodyProps {}

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(({ children, ...props }, ref) => {
  return (
    <MuiTableBody ref={ref} {...props}>
      {children}
    </MuiTableBody>
  )
})
TableBody.displayName = "TableBody"

// TableRow
export interface TableRowProps extends MuiTableRowProps {}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(({ children, ...props }, ref) => {
  return (
    <MuiTableRow ref={ref} {...props}>
      {children}
    </MuiTableRow>
  )
})
TableRow.displayName = "TableRow"

// TableHead
export interface TableHeadProps extends MuiTableCellProps {}

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(({ children, ...props }, ref) => {
  return (
    <MuiTableCell ref={ref} variant="head" {...props}>
      {children}
    </MuiTableCell>
  )
})
TableHead.displayName = "TableHead"

// TableCell
export interface TableCellProps extends MuiTableCellProps {}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(({ children, ...props }, ref) => {
  return (
    <MuiTableCell ref={ref} {...props}>
      {children}
    </MuiTableCell>
  )
})
TableCell.displayName = "TableCell"
