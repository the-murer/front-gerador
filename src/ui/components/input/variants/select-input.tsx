import { Portal, Select, createListCollection } from '@chakra-ui/react'
import type { DefaultBaseInputProps } from '../input-map'

export interface SelectInputProps extends DefaultBaseInputProps {
  options: { label: string; value: string }[]
}

export const SelectInput = ({
  field,
  options,
  placeholder = 'Selecione uma opção',
}: SelectInputProps) => {
  const valuesCollection = createListCollection({
    items: options,
  })

  const handleValueChange = (details: { value: string[] }) => {
    field.onChange(details.value[0] || '')
  }

  return (
    <Select.Root
      collection={valuesCollection}
      size="sm"
      width="full"
      value={field.value ? [field.value] : []}
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
