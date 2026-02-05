import { Input } from '@chakra-ui/react'

export interface TextInputProps {
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  placeholder?: string
}

export function TextInput({
  value = '',
  onChange,
  onBlur,
  placeholder = 'Digite aqui',
}: TextInputProps) {
  return (
    <Input
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      type="text"
    />
  )
}
