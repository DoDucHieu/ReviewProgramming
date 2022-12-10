import { useContext, useState } from 'react'
import { Grid, styled, TextField, Typography, Box, Avatar, Button, InputAdornment, IconButton } from '@mui/material'

// MUI ICONS
import { Visibility, VisibilityOff } from '@mui/icons-material'

// REACT-HOOK-FORM, YUP
import { yupResolver } from '@hookform/resolvers/yup'
import { SchemaOf, object, string, ref } from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'

import axios from 'axios'

import Logo from 'src/images/logo-haui.png'
import { END_POINT } from 'src/const'
import { login } from 'src/contexts/authContext/apiCall'
import { AuthContext } from 'src/contexts/authContext/AuthContext'

const RightSide = styled(Grid)({
  backgroundImage: 'url(src/images/background.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
})

const LeftSide = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

type FormInputs = {
  username: string
  password: string
}

const schema: SchemaOf<FormInputs> = object().shape({
  username: string().required('Yêu cầu nhập tên tài khoản!'),
  password: string().required('Yêu cầu nhập mật khẩu!'),
})

export default function LoginPage() {
  const { dispatch } = useContext(AuthContext)

  const [showPassword, setShowPassword] = useState(false)

  // react-hook-form
  const {
    register,
    formState: { errors },
    handleSubmit: reactHookFormHandleSubmit,
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  })

  const handleSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    login(data, dispatch)
  }

  return (
    <Grid container columnSpacing={2} sx={{ height: '100vh' }}>
      <RightSide item xs={8}></RightSide>

      <LeftSide item xs={4}>
        <Box sx={{ minWidth: '366px' }}>
          <Box mb={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }} mb={2}>
              <Avatar src={Logo} sx={{ width: 66, height: 66 }} variant="rounded" />
            </Box>
            <Typography align="center" variant="h6">
              Trường Đại học Công nghiệp Hà Nội
            </Typography>
          </Box>

          <form onSubmit={reactHookFormHandleSubmit(handleSubmit)} autoComplete="off">
            <Box mt={2}>
              <TextField
                label="Tên đăng nhập"
                variant="standard"
                fullWidth
                autoFocus
                size="small"
                error={!!errors.username}
                helperText={errors?.username?.message}
                {...register('username')}
              />
            </Box>

            <Box mt={2}>
              <TextField
                label="Mật khẩu"
                size="small"
                fullWidth
                variant="standard"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {showPassword ? (
                        <IconButton size="small" onClick={() => setShowPassword(false)}>
                          <Visibility />
                        </IconButton>
                      ) : (
                        <IconButton size="small" onClick={() => setShowPassword(true)}>
                          <VisibilityOff />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
                error={!!errors.password}
                helperText={errors?.password?.message}
                {...register('password', { required: true })}
              />
            </Box>

            <Box mt={4}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Đăng nhập
              </Button>
            </Box>
          </form>
        </Box>
      </LeftSide>
    </Grid>
  )
}
