export type PaginatedParams = {
  page: number
  limit?: number
  sort?: string
  sortOrder?: 'asc' | 'desc'
}

export type PaginatedResponse<T> = {
  metadata: {
    total: number
  }
  items: T[]
}
