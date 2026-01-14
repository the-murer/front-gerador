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
import { useUploadFile } from '@/modules/files/hooks/use-upload-file'

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
  const [filePreviews, setFilePreviews] = useState<Map<string | number, File>>(
    new Map(),
  )
  const { mutateAsync: uploadFile, isPending: isUploadingFile } =
    useUploadFile()

  const handleFileChange = useCallback(
    (files: FileList | null, onChange: (value: any) => void) => {
      if (!files || files.length === 0) return

      if (multiple) {
        const fileArray = Array.from(files)
        onChange(fileArray)
        // Armazenar previews para múltiplos arquivos
        fileArray.forEach((file, index) => {
          setFilePreviews((prev) => new Map(prev).set(index, file))
        })
      } else {
        const selectedFile = files[0]
        // Armazenar preview do arquivo original
        setFilePreviews((prev) => new Map(prev).set('single', selectedFile))
        onChange(selectedFile)
        uploadFile(selectedFile)
          .then((file) => {
            onChange(file._id)
            // Manter o preview do arquivo original mesmo após o upload
          })
          .catch((error) => {
            console.error(error)
            // Em caso de erro, limpar o preview
            setFilePreviews((prev) => {
              const newMap = new Map(prev)
              newMap.delete('single')
              return newMap
            })
            onChange(null)
          })
      }
    },
    [multiple, uploadFile],
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
    // Se o valor for um ID (string) e não um File, usar o preview armazenado
    const getFileForPreview = (value: any, index: number | string) => {
      if (value instanceof File) {
        return value
      }
      // Se for um ID ou outro valor, tentar pegar do preview armazenado
      return filePreviews.get(index) || null
    }

    const files = field.value
      ? Array.isArray(field.value)
        ? field.value
        : [field.value]
      : []

    const handleRemove = (index: number) => {
      if (multiple) {
        const newFiles = files.filter((_: any, i: number) => i !== index)
        field.onChange(newFiles.length > 0 ? newFiles : null)
        // Remover preview
        setFilePreviews((prev) => {
          const newMap = new Map(prev)
          newMap.delete(index)
          return newMap
        })
      } else {
        field.onChange(null)
        // Limpar preview
        setFilePreviews((prev) => {
          const newMap = new Map(prev)
          newMap.delete('single')
          return newMap
        })
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
              {isUploadingFile && (
                <Text as="span" fontSize="xs" color="fg.muted" ml={2}>
                  (Enviando...)
                </Text>
              )}
            </Text>
            {multiple ? (
              <Flex gap={3} flexWrap="wrap">
                {files.map((file: any, index: number) => {
                  const previewFile = getFileForPreview(file, index)
                  if (!previewFile) return null
                  return (
                    <Box key={index} width={{ base: '100%', md: '150px' }}>
                      <FilePreview
                        file={previewFile}
                        onRemove={() => handleRemove(index)}
                      />
                    </Box>
                  )
                })}
              </Flex>
            ) : (
              <Box width={{ base: '100%', md: '200px' }}>
                {(() => {
                  const previewFile = getFileForPreview(files[0], 'single')
                  if (!previewFile) return null
                  return (
                    <FilePreview
                      file={previewFile}
                      onRemove={() => handleRemove(0)}
                    />
                  )
                })()}
              </Box>
            )}
          </Box>
        )}
      </VStack>
    )
  }

  return (
    <Controller
      name={`${name}-picture`}
      control={control}
      rules={rules}
      render={({ field: controllerField }) => {
        // Se o valor for um ID (string) e não um File, usar o preview armazenado
        const getFileForPreview = (value: any, index: number | string) => {
          if (value instanceof File) {
            return value
          }
          // Se for um ID ou outro valor, tentar pegar do preview armazenado
          return filePreviews.get(index) || null
        }

        const files = controllerField.value
          ? Array.isArray(controllerField.value)
            ? controllerField.value
            : [controllerField.value]
          : []

        const handleRemove = (index: number) => {
          if (multiple) {
            const newFiles = files.filter((_: any, i: number) => i !== index)
            controllerField.onChange(newFiles.length > 0 ? newFiles : null)
            // Remover preview
            setFilePreviews((prev) => {
              const newMap = new Map(prev)
              newMap.delete(index)
              return newMap
            })
          } else {
            controllerField.onChange(null)
            // Limpar preview
            setFilePreviews((prev) => {
              const newMap = new Map(prev)
              newMap.delete('single')
              return newMap
            })
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
                  {isUploadingFile && (
                    <Text as="span" fontSize="xs" color="fg.muted" ml={2}>
                      (Enviando...)
                    </Text>
                  )}
                </Text>
                {multiple ? (
                  <Flex gap={3} flexWrap="wrap">
                    {files.map((file: any, index: number) => {
                      const previewFile = getFileForPreview(file, index)
                      if (!previewFile) return null
                      return (
                        <Box key={index} width={{ base: '100%', md: '150px' }}>
                          <FilePreview
                            file={previewFile}
                            onRemove={() => handleRemove(index)}
                          />
                        </Box>
                      )
                    })}
                  </Flex>
                ) : (
                  <Box width={{ base: '100%', md: '200px' }}>
                    {(() => {
                      const previewFile = getFileForPreview(files[0], 'single')
                      if (!previewFile) return null
                      return (
                        <FilePreview
                          file={previewFile}
                          onRemove={() => handleRemove(0)}
                        />
                      )
                    })()}
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
