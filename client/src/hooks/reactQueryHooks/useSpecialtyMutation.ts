import { useMutation, useQueryClient } from 'react-query'
import specialtyApi from 'src/apis/specialtyApi'
import { RQ } from 'src/const'

const create = (handleSuccess = () => {}, handleError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(specialtyApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.SPECIALTIES)
      handleSuccess()
    },

    onError: (error) => {
      handleError()
    },
  })
}

const update = (handleSuccess = () => {}, handleError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(specialtyApi.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.SPECIALTIES)
      handleSuccess()
    },

    onError: (error) => {
      handleError()
    },
  })
}

const deleteById = (handleSuccess = () => {}, handleError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(specialtyApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.SPECIALTIES)
      handleSuccess()
    },

    onError: (error) => {
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
