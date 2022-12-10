import { useQuery } from 'react-query'
import teacherApi from 'src/apis/teacherApi'
import { RQ } from 'src/const'
import { ResponseType, UserType } from 'src/types'

export type QueriesType = ResponseType & {
  data: UserType[]
}

export type QueryType = ResponseType & {
  data: UserType
}

const getById = (id = 0) =>
  useQuery([RQ.TEACHER, id], () => teacherApi.getById(id), {
    enabled: !!id,
    select: (data): QueryType => data.data,
  })

const getAll = (params = {}, enabled = true) =>
  useQuery([RQ.TEACHERS, params], () => teacherApi.getAll(params), {
    enabled,
    keepPreviousData: true,
    select: (data): QueriesType => data.data,
  })

const useTeacherQuery = {
  getById,
  getAll,
}

export default useTeacherQuery
