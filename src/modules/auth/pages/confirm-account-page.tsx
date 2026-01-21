import LoginForm from '@/modules/auth/components/login-form'
import { LoginTemplate } from '@/ui/templates/auth/login-template'

export function ConfirmAccountPage() {
  return (
    <LoginTemplate.Complete
      title="Conta confirmada"
      description="Sua conta foi confirmada! Faça login para continuar"
    >
      <LoginForm />
    </LoginTemplate.Complete>
  )
}
