import { Switch } from '../../switch/switch'

export interface BooleanInputProps {
  value?: boolean
  onChange?: (value: boolean) => void
}

export function BooleanInput({ value = false, onChange }: BooleanInputProps) {
  return (
    <Switch
      value={value}
      onChange={onChange ?? (() => {})}
    />
  )
}
