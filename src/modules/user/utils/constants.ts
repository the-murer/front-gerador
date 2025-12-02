import { DefaultEndpoint } from "@/modules/common/api/base-endpoint"

export type User = {
  _id: string
  name: string
  email: string
}

class UserEndpoints extends DefaultEndpoint<User> {
  constructor() {
    super('users', 'user')
  }
}


export const userApi = new UserEndpoints()