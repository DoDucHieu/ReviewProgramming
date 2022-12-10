import { Box, Modal } from '@mui/material'

export type ModalCustomProps = {
  children: React.ReactNode
  open: boolean
  width?: number

  onClose?: () => void
}

export default function ModalCustom({ children, open, width, onClose }: ModalCustomProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: width ? `${width}px` : '1888px',
          maxHeight: '86%',
          p: 2,
          mx: 2,
          borderRadius: 2,

          bgcolor: 'white',
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </Modal>
  )
}
