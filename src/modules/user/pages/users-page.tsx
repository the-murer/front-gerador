import { DefaultPagination } from '@/ui/components/pagination/pagination'
import { DefaultTable } from '@/ui/blocks/table'
import { DefaultPage } from '@/ui/templates/default-page'
import { useUserColumns } from '../components/user-columns'
import { useFindUsers } from '../hooks/use-find-users'
import { useSearchParams } from '@/common/hooks/use-list-search-params'

export const UsersPage = () => {
  const { search, sort, handlePageChange } = useSearchParams('/admin/users/')
  const { page = 1 } = search

  const { data } = useFindUsers({
    page,
    sort: sort.sortedBy,
    sortOrder: sort.sortOrder,
  })

  const columns = useUserColumns()

  return (
    <DefaultPage>
      <DefaultPage.Header
        title="Usuários"
        description="Listagem de usuários cadastrados no sistema"
      />
      <DefaultTable items={data?.items} columns={columns} sorting={sort} />
      <DefaultPagination
        page={page}
        pageSize={10}
        total={data?.metadata.total}
        onPageChange={handlePageChange}
      />
    </DefaultPage>
  )
}
