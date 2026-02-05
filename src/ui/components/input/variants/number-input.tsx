import { NumberInput as ChakraNumberInput } from '@chakra-ui/react'

export interface NumberInputProps {
  value?: number | string
  onChange?: (value: string) => void
  onBlur?: () => void
  placeholder?: string
}

export function NumberInput({
  value = '',
  onChange,
  onBlur,
  placeholder,
}: NumberInputProps) {
  const stringValue =
    value !== undefined && value !== null && value !== ''
      ? String(value)
      : ''

  return (
    <ChakraNumberInput.Root
      value={stringValue}
      onValueChange={(details) => onChange?.(details.value ?? '')}
      onBlur={onBlur}
    >
      <ChakraNumberInput.Input placeholder={placeholder} />
    </ChakraNumberInput.Root>
  )
}
