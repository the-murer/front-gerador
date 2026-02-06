import { Button } from '@/ui/components/button/button'
import { inputMaps, InputTypes } from '@/ui/components/input/input-map'
import { Field, Grid, Stack } from '@chakra-ui/react'
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
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap="6">
      {children}
    </Grid>
  )
}

PageFilters.Input = ({
  label,
  name,
  type,
  ...rest
}: {
  label: string
  name: string
  type: InputTypes
  [key: string]: any
}) => {
  const { value, setValue } = usePageFilters(name)

  const Component = inputMaps.get(type) as React.ComponentType<any>

  return (
    <Field.Root>
      <Field.Label>{label}</Field.Label>
      <Component
        value={value}
        onChange={(value: string) => setValue(value)}
        onBlur={() => setValue(value)}
        placeholder={label}
        {...rest}
      />
    </Field.Root>
  )
}

PageFilters.Actions = () => {
  const { submit, clear } = usePageFilters()

  return (
    <Stack
      w="full"
      justifyContent="end"
      gap="2"
      mt="3"
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <Button
        onClick={() => clear()}
        variant="subtle"
        size="sm"
        w={{ base: 'full', md: 'auto' }}
      >
        <LuX />
        Limpar filtros
      </Button>
      <Button size="sm" onClick={submit} w={{ base: 'full', md: 'auto' }}>
        <LuCheck />
        Aplicar filtros
      </Button>
    </Stack>
  )
}
