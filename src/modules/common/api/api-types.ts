export type PaginatedParams = {
  page: number
  limit?: number
}

export type PaginatedResponse<T> = {
  metadata: {
    total: number
  }
  items: T[]
}
