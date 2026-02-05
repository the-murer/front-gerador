import { useQuery } from '@tanstack/react-query'
import { userApi } from '../utils/user-constants'
import type { PaginatedParams } from '@/common/api/api-types'

export const useFindUsers = ({
  page,
  limit = 10,
  sort,
  sortOrder,
  name,
  email,
  active,
}: PaginatedParams) => {
  return useQuery({
    queryFn: () =>
      userApi.find({ page, limit, sort, sortOrder, name, email, active }),
    queryKey: userApi.keys.find({
      page,
      limit,
      sort,
      sortOrder,
      name,
      email,
      active,
    }),
  })
}
