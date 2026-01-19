import { Box, IconButton } from '@chakra-ui/react'
import { useModal } from '@ebay/nice-modal-react'
import { BrainIcon } from 'lucide-react'
import React from 'react'
import { AiModalChat } from './ai-modal-chat'

type AIButtonProps = {
  'aria-label'?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  colorPalette?: string
  variant?: 'solid' | 'outline' | 'ghost' | 'subtle'
}

export const AIButton: React.FC<AIButtonProps> = ({
  'aria-label': ariaLabel = 'AI Assistant',
  size = 'lg',
  colorPalette = 'blue',
  variant = 'solid',
}) => {
  const aiModal = useModal(AiModalChat)

  return (
    <Box
      position="fixed"
      bottom={20}
      right={10}
      zIndex={1000}
    >
      <IconButton
        onClick={() => aiModal.show()}
        aria-label={ariaLabel}
        size={size}
        colorPalette={colorPalette}
        variant={variant}
        borderRadius="full"
        boxShadow="lg"
        _hover={{
          transform: 'scale(1.1)',
        }}
        transition="all 0.2s"

      >
        <BrainIcon size={40} />
      </IconButton>
    </Box>
  )
}
