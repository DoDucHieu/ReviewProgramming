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
import { SchemaOf, object, string, number, ref } from 'yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import ModalCustom from 'src/components/ModalCustom'

// FAKE DATA
import { SPECIALTY_DATA } from 'src/fakeData/specialty'

// TYPES
import { SubjectType } from 'src/types'

// REACT-QUERY-HOOKS
import useSpecialtyQuery from 'src/hooks/reactQueryHooks/useSpecialtyQuery'

import useTeacherMutation from 'src/hooks/reactQueryHooks/useTeacherMutation'

// CONSTANTS
import { FORM_UPDATE_LABEL } from '../const'

// ======================================================
type FormInputs = {
  full_name: string
  email?: string
  username: string
  address: string
  date_of_birth: string
  specialty_id?: number
  gender: string
  avatar?: string
}

const schema: SchemaOf<FormInputs> = object().shape({
  full_name: string().required('Yêu cầu nhập họ và tên!').default(' '),
  email: string().email('Đính dạng email không đúng!').nullable().default(' '),
  username: string().required('Yêu cầu nhập tên tài khoản!').default(' '),
  address: string().required('Yêu cầu nhập địa chỉ!').default(' '),
  date_of_birth: string().required('Yêu cầu nhập ngày sinh!').default(' '),
  specialty_id: string().nullable().default(''),
  gender: string().required('Yêu cầu chọn giới tính!').default(' '),
  avatar: string().nullable().default(' '),
})

type ModalUpdateProps = {
  open: boolean
  initData: SubjectType | null

  handleClose: () => void
}

export default function ModalUpdate({ open, initData, handleClose }: ModalUpdateProps) {
  // =================== STATES ===================
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // =================== DATA ===================
  // react-hook-form
  const {
    control,
    register,
    reset,
    setValue,
    formState: { errors },
    handleSubmit: reactHookFormHandleSubmit,
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  })

  // handle onSuccess / onError
  const onSuccess = () => handleClose()

  // react-query
  const { data: specialties } = useSpecialtyQuery.getAll()

  const { mutate: update } = useTeacherMutation.update(onSuccess)

  // =================== EFFECT ===================
  useEffect(() => {
    if (initData) {
      reset(initData)
    }
  }, [initData])

  useEffect(() => {
    if (initData) {
      setValue('specialty_id', initData?.teacher?.specialty_id || '')
    }
  }, [initData?.teacher?.specialty_id])

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

    update(dataFilter)
  }

  return (
    <ModalCustom width={800} open={open} onClose={handleClose}>
      <form onSubmit={reactHookFormHandleSubmit(handleSubmit)} autoComplete="off">
        <Stack spacing={3}>
          <Typography variant="h5" component="h4" align="center" mt={1} mb={2} gutterBottom>
            {FORM_UPDATE_LABEL}
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

          <Stack direction="row" spacing={2}>
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

            <Controller
              name="specialty_id"
              control={control}
              render={({ field }) => (
                <TextField label="Chuyên khoa" size="small" fullWidth select {...field}>
                  {(specialties?.data || []).map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.specialty_name}
                    </MenuItem>
                  ))}
                </TextField>
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
              Lưu thay đổi
            </Button>
          </Box>
        </Stack>
      </form>
    </ModalCustom>
  )
}
