import { Portal, Select, createListCollection } from '@chakra-ui/react'
import type { DefaultBaseInputProps } from '../input-map'

export interface QuerySelectableInputProps extends DefaultBaseInputProps {
  options: { label: string; value: string }[];
  searchField: string
}

export const QuerySelectableInput = ({
  field,
  options,
  placeholder = 'Selecione uma opção',
  searchField = 'name',
}: QuerySelectableInputProps) => {
  const valuesCollection = createListCollection({
    items: options,
  })

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
