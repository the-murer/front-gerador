import { Ability, AbilityBuilder, PureAbility } from '@casl/ability'
import type { User } from '@/modules/user/utils/constants'

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'
export type Subjects = 'User' | 'all'

export type AppAbility = PureAbility<[Actions, Subjects]>

export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user',
}

export function defineAbility(user: User | null): AppAbility {
  const { can, build } = new AbilityBuilder<AppAbility>(Ability)

  if (!user) {
    return build()
  }

  const includeRole = (role: UserRoles) => {
    return user.roles.some((r) => r === role)
  }

  if (includeRole(UserRoles.ADMIN)) {
    can('manage', 'all')
  }
  if (includeRole(UserRoles.USER)) {
    can('read', 'all')
  }

  return build()
}
