import { DefaultPage } from '@/modules/common/pages/default-page'
import { useParams } from '@tanstack/react-router'
import { useGetUser } from '../hooks/use-get-user'

export const UserPage = () => {
  const { id } = useParams({ from: '/admin/users/$id' })

  const { data } = useGetUser({ id })

  return (
    <DefaultPage>
      <DefaultPage.Header
        title={data?.name ?? 'Usuário'}
        description="Visualize e altere as informações do seu usuário"
      />
    </DefaultPage>
  )
}
