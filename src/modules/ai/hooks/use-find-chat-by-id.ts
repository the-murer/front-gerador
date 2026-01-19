import { useQuery } from '@tanstack/react-query'
import { aiApi } from '../utils/constants'

export const useFindChatById = ({ id }: { id?: string }) => {
  return useQuery({
    queryFn: () => aiApi.findChatById(id!),
    queryKey: aiApi.keys.get(id!),
    enabled: !!id,
  })
}
