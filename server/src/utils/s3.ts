import { S3 } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import fs from 'fs'
import { envConfig } from './config'
const s3 = new S3({
  region: envConfig.awsRegion,
  credentials: {
    secretAccessKey: envConfig.awsSecretAccessKey,
    accessKeyId: envConfig.awsAccessKeyId
  }
})

interface UploadFileToS3Props {
  fileName: string
  filePath: string
  content_type: string
}

export const uploadFileToS3 = async ({ fileName, filePath, content_type }: UploadFileToS3Props) => {
  const parallelUploads3 = new Upload({
    client: s3,
    params: {
      Bucket: envConfig.s3BucketName,
      Key: fileName,
      Body: fs.readFileSync(filePath),
      ContentType: content_type
    },

    tags: [
      /*...*/
    ], // optional tags
    queueSize: 4, // optional concurrency configuration
    partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
    leavePartsOnError: false // optional manually handle dropped parts
  })

  parallelUploads3.on('httpUploadProgress', (progress) => {
    // console.log(progress);
  })

  return parallelUploads3.done()
}
