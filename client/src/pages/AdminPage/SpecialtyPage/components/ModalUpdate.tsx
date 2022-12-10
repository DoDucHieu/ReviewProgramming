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
import { SpecialtyType } from 'src/types'

// REACT-QUERY-HOOKS
import useSpecialtyMutation from 'src/hooks/reactQueryHooks/useSpecialtyMutation'

// CONSTANTS
import { FORM_UPDATE_LABEL } from '../const'

// ======================================================
type FormInputs = {
  specialty_name: string
}

const schema: SchemaOf<FormInputs> = object().shape({
  specialty_name: string().required('Nhập tên chuyên khoa!').default(' '),
})

type ModalUpdateProps = {
  open: boolean
  initData: SpecialtyType | null

  handleClose: () => void
}

export default function ModalUpdate({ open, initData, handleClose }: ModalUpdateProps) {
  // =================== STATES ===================

  // =================== DATA ===================
  // react-hook-form
  const {
    control,
    register,
    reset,
    formState: { errors },
    handleSubmit: reactHookFormHandleSubmit,
  } = useForm<FormInputs | any>({
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  })

  // handle onSuccess / onError
  const onSuccess = () => handleClose()

  // react-query
  const { mutate: update } = useSpecialtyMutation.update(onSuccess)

  // =================== EFFECT ===================
  useEffect(() => {
    initData && reset(initData)
  }, [initData])

  // =================== FUNCTIONS HANDLE ===================
  const handleSubmit: SubmitHandler<FormInputs> = (data: FormInputs) => update(data)

  return (
    <ModalCustom width={800} open={open} onClose={handleClose}>
      <form onSubmit={reactHookFormHandleSubmit(handleSubmit)} autoComplete="off">
        <Stack spacing={3}>
          <Typography variant="h5" component="h4" align="center" mt={1} mb={2} gutterBottom>
            {FORM_UPDATE_LABEL}
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
              Lưu thay đổi
            </Button>
          </Box>
        </Stack>
      </form>
    </ModalCustom>
  )
}
