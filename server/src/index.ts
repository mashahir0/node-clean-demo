import 'reflect-metadata'
import '../src/frameworks/Di/resolver'

import express from 'express'
import dotenv from 'dotenv'
import connectDB from './frameworks/mongodb/mongoConnect'
import { AuthRoutes } from 'interface-adapters/routes/authRoute'

dotenv.config()

const app = express()
app.use(express.json())

app.use('/api/v1/auth',new AuthRoutes().router)

connectDB().then(() => {
  app.listen(4000, () => console.log("🚀 Server running on port 4000"));
});