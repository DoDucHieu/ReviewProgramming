import { Box, Toolbar } from '@mui/material'
import { useState } from 'react'
import Navbar from './Navbar'
import SideBar from './SideBar'

const drawerWidth = 250

type LayerProps = {
  children: React.ReactNode
}

export default function Layer({ children }: LayerProps) {
  const [open, setOpen] = useState(true)

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar open={open} drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />

      <SideBar drawerWidth={drawerWidth} open={open} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
