import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
 .then(console.log('MongoDB connected'))
 .catch((err) => console.log('MongoDB connection failed: ', err))

app.listen(process.env.PORT, () => {
    console.log(`Server is running in http://localhost:${process.env.PORT}`)
})