import {
  Box,
  Input,
  Portal,
  Select,
  Spinner,
  createListCollection,
} from '@chakra-ui/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { PaginatedResponse } from '@/common/api/api-types'

type Option = { label: string; value: string }

export interface QuerySelectableInputProps {
  value?: string[]
  onChange?: (value: string[]) => void
  onBlur?: () => void
  placeholder?: string
  queryKey: string
  labelField: string
  searchField?: string
  limit?: number
  fetchFunction: (
    params: Record<string, unknown>,
  ) => Promise<PaginatedResponse<Record<string, any>>>
}

export const QuerySelectableInput = ({
  value = [],
  onChange,
  onBlur,
  placeholder = 'Selecione uma opção',
  queryKey,
  labelField,
  searchField = 'name',
  limit = 20,
  fetchFunction,
}: QuerySelectableInputProps) => {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(timer)
  }, [search])

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [queryKey, 'infinite', debouncedSearch],
      queryFn: ({ pageParam }) =>
        fetchFunction({
          page: pageParam,
          limit,
          ...(debouncedSearch ? { [searchField]: debouncedSearch } : {}),
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const totalFetched = allPages.reduce(
          (acc, page) => acc + page.items.length,
          0,
        )
        if (totalFetched >= lastPage.metadata.total) return undefined
        return allPages.length + 1
      },
    })

  const allOptions = useMemo(() => {
    if (!data?.pages) return []

    const seen = new Set<string>()
    const options: Option[] = []

    for (const page of data.pages) {
      for (const item of page.items) {
        const val = String(item._id ?? '')
        if (val && !seen.has(val)) {
          seen.add(val)
          options.push({
            label: String(item[labelField] ?? ''),
            value: val,
          })
        }
      }
    }

    return options
  }, [data?.pages, labelField])

  const valuesCollection = useMemo(
    () =>
      createListCollection({
        items: allOptions.length > 0 ? allOptions : [{ label: '', value: '' }],
      }),
    [allOptions],
  )

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    const { scrollTop, scrollHeight, clientHeight } = el
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 40

    if (isNearBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const selectedValues = Array.isArray(value) ? value : []

  const handleValueChange = (details: { value: string[] }) => {
    const filtered = details.value.filter((v) => v !== '')
    onChange?.(filtered)
  }

  const handleOpenChange = (details: { open: boolean }) => {
    if (details.open) {
      setTimeout(() => searchInputRef.current?.focus(), 50)
    } else {
      setSearch('')
    }
  }

  return (
    <Select.Root
      multiple
      collection={valuesCollection}
      size="sm"
      width="full"
      value={selectedValues}
      onValueChange={handleValueChange}
      onOpenChange={handleOpenChange}
      onBlur={onBlur}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content zIndex={9000} overflow="hidden">
            <Box p={2} borderBottomWidth="1px" borderColor="border">
              <Input
                ref={searchInputRef}
                size="sm"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
              />
            </Box>

            <Box
              ref={scrollRef}
              maxH="200px"
              overflowY="auto"
              onScroll={handleScroll}
            >
              {isLoading ? (
                <Box display="flex" justifyContent="center" py={4}>
                  <Spinner size="sm" />
                </Box>
              ) : allOptions.length === 0 ? (
                <Box px={3} py={4} textAlign="center" color="fg.muted">
                  Nenhum resultado encontrado
                </Box>
              ) : (
                allOptions.map((option) => (
                  <Select.Item item={option} key={option.value}>
                    {option.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))
              )}

              {isFetchingNextPage && (
                <Box display="flex" justifyContent="center" py={2}>
                  <Spinner size="xs" />
                </Box>
              )}
            </Box>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}
