import { useNavigate, useSearch } from '@tanstack/react-router'

export const useSearchParams = (path: string) => {
  const search = useSearch({ from: path as any })
  const navigate = useNavigate()

  const updateSearchParams = (updates: {
    page?: number
    sort?: string | undefined
    sortOrder?: 'asc' | 'desc' | undefined
  }) => {
    navigate({
      to: path,
      search: (prev) => ({
        ...prev,
        ...updates,
      }),
      replace: !!updates.page,
    })
  }

  const onSort = (column: string) => {
    let newSort: string | undefined = column
    let newSortOrder: 'asc' | 'desc' | undefined = 'asc'

    if (search.sort === column) {
      newSortOrder = search.sortOrder === 'asc' ? 'desc' : 'asc'
    }

    updateSearchParams({
      sort: newSort,
      sortOrder: newSortOrder,
      page: 1,
    })
  }

  const handlePageChange = (newPage: number) => {
    updateSearchParams({ page: newPage })
  }

  return {
    search,
    updateSearchParams,
    sort: {
      onSort,
      sortOrder: search.sortOrder,
      sortedBy: search.sort,
    },
    handlePageChange,
  }
}
