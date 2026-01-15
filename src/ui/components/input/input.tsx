import { Field } from '@chakra-ui/react'
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'
import { inputMaps, InputTypes, type MappedInputProps } from './input-map'

type DefaultInputProps<
  T extends InputTypes,
  TFieldValues extends FieldValues = FieldValues,
> = Omit<MappedInputProps[T], 'name' | 'control'> & {
  type: T
  label: string
  name: Path<TFieldValues>
  control: Control<TFieldValues>
}

export const DefaultInput = <
  T extends InputTypes,
  TFieldValues extends FieldValues = FieldValues,
>({
  name,
  type,
  label,
  control,
  rules,
  ...rest
}: DefaultInputProps<T, TFieldValues>) => {
  const Component = inputMaps.get(type) as any as React.ComponentType<any>
  return (
    <Field.Root mb={3}>
      <Field.Label>{label}</Field.Label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <Component
              name={name}
              control={control}
              rules={rules}
              {...rest}
              field={field}
            />
            {fieldState.error && (
              <Field.ErrorText>{fieldState.error.message}</Field.ErrorText>
            )}
          </>
        )}
      />
    </Field.Root>
  )
}
