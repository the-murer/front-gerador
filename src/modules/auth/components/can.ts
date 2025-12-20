import type { User } from '@/modules/user/utils/constants'

export const can = (user: User, entity: string, action: string) => {
  return !!user
}