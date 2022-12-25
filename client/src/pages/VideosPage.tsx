import styled from '@emotion/styled'
import { Grid, TextField, Box } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { type ChangeEvent, useState, useEffect, useContext } from 'react'

import { Link } from 'react-router-dom'

import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SchemaOf, object, string, ref } from 'yup'

import logoImg from 'src/images/video logo.jpg'
import { toast } from 'react-toastify'
import { IVideo } from 'src/interfaces/video'
import videoAPIs from 'src/apis/videoAPI'
import { AuthContext } from 'src/contexts/authContext/AuthContext'
import ClonesLoader from 'src/components/Loader/ClonesLoader'

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
  const [isFetchingVideo, setIsFetchingVideo] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [videoList, setVideoList] = useState<IVideo[]>([])

  const { user } = useContext(AuthContext)

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

  const fetchVideos = async () => {
    setIsFetchingVideo(true)
    try {
      const response = await videoAPIs.getAll()

      setVideoList(response.data.data)
    } catch (error) {
      console.log('Error: ', error)
      toast.error('Có lỗi xảy ra, không thể lấy danh sách video')
    } finally {
      setIsFetchingVideo(false)
    }
  }

  const handleSubmit: SubmitHandler<IVideoUpload> = async (data: IVideoUpload, event) => {
    const fileInpEl: HTMLInputElement = event?.target.videoUrl
    const video = fileInpEl.files?.[0]

    if (!video) {
      return
    }

    const form = new FormData()
    form.append('title', data.title)
    form.append('desc', data.title)
    form.append('url_video', video)
    form.append('user_id', user.user_id)

    try {
      const response = await videoAPIs.create(form)
      console.log('Create response', response)
      toast.success('Tải video thành công, video đã được đưa vào danh sách kiểm duyệt')
      hideModalHandler()
      fetchVideos()
    } catch (error) {
      console.log('Error: ', error)
      toast.error('Có lỗi xảy ra, không thể tải video lên hệ thống, vui lòng thử lại sau')
    }
  }

  const uploadFileHandler = (fieldChangeHandler: Function) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.files)
      setUploadedFileName(event.target.files?.[0].name || '')
      fieldChangeHandler(event)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  return (
    <div>
      <AlignLeftLayout>
        <Button variant="contained" onClick={openUploadModalHandler}>
          Đăng video
        </Button>
      </AlignLeftLayout>
      <h2 style={{ marginBottom: 16 }}>Danh sách các video về lập trình</h2>
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
                    <input
                      ref={ref}
                      name={name}
                      onChange={uploadFileHandler(onChange)}
                      accept="video/*"
                      hidden
                      type="file"
                    />
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
              <Button onClick={hideModalHandler}>Hủy</Button>
              <Button variant="contained" color="primary" type="submit">
                Đăng
              </Button>
            </AlignLeftLayout>
          </DialogActions>
        </form>
      </Dialog>
      {isFetchingVideo ? (
        <div className="flex h-96 w-full justify-center items-center">
          <ClonesLoader className="w-20 h-20" />
        </div>
      ) : (
        <ul className="flex px-12 flex-wrap justify-center list-none gap-5">
          {videoList.length < 1 ? (
            <h3 className="text-red-500 mt-8">Không có video nào</h3>
          ) : (
            videoList.map((video, i) => (
              <li key={i}>
                <Link
                  to={`/videos/${video.id}?video_url=${video.url_video}&approved=true`}
                  className="block no-underline text-blue-500 thick-hover-animation"
                >
                  <img src={logoImg} alt="" className="w-80 h-80 object-fill" />
                  <span className="block w-fit mx-auto">{video.title}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
