import { useContext, useState } from 'react'
import { Grid, styled, TextField, Typography, Box, Avatar, Button, InputAdornment, IconButton } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
// MUI ICONS
import { Visibility, VisibilityOff } from '@mui/icons-material'

// REACT-HOOK-FORM, YUP
import { yupResolver } from '@hookform/resolvers/yup'
import { SchemaOf, object, string, ref, number } from 'yup'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'

import axios from 'axios'

import Logo from 'src/images/login.png'
import { END_POINT } from 'src/const'
import { signUp } from 'src/contexts/authContext/apiCall'
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
  fullname: string
  email?: string
  dateOfBirth: string
  gender: number
  address: string
  // avatar: string
  username: string
  password: string
}

const schema: SchemaOf<FormInputs> = object().shape({
  username: string().required('Yêu cầu nhập tên tài khoản!'),
  password: string().required('Yêu cầu nhập mật khẩu!'),
  address: string().optional(),
  // avatar: string().optional(),
  dateOfBirth: string().optional(),
  email: string().optional(),
  fullname: string().required('Yêu cầu nhập họ tên'),
  gender: string().optional(),
})

export default function SignUpPage() {
  const { dispatch } = useContext(AuthContext)

  const [showPassword, setShowPassword] = useState(false)

  // react-hook-form
  const {
    control,
    register,
    formState: { errors },
    handleSubmit: reactHookFormHandleSubmit,
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      dateOfBirth: '',
    },
  })

  const handleSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    signUp(
      /* data */ {
        username: 'student',
        password: 'student',
      },
      dispatch
    )
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
              Website tổng hợp kiến thức lập trình
            </Typography>
          </Box>

          <form onSubmit={reactHookFormHandleSubmit(handleSubmit)} autoComplete="off">
            <Box mt={2}>
              <TextField
                label="Họ và tên"
                variant="standard"
                fullWidth
                autoFocus
                size="small"
                error={!!errors.fullname}
                helperText={errors?.fullname?.message}
                {...register('fullname')}
              />
            </Box>
            <Box mt={2}>
              <TextField
                label="Email"
                variant="standard"
                fullWidth
                autoFocus
                size="small"
                error={!!errors.email}
                helperText={errors?.email?.message}
                {...register('email')}
              />
            </Box>
            <Box mt={2}>
              <TextField
                label="Tài khoản"
                variant="standard"
                fullWidth
                autoFocus
                size="small"
                error={!!errors.username}
                helperText={errors?.username?.message}
                autoComplete="false"
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
            <Box mt={2}>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      label="Ngày sinh"
                      // inputFormat="dd/MM//yyyy"
                      value={value}
                      onChange={onChange}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          size="small"
                          variant="standard"
                          {...params}
                          error={!!errors.dateOfBirth}
                          helperText={errors?.dateOfBirth?.message}
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
            </Box>
            <Box mt={2}>
              <TextField
                label="Giới tính"
                variant="standard"
                fullWidth
                autoFocus
                size="small"
                error={!!errors.gender}
                helperText={errors?.gender?.message}
                {...register('gender')}
              />
            </Box>
            <Box mt={2}>
              <TextField
                label="Địa chỉ"
                variant="standard"
                fullWidth
                autoFocus
                size="small"
                error={!!errors.address}
                helperText={errors?.address?.message}
                {...register('address')}
              />
            </Box>

            <Box mt={4}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Đăng ký
              </Button>
            </Box>
          </form>
        </Box>
      </LeftSide>
    </Grid>
  )
}
