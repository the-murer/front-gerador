import { Text as ChakraText, type TextProps } from '@chakra-ui/react'

export const Typography = ({ children, ...props }: TextProps) => {
  return <ChakraText {...props}>{children}</ChakraText>
}

export const Text = (props: TextProps) => {
  return <ChakraText {...props} />
}
