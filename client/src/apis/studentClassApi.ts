import { StudentClassType } from 'src/types'
import axiosClient from './axiosClient'

const URL = 'student-class'

const studentClassApi = {
  // getById: (id: number) => axiosClient.get(`${URL}/${id}`),
  // getAll: (params: {}) => axiosClient.get(`/${URL}`, { params }),
  create: (body: StudentClassType) => axiosClient.post(`/${URL}`, body),
  // update: (body: StudentClassType) => axiosClient.put(`/${URL}/${body.id}`, body),
  delete: (body: {user_id:number,class_id:string}) => axiosClient.put(`/${URL}/delete`,body),
}

export default studentClassApi
