import {
  DefaultEndpoint,
  type IBaseEndpointOptions,
} from '@/common/api/base-endpoint'

export type User = {
  _id: string
  active: boolean
  name: string
  email: string
  roles: string[]
  createdAt: string
  updatedAt: string
}

class UserEndpoints extends DefaultEndpoint<User> {
  constructor() {
    super('users', 'user')
  }

  async changeActive(
    id: string,
    active: boolean,
    options?: IBaseEndpointOptions,
  ) {
    return this.api
      .patch<User>(`${this.basePath}/active`, {
        id,
        active,
      })
      .then((r) => {
        this.invalidateGetQueries(id, options?.queryClient)
        this.invalidateFindQueries(options?.queryClient)

        return r.data
      })
  }
}

export const userApi = new UserEndpoints()
