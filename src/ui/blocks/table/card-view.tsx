import { Box, Skeleton, VStack } from '@chakra-ui/react'
import { flexRender, type Table } from '@tanstack/react-table'
import { AlertTriangleIcon, BoxIcon } from 'lucide-react'

const cardStyles = {
  bg: 'white',
  _dark: { bg: 'gray.800', borderColor: 'gray.700' },
  borderRadius: 'xl',
  boxShadow: 'sm',
  border: '1px solid',
  borderColor: 'gray.100',
  overflow: 'hidden',
} as const

function CardEmpty() {
  return (
    <Box {...cardStyles}>
      <Box
        px={4}
        py={3}
        bg="gray.50"
        display="flex"
        alignItems="center"
        _dark={{ bg: 'gray.700', borderColor: 'gray.600' }}
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        <BoxIcon size={20} />
      </Box>
      <Box px={4} py={8}>
        <VStack gap={2} textAlign="center">
          <Box
            as="span"
            fontSize="sm"
            fontWeight="semibold"
            color="gray.800"
            _dark={{ color: 'gray.200' }}
          >
            Nenhum resultado encontrado
          </Box>
          <Box
            as="span"
            fontSize="sm"
            color="gray.500"
            _dark={{ color: 'gray.400' }}
          >
            Tente ajustar os filtros ou adicionar um novo item.
          </Box>
        </VStack>
      </Box>
    </Box>
  )
}

function CardError({ error }: { error: string }) {
  return (
    <Box {...cardStyles}>
      <Box
        px={4}
        py={3}
        bg="gray.50"
        display="flex"
        alignItems="center"
        _dark={{ bg: 'gray.700', borderColor: 'gray.600' }}
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        <Box color="red.500" _dark={{ color: 'red.400' }}>
          <AlertTriangleIcon size={20} />
        </Box>
      </Box>
      <Box px={4} py={8}>
        <VStack gap={2} textAlign="center">
          <Box
            as="span"
            fontSize="sm"
            fontWeight="semibold"
            color="gray.800"
            _dark={{ color: 'gray.200' }}
          >
            Erro ao carregar os dados
          </Box>
          <Box
            as="span"
            fontSize="sm"
            color="gray.500"
            _dark={{ color: 'gray.400' }}
          >
            {error || 'Atualize a página ou tente novamente mais tarde.'}
          </Box>
        </VStack>
      </Box>
    </Box>
  )
}

function CardLoading({ limit = 3 }: { limit?: number }) {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      {Array.from({ length: limit }).map((_, i) => (
        <Box key={i} {...cardStyles}>
          <Box
            px={4}
            py={3}
            bg="gray.50"
            _dark={{ bg: 'gray.700', borderColor: 'gray.600' }}
            borderBottom="1px solid"
            borderColor="gray.100"
          >
            <Skeleton height="20px" width="60%" borderRadius="md" />
          </Box>
          <Box px={4} py={3} display="flex" flexDirection="column" gap={3}>
            {Array.from({ length: 4 }).map((_, j) => (
              <Box
                key={j}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py={1}
              >
                <Skeleton height="14px" width="80px" borderRadius="md" />
                <Skeleton height="14px" width="100px" borderRadius="md" />
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  )
}

type CardViewProps = {
  showEmptyState: boolean
  loading?: boolean
  limit: number
  error: string | undefined
  table: Table<any>
  onRowClick?: (row: any) => void
}

export function CardView({
  showEmptyState,
  loading,
  limit,
  error,
  table,
  onRowClick,
}: CardViewProps) {
  if (showEmptyState) return <CardEmpty />

  if (error) return <CardError error={error} />

  if (loading) return <CardLoading limit={Math.min(limit, 5)} />
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      {table.getRowModel().rows.map((row: any) => {
        const headerCells = row.getVisibleCells().slice(0, 2)
        const bodyCells = row.getVisibleCells().slice(2)

        if (headerCells.length === 0 || bodyCells.length === 0) {
          return null
        }

        return (
          <Box
            key={row.id}
            bg="white"
            _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
            borderRadius="xl"
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.100"
            overflow="hidden"
            onClick={() => onRowClick?.(row.original)}
          >
            <Box
              px={4}
              py={3}
              bg="gray.50"
              display="flex"
              flexDirection="row"
              _dark={{ bg: 'gray.700', borderColor: 'gray.600' }}
              borderBottom="1px solid"
              borderColor="gray.100"
            >
              {headerCells.map((cell: any) => (
                <Box key={cell.id} display="flex" alignItems="center" gap={2}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Box>
              ))}
            </Box>

            <Box px={4} py={3} display="flex" flexDirection="column" gap={3}>
              {bodyCells.map((cell: any) => {
                const header = cell.column.columnDef.header

                return (
                  <Box
                    key={cell.id}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    py={1}
                    borderBottom="1px solid"
                    borderColor="gray.50"
                    _dark={{ borderColor: 'gray.700' }}
                    _last={{ borderBottom: 'none' }}
                  >
                    <Box
                      as="span"
                      fontSize="sm"
                      fontWeight="medium"
                      color="gray.500"
                      _dark={{ color: 'gray.400' }}
                      flexShrink={0}
                      mr={3}
                    >
                      {typeof header === 'string' ? header : null}
                    </Box>
                    <Box
                      as="span"
                      fontSize="sm"
                      color="gray.800"
                      _dark={{ color: 'gray.200' }}
                      textAlign="right"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Box>
                  </Box>
                )
              })}
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}
