import { Skeleton, Table } from '@chakra-ui/react'

const TableLoading = ({
  columns,
  limit,
}: {
  columns: number
  limit: number
}) => {
  return (
    <Table.Root size="lg">
      <Table.Header>
        {Array.from({ length: columns }).map((_, index) => (
          <Table.Column key={index} />
        ))}
      </Table.Header>
      <Table.Body>
        {Array.from({ length: limit + 1 }).map((_, index) => (
          <Table.Row key={index}>
            {Array.from({ length: columns }).map((_, index) => (
              <Table.Cell key={index}>
                <Skeleton height="20px" width="100%" borderRadius="md" />
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export default TableLoading
