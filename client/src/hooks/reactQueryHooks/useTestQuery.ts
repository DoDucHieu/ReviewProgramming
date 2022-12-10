import { useQuery } from 'react-query'
import specialtyApi from 'src/apis/specialtyApi'
import { RQ } from 'src/const'
import { ResponseType, SpecialtyType } from 'src/types'

export type QueriesType = ResponseType & {
  data: SpecialtyType[]
}

const getById = (id = 0) =>
  useQuery(RQ.SPECIALTY, () => specialtyApi.getById(id), {
    enabled: !!id,
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
