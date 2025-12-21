import { useQuery } from '@tanstack/react-query'
import { userApi } from '../utils/constants'
import type { PaginatedParams } from '@/common/api/api-types'

export const useFindUsers = ({
  page,
  limit = 10,
  sort,
  sortOrder,
}: PaginatedParams) => {
  return useQuery({
    queryFn: () => userApi.find({ page, limit, sort, sortOrder }),
    queryKey: userApi.keys.find({ page, limit, sort, sortOrder }),
  })
}
