import { api } from '@/common/api'
import type {
  PaginatedParams,
  PaginatedResponse,
} from '@/common/api/api-types'
import type { QueryClient } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

export interface IBaseEndpoint<T> {
  keys: {
    find: (params: PaginatedParams) => unknown[]
    get: (id: string) => unknown[]
  }
  find(params: PaginatedParams): Promise<PaginatedResponse<T>>
  get(id: string): Promise<T>
  create(data: T, options?: IBaseEndpointOptions): Promise<T>
  update(
    id: string,
    data: Partial<T>,
    options?: IBaseEndpointOptions,
  ): Promise<T>
  delete(id: string, options?: IBaseEndpointOptions): Promise<T>
}

export interface IBaseEndpointOptions {
  queryClient?: QueryClient
}

export abstract class DefaultEndpoint<T> implements IBaseEndpoint<T> {
  readonly api = api

  constructor(
    protected basePath: string,
    protected entity: string,
  ) {}

  keys = {
    find: (params?: PaginatedParams) => [this.entity, 'find', params || {}],
    get: (id: string) => [this.entity, 'get', id],
  }

  invalidateFindQueries(queryClient?: QueryClient) {
    if (!queryClient) return
    queryClient.invalidateQueries({ queryKey: this.keys.find() })
  }

  invalidateGetQueries(id: string, queryClient?: QueryClient) {
    if (!queryClient) return
    queryClient.invalidateQueries({ queryKey: this.keys.get(id) })
  }

  async create(data: T, options?: IBaseEndpointOptions): Promise<T> {
    return api.post<T>(this.basePath, data).then((r: AxiosResponse<T>) => {
      this.invalidateFindQueries(options?.queryClient)
      return r.data
    })
  }

  async update(
    id: string,
    data: Partial<T>,
    options?: IBaseEndpointOptions,
  ): Promise<T> {
    return api.patch<T>(`${this.basePath}/${id}`, data).then((r: AxiosResponse<T>) => {
      this.invalidateGetQueries(id, options?.queryClient)
      this.invalidateFindQueries(options?.queryClient)
      return r.data
    })
  }

  async delete(id: string, options?: IBaseEndpointOptions): Promise<T> {
    return api.delete<T>(`${this.basePath}/${id}`).then((r: AxiosResponse<T>) => {
      this.invalidateGetQueries(id, options?.queryClient)
      this.invalidateFindQueries(options?.queryClient)

      return r.data
    })
  }

  async find(params: PaginatedParams): Promise<PaginatedResponse<T>> {
    return api.get<PaginatedResponse<T>>(this.basePath, { params }).then((r: AxiosResponse<PaginatedResponse<T>>) => r.data)
  }

  async get(id: string): Promise<T> {
    return api.get<T>(`${this.basePath}/${id}`).then((r: AxiosResponse<T>) => r.data)
  }
}
