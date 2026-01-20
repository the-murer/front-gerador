import { Portal, Menu, Button } from '@chakra-ui/react'
import { HistoryIcon } from 'lucide-react'
import { useFindChats } from '../hooks/use-find-chats'
import { Typography } from '@/ui/components/typography/typography'
import { useChat } from '../stores/use-ai.store'

export const ChatHistory = () => {
  const { data: chats } = useFindChats()
  const { setCurrentChat } = useChat()

  return (
    <>
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button variant="ghost" size="md">
            <HistoryIcon size={15} />
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner maxH="300px" overflowY="scroll" zIndex={9000}>
            <Menu.Content
              maxW="300px"
              zIndex={9000}
              bg="gray.200"
              color="gray.900"
              _hover={{
                bg: 'gray.300',
              }}
              _dark={{
                bg: 'gray.900',
                color: 'gray.200',
              }}
            >
              {chats?.items.map((chat) => (
                <Menu.Item
                  onClick={() => setCurrentChat(chat)}
                  key={chat._id}
                  value={chat._id}
                >
                  <Typography
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    fontSize="sm"
                  >
                    {chat.title}
                  </Typography>
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </>
  )
}
