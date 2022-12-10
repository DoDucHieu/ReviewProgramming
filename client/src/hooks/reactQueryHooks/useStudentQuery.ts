import { useQuery } from 'react-query'
import studentApi from 'src/apis/studentApi'
import { RQ } from 'src/const'
import { ResponseType, UserType } from 'src/types'

export type QueriesType = ResponseType & {
  data: UserType[]
}

export type QueryType = ResponseType & {
  data: UserType
}

const getById = (id = 0) =>
  useQuery([RQ.STUDENT, id], () => studentApi.getById(id), {
    enabled: !!id,
    select: (data): QueryType => data.data,
  })

const getAll = (params = {}) =>
  useQuery([RQ.STUDENTS, params], () => studentApi.getAll(params), {
    keepPreviousData: true,
    select: (data): QueriesType => data.data,
  })

const useStudentQuery = {
  getById,
  getAll,
}

export default useStudentQuery
