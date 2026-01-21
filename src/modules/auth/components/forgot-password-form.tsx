import { VStack, Button } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { DefaultInput } from '@/ui/components/input/input'
import { InputTypes } from '@/ui/components/input/input-map'
import { toaster } from '@/ui/storybook/toaster'
import { useForgotPassword } from '../hooks/use-forgot-password'
import { Typography } from '@/ui/components/typography/typography'
import { useNavigate } from '@tanstack/react-router'

type ForgotPasswordPayload = {
  email: string
}

export default function ForgotPasswordForm() {
  const { mutateAsync: forgotPassword, isSuccess } = useForgotPassword()
  const { handleSubmit, control } = useForm<ForgotPasswordPayload>()
  const navigate = useNavigate()

  const onSubmit = async (data: ForgotPasswordPayload) => {
    try {
      await forgotPassword(data)
    } catch (err) {
      toaster.error({
        title: 'Falha ao recuperar senha',
      })
    }
  }

  if (isSuccess) {
    return (
      <VStack w="lg" gap={4} align="center">
        <Typography color="white" fontWeight="bold" fontSize="lg">
          Verifique seu email!
        </Typography>
        <Typography color="gray.500" fontSize="md">
          Enviamos um link de recuperação para o seu endereço de email.
          <br />
          Por favor, verifique sua caixa de entrada (e a de spam) para
          prosseguir com a redefinição da sua senha.
        </Typography>
        <Button
          variant="subtle"
          w="full"
          onClick={() => navigate({ to: '/auth/login' })}
        >
          Voltar a página de login
        </Button>
      </VStack>
    )
  }

  return (
    <VStack w="full" gap={4}>
      <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        <VStack w="full" gap={4}>
          <DefaultInput
            type={InputTypes.TEXT}
            control={control}
            name="email"
            label="Email"
            placeholder="Digite seu email"
            rules={{ required: 'Campo obrigatório' }}
          />

          <Button type="submit" width="100%" mt={4}>
            Enviar link de recuperação
          </Button>
        </VStack>
      </form>
      <Button
        variant="subtle"
        w="full"
        onClick={() => navigate({ to: '/auth/login' })}
      >
        Voltar a página de login
      </Button>
    </VStack>
  )
}
