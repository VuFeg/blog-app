import express from 'express'
import cors from 'cors'
import { envConfig } from './utils/config'
import authRouter from './routes/auth.route'
import database from './services/database.services'
import userRouter from './routes/user.route'
import { defaultErrorHandler } from './middlewares/error.middleware'
import postRouter from './routes/post.route'
import mediaRouter from './routes/media.route'
import notificationRouter from './routes/notification.route'

const app = express()
const PORT = envConfig.port

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/medias', mediaRouter)
app.use('/api/notifications', notificationRouter)

app.use(() => defaultErrorHandler)

database.connect()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
