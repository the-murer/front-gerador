import { z } from 'zod'

const userSchema = z.object({
  active: z.boolean(),
  name: z.string().min(3),
  email: z.email(),
  roles: z.array(z.string()),
})

export type User = z.infer<typeof userSchema>

export const userBodySerializer = userSchema.omit({
  active: true,
})

export const userUpdateSerializer = userSchema.omit({
  active: true,
})

export const userPaginatedSerializer = userSchema.omit({
  active: true,
})