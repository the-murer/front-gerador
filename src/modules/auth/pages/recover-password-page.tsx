import { useSearchParams } from '@/common/hooks/use-search-params'
import RecoverPasswordForm from '@/modules/auth/components/recover-password-form'
import { LoginTemplate } from '@/ui/templates/auth/login-template'

export function RecoverPasswordPage() {
  const { search } = useSearchParams('/auth/recover')

  return (
    <LoginTemplate.Complete title="Recuperar senha" description="">
      <RecoverPasswordForm hash={search.hash ?? ''} />
    </LoginTemplate.Complete>
  )
}
