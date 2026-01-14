import { useMutation } from '@tanstack/react-query'
import { fileApi } from '../utils/constants'

export const useUploadFile = () => {
  return useMutation({
    mutationFn: async (file: File) => fileApi.uploadFile(file),
  })
}
