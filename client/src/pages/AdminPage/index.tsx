import { Box, Card, styled, Typography } from '@mui/material'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '200px',
  margin: '0 8px',
  aspectRatio: '1/1',

  color: 'white',
  backgroundColor: theme.palette.primary.main,
  cursor: 'pointer',
  borderRadius: '12px',

  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transition: 'all 0.2s ease-in-out',
    transform: 'scale(1.05)',
  },
}))

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',

  width: '100%',
  height: 'calc(100vh - 120px)',
  paddingTop: '10%',
})

export default function CreateUser() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <>
      {pathname === '/user-management' && (
        <StyledBox>
          <StyledCard onClick={() => navigate('teacher')}>
            <Typography variant="h6">Giáo viên</Typography>
          </StyledCard>
          <StyledCard onClick={() => navigate('student')}>
            <Typography variant="h6">Học sinh</Typography>
          </StyledCard>
        </StyledBox>
      )}

      <Outlet />
    </>
  )
}
