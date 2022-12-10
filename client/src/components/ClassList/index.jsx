import ClassItem from './ClassItem'
import { Grid } from '@mui/material'
import React, { Component, useState } from 'react'
import Carousel from 'react-elastic-carousel'
import { AuthContext } from '../../contexts/authContext/AuthContext'
import useSpecialtyQuery from '../../hooks/reactQueryHooks/useSpecialtyQuery'

export default function ClassList() {
  const { user } = React.useContext(AuthContext)
  const { data: specialties } = useSpecialtyQuery.getAll()

  let allListClass = specialties?.data

  //list class with role r2(teacher)
  let handleListClassOfTeacher = (arr) => {
    let data = []
    allListClass &&
      allListClass.map((item, index) => {
        item.subjects &&
          item.subjects.map((item1, index1) => {
            item1 &&
              item1.classes &&
              item1.classes.map((item2, index2) => {
                if (item2 && item2?.user_id === user?.user_id) {
                  data.push({ data: item2, subject_name: item1?.subject_name })
                }
              })
          })
      })
    return data
  }

  let listClassOfTeacher = handleListClassOfTeacher(allListClass)

  // console.log('list: ', listClassOfTeacher)
  return (
    <>
      {user && user?.role_id === 'r2' ? (
        <>
          <h3>Danh sách lớp học đang dạy:</h3>
          <div className="flex mt-4 flex-wrap">
            {listClassOfTeacher && listClassOfTeacher.length > 0 ? (
              listClassOfTeacher.map((item, index) => {
                return <ClassItem data={item?.data} subjectName={item?.subject_name} />
              })
            ) : (
              <>Không có môn học nào</>
            )}
          </div>
        </>
      ) : (
        allListClass &&
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
                        // console.log('data: ', item2)
                        return <ClassItem data={item2} subjectName={item1?.subject_name} />
                      })
                    )
                  })}
              </div>
            </div>
          )
        })
      )}
    </>
  )
}
