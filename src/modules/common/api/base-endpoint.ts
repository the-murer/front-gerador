import { api } from '@/modules/common/api'
import type {
  PaginatedParams,
  PaginatedResponse,
} from '@/modules/common/api/api-types'

export interface IBaseEndpoint<T> {
  keys: {
    find: (params: PaginatedParams) => unknown[]
    get: (id: string) => unknown[]
  }
  find(params: PaginatedParams): Promise<PaginatedResponse<T>>
  get(id: string): Promise<T>
}

export abstract class DefaultEndpoint<T> implements IBaseEndpoint<T> {
  constructor(
    protected basePath: string,
    protected entity: string,
  ) {}

  keys = {
    find: (params: PaginatedParams) => [`${this.entity}-find`, params],
    get: (id: string) => [`${this.entity}-get`, id],
  }

  find(params: PaginatedParams): Promise<PaginatedResponse<T>> {
    return api.get(this.basePath, { params }).then((r) => r.data)
  }

  get(id: string): Promise<T> {
    return api.get(`${this.basePath}/${id}`).then((r) => r.data)
  }
}
