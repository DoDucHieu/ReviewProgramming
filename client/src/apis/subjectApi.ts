import { SubjectType } from 'src/types'
import axiosClient from './axiosClient'

const URL = 'subjects'

const subjectApi = {
  getById: (id: number) => axiosClient.get(`${URL}/${id}`),
  getAll: (params: {}) => axiosClient.get(`/${URL}`, { params }),
  create: (body: SubjectType) => axiosClient.post(`/${URL}`, body),
  update: (body: SubjectType) => axiosClient.put(`/${URL}/${body.id}`, body),
  delete: (id: number | undefined) => axiosClient.delete(`/${URL}/${id}`),
}

export default subjectApi
