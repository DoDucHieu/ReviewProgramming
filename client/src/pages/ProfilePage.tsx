import { useContext, useEffect, useRef, useState } from 'react'

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  Drawer,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import { CameraAlt } from '@mui/icons-material'

import { AuthContext } from 'src/contexts/authContext/AuthContext'
import userApi from 'src/apis/userApi'
import { END_POINT_IMG } from 'src/const'

import useSubjectQuery from 'src/hooks/reactQueryHooks/useSubjectQuery'
import teacherSubjectApi from 'src/apis/teacherSubjectApi'
import { fetchUser } from 'src/contexts/authContext/apiCall'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

export type ProfileProps = {
  open: boolean

  onClose?: () => void
}

export default function ProfilePage({ open = false, onClose = () => {} }: ProfileProps) {
  const { user, dispatch } = useContext(AuthContext)

  const [subjectsSelected, setSubjectsSelected] = useState<string[]>([])

  const inputRef = useRef(null)
  const [avatar, setAvatar] = useState('')
  const [uploadFile, setUploadFile] = useState()
  const [email, setEmail] = useState(user.email)

  // react query
  const { data: subjects } = useSubjectQuery.getAll()

  // ============ EFFECT =============
  useEffect(() => {
    setAvatar(`${END_POINT_IMG}/${user.avatar}`)

    if (user.role_id === 'r2') {
      const fetchSubjects = async () => {
        const res = await teacherSubjectApi.getAll({ user_id: user.user_id })

        const subjects = res.data.data || []

        if (subjects.length > 0) {
          setSubjectsSelected(subjects.map((subject) => subject.subject_id))
        }
      }

      fetchSubjects()
    }
  }, [user.avatar, user.id, user.role_id])

  // ============ HANDLE FUNCTIONS =============
  const handleImage = (event) => {
    const file = event.target.files[0]
    setUploadFile(file)

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setAvatar(reader.result)
    }
  }

  const handleChange = (event: SelectChangeEvent<typeof subjectsSelected>) => {
    const {
      target: { value },
    } = event
    setSubjectsSelected(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  const handleSubmit = async () => {
    const updateSubjects = async () => {
      await teacherSubjectApi.create({
        user_id: user.user_id,
        data: subjectsSelected,
      })
    }

    if (user.role_id === 'r2') {
      updateSubjects()
    }

    if (uploadFile || email) {
      try {
        const formData = new FormData()

        if (uploadFile) {
          formData.append('avatar', uploadFile)
        }

        if (email) {
          formData.append('email', email)
        }

        await userApi.update(user.user_id, formData)
      } catch (error) {}

      fetchUser(user?.user_id, dispatch)
    }
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Stack sx={{ pl: 4, pr: 2 }} spacing={2} direction="row" minHeight="86vh">
        <Stack sx={{ width: 468 }} alignItems="center">
          <Typography gutterBottom variant="h4" mb={2} sx={{ width: '100%', mb: 8, mt: 2 }} textAlign="center">
            Profile
          </Typography>

          <input type="file" ref={inputRef} hidden onChange={handleImage} />
          <BoxStyled sx={{ position: 'relative' }} onClick={() => inputRef.current?.click()}>
            <Avatar className="image-when-hover" sx={{ width: 280, height: 280 }} alt="Remy Sharp" src={avatar} />

            <Box
              className="camera-icon"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 20,
                color: 'white',
                display: 'none',
              }}
            >
              <CameraAlt sx={{ fontSize: '36px' }} />
            </Box>
          </BoxStyled>

          <Box width="100%" mt={2} mb={1}>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              label="Email"
              variant="standard"
            />
          </Box>

          {user.role_id === 'r2' && (
            <Box mt={2} width="100%">
              <Typography gutterBottom my={2} sx={{ opacity: 0.8, fontSize: 15 }}>
                Môn học đăng ký giảng dạy:
              </Typography>

              <FormControl fullWidth>
                <InputLabel id="profile-check-box">Môn</InputLabel>
                <Select
                  labelId="profile-check-box"
                  id="demo-multiple-checkbox"
                  multiple
                  value={subjectsSelected}
                  onChange={handleChange}
                  input={<OutlinedInput label="Tag" />}
                  // renderValue={(selected) => selected.join(', ')}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          sx={{ mt: 1 }}
                          key={value}
                          label={subjects?.data?.find((subject) => subject.id === value)?.subject_name}
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {subjects &&
                    subjects?.data?.length > 0 &&
                    subjects?.data.map((subject) => (
                      <MenuItem key={subject.id} value={subject.id}>
                        <Checkbox checked={subjectsSelected.indexOf(subject.id) > -1} />
                        <ListItemText primary={subject.subject_name} />
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
          )}

          <Button variant="contained" fullWidth onClick={handleSubmit} sx={{ mt: 6 }}>
            Lưu
          </Button>
        </Stack>

        {/* <Divider orientation="vertical" variant="middle" flexItem /> */}

        <Stack sx={{ flex: 1 }}></Stack>
      </Stack>
    </Drawer>
  )
}

const BoxStyled = styled(Box)(() => ({
  cursor: 'pointer',
  borderRadius: '50%',

  '&:hover .image-when-hover': {
    filter: 'brightness(0.76)',
  },

  '&:hover  .camera-icon': {
    display: 'block',
  },
}))
