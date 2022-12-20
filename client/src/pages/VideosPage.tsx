import styled from '@emotion/styled'
import { Grid, TextField, Box } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { type ChangeEvent, useState } from 'react'

import { Link } from 'react-router-dom'

import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SchemaOf, object, string, ref } from 'yup'

import logoImg from 'src/images/video logo.jpg'
import { toast } from 'react-toastify'

const AlignLeftLayout = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem',
  justifyContent: 'flex-end',
})

interface IVideoUpload {
  videoUrl: string
  title: string
}

const schema: SchemaOf<IVideoUpload> = object().shape({
  videoUrl: string().required('Yêu cầu tải video lên!'),
  title: string().required('Yêu cầu nhập tiêu đề!'),
})

export default function VideosPage() {
  const [isOpenningUploadModal, setIsOpenningUploadModal] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState('')

  const hideModalHandler = () => {
    setIsOpenningUploadModal(false)
  }

  const openUploadModalHandler = () => {
    setIsOpenningUploadModal(true)
  }

  const {
    control,
    register,
    formState: { errors },
    handleSubmit: reactHookFormHandleSubmit,
  } = useForm<IVideoUpload>({
    resolver: yupResolver(schema),
  })

  const handleSubmit: SubmitHandler<IVideoUpload> = async (data: IVideoUpload, event) => {
    // login(data, dispatch)
    console.log('Form data: ', data, control, control.getFieldState('videoUrl'))
    console.log('Submit event: ', event?.target.videoUrl)
    const fileInpEl: HTMLInputElement = event?.target.videoUrl
    const video = fileInpEl.files?.[0]
    console.log('Video: ', video)

    toast.success('Tải video thành công, video đã được đưa vào danh sách kiểm duyệt')
    hideModalHandler()
  }

  const uploadFileHandler = (fieldChangeHandler: Function) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.files)
      setUploadedFileName(event.target.files?.[0].name || '')
      fieldChangeHandler(event)
    }
  }

  return (
    <div>
      <AlignLeftLayout>
        <Button variant="contained" onClick={openUploadModalHandler}>
          Đăng video
        </Button>
      </AlignLeftLayout>
      <Dialog open={isOpenningUploadModal} onClose={hideModalHandler} fullWidth maxWidth="md">
        <DialogTitle>Đăng tải video</DialogTitle>
        <form onSubmit={reactHookFormHandleSubmit(handleSubmit)} autoComplete="off">
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Tiêu đề"
              fullWidth
              variant="standard"
              error={!!errors.title}
              helperText={errors?.title?.message}
              {...register('title')}
            />

            <Box
              sx={{
                width: '100%',
                marginY: '1rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1.5rem',
              }}
            >
              <Controller
                name="videoUrl"
                control={control}
                render={({ field: { ref, onChange, name } }) => (
                  <Button variant="contained" component="label">
                    <FileUploadIcon sx={{ mr: '1rem' }} />
                    Tải lên
                    <input ref={ref} name={name} onChange={uploadFileHandler(onChange)} hidden multiple type="file" />
                  </Button>
                )}
              />
              <p>{uploadedFileName}</p>
            </Box>
            <p
              style={{
                fontSize: '0.75rem',
                color: '#d32f2f',
              }}
            >
              {errors.videoUrl?.message}
            </p>
          </DialogContent>
          <DialogActions
            style={{
              padding: '1.5rem',
            }}
          >
            <AlignLeftLayout>
              <Button onClick={hideModalHandler}>Cancel</Button>
              <Button variant="contained" color="primary" type="submit">
                Subscribe
              </Button>
            </AlignLeftLayout>
          </DialogActions>
        </form>
      </Dialog>

      <ul className="flex px-12 flex-wrap justify-center list-none gap-5">
        {new Array(10).fill('').map((_, i) => (
          <li key={i}>
            <Link to={`/videos/${i}`} className="block no-underline text-blue-500 thick-hover-animation">
              <img src={logoImg} alt="" className="w-80 h-80 object-fill" />
              <span className="block w-fit mx-auto">Tiếng anh công nghệ thông tin {i + 1}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
