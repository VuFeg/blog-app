import formidable, { File } from 'formidable'
import path from 'path'
import fs from 'fs'
import { Request } from 'express'
import { UPLOAD_IMAGE_TEMP_DIR } from '~/constants/dir'

export const initFolder = (name: string) => {
  const folderPath = path.resolve(name)
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, {
      recursive: true
    })
  }
}

export const handleUploadImage = (req: Request): Promise<File[]> => {
  const form = formidable({
    uploadDir: path.resolve(UPLOAD_IMAGE_TEMP_DIR),
    keepExtensions: true,
    maxFiles: 4,
    maxFileSize: 3000 * 1024, // 300kb
    maxTotalFileSize: 3000 * 1024 * 4,
    filter: ({ name, originalFilename, mimetype }) => {
      const valid = name === 'image' && Boolean(mimetype?.includes('image/'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is invalid.') as any)
      }
      return valid
    }
  })

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(files.image)) {
        return reject(new Error('File is not empty.'))
      }
      resolve(files.image as File[])
    })
  })
}

export const getNameFromFullName = (fullName: string) => {
  const nameArr = fullName.split('.')
  nameArr.pop()
  return nameArr.join('')
}
