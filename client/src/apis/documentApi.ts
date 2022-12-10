import { DocumentType } from 'src/types'
import axiosClient from './axiosClient'

const URL = 'documents'

const specialtyApi = {
  // getById: (id: number) => axiosClient.get(`${URL}/${id}`),
  // getAll: (params: {}) => axiosClient.get(`/${URL}`, params),
  create: (body: DocumentType) => axiosClient.post(`/${URL}`, body),
  update: (body: DocumentType) => axiosClient.put(`/${URL}/${body.id}`, body),
  delete: (id: number | undefined) => axiosClient.delete(`/${URL}/${id}`),
}

export default specialtyApi
