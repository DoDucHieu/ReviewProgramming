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
import useCreditQuery from 'src/hooks/reactQueryHooks/useCreditQuery'
import useSpecialtyQuery from 'src/hooks/reactQueryHooks/useSpecialtyQuery'

import useSubjectMutation from 'src/hooks/reactQueryHooks/useSubjectMutation'

// CONSTANTS
import { FORM_UPDATE_LABEL } from '../const'

// ======================================================
type FormInputs = {
  subject_name: string
  specialty_id: number
  credit_id: number
}

const schema: SchemaOf<FormInputs> = object().shape({
  subject_name: string().required('Nhập tên môn học!').default(' '),
  specialty_id: number().required('Chọn chuyên khoa!').default(0),
  credit_id: number().required('Chọn tín chỉ!').default(0),
})

type ModalUpdateProps = {
  open: boolean
  initData: SubjectType | null

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
  const { data: specialties } = useSpecialtyQuery.getAll()
  const { data: credits } = useCreditQuery.getAll()

  const { mutate: update } = useSubjectMutation.update(onSuccess)

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
            label="Tên môn học"
            size="small"
            fullWidth
            variant="outlined"
            type="text"
            error={!!errors.subject_name}
            helperText={errors.subject_name?.message}
            {...register('subject_name')}
          />

          <Stack spacing={3} direction="row">
            <Controller
              name="specialty_id"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  label="Chuyên khoa"
                  size="small"
                  fullWidth
                  select
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  {...field}
                >
                  {(specialties?.data || []).map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.specialty_name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="credit_id"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  label="Tín chỉ"
                  size="small"
                  fullWidth
                  select
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  {...field}
                >
                  {(credits?.data || []).map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.number_of_credits}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Stack>

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
