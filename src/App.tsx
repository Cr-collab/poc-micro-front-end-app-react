"use client"

import type React from "react"

import { useState } from "react"

import { Search, ChevronDown, MoreVertical, Filter, Plus } from "lucide-react"
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  IconButton,
  Pagination,
  PaginationItem,
  Chip,
  Menu,
} from "@mui/material"

// Tipos de usuários
interface User {
  id: string
  name: string
  email: string
  phone: string
  type: string
  canViewMetrics: boolean
  status: "active" | "inactive" | "pending"
}

// Dados de exemplo
const initialUsers: User[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@empresa.com",
    phone: "(11) 98765-4321",
    type: "Administrador",
    canViewMetrics: true,
    status: "active",
  },
  {
    id: "2",
    name: "Maria Oliveira",
    email: "maria.oliveira@empresa.com",
    phone: "(11) 97654-3210",
    type: "Gerente",
    canViewMetrics: true,
    status: "active",
  },
  {
    id: "3",
    name: "Pedro Santos",
    email: "pedro.santos@empresa.com",
    phone: "(11) 96543-2109",
    type: "Operador",
    canViewMetrics: false,
    status: "inactive",
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana.costa@empresa.com",
    phone: "(11) 95432-1098",
    type: "Visualizador",
    canViewMetrics: true,
    status: "pending",
  },
  {
    id: "5",
    name: "Carlos Ferreira",
    email: "carlos.ferreira@empresa.com",
    phone: "(11) 94321-0987",
    type: "Administrador",
    canViewMetrics: true,
    status: "active",
  },
  {
    id: "6",
    name: "Fernanda Lima",
    email: "fernanda.lima@empresa.com",
    phone: "(11) 93210-9876",
    type: "Operador",
    canViewMetrics: false,
    status: "active",
  },
  {
    id: "7",
    name: "Ricardo Gomes",
    email: "ricardo.gomes@empresa.com",
    phone: "(11) 92109-8765",
    type: "Gerente",
    canViewMetrics: true,
    status: "active",
  },
  {
    id: "8",
    name: "Juliana Martins",
    email: "juliana.martins@empresa.com",
    phone: "(11) 91098-7654",
    type: "Visualizador",
    canViewMetrics: true,
    status: "active",
  },
  {
    id: "9",
    name: "Roberto Alves",
    email: "roberto.alves@empresa.com",
    phone: "(11) 90987-6543",
    type: "Operador",
    canViewMetrics: false,
    status: "inactive",
  },
]

