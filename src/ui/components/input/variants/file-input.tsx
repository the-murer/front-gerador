import { Box, Button, Flex, Image, Text, VStack } from '@chakra-ui/react'
import type { FieldValues } from 'react-hook-form'
import type { DefaultBaseInputProps } from '../input-map'
import { useRef, useState, useCallback } from 'react'
import {
  FileIcon,
  FileTextIcon,
  ImageIcon,
  VideoIcon,
  XIcon,
  UploadIcon,
  EyeIcon,
} from 'lucide-react'
import { useUploadFile } from '@/modules/files/hooks/use-upload-file'

export enum FileTypes {
  IMAGE = 'image/*',
  PDF = 'application/pdf',
  VIDEO = 'video/*',
  ANY = '*/*',
}

export interface FileInputProps<TFieldValues extends FieldValues = FieldValues>
  extends DefaultBaseInputProps<TFieldValues> {
  accept?: FileTypes
  multiple?: boolean
  field?: {
    value: string | string[] | null
    onChange: (value: string | string[] | null) => void
    onBlur?: () => void
  }
}

type FileItem = {
  key: string
  preview: string // URL ou base64
  name: string
  isUrl: boolean
}

function getFileIcon(url: string, size = 24) {
  const lower = url.toLowerCase()
  if (/\.(jpg|jpeg|png|gif|webp|svg)/.test(lower)) return <ImageIcon size={size} />
  if (/\.pdf/.test(lower)) return <FileTextIcon size={size} />
  if (/\.(mp4|webm|mov|avi)/.test(lower)) return <VideoIcon size={size} />
  return <FileIcon size={size} />
}

function isImageUrl(url: string) {
  return /\.(jpg|jpeg|png|gif|webp|svg)/i.test(url) || url.startsWith('data:image')
}

function FilePreview({
  item,
  onRemove,
  onView,
}: {
  item: FileItem
  onRemove: () => void
  onView: () => void
}) {
  const isImage = isImageUrl(item.preview)

  return (
    <Box
      position="relative"
      borderWidth="1px"
      borderRadius="md"
      p={2}
      bg="bg.subtle"
      _hover={{ bg: 'bg.muted' }}
      transition="all 0.2s"
    >
      <Flex position="absolute" top={1} right={1} gap={1} zIndex={1}>
        {isImage && (
          <Button
            size="xs"
            variant="ghost"
            onClick={onView}
            aria-label="Ver arquivo"
          >
            <EyeIcon size={14} />
          </Button>
        )}
        <Button
          size="xs"
          variant="ghost"
          onClick={onRemove}
          aria-label="Remover arquivo"
        >
          <XIcon size={14} />
        </Button>
      </Flex>

      <VStack gap={1} align="stretch">
        {isImage ? (
          <Box
            position="relative"
            width="100%"
            height="120px"
            borderRadius="sm"
            overflow="hidden"
            bg="bg.muted"
            cursor="pointer"
            onClick={onView}
          >
            <Image
              src={item.preview}
              alt={item.name}
              objectFit="cover"
              width="100%"
              height="100%"
            />
          </Box>
        ) : (
          <Flex
            justify="center"
            align="center"
            height="120px"
            color="fg.muted"
          >
            {getFileIcon(item.preview, 48)}
          </Flex>
        )}
        <Text fontSize="xs" lineClamp={1} title={item.name} textAlign="center">
          {item.name}
        </Text>
      </VStack>
    </Box>
  )
}

function ImageModal({
  src,
  onClose,
}: {
  src: string | null
  onClose: () => void
}) {
  if (!src) return null

  return (
    <Box
      position="fixed"
      inset={0}
      bg="blackAlpha.800"
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={onClose}
      cursor="pointer"
    >
      <Button
        position="absolute"
        top={4}
        right={4}
        variant="ghost"
        colorPalette="whiteAlpha"
        onClick={onClose}
      >
        <XIcon size={24} />
      </Button>
      <Image
        src={src}
        alt="Preview"
        maxH="90vh"
        maxW="90vw"
        objectFit="contain"
        onClick={(e) => e.stopPropagation()}
      />
    </Box>
  )
}

