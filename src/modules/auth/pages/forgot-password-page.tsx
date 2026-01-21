import { LoginTemplate } from '@/ui/templates/auth/login-template'
import ForgotPasswordForm from '../components/forgot-password-form'

export function ForgotPasswordPage() {
  return (
    <LoginTemplate.Complete title="Recupere sua conta" description="">
      <ForgotPasswordForm />
    </LoginTemplate.Complete>
  )
}
