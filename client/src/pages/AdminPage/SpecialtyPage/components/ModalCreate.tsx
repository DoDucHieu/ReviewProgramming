import { useEffect } from 'react'

// MUI ICONS
import {} from '@mui/icons-material'

// MUI COMPONENTS
import { Box, Stack, Button, MenuItem, TextField, Typography } from '@mui/material'

// REACT-HOOK-FORM, YUP
import { yupResolver } from '@hookform/resolvers/yup'
import { SchemaOf, object, string, number } from 'yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import ModalCustom from 'src/components/ModalCustom'

// FAKE DATA
import { SPECIALTY_DATA } from 'src/fakeData/specialty'

// TYPES
import { SubjectType } from 'src/types'

// REACT-QUERY-HOOKS
import useSpecialtyMutation from 'src/hooks/reactQueryHooks/useSpecialtyMutation'

// CONSTANTS
import { FORM_CREATE_LABEL } from '../const'

// ======================================================
type FormInputs = {
  specialty_name: string
}

const schema: SchemaOf<FormInputs> = object().shape({
  specialty_name: string().required('Nhập tên chuyên khoa!'),
})

type ModalCreateProps = {
  open: boolean
  handleClose: () => void
}

export default function ModalCreate({ open, handleClose }: ModalCreateProps) {
  // =================== STATES ===================

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
  })

  // handle onSuccess / onError
  const onSuccess = () => handleClose()

  // react-query
  const { mutate: create } = useSpecialtyMutation.create(onSuccess)

  // =================== EFFECT ===================
  useEffect(() => {
    reset()
  }, [open])

  // =================== FUNCTIONS HANDLE ===================
  const handleSubmit: SubmitHandler<FormInputs> = (data: FormInputs) => create(data)

  return (
    <ModalCustom width={800} open={open} onClose={handleClose}>
      <form onSubmit={reactHookFormHandleSubmit(handleSubmit)} autoComplete="off">
        <Stack spacing={3}>
          <Typography variant="h5" component="h4" align="center" mt={1} mb={2} gutterBottom>
            {FORM_CREATE_LABEL}
          </Typography>

          <TextField
            autoFocus
            label="Tên chuyên khoa"
            size="small"
            fullWidth
            variant="outlined"
            type="text"
            error={!!errors.specialty_name}
            helperText={errors.specialty_name?.message}
            {...register('specialty_name')}
          />

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
