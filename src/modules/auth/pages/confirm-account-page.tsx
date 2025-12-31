import LoginForm from '@/modules/auth/components/login-form'
import { LoginTemplate } from '@/ui/templates/auth/login-template'
import { Stack } from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'

export function ConfirmAccountPage() {
  const navigate = useNavigate()
  return (
    <LoginTemplate>
      <LoginTemplate.LeftImage />
      <LoginTemplate.Form title="Login" description="Faça login para continuar">
        <LoginForm />
        <Stack onClick={() => navigate({ to: '/auth/forgot-password' })}>
          Esqueceu sua senha
        </Stack>
      </LoginTemplate.Form>
    </LoginTemplate>
  )
}
