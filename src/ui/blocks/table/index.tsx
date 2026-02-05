import {
  useReactTable,
  getCoreRowModel,
} from '@tanstack/react-table'
import { useBreakpointValue } from '@chakra-ui/react'
import { CardView } from './card-view'
import { DefaultTable as TableView } from './default-table'

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

  const isMdUp = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
    xl: true,
  })

  const showEmptyState = !items && !loading && !error

  if (!isMdUp) {
    return (
      <CardView
        showEmptyState={showEmptyState}
        loading={loading}
        limit={10}
        error={error}
        table={table}
        onRowClick={onRowClick}
      />
    )
  }
  return (
    <TableView
      columns={columns}
      loading={loading}
      error={error}
      sorting={sorting}
      onRowClick={onRowClick}
      showEmptyState={showEmptyState}
      table={table}
    />
  )
}
