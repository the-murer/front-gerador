import { Switch as ChakraSwitch } from '@chakra-ui/react'

export interface SwitchProps {
  value: boolean
  onChange: (value: boolean) => void
  disabled?: boolean
}

export const Switch = ({ value, onChange, disabled = false }: SwitchProps) => {
  return (
    <ChakraSwitch.Root
      disabled={disabled}
      checked={value}
      onCheckedChange={(details) => onChange(details.checked)}
    >
      <ChakraSwitch.HiddenInput />
      <ChakraSwitch.Control>
        <ChakraSwitch.Thumb />
      </ChakraSwitch.Control>
      <ChakraSwitch.Label />
    </ChakraSwitch.Root>
  )
}