export default function UsersPage() {
  const [users] = useState<User[]>(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchField, setSearchField] = useState("name")
  const [itemsPerPage, setItemsPerPage] = useState("9")
  const [currentPage, setCurrentPage] = useState(1)
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSelectedUserId] = useState<string | null>(null)
  const [isShow, setIsShow] =  useState<boolean>(false);

  // Filtrar usuários com base no termo de busca
  const filteredUsers = users.filter((user) => {
    if (!searchTerm) return true

    if (searchField === "name") {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase())
    } else if (searchField === "email") {
      return user.email.toLowerCase().includes(searchTerm.toLowerCase())
    } else if (searchField === "phone") {
      return user.phone.includes(searchTerm)
    } else if (searchField === "type") {
      return user.type.toLowerCase().includes(searchTerm.toLowerCase())
    }

    return true
  })

  // Paginação
  const totalPages = Math.ceil(filteredUsers.length / Number.parseInt(itemsPerPage))
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * Number.parseInt(itemsPerPage),
    currentPage * Number.parseInt(itemsPerPage),
  )

  // Manipuladores de menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, userId: string) => {
    setMenuAnchorEl(event.currentTarget)
    setSelectedUserId(userId)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
    setSelectedUserId(null)
  }

  // Renderizar chip de status
  const renderStatusChip = (status: string) => {
    let color: "success" | "default" | "warning" = "default"
    let label = ""

    switch (status) {
      case "active":
        color = "success"
        label = "Ativo"
        break
      case "inactive":
        color = "default"
        label = "Inativo"
        break
      case "pending":
        color = "warning"
        label = "Pendente"
        break
    }

    return (
      <Chip
        label={label}
        color={color}
        size="small"
        sx={{
          bgcolor:
            status === "active"
              ? "rgba(46, 125, 50, 0.1)"
              : status === "inactive"
                ? "rgba(158, 158, 158, 0.1)"
                : "rgba(237, 108, 2, 0.1)",
          color:
            status === "active" ? "rgb(46, 125, 50)" : status === "inactive" ? "rgb(97, 97, 97)" : "rgb(237, 108, 2)",
        }}
      />
    )
  }

  if(isShow){
    return <p>Test</p>
  }

  return (
    <Box sx={{ py: 3 , maxWidth: '100vw', minWidth: 'calc(100vw - 15px)',width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          bgcolor: "#FFF8F0",
          width: '95%',
          height: '50%',
        }}
      >
        <Box mb={2}>
          <Typography variant="h5" fontWeight={500}>
            Usuários da Loja
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Mantenha o cadastro dos usuários do aplicativo na sua loja
          </Typography>
        </Box>

        <Box display="flex" justifyContent="flex-start" mb={3}>
           Imagem Vaapt Logo
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { md: "flex-end" },
            justifyContent: "space-between",
            gap: 2,
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              width: "100%",
              maxWidth: { md: "70%" },
            }}
          >
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel id="search-field-label">Pesquisar por</InputLabel>
              <Select
                labelId="search-field-label"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
                label="Pesquisar por"
                size="small"
              >
                <MenuItem value="name">Nome</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="phone">Telefone</MenuItem>
                <MenuItem value="type">Tipo</MenuItem>
              </Select>
            </FormControl>

            <TextField
              placeholder="Descrição"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              fullWidth
              sx={{ maxWidth: { md: 300 } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search size={20} />
                  </InputAdornment>
                ),
              }}
            />

            <IconButton
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                p: 1,
                height: 40,
                width: 40,
              }}
            >
              <Filter size={20} />
            </IconButton>
          </Box>

          <Button
            variant="contained"
            startIcon={<Plus size={16} />}
            onClick={() => setIsShow(true)}
            sx={{
              bgcolor: "#FF7900",
              "&:hover": { bgcolor: "#E56C00" },
              whiteSpace: "nowrap",
            }}
          >
            Novo usuário
          </Button>
        </Box>

        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            mb: 3,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
          }}
        >
          <Table>
            <TableHead sx={{ bgcolor: "#FFF8F0" }}>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                    Nome
                    <ChevronDown size={16} style={{ marginLeft: 4 }} />
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                    Email
                    <ChevronDown size={16} style={{ marginLeft: 4 }} />
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                    Telefone
                    <ChevronDown size={16} style={{ marginLeft: 4 }} />
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                    Tipo
                    <ChevronDown size={16} style={{ marginLeft: 4 }} />
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>Visualizar Métricas</Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>Status</Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>Ação</Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.type}</TableCell>
                  <TableCell align="center">
                    <Checkbox checked={user.canViewMetrics} />
                  </TableCell>
                  <TableCell>{renderStatusChip(user.status)}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={(e) => handleMenuOpen(e, user.id)}>
                      <MoreVertical size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Itens por página:
            </Typography>
            <FormControl size="small" sx={{ minWidth: 70 }}>
              <Select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(e.target.value)}
                size="small"
                sx={{ height: 32 }}
              >
                <MenuItem value="9">9</MenuItem>
                <MenuItem value="18">18</MenuItem>
                <MenuItem value="27">27</MenuItem>
                <MenuItem value="36">36</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="body2" color="text.secondary">
              1-{paginatedUsers.length} de {filteredUsers.length} itens
            </Typography>
          </Box>

          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            shape="rounded"
            size="small"
            renderItem={(item) => (
              <PaginationItem
                {...item}
                sx={{
                  "&.Mui-selected": {
                    bgcolor: "#FF7900",
                    color: "white",
                    "&:hover": {
                      bgcolor: "#E56C00",
                    },
                  },
                }}
              />
            )}
          />
        </Box>
      </Paper>

      {/* Menu de ações */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleMenuClose}>Editar</MenuItem>
        <MenuItem onClick={handleMenuClose}>Resetar senha</MenuItem>
        <MenuItem onClick={handleMenuClose}>Excluir</MenuItem>
      </Menu>
    </Box>
  )
}
