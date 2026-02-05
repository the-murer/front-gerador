import { ChakraProvider, defaultConfig, createSystem } from '@chakra-ui/react'
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode'
import { theme } from './theming'

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={createSystem(defaultConfig, theme)}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
