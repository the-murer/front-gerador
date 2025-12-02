import { useQuery } from '@tanstack/react-query'
import { userApi } from '../utils/constants'

export const useGetUser = ({ id }: { id: string }) => {
  return useQuery({
    queryFn: () => userApi.get(id),
    queryKey: userApi.keys.get(id),
  })
}
