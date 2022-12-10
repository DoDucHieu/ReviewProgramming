import { SpecialtyType } from 'src/types'
import axiosClient from './axiosClient'

const URL = 'specialties'

const specialtyApi = {
  getById: (id: number) => axiosClient.get(`${URL}/${id}`),
  getAll: (params: {}) => axiosClient.get(`/${URL}`, params),
  create: (body: SpecialtyType) => axiosClient.post(`/${URL}`, body),
  update: (body: SpecialtyType) => axiosClient.put(`/${URL}/${body.id}`, body),
  delete: (id: number | undefined) => axiosClient.delete(`/${URL}/${id}`),
}

export default specialtyApi
