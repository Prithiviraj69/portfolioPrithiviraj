import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import path from "path"
import dotenv from "dotenv"
import { fileURLToPath } from "url"

// Routes
import authRoutes from "./routes/auth.js"
import adminRoutes from "./routes/admin.js"
import portfolioRoutes from "./routes/portfolio.js"

// Middleware
import { checkUser } from "./middleware/authMiddleware.js"

// Seed
import { seedResumeData } from "./seedData.js"

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Middleware
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// View engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Database connection
mongoose.set("bufferCommands", false)

const connectDB = async () => {
  const uri = process.env.MONGODB_URI
  if (uri && uri !== "memory" && !uri.includes("127.0.0.1") && !uri.includes("localhost")) {
    try {
      console.log("Connecting to remote MongoDB...")
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
      console.log("Connected to MongoDB successfully")
      await seedResumeData()
      return
    } catch (err) {
      console.warn(`Remote MongoDB connection failed (${err.message}). Trying in-memory fallback...`)
    }
  } else if (uri && (uri.includes("127.0.0.1") || uri.includes("localhost"))) {
    try {
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 })
      console.log("Connected to local MongoDB")
      await seedResumeData()
      return
    } catch (err) {
      console.warn("Local MongoDB not available, falling back to in-memory database...")
    }
  }

  try {
    const { MongoMemoryServer } = await import("mongodb-memory-server")
    const mongod = await MongoMemoryServer.create()
    const memoryUri = mongod.getUri()
    await mongoose.connect(memoryUri)
    console.log("Connected to In-Memory MongoDB")
    await seedResumeData()
  } catch (memErr) {
    console.warn("In-memory MongoDB not started (" + memErr.message + "). Serving with resilient default content.")
  }
}

// Add this after the MongoDB connection to verify Cloudinary configuration
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.warn("Cloudinary environment variables are not set. Image uploads will not work correctly.")
}

// FIXED: Use checkUser middleware correctly
app.use(checkUser)

// Routes
app.use("/", portfolioRoutes)
app.use("/auth", authRoutes)
app.use("/admin", adminRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).render("404", { title: "404 - Page Not Found" })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render("error", {
    title: "Error",
    message: process.env.NODE_ENV === "production" ? "Something went wrong" : err.message,
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT} bound to 0.0.0.0`)
  connectDB()
})

export default app
