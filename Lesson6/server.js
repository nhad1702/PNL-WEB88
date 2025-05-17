import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'
import RootRouter from "./routes/index.js";

//Connect with mongo db by using mongoose

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

const app = express();
app.use(express.json());


app.use("/api/v1", RootRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is running!");
});