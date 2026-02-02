import z from 'zod'

export const defaultStringValidation = z
  .string({ required_error: 'Este campo é obrigatório' })
  .min(3, { message: 'Este campo deve ter pelo menos 3 caracteres' })
  .max(255, { message: 'Este campo deve ter no máximo 255 caracteres' })

export const defaultEmailValidation = z
  .string({ required_error: 'Este campo é obrigatório' })
  .email({ message: 'Email inválido' })

export const defaultPasswordValidation = z
  .string({ required_error: 'Este campo é obrigatório' })
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
    },
  )
  .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  .max(255, { message: 'A senha deve ter no máximo 255 caracteres' })
