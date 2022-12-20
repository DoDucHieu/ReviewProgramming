import { Box, Button, Modal } from '@mui/material'

export type ModalCustomProps = {
  children: React.ReactNode
  open: boolean
  width?: number

  onClose?: () => void
  onFinish?: () => void
}

export default function ModalCustom({ children, open, width, onClose, onFinish }: ModalCustomProps) {
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
        <div className="button" style={{ marginTop: 8 }}>
          <Button
            variant="contained"
            onClick={() => {
              onFinish && onFinish()
              onClose && onClose()
            }}
          >
            Save
          </Button>
          <Button variant="outlined" style={{ marginLeft: 8 }} onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  )
}
