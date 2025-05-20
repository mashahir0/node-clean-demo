import 'reflect-metadata'
import '../src/frameworks/Di/resolver'

import express from 'express'
import dotenv from 'dotenv'
import connectDB from './frameworks/mongodb/mongoConnect'
import { AuthRoutes } from 'interface-adapters/routes/authRoute'
import cookieParser from 'cookie-parser';
import { UserRoutes } from 'interface-adapters/routes/user/user.route'
import { PrivateRoutes } from 'interface-adapters/routes/private/private.routes'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth',new AuthRoutes().router)
app.use('/api/v1/pvt',new PrivateRoutes().router)

connectDB().then(() => {
  app.listen(4000, () => console.log("🚀 Server running on port 4000"));
});