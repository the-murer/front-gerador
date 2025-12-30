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

  const setSearchParams = (updates: Record<string, any>) => {
    navigate({
      to: path,
      search: (prev: any) => ({
        sort: prev.sort,
        sortOrder: prev.sortOrder,
        page: 1,
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
    setSearchParams,
    sort: {
      onSort,
      sortOrder: search.sortOrder,
      sortedBy: search.sort,
    },
    handlePageChange,
  }
}
