import type { UserType } from 'src/types'
import axiosClient from './axiosClient'

const URL = 'users'

const userApi = {
  update: (user_id: number, body) => axiosClient.post(`/${URL}/upload/${user_id}`, body),
  getById: (id: number) => axiosClient.get(`${URL}/${id}`),
  // getAll: (params: {}) => axiosClient.get(`/${URL}`, { params }),
  // create: (body: UserType) => axiosClient.post(`/${URL}`, body),
  // delete: (id: number | undefined) => axiosClient.delete(`/${URL}/${id}`),
}

export default userApi
