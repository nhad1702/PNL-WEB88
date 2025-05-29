import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGODB_URL)
 .then(console.log('MongoDB connected'))
 .catch((err) => console.error(err.message))

app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})