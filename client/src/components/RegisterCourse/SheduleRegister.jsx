import React, { useState } from 'react'
import RegisterModal from './RegisterModal'
import { AuthContext } from '../../contexts/authContext/AuthContext'
import useStudentQuery from '../../hooks/reactQueryHooks/useStudentQuery'
import studentClassApi from '../../apis/studentClassApi'

import moment from 'moment'

import Subject from './Subject'

// type Props = {}

export default function ScheduleRegister(Props) {
  const { user } = React.useContext(AuthContext)

  //react query
  const { data: student } = useStudentQuery.getById(user?.user_id)
  let arrStudentClass = student?.data?.student?.student_class
  console.log('check: ', arrStudentClass)

  let Select = (props) => {
    return (
      <div
        className="text-red-500 text-base rounded mb-2 cursor-pointer"
        onClick={() => handleOnclickSelect(props?.day, props?.session)}
      >
        <b className="my-1">{props?.name}</b>
      </div>
    )
  }

  let handleOnclickSelect = (day, session) => {
    setDay(day)
    setSession(session)
    handleOpen()
  }

  let handleOnclickCancelCourse = async (item) => {
    let data = {
      class_id: item,
      user_id: user?.user_id,
    }
    try {
      let res = await studentClassApi.delete(data)
      if (res) {
      }
    } catch (error) {
      console.log(error)
    }
  }

  let [day, setDay] = useState('')
  let [session, setSession] = useState('')

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <RegisterModal open={open} handleOpen={handleOpen} handleClose={handleClose} day={day} session={session} />
      <p className="my-2 text-center font-Inter text-2xl font-normal">
        {moment().format('DD ')}
        <span className="font-black text-[28px]">{moment().format('[Tháng] M')}</span> {moment().format('YYYY')}
      </p>
      <br></br>
      <table
        style={{ borderSpacing: 0 }}
        className="border-black w-full text-center table-fixed text-xl font-Inter rounded-lg shadow-fakeBorderTable"
      >
        <thead>
          <tr className="child:border child:border-solid child:font-medium">
            <th className="w-[10%] rounded-tl-lg">Buổi</th>
            <th>Thứ 2</th>
            <th>Thứ 3</th>
            <th>Thứ 4</th>
            <th>Thứ 5</th>
            <th>Thứ 6</th>
            <th>Thứ 7</th>
            <th className="rounded-tr-lg">CN</th>
          </tr>
        </thead>
        <tbody>
          <tr className="child:border child:border-solid h-36 child:font-medium">
            <td>Sáng</td>
            <td>
              <Select name={'[Chọn]'} day={0} session={'morning'} />
              <Subject day={0} session={'morning'} />
            </td>
            <td>
              <Select name={'[Chọn]'} day={1} session={'morning'} />
              <Subject day={1} session={'morning'} />
            </td>
            <td>
              <Select name={'[Chọn]'} day={2} session={'morning'} />
              <Subject day={2} session={'morning'} />
            </td>
            <td>
              <Select name={'[Chọn]'} day={3} session={'morning'} />
              <Subject day={3} session={'morning'} />
            </td>
            <td>
              <Select name={'[Chọn]'} day={4} session={'morning'} />
              <Subject day={4} session={'morning'} />
            </td>
            <td>
              <Select name={'[Chọn]'} day={5} session={'morning'} />
              <Subject day={5} session={'morning'} />
            </td>
            <td>
              <Select name={'[Chọn]'} day={6} session={'morning'} />
              <Subject day={6} session={'morning'} />
            </td>
          </tr>
          <tr className="child:border child:border-solid h-36 child:font-medium">
            <td>Chiều</td>
            <td>
              <Select name={'[Chọn]'} day={0} session={'afternoon'} />
              <Subject day={0} session={'afternoon'} />
            </td>
            <td>
              <Select name={'[Chọn]'} day={1} session={'afternoon'} />
              <Subject day={1} session={'afternoon'} />
            </td>
            <td>
              <Select name={'[Chọn]'} day={2} session={'afternoon'} />
              <Subject day={2} session={'afternoon'} />
            </td>
            <td>
              <Select name={'[Chọn]'} day={3} session={'afternoon'} />
              <Subject day={3} session={'afternoon'} />
            </td>
            <td>
              <Select name={'[Chọn]'} day={4} session={'afternoon'} />
              <Subject day={4} session={'afternoon'} />
            </td>
            <td>
              <Select name={'[Chọn]'} day={5} session={'afternoon'} />
              <Subject day={5} session={'afternoon'} />
            </td>
            <td>
              <Select name={'[Chọn]'} day={6} session={'afternoon'} />
              <Subject day={6} session={'afternoon'} />
            </td>
          </tr>
          <tr className="child:border child:border-solid h-36 child:font-medium ">
            <td className="rounded-bl-lg">Tối</td>
            <td>
              <Select name={'[Chọn]'} day={0} session={'evening'} />
              <Subject day={0} session={'evening'} />
            </td>
            <td>
              <Select name={'[Chọn]'} day={1} session={'evening'} />
              <Subject day={1} session={'evening'} />
            </td>
            <td>
              <Select name={'[Chọn]'} day={2} session={'evening'} />
              <Subject day={2} session={'evening'} />
            </td>
            <td>
              <Select name={'[Chọn]'} day={3} session={'evening'} />
              {/* <Subject name={'Đồ họa máy tính'} time={'6:00 - 7:00'} /> */}
              <Subject day={3} session={'evening'} />
            </td>
            <td>
              <Select name={'[Chọn]'} day={4} session={'evening'} />
              <Subject day={4} session={'evening'} />
            </td>
            <td>
              <Select name={'[Chọn]'} day={5} session={'evening'} />
              <Subject day={5} session={'evening'} />
            </td>
            <td className="rounded-br-lg">
              <Select name={'[Chọn]'} day={6} session={'evening'} />
              <Subject day={6} session={'evening'} />
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      <br />

      <h3 className="flex justify-center">Danh sách học phần đã đăng ký</h3>
      <table
        style={{ borderSpacing: 0 }}
        className="border-black w-full text-center table-fixed text-xl font-Inter rounded-lg shadow-fakeBorderTable"
      >
        <thead>
          <tr className="child:border child:border-solid h-12 child:font-medium">
            <th className="w-[40%] rounded-tl-lg">Tên học phần</th>
            <th>Mã lớp</th>
            <th className="rounded-tr-lg">Chức năng</th>
          </tr>
          {arrStudentClass &&
            arrStudentClass.length > 0 &&
            arrStudentClass.map((item, index) => {
              return (
                <>
                  <tr className="child:border child:border-solid  text-base">
                    <td>{item?.class?.subject?.subject_name}</td>
                    <td>{item?.class?.class_id}</td>
                    <td>
                      <button
                        className="cursor-pointer px-3 py-1 text-red-600 border-none rounded"
                        onClick={() => handleOnclickCancelCourse(item?.class?.class_id)}
                      >
                        Hủy học phần
                      </button>
                    </td>
                  </tr>
                </>
              )
            })}
        </thead>
      </table>
    </div>
  )
}

