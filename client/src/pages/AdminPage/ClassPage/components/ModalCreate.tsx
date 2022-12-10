import { useEffect, useMemo, useState } from 'react'

// MUI ICONS
import { CloseOutlined, ColorLensOutlined } from '@mui/icons-material'

// MUI COMPONENTS
import { Box, Stack, Button, MenuItem, TextField, Typography, InputAdornment, IconButton } from '@mui/material'

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

//
import { SketchPicker } from 'react-color'

// REACT-HOOK-FORM, YUP
import { yupResolver } from '@hookform/resolvers/yup'
import { SchemaOf, object, string, number } from 'yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

// APP COMPONENTS
import ModalCustom from 'src/components/ModalCustom'
import RegisterSchedule from './RegisterSchedule'

// FAKE DATA
import { SPECIALTY_DATA } from 'src/fakeData/specialty'

// TYPES
import { SubjectType } from 'src/types'

// REACT-QUERY-HOOKS
import useTeacherQuery from 'src/hooks/reactQueryHooks/useTeacherQuery'
import useSubjectQuery from 'src/hooks/reactQueryHooks/useSubjectQuery'
import useSpecialtyQuery from 'src/hooks/reactQueryHooks/useSpecialtyQuery'

import useClassMutation from 'src/hooks/reactQueryHooks/useClassMutation'

// CONSTANTS
import { convert2DArrayToArrayObject, FORM_CREATE_LABEL, TWO_D_ARRAY } from '../const'

// ======================================================
type FormInputs = {
  class_id: string
  start_date: string
  max_number_students: number
  image: string
  description: string
  bg_color: string

  user_id: number
  subject_id: number
}

const schema: SchemaOf<FormInputs> = object().shape({
  class_id: string().required('Nhập mã lớp!'),
  start_date: string().required('Nhập ngày mở lớp!'),
  max_number_students: number().required('Nhập sĩ số tối đa!'),
  image: string().required('Nhập link ảnh!'),
  description: string().required('Nhập mô tả lớp học!'),
  bg_color: string().required('Nhập mã màu!'),

  user_id: number().required('Chọn giảng viên!'),
  subject_id: number().required('Chọn môn học!'),
})

type ModalCreateProps = {
  open: boolean
  handleClose: () => void
}

