import { Portal, Select, createListCollection } from '@chakra-ui/react'

export interface SelectInputProps {
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  options: { label: string; value: string }[]
  placeholder?: string
}

export const SelectInput = ({
  value = '',
  onChange,
  onBlur,
  options,
  placeholder = 'Selecione uma opção',
}: SelectInputProps) => {
  const valuesCollection = createListCollection({
    items: options,
  })

  const handleValueChange = (details: { value: string[] }) => {
    onChange?.(details.value[0] || '')
  }

  return (
    <Select.Root
      collection={valuesCollection}
      size="sm"
      width="full"
      value={value ? [value] : []}
      onValueChange={handleValueChange}
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
          <Select.Content zIndex={9000}>
            {valuesCollection.items.map((option) => (
              <Select.Item item={option} key={option.value}>
                {option.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}
