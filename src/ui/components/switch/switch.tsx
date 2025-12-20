import { Switch as ChakraSwitch } from '@chakra-ui/react'

export interface SwitchProps {
  value: boolean
  onChange: (value: boolean) => void
}

export const Switch = ({ value, onChange }: SwitchProps) => {
  return (
    <ChakraSwitch.Root
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
