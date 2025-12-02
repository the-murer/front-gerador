import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table'
import { Table } from '@chakra-ui/react'
import TableLoading from './table-loading'
import TableEmpty from './table-empty'
import TableError from './table-error'

type DefaultTableProps = {
  columns: any[]
  items?: any[]
  loading?: boolean
  error?: string
}

export const DefaultTable = ({
  columns,
  items,
  loading,
  error,
}: DefaultTableProps) => {
  const table = useReactTable({
    data: items || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

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
            {hg.headers.map((header) => (
              <Table.ColumnHeader key={header.id} textAlign="start">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        ))}
      </Table.Header>

      <Table.Body>
        {table.getRowModel().rows.map((row) => (
          <Table.Row key={row.id}>
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
