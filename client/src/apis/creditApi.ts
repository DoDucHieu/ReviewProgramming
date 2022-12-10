import { CreditType } from 'src/types'
import axiosClient from './axiosClient'

const URL = 'credits'

const creditApi = {
  getById: (id: number) => axiosClient.get(`${URL}/${id}`),
  getAll: (params: {}) => axiosClient.get(`/${URL}`, params),
  create: (body: CreditType) => axiosClient.post(`/${URL}`, body),
  update: (body: CreditType) => axiosClient.put(`/${URL}/${body.id}`, body),
  delete: (id: number | undefined) => axiosClient.delete(`/${URL}/${id}`),
}

export default creditApi
