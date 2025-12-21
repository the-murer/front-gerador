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

  return {
    search,
    updateSearchParams,
  }
}
