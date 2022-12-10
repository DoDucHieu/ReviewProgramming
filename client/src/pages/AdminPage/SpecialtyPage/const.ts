import { SpecialtyType } from 'src/types'

type ColumnType = {
  Header: string
  accessor?: keyof SpecialtyType
  Cell?: () => String
}

export const COLUMNS: readonly ColumnType[] = [
  {
    Header: 'Mã khoa',
    accessor: 'id',
  },
  {
    Header: 'Chuyên khoa',
    accessor: 'specialty_name',
  },
]

export const FORM_CREATE_LABEL = 'Thêm chuyên khoa'
export const FORM_UPDATE_LABEL = 'Sửa thông tin chuyên khoa'
