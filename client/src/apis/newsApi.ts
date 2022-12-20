import { NewsType } from 'src/types'
import axiosClient from './axiosClient'

const URL = 'news'

const newsApi = {
  getById: (id: number) => axiosClient.get(`${URL}/${id}`),
  getAll: (params: {}) => axiosClient.get(`/${URL}`, { params }),
  create: (body: NewsType) => axiosClient.post(`/${URL}`, body),
  update: (body: NewsType) => axiosClient.put(`/${URL}/${body.title}`, body),
  patch: (id: number) => axiosClient.patch(`/${URL}/active/${id}`),
  delete: (id: number) => axiosClient.delete(`/${URL}/${id}`),
  getAllWaiting: (params: {}) => axiosClient.get(`/${URL}/waiting`, { params }),
  activeWaiting: (id: number) => axiosClient.patch(`/${URL}/active/${id}`),
}

export default newsApi
