import express from "express"
import 'dotenv/config'
import mongoose from "mongoose"
import rootRouter from "./routes/index.js"

const app = express()
app.use(express.json())
mongoose.connect(process.env.MONGO_URL)
 .then(console.log('MongoDB connected'))
 .catch((err) => console.error('MongoDB connection failed: ', err))

app.use('/', rootRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running in http://localhost:${process.env.PORT}`)
})