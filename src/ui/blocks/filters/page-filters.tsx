import { Button, Field, Grid, Input, Stack } from '@chakra-ui/react'
import React, { createContext, useContext, useState } from 'react'
import { LuCheck, LuX } from 'react-icons/lu'

export type DefaultPageFiltersProps = {
  search: any
  updateSearchParams: (updates: Record<string, any>) => void
}

type PageFiltersContextType = {
  values: Record<string, string>
  setValue: (name: string, value: string) => void
  submit: () => void
  clear: () => void
}

const PageFiltersContext = createContext<PageFiltersContextType | null>(null)

export const usePageFilters = (name?: string) => {
  const context = useContext(PageFiltersContext)

  if (!context) {
    throw new Error('usePageFilters must be used within PageFilters')
  }

  return {
    value: context.values[name ?? ''] || '',
    setValue: (value: string) => context.setValue(name ?? '', value),
    submit: context.submit,
    clear: context.clear,
  }
}

type PageFiltersProps = {
  search: Record<string, any>
  children: React.ReactNode
  updateSearchParams: any
}

export const PageFilters = ({
  children,
  search,
  updateSearchParams,
}: PageFiltersProps) => {
  const [values, setValues] = useState<Record<string, any>>(search)

  const setValue = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const submit = () => {
    updateSearchParams(values)
  }

  const clear = () => {
    setValues({})
    updateSearchParams({})
  }

  return (
    <PageFiltersContext.Provider value={{ values, setValue, submit, clear }}>
      <Stack
        p="4"
        w="full"
        bg="gray.100"
        _dark={{ bg: 'gray.900' }}
        borderRadius="md"
      >
        {children}
      </Stack>
    </PageFiltersContext.Provider>
  )
}

PageFilters.Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap="6">
      {children}
    </Grid>
  )
}

PageFilters.Input = ({ label, name }: { label: string; name: string }) => {
  const { value, setValue } = usePageFilters(name)

  return (
    <Field.Root>
      <Field.Label>{label}</Field.Label>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={label}
      />
    </Field.Root>
  )
}

PageFilters.Actions = () => {
  const { submit, clear } = usePageFilters()

  return (
    <Stack w="full" justifyContent="end" gap="2" mt="3" flexDirection="row">
      <Button onClick={() => clear()} variant="subtle" size="sm">
        <LuX />
        Limpar filtros
      </Button>
      <Button size="sm" onClick={submit}>
        <LuCheck />
        Aplicar filtros
      </Button>
    </Stack>
  )
}
