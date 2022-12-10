import { useQuery } from 'react-query'
import classApi from 'src/apis/classApi'
import { RQ } from 'src/const'
import { ResponseType, ClassType } from 'src/types'

export type QueriesType = ResponseType & {
  data: ClassType[]
}

export type QueryType = ResponseType & {
  data: ClassType
}

const getById = (id = '') =>
  useQuery([RQ.CLASS, id], () => classApi.getById(id), {
    enabled: !!id,
    select: (data): QueryType => data.data,
  })

const getAll = (params = {}) =>
  useQuery([RQ.CLASSES, params], () => classApi.getAll(params), {
    keepPreviousData: true,
    select: (data): QueriesType => data.data,
  })

const useClassQuery = {
  getById,
  getAll,
}

export default useClassQuery
