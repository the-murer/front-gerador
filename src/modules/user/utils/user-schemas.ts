import {
  defaultEmailValidation,
  defaultStringValidation,
} from '@/common/utils/validation-utils'
import { z } from 'zod'

const userSchema = z.object({
  _id: z.string().optional(),
  active: z.boolean(),
  name: defaultStringValidation,
  email: defaultEmailValidation,
  roles: z.array(z.string()),
})

export const userBodySerializer = userSchema.omit({
  _id: true,
  active: true,
})

export const userUpdateSerializer = userSchema.pick({
  name: true,
  email: true,
  roles: true,
})

export type User = z.infer<typeof userSchema>

export type UserBodySerializerType = z.infer<typeof userBodySerializer>
export type UserUpdateSerializerType = z.infer<typeof userUpdateSerializer>
