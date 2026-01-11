import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table'
import { Box, Table } from '@chakra-ui/react'
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
}

export const DefaultTable = ({
  columns,
  items,
  loading,
  error,
  sorting,
}: DefaultTableProps) => {
  const table = useReactTable({
    data: items || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const { sortedBy, sortOrder, onSort } = sorting

  if (loading) {
    return <TableLoading />
  }

  if (error) {
    return <TableError error={error} />
  }

  if (!items) {
    return <TableEmpty />
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
          <Table.Row key={row.original._id}>
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
