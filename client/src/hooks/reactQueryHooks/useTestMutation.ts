import { useMutation, useQueryClient } from 'react-query'
import specialtyApi from 'src/apis/specialtyApi'
import { RQ } from 'src/const'

import type { QueriesType } from './useSpecialtyQuery'

const create = () => {
  const queryClient = useQueryClient()

  return useMutation(specialtyApi.create, {
    onMutate: async (newData) => {
      await queryClient.cancelQueries(RQ.SPECIALTIES)

      const previousData = queryClient.getQueryData(RQ.SPECIALTIES)

      queryClient.setQueryData<QueriesType | undefined>(RQ.SPECIALTIES, (oldData) => {
        if (oldData) {
          return {
            ...oldData,
            data: [
              ...oldData.data,
              {
                ...newData,
                id: Math.random() * 1000,
              },
            ],
          }
        }
      })

      return { previousData }
    },

    onError: (_error, _newData, context: any) => {
      if (context.previousData) {
        queryClient.setQueryData<QueriesType | undefined>(RQ.SPECIALTIES, context.previousData)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries(RQ.SPECIALTIES)
    },
  })
}

const update = () => {
  const queryClient = useQueryClient()

  return useMutation(specialtyApi.update, {
    onMutate: async (updateData) => {
      await queryClient.cancelQueries(RQ.SPECIALTIES)

      const previousData = queryClient.getQueryData(RQ.SPECIALTIES)

      queryClient.setQueryData<QueriesType | undefined>(RQ.SPECIALTIES, (oldData) => {
        if (oldData) {
          return {
            ...oldData,
            data: oldData.data.map((item) => (item.id === updateData.id ? updateData : item)),
          }
        }
      })

      return { previousData }
    },

    onError: (_error, _updateData, context: any) => {
      if (context.previousData) {
        queryClient.setQueryData<QueriesType | undefined>(RQ.SPECIALTIES, context.previousData)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries(RQ.SPECIALTIES)
    },
  })
}

const deleteById = () => {
  const queryClient = useQueryClient()

  return useMutation(specialtyApi.delete, {
    onMutate: async (id) => {
      await queryClient.cancelQueries(RQ.SPECIALTIES)

      const previousData = queryClient.getQueryData(RQ.SPECIALTIES)

      queryClient.setQueryData<QueriesType | undefined>(RQ.SPECIALTIES, (oldData) => {
        if (oldData) {
          return {
            ...oldData,
            data: oldData.data.filter((item) => item.id !== id),
          }
        }
      })

      return { previousData }
    },

    onError: (_error, _id, context: any) => {
      if (context.previousData) {
        queryClient.setQueryData<QueriesType | undefined>(RQ.SPECIALTIES, context.previousData)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries(RQ.SPECIALTIES)
    },
  })
}

const useSpecialtyMutation = {
  create,
  update,
  delete: deleteById,
}

export default useSpecialtyMutation
