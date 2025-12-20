import {
  Button as ChakraButton,
  type ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react'
import React from 'react'

type ButtonProps = ChakraButtonProps & {
  children: React.ReactNode
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return <ChakraButton {...props}>{children}</ChakraButton>
}
