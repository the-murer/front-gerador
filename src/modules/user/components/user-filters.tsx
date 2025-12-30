import {
  PageFilters,
  type DefaultPageFiltersProps,
} from '@/ui/blocks/filters/page-filters'

export const UsersFilters = ({
  search,
  updateSearchParams,
}: DefaultPageFiltersProps) => {
  return (
    <PageFilters search={search} updateSearchParams={updateSearchParams}>
      <PageFilters.Content>
        <PageFilters.Input label="Nome" name="name" />
        <PageFilters.Input label="Email" name="email" />
        <PageFilters.Input label="Ativo" name="active" />
      </PageFilters.Content>
      <PageFilters.Actions />
    </PageFilters>
  )
}