let fake_data_list_class_of_student = [
  {
    class_id: 'PHP007',
    start_date: 'Fri May 20 2022 10:43:50 GMT+0700',
    max_number_students: 70,
    current_number_students: 0,
    user_id: 3,
    schedules: '[{"day":0,"lessons":[7,8]},{"day":3,"lessons":[7,8]}]',
    subject_id: 2,
    teacher: {
      user_id: 3,
      specialty_id: 2,
      user: {
        user_id: 3,
        full_name: 'Hoang Tuan Hieu',
        email: 'tranducha2@gmail.com',
        date_of_birth: '1996-01-01',
        gender: 'fe-male',
        address: 'Bac Ninh',
        avatar: '',
        username: 'hoangtuanhieu',
        role_id: 'r2',
      },
    },
    subject: {
      id: 1,
      subject_name: 'Tiếng anh công nghệ thông tin',
      image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png',
      description:
        'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú. Sau khi học xong thì không ngán bất cứ một ai, cứ đến là đón',
      specialty_id: 1,
      credit_id: 1,
      background_color: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
    },
  },
  {
    class_id: 'PHP007',
    start_date: 'Fri May 20 2022 10:43:50 GMT+0700',
    max_number_students: 70,
    current_number_students: 0,
    user_id: 3,
    schedules: '[{"day":0,"lessons":[1,2,3]}]',
    subject_id: 2,
    teacher: {
      user_id: 3,
      specialty_id: 2,
      user: {
        user_id: 3,
        full_name: 'Hoang Tuan Hieu',
        email: 'tranducha2@gmail.com',
        date_of_birth: '1996-01-01',
        gender: 'fe-male',
        address: 'Bac Ninh',
        avatar: '',
        username: 'hoangtuanhieu',
        role_id: 'r2',
      },
    },
    subject: {
      id: 1,
      subject_name: 'Lập trình web bằng PHP',
      image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png',
      description:
        'Với kiến thức ong đốt đặc trưng đã làm nên thương hiệu của thầy Nguyễn Trung Phú. Sau khi học xong thì không ngán bất cứ một ai, cứ đến là đón',
      specialty_id: 1,
      credit_id: 1,
      background_color: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
    },
  },
]
