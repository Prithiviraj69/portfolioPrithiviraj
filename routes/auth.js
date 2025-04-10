import express from "express"
import * as authController from "../controllers/authController.js"

const router = express.Router()

// Login routes
router.get("/login", authController.loginPage)
router.post("/login", authController.login)

// Logout route
router.get("/logout", authController.logout)

// Setup admin route (only for initial setup)
router.post("/setup-admin", authController.setupAdmin)

// Add this route after your existing routes
router.get("/setup-admin", (req, res) => {
  res.render("auth/setup-admin", { title: "Setup Admin Account" })
})

export default router
