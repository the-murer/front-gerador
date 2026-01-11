import { Box, Button, Flex, Image, Text, VStack } from '@chakra-ui/react'
import type { DefaultBaseInputProps } from '../input-map'
import { Controller } from 'react-hook-form'
import { useRef, useState, useCallback, useEffect } from 'react'
import {
  FileIcon,
  FileTextIcon,
  ImageIcon,
  VideoIcon,
  XIcon,
  UploadIcon,
} from 'lucide-react'

export enum FileTypes {
  IMAGE = 'image/*',
  PDF = 'application/pdf',
  VIDEO = 'video/*',
  ANY = '*/*',
}

export interface FileInputProps extends DefaultBaseInputProps {
  placeholder?: string
  accept?: FileTypes
  multiple?: boolean
}

function getFileIcon(type: string, size = 24) {
  if (type.startsWith('image/')) {
    return <ImageIcon size={size} />
  }
  if (type === 'application/pdf') {
    return <FileTextIcon size={size} />
  }
  if (type.startsWith('video/')) {
    return <VideoIcon size={size} />
  }
  return <FileIcon size={size} />
}

function FilePreview({ file, onRemove }: { file: File; onRemove: () => void }) {
  const [preview, setPreview] = useState<string | null>(null)
  const fileType = file.type

  useEffect(() => {
    // Gerar preview para imagens e vídeos
    if (fileType.startsWith('image/') || fileType.startsWith('video/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }, [file, fileType])

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
      <Button
        position="absolute"
        top={1}
        right={1}
        size="xs"
        variant="ghost"
        onClick={onRemove}
        zIndex={1}
        aria-label="Remover arquivo"
      >
        <XIcon size={14} />
      </Button>

      {fileType.startsWith('image/') && preview ? (
        <VStack gap={1} align="stretch">
          <Box
            position="relative"
            width="100%"
            height="120px"
            borderRadius="sm"
            overflow="hidden"
            bg="bg.muted"
          >
            <Image
              src={preview}
              alt={file.name}
              objectFit="cover"
              width="100%"
              height="100%"
            />
          </Box>
          <Text fontSize="xs" lineClamp={1} title={file.name}>
            {file.name}
          </Text>
          <Text fontSize="xs" color="fg.muted">
            {(file.size / 1024).toFixed(2)} KB
          </Text>
        </VStack>
      ) : fileType.startsWith('video/') && preview ? (
        <VStack gap={1} align="stretch">
          <Box
            position="relative"
            width="100%"
            height="120px"
            borderRadius="sm"
            overflow="hidden"
            bg="bg.muted"
          >
            <video
              src={preview}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              controls={false}
              muted
            />
          </Box>
          <Text fontSize="xs" lineClamp={1} title={file.name}>
            {file.name}
          </Text>
          <Text fontSize="xs" color="fg.muted">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </Text>
        </VStack>
      ) : (
        <VStack gap={2} align="center" py={2}>
          <Box color="fg.muted">{getFileIcon(fileType, 32)}</Box>
          <VStack gap={0} align="center" width="100%">
            <Text
              fontSize="xs"
              lineClamp={1}
              title={file.name}
              textAlign="center"
            >
              {file.name}
            </Text>
            <Text fontSize="xs" color="fg.muted">
              {(file.size / 1024).toFixed(2)} KB
            </Text>
          </VStack>
        </VStack>
      )}
    </Box>
  )
}

export function FileInput({
  name,
  control,
  rules,
  placeholder = 'Arraste arquivos aqui ou clique para selecionar',
  accept,
  multiple = false,
  field,
}: FileInputProps & { field?: any }) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = useCallback(
    (files: FileList | null, onChange: (value: any) => void) => {
      if (!files || files.length === 0) return

      if (multiple) {
        const fileArray = Array.from(files)
        onChange(fileArray)
      } else {
        onChange(files[0])
      }
    },
    [multiple],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent, onChange: (value: any) => void) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      handleFileChange(e.dataTransfer.files, onChange)
    },
    [handleFileChange],
  )

  if (field) {
    const files = field.value
      ? Array.isArray(field.value)
        ? field.value
        : [field.value]
      : []

    const handleRemove = (index: number) => {
      if (multiple) {
        const newFiles = files.filter((_: any, i: number) => i !== index)
        field.onChange(newFiles.length > 0 ? newFiles : null)
      } else {
        field.onChange(null)
      }
    }

    return (
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
          onDrop={(e) => handleDrop(e, field.onChange)}
          onClick={() => fileInputRef.current?.click()}
        >
          <VStack gap={2} align="center">
            <UploadIcon
              size={32}
              style={{ color: 'var(--chakra-colors-fg-muted)' }}
            />
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
            onChange={(e) => handleFileChange(e.target.files, field.onChange)}
            onBlur={field.onBlur}
          />
        </Box>

        {files.length > 0 && (
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              Arquivos selecionados ({files.length})
            </Text>
            {multiple ? (
              <Flex gap={3} flexWrap="wrap">
                {files.map((file: File, index: number) => (
                  <Box key={index} width={{ base: '100%', md: '150px' }}>
                    <FilePreview
                      file={file}
                      onRemove={() => handleRemove(index)}
                    />
                  </Box>
                ))}
              </Flex>
            ) : (
              <Box width={{ base: '100%', md: '200px' }}>
                <FilePreview file={files[0]} onRemove={() => handleRemove(0)} />
              </Box>
            )}
          </Box>
        )}
      </VStack>
    )
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: controllerField }) => {
        const files = controllerField.value
          ? Array.isArray(controllerField.value)
            ? controllerField.value
            : [controllerField.value]
          : []

        const handleRemove = (index: number) => {
          if (multiple) {
            const newFiles = files.filter((_: any, i: number) => i !== index)
            controllerField.onChange(newFiles.length > 0 ? newFiles : null)
          } else {
            controllerField.onChange(null)
          }
        }

        return (
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
              onDrop={(e) => handleDrop(e, controllerField.onChange)}
              onClick={() => fileInputRef.current?.click()}
            >
              <VStack gap={2} align="center">
                <UploadIcon
                  size={32}
                  style={{ color: 'var(--chakra-colors-fg-muted)' }}
                />
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
                onChange={(e) =>
                  handleFileChange(e.target.files, controllerField.onChange)
                }
                onBlur={controllerField.onBlur}
              />
            </Box>

            {files.length > 0 && (
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Arquivos selecionados ({files.length})
                </Text>
                {multiple ? (
                  <Flex gap={3} flexWrap="wrap">
                    {files.map((file: File, index: number) => (
                      <Box key={index} width={{ base: '100%', md: '150px' }}>
                        <FilePreview
                          file={file}
                          onRemove={() => handleRemove(index)}
                        />
                      </Box>
                    ))}
                  </Flex>
                ) : (
                  <Box width={{ base: '100%', md: '200px' }}>
                    <FilePreview
                      file={files[0]}
                      onRemove={() => handleRemove(0)}
                    />
                  </Box>
                )}
              </Box>
            )}
          </VStack>
        )
      }}
    />
  )
}
