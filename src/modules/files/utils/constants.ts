import { DefaultEndpoint } from '@/common/api/base-endpoint'

class FileEndpoints extends DefaultEndpoint<File> {
  constructor() {
    super('files', 'file')
  }

  async uploadFile(file: File) {
    const form = new FormData()
    form.append('file', file)
    return this.api
      .post(`${this.basePath}/upload`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => {
        return r.data
      })
  }
}

export const fileApi = new FileEndpoints()
