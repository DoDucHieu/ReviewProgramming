import moment from 'moment'
import { UserType } from 'src/types'

type ColumnType = {
  Header: string
  accessor?: keyof UserType
  Cell?: () => String
}

export const COLUMNS: readonly ColumnType[] = [
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
    Header: 'Địa chỉ',
    accessor: 'address',
  },
]

export const FORM_CREATE_LABEL = 'Thêm sinh viên'
export const FORM_UPDATE_LABEL = 'Sửa thông tin sinh viên'
