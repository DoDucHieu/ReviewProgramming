import { useQuery } from 'react-query'
import subjectApi from 'src/apis/subjectApi'
import { RQ } from 'src/const'
import { ResponseType, SubjectType } from 'src/types'

export type QueriesType = ResponseType & {
  data: SubjectType[]
}

export type QueryType = ResponseType & {
  data: SubjectType
}

const getById = (id = 0) =>
  useQuery([RQ.SUBJECT, id], () => subjectApi.getById(id), {
    enabled: !!id,
    select: (data): QueryType => data.data,
  })

const getAll = (params = {}, enabled = true) =>
  useQuery([RQ.SUBJECTS, params], () => subjectApi.getAll(params), {
    enabled,
    keepPreviousData: true,
    select: (data): QueriesType => data.data,
  })

const useSubjectQuery = {
  getById,
  getAll,
}

export default useSubjectQuery
