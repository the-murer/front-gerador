import { useQuery } from '@tanstack/react-query'
import { aiApi } from '../utils/constants'
import type { PaginatedParams } from '@/common/api/api-types'

export const useFindChats = ({
  page = 1,
  limit = 10,
  sort = 'createdAt',
  sortOrder = 'desc',
}: Partial<PaginatedParams> = {}) => {
  return useQuery({
    queryFn: () => aiApi.findChats({ page, limit, sort, sortOrder }),
    queryKey: aiApi.keys.find({ page, limit, sort, sortOrder }),
  })
}
