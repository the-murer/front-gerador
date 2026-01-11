import { NumberInput as ChakraNumberInput } from '@chakra-ui/react'
import type { DefaultBaseInputProps } from '../input-map'
import { Controller } from 'react-hook-form'

export interface NumberInputProps extends DefaultBaseInputProps {
  placeholder?: string
}

export function NumberInput({
  name,
  control,
  rules,
  placeholder,
}: NumberInputProps) {
  return (
    <ChakraNumberInput.Root name={name}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <ChakraNumberInput.Input {...field} placeholder={placeholder} />
        )}
      />
    </ChakraNumberInput.Root>
  )
}
