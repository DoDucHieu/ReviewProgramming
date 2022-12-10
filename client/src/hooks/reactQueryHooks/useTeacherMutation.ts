import { useMutation, useQueryClient } from 'react-query'
import teacherApi from 'src/apis/teacherApi'
import { RQ } from 'src/const'

const create = (handleSuccess = () => {}, handleError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(teacherApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.TEACHERS)
      handleSuccess()
    },

    onError: () => {
      handleError()
    },
  })
}

const update = (handleSuccess = () => {}, handleError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(teacherApi.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.TEACHERS)
      handleSuccess()
    },

    onError: () => {
      handleError()
    },
  })
}

const deleteById = (handleSuccess = () => {}, handleError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(teacherApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.TEACHERS)
      handleSuccess()
    },

    onError: () => {
      handleError()
    },
  })
}

const useTeacherMutation = {
  create,
  update,
  delete: deleteById,
}

export default useTeacherMutation
