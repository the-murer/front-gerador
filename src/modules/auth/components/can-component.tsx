import { useAbility } from '../stores/auth-user-store'
import type { Actions, Subjects } from '../utils/ability.factory'
import { type ReactNode } from 'react'

type CanProps = {
  action?: Actions
  subject?: Subjects
  children: ReactNode
  fallback?: ReactNode
}

export const Can = ({
  action,
  subject,
  children,
  fallback = null,
}: CanProps) => {
  const ability = useAbility()

  if (
    (!action && !subject) ||
    (action && subject && ability.can(action, subject))
  ) {
    return <>{children}</>
  }

  return <>{fallback}</>
}
