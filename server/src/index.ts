import express from 'express'
import { envConfig } from './utils/config'
import cors from 'cors'
import authRouter from './routes/auth.route'
import database from './services/database.services'
import userRouter from './routes/user.route'
import { defaultErrorHandler } from './middlewares/error.middleware'

const app = express()
const PORT = envConfig.port

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)

app.use(defaultErrorHandler)

database.connect()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
