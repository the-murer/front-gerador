import { EmptyState, VStack } from '@chakra-ui/react'
import { BoxIcon } from 'lucide-react'

const TableEmpty = () => {
  return (
    <EmptyState.Root size="lg">
      <EmptyState.Content>
        <EmptyState.Indicator>
          <BoxIcon />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>Nenhum resultado encontrado</EmptyState.Title>
          <EmptyState.Description>
            Tente ajustar os filtros ou adicionar um novo item.
          </EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}

export default TableEmpty
