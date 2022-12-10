import { useMutation, useQueryClient } from 'react-query'
import studentApi from 'src/apis/studentApi'
import { RQ } from 'src/const'

const create = (handleSuccess = () => {}, handleError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(studentApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.STUDENTS)
      handleSuccess()
    },

    onError: () => {
      handleError()
    },
  })
}

const update = (handleSuccess = () => {}, handleError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(studentApi.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.STUDENTS)
      handleSuccess()
    },

    onError: () => {
      handleError()
    },
  })
}

const deleteById = (handleSuccess = () => {}, handleError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(studentApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.STUDENTS)
      handleSuccess()
    },

    onError: () => {
      handleError()
    },
  })
}

const useStudentMutation = {
  create,
  update,
  delete: deleteById,
}

export default useStudentMutation
