import { useContext, useState } from 'react'

import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { Avatar, Badge, Box, Tooltip } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { AuthContext } from 'src/contexts/authContext/AuthContext'
import ProfilePage from 'src/pages/ProfilePage'

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
  drawerWidth: number
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: `calc(100% - ${theme.spacing(10)} - 1px)`,
  backgroundColor: theme.palette.background.default,
  boxShadow: 'none',

  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

type NavbarProps = {
  open: boolean
  drawerWidth: number
  handleDrawerToggle: () => void
}

export default function Navbar({ open, drawerWidth, handleDrawerToggle }: NavbarProps) {
  const { user } = useContext(AuthContext)

  const [openProfile, setOpenProfile] = useState(false)

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: 10 }} open={open} drawerWidth={drawerWidth}>
        <Toolbar>
          {/* <IconButton
            // color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              marginRight: 2,
              marginLeft: '-36px',
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.main',
              },
              width: '22px',
              height: '22px',
            }}
          >
            {open ? <KeyboardArrowLeftOutlinedIcon fontSize="small" /> : <ChevronRightOutlinedIcon fontSize="small" />}
          </IconButton> */}

          <Typography sx={{ color: 'black' }} variant="h6" noWrap component="h1">
            Welcome, {user.full_name}
          </Typography>

          <Box sx={{ marginLeft: 'auto' }} onClick={() => setOpenProfile(true)}>
            {/* <IconButton size="large" aria-label="show 17 new notifications" sx={{ marginRight: '8px' }}>
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}

            <Tooltip title="View profile">
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Avatar" src="/src/favicon.svg" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>

        <ProfilePage open={openProfile} onClose={() => setOpenProfile(false)} />
      </AppBar>
    </>
  )
}
