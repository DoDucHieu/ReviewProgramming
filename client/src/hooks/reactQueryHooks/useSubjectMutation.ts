import { useMutation, useQueryClient } from 'react-query'
import subjectApi from 'src/apis/subjectApi'
import { RQ } from 'src/const'

const create = (handleSuccess = () => {}, handleError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(subjectApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.SUBJECTS)
      handleSuccess()
    },

    onError: () => {
      handleError()
    },
  })
}

const update = (handleSuccess = () => {}, handleError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(subjectApi.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.SUBJECTS)
      handleSuccess()
    },

    onError: () => {
      handleError()
    },
  })
}

const deleteById = (handleSuccess = () => {}, handleError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(subjectApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.SUBJECTS)
      handleSuccess()
    },

    onError: () => {
      handleError()
    },
  })
}

const useSubjectMutation = {
  create,
  update,
  delete: deleteById,
}

export default useSubjectMutation