export function FileInput({
  placeholder = 'Arraste arquivos aqui ou clique para selecionar',
  accept,
  multiple = false,
  field,
}: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [localPreviews, setLocalPreviews] = useState<Map<string, string>>(new Map())
  const [viewingImage, setViewingImage] = useState<string | null>(null)
  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile()

  // Converte o value do field em array de FileItems
  const getFileItems = useCallback((): FileItem[] => {
    if (!field) return []
    
    const values = field.value
      ? Array.isArray(field.value)
        ? field.value
        : [field.value]
      : []

    return values.map((key) => {
      const localPreview = localPreviews.get(key)
      const isUrl = key.startsWith('http') || key.startsWith('/')
      
      return {
        key,
        preview: localPreview || key,
        name: key.split('/').pop() || key,
        isUrl,
      }
    })
  }, [field, localPreviews])

  const handleFileChange = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0 || !field) return

      const fileArray = Array.from(files)

      try {
        const uploadResults = await Promise.all(
          fileArray.map(async (file) => {
            // Gera preview local para imagens
            const preview = await new Promise<string>((resolve) => {
              if (file.type.startsWith('image/')) {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result as string)
                reader.readAsDataURL(file)
              } else {
                resolve('')
              }
            })

            const result = await uploadFile(file)
            return { key: result.key, preview }
          })
        )

        // Salva previews locais
        const newPreviews = new Map(localPreviews)
        uploadResults.forEach(({ key, preview }) => {
          if (preview) newPreviews.set(key, preview)
        })
        setLocalPreviews(newPreviews)

        // Atualiza o valor
        const keys = uploadResults.map((r) => r.key)
        if (multiple) {
          const currentValues = field.value
            ? Array.isArray(field.value)
              ? field.value
              : [field.value]
            : []
          field.onChange([...currentValues, ...keys])
        } else {
          field.onChange(keys[0])
        }
      } catch (error) {
        console.error('Erro no upload:', error)
      }
    },
    [uploadFile, multiple, field, localPreviews]
  )

  const handleRemove = useCallback(
    (keyToRemove: string) => {
      if (!field) return
      
      setLocalPreviews((prev) => {
        const newMap = new Map(prev)
        newMap.delete(keyToRemove)
        return newMap
      })

      if (multiple && Array.isArray(field.value)) {
        const newValues = field.value.filter((k) => k !== keyToRemove)
        field.onChange(newValues.length > 0 ? newValues : null)
      } else {
        field.onChange(null)
      }
    },
    [multiple, field]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      handleFileChange(e.dataTransfer.files)
    },
    [handleFileChange]
  )

  const fileItems = getFileItems()

  return (
    <>
      <VStack gap={3} align="stretch" width="100%">
        <Box
          borderWidth="2px"
          borderStyle="dashed"
          borderColor={isDragging ? 'colorPalette.500' : 'border.subtle'}
          borderRadius="md"
          p={6}
          bg={isDragging ? 'bg.muted' : 'bg.subtle'}
          cursor="pointer"
          transition="all 0.2s"
          _hover={{ borderColor: 'colorPalette.500', bg: 'bg.muted' }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <VStack gap={2} align="center">
            <UploadIcon size={32} style={{ color: 'var(--chakra-colors-fg-muted)' }} />
            <Text fontSize="sm" color="fg.muted" textAlign="center">
              {placeholder}
            </Text>
            {accept && (
              <Text fontSize="xs" color="fg.subtle">
                Aceita: {accept}
              </Text>
            )}
          </VStack>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e.target.files)}
            onBlur={field?.onBlur}
          />
        </Box>

        {fileItems.length > 0 && (
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              Arquivos selecionados ({fileItems.length})
              {isUploading && (
                <Text as="span" fontSize="xs" color="fg.muted" ml={2}>
                  (Enviando...)
                </Text>
              )}
            </Text>
            <Flex gap={3} flexWrap="wrap">
              {fileItems.map((item) => (
                <Box key={item.key} width={{ base: '100%', md: '150px' }}>
                  <FilePreview
                    item={item}
                    onRemove={() => handleRemove(item.key)}
                    onView={() => setViewingImage(item.preview)}
                  />
                </Box>
              ))}
            </Flex>
          </Box>
        )}
      </VStack>

      <ImageModal src={viewingImage} onClose={() => setViewingImage(null)} />
    </>
  )
}
