import { useMutation, useQueryClient } from 'react-query'
import creditApi from 'src/apis/creditApi'
import { RQ } from 'src/const'

const create = (handleSuccess = () => {}, handleError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(creditApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.CREDITS)
      handleSuccess()
    },

    onError: () => {
      handleError()
    },
  })
}

const update = (handleSuccess = () => {}, handleError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(creditApi.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.CREDITS)
      handleSuccess()
    },

    onError: () => {
      handleError()
    },
  })
}

const deleteById = (handleSuccess = () => {}, handleError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(creditApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.CREDITS)
      handleSuccess()
    },

    onError: () => {
      handleError()
    },
  })
}

const useSpecialtyMutation = {
  create,
  update,
  delete: deleteById,
}

export default useSpecialtyMutation
