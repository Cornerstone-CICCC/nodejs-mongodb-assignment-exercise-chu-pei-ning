import express, { Request, Response } from 'express';
import dotven from 'dotenv';
import mongoose from 'mongoose';
import productRouter from './routes/product.routes';
dotven.config()

// Create server
const app = express()

// Middleware
app.use(express.json())

// Routes
app.use('/product', productRouter)

// Fallback
app.use((req: Request, res: Response) => {
  res.status(404).send("Invalid route!")
})

// Start server
const PORT = process.env.PORT || 3000
const MONGODB_URL = process.env.MONGODB_URL!

mongoose
  .connect(MONGODB_URL, { dbName: 'store' })
  .then(() => {
    console.log(`Connected to MongoDB`)
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error(err)
    throw err
  })