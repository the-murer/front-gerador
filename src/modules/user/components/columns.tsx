import type { ColumnDef } from '@tanstack/react-table'

export type Item = {
  id: number
  name: string
  category: string
  price: number
}

export const userColumns: ColumnDef<Item>[] = [
  { accessorKey: 'name', header: 'Product' },
  { accessorKey: 'category', header: 'Category' },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ getValue }) => getValue(),
  },
]
