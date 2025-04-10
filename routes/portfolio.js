import express from "express"
import * as portfolioController from "../controllers/portfolioController.js"

const router = express.Router()

// Main route - one page portfolio
router.get("/", portfolioController.homePage)

// Legacy routes - redirect to sections
router.get("/about", portfolioController.aboutPage)
router.get("/projects", portfolioController.projectsPage)
router.get("/skills", portfolioController.skillsPage)
router.get("/contact", portfolioController.contactPage)

// Project detail page - still separate
router.get("/projects/:slug", portfolioController.projectPage)

// Contact form submission
router.post("/contact", portfolioController.submitContact)

export default router
