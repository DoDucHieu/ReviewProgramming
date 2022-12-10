import { useMutation, useQueryClient } from 'react-query'
import documentApi from 'src/apis/documentApi'
import { RQ } from 'src/const'

const create = (handleSuccess = () => {}, handleError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(documentApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.CLASS)
      handleSuccess()
    },

    onError: (error) => {
      handleError()
    },
  })
}

const update = (handleSuccess = () => {}, handleError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(documentApi.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.CLASS)
      handleSuccess()
    },

    onError: (error) => {
      handleError()
    },
  })
}

const deleteById = (handleSuccess = () => {}, handleError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(documentApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.CLASS)
      handleSuccess()
    },

    onError: (error) => {
      handleError()
    },
  })
}

const useDocumentMutation = {
  create,
  update,
  delete: deleteById,
}

export default useDocumentMutation
