import moment from 'moment'
import { UserType } from 'src/types'

type ColumnType = {
  Header: string
  accessor?: keyof UserType
  Cell?: () => String
}

export const COLUMNS: readonly ColumnType[] = [
  {
    Header: 'Họ tên',
    accessor: 'full_name',
  },
  {
    Header: 'Tên đăng nhập',
    accessor: 'username',
  },
  {
    Header: 'Ngày sinh',
    accessor: 'date_of_birth',
    Cell: (props) => moment(props.value).format('DD/MM/YYYY'),
  },
  {
    Header: 'Giới tính',
    accessor: 'gender',
    Cell: (props) => (props.value === 'male' ? 'nam' : `nữ`),
  },
  {
    Header: 'Chuyên khoa',
    accessor: 'teacher.specialty.specialty_name',
  },
  {
    Header: 'Địa chỉ',
    accessor: 'address',
  },
]

export const FORM_CREATE_LABEL = 'Thêm giảng viên'
export const FORM_UPDATE_LABEL = 'Sửa thông tin giảng viên'
