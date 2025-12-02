import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Stat,
  Progress,
  Text,
} from '@chakra-ui/react'

export default function DashboardPlaceholder() {
  return (
    <Flex direction="column" p={8} gap={10}>
      <Heading size="lg">Dashboard</Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        <Stat.Root p={6} borderWidth="1px" borderRadius="lg">
          <Stat.Label>Active Users</Stat.Label>
          <Stat.ValueText>2,391</Stat.ValueText>
          <Stat.HelpText>+4.2% this week</Stat.HelpText>
        </Stat.Root>

        <Stat.Root p={6} borderWidth="1px" borderRadius="lg">
          <Stat.Label>Revenue</Stat.Label>
          <Stat.ValueText>$12,480</Stat.ValueText>
          <Stat.HelpText>+9.1% this month</Stat.HelpText>
        </Stat.Root>

        <Stat.Root p={6} borderWidth="1px" borderRadius="lg">
          <Stat.Label>System Uptime</Stat.Label>
          <Stat.ValueText>99.98%</Stat.ValueText>
          <Stat.HelpText>Last 24 hours</Stat.HelpText>
        </Stat.Root>
      </SimpleGrid>

      <Box p={6} borderWidth="1px" borderRadius="lg">
        <Text mb={4} fontWeight="bold">Server Load</Text>

        <Progress.Root value={72} size="lg" borderRadius="lg">
          <Progress.Track />
          <Progress.Range />
        </Progress.Root>

        <Text mt={2}>72% load • Stable</Text>
      </Box>

      <Box p={6} borderWidth="1px" borderRadius="lg">
        <Text mb={4} fontWeight="bold">Traffic Overview</Text>

        <Flex gap={6} align="flex-start">
          <Box flex="1">
            <Progress.Root value={40} mb={2}>
              <Progress.Track />
              <Progress.Range />
            </Progress.Root>
            <Text fontSize="sm">API Requests • 40%</Text>
          </Box>

          <Box flex="1">
            <Progress.Root value={65} mb={2}>
              <Progress.Track />
              <Progress.Range />
            </Progress.Root>
            <Text fontSize="sm">Web Traffic • 65%</Text>
          </Box>

          <Box flex="1">
            <Progress.Root value={85} mb={2}>
              <Progress.Track />
              <Progress.Range />
            </Progress.Root>
            <Text fontSize="sm">Data Processing • 85%</Text>
          </Box>
        </Flex>
      </Box>

      <Box p={6} borderWidth="1px" borderRadius="lg">
        <Text mb={4} fontWeight="bold">System Metrics</Text>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
          <Box>
            <Text fontSize="sm" mb={1}>CPU</Text>
            <Progress.Root value={58}>
              <Progress.Track />
              <Progress.Range />
            </Progress.Root>
          </Box>

          <Box>
            <Text fontSize="sm" mb={1}>Memory</Text>
            <Progress.Root value={73}>
              <Progress.Track />
              <Progress.Range />
            </Progress.Root>
          </Box>

          <Box>
            <Text fontSize="sm" mb={1}>Disk IO</Text>
            <Progress.Root value={44}>
              <Progress.Track />
              <Progress.Range />
            </Progress.Root>
          </Box>
        </SimpleGrid>
      </Box>
    </Flex>
  )
}
