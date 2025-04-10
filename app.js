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
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Check user on all routes - THIS IS THE ISSUE
// app.use("*", checkUser) - This is incorrect and causing the error

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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
