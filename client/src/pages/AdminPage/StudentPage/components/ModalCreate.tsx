import { useEffect, useState } from 'react'

// MUI ICONS
import { Visibility, VisibilityOff } from '@mui/icons-material'

// MUI COMPONENTS
import {
  Box,
  Stack,
  Button,
  MenuItem,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from '@mui/material'

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'

// REACT-HOOK-FORM, YUP
import { yupResolver } from '@hookform/resolvers/yup'
import { SchemaOf, object, string, ref } from 'yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import ModalCustom from 'src/components/ModalCustom'

// FAKE DATA
import { SPECIALTY_DATA } from 'src/fakeData/specialty'

// TYPES
import { SubjectType } from 'src/types'

// REACT-QUERY-HOOKS
import useStudentMutation from 'src/hooks/reactQueryHooks/useStudentMutation'

// CONSTANTS
import { FORM_CREATE_LABEL } from '../const'

// ======================================================
type FormInputs = {
  full_name: string
  email?: string
  username: string
  password: string
  confirm_password: string
  address: string
  date_of_birth: string
  gender: string
  avatar?: string
}

const schema: SchemaOf<FormInputs> = object().shape({
  full_name: string().required('Yêu cầu nhập họ và tên!'),
  email: string().email('Đính dạng email không đúng!'),
  username: string().required('Yêu cầu nhập tên tài khoản!'),
  password: string().min(6, 'Nhập lớn hơn 6 ký tự!').max(16).required('Yêu cầu nhập mật khẩu!'),
  confirm_password: string()
    .required('Yêu cầu nhập lại mật khẩu!')
    .oneOf([ref('password'), null], 'Mật khẩu không trùng khớp!'),
  address: string().required('Yêu cầu nhập địa chỉ!'),
  date_of_birth: string().required('Yêu cầu nhập ngày sinh!'),
  gender: string().required('Yêu cầu chọn giới tính!'),
  avatar: string(),
})

type ModalCreateProps = {
  open: boolean
  handleClose: () => void
}

export default function ModalCreate({ open, handleClose }: ModalCreateProps) {
  // =================== STATES ===================
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // =================== DATA ===================
  // react-hook-form
  const {
    control,
    register,
    reset,
    formState: { errors },
    handleSubmit: reactHookFormHandleSubmit,
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      date_of_birth: '',
    },
  })

  // handle onSuccess / onError
  const onSuccess = () => handleClose()

  // react-query
  const { mutate: create } = useStudentMutation.create(onSuccess)

  // =================== EFFECT ===================
  useEffect(() => {
    reset()
  }, [open])

  // =================== FUNCTIONS HANDLE ===================
  const handleSubmit: SubmitHandler<FormInputs> = (data: FormInputs) => {
    // remove key null or undefined or empty of data
    const dataFilter = Object.fromEntries(
      Object.entries(data).filter(([_key, value]) => {
        if (value === null || value === undefined || value === '' || value === ' ') {
          return false
        }
        return true
      })
    )

    create(dataFilter)
  }

  return (
    <ModalCustom width={800} open={open} onClose={handleClose}>
      <form onSubmit={reactHookFormHandleSubmit(handleSubmit)} autoComplete="off">
        <Stack spacing={3}>
          <Typography variant="h5" component="h4" align="center" mt={1} mb={2} gutterBottom>
            {FORM_CREATE_LABEL}
          </Typography>

          <TextField
            label="Họ và tên"
            type="text"
            autoFocus
            fullWidth
            size="small"
            variant="outlined"
            error={!!errors.full_name}
            helperText={errors?.full_name?.message}
            {...register('full_name', { required: true })}
          />

          <TextField
            label="Email"
            size="small"
            fullWidth
            variant="outlined"
            type="text"
            error={!!errors.email}
            helperText={errors?.email?.message}
            {...register('email')}
          />

          <TextField
            label="Tên đăng nhập"
            size="small"
            fullWidth
            variant="outlined"
            type="text"
            error={!!errors.username}
            helperText={errors?.username?.message}
            {...register('username')}
          />
          <Stack direction="row" spacing={2}>
            <TextField
              label="Mật khẩu"
              size="small"
              fullWidth
              variant="outlined"
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

            <TextField
              label="Nhập lại mật khẩu"
              size="small"
              fullWidth
              variant="outlined"
              type={showConfirmPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {showConfirmPassword ? (
                      <IconButton size="small" onClick={() => setShowConfirmPassword(false)}>
                        <Visibility />
                      </IconButton>
                    ) : (
                      <IconButton size="small" onClick={() => setShowConfirmPassword(true)}>
                        <VisibilityOff />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
              error={!!errors.confirm_password}
              helperText={errors?.confirm_password?.message}
              {...register('confirm_password', { required: true })}
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Địa chỉ"
              size="small"
              fullWidth
              variant="outlined"
              type="text"
              {...register('address', { required: true })}
              error={!!errors.address}
              helperText={errors?.address?.message}
            />

            <Controller
              name="date_of_birth"
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
                        {...params}
                        error={!!errors.date_of_birth}
                        helperText={errors?.date_of_birth?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
          </Stack>

          <Box>
            <FormLabel id="radio-group-label">Giới tính</FormLabel>
            {errors.gender && (
              <Typography sx={{ fontSize: '0.75rem', color: '#d32f2f' }}>{errors?.gender?.message}</Typography>
            )}

            <Controller
              name="gender"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioGroup row aria-labelledby="radio-group-label" value={value} onChange={onChange}>
                  <FormControlLabel value="fe-male" control={<Radio />} label="Nữ" />
                  <FormControlLabel value="male" control={<Radio />} label="Nam" />
                </RadioGroup>
              )}
            />
          </Box>

          {/* <TextField size="small" fullWidth label="Avatar" variant="standard" type="file" /> */}

          <Box py={2}>
            <Button fullWidth variant="contained" type="submit">
              Tạo mới
            </Button>
          </Box>
        </Stack>
      </form>
    </ModalCustom>
  )
}
