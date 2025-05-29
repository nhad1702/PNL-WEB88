import express from "express"
import mongoose from "mongoose"
import 'dotenv/config'

const app = express()
app.use(express.json())
app.use()

mongoose.connect(process.env.MONGO_URL as string)
 .then(() => console.log('MongoDB connected'))
 .catch((err) => console.error('MongoDB connection error: ', err))

app.listen(process.env.PORT, () =>{
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})