import moment from 'moment'
import { ClassType } from 'src/types'

type ColumnType = {
  Header: string
  accessor?: keyof ClassType
  Cell?: () => String
}

export const COLUMNS: readonly ColumnType[] = [
  {
    Header: 'Mã lớp',
    accessor: 'class_id',
  },
  {
    Header: 'Ngày bắt đầu',
    accessor: 'start_date',
    Cell: (props) => moment(props.value).format('DD/MM/YYYY'),
  },
  {
    Header: 'Sĩ số tối đa',
    accessor: 'max_number_students',
  },
  {
    Header: 'Sĩ số',
    accessor: 'current_number_students',
  },
  {
    Header: 'Giảng viên',
    accessor: 'teacher.user.full_name',
  },
  {
    Header: 'Môn học',
    accessor: 'subject.subject_name',
  },
]

// value = 0 is disabled | 1 is checked | 2 is disabled and checked
export const TWO_D_ARRAY = new Array(16).fill(0).map(() => new Array(7).fill(0))

export const convert2DArrayToArrayObject = (array: number[][]) => {
  const result = {}
  array.forEach((item, index) => {
    item.forEach((item2, index2) => {
      if (item2 === 1) {
        if (result[index2] === undefined) {
          result[index2] = [index]
        } else {
          result[index2] = [...result[index2], index]
        }
      }
    })
  })

  //
  const arrayResult = []
  Object.keys(result).forEach((key) => {
    arrayResult.push({
      day: Number(key),
      lessons: result[key],
    })
  })

  return arrayResult
}

export const FORM_CREATE_LABEL = 'Thêm lớp học'
export const FORM_UPDATE_LABEL = 'Sửa thông tin lớp học'
