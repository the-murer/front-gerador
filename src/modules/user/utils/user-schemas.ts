import {
  customStringValidation,
  defaultBooleanValidation,
  defaultEmailValidation,
} from '@/common/utils/validation-utils'
import { z } from 'zod'
import { defaultSchema } from '@/common/api/api-types'

export const userSerializer = z.object({
  active: defaultBooleanValidation,
  name: customStringValidation({ max: 50 }),
  email: defaultEmailValidation,
  roles: z.array(customStringValidation()),
})

export const userUpdateSerializer = userSerializer.partial()

export type User = z.infer<typeof userSerializer> &
  z.infer<typeof defaultSchema>

export type UserBodySerializerType = z.infer<typeof userSerializer>
export type UserUpdateSerializerType = z.infer<typeof userUpdateSerializer>
