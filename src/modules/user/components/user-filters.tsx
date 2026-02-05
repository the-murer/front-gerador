import {
  PageFilters,
  type DefaultPageFiltersProps,
} from '@/ui/blocks/filters/page-filters'
import { InputTypes } from '@/ui/components/input/input-map'

export const UsersFilters = ({
  search,
  updateSearchParams,
}: DefaultPageFiltersProps) => {
  return (
    <PageFilters search={search} updateSearchParams={updateSearchParams}>
      <PageFilters.Content>
        <PageFilters.Input label="Nome" name="name" type={InputTypes.TEXT} />
        <PageFilters.Input label="Email" name="email" type={InputTypes.TEXT} />
        <PageFilters.Input
          label="Ativo"
          name="active"
          type={InputTypes.BOOLEAN}
        />
      </PageFilters.Content>
      <PageFilters.Actions />
    </PageFilters>
  )
}
