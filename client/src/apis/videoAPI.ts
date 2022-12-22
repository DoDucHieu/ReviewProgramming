import { IVideo } from 'src/interfaces/video'
import axiosClient from './axiosClient'

interface IVideoResponse extends IVideo {
  author: null | {
    user_id: number
    full_name: string
    email: string
    date_of_birth: string
    gender: string
    address: string
    avatar: string
    username: string
    created_at: null | string
    updated_at: null | string
    role_id: string
  }
}

const videoAPIs = {
  getAll: (params?: {}) => axiosClient.get<{ data: IVideoResponse[] }>('/videos', { params }),
  create: (form: FormData) => axiosClient.post<{ message: string }>('/videos', form),
}

export default videoAPIs
