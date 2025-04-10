import jwt from "jsonwebtoken"
import User from "../models/User.js"

// Middleware to check if user is authenticated
export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt

  if (!token) {
    return res.redirect("/auth/login")
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decodedToken.id
    next()
  } catch (err) {
    res.clearCookie("jwt")
    return res.redirect("/auth/login")
  }
}

// Middleware to check if user is admin
export const requireAdmin = async (req, res, next) => {
  const token = req.cookies.jwt

  if (!token) {
    return res.redirect("/auth/login")
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decodedToken.id)

    if (!user || user.role !== "admin") {
      return res.status(403).render("error", {
        title: "Access Denied",
        message: "You do not have permission to access this page",
      })
    }

    req.user = user
    next()
  } catch (err) {
    res.clearCookie("jwt")
    return res.redirect("/auth/login")
  }
}

// Check current user for all routes
export const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt
  res.locals.user = null
  
  // Set path for active navigation highlighting
  res.locals.path = req.originalUrl

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decodedToken.id)
      if (user) {
        res.locals.user = user
      }
    } catch (err) {
      res.clearCookie("jwt")
    }
  }

  next()
}
