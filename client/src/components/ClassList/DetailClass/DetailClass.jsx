import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import ListLesson from './ListLesson'

import { AddBoxOutlined } from '@mui/icons-material'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material'
import { flexbox, width } from '@mui/system'
import Stack from '@mui/material/Stack'

import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'

import { AuthContext } from '../../../contexts/authContext/AuthContext'

//moment
import moment from 'moment'

// MODALS
import ModalCreate from './ModalCreate'

// REACT-QUERY-HOOKS
import useClassQuery from '../../../hooks/reactQueryHooks/useClassQuery'
import useStudentQuery from '../../../hooks/reactQueryHooks/useStudentQuery'
import useTeacherQuery from '../../../hooks/reactQueryHooks/useTeacherQuery'

export default function DetailClass() {
  let { id } = useParams()
  const { user } = useContext(AuthContext)

  // ======================STATE=======================
  // modals
  const [openModalCreate, setOpenModalCreate] = useState(false)

  // ============ DATA ============
  // react-query
  const { data: classDetail } = useClassQuery.getById(id)
  const { data: student } = useStudentQuery.getById(user?.role_id === 'r3' && user?.user_id)
  const { data: teacher } = useTeacherQuery.getById(user?.role_id === 'r2' && user?.user_id)

  console.log('detailClass: ', classDetail?.data)
  // console.log('subject: ', classDetail?.data?.teacher?.user?.full_name)
  // console.log('student: ', student?.data?.student?.student_class)
  console.log('student: ', student?.data)

  console.log('teacher: ', teacher?.data)

  let checkStudentInClass = (arr, id) => {
    let check = false
    arr &&
      arr.map((item, index) => {
        if (item && item.class_id === id) {
          check = true
        }
      })
    return check
  }

  let checkTeacherInClass = (arr, id) => {
    let check = false
    arr &&
      arr.map((item, index) => {
        if (item && item.class_id === id) {
          check = true
        }
      })
    return check
  }
  let isInThisClass
  if (user?.role_id === 'r3') {
    isInThisClass = checkStudentInClass(student?.data?.student?.student_class, id)
  }
  if (user?.role_id === 'r2') {
    isInThisClass = checkTeacherInClass(teacher?.data?.teacher?.classes, id)
  }
  console.log('condition: ', isInThisClass)

  return (
    <>
      <h1>{classDetail?.data?.subject?.subject_name}</h1>
      <br></br>
      <p>{classDetail?.data.description}</p>
      <br></br>
      <h3>Nội dung chương trình học:</h3>
      <br></br>

      <div className="detailClass flex w-full">
        <div className="flex-1">
          <ListLesson data={classDetail?.data?.documents} isInThisClass={isInThisClass} />

          {user && user?.role_id !== 'r3' && isInThisClass && (
            <Button
              onClick={() => setOpenModalCreate(true)}
              sx={{ mt: 2 }}
              variant="outlined"
              endIcon={<AddBoxOutlined />}
            >
              Thêm bài học
            </Button>
          )}
        </div>

        <div className="descriptionLesson flex-1 flex flex-col items-center">
          <br></br>
          <Card sx={{ width: 500, background: `${classDetail?.data.bg_color}`, borderRadius: '10px' }}>
            <CardActionArea>
              <CardMedia component="img" height="200" image={`${classDetail?.data.image}`} alt="green iguana" />
              <CardContent className="ml-4">
                <Typography gutterBottom variant="h5" component="div" className="text-white">
                  {classDetail?.data?.subject?.subject_name}
                </Typography>
                <Typography variant="body1" color="white">
                  {`Giáo viên: ${classDetail?.data?.teacher?.user?.full_name}`}
                </Typography>
                <Typography variant="body1" color="white">
                  Thời lương: 3 tháng
                </Typography>
                <Typography variant="body1" color="white">
                  {`Ngày bắt đầu: ${moment(classDetail?.data?.start_date).format('DD/MM/YYYY')}`}
                </Typography>
                <Typography variant="body1" color="white">
                  Ngày kết thúc: 30/06/2022
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>

      {/* CREATE MODAL */}
      <ModalCreate open={openModalCreate} handleClose={() => setOpenModalCreate(false)} classId={id} />
    </>
  )
}
