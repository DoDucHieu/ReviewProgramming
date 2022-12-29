import React from 'react'
import { AuthContext } from '../../contexts/authContext/AuthContext'
import useSpecialtyQuery from '../../hooks/reactQueryHooks/useSpecialtyQuery'
import ClassItem from './ClassItem'

export default function ClassList({ allClass }) {
  const { user } = React.useContext(AuthContext)
  const { data: specialties } = useSpecialtyQuery.getAll()
  console.log('123', user)

  let allListClass = specialties?.data

  const renderClass = () => {
    if (allClass)
      return allListClass ? (
        allListClass.map((item, index) => {
          return (
            <div key={index}>
              <h2 className="pl-4 py-6">{item.specialty_name}</h2>

              <div className="flex w-full flex-wrap">
                {item.subjects &&
                  item.subjects.map((item1, index1) => {
                    return (
                      item1 &&
                      item1.classes &&
                      item1.classes.map((item2, index2) => {
                        return <ClassItem data={item2} subjectName={item1?.subject_name} />
                      })
                    )
                  })}
              </div>
            </div>
          )
        })
      ) : (
        <h2>Loading...</h2>
      )

    const classObj = {}

    allListClass &&
      allListClass.forEach((item, index) => {
        item.subjects &&
          item.subjects.forEach((item1, index1) => {
            item1 &&
              item1.classes &&
              item1.classes.forEach((item2, index2) => {
                classObj[item2.class_id] = { data: item2, subject_name: item1?.subject_name }
              })
          })
      })

    const classListShow = user?.student?.student_class?.map((item) => {
      const selectClass = classObj[item.class_id]

      if (selectClass) {
        return selectClass
      }
    })

    return (
      <>
        <h3>Danh sách khóa học của tôi: </h3>
        <div className="flex mt-4 flex-wrap">
          {classListShow.length > 0 ? (
            classListShow.map((item) => <ClassItem data={item?.data} subjectName={item?.subject_name} />)
          ) : (
            <h3>Không có môn học nào</h3>
          )}
        </div>
      </>
    )
  }

  return user && renderClass()
}
