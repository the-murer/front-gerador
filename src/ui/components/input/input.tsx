import { Field } from '@chakra-ui/react'
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form'
import { inputMaps, InputTypes, type MappedInputProps } from './input-map'
import { Typography } from '../typography/typography'

type DefaultInputProps<
  T extends InputTypes,
  TFieldValues extends FieldValues = FieldValues,
> = Omit<MappedInputProps[T], 'value' | 'onChange' | 'onBlur'> & {
  type: T
  label: string
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  rules?: any
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
  const Component = inputMaps.get(type) as React.ComponentType<any>

  return (
    <Field.Root mb={3}>
      <Field.Label htmlFor={name} fontWeight="bold" mb={1} id={name}>
        {label}
      </Field.Label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <Component
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              {...rest}
            />
            {fieldState.error && (
              <Typography color="red">{fieldState.error.message}</Typography>
            )}
          </>
        )}
      />
    </Field.Root>
  )
}
