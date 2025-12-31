import { VStack, Button } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { DefaultInput } from '@/ui/components/input/input'
import { InputTypes } from '@/ui/components/input/input-map'
import { toaster } from '@/ui/storybook/toaster'
import { Typography } from '@/ui/components/typography/typography'
import { useNavigate } from '@tanstack/react-router'
import { useRecoverPassword } from '../hooks/use-recover-password'

type RecoverPasswordPayload = {
  password: string
}

export default function RecoverPasswordForm({ hash }: { hash: string }) {
  const { mutateAsync: recoverPassword, isSuccess } = useRecoverPassword()
  const { handleSubmit, control } = useForm<RecoverPasswordPayload>()
  const navigate = useNavigate()

  const onSubmit = async (data: RecoverPasswordPayload) => {
    try {
      await recoverPassword({ hash, ...data })
    } catch (err) {
      toaster.error({
        title: 'Falha ao recuperar senha',
      })
    }
  }

  if (!hash) {
    return (
      <VStack w="lg" gap={4} align="center">
        <Typography color="white" fontWeight="bold" fontSize="lg">
          Link de recuperação inválido!
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

  if (isSuccess) {
    return (
      <VStack w="lg" gap={4} align="center">
        <Typography color="white" fontWeight="bold" fontSize="lg">
          Senha recuperada com sucesso!
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
    <VStack w="lg">
      <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        <DefaultInput
          type={InputTypes.PASSWORD}
          control={control}
          name="password"
          label="Senha"
          placeholder="Digite sua senha"
          rules={{ required: 'Campo obrigatório' }}
        />

        <DefaultInput
          type={InputTypes.PASSWORD}
          control={control}
          name="confirmPassword"
          label="Confirmar senha"
          placeholder="Digite sua senha novamente"
          rules={{ required: 'Campo obrigatório' }}
        />

        <Button type="submit" width="100%" mt={4}>
          Recuperar senha
        </Button>
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
