import { DefaultPagination } from '@/components/pagination/pagination'
import { DefaultTable } from '@/components/table'
import { DefaultPage } from '@/modules/common/pages/default-page'
import { userColumns } from '../components/columns'
import { useState } from 'react'
import { useFindUsers } from '../hooks/use-find-users'

export const UsersPage = () => {
  const [page, setPage] = useState(1)
  const { data } = useFindUsers({ page })

  return (
    <DefaultPage>
      <DefaultPage.Header
        title="Usuários"
        description="Listagem de usuários cadastrados no sistema"
      />
      <DefaultTable items={data?.items} columns={userColumns} />
      <DefaultPagination
        page={page}
        pageSize={10}
        total={data?.metadata.total}
        onPageChange={setPage}
      />
    </DefaultPage>
  )
}
