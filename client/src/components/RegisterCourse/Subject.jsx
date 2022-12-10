import React from 'react'
import { AuthContext } from '../../contexts/authContext/AuthContext'
import useStudentQuery from '../../hooks/reactQueryHooks/useStudentQuery'

export default function Subject(props) {
  let { day, session } = props
  const { user } = React.useContext(AuthContext)

  // console.log('user', user)

  //react query
  const { data: student } = useStudentQuery.getById(user?.user_id)

  let handleArrayClassSatisfyToShow = (day, arrayStudentClass, session) => {
    let res = arrayStudentClass.filter((item, index) => {
      if (handleStringAndCheckDay(item?.class?.schedules, day)) {
        if (handleCheckSessionToShowClass(item?.class?.schedules) === session) {
          return item
        }
      }
    })
    // console.log('res: ', res)
    return res
  }

  let handleCheckSessionToShowClass = (json) => {
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

  let formatLesson = (data) => {
    let arr = JSON.parse(data)
    let lesson = arr[0].lessons.map((item, index) => {
      return item + 1
    })
    return `(${lesson})`
  }

  let arrStudentClass = student?.data?.student?.student_class

  let arrayClassSatisfyToShow =
    arrStudentClass && arrStudentClass.length > 0 ? handleArrayClassSatisfyToShow(day, arrStudentClass, session) : []
  // console.log('satisfy: ', arrayClassSatisfyToShow)

  return arrayClassSatisfyToShow && arrayClassSatisfyToShow.length > 0 ? (
    arrayClassSatisfyToShow.map((item, index) => {
      return (
        <div className="bg-purple text-white text-base rounded mb-2" key={index}>
          <p className="my-1">{item?.class?.subject?.subject_name}</p>
          <p className="my-1">{formatLesson(item?.class?.schedules)}</p>
        </div>
      )
    })
  ) : (
    <div className="bg-purple text-white text-base rounded mb-2">
      <p className="my-1"></p>
      <p className="my-1"></p>
    </div>
  )
}
