import { Server } from 'socket.io'
import express from 'express'
import http from 'http'

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

const userSocketMap: { [key: string]: string } = {}

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId as string
  if (userId) {
    userSocketMap[userId] = socket.id
  }

  io.emit('getOnlineUsers', Object.keys(userSocketMap))

  socket.on('disconnect', () => {
    if (userId) {
      delete userSocketMap[userId]
    }
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
  })
})

export const getReceiverSocketId = (receiverId: string) => userSocketMap[receiverId]

export { io, server, app }
