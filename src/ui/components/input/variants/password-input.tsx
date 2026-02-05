import { Input } from '@chakra-ui/react'

export interface PasswordInputProps {
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  placeholder?: string
}

export function PasswordInput({
  value = '',
  onChange,
  onBlur,
  placeholder,
}: PasswordInputProps) {
  return (
    <Input
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      type="password"
    />
  )
}
