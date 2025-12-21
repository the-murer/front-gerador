import { Portal, Select, createListCollection } from '@chakra-ui/react'

type MultiSelectInputProps = {
  field: {
    value: string[]
    onChange: (value: string[]) => void
    onBlur: () => void
  }
  fieldState?: any
  options: { label: string; value: string }[]
  placeholder?: string
}

export const MultiSelectInput = ({
  field,
  options,
  placeholder = 'Select items',
}: MultiSelectInputProps) => {
  const valuesCollection = createListCollection({
    items: options,
  })

  // Ensure value is always an array
  const selectedValues = Array.isArray(field.value) ? field.value : []

  const handleValueChange = (details: { value: string[] }) => {
    field.onChange(details.value)
  }

  return (
    <Select.Root
      multiple
      collection={valuesCollection}
      size="sm"
      width="full"
      value={selectedValues}
      onValueChange={handleValueChange}
      onBlur={field.onBlur}
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
