import { useQuery } from 'react-query'
import creditApi from 'src/apis/creditApi'
import { RQ } from 'src/const'
import { ResponseType, CreditType } from 'src/types'

export type QueriesType = ResponseType & {
  data: CreditType[]
}

export type QueryType = ResponseType & {
  data: CreditType
}

const getById = (id = 0) =>
  useQuery([RQ.CREDIT, id], () => creditApi.getById(id), {
    enabled: !!id,
    select: (data): QueryType => data.data,
  })

const getAll = (params = {}) =>
  useQuery([RQ.CREDITS, params], () => creditApi.getAll(params), {
    keepPreviousData: true,
    select: (data): QueriesType => data.data,
  })

const useCreditQuery = {
  getById,
  getAll,
}

export default useCreditQuery
