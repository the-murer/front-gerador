import type { DefaultBaseInputProps } from '../input-map'
import { Controller } from 'react-hook-form'
import { Switch } from '../../switch/switch'

export interface BooleanInputProps extends DefaultBaseInputProps {}

export function BooleanInput({ name, control, rules }: BooleanInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Switch value={field.value} onChange={field.onChange} />
      )}
    />
  )
}
