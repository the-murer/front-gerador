import { DefaultPagination } from '@/ui/components/pagination/pagination'
import { DefaultTable } from '@/ui/blocks/table'
import { DefaultPage } from '@/ui/templates/default-page'
import { useUserColumns } from '../components/columns'
import { useState } from 'react'
import { useFindUsers } from '../hooks/use-find-users'

export const UsersPage = () => {
  const [page, setPage] = useState(1)
  const { data } = useFindUsers({ page })

  const columns = useUserColumns()

  return (
    <DefaultPage>
      <DefaultPage.Header
        title="Usuários"
        description="Listagem de usuários cadastrados no sistema"
      />
      <DefaultTable items={data?.items} columns={columns} />
      <DefaultPagination
        page={page}
        pageSize={10}
        total={data?.metadata.total}
        onPageChange={setPage}
      />
    </DefaultPage>
  )
}
