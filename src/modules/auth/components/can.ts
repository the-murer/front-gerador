import type { User } from '@/modules/user/utils/user-constants'
import {
  defineAbility,
  type Actions,
  type Subjects,
} from '../utils/ability.factory'

export const can = (
  user: User | null,
  action: Actions,
  subject: Subjects,
): boolean => {
  if (!user) return false
  const ability = defineAbility(user)
  return ability.can(action, subject)
}

export { Can } from './can-component'
export type { Actions, Subjects } from '../utils/ability.factory'
