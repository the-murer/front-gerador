import { Portal, Select, createListCollection } from '@chakra-ui/react'

export interface MultiSelectInputProps {
  value?: string[]
  onChange?: (value: string[]) => void
  onBlur?: () => void
  options: { label: string; value: string }[]
  placeholder?: string
}

export const MultiSelectInput = ({
  value = [],
  onChange,
  onBlur,
  options,
  placeholder = 'Select items',
}: MultiSelectInputProps) => {
  const valuesCollection = createListCollection({
    items: options,
  })

  const selectedValues = Array.isArray(value) ? value : []

  const handleValueChange = (details: { value: string[] }) => {
    onChange?.(details.value)
  }

  return (
    <Select.Root
      multiple
      collection={valuesCollection}
      size="sm"
      width="full"
      value={selectedValues}
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
