import OutstandingClass from './OutstandingClass'
import { Grid } from '@mui/material'
import React, { Component, useState } from 'react'

import useClassQuery from '../../hooks/reactQueryHooks/useClassQuery'

export default function ListOutstandingClass() {
  const { data } = useClassQuery.getAll({ sort_by: 'current_number_students', order: 'desc', limit: 10 })
  // console.log('top 10: ', data?.data)

  let dataOutstandingClass = data?.data
  return (
    <>
      <h2 className="px-16 py-4 w-full"> Lớp học nổi bật</h2>

      <div className=" flex px-12 flex-wrap justify-center">
        {dataOutstandingClass &&
          dataOutstandingClass.map((item, index) => {
            return <OutstandingClass data={item} id={item?.class_id} />
          })}
      </div>
    </>
  )
}
