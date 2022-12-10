import { ClassType } from 'src/types'
import axiosClient from './axiosClient'

const URL = 'classes'

const classApi = {
  getById: (id: string) => axiosClient.get(`${URL}/${id}`),
  getAll: (params: {}) => axiosClient.get(`/${URL}`, { params }),
  create: (body: ClassType) => axiosClient.post(`/${URL}`, body),
  update: (body: ClassType) => axiosClient.put(`/${URL}/${body.class_id}`, body),
  delete: (id: string) => axiosClient.delete(`/${URL}/${id}`),
}

export default classApi
