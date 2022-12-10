import { useQuery } from 'react-query'
import specialtyApi from 'src/apis/specialtyApi'
import { RQ } from 'src/const'
import { ResponseType, SpecialtyType } from 'src/types'

export type QueriesType = ResponseType & {
  data: SpecialtyType[]
}

export type QueryType = ResponseType & {
  data: SpecialtyType
}

const getById = (id = 0) =>
  useQuery([RQ.SPECIALTY, id], () => specialtyApi.getById(id), {
    enabled: !!id,
    select: (data): QueryType => data.data,
  })

const getAll = (params = {}) =>
  useQuery([RQ.SPECIALTIES, params], () => specialtyApi.getAll(params), {
    keepPreviousData: true,
    select: (data): QueriesType => data.data,
  })

const useSpecialtyQuery = {
  getById,
  getAll,
}

export default useSpecialtyQuery
