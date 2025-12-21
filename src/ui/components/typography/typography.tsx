import { Text, type TextProps } from '@chakra-ui/react'

export const Typography = ({ children, ...props }: TextProps) => {
  return <Text {...props}>{children}</Text>
}