export default function ModalCreate({ open, handleClose }: ModalCreateProps) {
  // =================== STATES ===================
  const clone2DArray = useMemo(() => TWO_D_ARRAY.map((row) => row.slice()), [])
  const [schedules, setSchedules] = useState<number[][]>(clone2DArray)

  const [color, setColor] = useState({})
  const [showColorPicker, setShowColorPicker] = useState(false)

  const [subjectSelected, setSubjectSelected] = useState<number>()
  const [teacherSelected, setTeacherSelected] = useState<number>()

  // =================== DATA ===================
  // react-hook-form
  const {
    control,
    register,
    reset,
    watch,
    setValue,
    formState: { errors },
    handleSubmit: reactHookFormHandleSubmit,
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      start_date: '',
      max_number_students: 70,
      bg_color: ' ',
    },
  })

  // handle onSuccess / onError
  const onSuccess = () => handleClose()

  // react-query
  const { data: teacher } = useTeacherQuery.getById(teacherSelected)
  const { data: teachers } = useTeacherQuery.getAll({ subject_id: subjectSelected }, !!subjectSelected)
  const { data: subjects } = useSubjectQuery.getAll()

  const { mutate: create } = useClassMutation.create(onSuccess)

  // =================== EFFECT ===================
  useEffect(() => {
    setValue('bg_color', color?.hex || '')
  }, [color])

  useEffect(() => {
    reset()
  }, [open])

  useEffect(() => {
    setSubjectSelected(watch('subject_id'))
  }, [watch('subject_id')])

  useEffect(() => {
    setTeacherSelected(watch('user_id'))
  }, [watch('user_id')])

  // show schedules of teacher to RegisterSchedule
  useEffect(() => {
    const classes = teacher?.data?.teacher?.classes

    if (classes && classes?.length > 0) {
      classes.forEach((classItem) => {
        const schedules = (classItem?.schedules && JSON.parse(classItem?.schedules)) || []

        schedules.forEach((schedule) => {
          schedule?.lessons?.forEach((lesson) =>
            setSchedules((prevState) => {
              const newState = [...prevState]
              newState[+lesson][+schedule.day] = 2

              return newState
            })
          )
        })
      })
    }

    // clone 2D array and refesh state
    return () => setSchedules(TWO_D_ARRAY.map((row) => row.slice()))
  }, [teacher?.data])

  // =================== FUNCTIONS HANDLE ===================
  const handleSubmit: SubmitHandler<FormInputs> = (data: FormInputs) => {
    const convertToJson = JSON.stringify(convert2DArrayToArrayObject(schedules))
    create({ ...data, schedules: convertToJson })
  }

  const handleCheckSchedule = (isChecked: boolean, lesson: number, day: number) => {
    setSchedules((prevState) => {
      const newSchedules = [...prevState]
      newSchedules[lesson][day] = isChecked ? 1 : 0

      return newSchedules
    })
  }

  return (
    <ModalCustom width={1200} open={open} onClose={handleClose}>
      <form onSubmit={reactHookFormHandleSubmit(handleSubmit)} autoComplete="off">
        <Stack spacing={3}>
          <Typography variant="h5" component="h4" align="center" mt={1} mb={2} gutterBottom>
            {FORM_CREATE_LABEL}
          </Typography>

          <Controller
            name="subject_id"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Môn học"
                size="small"
                fullWidth
                select
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                {...field}
              >
                {(subjects?.data || []).map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.subject_name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="user_id"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                disabled={!watch('subject_id')}
                label="Giảng viên"
                size="small"
                fullWidth
                select
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                {...field}
              >
                {(teachers?.data || []).map((option) => (
                  <MenuItem key={option.user_id} value={option.user_id}>
                    {option.full_name || option.user.full_name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <TextField
            label="Mã lớp học"
            size="small"
            fullWidth
            variant="outlined"
            type="text"
            error={!!errors.class_id}
            helperText={errors.class_id?.message}
            {...register('class_id')}
          />

          <Stack spacing={2} direction="row">
            <Controller
              name="start_date"
              control={control}
              render={({ field, fieldState }) => (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Ngày mở lớp"
                    inputFormat="DD-MM-YYYY"
                    {...field}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        size="small"
                        {...params}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />

            <TextField
              label="Sĩ số"
              size="small"
              fullWidth
              variant="outlined"
              type="number"
              InputProps={{ inputProps: { min: 20 } }}
              error={!!errors.max_number_students}
              helperText={errors.max_number_students?.message}
              {...register('max_number_students')}
            />
          </Stack>

          <Stack spacing={2} direction="row" sx={{ position: 'relative' }}>
            <TextField
              label="Link ảnh"
              size="small"
              fullWidth
              variant="outlined"
              type="text"
              error={!!errors.image}
              helperText={errors.image?.message}
              {...register('image')}
            />

            <TextField
              label="Màu nền"
              size="small"
              fullWidth
              variant="outlined"
              type="text"
              sx={{ width: 260 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {showColorPicker ? (
                      <IconButton size="small" onClick={() => setShowColorPicker(false)}>
                        <CloseOutlined />
                      </IconButton>
                    ) : (
                      <IconButton size="small" onClick={() => setShowColorPicker(true)}>
                        <ColorLensOutlined />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
              error={!!errors.bg_color}
              helperText={errors.bg_color?.message}
              {...register('bg_color')}
            />

            <Box
              sx={{
                position: 'absolute',
                right: 0,
                bottom: 42,
                zIndex: 20,
                display: showColorPicker ? 'block' : 'none',
              }}
            >
              <SketchPicker color={color} onChangeComplete={setColor} />
              {/* <Controller
                name="bg_color"
                control={control}
                render={({ field: { value, onChange } }) => <SketchPicker color={value} onChangeComplete={onChange} />}
              /> */}
            </Box>
          </Stack>

          <TextField
            label="Mô tả"
            size="small"
            fullWidth
            variant="outlined"
            type="text"
            multiline
            minRows={6}
            error={!!errors.description}
            helperText={errors.description?.message}
            {...register('description')}
          />

          {!!watch('user_id') && <RegisterSchedule schedules={schedules} handleCheckSchedule={handleCheckSchedule} />}

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
