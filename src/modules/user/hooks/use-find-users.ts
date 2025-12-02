import { useQuery } from '@tanstack/react-query'
import { userApi } from '../utils/constants'
import type { PaginatedParams } from '@/modules/common/api/api-types'

export const useFindUsers = ({ page, limit = 10 }: PaginatedParams) => {
  return useQuery({
    queryFn: () => userApi.find({ page, limit }),
    queryKey: userApi.keys.find({ page, limit }),
  })
}
