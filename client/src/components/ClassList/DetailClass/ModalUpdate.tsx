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

// TYPES
import { DocumentType } from 'src/types'

// REACT-QUERY-HOOKS
import useDocumentMutation from 'src/hooks/reactQueryHooks/useDocumentMutation'

// ======================================================
type FormInputs = {
  name: string
  link?: string
  document?: string
}

const schema: SchemaOf<FormInputs> = object().shape({
  name: string().required('Nhập tên buổi học!').default(' '),
  link: string().default(' ').nullable(),
  document: string().default(' ').nullable(),
})

type ModalUpdateProps = {
  open: boolean
  initData: DocumentType | null

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
  const { mutate: update } = useDocumentMutation.update(onSuccess)

  // =================== EFFECT ===================
  useEffect(() => {
    initData && reset(initData)
  }, [initData])

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
            Sửa thông tin buổi học
          </Typography>

          <TextField
            autoFocus
            label="Tên buổi học"
            size="small"
            fullWidth
            variant="outlined"
            type="text"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name')}
          />

          <TextField
            label="Link lớp học"
            size="small"
            fullWidth
            variant="outlined"
            type="text"
            error={!!errors.link}
            helperText={errors.link?.message}
            {...register('link')}
          />

          <TextField
            label="Link tài liệu"
            size="small"
            fullWidth
            variant="outlined"
            type="text"
            error={!!errors.document}
            helperText={errors.document?.message}
            {...register('document')}
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
