import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { AuthContext } from '../../contexts/authContext/AuthContext'
import useStudentQuery from '../../hooks/reactQueryHooks/useStudentQuery'
import useClassQuery from '../../hooks/reactQueryHooks/useClassQuery'

import studentClassApi from '../../apis/studentClassApi'

import NotificationModal from './NotificationModal'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'orange',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

let Register = (props) => {
  return (
    <div className="text-red-500 text-base rounded mb-2 cursor-pointer" onClick={props.handleOnclickRegisterClass}>
      <b className="my-1 ">{props.name}</b>
    </div>
  )
}

export default function ListClassToRegister(props) {
  const { user } = React.useContext(AuthContext)

  let [open, setOpen] = React.useState(false)
  let [resultRegister, setResultRegister] = React.useState(false)

  // react-query
  const { data: student, refetch: refetchStudent } = useStudentQuery.getById(user?.user_id)
  const { data: classes } = useClassQuery.getAll()

  // console.log({ student: student?.data, classes: classes?.data })

  let handleOpenNotificationModal = () => {
    setOpen(true)
  }

  let handleCloseNotificationModal = () => {
    setOpen(false)
  }

  let { day, session } = props

  let handleArrayClassSatisfyToShow = (day, arrayClass, session) => {
    let res = arrayClass.filter((item, index) => {
      if (handleStringAndCheckDay(item.schedules, day)) {
        // console.log('logic : ', handleCheckSessionToShowClass(item.schedules, session))

        if (handleCheckSessionToShowClass(item.schedules, session) === session) {
          // console.log(session, ' ', item)
          return item
        }
      }
    })
    return res
  }

  let handleCheckSessionToShowClass = (json, session) => {
    let checkSession = ''
    let arr = JSON.parse(json)
    arr.map((item) => {
      item.lessons.forEach((item1) => {
        if (item1 > 0 && item1 < 7) {
          checkSession = 'morning'
        }
        if (item1 >= 7 && item1 < 13) {
          checkSession = 'afternoon'
        }
        if (item1 >= 13 && item1 <= 16) {
          checkSession = 'evening'
        }
      })
    })
    return checkSession
  }

  let handleStringAndCheckDay = (json, day) => {
    let check = false
    let arr = JSON.parse(json)
    arr.map((item, index) => {
      if (item.day == day) {
        check = true
      }
    })
    return check
  }

  let arrayClassSatisfyToShow = classes && classes.data && handleArrayClassSatisfyToShow(day, classes.data, session)

  let handleShowScheduleInList = (data) => {
    let days = 'Thứ '
    let arr = JSON.parse(data)
    arr.map((item, index) => {
      days += item.day + 2 + ','
    })
    let lesson = arr[0].lessons.map((item, index) => {
      return item + 1
    })
    return days + `Tiết(${lesson})`
  }

  let handleOnclickRegisterClass = async (shedule, classId) => {
    let check = handleAsSameAsSchedule(shedule, listScheduleOfStudent())
    if (check) {
      setResultRegister(true)
      handleOpenNotificationModal()
    } else {
      try {
        await studentClassApi.create({ user_id: user?.user_id, class_id: classId })
        refetchStudent()
      } catch (error) {}

      setResultRegister(false)
      handleOpenNotificationModal()
    }
  }
  let listScheduleOfStudent = () => {
    let arr = student?.data?.student?.student_class.map((item, index) => {
      return JSON.parse(item?.class?.schedules)
    })
    // console.log('arrSchedule: ', arr)
    return arr
  }

  // console.log(listScheduleOfStudent)

  let handleAsSameAsSchedule = (currentSchedule, prevSchedule) => {
    let arrDayCurrentSchedule = []
    let arr = JSON.parse(currentSchedule)
    let arrLessonCurrentSchedule = arr[0].lessons
    arr.map((item, index) => {
      arrDayCurrentSchedule.push(item.day)
    })

    let check = false

    arrDayCurrentSchedule.forEach((item1) => {
      prevSchedule.forEach((item2) => {
        item2.forEach((item3) => {
          if (item1 === item3.day) {
            item3.lessons.forEach((item4) => {
              arrLessonCurrentSchedule.forEach((item5) => {
                if (item5 === item4) {
                  check = true
                }
              })
            })
          }
        })
      })
    })
    return check
  }

  return (
    <TableContainer component={Paper}>
      <NotificationModal open={open} handleClose={handleCloseNotificationModal} resultRegister={resultRegister} />
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tên học phần</StyledTableCell>
            <StyledTableCell align="right">Mã lớp</StyledTableCell>
            <StyledTableCell align="right">Giáo Viên</StyledTableCell>
            <StyledTableCell align="right">Thời gian</StyledTableCell>
            <StyledTableCell align="right">Số lượng</StyledTableCell>
            <StyledTableCell align="right">Chức năng</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arrayClassSatisfyToShow &&
            arrayClassSatisfyToShow.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {item.subject.subject_name}
                </StyledTableCell>
                <StyledTableCell align="right">{item.class_id}</StyledTableCell>
                <StyledTableCell align="right">{item.teacher.user.full_name}</StyledTableCell>
                <StyledTableCell align="right">{handleShowScheduleInList(item.schedules)}</StyledTableCell>
                <StyledTableCell align="right">{item.max_number_students}</StyledTableCell>
                <StyledTableCell align="right">
                  <Register
                    name={'Đăng ký'}
                    handleOnclickRegisterClass={() => handleOnclickRegisterClass(item.schedules, item.class_id)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
