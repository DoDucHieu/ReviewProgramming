import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import ListClassToRegister from './ListClassToRegister'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  outline: 'none',
  p: 4,
}

export default function NotificationModal(props) {
  let { open, handleClose, resultRegister } = props
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Thông báo
          </Typography>
          <br></br>
          <Typography variant="body1" component="h2">
            {resultRegister ? 'Đăng ký học phần không thành công do trùng lịch học' : 'Đăng ký học phần thành công'}
          </Typography>
          <br></br>

          <Button variant="contained" onClick={handleClose}>
            Đóng
          </Button>
        </Box>
      </Modal>
    </>
  )
}
