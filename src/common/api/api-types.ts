export type PaginatedParams = {
  page: number
  limit?: number
  sort?: string
  sortOrder?: 'asc' | 'desc'
  [key: string]: string | number | boolean | undefined
}

export type PaginatedResponse<T> = {
  metadata: {
    total: number
  }
  items: T[]
}
