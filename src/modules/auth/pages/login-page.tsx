import LoginForm from '@/modules/auth/components/login-form'
import { LoginTemplate } from '@/ui/templates/auth/login-template'

export function LoginPage() {
  return (
    <LoginTemplate.Complete title="Login" description="Faça login para continuar">
      <LoginForm />
    </LoginTemplate.Complete>
  )
}
