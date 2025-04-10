import jwt from "jsonwebtoken"
import User from "../models/User.js"

// Create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  })
}

// Handle errors
const handleErrors = (err) => {
  const errors = { email: "", password: "" }

  // Duplicate email error
  if (err.code === 11000) {
    errors.email = "That email is already registered"
    return errors
  }

  // Validation errors
  if (err.message.includes("validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }

  return errors
}

// Login page
export const loginPage = (req, res) => {
  if (res.locals.user) {
    return res.redirect("/admin/dashboard")
  }
  res.render("auth/login", { title: "Login" })
}

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" })
    }

    const token = createToken(user._id)

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: process.env.NODE_ENV === "production",
    })

    res.status(200).json({ user: user._id, redirect: "/admin/dashboard" })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

// Logout user
export const logout = (req, res) => {
  res.clearCookie("jwt")
  res.redirect("/")
}

// Setup initial admin user
export const setupAdmin = async (req, res) => {
  try {
    const adminExists = await User.findOne({ role: "admin" })

    if (adminExists) {
      return res.status(400).json({ error: "Admin user already exists" })
    }

    const { name, email, password, setupKey } = req.body

    if (setupKey !== process.env.ADMIN_SETUP_KEY) {
      return res.status(403).json({ error: "Invalid setup key" })
    }

    const admin = await User.create({
      name,
      email,
      password,
      role: "admin",
    })

    const token = createToken(admin._id)

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: process.env.NODE_ENV === "production",
    })

    res.status(201).json({ user: admin._id, redirect: "/admin/dashboard" })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}
