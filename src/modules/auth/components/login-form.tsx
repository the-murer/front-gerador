import { VStack, Button } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useLogin } from '../hooks/use-login'
import { DefaultInput } from '@/ui/components/input/input'
import { InputTypes } from '@/ui/components/input/input-map'
import { useNavigate } from '@tanstack/react-router'

type LoginForm = {
  email: string
  password: string
}

export default function LoginForm() {
  const navigate = useNavigate()
  const { mutateAsync: login } = useLogin()
  const { handleSubmit, control } = useForm<LoginForm>()

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data)
      navigate({ to: '/admin/dashboard' })
    } catch (err) {
      console.error('Falha ao logar', err)
    }
  }

  return (
    <VStack w="lg">
      <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        <DefaultInput
          type={InputTypes.TEXT}
          control={control}
          name="email"
          label="Email"
          placeholder="Digite seu email"
          rules={{ required: 'Campo obrigatório' }}
        />

        <DefaultInput
          type={InputTypes.PASSWORD}
          control={control}
          name="password"
          label="Senha"
          placeholder="Digite sua senha"
          rules={{ required: 'Campo obrigatório' }}
        />

        <Button type="submit" width="100%" mt={4}>
          Entrar
        </Button>
      </form>
      <Button
        variant="subtle"
        w="full"
        onClick={() => navigate({ to: '/auth/forgot-password' })}
      >
        Esqueceu sua senha
      </Button>
    </VStack>
  )
}
