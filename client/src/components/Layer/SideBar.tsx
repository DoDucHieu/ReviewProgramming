import { useState, useContext } from 'react'

// MUI COMPONENTS
import { Box, Collapse } from '@mui/material'
import MuiDrawer, { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { CSSObject, styled, Theme } from '@mui/material/styles'
import LogoutIcon from '@mui/icons-material/Logout'

// MUI ICONS
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import LogoDevOutlinedIcon from '@mui/icons-material/LogoDevOutlined'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

// REACT-ROUTER-DOM
import { NavLink } from 'react-router-dom'

import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from '@mui/icons-material'
import { logout } from 'src/contexts/authContext/apiCall'
import { AuthContext } from 'src/contexts/authContext/AuthContext'

const openedMixin = (theme: Theme, drawerWidth: number): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
})

interface DrawerProps extends MuiDrawerProps {
  drawerWidth: number
}

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })<DrawerProps>(
  ({ theme, open, drawerWidth }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme, drawerWidth),
      '& .MuiDrawer-paper': openedMixin(theme, drawerWidth),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
)

type SideBarProps = {
  drawerWidth: number
  open: boolean
}

const SIDEBAR_TOP = [
  {
    text: 'Trang chủ',
    icon: <HomeOutlinedIcon />,
    path: '/',
  },
  {
    text: 'Lớp học',
    icon: <SchoolOutlinedIcon />,
    path: '/classes',
  },
  {
    text: 'Thời khóa biểu',
    icon: <CalendarTodayIcon fontSize="small" />,
    path: '/schedule',
    except: 'r1',
  },
  {
    text: 'Đăng ký học phần',
    icon: <SchoolOutlinedIcon />,
    path: '/register-course',
    except: ['r1', 'r2'],
  },
  // {
  //   text: 'Tài khoản',
  //   icon: <AdminPanelSettingsOutlinedIcon />,
  //   path: '/user-management',
  // },
]

const MANAGEMENT_ITEMS = [
  {
    text: 'Giảng viên',
    // icon: <HomeOutlinedIcon />,
    path: '/user-management/teacher',
  },
  {
    text: 'Sinh viên',
    // icon: <SchoolOutlinedIcon />,
    path: '/user-management/student',
  },
  {
    text: 'Lớp học',
    // icon: <AdminPanelSettingsOutlinedIcon />,
    path: '/user-management/classes',
  },
  {
    text: 'Môn học',
    // icon: <AdminPanelSettingsOutlinedIcon />,
    path: '/user-management/subjects',
  },
  {
    text: 'Chuyên khoa',
    // icon: <AdminPanelSettingsOutlinedIcon />,
    path: '/user-management/specialties',
  },
]

const StyledNavLink = styled(NavLink)(() => ({
  textDecoration: 'none',
  color: 'inherit',

  '&.active > .MuiListItemButton-root': {
    color: 'white',
    backgroundColor: '#7070d8',
  },

  '&.active .MuiSvgIcon-root': {
    color: 'white',
  },

  '& > .MuiListItemButton-root': {
    margin: '8px 0',
  },
}))

const StyledCollapseNavLink = styled(NavLink)(() => ({
  textDecoration: 'none',
  color: 'inherit',

  '&.active .MuiTypography-root': {
    fontWeight: 700,
  },

  '& > .MuiListItemButton-root': {
    padding: '6px 0',
    paddingLeft: '56px',
  },

  '& > .MuiListItemButton-root:hover': {
    backgroundColor: 'transparent',
  },
}))

export default function SideBar({ drawerWidth, open }: SideBarProps) {
  const { dispatch, user } = useContext(AuthContext)

  const [openCollapseItem, setOpenCollapseItem] = useState(true)

  return (
    <Drawer variant="permanent" open={open} drawerWidth={drawerWidth}>
      <List
        sx={{ px: 1, pt: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
      >
        {/* TOP SIDEBAR ITEMS */}
        <Box>
          {/* HEADER SIDEBAR */}
          <ListItemButton
            disableRipple={true}
            sx={{
              minHeight: 44,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              borderRadius: 2,
              mb: 2,
              '&:hover': {
                cursor: 'default',
                backgroundColor: 'transparent',
              },
            }}
          >
            <ListItemIcon
              sx={{
                ...(open && { ml: -2 }),
                justifyContent: 'center',
                color: '#4a49cb',
              }}
            >
              <LogoDevOutlinedIcon
                sx={{
                  width: '44px',
                  height: '44px',
                }}
              />
            </ListItemIcon>

            <ListItemText primary={'BeeLearning'} secondary="Studying together" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>

          {SIDEBAR_TOP.map(({ text, icon, path, except }) =>
            user?.role_id === except || except?.includes(user?.role_id) ? null : (
              <StyledNavLink key={text} to={path}>
                <ListItemButton
                  // onClick={() => navigate(path)}
                  sx={{
                    minHeight: 44,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    borderRadius: 2,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {icon}
                  </ListItemIcon>

                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </StyledNavLink>
            )
          )}

          {/* COLLAPSE BUTTON */}
          {user && user?.role_id === 'r1' && (
            <Box>
              {/* <StyledNavLink to="/user-management"> */}
              <ListItemButton
                onClick={() => setOpenCollapseItem(!openCollapseItem)}
                sx={{
                  minHeight: 44,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  pr: 1.5,
                  borderRadius: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <AdminPanelSettingsOutlinedIcon />
                </ListItemIcon>

                <ListItemText primary="Quản lý" sx={{ opacity: open ? 1 : 0 }} />

                {openCollapseItem ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
              </ListItemButton>
              {/* </StyledNavLink> */}

              <Collapse in={openCollapseItem} timeout="auto" unmountOnExit>
                <List
                  component="div"
                  disablePadding
                  sx={{
                    mt: 1,
                    position: 'relative',
                    '&:after': {
                      content: "''",
                      position: 'absolute',
                      left: '30px',
                      top: 0,
                      height: '100%',
                      width: '1px',
                      opacity: 1,
                      bgcolor: 'primary.main',
                    },
                  }}
                >
                  {MANAGEMENT_ITEMS.map(({ text, path }) => (
                    <StyledCollapseNavLink key={text} to={path}>
                      <ListItemButton disableRipple={true}>
                        {/* <ListItemIcon
                                  sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                  }}
                                >
                                  {icon}
                                </ListItemIcon> */}

                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                    </StyledCollapseNavLink>
                  ))}
                </List>
              </Collapse>
            </Box>
          )}
        </Box>

        {/* BOTTOM SIDEBAR ITEMS */}
        <Box>
          <ListItemButton
            onClick={() => logout(dispatch)}
            sx={{
              minHeight: 44,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              borderRadius: 2,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <LogoutIcon />
            </ListItemIcon>

            <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </Box>
      </List>
    </Drawer>
  )
}
