import { Request } from 'express'
import path from 'path'
import { MediaType } from '~/constants/common'
import fsPromise from 'fs/promises'
import sharp from 'sharp'
import { Media } from '~/constants/enum'
import mime from 'mime'
import { getNameFromFullName, handleUploadAvatar, handleUploadImage } from '~/utils/files'
import { uploadFileToS3 } from '~/utils/s3'
import { UPLOAD_AVATAR_DIR, UPLOAD_IMAGE_DIR } from '~/constants/dir'

class MediaServices {
  async uploadImage(req: Request) {
    const data = await handleUploadImage(req)
    const result: MediaType[] = await Promise.all(
      data.map(async (file) => {
        const newName = getNameFromFullName(file.newFilename)
        const newFileFullName = newName + '.jpg'
        const newPath = path.resolve(UPLOAD_IMAGE_DIR, `${newName}.jpg`)
        sharp.cache(false)
        await sharp(file.filepath).jpeg().toFile(newPath)
        const s3File = await uploadFileToS3({
          fileName: 'images/' + newFileFullName,
          content_type: mime.getType(newPath) as string,
          filePath: newPath
        })
        await Promise.all([fsPromise.unlink(file.filepath), fsPromise.unlink(newPath)])
        return {
          url: s3File.Location as string,
          type: Media.Image
        }
      })
    )
    return result
  }
  async uploadAvatar(req: Request) {
    const data = await handleUploadAvatar(req)
    const result: MediaType[] = await Promise.all(
      data.map(async (file) => {
        const newName = getNameFromFullName(file.newFilename)
        const newFileFullName = newName + '.jpg'
        const newPath = path.resolve(UPLOAD_AVATAR_DIR, `${newName}.jpg`)
        sharp.cache(false)
        await sharp(file.filepath).jpeg().toFile(newPath)
        const s3File = await uploadFileToS3({
          fileName: 'avatars/' + newFileFullName,
          content_type: mime.getType(newPath) as string,
          filePath: newPath
        })
        await Promise.all([fsPromise.unlink(file.filepath), fsPromise.unlink(newPath)])
        return {
          url: s3File.Location as string,
          type: Media.Image
        }
      })
    )
    return result
  }
}

const mediaServices = new MediaServices()

export default mediaServices
