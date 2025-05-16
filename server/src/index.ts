import express from 'express'
import dotenv from 'dotenv'
import connectDB from './frameworks/mongodb/mongoConnect'

dotenv.config()

const app = express()
app.use(express.json())

connectDB().then(() => {
  app.listen(4000, () => console.log("🚀 Server running on port 4000"));
});