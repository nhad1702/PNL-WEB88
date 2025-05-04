import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import rootRouter from './Routes/index.routes.js'

const app = express()
const PORT = 8000

mongoose.connect(process.env.MONGO_URL)

app.use(express.json())

app.use('/api/v1', rootRouter)

app.listen(PORT, () => {
    console.log('MongoDB is connected')
    console.log(`Server is running in port ${PORT}`)
})