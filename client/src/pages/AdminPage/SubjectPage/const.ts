import { SubjectType } from 'src/types'

type ColumnType = {
  Header: string
  accessor?: keyof SubjectType
  Cell?: () => String
}

export const COLUMNS: readonly ColumnType[] = [
  {
    Header: 'Tên môn',
    accessor: 'subject_name',
  },
  {
    Header: 'Chuyên khoa',
    accessor: 'specialty.specialty_name',
  },
  {
    Header: 'Số tín chỉ',
    accessor: 'credit.number_of_credits',
  },
]

export const FORM_CREATE_LABEL = 'Thêm môn học'
export const FORM_UPDATE_LABEL = 'Sửa thông tin môn học'
