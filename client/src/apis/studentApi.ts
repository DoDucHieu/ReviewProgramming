import type { UserType } from 'src/types'
import axiosClient from './axiosClient'

const URL = 'students'

const studentApi = {
  getById: (id: number) => axiosClient.get(`${URL}/${id}`),
  getAll: (params: {}) => axiosClient.get(`/${URL}`, { params }),
  create: (body: UserType) => axiosClient.post(`/${URL}`, body),
  update: (body: UserType) => axiosClient.put(`/${URL}/${body.user_id}`, body),
  delete: (id: number | undefined) => axiosClient.delete(`/${URL}/${id}`),
}

export default studentApi
