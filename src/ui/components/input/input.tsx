import { Field } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import { inputMaps, InputTypes } from './input-map'

type DefaultInput = {
  type?: InputTypes
  name: string
  label: string
  placeholder?: string
  control: any
  rules?: any
  options?: any
}

export const DefaultInput = ({
  name,
  type = InputTypes.TEXT,
  label,
  ...rest
}: DefaultInput) => {
  const Component = inputMaps.get(type)!
  return (
    <Field.Root mb={3}>
      <Field.Label>{label}</Field.Label>
      <Controller
        name={name}
        control={rest.control}
        rules={rest.rules}
        render={({ field, fieldState }) => (
          <>
            <Component field={field} fieldState={fieldState} {...rest} />
            {fieldState.error && (
              <Field.ErrorText>{fieldState.error.message}</Field.ErrorText>
            )}
          </>
        )}
      />
    </Field.Root>
  )
}
