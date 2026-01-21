import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table'
import { Box, Table, useBreakpointValue } from '@chakra-ui/react'
import TableLoading from './table-loading'
import TableEmpty from './table-empty'
import TableError from './table-error'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'

type DefaultTableProps = {
  columns: any[]
  items?: any[]
  loading?: boolean
  error?: string
  sorting: {
    onSort: (column: string) => void
    sortedBy?: string
    sortOrder?: 'asc' | 'desc'
  }
  onRowClick?: (row: any) => void
}

export const DefaultTable = ({
  columns,
  items,
  loading,
  error,
  sorting,
  onRowClick,
}: DefaultTableProps) => {
  const table = useReactTable({
    data: items || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const { sortedBy, sortOrder, onSort } = sorting

  const isMdUp = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
    xl: true,
  })

  if (loading) return <TableLoading columns={columns.length} limit={10} />

  if (error) return <TableError error={error} />

  if (!items && !loading && !error) return <TableEmpty />

  if (!isMdUp) {
    return <CardView table={table} onRowClick={onRowClick} />
  }

  return (
    <Table.Root size="lg">
      <Table.Header>
        {table.getHeaderGroups().map((hg) => (
          <Table.Row key={hg.id}>
            {hg.headers.map((header) => {
              const columnDef = header.column.columnDef
              const accessorKey =
                'accessorKey' in columnDef
                  ? (columnDef.accessorKey as string)
                  : undefined
              const isSortable = accessorKey && accessorKey !== 'actions'

              return (
                <Table.ColumnHeader
                  key={header.id}
                  textAlign="start"
                  onClick={isSortable ? () => onSort(accessorKey) : undefined}
                  cursor={isSortable ? 'pointer' : 'default'}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="row"
                    gap={1}
                    userSelect="none"
                  >
                    {flexRender(columnDef.header, header.getContext())}
                    {sortedBy === accessorKey && (
                      <SortIndicator sortOrder={sortOrder} />
                    )}
                  </Box>
                </Table.ColumnHeader>
              )
            })}
          </Table.Row>
        ))}
      </Table.Header>

      <Table.Body>
        {table.getRowModel().rows.map((row) => (
          <Table.Row
            key={row.original._id}
            onClick={() => onRowClick?.(row.original)}
            cursor={onRowClick ? 'pointer' : 'default'}
          >
            {row.getVisibleCells().map((cell) => (
              <Table.Cell key={cell.id} textAlign="start">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

const SortIndicator = ({ sortOrder }: { sortOrder?: 'asc' | 'desc' }) => {
  if (!sortOrder) return null

  return (
    <Box>
      {sortOrder === 'asc' ? (
        <FaArrowUp color="primary.500" />
      ) : (
        <FaArrowDown color="primary.500" />
      )}
    </Box>
  )
}

type CardViewProps = {
  table: any
  onRowClick?: (row: any) => void
}

function CardView({ table, onRowClick }: CardViewProps) {
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
