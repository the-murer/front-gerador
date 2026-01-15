import { EmptyState } from '@chakra-ui/react'
import { AlertTriangleIcon } from 'lucide-react'

const TableError = ({ error }: { error: string }) => {
  return (
    <EmptyState.Root size="lg">
      <EmptyState.Content>
        <EmptyState.Indicator>
          <AlertTriangleIcon />
        </EmptyState.Indicator>
        <EmptyState.Title>Erro ao carregar os dados</EmptyState.Title>
        <EmptyState.Description>
          {error || 'Atualize a página ou tente novamente mais tarde.'}
        </EmptyState.Description>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}

export default TableError
