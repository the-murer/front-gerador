import { LoginTemplate } from '@/ui/templates/auth/login-template'
import ForgotPasswordForm from '../components/forgot-password-form'

export function ForgotPasswordPage() {
  return (
    <LoginTemplate>
      <LoginTemplate.LeftImage />
      <LoginTemplate.Form title="Recupere sua conta">
        <ForgotPasswordForm />
      </LoginTemplate.Form>
    </LoginTemplate>
  )
}
