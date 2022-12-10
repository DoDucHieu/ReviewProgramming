import React from 'react'

import { EditOutlined } from '@mui/icons-material'

import { IconButton } from '@mui/material'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import DraftsIcon from '@mui/icons-material/Drafts'
import SendIcon from '@mui/icons-material/Send'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'
import SchoolIcon from '@mui/icons-material/School'

import ModalUpdate from './ModalUpdate'
import { AuthContext } from '../../../contexts/authContext/AuthContext'

export default function DetailLesson(props) {
  let { data } = props
  const [open, setOpen] = React.useState(false)
  const { user } = React.useContext(AuthContext)

  // ===============STATE================
  const [openModalUpdate, setOpenModalUpdate] = React.useState({ visible: false, data: null })

  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <>
      <List
        sx={{
          width: '100%',
          maxWidth: '100%',
          background: 'linear-gradient(to right, #a8c0ff, #3f2b96)',
          borderRadius: '10px',
          color: 'white',
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <SchoolIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary={data?.name} />
          {open ? <ExpandLess /> : <ExpandMore />}
          {user && user?.role_id !== 'r3' && (
            <IconButton color="success" onClick={() => setOpenModalUpdate({ visible: true, data: data })}>
              <EditOutlined sx={{ color: 'white' }} />
            </IconButton>
          )}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* item */}
            <ListItemButton sx={{ pl: 4 }} onClick={() => window.open(`${data?.document}`, '_blank')}>
              <ListItemIcon>
                <StarBorder sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Tài liệu học tập" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => window.open(`${data?.link}`, '_blank')}>
              <ListItemIcon>
                <StarBorder sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Lớp học online" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      {/* UPDATE MODAL */}
      <ModalUpdate
        open={openModalUpdate.visible}
        initData={openModalUpdate.data}
        handleClose={() => setOpenModalUpdate((prevState) => ({ ...prevState, visible: false }))}
      />
    </>
  )
}
