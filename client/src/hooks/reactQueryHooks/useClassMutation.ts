import { useMutation, useQueryClient } from 'react-query'
import classApi from 'src/apis/classApi'
import { RQ } from 'src/const'

const create = (handleSuccess = () => {}, handleError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(classApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.CLASSES)
      handleSuccess()
    },

    onError: () => {
      handleError()
    },
  })
}

const update = (handleSuccess = () => {}, handleError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(classApi.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.CLASSES)
      handleSuccess()
    },

    onError: () => {
      handleError()
    },
  })
}

const deleteById = (handleSuccess = () => {}, handleError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(classApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.CLASSES)
      handleSuccess()
    },

    onError: () => {
      handleError()
    },
  })
}


//Do duc hieu code
const getAllClass = (handleSuccess = () => {}, handleError = () => {}) => {
  const queryClient = useQueryClient()

  return useMutation(classApi.getAll, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQ.CLASSES)
      handleSuccess()
    },

    onError: () => {
      handleError()
    },
  })
}


const useClassMutation = {
  create,
  update,
  delete: deleteById,
}

export default useClassMutation
