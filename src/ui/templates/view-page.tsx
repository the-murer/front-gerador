import {
  Badge,
  Box,
  Card,
  Flex,
  Grid,
  Heading,
  HStack,
  Separator,
  Skeleton,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ArrowLeftIcon, PencilIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '../components/button/button'
import { Can } from '@/modules/auth/components/can'
import type { Actions, Subjects } from '@/modules/auth/utils/ability.factory'
import { MissingPermissionPage } from './missing-permission-page'
import { useNavigate } from '@tanstack/react-router'

type ViewPageProps = {
  children: ReactNode
  loading?: boolean
  action?: Actions
  subject?: Subjects
}

export const ViewPage = ({
  children,
  loading = false,
  action,
  subject,
}: ViewPageProps) => {
  if (loading) {
    return (
      <Stack p={{ lg: '40px', md: '20px', base: '15px' }} gap="6">
        <Skeleton height="60px" borderRadius="md" />
        <Skeleton height="200px" borderRadius="md" />
        <Skeleton height="200px" borderRadius="md" />
      </Stack>
    )
  }

  return (
    <Stack p={{ lg: '40px', md: '20px', base: '15px' }} gap="6">
      <Can
        action={action}
        subject={subject}
        fallback={<MissingPermissionPage />}
      >
        {children}
      </Can>
    </Stack>
  )
}

type ViewPageHeaderProps = {
  title: string
  subtitle?: string
  badge?: { label: string; colorPalette: string }
  onBack?: () => void
  onEdit?: () => void
  editPermission?: { action: Actions; subject: Subjects }
  actions?: ReactNode
  avatar?: ReactNode
}

const ViewPageHeader = ({
  title,
  subtitle,
  badge,
  onBack,
  onEdit,
  editPermission,
  actions,
  avatar,
}: ViewPageHeaderProps) => {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) return onBack()
    navigate({ to: '..' })
  }

  return (
    <Card.Root borderRadius="lg" overflow="hidden">
      <Card.Body p={{ base: '4', md: '6' }}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'flex-start', md: 'center' }}
          justify="space-between"
          gap="4"
        >
          <HStack gap="4" align="center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              aria-label="Voltar"
              p="2"
            >
              <ArrowLeftIcon size={20} />
            </Button>

            {avatar && avatar}

            <VStack align="flex-start" gap="1">
              <HStack gap="3" align="center">
                <Heading size="2xl" fontWeight="bold">
                  {title}
                </Heading>
                {badge && (
                  <Badge
                    size="lg"
                    colorPalette={badge.colorPalette}
                    borderRadius="full"
                    px="3"
                    py="1"
                  >
                    {badge.label}
                  </Badge>
                )}
              </HStack>
              {subtitle && (
                <Text color="fg.muted" fontSize="sm">
                  {subtitle}
                </Text>
              )}
            </VStack>
          </HStack>

          <HStack gap="2">
            {actions}
            {onEdit && editPermission ? (
              <Can
                action={editPermission.action}
                subject={editPermission.subject}
              >
                <Button
                  variant="outline"
                  size="md"
                  onClick={onEdit}
                  colorPalette="blue"
                >
                  <PencilIcon size={16} />
                  Editar
                </Button>
              </Can>
            ) : onEdit ? (
              <Button
                variant="outline"
                size="md"
                onClick={onEdit}
                colorPalette="blue"
              >
                <PencilIcon size={16} />
                Editar
              </Button>
            ) : null}
          </HStack>
        </Flex>
      </Card.Body>
    </Card.Root>
  )
}

type ViewPageSectionProps = {
  title: string
  description?: string
  children: ReactNode
  actions?: ReactNode
}

const ViewPageSection = ({
  title,
  description,
  children,
  actions,
}: ViewPageSectionProps) => {
  return (
    <Card.Root borderRadius="lg" overflow="hidden">
      <Card.Body p={{ base: '4', md: '6' }} gap="4">
        <Flex justify="space-between" align="center">
          <VStack align="flex-start" gap="0.5">
            <Heading size="lg" fontWeight="semibold">
              {title}
            </Heading>
            {description && (
              <Text color="fg.muted" fontSize="sm">
                {description}
              </Text>
            )}
          </VStack>
          {actions && <HStack gap="2">{actions}</HStack>}
        </Flex>
        <Separator />
        {children}
      </Card.Body>
    </Card.Root>
  )
}

type ViewPageInfoGridProps = {
  children: ReactNode
  columns?: { base?: number; md?: number; lg?: number }
}

const ViewPageInfoGrid = ({
  children,
  columns = { base: 1, md: 2, lg: 3 },
}: ViewPageInfoGridProps) => {
  return (
    <Grid
      templateColumns={{
        base: `repeat(${columns.base ?? 1}, 1fr)`,
        md: `repeat(${columns.md ?? 2}, 1fr)`,
        lg: `repeat(${columns.lg ?? 3}, 1fr)`,
      }}
      gap="5"
    >
      {children}
    </Grid>
  )
}

type ViewPageInfoItemProps = {
  label: string
  value?: string | number | null
  children?: ReactNode
  span?: number
}

const ViewPageInfoItem = ({
  label,
  value,
  children,
  span,
}: ViewPageInfoItemProps) => {
  return (
    <Box gridColumn={span ? `span ${span}` : undefined}>
      <Text fontSize="xs" fontWeight="medium" color="fg.muted" mb="1">
        {label}
      </Text>
      {children ? (
        children
      ) : (
        <Text fontSize="md" fontWeight="medium">
          {value ?? '—'}
        </Text>
      )}
    </Box>
  )
}

type ViewPageCustomProps = {
  children: ReactNode
}

const ViewPageCustom = ({ children }: ViewPageCustomProps) => {
  return <Box>{children}</Box>
}

ViewPage.Header = ViewPageHeader
ViewPage.Section = ViewPageSection
ViewPage.InfoGrid = ViewPageInfoGrid
ViewPage.InfoItem = ViewPageInfoItem
ViewPage.Custom = ViewPageCustom
