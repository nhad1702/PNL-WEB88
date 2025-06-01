import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import rootRouter from './routes/index.js'
import cors from 'cors'

const app = express()

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,                 
}))

app.use(express.json())

app.use('/api', rootRouter)

mongoose.connect(process.env.MONGODB_URL)
 .then(console.log('MongoDB connected'))
 .catch((err) => console.error(err.message))

app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})